const bcrypt = require('bcryptjs');
const { NhanVien, ChiNhanh } = require('../models');
const { generateToken } = require('../utils/jwt');

/**
 * Login service - validate credentials and return token
 */
const login = async (email, matKhau) => {
  const nhanVien = await NhanVien.findOne({
    where: { Email: email, IsActive: true },
    include: [{ model: ChiNhanh, as: 'chiNhanh' }],
  });

  if (!nhanVien) {
    throw { statusCode: 401, message: 'Sai tài khoản hoặc mật khẩu' };
  }

  const isMatch = await bcrypt.compare(matKhau, nhanVien.MatKhau);
  if (!isMatch) {
    throw { statusCode: 401, message: 'Sai tài khoản hoặc mật khẩu' };
  }

  const token = generateToken({
    maNV: nhanVien.MaNV,
    tenNV: nhanVien.TenNV,
    email: nhanVien.Email,
    chucVu: nhanVien.ChucVu,
    maChiNhanh: nhanVien.MaChiNhanh,
  });

  return {
    token,
    user: {
      maNV: nhanVien.MaNV,
      tenNV: nhanVien.TenNV,
      email: nhanVien.Email,
      chucVu: nhanVien.ChucVu,
      maChiNhanh: nhanVien.MaChiNhanh,
      chiNhanh: nhanVien.chiNhanh,
    },
  };
};

/**
 * Change password service
 */
const changePassword = async (maNV, oldPassword, newPassword) => {
  const nhanVien = await NhanVien.findByPk(maNV);
  if (!nhanVien) throw { statusCode: 404, message: 'Nhân viên không tồn tại' };

  const isMatch = await bcrypt.compare(oldPassword, nhanVien.MatKhau);
  if (!isMatch) throw { statusCode: 400, message: 'Mật khẩu cũ không đúng' };

  const hashed = await bcrypt.hash(newPassword, 10);
  await nhanVien.update({ MatKhau: hashed });
  return { message: 'Đổi mật khẩu thành công' };
};

module.exports = { login, changePassword };
