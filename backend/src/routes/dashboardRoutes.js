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
    const todayStr = today.toISOString().split('T')[0];

    const [phongTrong, phongDangGiuCho, phongDangSuDung, doanhThuThang, lichXemHomNay, choXuLy] =
      await Promise.all([
        Phong.count({ where: { TinhTrang: 'AVAILABLE' } }),
        Phong.count({ where: { TinhTrang: { [Op.in]: ['PENDING', 'RESERVED'] } } }),
        Phong.count({ where: { TinhTrang: 'OCCUPIED' } }),
        ThanhToan.sum('SoTien', {
          where: {
            TinhTrang: 'SUCCESS',
            NgayThanhToan: { [Op.gte]: firstDayOfMonth },
            LoaiThanhToan: { [Op.in]: ['MONTHLY_RENT', 'DEPOSIT'] },
          },
        }),
        LichXemPhong.findAll({
          where: { NgayXem: todayStr, TrangThai: 'PENDING' },
          limit: 5,
          include: [
            { model: require('../models').KhachHang, as: 'khachHang', attributes: ['HoTen', 'SDT'] },
            { model: require('../models').Phong, as: 'phong', attributes: ['MaPhong', 'KhuVuc'] },
          ],
        }),
        DatCoc.findAll({
          where: { TinhTrang: 'PENDING_PAYMENT' },
          limit: 5,
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
