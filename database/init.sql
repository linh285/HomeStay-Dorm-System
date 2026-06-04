-- =============================================================
-- HomeStay Dorm System - Database Initialization Script
-- PostgreSQL 15
-- =============================================================
-- CREATE DATABASE homestay_db;
-- Set client encoding
SET client_encoding = 'UTF8';

-- =============================================================
-- SECTION 1: DROP TABLES (children before parents)
-- =============================================================

DROP TABLE IF EXISTS CHITIETKHAUTRU CASCADE;
DROP TABLE IF EXISTS TRA_PHONG CASCADE;
DROP TABLE IF EXISTS BANGGIAO_TAISAN CASCADE;
DROP TABLE IF EXISTS BANG_GIAO CASCADE;
DROP TABLE IF EXISTS TAI_SAN CASCADE;
DROP TABLE IF EXISTS THANH_TOAN CASCADE;
DROP TABLE IF EXISTS DICHVU_PHONG CASCADE;
DROP TABLE IF EXISTS DICH_VU CASCADE;
DROP TABLE IF EXISTS YEU_CAU_THUE CASCADE;
DROP TABLE IF EXISTS CHI_TIET_THUE CASCADE;
DROP TABLE IF EXISTS DAT_COC CASCADE;
DROP TABLE IF EXISTS LICH_XEM_PHONG CASCADE;
DROP TABLE IF EXISTS THANHVIEN_NHOM CASCADE;
DROP TABLE IF EXISTS NHOM CASCADE;
DROP TABLE IF EXISTS HOP_DONG_THUE_NHA CASCADE;
DROP TABLE IF EXISTS QUY_DINH CASCADE;
DROP TABLE IF EXISTS KHACH_HANG CASCADE;
DROP TABLE IF EXISTS NHAN_VIEN CASCADE;
DROP TABLE IF EXISTS GIUONG CASCADE;
DROP TABLE IF EXISTS PHONG CASCADE;
DROP TABLE IF EXISTS CHI_NHANH CASCADE;

-- =============================================================
-- SECTION 2: CREATE TABLES
-- =============================================================

-- ------------------------------------------------------------
-- CHI_NHANH: Branch locations
-- ------------------------------------------------------------
CREATE TABLE CHI_NHANH (
    MaChiNhanh  VARCHAR(20)  PRIMARY KEY,
    TenChiNhanh VARCHAR(100) NOT NULL,
    DiaChi      TEXT,
    SDT         VARCHAR(15),
    Email       VARCHAR(100)
);

-- ------------------------------------------------------------
-- PHONG: Rooms
-- ------------------------------------------------------------
CREATE TABLE PHONG (
    MaPhong    VARCHAR(20)   PRIMARY KEY,
    MaChiNhanh VARCHAR(20)   NOT NULL REFERENCES CHI_NHANH(MaChiNhanh) ON DELETE RESTRICT,
    GiaThue    DECIMAL(12,0) NOT NULL,
    KhuVuc     VARCHAR(10)   CHECK (KhuVuc IN ('A', 'B', 'C')),
    Tang       INT,
    SucChua    INT           NOT NULL,
    TinhTrang  VARCHAR(20)   DEFAULT 'AVAILABLE'
                             CHECK (TinhTrang IN ('AVAILABLE','PENDING','RESERVED','OCCUPIED','MAINTENANCE','INACTIVE')),
    GhiChu     TEXT
);

-- ------------------------------------------------------------
-- GIUONG: Beds inside rooms
-- ------------------------------------------------------------
CREATE TABLE GIUONG (
    MaGiuong  VARCHAR(20)   PRIMARY KEY,
    MaPhong   VARCHAR(20)   NOT NULL REFERENCES PHONG(MaPhong) ON DELETE CASCADE,
    GiaGiuong DECIMAL(12,0),
    TinhTrang VARCHAR(20)   DEFAULT 'AVAILABLE'
                            CHECK (TinhTrang IN ('AVAILABLE','PENDING','RESERVED','OCCUPIED','BROKEN'))
);

-- ------------------------------------------------------------
-- KHACH_HANG: Customers / Tenants
-- ------------------------------------------------------------
CREATE TABLE KHACH_HANG (
    MaKH          VARCHAR(20)  PRIMARY KEY,
    HoTen         VARCHAR(100) NOT NULL,
    GioiTinh      VARCHAR(10),
    QuocTich      VARCHAR(50)  DEFAULT 'Việt Nam',
    GiayToTuyThan VARCHAR(20),
    SDT           VARCHAR(15),
    Email         VARCHAR(100),
    NgaySinh      DATE,
    DiaChi        TEXT
);

-- ------------------------------------------------------------
-- NHAN_VIEN: Staff / Employees
-- ------------------------------------------------------------
CREATE TABLE NHAN_VIEN (
    MaNV       VARCHAR(20)  PRIMARY KEY,
    MaChiNhanh VARCHAR(20)  REFERENCES CHI_NHANH(MaChiNhanh) ON DELETE SET NULL,
    TenNV      VARCHAR(100) NOT NULL,
    ChucVu     VARCHAR(20)  CHECK (ChucVu IN ('SALE','MANAGER','ACCOUNTANT','ADMIN')),
    SDT        VARCHAR(15),
    Email      VARCHAR(100),
    MatKhau    VARCHAR(255) NOT NULL,
    NgayVaoLam DATE,
    IsActive   BOOLEAN      DEFAULT TRUE
);

