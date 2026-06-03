const contractService = require('../services/contractService');
const { successResponse, errorResponse } = require('../utils/response');

const createContract = async (req, res, next) => {
  try {
    const result = await contractService.createContract({ ...req.body, maNVPhuTrach: req.user.maNV });
    return successResponse(res, result, 'Tạo hợp đồng thành công', 201);
  } catch (e) { next(e); }
};

const getAllContracts = async (req, res, next) => {
  try {
    const result = await contractService.getAllContracts(req.query);
    return successResponse(res, result, 'Danh sách hợp đồng');
  } catch (e) { next(e); }
};

const getContractById = async (req, res, next) => {
  try {
    const result = await contractService.getContractById(req.params.maHopDong);
    return successResponse(res, result);
  } catch (e) { next(e); }
};

const activateContract = async (req, res, next) => {
  try {
    const result = await contractService.activateContract(req.params.maHopDong);
    return successResponse(res, result, 'Hợp đồng đã được kích hoạt');
  } catch (e) { next(e); }
};

const terminateContract = async (req, res, next) => {
  try {
    const result = await contractService.terminateContract(req.params.maHopDong);
    return successResponse(res, result, 'Hợp đồng đã được thanh lý');
  } catch (e) { next(e); }
};

const screenMembers = async (req, res, next) => {
  try {
    const result = await contractService.screenMembers(req.params.maNhom, req.body.screeningResults);
    return successResponse(res, result, 'Rà soát thành viên thành công');
  } catch (e) { next(e); }
};

const findContractBySearch = async (req, res, next) => {
  try {
    const result = await contractService.findContractBySearch(req.query.keyword);
    return successResponse(res, result);
  } catch (e) { next(e); }
};

module.exports = { createContract, getAllContracts, getContractById, activateContract, terminateContract, screenMembers, findContractBySearch };
