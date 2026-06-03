const { Op } = require('sequelize');
const { ThanhToan, HopDongThueNha, DatCoc } = require('../models');

const createInvoice = async (data) => {
  const { maHopDong, maCoc, soTien, phuongThuc, loaiThanhToan, ghiChu, maSoChungTu } = data;
  const count = await ThanhToan.count();
  const maThanhToan = `TT-${String(count + 1).padStart(5, '0')}`;
  const invoice = await ThanhToan.create({
    MaThanhToan: maThanhToan,
    MaHopDong: maHopDong || null,
    MaCoc: maCoc || null,
    SoTien: soTien,
    PhuongThuc: phuongThuc || 'TIEN_MAT',
    NgayThanhToan: new Date(),
    LoaiThanhToan: loaiThanhToan,
    TinhTrang: 'SUCCESS',
    GhiChu: ghiChu || '',
    MaSoChungTu: maSoChungTu || '',
  });
  return invoice;
};

const getAllInvoices = async (filters = {}) => {
  const { loaiThanhToan, tinhTrang, search, page = 1, limit = 20 } = filters;
  const where = {};
  if (loaiThanhToan) where.LoaiThanhToan = loaiThanhToan;
  if (tinhTrang) where.TinhTrang = tinhTrang;

  const { count, rows } = await ThanhToan.findAndCountAll({
    where,
    include: [
      { model: HopDongThueNha, as: 'hopDong', attributes: ['MaHopDong', 'GiaThue'], required: false },
      { model: DatCoc, as: 'datCoc', attributes: ['MaCoc', 'SoTienCoc'], required: false },
    ],
    order: [['NgayThanhToan', 'DESC']],
    limit: parseInt(limit),
    offset: (parseInt(page) - 1) * parseInt(limit),
  });
  return { total: count, invoices: rows };
};

const getInvoiceById = async (maThanhToan) => {
  const inv = await ThanhToan.findByPk(maThanhToan, {
    include: [
      { model: HopDongThueNha, as: 'hopDong', required: false },
      { model: DatCoc, as: 'datCoc', required: false },
    ],
  });
  if (!inv) throw { statusCode: 404, message: 'Hóa đơn không tồn tại' };
  return inv;
};

const getInvoicesByContract = async (maHopDong) => {
  return await ThanhToan.findAll({ where: { MaHopDong: maHopDong }, order: [['NgayThanhToan', 'DESC']] });
};

module.exports = { createInvoice, getAllInvoices, getInvoiceById, getInvoicesByContract };
