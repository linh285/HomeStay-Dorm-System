const { Op } = require('sequelize');
const { QuyDinh } = require('../models');

const getAllPolicies = async (filters = {}) => {
  const { trangThai, nhomQuyDinh, search, page = 1, limit = 20 } = filters;
  const where = {};
  if (trangThai && trangThai !== 'ALL') where.TrangThai = trangThai;
  if (nhomQuyDinh) where.NhomQuyDinh = nhomQuyDinh;
  if (search) where.TieuDe = { [Op.iLike]: `%${search}%` };

  const { count, rows } = await QuyDinh.findAndCountAll({
    where,
    order: [['NgayHieuLuc', 'DESC']],
    limit: parseInt(limit),
    offset: (parseInt(page) - 1) * parseInt(limit),
  });
  return { total: count, policies: rows };
};

const getPolicyById = async (maQuyDinh) => {
  const p = await QuyDinh.findByPk(maQuyDinh);
  if (!p) throw { statusCode: 404, message: 'Quy định không tồn tại' };
  return p;
};

const createPolicy = async (data) => {
  const { NgayHieuLuc, NgayHetHieuLuc } = data;
  if (NgayHetHieuLuc && new Date(NgayHetHieuLuc) < new Date(NgayHieuLuc)) {
    throw { statusCode: 400, message: 'Ngày hết hiệu lực phải lớn hơn hoặc bằng ngày hiệu lực' };
  }
  const count = await QuyDinh.count();
  const maQuyDinh = `QD-${String(count + 1).padStart(4, '0')}`;
  return await QuyDinh.create({ MaQuyDinh: maQuyDinh, ...data });
};

const updatePolicy = async (maQuyDinh, data) => {
  const { NgayHieuLuc, NgayHetHieuLuc } = data;
  if (NgayHetHieuLuc && NgayHieuLuc && new Date(NgayHetHieuLuc) < new Date(NgayHieuLuc)) {
    throw { statusCode: 400, message: 'Ngày hết hiệu lực phải lớn hơn hoặc bằng ngày hiệu lực' };
  }
  const p = await QuyDinh.findByPk(maQuyDinh);
  if (!p) throw { statusCode: 404, message: 'Quy định không tồn tại' };
  await p.update(data);
  return p;
};

const deletePolicy = async (maQuyDinh) => {
  const p = await QuyDinh.findByPk(maQuyDinh);
  if (!p) throw { statusCode: 404, message: 'Quy định không tồn tại' };
  await p.destroy();
  return { message: 'Đã xóa quy định' };
};

module.exports = { getAllPolicies, getPolicyById, createPolicy, updatePolicy, deletePolicy };