-- ------------------------------------------------------------
-- NHOM: Tenant groups (e.g. a group renting a shared room)
-- ------------------------------------------------------------
CREATE TABLE NHOM (
    MaNhom     VARCHAR(20)  PRIMARY KEY,
    TenNhom    VARCHAR(100),
    MaDaiDien  VARCHAR(20)  REFERENCES KHACH_HANG(MaKH) ON DELETE SET NULL,
    MaHopDong  VARCHAR(20)  NULL,  -- FK added after HOP_DONG_THUE_NHA is created
    NgayTao    TIMESTAMP    DEFAULT NOW(),
    TrangThai  VARCHAR(20)  DEFAULT 'ACTIVE'
);

-- ------------------------------------------------------------
-- THANHVIEN_NHOM: Group membership junction table
-- ------------------------------------------------------------
CREATE TABLE THANHVIEN_NHOM (
    MaNhom    VARCHAR(20) NOT NULL REFERENCES NHOM(MaNhom) ON DELETE CASCADE,
    MaKH      VARCHAR(20) NOT NULL REFERENCES KHACH_HANG(MaKH) ON DELETE CASCADE,
    TrangThai VARCHAR(20) DEFAULT 'PENDING',
    PRIMARY KEY (MaNhom, MaKH)
);

-- ------------------------------------------------------------
-- LICH_XEM_PHONG: Room viewing schedule
-- ------------------------------------------------------------
CREATE TABLE LICH_XEM_PHONG (
    MaLich    VARCHAR(20) PRIMARY KEY,
    MaKH      VARCHAR(20) REFERENCES KHACH_HANG(MaKH) ON DELETE SET NULL,
    MaPhong   VARCHAR(20) REFERENCES PHONG(MaPhong) ON DELETE SET NULL,
    MaNV      VARCHAR(20) REFERENCES NHAN_VIEN(MaNV) ON DELETE SET NULL,
    NgayXem   DATE,
    GioXem    TIME,
    KetQua    VARCHAR(20) CHECK (KetQua IN ('INTERESTED','NOT_INTERESTED','BOOKED')) NULL,
    GhiChu    TEXT,
    TrangThai VARCHAR(20) DEFAULT 'PENDING' CHECK (TrangThai IN ('PENDING','COMPLETED','CANCELLED'))
);

-- ------------------------------------------------------------
-- HOP_DONG_THUE_NHA: Rental contracts
-- ------------------------------------------------------------
CREATE TABLE HOP_DONG_THUE_NHA (
    MaHopDong    VARCHAR(20)   PRIMARY KEY,
    MaPhong      VARCHAR(20)   REFERENCES PHONG(MaPhong) ON DELETE RESTRICT NULL,
    MaNhom       VARCHAR(20)   REFERENCES NHOM(MaNhom) ON DELETE RESTRICT NULL,
    NgayBatDau   DATE,
    NgayKetThuc  DATE,
    GiaThue      DECIMAL(12,0),
    NoiQuy       TEXT,
    TinhTrang    VARCHAR(30)   DEFAULT 'PENDING'
                               CHECK (TinhTrang IN ('PENDING','PENDING_FIRST_PAYMENT','ACTIVE','EXPIRED','TERMINATED','CANCELLED')),
    NgayKy       TIMESTAMP,
    MaNVPhuTrach VARCHAR(20)   REFERENCES NHAN_VIEN(MaNV) ON DELETE SET NULL
);

-- Now that HOP_DONG_THUE_NHA exists, add the FK on NHOM.MaHopDong
ALTER TABLE NHOM
    ADD CONSTRAINT fk_nhom_hopdong
    FOREIGN KEY (MaHopDong) REFERENCES HOP_DONG_THUE_NHA(MaHopDong) ON DELETE SET NULL;

-- ------------------------------------------------------------
-- DAT_COC: Security deposits
-- ------------------------------------------------------------
CREATE TABLE DAT_COC (
    MaCoc                VARCHAR(20)   PRIMARY KEY,
    MaHopDong            VARCHAR(20)   REFERENCES HOP_DONG_THUE_NHA(MaHopDong) ON DELETE SET NULL NULL,
    MaKH                 VARCHAR(20)   REFERENCES KHACH_HANG(MaKH) ON DELETE SET NULL,
    MaPhong              VARCHAR(20)   REFERENCES PHONG(MaPhong) ON DELETE SET NULL NULL,
    MaGiuong             VARCHAR(20)   REFERENCES GIUONG(MaGiuong) ON DELETE SET NULL NULL,
    NguoiPheDuyet        VARCHAR(20)   REFERENCES NHAN_VIEN(MaNV) ON DELETE SET NULL NULL,
    NgayDatCoc           TIMESTAMP     DEFAULT NOW(),
    SoTienCoc            DECIMAL(12,0),
    PhuongThucThanhToan  VARCHAR(20),
    TinhTrang            VARCHAR(30)   DEFAULT 'PENDING_PAYMENT'
                                       CHECK (TinhTrang IN ('PENDING_APPROVAL','PENDING_PAYMENT','APPROVED','EXPIRED','CANCELLED','REJECTED')),
    ThoiGianHetHan       TIMESTAMP,
    ThoiGianPheDuyet     TIMESTAMP     NULL,
    GhiChu               TEXT
);

