const sequelize = require('../config/database');
const { DataTypes } = require('sequelize');

// Import all models
const ChiNhanh = require('./ChiNhanh')(sequelize, DataTypes);
const Phong = require('./Phong')(sequelize, DataTypes);
const Giuong = require('./Giuong')(sequelize, DataTypes);
const KhachHang = require('./KhachHang')(sequelize, DataTypes);
const NhanVien = require('./NhanVien')(sequelize, DataTypes);
const Nhom = require('./Nhom')(sequelize, DataTypes);
const ThanhVienNhom = require('./ThanhVienNhom')(sequelize, DataTypes);
const LichXemPhong = require('./LichXemPhong')(sequelize, DataTypes);
const HopDongThueNha = require('./HopDongThueNha')(sequelize, DataTypes);
const DatCoc = require('./DatCoc')(sequelize, DataTypes);
const ChiTietThue = require('./ChiTietThue')(sequelize, DataTypes);
const YeuCauThue = require('./YeuCauThue')(sequelize, DataTypes);
const DichVu = require('./DichVu')(sequelize, DataTypes);
const DichVuPhong = require('./DichVuPhong')(sequelize, DataTypes);
const ThanhToan = require('./ThanhToan')(sequelize, DataTypes);
const TaiSan = require('./TaiSan')(sequelize, DataTypes);
const BangGiao = require('./BangGiao')(sequelize, DataTypes);
const BangGiaoTaiSan = require('./BangGiaoTaiSan')(sequelize, DataTypes);
const TraPhong = require('./TraPhong')(sequelize, DataTypes);
const ChiTietKhauTru = require('./ChiTietKhauTru')(sequelize, DataTypes);
const QuyDinh = require('./QuyDinh')(sequelize, DataTypes);

// === ASSOCIATIONS ===

// CHI_NHANH -> PHONG
ChiNhanh.hasMany(Phong, { foreignKey: 'MaChiNhanh', as: 'phongs' });
Phong.belongsTo(ChiNhanh, { foreignKey: 'MaChiNhanh', as: 'chiNhanh' });

// CHI_NHANH -> NHAN_VIEN
ChiNhanh.hasMany(NhanVien, { foreignKey: 'MaChiNhanh', as: 'nhanViens' });
NhanVien.belongsTo(ChiNhanh, { foreignKey: 'MaChiNhanh', as: 'chiNhanh' });

// PHONG -> GIUONG
Phong.hasMany(Giuong, { foreignKey: 'MaPhong', as: 'giuongs' });
Giuong.belongsTo(Phong, { foreignKey: 'MaPhong', as: 'phong' });

// PHONG -> DICHVU_PHONG -> DICH_VU (many-to-many)
Phong.belongsToMany(DichVu, { through: DichVuPhong, foreignKey: 'MaPhong', as: 'dichVus' });
DichVu.belongsToMany(Phong, { through: DichVuPhong, foreignKey: 'MaDV', as: 'phongs' });

// KHACH_HANG -> NHOM
KhachHang.hasMany(Nhom, { foreignKey: 'MaDaiDien', as: 'nhomDaiDien' });
Nhom.belongsTo(KhachHang, { foreignKey: 'MaDaiDien', as: 'daiDien' });

// NHOM -> THANHVIEN_NHOM -> KHACH_HANG (many-to-many)
Nhom.belongsToMany(KhachHang, { through: ThanhVienNhom, foreignKey: 'MaNhom', as: 'thanhViens' });
KhachHang.belongsToMany(Nhom, { through: ThanhVienNhom, foreignKey: 'MaKH', as: 'nhoms' });

// HOP_DONG_THUE_NHA associations
Phong.hasMany(HopDongThueNha, { foreignKey: 'MaPhong', as: 'hopDongs' });
HopDongThueNha.belongsTo(Phong, { foreignKey: 'MaPhong', as: 'phong' });
Nhom.hasMany(HopDongThueNha, { foreignKey: 'MaNhom', as: 'hopDongs' });
HopDongThueNha.belongsTo(Nhom, { foreignKey: 'MaNhom', as: 'nhom' });
NhanVien.hasMany(HopDongThueNha, { foreignKey: 'MaNVPhuTrach', as: 'hopDongPhuTrach' });
HopDongThueNha.belongsTo(NhanVien, { foreignKey: 'MaNVPhuTrach', as: 'nhanVienPhuTrach' });

// DAT_COC associations
KhachHang.hasMany(DatCoc, { foreignKey: 'MaKH', as: 'datCocs' });
DatCoc.belongsTo(KhachHang, { foreignKey: 'MaKH', as: 'khachHang' });
Phong.hasMany(DatCoc, { foreignKey: 'MaPhong', as: 'datCocs' });
DatCoc.belongsTo(Phong, { foreignKey: 'MaPhong', as: 'phong' });
Giuong.hasMany(DatCoc, { foreignKey: 'MaGiuong', as: 'datCocs' });
DatCoc.belongsTo(Giuong, { foreignKey: 'MaGiuong', as: 'giuong' });
NhanVien.hasMany(DatCoc, { foreignKey: 'NguoiPheDuyet', as: 'datCocsPheDuyet' });
DatCoc.belongsTo(NhanVien, { foreignKey: 'NguoiPheDuyet', as: 'nguoiPheDuyet' });
HopDongThueNha.hasOne(DatCoc, { foreignKey: 'MaHopDong', as: 'datCoc' });
DatCoc.belongsTo(HopDongThueNha, { foreignKey: 'MaHopDong', as: 'hopDong' });

