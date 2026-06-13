const { Op } = require('sequelize');
const { Phong, DatCoc, ThanhToan, LichXemPhong, KhachHang } = require('../models');

/**
 * Thống kê tổng quan cho Dashboard.
 * @param {object} query - bộ lọc từ req.query (ngay | thang+nam)
 * @returns {Promise<object>} các chỉ số tổng quan
 */
const getStats = async (query = {}) => {
  const today = new Date();
  const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);

  // Điều kiện lọc lịch xem phòng theo ngày cụ thể / theo tháng / mặc định hôm nay
  const lichWhere = {};
  if (query.ngay) {
    lichWhere.NgayXem = query.ngay;
  } else if (query.thang && query.nam) {
    const yr = parseInt(query.nam);
    const mo = parseInt(query.thang) - 1;
    lichWhere.NgayXem = {
      [Op.between]: [
        new Date(yr, mo, 1).toISOString().split('T')[0],
        new Date(yr, mo + 1, 0).toISOString().split('T')[0],
      ],
    };
  } else {
    lichWhere.NgayXem = today.toISOString().split('T')[0];
  }

  const [phongTrong, phongDangGiuCho, phongDangSuDung, doanhThuThang, lichXemHomNay, choXuLy] =
    await Promise.all([
      Phong.count({ where: { TinhTrang: 'AVAILABLE' } }),
      Phong.count({ where: { TinhTrang: { [Op.in]: ['PENDING', 'RESERVED'] } } }),
      Phong.count({ where: { TinhTrang: 'OCCUPIED' } }),
      ThanhToan.sum('SoTien', {
        where: {
          TinhTrang: 'SUCCESS',
          NgayThanhToan: { [Op.gte]: firstDayOfMonth },
          LoaiThanhToan: { [Op.in]: ['MONTHLY_RENT', 'SERVICE', 'PENALTY'] },
        },
      }),
      LichXemPhong.findAll({
        where: lichWhere,
        limit: 20,
        order: [['GioXem', 'ASC']],
        include: [
          { model: KhachHang, as: 'khachHang', attributes: ['HoTen', 'SDT'] },
          { model: Phong, as: 'phong', attributes: ['MaPhong', 'KhuVuc'] },
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
          { model: KhachHang, as: 'khachHang', attributes: ['HoTen', 'SDT'] },
          { model: Phong, as: 'phong', attributes: ['MaPhong'] },
        ],
      }),
    ]);

  return {
    phongTrong: phongTrong || 0,
    phongDangGiuCho: phongDangGiuCho || 0,
    phongDangSuDung: phongDangSuDung || 0,
    doanhThuThang: doanhThuThang || 0,
    lichXemHomNay,
    choXuLy,
  };
};

module.exports = { getStats };
