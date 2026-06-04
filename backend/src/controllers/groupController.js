const groupService = require('../services/groupService');
const { successResponse } = require('../utils/response');

const createGroup = async (req, res, next) => {
  try {
    const result = await groupService.createGroupWithMembers(req.body);
    return successResponse(res, result, 'Tạo nhóm thành công', 201);
  } catch (e) { next(e); }
};

const getGroupById = async (req, res, next) => {
  try {
    const result = await groupService.getGroupById(req.params.maNhom);
    return successResponse(res, result);
  } catch (e) { next(e); }
};

module.exports = { createGroup, getGroupById };