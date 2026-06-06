const { Op } = require('sequelize');
const { TraPhong, ChiTietKhauTru, HopDongThueNha, Phong, Giuong, NhanVien, Nhom, KhachHang, DatCoc, sequelize } = require('../models');

/**
 * Tạo yêu cầu trả phòng (SALE)
 */
const createCheckoutRequest = async (data) => {
  const { maHopDong, ngayTraDuKien, lyDo, ghiChu, maNVXuLy } = data;

  const hopDong = await HopDongThueNha.findByPk(maHopDong);
  if (!hopDong) throw { statusCode: 404, message: 'Hợp đồng không tồn tại' };
  if (!['ACTIVE'].includes(hopDong.TinhTrang)) {
    throw { statusCode: 400, message: 'Hợp đồng không ở trạng thái hoạt động' };
  }

  const count = await TraPhong.count();
  const maTra = `TR-${String(count + 1).padStart(4, '0')}`;

  const traPhong = await TraPhong.create({
    MaTra: maTra,
    MaHopDong: maHopDong,
    NgayYeuCau: new Date(),
    NgayTraDuKien: ngayTraDuKien,
    LyDo: lyDo,
    TrangThai: 'PENDING',
    MaNVXuLy: maNVXuLy || null,
  });

  return traPhong;
};

/**
 * Lấy tất cả yêu cầu trả phòng (hỗ trợ lọc status, ví dụ: status=PENDING,INSPECTING)
 */
const getAllCheckoutRequests = async (filters = {}) => {
  const { trangThai, search, page = 1, limit = 20 } = filters;
  const where = {};
  if (trangThai && trangThai !== 'ALL') {
    // Cho phép lọc nhiều status cách nhau bằng dấu phẩy
    const statuses = trangThai.split(',');
    where.TrangThai = { [Op.in]: statuses };
  }

  const { count, rows } = await TraPhong.findAndCountAll({
    where,
    include: [
      {
        model: HopDongThueNha, as: 'hopDong',
        include: [
          { model: Phong, as: 'phong', attributes: ['MaPhong', 'KhuVuc', 'Tang'] },
          { model: Nhom, as: 'nhom', include: [{ model: KhachHang, as: 'daiDien', attributes: ['HoTen', 'SDT'] }] },
        ]
      },
      { model: NhanVien, as: 'nhanVienXuLy', attributes: ['TenNV'] },
    ],
    order: [['NgayYeuCau', 'DESC']],
    limit: parseInt(limit),
    offset: (parseInt(page) - 1) * parseInt(limit),
  });

  return { total: count, checkouts: rows, page, limit };
};

/**
 * Lấy yêu cầu trả phòng theo ID
 */
const getCheckoutById = async (maTra) => {
  const traPhong = await TraPhong.findByPk(maTra, {
    include: [
      {
        model: HopDongThueNha, as: 'hopDong',
        include: [
          { model: Phong, as: 'phong' },
          { model: DatCoc, as: 'datCoc', attributes: ['SoTienCoc', 'TinhTrang'] },
          { model: Nhom, as: 'nhom', include: [{ model: KhachHang, as: 'daiDien' }] },
        ]
      },
      { model: ChiTietKhauTru, as: 'chiTietKhauTrus' },
      { model: NhanVien, as: 'nhanVienXuLy', attributes: ['TenNV', 'ChucVu'] },
    ],
  });
  if (!traPhong) throw { statusCode: 404, message: 'Yêu cầu trả phòng không tồn tại' };
  return traPhong;
};

/**
 * Bắt đầu kiểm tra phòng (MANAGER)
 */
const startInspection = async (maTra, maNVXuLy) => {
  const traPhong = await TraPhong.findByPk(maTra);
  if (!traPhong) throw { statusCode: 404, message: 'Không tìm thấy yêu cầu trả phòng' };
  if (traPhong.TrangThai !== 'PENDING') {
    throw { statusCode: 400, message: 'Yêu cầu không ở trạng thái chờ kiểm tra' };
  }
  await traPhong.update({ TrangThai: 'INSPECTING', MaNVXuLy: maNVXuLy });
  return traPhong;
};

/**
 * Hoàn tất kiểm tra phòng (MANAGER) → chuyển thành INSPECTED, chờ kế toán
 */
const completeInspection = async (maTra, data) => {
  const { tinhTrangPhong, ngayTraThucTe, ghiChu } = data;
  const traPhong = await TraPhong.findByPk(maTra);
  if (!traPhong) throw { statusCode: 404, message: 'Không tìm thấy yêu cầu trả phòng' };

  await traPhong.update({
    TinhTrangPhong: tinhTrangPhong,
    NgayTraThucTe: ngayTraThucTe || new Date(),
    TrangThai: 'INSPECTED',   // chờ kế toán
  });

  return traPhong;
};

/**
 * Ghi nhận hư hại / khoản khấu trừ (MANAGER)
 */
const addDamageRecord = async (maTra, data) => {
  const { loaiPhi, soTien, ghiChu } = data;
  const khauTru = await ChiTietKhauTru.create({
    MaTra: maTra,
    LoaiPhi: loaiPhi,
    SoTien: soTien,
    GhiChu: ghiChu,
  });
  return khauTru;
};

module.exports = {
  createCheckoutRequest,
  getAllCheckoutRequests,
  getCheckoutById,
  startInspection,
  completeInspection,
  addDamageRecord,
};