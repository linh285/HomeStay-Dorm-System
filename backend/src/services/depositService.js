const { Op } = require('sequelize');
const { DatCoc, Phong, Giuong, KhachHang, NhanVien, ThanhToan, sequelize } = require('../models');
const { addHours } = require('../utils/dateHelpers');

// Tiền cọc = (tiền thuê 2 tháng) × số giường thuê  (theo đề bài).
// giaThueMoiGiuong là tiền thuê MỖI GIƯỜNG; nhân với số giường.
const calculateDepositAmount = (giaThueMoiGiuong, soGiuong = 1) => {
  return Math.round(Number(giaThueMoiGiuong || 0) * 2 * soGiuong);
};

// Tiền thuê mỗi giường:
// - Thuê giường lẻ: dùng giá giường
// - Thuê nguyên phòng: giá phòng / sức chứa (vì GiaThue là giá cả phòng)
const getRentForDeposit = (phong, giuong) => {
  if (giuong?.GiaGiuong) return Number(giuong.GiaGiuong);
  const sucChua = Number(phong.SucChua) || 1;
  return Number(phong.GiaThue || 0) / sucChua;
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

const createDepositRequest = async (data) => {
  const { MaCoc, MaKH, MaPhong, MaGiuong, SoTienCoc, PhuongThucThanhToan, GhiChu, maLich } = data;

  const khachHang = await KhachHang.findByPk(MaKH);
  if (!khachHang) throw { statusCode: 404, message: 'Khach hang khong ton tai' };

  const phong = await Phong.findByPk(MaPhong);
  if (!phong) throw { statusCode: 404, message: 'Phong khong ton tai' };

  if (!MaGiuong && phong.TinhTrang !== 'AVAILABLE') {
    throw { statusCode: 400, message: 'Phong khong con trong de dat coc' };
  }

  if (MaGiuong && ['MAINTENANCE', 'INACTIVE'].includes(phong.TinhTrang)) {
    throw { statusCode: 400, message: 'Phong dang bao tri hoac ngung hoat dong' };
  }

  let giuong = null;
  if (MaGiuong) {
    giuong = await Giuong.findByPk(MaGiuong);
    if (!giuong) throw { statusCode: 404, message: 'Giuong khong ton tai' };
    if (giuong.MaPhong !== MaPhong) {
      throw { statusCode: 400, message: 'Giuong khong thuoc phong da chon' };
    }
    if (giuong.TinhTrang !== 'AVAILABLE') {
      throw { statusCode: 400, message: 'Giuong khong con trong de dat coc' };
    }
  }

  const soGiuong = MaGiuong ? 1 : (Number(phong.SucChua) || 1);
  const soTien = SoTienCoc || calculateDepositAmount(getRentForDeposit(phong, giuong), soGiuong);

  const t = await sequelize.transaction();
  try {
    const datCoc = await DatCoc.create(
      {
        MaCoc,
        MaKH,
        MaPhong,
        MaGiuong: MaGiuong || null,
        SoTienCoc: soTien,
        PhuongThucThanhToan,
        TinhTrang: 'PENDING_APPROVAL',
        ThoiGianHetHan: null,
        GhiChu,
      },
      { transaction: t }
    );

    if (giuong) {
      await giuong.update({ TinhTrang: 'PENDING' }, { transaction: t });
      await updateRoomStatusFromBeds(MaPhong, t);
    } else {
      await phong.update({ TinhTrang: 'PENDING' }, { transaction: t });
      await Giuong.update({ TinhTrang: 'PENDING' }, { where: { MaPhong }, transaction: t });
    }

    if (maLich) {
      const { LichXemPhong } = require('../models');
      const lich = await LichXemPhong.findByPk(maLich, { transaction: t });
      if (lich) {
        await lich.update({ TrangThai: 'COMPLETED', KetQua: 'BOOKED' }, { transaction: t });
      }
    }

    await t.commit();
    return datCoc;
  } catch (err) {
    await t.rollback();
    throw err;
  }
};

const sendPaymentRequest = async (maCoc) => {
  const datCoc = await DatCoc.findByPk(maCoc, {
    include: [
      { model: Phong, as: 'phong' },
      { model: Giuong, as: 'giuong' },
    ],
  });
  if (!datCoc) throw { statusCode: 404, message: 'Dat coc khong ton tai' };
  if (datCoc.TinhTrang !== 'PENDING_APPROVAL') {
    throw { statusCode: 400, message: `Dat coc khong o trang thai cho phe duyet (hien tai: ${datCoc.TinhTrang})` };
  }

  const thoiGianHetHan = addHours(new Date(), 24);
  await datCoc.update({ TinhTrang: 'PENDING_PAYMENT', ThoiGianHetHan: thoiGianHetHan });
  return datCoc;
};

const confirmDeposit = async (maCoc, data) => {
  const { maNVPheDuyet, maThanhToan, phuongThuc, ghiChu, maSoChungTu } = data;

  const datCoc = await DatCoc.findByPk(maCoc, {
    include: [
      { model: Phong, as: 'phong' },
      { model: Giuong, as: 'giuong' },
    ],
  });
  if (!datCoc) throw { statusCode: 404, message: 'Dat coc khong ton tai' };
  if (datCoc.TinhTrang !== 'PENDING_PAYMENT') {
    throw { statusCode: 400, message: `Dat coc dang o trang thai ${datCoc.TinhTrang}` };
  }

  if (new Date() > new Date(datCoc.ThoiGianHetHan)) {
    throw { statusCode: 400, message: 'Dat coc da het han' };
  }

  const t = await sequelize.transaction();
  try {
    await datCoc.update(
      {
        TinhTrang: 'APPROVED',
        NguoiPheDuyet: maNVPheDuyet,
        ThoiGianPheDuyet: new Date(),
      },
      { transaction: t }
    );

    if (datCoc.giuong) {
      await datCoc.giuong.update({ TinhTrang: 'RESERVED' }, { transaction: t });
      await updateRoomStatusFromBeds(datCoc.MaPhong, t);
    } else if (datCoc.phong) {
      await datCoc.phong.update({ TinhTrang: 'RESERVED' }, { transaction: t });
      await Giuong.update({ TinhTrang: 'RESERVED' }, { where: { MaPhong: datCoc.MaPhong }, transaction: t });
    }

    const thanhToan = await ThanhToan.create(
      {
        MaThanhToan: maThanhToan,
        MaCoc: maCoc,
        SoTien: datCoc.SoTienCoc,
        PhuongThuc: phuongThuc || datCoc.PhuongThucThanhToan,
        LoaiThanhToan: 'DEPOSIT',
        TinhTrang: 'SUCCESS',
        GhiChu: ghiChu || `Thanh toan dat coc ${maCoc}`,
        MaSoChungTu: maSoChungTu,
      },
      { transaction: t }
    );

    await t.commit();
    return { datCoc, thanhToan };
  } catch (err) {
    await t.rollback();
    throw err;
  }
};

const getAllDeposits = async (filters = {}) => {
  const where = {};
  if (filters.TinhTrang) where.TinhTrang = filters.TinhTrang;
  if (filters.MaKH) where.MaKH = filters.MaKH;
  if (filters.MaPhong) where.MaPhong = filters.MaPhong;

  return await DatCoc.findAll({
    where,
    include: [
      { model: KhachHang, as: 'khachHang', attributes: ['MaKH', 'HoTen', 'SDT', 'Email'] },
      { model: Phong, as: 'phong', attributes: ['MaPhong', 'GiaThue', 'KhuVuc', 'Tang', 'TinhTrang'] },
      { model: Giuong, as: 'giuong', attributes: ['MaGiuong', 'GiaGiuong', 'TinhTrang'] },
      { model: NhanVien, as: 'nguoiPheDuyet', attributes: ['MaNV', 'TenNV'] },
    ],
    order: [['NgayDatCoc', 'DESC']],
  });
};

const getDepositById = async (maCoc) => {
  const datCoc = await DatCoc.findByPk(maCoc, {
    include: [
      { model: KhachHang, as: 'khachHang' },
      { model: Phong, as: 'phong' },
      { model: Giuong, as: 'giuong' },
      { model: NhanVien, as: 'nguoiPheDuyet', attributes: ['MaNV', 'TenNV'] },
      { model: ThanhToan, as: 'thanhToans' },
    ],
  });
  if (!datCoc) throw { statusCode: 404, message: 'Dat coc khong ton tai' };
  return datCoc;
};

const expireOverdueDeposits = async () => {
  const overdueDeposits = await DatCoc.findAll({
    where: {
      TinhTrang: 'PENDING_PAYMENT',
      ThoiGianHetHan: { [Op.lt]: new Date() },
    },
    include: [
      { model: Phong, as: 'phong' },
      { model: Giuong, as: 'giuong' },
    ],
  });

  let count = 0;
  for (const datCoc of overdueDeposits) {
    const t = await sequelize.transaction();
    try {
      await datCoc.update({ TinhTrang: 'EXPIRED' }, { transaction: t });

      if (datCoc.giuong && datCoc.giuong.TinhTrang === 'PENDING') {
        await datCoc.giuong.update({ TinhTrang: 'AVAILABLE' }, { transaction: t });
        await updateRoomStatusFromBeds(datCoc.MaPhong, t);
      } else if (datCoc.phong && datCoc.phong.TinhTrang === 'PENDING') {
        await datCoc.phong.update({ TinhTrang: 'AVAILABLE' }, { transaction: t });
        await Giuong.update(
          { TinhTrang: 'AVAILABLE' },
          { where: { MaPhong: datCoc.MaPhong, TinhTrang: 'PENDING' }, transaction: t }
        );
      }

      await t.commit();
      count++;
    } catch (err) {
      await t.rollback();
      console.error(`[CRON] Failed to expire deposit ${datCoc.MaCoc}:`, err.message);
    }
  }
  return count;
};

const cancelDeposit = async (maCoc, data = {}) => {
  const { lyDo, phuongThuc, ghiChu, maNVXuLy } = data;

  const datCoc = await DatCoc.findByPk(maCoc, {
    include: [
      { model: Phong, as: 'phong' },
      { model: Giuong, as: 'giuong' },
    ],
  });
  if (!datCoc) throw { statusCode: 404, message: 'Dat coc khong ton tai' };

  if (!['APPROVED', 'PENDING_PAYMENT', 'PENDING_APPROVAL'].includes(datCoc.TinhTrang)) {
    throw { statusCode: 400, message: `Khong the huy dat coc o trang thai ${datCoc.TinhTrang}` };
  }
  if (datCoc.MaHopDong) {
    throw { statusCode: 400, message: 'Dat coc da duoc gan voi hop dong, khong the huy truc tiep' };
  }

  // 80% refund only if deposit was APPROVED (payment was received)
  const hasPayment = datCoc.TinhTrang === 'APPROVED';
  const soTienHoan = hasPayment ? Math.round(Number(datCoc.SoTienCoc) * 0.8) : 0;

  const t = await sequelize.transaction();
  try {
    await datCoc.update(
      { TinhTrang: 'CANCELLED', GhiChu: lyDo || datCoc.GhiChu },
      { transaction: t }
    );

    // Release the room/bed
    if (datCoc.giuong) {
      await datCoc.giuong.update({ TinhTrang: 'AVAILABLE' }, { transaction: t });
      await updateRoomStatusFromBeds(datCoc.MaPhong, t);
    } else if (datCoc.phong) {
      await datCoc.phong.update({ TinhTrang: 'AVAILABLE' }, { transaction: t });
      await Giuong.update(
        { TinhTrang: 'AVAILABLE' },
        { where: { MaPhong: datCoc.MaPhong, TinhTrang: { [Op.in]: ['PENDING', 'RESERVED'] } }, transaction: t }
      );
    }

    let thanhToan = null;
    if (hasPayment && soTienHoan > 0) {
      const countTT = await ThanhToan.count({ transaction: t });
      const maThanhToan = `TT-${String(countTT + 1).padStart(5, '0')}`;
      thanhToan = await ThanhToan.create(
        {
          MaThanhToan: maThanhToan,
          MaCoc: maCoc,
          SoTien: soTienHoan,
          PhuongThuc: phuongThuc || 'TIEN_MAT',
          LoaiThanhToan: 'REFUND',
          TinhTrang: 'SUCCESS',
          GhiChu: ghiChu || `Hoan coc 80% khi huy dat coc ${maCoc} (chua ky hop dong)`,
        },
        { transaction: t }
      );
    }

    await t.commit();
    return { datCoc, soTienHoan, thanhToan };
  } catch (err) {
    await t.rollback();
    throw err;
  }
};

const rejectDeposit = async (maCoc, data = {}) => {
  const { lyDo, maNVXuLy } = data;

  const datCoc = await DatCoc.findByPk(maCoc, {
    include: [
      { model: Phong, as: 'phong' },
      { model: Giuong, as: 'giuong' },
    ],
  });
  if (!datCoc) throw { statusCode: 404, message: 'Dat coc khong ton tai' };
  if (!['PENDING_PAYMENT', 'PENDING_APPROVAL'].includes(datCoc.TinhTrang)) {
    throw { statusCode: 400, message: `Chi duoc tu choi dat coc chua thanh toan` };
  }

  const t = await sequelize.transaction();
  try {
    await datCoc.update(
      { TinhTrang: 'REJECTED', GhiChu: lyDo || datCoc.GhiChu, NguoiPheDuyet: maNVXuLy || null },
      { transaction: t }
    );

    if (datCoc.giuong) {
      await datCoc.giuong.update({ TinhTrang: 'AVAILABLE' }, { transaction: t });
      await updateRoomStatusFromBeds(datCoc.MaPhong, t);
    } else if (datCoc.phong) {
      await datCoc.phong.update({ TinhTrang: 'AVAILABLE' }, { transaction: t });
      await Giuong.update(
        { TinhTrang: 'AVAILABLE' },
        { where: { MaPhong: datCoc.MaPhong, TinhTrang: 'PENDING' }, transaction: t }
      );
    }

    await t.commit();
    return datCoc;
  } catch (err) {
    await t.rollback();
    throw err;
  }
};

module.exports = {
  createDepositRequest,
  sendPaymentRequest,
  confirmDeposit,
  cancelDeposit,
  rejectDeposit,
  getAllDeposits,
  getDepositById,
  expireOverdueDeposits,
  calculateDepositAmount,
};