-- ------------------------------------------------------------
-- CHI_TIET_THUE: Contract detail per bed per tenant
-- ------------------------------------------------------------
CREATE TABLE CHI_TIET_THUE (
    MaHopDong     VARCHAR(20)   NOT NULL REFERENCES HOP_DONG_THUE_NHA(MaHopDong) ON DELETE CASCADE,
    MaGiuong      VARCHAR(20)   REFERENCES GIUONG(MaGiuong) ON DELETE SET NULL NULL,
    MaKH          VARCHAR(20)   REFERENCES KHACH_HANG(MaKH) ON DELETE SET NULL NULL,
    GiaThueThucTe DECIMAL(12,0),
    PRIMARY KEY (MaHopDong, MaGiuong)
);

-- ------------------------------------------------------------
-- YEU_CAU_THUE: Rental requests / inquiries
-- ------------------------------------------------------------
CREATE TABLE YEU_CAU_THUE (
    MaYeuCauThue  VARCHAR(20)   PRIMARY KEY,
    MaKH          VARCHAR(20)   REFERENCES KHACH_HANG(MaKH) ON DELETE SET NULL,
    LoaiPhong     VARCHAR(20),
    GiaMongMuon   DECIMAL(12,0),
    TieuChiKhac   TEXT,
    NgayTao       TIMESTAMP     DEFAULT NOW()
);

-- ------------------------------------------------------------
-- DICH_VU: Services offered
-- ------------------------------------------------------------
CREATE TABLE DICH_VU (
    MaDV       VARCHAR(20)   PRIMARY KEY,
    TenDV      VARCHAR(100)  NOT NULL,
    Gia        DECIMAL(12,0),
    NgayApDung DATE,
    MoTa       TEXT
);

-- ------------------------------------------------------------
-- DICHVU_PHONG: Services assigned to rooms
-- ------------------------------------------------------------
CREATE TABLE DICHVU_PHONG (
    MaPhong VARCHAR(20) NOT NULL REFERENCES PHONG(MaPhong) ON DELETE CASCADE,
    MaDV    VARCHAR(20) NOT NULL REFERENCES DICH_VU(MaDV) ON DELETE CASCADE,
    PRIMARY KEY (MaPhong, MaDV)
);

-- ------------------------------------------------------------
-- THANH_TOAN: Payments
-- ------------------------------------------------------------
CREATE TABLE THANH_TOAN (
    MaThanhToan   VARCHAR(20)   PRIMARY KEY,
    MaHopDong     VARCHAR(20)   REFERENCES HOP_DONG_THUE_NHA(MaHopDong) ON DELETE SET NULL NULL,
    MaCoc         VARCHAR(20)   REFERENCES DAT_COC(MaCoc) ON DELETE SET NULL NULL,
    SoTien        DECIMAL(12,0) NOT NULL,
    PhuongThuc    VARCHAR(20),
    NgayThanhToan TIMESTAMP     DEFAULT NOW(),
    LoaiThanhToan VARCHAR(20)   CHECK (LoaiThanhToan IN ('DEPOSIT','MONTHLY_RENT','SERVICE','PENALTY','REFUND')),
    TinhTrang     VARCHAR(20)   DEFAULT 'PENDING',
    GhiChu        TEXT,
    MaSoChungTu   VARCHAR(50)
);

-- ------------------------------------------------------------
-- TAI_SAN: Assets / Property items
-- ------------------------------------------------------------
CREATE TABLE TAI_SAN (
    MaTaiSan  VARCHAR(20)  PRIMARY KEY,
    TenTaiSan VARCHAR(100) NOT NULL,
    LoaiTaiSan VARCHAR(50),
    TinhTrang VARCHAR(20)  DEFAULT 'AVAILABLE'
                           CHECK (TinhTrang IN ('AVAILABLE','IN_USE','BROKEN','LOST'))
);

-- ------------------------------------------------------------
-- BANG_GIAO: Handover records
-- ------------------------------------------------------------
CREATE TABLE BANG_GIAO (
    MaBanGiao VARCHAR(20) PRIMARY KEY,
    MaHopDong VARCHAR(20) REFERENCES HOP_DONG_THUE_NHA(MaHopDong) ON DELETE RESTRICT,
    NgayGiao  TIMESTAMP,
    TinhTrang VARCHAR(20) DEFAULT 'PENDING' CHECK (TinhTrang IN ('PENDING','COMPLETED','CANCELLED')),
    MaNV      VARCHAR(20) REFERENCES NHAN_VIEN(MaNV) ON DELETE SET NULL
);

