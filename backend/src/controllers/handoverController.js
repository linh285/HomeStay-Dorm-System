const handoverService = require('../services/handoverService');
const { successResponse, errorResponse } = require('../utils/response');

const createHandover = async (req, res, next) => {
  try {
    const result = await handoverService.createHandover(req.params.maHopDong, req.user.maNV);
    return successResponse(res, result, 'Tạo biên bản bàn giao thành công', 201);
  } catch (e) { next(e); }
};

const getHandoverByContract = async (req, res, next) => {
  try {
    const result = await handoverService.getHandoverByContract(req.params.maHopDong);
    return successResponse(res, result);
  } catch (e) { next(e); }
};

const confirmHandover = async (req, res, next) => {
  try {
    const result = await handoverService.confirmHandover(req.params.maBanGiao);
    return successResponse(res, result, 'Xác nhận bàn giao thành công');
  } catch (e) { next(e); }
};

const updateAssetCheck = async (req, res, next) => {
  try {
    const result = await handoverService.updateAssetCheck(req.params.maBanGiao, req.params.maTaiSan, req.body);
    return successResponse(res, result, 'Cập nhật kiểm tra tài sản');
  } catch (e) { next(e); }
};

const addAsset = async (req, res, next) => {
  try {
    const result = await handoverService.addAssetToHandover(req.params.maBanGiao, req.body);
    return successResponse(res, result, 'Thêm tài sản thành công', 201);
  } catch (e) { next(e); }
};

const getDefaultAssets = async (req, res, next) => {
  try {
    return successResponse(res, handoverService.getDefaultAssets());
  } catch (e) { next(e); }
};

module.exports = { createHandover, getHandoverByContract, confirmHandover, updateAssetCheck, addAsset, getDefaultAssets };
