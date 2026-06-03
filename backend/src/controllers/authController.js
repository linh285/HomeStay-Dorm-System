const authService = require('../services/authService');
const { successResponse, errorResponse } = require('../utils/response');

/**
 * POST /api/auth/login
 */
const login = async (req, res, next) => {
  try {
    const { email, matKhau } = req.body;
    if (!email || !matKhau) {
      return errorResponse(res, 'Email và mật khẩu là bắt buộc', 400);
    }
    const result = await authService.login(email, matKhau);
    return successResponse(res, result, 'Đăng nhập thành công');
  } catch (error) {
    next(error);
  }
};

/**
 * POST /api/auth/change-password
 */
const changePassword = async (req, res, next) => {
  try {
    const { oldPassword, newPassword } = req.body;
    if (!oldPassword || !newPassword) {
      return errorResponse(res, 'Mật khẩu cũ và mật khẩu mới là bắt buộc', 400);
    }
    const result = await authService.changePassword(req.user.maNV, oldPassword, newPassword);
    return successResponse(res, result, 'Đổi mật khẩu thành công');
  } catch (error) {
    next(error);
  }
};

/**
 * GET /api/auth/profile
 */
const getProfile = async (req, res) => {
  return successResponse(res, req.user, 'Thông tin người dùng');
};

module.exports = { login, changePassword, getProfile };