-- ------------------------------------------------------------
-- BANGGIAO_TAISAN: Assets listed in a handover
-- ------------------------------------------------------------
CREATE TABLE BANGGIAO_TAISAN (
    MaBanGiao        VARCHAR(20) NOT NULL REFERENCES BANG_GIAO(MaBanGiao) ON DELETE CASCADE,
    MaTaiSan         VARCHAR(20) NOT NULL REFERENCES TAI_SAN(MaTaiSan) ON DELETE RESTRICT,
    SoLuong          INT         DEFAULT 1,
    TinhTrangLucGiao VARCHAR(20),
    GhiChu           TEXT,
    DaKiemTra        BOOLEAN     DEFAULT FALSE,
    PRIMARY KEY (MaBanGiao, MaTaiSan)
);

-- ------------------------------------------------------------
-- TRA_PHONG: Room return / check-out records
-- ------------------------------------------------------------
CREATE TABLE TRA_PHONG (
    MaTra          VARCHAR(20)   PRIMARY KEY,
    MaHopDong      VARCHAR(20)   REFERENCES HOP_DONG_THUE_NHA(MaHopDong) ON DELETE RESTRICT,
    NgayYeuCau     TIMESTAMP     DEFAULT NOW(),
    NgayTraDuKien  DATE,
    NgayTraThucTe  DATE          NULL,
    TinhTrangPhong VARCHAR(20)   CHECK (TinhTrangPhong IN ('GOOD','DIRTY','DAMAGED','SEVERELY_DAMAGED')) NULL,
    LyDo           TEXT,
    TyLeHoanCoc    DECIMAL(5,2),
    SoTienHoan     DECIMAL(12,0),
    TrangThai      VARCHAR(20)   DEFAULT 'PENDING'
                                 CHECK (TrangThai IN ('PENDING','INSPECTING','COMPLETED','CANCELLED')),
    MaNVXuLy       VARCHAR(20)   REFERENCES NHAN_VIEN(MaNV) ON DELETE SET NULL NULL
);

-- ------------------------------------------------------------
-- CHITIETKHAUTRU: Deduction details for room return
-- ------------------------------------------------------------
CREATE TABLE CHITIETKHAUTRU (
    STT      SERIAL,
    MaTra    VARCHAR(20)   NOT NULL REFERENCES TRA_PHONG(MaTra) ON DELETE CASCADE,
    LoaiPhi  VARCHAR(20)   CHECK (LoaiPhi IN ('DIEN','NUOC','DICH_VU','HU_HONG','PHAT','NO_TIEN_PHONG')),
    SoTien   DECIMAL(12,0),
    GhiChu   TEXT,
    PRIMARY KEY (STT, MaTra)
);

-- ------------------------------------------------------------
-- QUY_DINH: Rules and regulations
-- ------------------------------------------------------------
CREATE TABLE QUY_DINH (
    MaQuyDinh    VARCHAR(20)  PRIMARY KEY,
    TieuDe       VARCHAR(200) NOT NULL,
    NhomQuyDinh  VARCHAR(50),
    NoiDung      TEXT,
    NgayHieuLuc  DATE,
    NgayHetHieuLuc DATE       NULL,
    TrangThai    VARCHAR(20)  DEFAULT 'ACTIVE'
                              CHECK (TrangThai IN ('ACTIVE','UPCOMING','EXPIRED')),
    UuTien       VARCHAR(10)  DEFAULT 'MEDIUM',
    ApDungCho    TEXT,
    NgayTao      TIMESTAMP    DEFAULT NOW()
);

-- =============================================================
-- SECTION 3: SEED DATA (insert in parent → child order)
-- =============================================================

-- ------------------------------------------------------------
-- CHI_NHANH
-- ------------------------------------------------------------
INSERT INTO CHI_NHANH (MaChiNhanh, TenChiNhanh, DiaChi, SDT, Email) VALUES
('CN001', 'HomeStay Dorm Quận 1', '123 Nguyễn Huệ, Phường Bến Nghé, Quận 1, TP.HCM', '0281234567', 'quan1@homestay.vn'),
('CN002', 'HomeStay Dorm Quận 3', '45 Võ Thị Sáu, Phường 6, Quận 3, TP.HCM',          '0287654321', 'quan3@homestay.vn');

-- ------------------------------------------------------------
-- PHONG
-- ------------------------------------------------------------
INSERT INTO PHONG (MaPhong, MaChiNhanh, GiaThue, KhuVuc, Tang, SucChua, TinhTrang, GhiChu) VALUES
('P101', 'CN001', 3000000, 'A', 1, 4, 'AVAILABLE',   'Phòng thoáng, view sân vườn'),
('P102', 'CN001', 3000000, 'A', 1, 4, 'OCCUPIED',    'Phòng đang có người thuê'),
('P103', 'CN001', 2500000, 'A', 1, 2, 'RESERVED',    'Phòng đã được đặt trước'),
('P201', 'CN001', 3500000, 'B', 2, 4, 'AVAILABLE',   'Phòng view thành phố'),
('P202', 'CN001', 4000000, 'B', 2, 6, 'AVAILABLE',   'Phòng lớn, nhiều giường'),
('P301', 'CN001', 3000000, 'C', 3, 4, 'MAINTENANCE', 'Đang sửa chữa điều hòa'),
('P401', 'CN002', 2800000, 'A', 1, 4, 'AVAILABLE',   'Phòng yên tĩnh khu dân cư'),
('P402', 'CN002', 3200000, 'B', 2, 2, 'AVAILABLE',   'Phòng đôi cao cấp');

