const { Op } = require('sequelize');
const {
  HopDongThueNha, Phong, Giuong, Nhom, KhachHang,
  NhanVien, ChiTietThue, DatCoc, ThanhToan, ThanhVienNhom, sequelize
} = require('../models');
const { diffInMonths } = require('../utils/dateHelpers');

/**
 * Tạo hợp đồng thuê nhà mới
 */
const createContract = async (data) => {
  const {
    maPhong, maNhom, ngayBatDau, ngayKetThuc, giaThue,
    noiQuy, maNVPhuTrach, chiTietThue = []
  } = data;

  // Sinh mã hợp đồng an toàn (dùng timestamp + random)
  const shortTimestamp = Date.now().toString().slice(-8); // 8 số cuối của timestamp
  const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
  const maHopDong = `HD-${shortTimestamp}${random}`;
  // Ví dụ: HD-12345678123 (14 ký tự)
  const t = await sequelize.transaction();
  try {
    const hopDong = await HopDongThueNha.create({
      MaHopDong: maHopDong,
      MaPhong: maPhong || null,
      MaNhom: maNhom || null,
      NgayBatDau: ngayBatDau,
      NgayKetThuc: ngayKetThuc,
      GiaThue: giaThue,
      NoiQuy: noiQuy || 'Tuân thủ nội quy ký túc xá. Thanh toán đúng hạn. Bồi thường hư hỏng.',
      TinhTrang: 'PENDING_FIRST_PAYMENT',
      NgayKy: new Date(),
      MaNVPhuTrach: maNVPhuTrach || null,
    }, { transaction: t });

    // Nếu có chi tiết thuê giường (thuê giường lẻ)
    if (chiTietThue.length > 0) {
      for (const ct of chiTietThue) {
        await ChiTietThue.create({
          MaHopDong: maHopDong,
          MaGiuong: ct.maGiuong || null,
          MaKH: ct.maKH || null,
          GiaThueThucTe: ct.giaThueThucTe || giaThue,
        }, { transaction: t });

        if (ct.maGiuong) {
          await Giuong.update({ TinhTrang: 'RESERVED' }, { where: { MaGiuong: ct.maGiuong }, transaction: t });
        }
      }
    } else {
      // Thuê nguyên phòng: cập nhật phòng và tất cả giường thành RESERVED
      if (maPhong) {
        await Phong.update(
          { TinhTrang: 'RESERVED' },
          { where: { MaPhong: maPhong }, transaction: t }
        );
        await Giuong.update(
          { TinhTrang: 'RESERVED' },
          { where: { MaPhong: maPhong }, transaction: t }
        );
      }
    }

    if (maNhom) {
      await Nhom.update({ MaHopDong: maHopDong }, { where: { MaNhom: maNhom }, transaction: t });
    }

    await t.commit();
    return await getContractById(maHopDong);
  } catch (err) {
    await t.rollback();
    throw err;
  }
};

/**
 * Lấy hợp đồng theo ID
 */
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
      {
        model: DatCoc, as: 'datCoc',
        attributes: ['MaCoc', 'SoTienCoc', 'TinhTrang', 'NgayDatCoc']
      },
      { model: ThanhToan, as: 'thanhToans', attributes: ['MaThanhToan', 'SoTien', 'LoaiThanhToan', 'TinhTrang', 'NgayThanhToan'] },
    ],
  });
  if (!hopDong) throw { statusCode: 404, message: 'Hợp đồng không tồn tại' };
  return hopDong;
};

/**
 * Lấy tất cả hợp đồng có filter
 */
const getAllContracts = async (filters = {}) => {
  const { tinhTrang, search, page = 1, limit = 20 } = filters;
  const where = {};
  if (tinhTrang && tinhTrang !== 'ALL') where.TinhTrang = tinhTrang;

  const include = [
    { model: Phong, as: 'phong', attributes: ['MaPhong', 'KhuVuc', 'Tang'] },
    {
      model: Nhom, as: 'nhom',
      include: [{ model: KhachHang, as: 'daiDien', attributes: ['HoTen', 'SDT'] }]
    },
  ];

  const { count, rows } = await HopDongThueNha.findAndCountAll({
    where,
    include,
    order: [['NgayKy', 'DESC']],
    limit: parseInt(limit),
    offset: (parseInt(page) - 1) * parseInt(limit),
  });

  return { total: count, contracts: rows, page, limit };
};

/**
 * Kích hoạt hợp đồng (sau khi thanh toán kỳ đầu)
 */
const activateContract = async (maHopDong) => {
  const hopDong = await HopDongThueNha.findByPk(maHopDong);
  if (!hopDong) throw { statusCode: 404, message: 'Hợp đồng không tồn tại' };
  if (hopDong.TinhTrang !== 'PENDING_FIRST_PAYMENT') {
    throw { statusCode: 400, message: 'Hợp đồng không ở trạng thái chờ thanh toán kỳ đầu' };
  }
  await hopDong.update({ TinhTrang: 'ACTIVE' });
  return hopDong;
};

/**
 * Thanh lý hợp đồng
 */
const terminateContract = async (maHopDong) => {
  const hopDong = await HopDongThueNha.findByPk(maHopDong);
  if (!hopDong) throw { statusCode: 404, message: 'Hợp đồng không tồn tại' };
  await hopDong.update({ TinhTrang: 'TERMINATED' });

  // Return room to AVAILABLE
  if (hopDong.MaPhong) {
    await Phong.update({ TinhTrang: 'AVAILABLE' }, { where: { MaPhong: hopDong.MaPhong } });
    await Giuong.update({ TinhTrang: 'AVAILABLE' }, { where: { MaPhong: hopDong.MaPhong } });
  }
  return hopDong;
};

/**
 * Rà soát thành viên nhóm
 */
const screenMembers = async (maNhom, screeningResults) => {
  // screeningResults: [{ maKH, trangThai: 'APPROVED' | 'REJECTED' }]
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

/**
 * Tìm hợp đồng theo mã hoặc số điện thoại
 */
const findContractBySearch = async (keyword) => {
  const hopDong = await HopDongThueNha.findOne({
    where: { MaHopDong: keyword, TinhTrang: 'ACTIVE' },
    include: [
      { model: Phong, as: 'phong', attributes: ['MaPhong', 'KhuVuc'] },
      { model: Nhom, as: 'nhom', include: [{ model: KhachHang, as: 'daiDien', attributes: ['HoTen', 'SDT'] }] },
    ],
  });
  if (hopDong) return hopDong;

  // Search by phone
  const khach = await KhachHang.findOne({ where: { SDT: keyword } });
  if (khach) {
    return await HopDongThueNha.findOne({
      include: [
        { model: Phong, as: 'phong', attributes: ['MaPhong', 'KhuVuc'] },
        {
          model: Nhom, as: 'nhom',
          include: [{ model: KhachHang, as: 'daiDien', where: { SDT: keyword } }]
        },
      ],
      where: { TinhTrang: ['ACTIVE', 'PENDING_FIRST_PAYMENT'] },
    });
  }
  return null;
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