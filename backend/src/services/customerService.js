const { Op } = require('sequelize');
const { KhachHang } = require('../models');
const { v4: uuidv4 } = require('uuid');

const getAllCustomers = async (filters = {}) => {
  const { search, page = 1, limit = 20 } = filters;
  const where = {};
  if (search) {
    where[Op.or] = [
      { HoTen: { [Op.iLike]: `%${search}%` } },
      { SDT: { [Op.iLike]: `%${search}%` } },
      { Email: { [Op.iLike]: `%${search}%` } },
    ];
  }
  const { count, rows } = await KhachHang.findAndCountAll({
    where, order: [['HoTen', 'ASC']],
    limit: parseInt(limit),
    offset: (parseInt(page) - 1) * parseInt(limit),
  });
  return { total: count, customers: rows };
};

const getCustomerById = async (maKH) => {
  const k = await KhachHang.findByPk(maKH);
  if (!k) throw { statusCode: 404, message: 'Khách hàng không tồn tại' };
  return k;
};

const createCustomer = async (data) => {
  const maKH = `KH-${uuidv4().slice(0, 8).toUpperCase()}`;
  return await KhachHang.create({ MaKH: maKH, ...data });
};

const updateCustomer = async (maKH, data) => {
  const k = await KhachHang.findByPk(maKH);
  if (!k) throw { statusCode: 404, message: 'Khách hàng không tồn tại' };
  await k.update(data);
  return k;
};

module.exports = { getAllCustomers, getCustomerById, createCustomer, updateCustomer };
