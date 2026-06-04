const { Op } = require('sequelize');
const { DatCoc, Phong, Giuong, KhachHang, NhanVien, ThanhToan, sequelize } = require('../models');
const { addHours } = require('../utils/dateHelpers');

/**
 * Calculate deposit amount
 * giaThue: monthly rent, soGiuong: number of beds
 * Returns 2 months rent per bed
 */
const calculateDepositAmount = (giaThue, soGiuong = 1) => {
  return parseFloat(giaThue) * 2 * soGiuong;
};

/**
 * Create a new deposit request
 * Sets TinhTrang=PENDING_PAYMENT, ThoiGianHetHan=+24h
 * Updates Phong/Giuong to PENDING
 */
const createDepositRequest = async (data) => {
  const { MaCoc, MaKH, MaPhong, MaGiuong, SoTienCoc, PhuongThucThanhToan, GhiChu } = data;

  // Validate customer
  const khachHang = await KhachHang.findByPk(MaKH);
  if (!khachHang) throw { statusCode: 404, message: 'Khách hàng không tồn tại' };

  // Validate room
  const phong = await Phong.findByPk(MaPhong);
  if (!phong) throw { statusCode: 404, message: 'Phòng không tồn tại' };
  if (phong.TinhTrang !== 'AVAILABLE') {
    throw { statusCode: 400, message: 'Phòng không còn trống để đặt cọc' };
  }

  // Validate bed if specified
  let giuong = null;
  if (MaGiuong) {
    giuong = await Giuong.findByPk(MaGiuong);
    if (!giuong) throw { statusCode: 404, message: 'Giường không tồn tại' };
    if (!['AVAILABLE'].includes(giuong.TinhTrang)) {
      throw { statusCode: 400, message: 'Giường không còn trống để đặt cọc' };
    }
  }

  const thoiGianHetHan = addHours(new Date(), 24);

  // Determine deposit amount if not provided
  const soTien = SoTienCoc || calculateDepositAmount(phong.GiaThue, 1);

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
        TinhTrang: 'PENDING_PAYMENT',
        ThoiGianHetHan: thoiGianHetHan,
        GhiChu,
      },
      { transaction: t }
    );

    // Update room to PENDING
    await phong.update({ TinhTrang: 'PENDING' }, { transaction: t });

    // Update bed to PENDING if specified
    if (giuong) {
      await giuong.update({ TinhTrang: 'PENDING' }, { transaction: t });
    }

    await t.commit();
    return datCoc;
  } catch (err) {
    await t.rollback();
    throw err;
  }
};

/**
 * Confirm a deposit payment
 * Updates TinhTrang=APPROVED, Phong/Giuong=RESERVED, creates ThanhToan record
 */
const confirmDeposit = async (maCoc, data) => {
  const { maNVPheDuyet, maThanhToan, phuongThuc, ghiChu, maSoChungTu } = data;

  const datCoc = await DatCoc.findByPk(maCoc, {
    include: [
      { model: Phong, as: 'phong' },
      { model: Giuong, as: 'giuong' },
    ],
  });
  if (!datCoc) throw { statusCode: 404, message: 'Đặt cọc không tồn tại' };
  if (datCoc.TinhTrang !== 'PENDING_PAYMENT') {
    throw { statusCode: 400, message: `Đặt cọc ở trạng thái ${datCoc.TinhTrang}, không thể xác nhận` };
  }

  // Check if expired
  if (new Date() > new Date(datCoc.ThoiGianHetHan)) {
    throw { statusCode: 400, message: 'Đặt cọc đã hết hạn' };
  }

  const t = await sequelize.transaction();
  try {
    // Update deposit
    await datCoc.update(
      {
        TinhTrang: 'APPROVED',
        NguoiPheDuyet: maNVPheDuyet,
        ThoiGianPheDuyet: new Date(),
      },
      { transaction: t }
    );

    // Update room and bed to RESERVED
    if (datCoc.phong) {
      await datCoc.phong.update({ TinhTrang: 'RESERVED' }, { transaction: t });
    }
    if (datCoc.giuong) {
      await datCoc.giuong.update({ TinhTrang: 'RESERVED' }, { transaction: t });
    }

    // Create payment record
    const thanhToan = await ThanhToan.create(
      {
        MaThanhToan: maThanhToan,
        MaCoc: maCoc,
        SoTien: datCoc.SoTienCoc,
        PhuongThuc: phuongThuc || datCoc.PhuongThucThanhToan,
        LoaiThanhToan: 'DEPOSIT',
        TinhTrang: 'SUCCESS',
        GhiChu: ghiChu || `Thanh toán đặt cọc ${maCoc}`,
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

/**
 * Get all deposits with optional filters
 */
const getAllDeposits = async (filters = {}) => {
  const where = {};
  if (filters.TinhTrang) where.TinhTrang = filters.TinhTrang;
  if (filters.MaKH) where.MaKH = filters.MaKH;
  if (filters.MaPhong) where.MaPhong = filters.MaPhong;

  const deposits = await DatCoc.findAll({
    where,
    include: [
      { model: KhachHang, as: 'khachHang', attributes: ['MaKH', 'HoTen', 'SDT', 'Email'] },
      { model: Phong, as: 'phong', attributes: ['MaPhong', 'GiaThue', 'KhuVuc', 'Tang'] },
      { model: Giuong, as: 'giuong', attributes: ['MaGiuong', 'GiaGiuong'] },
      { model: NhanVien, as: 'nguoiPheDuyet', attributes: ['MaNV', 'TenNV'] },
    ],
    order: [['NgayDatCoc', 'DESC']],
  });
  return deposits;
};

/**
 * Get a single deposit by ID
 */
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
  if (!datCoc) throw { statusCode: 404, message: 'Đặt cọc không tồn tại' };
  return datCoc;
};

/**
 * Expire overdue deposits (called by cron job)
 * Finds PENDING_PAYMENT deposits past deadline, sets EXPIRED, resets Phong/Giuong to AVAILABLE
 */
const expireOverdueDeposits = async () => {
  const now = new Date();

  const overdueDeposits = await DatCoc.findAll({
    where: {
      TinhTrang: 'PENDING_PAYMENT',
      ThoiGianHetHan: { [Op.lt]: now },
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

      // Reset room to AVAILABLE if it was set to PENDING by this deposit
      if (datCoc.phong && datCoc.phong.TinhTrang === 'PENDING') {
        // Check if there's another active deposit for this room
        const otherActive = await DatCoc.count({
          where: {
            MaPhong: datCoc.MaPhong,
            TinhTrang: 'PENDING_PAYMENT',
            MaCoc: { [Op.ne]: datCoc.MaCoc },
          },
          transaction: t,
        });
        if (otherActive === 0) {
          await datCoc.phong.update({ TinhTrang: 'AVAILABLE' }, { transaction: t });
        }
      }

      // Reset bed to AVAILABLE
      if (datCoc.giuong && datCoc.giuong.TinhTrang === 'PENDING') {
        await datCoc.giuong.update({ TinhTrang: 'AVAILABLE' }, { transaction: t });
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

module.exports = {
  createDepositRequest,
  confirmDeposit,
  getAllDeposits,
  getDepositById,
  expireOverdueDeposits,
  calculateDepositAmount,
};
