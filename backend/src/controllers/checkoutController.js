const checkoutService = require('../services/checkoutService');
const { successResponse } = require('../utils/response');

const createCheckout = async (req, res, next) => {
  try {
    const result = await checkoutService.createCheckoutRequest({ ...req.body, maNVXuLy: req.user.maNV });
    return successResponse(res, result, 'Tạo yêu cầu trả phòng thành công', 201);
  } catch (e) { next(e); }
};

const getAllCheckouts = async (req, res, next) => {
  try {
    const result = await checkoutService.getAllCheckoutRequests(req.query);
    return successResponse(res, result);
  } catch (e) { next(e); }
};

const getCheckoutById = async (req, res, next) => {
  try {
    const result = await checkoutService.getCheckoutById(req.params.maTra);
    return successResponse(res, result);
  } catch (e) { next(e); }
};

const startInspection = async (req, res, next) => {
  try {
    const result = await checkoutService.startInspection(req.params.maTra, req.user.maNV);
    return successResponse(res, result, 'Bắt đầu kiểm tra phòng');
  } catch (e) { next(e); }
};

const completeInspection = async (req, res, next) => {
  try {
    const result = await checkoutService.completeInspection(req.params.maTra, req.body);
    return successResponse(res, result, 'Hoàn tất kiểm tra phòng');
  } catch (e) { next(e); }
};

const addDamage = async (req, res, next) => {
  try {
    const result = await checkoutService.addDamageRecord(req.params.maTra, req.body);
    return successResponse(res, result, 'Ghi nhận hư hại thành công', 201);
  } catch (e) { next(e); }
};

module.exports = { createCheckout, getAllCheckouts, getCheckoutById, startInspection, completeInspection, addDamage };