-- ------------------------------------------------------------
-- GIUONG (beds)
-- 4 beds per 4-person room, 2 beds per 2-person room
-- P101: G101A-G101D (4 beds)
-- P102: G102A-G102D (4 beds, all OCCUPIED)
-- P103: G103A-G103B (2 beds, both RESERVED)
-- P201: G201A-G201D (4 beds)
-- P202: G202A-G202F (6 beds)
-- P301: G301A-G301D (4 beds, all BROKEN/AVAILABLE since under maintenance)
-- P401: G401A-G401D (4 beds)
-- P402: G402A-G402B (2 beds)
-- ------------------------------------------------------------
INSERT INTO GIUONG (MaGiuong, MaPhong, GiaGiuong, TinhTrang) VALUES
-- P101 (4 beds, AVAILABLE)
('G101A', 'P101', 750000,  'AVAILABLE'),
('G101B', 'P101', 750000,  'AVAILABLE'),
('G101C', 'P101', 750000,  'AVAILABLE'),
('G101D', 'P101', 750000,  'AVAILABLE'),
-- P102 (4 beds, OCCUPIED)
('G102A', 'P102', 750000,  'OCCUPIED'),
('G102B', 'P102', 750000,  'OCCUPIED'),
('G102C', 'P102', 750000,  'AVAILABLE'),
('G102D', 'P102', 750000,  'AVAILABLE'),
-- P103 (2 beds, RESERVED)
('G103A', 'P103', 1250000, 'RESERVED'),
('G103B', 'P103', 1250000, 'RESERVED'),
-- P201 (4 beds, AVAILABLE)
('G201A', 'P201', 875000,  'AVAILABLE'),
('G201B', 'P201', 875000,  'AVAILABLE'),
('G201C', 'P201', 875000,  'AVAILABLE'),
('G201D', 'P201', 875000,  'AVAILABLE'),
-- P202 (6 beds, AVAILABLE)
('G202A', 'P202', 666667,  'AVAILABLE'),
('G202B', 'P202', 666667,  'AVAILABLE'),
('G202C', 'P202', 666667,  'AVAILABLE'),
('G202D', 'P202', 666667,  'AVAILABLE'),
('G202E', 'P202', 666667,  'AVAILABLE'),
('G202F', 'P202', 666667,  'AVAILABLE'),
-- P301 (4 beds, AVAILABLE — room under maintenance but beds themselves OK)
('G301A', 'P301', 750000,  'AVAILABLE'),
('G301B', 'P301', 750000,  'AVAILABLE'),
('G301C', 'P301', 750000,  'AVAILABLE'),
('G301D', 'P301', 750000,  'AVAILABLE'),
-- P401 (4 beds, AVAILABLE)
('G401A', 'P401', 700000,  'AVAILABLE'),
('G401B', 'P401', 700000,  'AVAILABLE'),
('G401C', 'P401', 700000,  'AVAILABLE'),
('G401D', 'P401', 700000,  'AVAILABLE'),
-- P402 (2 beds, AVAILABLE)
('G402A', 'P402', 1600000, 'AVAILABLE'),
('G402B', 'P402', 1600000, 'AVAILABLE');

-- ------------------------------------------------------------
-- KHACH_HANG
-- ------------------------------------------------------------
INSERT INTO KHACH_HANG (MaKH, HoTen, GioiTinh, QuocTich, GiayToTuyThan, SDT, Email, NgaySinh, DiaChi) VALUES
('KH001', 'Nguyễn Văn An',  'Nam',  'Việt Nam', '001234567890', '0901234567', 'nguyenvanan@gmail.com', '1998-03-15', '12 Lê Lợi, Quận 1, TP.HCM'),
('KH002', 'Trần Thị Bình',  'Nữ',   'Việt Nam', '001234567891', '0912345678', 'tranthibinh@gmail.com', '2000-07-22', '34 Nguyễn Trãi, Quận 5, TP.HCM'),
('KH003', 'Lê Văn Cường',   'Nam',  'Việt Nam', '001234567892', '0923456789', 'levancuong@gmail.com',  '1997-11-08', '56 Trần Hưng Đạo, Quận 1, TP.HCM'),
('KH004', 'Phạm Thị Dung',  'Nữ',   'Việt Nam', '001234567893', '0934567890', 'phamthidung@gmail.com', '2001-05-30', '78 Đinh Tiên Hoàng, Bình Thạnh, TP.HCM'),
('KH005', 'Hoàng Văn Em',   'Nam',  'Việt Nam', '001234567894', '0945678901', 'hoangvanem@gmail.com',  '1999-09-12', '90 Cộng Hòa, Tân Bình, TP.HCM');

