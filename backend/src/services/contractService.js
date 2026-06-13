const { Op } = require('sequelize');
const {
  HopDongThueNha, Phong, Giuong, Nhom, KhachHang,
  NhanVien, ChiTietThue, DatCoc, ThanhToan, ThanhVienNhom, sequelize
} = require('../models');

const generateContractId = () => {
  const shortTimestamp = Date.now().toString().slice(-8);
  const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
  return `HD-${shortTimestamp}${random}`;
};

const updateRoomStatusFromBeds = async (maPhong, transaction) => {
  const beds = await Giuong.findAll({ where: { MaPhong: maPhong }, transaction });
  if (beds.length === 0) return;

  const statuses = beds.map((bed) => bed.TinhTrang);
  let roomStatus = 'AVAILABLE';
  if (statuses.every((status) => status === 'OCCUPIED')) roomStatus = 'OCCUPIED';
  else if (statuses.every((status) => ['RESERVED', 'OCCUPIED'].includes(status))) roomStatus = 'RESERVED';
  else if (statuses.some((status) => status === 'PENDING')) roomStatus = 'PENDING';

  await Phong.update({ TinhTrang: roomStatus }, { where: { MaPhong: maPhong }, transaction });
};

const createContract = async (data) => {
  const {
    maCoc, maPhong, maNhom, ngayBatDau, ngayKetThuc, giaThue,
    noiQuy, maNVPhuTrach, chiTietThue = []
  } = data;

  const deposit = maCoc
    ? await DatCoc.findByPk(maCoc, { include: [{ model: Giuong, as: 'giuong' }, { model: Phong, as: 'phong' }] })
    : null;

  if (!deposit) throw { statusCode: 400, message: 'Can co dat coc da duyet truoc khi lap hop dong' };
  if (deposit.TinhTrang !== 'APPROVED') {
    throw { statusCode: 400, message: 'Chi duoc lap hop dong tu dat coc da xac nhan thanh toan' };
  }
  if (deposit.MaHopDong) {
    throw { statusCode: 400, message: 'Dat coc nay da duoc gan voi hop dong khac' };
  }

  const contractRoomId = maPhong || deposit.MaPhong;
  const contractRent = giaThue || deposit.giuong?.GiaGiuong || deposit.phong?.GiaThue || 0;

  // CHI_TIET_THUE có PK (MaHopDong, MaGiuong) ⇒ MaGiuong không được NULL.
  // - Có chiTietThue truyền vào: dùng trực tiếp
  // - Thuê giường lẻ: 1 dòng cho giường đó
  // - Thuê nguyên phòng: tạo 1 dòng cho mỗi giường trong phòng (chia đều giá)
  let details;
  if (chiTietThue.length > 0) {
    details = chiTietThue;
  } else if (deposit.MaGiuong) {
    details = [{ maGiuong: deposit.MaGiuong, maKH: deposit.MaKH || null, giaThueThucTe: contractRent }];
  } else {
    const bedsInRoom = await Giuong.findAll({ where: { MaPhong: contractRoomId } });
    const perBed = bedsInRoom.length > 0 ? Math.round(Number(contractRent) / bedsInRoom.length) : contractRent;
    details = bedsInRoom.map((b) => ({ maGiuong: b.MaGiuong, maKH: deposit.MaKH || null, giaThueThucTe: perBed }));
  }

  const maHopDong = generateContractId();
  const t = await sequelize.transaction();
  try {
    const hopDong = await HopDongThueNha.create({
      MaHopDong: maHopDong,
      MaPhong: contractRoomId || null,
      MaNhom: maNhom || null,
      NgayBatDau: ngayBatDau,
      NgayKetThuc: ngayKetThuc,
      GiaThue: contractRent,
      NoiQuy: noiQuy || 'Tuan thu noi quy ky tuc xa. Thanh toan dung han. Boi thuong hu hong.',
      TinhTrang: 'PENDING_FIRST_PAYMENT',
      NgayKy: new Date(),
      MaNVPhuTrach: maNVPhuTrach || null,
    }, { transaction: t });

    for (const ct of details) {
      await ChiTietThue.create({
        MaHopDong: maHopDong,
        MaGiuong: ct.maGiuong || null,
        MaKH: ct.maKH || deposit.MaKH || null,
        GiaThueThucTe: ct.giaThueThucTe || contractRent,
      }, { transaction: t });

      if (ct.maGiuong) {
        await Giuong.update({ TinhTrang: 'RESERVED' }, { where: { MaGiuong: ct.maGiuong }, transaction: t });
      }
    }

    if (details.every((ct) => !ct.maGiuong) && contractRoomId) {
      await Phong.update({ TinhTrang: 'RESERVED' }, { where: { MaPhong: contractRoomId }, transaction: t });
      await Giuong.update({ TinhTrang: 'RESERVED' }, { where: { MaPhong: contractRoomId }, transaction: t });
    } else if (contractRoomId) {
      await updateRoomStatusFromBeds(contractRoomId, t);
    }

    await deposit.update({ MaHopDong: maHopDong }, { transaction: t });

    if (maNhom) {
      await Nhom.update({ MaHopDong: maHopDong }, { where: { MaNhom: maNhom }, transaction: t });
    }

    await t.commit();
    return await getContractById(hopDong.MaHopDong);
  } catch (err) {
    await t.rollback();
    throw err;
  }
};

