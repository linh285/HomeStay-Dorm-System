const express = require('express');
const router = express.Router();
const { authenticate } = require('../middleware/auth');
const { Phong, DatCoc, HopDongThueNha, ThanhToan, LichXemPhong } = require('../models');
const { Op } = require('sequelize');
const { successResponse } = require('../utils/response');

router.get('/stats', authenticate, async (req, res, next) => {
  try {
    const today = new Date();
    const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);

    // Support optional date filter from frontend (YYYY-MM-DD, or month/year)
    let filterDate = today.toISOString().split('T')[0];
    if (req.query.ngay) filterDate = req.query.ngay;
    else if (req.query.thang && req.query.nam) {
      // Return all viewings in that month
      filterDate = null;
    }

    // Build LichXemPhong where clause
    const lichWhere = {};
    if (req.query.ngay) {
      lichWhere.NgayXem = req.query.ngay;
    } else if (req.query.thang && req.query.nam) {
      const yr = parseInt(req.query.nam);
      const mo = parseInt(req.query.thang) - 1;
      lichWhere.NgayXem = {
        [Op.between]: [
          new Date(yr, mo, 1).toISOString().split('T')[0],
          new Date(yr, mo + 1, 0).toISOString().split('T')[0],
        ],
      };
    } else {
      // Default: today
      lichWhere.NgayXem = today.toISOString().split('T')[0];
    }
    // No TrangThai filter - show all scheduled viewings for selected date

    const [phongTrong, phongDangGiuCho, phongDangSuDung, doanhThuThang, lichXemHomNay, choXuLy] =
      await Promise.all([
        Phong.count({ where: { TinhTrang: 'AVAILABLE' } }),
        Phong.count({ where: { TinhTrang: { [Op.in]: ['PENDING', 'RESERVED'] } } }),
        Phong.count({ where: { TinhTrang: 'OCCUPIED' } }),
        ThanhToan.sum('SoTien', {
          where: {
            TinhTrang: { [Op.in]: ['SUCCESS', 'COMPLETED'] },
            NgayThanhToan: { [Op.gte]: firstDayOfMonth },
            LoaiThanhToan: { [Op.in]: ['MONTHLY_RENT', 'DEPOSIT'] },
          },
        }),
        LichXemPhong.findAll({
          where: lichWhere,
          limit: 20,
          order: [['GioXem', 'ASC']],
          include: [
            { model: require('../models').KhachHang, as: 'khachHang', attributes: ['HoTen', 'SDT'] },
            { model: require('../models').Phong, as: 'phong', attributes: ['MaPhong', 'KhuVuc'] },
          ],
        }),
        DatCoc.findAll({
          where: {
            TinhTrang: { [Op.in]: ['PENDING_PAYMENT', 'PENDING_APPROVAL'] },
            ThoiGianHetHan: { [Op.gt]: new Date() }, // chỉ lấy những cọc chưa quá hạn
          },
          limit: 10,
          order: [['NgayDatCoc', 'DESC']],
          include: [
            { model: require('../models').KhachHang, as: 'khachHang', attributes: ['HoTen', 'SDT'] },
            { model: require('../models').Phong, as: 'phong', attributes: ['MaPhong'] },
          ],
        }),
      ]);

    return successResponse(res, {
      phongTrong: phongTrong || 0,
      phongDangGiuCho: phongDangGiuCho || 0,
      phongDangSuDung: phongDangSuDung || 0,
      doanhThuThang: doanhThuThang || 0,
      lichXemHomNay,
      choXuLy,
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