-- NHAN_VIEN
-- Password hash for '123456': generated by bcryptjs.hash('123456', 10)
-- Hash: $2a$10$navmmUPXpAw5h/IzDcTRe.TktMaPX/SJ0Hc.FvdeTS2OAkGoiLk7C
INSERT INTO NHAN_VIEN (MaNV, MaChiNhanh, TenNV, ChucVu, SDT, Email, MatKhau, NgayVaoLam, IsActive) VALUES
('NV001', 'CN001', 'Trần Quang Admin',   'ADMIN',       '0901111111', 'admin@homestay.com',       '$2a$10$navmmUPXpAw5h/IzDcTRe.TktMaPX/SJ0Hc.FvdeTS2OAkGoiLk7C', '2022-01-01', TRUE),
('NV002', 'CN001', 'Nguyễn Thị Minh',   'MANAGER',     '0902222222', 'manager@homestay.com',     '$2a$10$navmmUPXpAw5h/IzDcTRe.TktMaPX/SJ0Hc.FvdeTS2OAkGoiLk7C', '2022-03-15', TRUE),
('NV003', 'CN001', 'Lê Thị Hoa',        'SALE',        '0903333333', 'sale@homestay.com',        '$2a$10$navmmUPXpAw5h/IzDcTRe.TktMaPX/SJ0Hc.FvdeTS2OAkGoiLk7C', '2023-01-10', TRUE),
('NV004', 'CN002', 'Phạm Ngọc Lan',     'ACCOUNTANT',  '0904444444', 'accountant@homestay.com',  '$2a$10$navmmUPXpAw5h/IzDcTRe.TktMaPX/SJ0Hc.FvdeTS2OAkGoiLk7C', '2022-06-01', TRUE);

-- ------------------------------------------------------------
-- NHOM (MaHopDong is NULL initially; updated after contracts inserted)
-- ------------------------------------------------------------
INSERT INTO NHOM (MaNhom, TenNhom, MaDaiDien, MaHopDong, NgayTao, TrangThai) VALUES
('NHO001', 'Nhóm An - Bình', 'KH001', NULL, '2024-01-10 09:00:00', 'ACTIVE');

-- ------------------------------------------------------------
-- THANHVIEN_NHOM
-- ------------------------------------------------------------
INSERT INTO THANHVIEN_NHOM (MaNhom, MaKH, TrangThai) VALUES
('NHO001', 'KH001', 'ACTIVE'),
('NHO001', 'KH002', 'ACTIVE');

-- ------------------------------------------------------------
-- LICH_XEM_PHONG
-- ------------------------------------------------------------
INSERT INTO LICH_XEM_PHONG (MaLich, MaKH, MaPhong, MaNV, NgayXem, GioXem, KetQua, GhiChu, TrangThai) VALUES
('LXP001', 'KH003', 'P102', 'NV003', '2024-01-05', '10:00:00', 'BOOKED',        'Khách có nhu cầu thuê ngay',       'COMPLETED'),
('LXP002', 'KH004', 'P201', 'NV003', '2024-01-20', '14:00:00', 'INTERESTED',    'Khách muốn xem thêm phòng khác',   'COMPLETED');

-- ------------------------------------------------------------
-- HOP_DONG_THUE_NHA
-- HD001: ACTIVE for P102, associated with NHO001 (group: KH001+KH002)
-- HD002: PENDING_FIRST_PAYMENT for P103
-- ------------------------------------------------------------
INSERT INTO HOP_DONG_THUE_NHA (MaHopDong, MaPhong, MaNhom, NgayBatDau, NgayKetThuc, GiaThue, NoiQuy, TinhTrang, NgayKy, MaNVPhuTrach) VALUES
('HD001', 'P102', 'NHO001', '2024-02-01', '2025-01-31', 3000000,
    'Không hút thuốc trong phòng. Không gây ồn sau 22h. Giữ vệ sinh chung. Khóa cửa khi ra ngoài.',
    'ACTIVE', '2024-01-15 10:30:00', 'NV002'),
('HD002', 'P103', NULL,     '2024-02-15', '2025-02-14', 2500000,
    'Không hút thuốc trong phòng. Không gây ồn sau 22h. Giữ vệ sinh chung.',
    'PENDING_FIRST_PAYMENT', '2024-02-01 14:00:00', 'NV003');

-- Update NHOM.MaHopDong now that HD001 exists
UPDATE NHOM SET MaHopDong = 'HD001' WHERE MaNhom = 'NHO001';

-- ------------------------------------------------------------
-- DAT_COC
-- COC001: APPROVED deposit for HD001 (KH001, P102)
-- COC002: PENDING_PAYMENT deposit for P201 (KH004)
-- ------------------------------------------------------------
INSERT INTO DAT_COC (MaCoc, MaHopDong, MaKH, MaPhong, MaGiuong, NguoiPheDuyet, NgayDatCoc, SoTienCoc, PhuongThucThanhToan, TinhTrang, ThoiGianHetHan, ThoiGianPheDuyet, GhiChu) VALUES
('COC001', 'HD001', 'KH001', 'P102', NULL, 'NV002',
    '2024-01-12 09:00:00', 3000000, 'BANK_TRANSFER',
    'APPROVED',
    '2024-01-19 09:00:00', '2024-01-13 08:30:00',
    'Đặt cọc 1 tháng tiền thuê, đã xác nhận'),
