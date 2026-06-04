const { Nhom, ThanhVienNhom, KhachHang } = require('../models');
const { v4: uuidv4 } = require('uuid');

/**
 * Tạo nhóm mới và thêm các thành viên.
 * @param {Object} data - { tenNhom, maDaiDien, thanhViens: [{ hoTen, sdt, email }] }
 * @returns {Object} nhóm vừa tạo kèm danh sách thành viên.
 */
const createGroupWithMembers = async (data) => {
  const { tenNhom, maDaiDien, thanhViens = [] } = data;

  if (!maDaiDien) throw { statusCode: 400, message: 'Thiếu mã khách hàng đại diện' };

  // Kiểm tra khách hàng đại diện tồn tại
  const daiDien = await KhachHang.findByPk(maDaiDien);
  if (!daiDien) throw { statusCode: 404, message: 'Khách hàng đại diện không tồn tại' };

  const count = await Nhom.count();
  const maNhom = `NHOM-${String(count + 1).padStart(4, '0')}`;

  const nhom = await Nhom.create({
    MaNhom: maNhom,
    TenNhom: tenNhom || `Nhóm của ${daiDien.HoTen}`,
    MaDaiDien: maDaiDien,
    TrangThai: 'ACTIVE',
    NgayTao: new Date(),
  });

  // Thêm từng thành viên (nếu có)
  const thanhVienRecords = [];
  for (const tv of thanhViens) {
    // Tìm hoặc tạo khách hàng dựa trên sdt
    let khach = await KhachHang.findOne({ where: { SDT: tv.sdt } });
    if (!khach && tv.hoTen && tv.sdt) {
      const countKH = await KhachHang.count();
      const maKH = `KH-${String(countKH + 1).padStart(4, '0')}`;
      khach = await KhachHang.create({
        MaKH: maKH,
        HoTen: tv.hoTen,
        SDT: tv.sdt,
        Email: tv.email || null,
      });
    }
    if (khach) {
      await ThanhVienNhom.create({
        MaNhom: maNhom,
        MaKH: khach.MaKH,
        TrangThai: 'PENDING',
      });
      thanhVienRecords.push(khach);
    }
  }

  return await getGroupById(maNhom);
};

/**
 * Lấy thông tin nhóm theo mã nhóm (kèm thành viên).
 */
const getGroupById = async (maNhom) => {
  const nhom = await Nhom.findByPk(maNhom, {
    include: [
      { model: KhachHang, as: 'daiDien', attributes: ['MaKH', 'HoTen', 'SDT', 'Email', 'GiayToTuyThan'] },
      { model: KhachHang, as: 'thanhViens', through: { attributes: ['TrangThai'] } }
    ]
  });
  if (!nhom) throw { statusCode: 404, message: 'Nhóm không tồn tại' };
  return nhom;
};

module.exports = { createGroupWithMembers, getGroupById };