const dashboardService = require('../services/dashboardService');
const { successResponse } = require('../utils/response');

/**
 * GET /api/dashboard/stats
 * Trả về các chỉ số tổng quan cho Dashboard.
 */
const getStats = async (req, res, next) => {
  try {
    const stats = await dashboardService.getStats(req.query);
    return successResponse(res, stats);
  } catch (err) {
    next(err);
  }
};

module.exports = { getStats };
