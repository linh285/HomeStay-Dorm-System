const customerService = require('../services/customerService');
const { successResponse } = require('../utils/response');

const getAllCustomers = async (req, res, next) => {
  try { return successResponse(res, await customerService.getAllCustomers(req.query)); } catch (e) { next(e); }
};
const getCustomerById = async (req, res, next) => {
  try { return successResponse(res, await customerService.getCustomerById(req.params.id)); } catch (e) { next(e); }
};
const createCustomer = async (req, res, next) => {
  try { return successResponse(res, await customerService.createCustomer(req.body), 'Tạo khách hàng thành công', 201); } catch (e) { next(e); }
};
const updateCustomer = async (req, res, next) => {
  try { return successResponse(res, await customerService.updateCustomer(req.params.id, req.body)); } catch (e) { next(e); }
};

module.exports = { getAllCustomers, getCustomerById, createCustomer, updateCustomer };