('COC002', NULL,    'KH004', 'P201', 'G201A', NULL,
    '2024-01-22 11:00:00', 3500000, 'CASH',
    'PENDING_PAYMENT',
    '2024-01-29 11:00:00', NULL,
    'Khách đặt cọc giường G201A, chờ thanh toán');

-- ------------------------------------------------------------
-- CHI_TIET_THUE
-- HD001: KH001 => G102A, KH002 => G102B
-- HD002: KH003 => G103A
-- ------------------------------------------------------------
INSERT INTO CHI_TIET_THUE (MaHopDong, MaGiuong, MaKH, GiaThueThucTe) VALUES
('HD001', 'G102A', 'KH001', 750000),
('HD001', 'G102B', 'KH002', 750000),
('HD002', 'G103A', 'KH003', 1250000);

-- ------------------------------------------------------------
-- YEU_CAU_THUE
-- ------------------------------------------------------------
INSERT INTO YEU_CAU_THUE (MaYeuCauThue, MaKH, LoaiPhong, GiaMongMuon, TieuChiKhac, NgayTao) VALUES
('YCT001', 'KH005', 'SHARED', 800000,  'Ưu tiên phòng yên tĩnh, gần WC',     '2024-01-25 10:00:00'),
('YCT002', 'KH004', 'SINGLE', 2000000, 'Cần phòng riêng, có điều hòa, WiFi',  '2024-01-20 15:30:00');

-- ------------------------------------------------------------
-- DICH_VU
-- ------------------------------------------------------------
INSERT INTO DICH_VU (MaDV, TenDV, Gia, NgayApDung, MoTa) VALUES
('DV001', 'Điện',  3500,   '2024-01-01', 'Phí điện tính theo số kWh sử dụng (đồng/kWh)'),
('DV002', 'Nước',  15000,  '2024-01-01', 'Phí nước tính theo số m³ sử dụng (đồng/m³)'),
('DV003', 'WiFi',  100000, '2024-01-01', 'Phí WiFi tốc độ cao, không giới hạn dữ liệu (đồng/tháng/phòng)');

-- ------------------------------------------------------------
-- DICHVU_PHONG: All available rooms get all 3 services
-- ------------------------------------------------------------
INSERT INTO DICHVU_PHONG (MaPhong, MaDV) VALUES
('P101', 'DV001'), ('P101', 'DV002'), ('P101', 'DV003'),
('P102', 'DV001'), ('P102', 'DV002'), ('P102', 'DV003'),
('P103', 'DV001'), ('P103', 'DV002'), ('P103', 'DV003'),
('P201', 'DV001'), ('P201', 'DV002'), ('P201', 'DV003'),
('P202', 'DV001'), ('P202', 'DV002'), ('P202', 'DV003'),
('P401', 'DV001'), ('P401', 'DV002'), ('P401', 'DV003'),
('P402', 'DV001'), ('P402', 'DV002'), ('P402', 'DV003');

-- ------------------------------------------------------------
-- THANH_TOAN
-- TT001: Deposit payment for COC001 (COMPLETED)
-- TT002: First month rent for HD001 (COMPLETED)
-- ------------------------------------------------------------
INSERT INTO THANH_TOAN (MaThanhToan, MaHopDong, MaCoc, SoTien, PhuongThuc, NgayThanhToan, LoaiThanhToan, TinhTrang, GhiChu, MaSoChungTu) VALUES
('TT001', NULL,    'COC001', 3000000, 'BANK_TRANSFER', '2024-01-13 09:15:00', 'DEPOSIT',      'COMPLETED', 'Thanh toán đặt cọc hợp đồng HD001', 'CT20240113001'),
('TT002', 'HD001', NULL,     3000000, 'BANK_TRANSFER', '2024-02-01 08:00:00', 'MONTHLY_RENT', 'COMPLETED', 'Tiền thuê tháng 2/2024',            'CT20240201001');

-- ------------------------------------------------------------
-- TAI_SAN
-- ------------------------------------------------------------
INSERT INTO TAI_SAN (MaTaiSan, TenTaiSan, LoaiTaiSan, TinhTrang) VALUES
('TS001', 'Giường tầng',    'Nội thất',   'IN_USE'),
('TS002', 'Nệm',            'Nội thất',   'IN_USE'),
('TS003', 'Tủ quần áo',     'Nội thất',   'IN_USE'),
('TS004', 'Chìa khóa',      'Phụ kiện',   'IN_USE'),
('TS005', 'Điều hòa',       'Điện máy',   'IN_USE'),
('TS006', 'Quạt trần',      'Điện máy',   'AVAILABLE');

-- ------------------------------------------------------------
-- BANG_GIAO (Handover for HD001 — COMPLETED)
-- ------------------------------------------------------------
INSERT INTO BANG_GIAO (MaBanGiao, MaHopDong, NgayGiao, TinhTrang, MaNV) VALUES
('BG001', 'HD001', '2024-02-01 09:00:00', 'COMPLETED', 'NV002');

