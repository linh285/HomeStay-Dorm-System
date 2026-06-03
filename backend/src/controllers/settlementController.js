const settlementService = require('../services/settlementService');
const { successResponse } = require('../utils/response');

const getSettlement = async (req, res, next) => {
  try {
    const result = await settlementService.getSettlementData(req.params.maTra);
    return successResponse(res, result);
  } catch (e) { next(e); }
};

const calculateSettlement = async (req, res, next) => {
  try {
    const result = await settlementService.calculateSettlement(req.params.maTra);
    return successResponse(res, result);
  } catch (e) { next(e); }
};

const confirmSettlement = async (req, res, next) => {
  try {
    const result = await settlementService.confirmSettlement(req.params.maTra, req.body);
    return successResponse(res, result, 'Xác nhận quyết toán thành công');
  } catch (e) { next(e); }
};

module.exports = { getSettlement, calculateSettlement, confirmSettlement };
