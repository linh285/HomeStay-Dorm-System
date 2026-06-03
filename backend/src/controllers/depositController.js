const depositService = require('../services/depositService');
const { successResponse, errorResponse } = require('../utils/response');

const getAllDeposits = async (req, res, next) => {
  try {
    const filters = {
      TinhTrang: req.query.tinhTrang && req.query.tinhTrang !== 'ALL' ? req.query.tinhTrang : undefined,
    };
    const deposits = await depositService.getAllDeposits(filters);
    // Support pagination wrapper
    return successResponse(res, { deposits, total: deposits.length });
  } catch (e) { next(e); }
};

const getDepositById = async (req, res, next) => {
  try {
    const result = await depositService.getDepositById(req.params.maCoc);
    return successResponse(res, result);
  } catch (e) { next(e); }
};

const createDeposit = async (req, res, next) => {
  try {
    const count = await require('../models').DatCoc.count();
    const maCoc = `COC-${new Date().getFullYear()}-${String(count + 1).padStart(4, '0')}`;
    const result = await depositService.createDepositRequest({ ...req.body, MaCoc: maCoc });
    return successResponse(res, result, 'Tạo đặt cọc thành công', 201);
  } catch (e) { next(e); }
};

const confirmDeposit = async (req, res, next) => {
  try {
    const maNVPheDuyet = req.user.maNV;
    const countTT = await require('../models').ThanhToan.count();
    const maThanhToan = `TT-${String(countTT + 1).padStart(5, '0')}`;
    const result = await depositService.confirmDeposit(req.params.maCoc, {
      ...req.body, maNVPheDuyet, maThanhToan,
    });
    return successResponse(res, result, 'Xác nhận thanh toán cọc thành công');
  } catch (e) { next(e); }
};

module.exports = { getAllDeposits, getDepositById, createDeposit, confirmDeposit };