const getContractById = async (maHopDong) => {
  const hopDong = await HopDongThueNha.findByPk(maHopDong, {
    include: [
      { model: Phong, as: 'phong', attributes: ['MaPhong', 'KhuVuc', 'Tang', 'SucChua', 'GiaThue', 'TinhTrang'] },
      {
        model: Nhom, as: 'nhom',
        include: [
          { model: KhachHang, as: 'daiDien', attributes: ['MaKH', 'HoTen', 'SDT', 'Email', 'GiayToTuyThan'] },
          { model: KhachHang, as: 'thanhViens', through: { attributes: ['TrangThai'] } },
        ]
      },
      { model: NhanVien, as: 'nhanVienPhuTrach', attributes: ['MaNV', 'TenNV', 'ChucVu'] },
      {
        model: ChiTietThue, as: 'chiTiets',
        include: [{ model: Giuong, as: 'giuong' }, { model: KhachHang, as: 'khachHang', attributes: ['HoTen', 'SDT'] }]
      },
      { model: DatCoc, as: 'datCoc', attributes: ['MaCoc', 'SoTienCoc', 'TinhTrang', 'NgayDatCoc'] },
      { model: ThanhToan, as: 'thanhToans', attributes: ['MaThanhToan', 'SoTien', 'LoaiThanhToan', 'TinhTrang', 'NgayThanhToan', 'GhiChu'] },
    ],
  });
  if (!hopDong) throw { statusCode: 404, message: 'Hop dong khong ton tai' };
  return hopDong;
};

const getAllContracts = async (filters = {}) => {
  const { tinhTrang, page = 1, limit = 20 } = filters;
  const where = {};
  if (tinhTrang && tinhTrang !== 'ALL') where.TinhTrang = tinhTrang;

  const { count, rows } = await HopDongThueNha.findAndCountAll({
    where,
    include: [
      { model: Phong, as: 'phong', attributes: ['MaPhong', 'KhuVuc', 'Tang'] },
      { model: Nhom, as: 'nhom', include: [{ model: KhachHang, as: 'daiDien', attributes: ['HoTen', 'SDT'] }] },
    ],
    order: [['NgayKy', 'DESC']],
    limit: parseInt(limit),
    offset: (parseInt(page) - 1) * parseInt(limit),
  });

  return { total: count, contracts: rows, page, limit };
};

