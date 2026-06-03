const policyService = require('../services/policyService');
const { successResponse } = require('../utils/response');

const getAllPolicies = async (req, res, next) => {
  try { return successResponse(res, await policyService.getAllPolicies(req.query)); } catch (e) { next(e); }
};
const getPolicyById = async (req, res, next) => {
  try { return successResponse(res, await policyService.getPolicyById(req.params.id)); } catch (e) { next(e); }
};
const createPolicy = async (req, res, next) => {
  try { return successResponse(res, await policyService.createPolicy(req.body), 'Tạo quy định thành công', 201); } catch (e) { next(e); }
};
const updatePolicy = async (req, res, next) => {
  try { return successResponse(res, await policyService.updatePolicy(req.params.id, req.body), 'Cập nhật quy định'); } catch (e) { next(e); }
};
const deletePolicy = async (req, res, next) => {
  try { return successResponse(res, await policyService.deletePolicy(req.params.id), 'Xóa quy định'); } catch (e) { next(e); }
};

module.exports = { getAllPolicies, getPolicyById, createPolicy, updatePolicy, deletePolicy };
