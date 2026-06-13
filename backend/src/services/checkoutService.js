const { Op } = require('sequelize');
const { TraPhong, ChiTietKhauTru, HopDongThueNha, Phong, NhanVien, Nhom, KhachHang, DatCoc } = require('../models');
const { diffInMonths } = require('../utils/dateHelpers');

const calculateRefundRate = (hopDong, ngayTra) => {
  if (!hopDong) return 0.8;

  const ngayBatDau = new Date(hopDong.NgayBatDau);
  const ngayKetThuc = new Date(hopDong.NgayKetThuc);
  const ngayTraDate = new Date(ngayTra || new Date());
  const monthsStayed = diffInMonths(ngayBatDau, ngayTraDate);

  if (ngayTraDate >= ngayKetThuc) return 1.0;
  if (monthsStayed < 6) return 0.5;
  return 0.7;
};

const createCheckoutRequest = async (data) => {
  const { maHopDong, ngayTraDuKien, lyDo, maNVXuLy } = data;

  const hopDong = await HopDongThueNha.findByPk(maHopDong);
  if (!hopDong) throw { statusCode: 404, message: 'Hop dong khong ton tai' };
  if (hopDong.TinhTrang !== 'ACTIVE') {
    throw { statusCode: 400, message: 'Hop dong khong o trang thai hoat dong' };
  }

  const existing = await TraPhong.findOne({
    where: { MaHopDong: maHopDong, TrangThai: { [Op.in]: ['PENDING', 'INSPECTING'] } },
  });
  if (existing) {
    throw { statusCode: 400, message: 'Hop dong dang co yeu cau tra phong chua hoan tat' };
  }

  const count = await TraPhong.count();
  const maTra = `TR-${String(count + 1).padStart(4, '0')}`;

  return await TraPhong.create({
    MaTra: maTra,
    MaHopDong: maHopDong,
    NgayYeuCau: new Date(),
    NgayTraDuKien: ngayTraDuKien,
    LyDo: lyDo,
    TrangThai: 'PENDING',
    MaNVXuLy: maNVXuLy || null,
  });
};

const getAllCheckoutRequests = async (filters = {}) => {
  const { trangThai, page = 1, limit = 20 } = filters;
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
  if (!traPhong) throw { statusCode: 404, message: 'Yeu cau tra phong khong ton tai' };
  return traPhong;
};

const startInspection = async (maTra, maNVXuLy) => {
  const traPhong = await TraPhong.findByPk(maTra);
  if (!traPhong) throw { statusCode: 404, message: 'Khong tim thay yeu cau tra phong' };
  if (traPhong.TrangThai !== 'PENDING') {
    throw { statusCode: 400, message: 'Chi co the bat dau kiem tra tu trang thai PENDING' };
  }
  await traPhong.update({ TrangThai: 'INSPECTING', MaNVXuLy: maNVXuLy });
  return traPhong;
};

const completeInspection = async (maTra, data) => {
  const { tinhTrangPhong, ngayTraThucTe, ghiChu } = data;
  const traPhong = await TraPhong.findByPk(maTra, {
    include: [{ model: HopDongThueNha, as: 'hopDong', include: [{ model: DatCoc, as: 'datCoc' }] }]
  });
  if (!traPhong) throw { statusCode: 404, message: 'Khong tim thay yeu cau tra phong' };
  if (traPhong.TrangThai !== 'INSPECTING') {
    throw { statusCode: 400, message: 'Can bat dau kiem tra truoc khi hoan tat kiem tra' };
  }

  const hopDong = traPhong.hopDong;
  const ngayTra = ngayTraThucTe || new Date();
  const tyLeHoanCoc = calculateRefundRate(hopDong, ngayTra);
  const soTienCoc = hopDong?.datCoc?.SoTienCoc || 0;
  const soTienHoan = Math.round(Number(soTienCoc) * tyLeHoanCoc);

  await traPhong.update({
    TinhTrangPhong: tinhTrangPhong,
    NgayTraThucTe: ngayTra,
    TyLeHoanCoc: tyLeHoanCoc * 100,
    SoTienHoan: soTienHoan,
    TrangThai: 'INSPECTING',
  });

  return traPhong;
};

const addDamageRecord = async (maTra, data) => {
  const { loaiPhi, soTien, ghiChu } = data;
  const traPhong = await TraPhong.findByPk(maTra);
  if (!traPhong) throw { statusCode: 404, message: 'Khong tim thay yeu cau tra phong' };
  if (traPhong.TrangThai !== 'INSPECTING') {
    throw { statusCode: 400, message: 'Can bat dau kiem tra truoc khi ghi nhan khau tru' };
  }

  const khauTru = await ChiTietKhauTru.create({
    MaTra: maTra,
    LoaiPhi: loaiPhi,
    SoTien: soTien,
    GhiChu: ghiChu,
  });

  const refreshed = await TraPhong.findByPk(maTra, {
    include: [
      { model: ChiTietKhauTru, as: 'chiTietKhauTrus' },
      { model: HopDongThueNha, as: 'hopDong', include: [{ model: DatCoc, as: 'datCoc' }] }
    ]
  });
  if (refreshed.TyLeHoanCoc === null || refreshed.TyLeHoanCoc === undefined) {
    return khauTru;
  }
  const tongKhauTru = refreshed.chiTietKhauTrus.reduce((sum, k) => sum + Number(k.SoTien), 0);
  const soTienCoc = Number(refreshed.hopDong?.datCoc?.SoTienCoc || 0);
  const soTienHoan = Math.round(soTienCoc * (Number(refreshed.TyLeHoanCoc) / 100)) - tongKhauTru;
  await refreshed.update({ SoTienHoan: soTienHoan });
  return khauTru;
};

module.exports = {
  createCheckoutRequest,
  getAllCheckoutRequests,
  getCheckoutById,
  startInspection,
  completeInspection,
  addDamageRecord,
  calculateRefundRate,
};