-- ------------------------------------------------------------
-- BANGGIAO_TAISAN (Assets handed over in BG001)
-- ------------------------------------------------------------
INSERT INTO BANGGIAO_TAISAN (MaBanGiao, MaTaiSan, SoLuong, TinhTrangLucGiao, GhiChu, DaKiemTra) VALUES
('BG001', 'TS001', 2, 'AVAILABLE', '2 giường tầng trong phòng P102',     TRUE),
('BG001', 'TS002', 2, 'AVAILABLE', '2 nệm cho 2 giường',                 TRUE),
('BG001', 'TS003', 1, 'AVAILABLE', '1 tủ quần áo dùng chung',            TRUE),
('BG001', 'TS004', 2, 'AVAILABLE', '2 chìa khóa phòng',                  TRUE),
('BG001', 'TS005', 1, 'AVAILABLE', '1 điều hòa Daikin 12000 BTU',        TRUE);

-- ------------------------------------------------------------
-- QUY_DINH
-- ------------------------------------------------------------
INSERT INTO QUY_DINH (MaQuyDinh, TieuDe, NhomQuyDinh, NoiDung, NgayHieuLuc, NgayHetHieuLuc, TrangThai, UuTien, ApDungCho, NgayTao) VALUES
('QD001',
 'Quy định giờ giấc và yên tĩnh',
 'NỘI QUY PHÒNG',
 'Cư dân phải giữ yên tĩnh sau 22:00 và trước 06:00. Không tổ chức tụ tập, tiệc tùng trong phòng. Vi phạm lần đầu nhắc nhở, lần hai phạt 200.000 đồng, lần ba có thể bị chấm dứt hợp đồng.',
 '2024-01-01', NULL, 'ACTIVE', 'HIGH', 'Tất cả cư dân', '2024-01-01 00:00:00'),

('QD002',
 'Quy định vệ sinh và sử dụng không gian chung',
 'VỆ SINH CHUNG',
 'Cư dân có trách nhiệm giữ sạch sẽ phòng ở và khu vực chung. Rác phải được phân loại và đổ đúng nơi quy định trước 07:00 hàng ngày. Không để xe dưới hành lang hoặc lối đi. Phí vệ sinh ngoài giờ: 50.000 đồng/lần.',
 '2024-01-01', NULL, 'ACTIVE', 'MEDIUM', 'Tất cả cư dân', '2024-01-01 00:00:00'),

('QD003',
 'Chính sách đặt cọc và hoàn cọc',
 'TÀI CHÍNH',
 'Tiền đặt cọc bằng 1 tháng tiền thuê. Hoàn cọc 100% nếu phòng còn nguyên vẹn và thông báo trước 30 ngày. Khấu trừ 30% nếu phòng bẩn cần vệ sinh chuyên sâu. Khấu trừ theo thực tế nếu có hư hỏng tài sản. Không hoàn cọc nếu vi phạm hợp đồng nghiêm trọng.',
 '2024-01-01', NULL, 'ACTIVE', 'HIGH', 'Tất cả cư dân', '2024-01-01 00:00:00');

-- =============================================================
-- SECTION 4: INDEXES for performance
-- =============================================================

CREATE INDEX idx_phong_chinhanh    ON PHONG(MaChiNhanh);
CREATE INDEX idx_phong_tinhtrang   ON PHONG(TinhTrang);
CREATE INDEX idx_giuong_phong      ON GIUONG(MaPhong);
CREATE INDEX idx_giuong_tinhtrang  ON GIUONG(TinhTrang);
CREATE INDEX idx_nhanvien_chinhanh ON NHAN_VIEN(MaChiNhanh);
CREATE INDEX idx_nhanvien_email    ON NHAN_VIEN(Email);
CREATE INDEX idx_khachhang_sdt     ON KHACH_HANG(SDT);
CREATE INDEX idx_khachhang_email   ON KHACH_HANG(Email);
CREATE INDEX idx_hopdong_phong     ON HOP_DONG_THUE_NHA(MaPhong);
CREATE INDEX idx_hopdong_nhom      ON HOP_DONG_THUE_NHA(MaNhom);
CREATE INDEX idx_hopdong_tinhtrang ON HOP_DONG_THUE_NHA(TinhTrang);
CREATE INDEX idx_datcoc_khachhang  ON DAT_COC(MaKH);
CREATE INDEX idx_datcoc_tinhtrang  ON DAT_COC(TinhTrang);
CREATE INDEX idx_thanhToan_hopdong ON THANH_TOAN(MaHopDong);
CREATE INDEX idx_thanhToan_coc     ON THANH_TOAN(MaCoc);
CREATE INDEX idx_lxp_khachhang     ON LICH_XEM_PHONG(MaKH);
CREATE INDEX idx_lxp_phong         ON LICH_XEM_PHONG(MaPhong);
CREATE INDEX idx_lxp_ngayxem       ON LICH_XEM_PHONG(NgayXem);
CREATE INDEX idx_chitietthue_kh    ON CHI_TIET_THUE(MaKH);
CREATE INDEX idx_trphong_hopdong   ON TRA_PHONG(MaHopDong);
CREATE INDEX idx_nhom_madadien     ON NHOM(MaDaiDien);

-- =============================================================
-- Done. Database initialized successfully.
-- =============================================================
