const { Op } = require('sequelize');
const { TraPhong, ChiTietKhauTru, HopDongThueNha, Phong, Giuong, NhanVien, Nhom, KhachHang, DatCoc, sequelize } = require('../models');
const { diffInMonths } = require('../utils/dateHelpers');

/**
 * Tính tỷ lệ hoàn cọc theo quy định nghiệp vụ
 */
const calculateRefundRate = (hopDong, ngayTra) => {
  if (!hopDong) return 0.8; // Chưa ký hợp đồng → 80%
  const ngayBatDau = new Date(hopDong.NgayBatDau);
  const ngayKetThuc = new Date(hopDong.NgayKetThuc);
  const ngayTraDate = new Date(ngayTra || new Date());
  const monthsStayed = diffInMonths(ngayBatDau, ngayTraDate);

  // HĐ đã hết hạn tự nhiên
  if (ngayTraDate >= ngayKetThuc) return 1.0;
  // HĐ chưa hết hạn, ở < 6 tháng
  if (monthsStayed < 6) return 0.5;
  // HĐ chưa hết hạn, ở >= 6 tháng
  return 0.7;
};

/**
 * Tạo yêu cầu trả phòng
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
 * Lấy tất cả yêu cầu trả phòng
 */
const getAllCheckoutRequests = async (filters = {}) => {
  const { trangThai, search, page = 1, limit = 20 } = filters;
  const where = {};
  if (trangThai && trangThai !== 'ALL') where.TrangThai = trangThai;

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
 * Bắt đầu kiểm tra phòng
 */
const startInspection = async (maTra, maNVXuLy) => {
  const traPhong = await TraPhong.findByPk(maTra);
  if (!traPhong) throw { statusCode: 404, message: 'Không tìm thấy yêu cầu trả phòng' };
  await traPhong.update({ TrangThai: 'INSPECTING', MaNVXuLy: maNVXuLy });
  return traPhong;
};

/**
 * Hoàn tất kiểm tra phòng - tính tỷ lệ hoàn cọc tự động
 */
const completeInspection = async (maTra, data) => {
  const { tinhTrangPhong, ngayTraThucTe, ghiChu } = data;
  const traPhong = await TraPhong.findByPk(maTra, {
    include: [{ model: HopDongThueNha, as: 'hopDong', include: [{ model: DatCoc, as: 'datCoc' }] }]
  });
  if (!traPhong) throw { statusCode: 404, message: 'Không tìm thấy yêu cầu trả phòng' };

  const hopDong = traPhong.hopDong;
  const ngayTra = ngayTraThucTe || new Date();
  const tyLeHoanCoc = calculateRefundRate(hopDong, ngayTra);
  const soTienCoc = hopDong?.datCoc?.SoTienCoc || 0;
  const soTienHoan = Math.round(soTienCoc * tyLeHoanCoc);

  await traPhong.update({
    TinhTrangPhong: tinhTrangPhong,
    NgayTraThucTe: ngayTra,
    TyLeHoanCoc: tyLeHoanCoc * 100,
    SoTienHoan: soTienHoan,
    TrangThai: 'INSPECTING',
  });

  return traPhong;
};

/**
 * Ghi nhận hư hại / khoản khấu trừ
 */
const addDamageRecord = async (maTra, data) => {
  const { loaiPhi, soTien, ghiChu } = data;
  const khauTru = await ChiTietKhauTru.create({
    MaTra: maTra,
    LoaiPhi: loaiPhi,
    SoTien: soTien,
    GhiChu: ghiChu,
  });
  // Recalculate SoTienHoan
  const traPhong = await TraPhong.findByPk(maTra, {
    include: [
      { model: ChiTietKhauTru, as: 'chiTietKhauTrus' },
      { model: HopDongThueNha, as: 'hopDong', include: [{ model: DatCoc, as: 'datCoc' }] }
    ]
  });
  const tongKhauTru = traPhong.chiTietKhauTrus.reduce((sum, k) => sum + Number(k.SoTien), 0);
  const soTienCoc = traPhong.hopDong?.datCoc?.SoTienCoc || 0;
  const soTienHoan = Math.max(0, Math.round(soTienCoc * (traPhong.TyLeHoanCoc / 100)) - tongKhauTru);
  await traPhong.update({ SoTienHoan: soTienHoan });
  return khauTru;
};

module.exports = { createCheckoutRequest, getAllCheckoutRequests, getCheckoutById, startInspection, completeInspection, addDamageRecord, calculateRefundRate };
