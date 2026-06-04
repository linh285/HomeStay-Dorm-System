const { LichXemPhong, KhachHang, Phong, NhanVien } = require('../models');
const { Op } = require('sequelize');
const { v4: uuidv4 } = require('uuid');

const create = async (data) => {
  const { MaKH, MaPhong, MaNV, NgayXem, GioXem, GhiChu } = data;
  const maLich = `LX-${uuidv4().slice(0, 8).toUpperCase()}`;
  return await LichXemPhong.create({
    MaLich: maLich,
    MaKH,
    MaPhong,
    MaNV,
    NgayXem,
    GioXem,
    GhiChu,
    TrangThai: 'PENDING',
  });
};

const getAll = async (filters = {}) => {
  const { ngay, thang, nam, trangThai, maKH, maPhong } = filters;
  const where = {};
  if (trangThai) where.TrangThai = trangThai;
  if (maKH) where.MaKH = maKH;
  if (maPhong) where.MaPhong = maPhong;
  if (ngay) where.NgayXem = ngay;
  if (thang && nam) {
    const start = new Date(nam, thang - 1, 1);
    const end = new Date(nam, thang, 0);
    where.NgayXem = { [Op.between]: [start.toISOString().split('T')[0], end.toISOString().split('T')[0]] };
  }
  const schedules = await LichXemPhong.findAll({
    where,
    include: [
      { model: KhachHang, as: 'khachHang', attributes: ['MaKH', 'HoTen', 'SDT'] },
      { model: Phong, as: 'phong', attributes: ['MaPhong', 'GiaThue', 'SucChua'] },
      { model: NhanVien, as: 'nhanVien', attributes: ['TenNV'] },
    ],
    order: [['NgayXem', 'DESC'], ['GioXem', 'DESC']],
  });
  return schedules;
};

const getById = async (maLich) => {
  const lich = await LichXemPhong.findByPk(maLich, {
    include: [
      { model: KhachHang, as: 'khachHang' },
      { model: Phong, as: 'phong' },
      { model: NhanVien, as: 'nhanVien' },
    ],
  });
  if (!lich) throw { statusCode: 404, message: 'Không tìm thấy lịch xem' };
  return lich;
};

const update = async (maLich, data) => {
  const lich = await LichXemPhong.findByPk(maLich);
  if (!lich) throw { statusCode: 404, message: 'Không tìm thấy lịch xem' };
  await lich.update(data);
  return lich;
};

const deleteLich = async (maLich) => {
  const lich = await LichXemPhong.findByPk(maLich);
  if (!lich) throw { statusCode: 404, message: 'Không tìm thấy lịch xem' };
  await lich.destroy();
  return { message: 'Đã xóa lịch xem' };
};

module.exports = { create, getAll, getById, update, deleteLich };