const activateContract = async (maHopDong, data = {}) => {
  const { soTien, phuongThuc, ghiChu, maSoChungTu } = data;
  const hopDong = await HopDongThueNha.findByPk(maHopDong);
  if (!hopDong) throw { statusCode: 404, message: 'Hop dong khong ton tai' };
  if (hopDong.TinhTrang !== 'PENDING_FIRST_PAYMENT') {
    throw { statusCode: 400, message: 'Hop dong khong o trang thai cho thanh toan ky dau' };
  }

  const paymentAmount = Number(soTien || hopDong.GiaThue || 0);
  if (paymentAmount <= 0) {
    throw { statusCode: 400, message: 'So tien thanh toan ban dau khong hop le' };
  }

  const t = await sequelize.transaction();
  try {
    const countTT = await ThanhToan.count({ transaction: t });
    const maThanhToan = `TT-${String(countTT + 1).padStart(5, '0')}`;

    const thanhToan = await ThanhToan.create({
      MaThanhToan: maThanhToan,
      MaHopDong: maHopDong,
      SoTien: paymentAmount,
      PhuongThuc: phuongThuc || 'TIEN_MAT',
      LoaiThanhToan: 'MONTHLY_RENT',
      TinhTrang: 'SUCCESS',
      GhiChu: ghiChu || 'Thanh toan ban dau khi nhan phong',
      MaSoChungTu: maSoChungTu || null,
    }, { transaction: t });

    await hopDong.update({ TinhTrang: 'ACTIVE' }, { transaction: t });
    await t.commit();
    return { hopDong, thanhToan };
  } catch (err) {
    await t.rollback();
    throw err;
  }
};

const terminateContract = async (maHopDong) => {
  const hopDong = await HopDongThueNha.findByPk(maHopDong, {
    include: [{ model: ChiTietThue, as: 'chiTiets' }],
  });
  if (!hopDong) throw { statusCode: 404, message: 'Hop dong khong ton tai' };
  await hopDong.update({ TinhTrang: 'TERMINATED' });

  if (hopDong.MaPhong) {
    const rentedBedIds = (hopDong.chiTiets || []).map((ct) => ct.MaGiuong).filter(Boolean);
    if (rentedBedIds.length > 0) {
      await Giuong.update({ TinhTrang: 'AVAILABLE' }, { where: { MaGiuong: rentedBedIds } });
      await updateRoomStatusFromBeds(hopDong.MaPhong, null);
    } else {
      await Phong.update({ TinhTrang: 'AVAILABLE' }, { where: { MaPhong: hopDong.MaPhong } });
      await Giuong.update({ TinhTrang: 'AVAILABLE' }, { where: { MaPhong: hopDong.MaPhong } });
    }
  }
  return hopDong;
};

const screenMembers = async (maNhom, screeningResults = []) => {
  for (const result of screeningResults) {
    await ThanhVienNhom.update(
      { TrangThai: result.trangThai },
      { where: { MaNhom: maNhom, MaKH: result.maKH } }
    );
  }
  return await Nhom.findByPk(maNhom, {
    include: [{ model: KhachHang, as: 'thanhViens', through: { attributes: ['TrangThai'] } }]
  });
};

const findContractBySearch = async (keyword) => {
  const hopDong = await HopDongThueNha.findOne({
    where: { MaHopDong: keyword, TinhTrang: { [Op.in]: ['ACTIVE', 'PENDING_FIRST_PAYMENT'] } },
    include: [
      { model: Phong, as: 'phong', attributes: ['MaPhong', 'KhuVuc'] },
      { model: Nhom, as: 'nhom', include: [{ model: KhachHang, as: 'daiDien', attributes: ['HoTen', 'SDT'] }] },
    ],
  });
  if (hopDong) return hopDong;

  const khach = await KhachHang.findOne({ where: { SDT: keyword } });
  if (!khach) return null;

  return await HopDongThueNha.findOne({
    include: [
      { model: Phong, as: 'phong', attributes: ['MaPhong', 'KhuVuc'] },
      {
        model: Nhom, as: 'nhom',
        include: [{ model: KhachHang, as: 'daiDien', where: { SDT: keyword } }]
      },
    ],
    where: { TinhTrang: { [Op.in]: ['ACTIVE', 'PENDING_FIRST_PAYMENT'] } },
  });
};

module.exports = {
  createContract,
  getContractById,
  getAllContracts,
  activateContract,
  terminateContract,
  screenMembers,
  findContractBySearch
};