// LICH_XEM_PHONG
KhachHang.hasMany(LichXemPhong, { foreignKey: 'MaKH', as: 'lichXems' });
LichXemPhong.belongsTo(KhachHang, { foreignKey: 'MaKH', as: 'khachHang' });
Phong.hasMany(LichXemPhong, { foreignKey: 'MaPhong', as: 'lichXems' });
LichXemPhong.belongsTo(Phong, { foreignKey: 'MaPhong', as: 'phong' });
NhanVien.hasMany(LichXemPhong, { foreignKey: 'MaNV', as: 'lichXems' });
LichXemPhong.belongsTo(NhanVien, { foreignKey: 'MaNV', as: 'nhanVien' });

// CHI_TIET_THUE
HopDongThueNha.hasMany(ChiTietThue, { foreignKey: 'MaHopDong', as: 'chiTiets' });
ChiTietThue.belongsTo(HopDongThueNha, { foreignKey: 'MaHopDong', as: 'hopDong' });
Giuong.hasMany(ChiTietThue, { foreignKey: 'MaGiuong', as: 'chiTiets' });
ChiTietThue.belongsTo(Giuong, { foreignKey: 'MaGiuong', as: 'giuong' });
KhachHang.hasMany(ChiTietThue, { foreignKey: 'MaKH', as: 'chiTiets' });
ChiTietThue.belongsTo(KhachHang, { foreignKey: 'MaKH', as: 'khachHang' });

// THANH_TOAN
HopDongThueNha.hasMany(ThanhToan, { foreignKey: 'MaHopDong', as: 'thanhToans' });
ThanhToan.belongsTo(HopDongThueNha, { foreignKey: 'MaHopDong', as: 'hopDong' });
DatCoc.hasMany(ThanhToan, { foreignKey: 'MaCoc', as: 'thanhToans' });
ThanhToan.belongsTo(DatCoc, { foreignKey: 'MaCoc', as: 'datCoc' });

// BANG_GIAO
HopDongThueNha.hasOne(BangGiao, { foreignKey: 'MaHopDong', as: 'bangGiao' });
BangGiao.belongsTo(HopDongThueNha, { foreignKey: 'MaHopDong', as: 'hopDong' });
NhanVien.hasMany(BangGiao, { foreignKey: 'MaNV', as: 'bangGiaos' });
BangGiao.belongsTo(NhanVien, { foreignKey: 'MaNV', as: 'nhanVien' });

// BANGGIAO_TAISAN (junction)
BangGiao.belongsToMany(TaiSan, { through: BangGiaoTaiSan, foreignKey: 'MaBanGiao', as: 'taiSans' });
TaiSan.belongsToMany(BangGiao, { through: BangGiaoTaiSan, foreignKey: 'MaTaiSan', as: 'bangGiaos' });

// TRA_PHONG
HopDongThueNha.hasMany(TraPhong, { foreignKey: 'MaHopDong', as: 'traPhongs' });
TraPhong.belongsTo(HopDongThueNha, { foreignKey: 'MaHopDong', as: 'hopDong' });
NhanVien.hasMany(TraPhong, { foreignKey: 'MaNVXuLy', as: 'traPhongXuLy' });
TraPhong.belongsTo(NhanVien, { foreignKey: 'MaNVXuLy', as: 'nhanVienXuLy' });

// CHITIETKHAUTRU
TraPhong.hasMany(ChiTietKhauTru, { foreignKey: 'MaTra', as: 'chiTietKhauTrus' });
ChiTietKhauTru.belongsTo(TraPhong, { foreignKey: 'MaTra', as: 'traPhong' });

// YEU_CAU_THUE
KhachHang.hasMany(YeuCauThue, { foreignKey: 'MaKH', as: 'yeuCauThues' });
YeuCauThue.belongsTo(KhachHang, { foreignKey: 'MaKH', as: 'khachHang' });

module.exports = {
  sequelize,
  ChiNhanh,
  Phong,
  Giuong,
  KhachHang,
  NhanVien,
  Nhom,
  ThanhVienNhom,
  LichXemPhong,
  HopDongThueNha,
  DatCoc,
  ChiTietThue,
  YeuCauThue,
  DichVu,
  DichVuPhong,
  ThanhToan,
  TaiSan,
  BangGiao,
  BangGiaoTaiSan,
  TraPhong,
  ChiTietKhauTru,
  QuyDinh,
};
