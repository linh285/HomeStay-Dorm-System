const lichXemService = require('../services/lichXemService');
const { successResponse, errorResponse } = require('../utils/response');

const create = async (req, res, next) => {
  try {
    const result = await lichXemService.create({ ...req.body, MaNV: req.user.maNV });
    return successResponse(res, result, 'Tạo lịch xem thành công', 201);
  } catch (e) { next(e); }
};

const getAll = async (req, res, next) => {
  try {
    const result = await lichXemService.getAll(req.query);
    return successResponse(res, result);
  } catch (e) { next(e); }
};

const getById = async (req, res, next) => {
  try {
    const result = await lichXemService.getById(req.params.maLich);
    return successResponse(res, result);
  } catch (e) { next(e); }
};

const update = async (req, res, next) => {
  try {
    const result = await lichXemService.update(req.params.maLich, req.body);
    return successResponse(res, result, 'Cập nhật lịch xem thành công');
  } catch (e) { next(e); }
};

const deleteLich = async (req, res, next) => {
  try {
    const result = await lichXemService.deleteLich(req.params.maLich);
    return successResponse(res, result, 'Xóa lịch xem thành công');
  } catch (e) { next(e); }
};

module.exports = { create, getAll, getById, update, deleteLich };