BEGIN;

-- =============================================================
-- 1. CHI_NHANH (8 new branches to total 10)
-- =============================================================
INSERT INTO CHI_NHANH (MaChiNhanh, TenChiNhanh, DiaChi, SDT, Email)
SELECT
    'CN' || LPAD((i + 2)::text, 3, '0'),
    'HomeStay Dorm Chi Nhánh ' || (i + 2),
    'Đường số ' || i || ', Quận ' || (i % 12 + 1) || ', TP.HCM',
    '0283' || LPAD((random() * 1000000)::int::text, 6, '0'),
    'chinhanh' || (i + 2) || '@homestay.com'
FROM generate_series(1, 8) AS i
ON CONFLICT (MaChiNhanh) DO NOTHING;

-- =============================================================
-- 2. NHAN_VIEN (16 new staff to total 20)
-- Password hash for '123456'
-- =============================================================
INSERT INTO NHAN_VIEN (MaNV, MaChiNhanh, TenNV, ChucVu, SDT, Email, MatKhau, NgayVaoLam, IsActive)
SELECT
    'NV' || LPAD((i + 4)::text, 3, '0'),
    'CN' || LPAD(((i % 10) + 1)::text, 3, '0'),
    'Nhân viên ' || (i + 4),
    CASE (i % 4) WHEN 0 THEN 'SALE' WHEN 1 THEN 'MANAGER' WHEN 2 THEN 'ACCOUNTANT' ELSE 'ADMIN' END,
    '09' || LPAD((random() * 100000000)::int::text, 8, '0'),
    'nhanvien' || (i + 4) || '@homestay.com',
    '$2a$10$navmmUPXpAw5h/IzDcTRe.TktMaPX/SJ0Hc.FvdeTS2OAkGoiLk7C',
    (timestamp '2022-01-01' + random() * (timestamp '2024-01-01' - timestamp '2022-01-01'))::date,
    TRUE
FROM generate_series(1, 16) AS i
ON CONFLICT (MaNV) DO NOTHING;

-- =============================================================
-- 3. PHONG (500 rooms)
-- =============================================================
INSERT INTO PHONG (MaPhong, MaChiNhanh, GiaThue, KhuVuc, Tang, SucChua, TinhTrang, GhiChu)
SELECT
    'P' || LPAD((i + 1000)::text, 4, '0'),
    'CN' || LPAD((((i - 1) / 50) + 1)::text, 3, '0'),
    (random() * 4500000 + 500000)::numeric(12,0),
    CASE (i % 3) WHEN 0 THEN 'A' WHEN 1 THEN 'B' ELSE 'C' END,
    (i % 5) + 1,
    6,
    CASE
        WHEN i % 100 < 50 THEN 'AVAILABLE'
        WHEN i % 100 < 60 THEN 'PENDING'
        WHEN i % 100 < 75 THEN 'RESERVED'
        WHEN i % 100 < 95 THEN 'OCCUPIED'
        WHEN i % 100 < 99 THEN 'MAINTENANCE'
        ELSE 'INACTIVE'
    END,
    'Phòng sinh tự động'
FROM generate_series(1, 500) AS i
ON CONFLICT (MaPhong) DO NOTHING;

-- =============================================================
-- 4. GIUONG (3000 beds, 6 per room)
-- =============================================================
INSERT INTO GIUONG (MaGiuong, MaPhong, GiaGiuong, TinhTrang)
SELECT
    'G' || LPAD((i + 1000)::text, 5, '0'),
    'P' || LPAD((((i - 1) / 6) + 1001)::text, 4, '0'),
    (random() * 1000000 + 500000)::numeric(12,0),
    'AVAILABLE'
FROM generate_series(1, 3000) AS i
ON CONFLICT (MaGiuong) DO NOTHING;

-- Update GIUONG TinhTrang based on PHONG TinhTrang
UPDATE GIUONG
SET TinhTrang = p.TinhTrang
FROM PHONG p
WHERE GIUONG.MaPhong = p.MaPhong AND p.TinhTrang IN ('AVAILABLE', 'OCCUPIED', 'RESERVED', 'PENDING');

-- =============================================================
-- 5. KHACH_HANG (5000 customers)
-- =============================================================
INSERT INTO KHACH_HANG (MaKH, HoTen, GioiTinh, QuocTich, GiayToTuyThan, SDT, Email, NgaySinh, DiaChi)
SELECT
    'KH' || LPAD((i + 5)::text, 5, '0'),
    'Khách ' || (i + 5),
    CASE WHEN i % 2 = 0 THEN 'Nam' ELSE 'Nữ' END,
    'Việt Nam',
    LPAD((random() * 1000000000000)::bigint::text, 12, '0'),
    '09' || LPAD((random() * 100000000)::int::text, 8, '0'),
    'khach' || (i + 5) || '@gmail.com',
    (timestamp '1990-01-01' + random() * (timestamp '2005-01-01' - timestamp '1990-01-01'))::date,
    'Địa chỉ ' || (i + 5)
FROM generate_series(1, 5000) AS i
ON CONFLICT (MaKH) DO NOTHING;

-- =============================================================
-- 6. NHOM (1000 groups, without MaHopDong yet)
-- =============================================================
INSERT INTO NHOM (MaNhom, TenNhom, MaDaiDien, NgayTao, TrangThai)
SELECT
    'NHO' || LPAD(i::text, 5, '0'),
    'Nhóm ' || i,
    'KH' || LPAD((i + 5)::text, 5, '0'),
    (timestamp '2023-01-01' + random() * (timestamp '2024-01-01' - timestamp '2023-01-01'))::date,
    'ACTIVE'
FROM generate_series(1, 1000) AS i
ON CONFLICT (MaNhom) DO NOTHING;

-- =============================================================
-- 7. THANHVIEN_NHOM (2500 members, using composite PK)
-- =============================================================
-- First batch: 1000 groups each gets 1 extra member (total 1000)
INSERT INTO THANHVIEN_NHOM (MaNhom, MaKH, TrangThai)
SELECT
    'NHO' || LPAD(i::text, 5, '0'),
    'KH' || LPAD((i + 1005)::text, 5, '0'),
    'ACTIVE'
FROM generate_series(1, 1000) AS i
ON CONFLICT (MaNhom, MaKH) DO NOTHING;

-- Second batch: 500 groups get a second member
INSERT INTO THANHVIEN_NHOM (MaNhom, MaKH, TrangThai)
SELECT
    'NHO' || LPAD(i::text, 5, '0'),
    'KH' || LPAD((i + 2005)::text, 5, '0'),
    'ACTIVE'
FROM generate_series(1, 500) AS i
ON CONFLICT (MaNhom, MaKH) DO NOTHING;

-- Third batch: 1000 random members (some may duplicate, conflict ignored)
INSERT INTO THANHVIEN_NHOM (MaNhom, MaKH, TrangThai)
SELECT
    'NHO' || LPAD((((i - 1) % 1000) + 1)::text, 5, '0'),
    'KH' || LPAD((i + 2505)::text, 5, '0'),
    'ACTIVE'
FROM generate_series(1, 1000) AS i
ON CONFLICT (MaNhom, MaKH) DO NOTHING;

-- =============================================================
-- 8. LICH_XEM_PHONG (3000 schedules)
-- =============================================================
INSERT INTO LICH_XEM_PHONG (MaLich, MaKH, MaPhong, MaNV, NgayXem, GioXem, KetQua, GhiChu, TrangThai)
SELECT
    'LXP' || LPAD((i + 2)::text, 5, '0'),
    'KH' || LPAD(((i % 5000) + 6)::text, 5, '0'),
    'P' || LPAD(((i % 500) + 1001)::text, 4, '0'),
    'NV' || LPAD(((i % 20) + 1)::text, 3, '0'),
    (timestamp '2023-01-01' + random() * (timestamp '2024-06-01' - timestamp '2023-01-01'))::date,
    (time '08:00:00' + random() * (time '18:00:00' - time '08:00:00')),
    CASE WHEN i % 2 = 0 THEN 'INTERESTED' ELSE 'NOT_INTERESTED' END,
    'Lịch xem phòng tự động',
    'COMPLETED'
FROM generate_series(1, 3000) AS i
ON CONFLICT (MaLich) DO NOTHING;

-- =============================================================
-- 9. HOP_DONG_THUE_NHA (2000 contracts)
-- =============================================================
INSERT INTO HOP_DONG_THUE_NHA (MaHopDong, MaPhong, MaNhom, NgayBatDau, NgayKetThuc, GiaThue, NoiQuy, TinhTrang, NgayKy, MaNVPhuTrach)
SELECT
    'HD' || LPAD((i + 2)::text, 5, '0'),
    'P' || LPAD(((i % 500) + 1001)::text, 4, '0'),
    'NHO' || LPAD(((i % 1000) + 1)::text, 5, '0'),
    (timestamp '2022-01-01' + (i * interval '12 hours'))::date,
    (timestamp '2023-01-01' + (i * interval '12 hours'))::date,
    (random() * 4500000 + 500000)::numeric(12,0),
    'Tuân thủ nội quy ký túc xá',
    CASE
        WHEN i % 100 < 10 THEN 'PENDING_FIRST_PAYMENT'
        WHEN i % 100 < 80 THEN 'ACTIVE'
        WHEN i % 100 < 95 THEN 'EXPIRED'
        ELSE 'TERMINATED'
    END,
    timestamp '2022-01-01' + (i * interval '12 hours') - interval '2 days',
    'NV' || LPAD(((i % 20) + 1)::text, 3, '0')
FROM generate_series(1, 2000) AS i
ON CONFLICT (MaHopDong) DO NOTHING;

-- Update NHOM.MaHopDong to link groups with contracts
UPDATE NHOM
SET MaHopDong = HOP_DONG_THUE_NHA.MaHopDong
FROM HOP_DONG_THUE_NHA
WHERE NHOM.MaNhom = HOP_DONG_THUE_NHA.MaNhom
  AND NHOM.MaHopDong IS NULL;

-- Update room status based on active contracts
UPDATE PHONG SET TinhTrang = 'OCCUPIED'
WHERE MaPhong IN (SELECT MaPhong FROM HOP_DONG_THUE_NHA WHERE TinhTrang = 'ACTIVE')
  AND TinhTrang != 'OCCUPIED';

-- =============================================================
-- 10. DAT_COC (2000 deposits)
-- =============================================================
INSERT INTO DAT_COC (MaCoc, MaHopDong, MaKH, MaPhong, MaGiuong, NguoiPheDuyet, NgayDatCoc, SoTienCoc, PhuongThucThanhToan, TinhTrang, ThoiGianHetHan, ThoiGianPheDuyet, GhiChu)
SELECT
    'COC' || LPAD((i + 2)::text, 5, '0'),
    'HD' || LPAD((i + 2)::text, 5, '0'),
    'KH' || LPAD(((i % 5000) + 6)::text, 5, '0'),
    'P' || LPAD(((i % 500) + 1001)::text, 4, '0'),
    NULL,
    'NV' || LPAD(((i % 20) + 1)::text, 3, '0'),
    timestamp '2022-01-01' + (i * interval '12 hours') - interval '5 days',
    (random() * 2000000 + 1000000)::numeric(12,0),
    CASE WHEN i % 2 = 0 THEN 'CASH' ELSE 'BANK_TRANSFER' END,
    CASE
        WHEN i % 100 < 30 THEN 'PENDING_PAYMENT'
        WHEN i % 100 < 80 THEN 'APPROVED'
        WHEN i % 100 < 95 THEN 'EXPIRED'
        ELSE 'CANCELLED'
    END,
    timestamp '2022-01-01' + (i * interval '12 hours') - interval '4 days',
    CASE WHEN i % 100 >= 30 AND i % 100 < 80 THEN timestamp '2022-01-01' + (i * interval '12 hours') - interval '4 days 12 hours' ELSE NULL END,
    'Cọc sinh tự động'
FROM generate_series(1, 2000) AS i
ON CONFLICT (MaCoc) DO NOTHING;

-- Ensure APPROVED deposits have RESERVED rooms (if not already occupied or under maintenance)
UPDATE PHONG SET TinhTrang = 'RESERVED'
WHERE MaPhong IN (SELECT MaPhong FROM DAT_COC WHERE TinhTrang = 'APPROVED')
  AND TinhTrang NOT IN ('OCCUPIED', 'MAINTENANCE', 'RESERVED');

-- =============================================================
-- 11. CHI_TIET_THUE (3000 details, ensure no duplicate (MaHopDong, MaGiuong))
-- =============================================================
-- We'll use a more controlled approach to avoid PK violation
INSERT INTO CHI_TIET_THUE (MaHopDong, MaGiuong, MaKH, GiaThueThucTe)
SELECT
    hd.MaHopDong,
    g.MaGiuong,
    k.MaKH,
    (random() * 1000000 + 500000)::numeric(12,0)
FROM (
    SELECT MaHopDong, ROW_NUMBER() OVER (ORDER BY random()) as rn
    FROM HOP_DONG_THUE_NHA
    WHERE TinhTrang IN ('ACTIVE', 'PENDING_FIRST_PAYMENT')
    LIMIT 1500
) hd
CROSS JOIN LATERAL (
    SELECT MaGiuong FROM GIUONG
    WHERE MaPhong = (SELECT MaPhong FROM HOP_DONG_THUE_NHA WHERE MaHopDong = hd.MaHopDong)
    LIMIT 1
) g
CROSS JOIN LATERAL (
    SELECT MaKH FROM KHACH_HANG
    ORDER BY random()
    LIMIT 1
) k
ON CONFLICT (MaHopDong, MaGiuong) DO NOTHING;

-- Add some additional detail records for remaining contracts (up to 3000 total)
INSERT INTO CHI_TIET_THUE (MaHopDong, MaGiuong, MaKH, GiaThueThucTe)
SELECT
    hd.MaHopDong,
    g.MaGiuong,
    k.MaKH,
    (random() * 1000000 + 500000)::numeric(12,0)
FROM (
    SELECT MaHopDong, ROW_NUMBER() OVER (ORDER BY random()) as rn
    FROM HOP_DONG_THUE_NHA
    WHERE TinhTrang IN ('ACTIVE', 'PENDING_FIRST_PAYMENT')
    LIMIT 1500
) hd
CROSS JOIN LATERAL (
    SELECT MaGiuong FROM GIUONG
    WHERE MaPhong = (SELECT MaPhong FROM HOP_DONG_THUE_NHA WHERE MaHopDong = hd.MaHopDong)
    OFFSET 1 LIMIT 1
) g
CROSS JOIN LATERAL (
    SELECT MaKH FROM KHACH_HANG
    ORDER BY random()
    LIMIT 1
) k
ON CONFLICT (MaHopDong, MaGiuong) DO NOTHING;

-- =============================================================
-- 12. YEU_CAU_THUE (1000 records)
-- =============================================================
INSERT INTO YEU_CAU_THUE (MaYeuCauThue, MaKH, LoaiPhong, GiaMongMuon, TieuChiKhac, NgayTao)
SELECT
    'YCT' || LPAD(i::text, 5, '0'),
    'KH' || LPAD(((i % 5000) + 6)::text, 5, '0'),
    CASE (i % 3) WHEN 0 THEN 'SINGLE' WHEN 1 THEN 'DOUBLE' ELSE 'DORMITORY' END,
    (random() * 3000000 + 1000000)::numeric(12,0),
    'Gần trung tâm, yên tĩnh',
    timestamp '2023-01-01' + random() * (timestamp '2024-06-01' - timestamp '2023-01-01')
FROM generate_series(1, 1000) AS i
ON CONFLICT (MaYeuCauThue) DO NOTHING;

-- =============================================================
-- 13. DICH_VU (Add 3 new to total 6)
-- =============================================================
INSERT INTO DICH_VU (MaDV, TenDV, Gia, NgayApDung, MoTa)
VALUES
('DV004', 'Gửi xe máy', 150000, '2023-01-01', 'Phí giữ xe tháng'),
('DV005', 'Giặt sấy', 200000, '2023-01-01', 'Phí giặt sấy tháng'),
('DV006', 'Dọn phòng', 100000, '2023-01-01', 'Phí dọn vệ sinh 1 lần')
ON CONFLICT (MaDV) DO NOTHING;

-- =============================================================
-- 14. DICHVU_PHONG (1500 records, each room gets 3 services)
-- =============================================================
INSERT INTO DICHVU_PHONG (MaPhong, MaDV)
SELECT
    'P' || LPAD((p + 1000)::text, 4, '0'),
    'DV00' || d::text
FROM generate_series(1, 500) p
CROSS JOIN generate_series(1, 3) d
ON CONFLICT (MaPhong, MaDV) DO NOTHING;

-- =============================================================
-- 15. THANH_TOAN (3000 payments)
-- =============================================================
INSERT INTO THANH_TOAN (MaThanhToan, MaHopDong, MaCoc, SoTien, PhuongThuc, NgayThanhToan, LoaiThanhToan, TinhTrang, GhiChu, MaSoChungTu)
SELECT
    'TT' || LPAD((i + 2)::text, 5, '0'),
    'HD' || LPAD((((i - 1) % 2000) + 3)::text, 5, '0'),
    NULL,
    (random() * 4000000 + 1000000)::numeric(12,0),
    CASE WHEN i % 2 = 0 THEN 'BANK_TRANSFER' ELSE 'CASH' END,
    timestamp '2023-01-01' + random() * (timestamp '2024-06-01' - timestamp '2023-01-01'),
    CASE WHEN i % 3 = 0 THEN 'DEPOSIT' ELSE 'MONTHLY_RENT' END,
    'COMPLETED',
    'Thanh toán ' || i,
    'CT' || i
FROM generate_series(1, 3000) AS i
ON CONFLICT (MaThanhToan) DO NOTHING;

-- =============================================================
-- 16. TAI_SAN (20 assets total, add 14 more)
-- =============================================================
INSERT INTO TAI_SAN (MaTaiSan, TenTaiSan, LoaiTaiSan, TinhTrang)
SELECT
    'TS' || LPAD((i + 6)::text, 3, '0'),
    'Tài sản ' || (i + 6),
    CASE (i % 3) WHEN 0 THEN 'Nội thất' WHEN 1 THEN 'Điện máy' ELSE 'Phụ kiện' END,
    'AVAILABLE'
FROM generate_series(1, 14) AS i
ON CONFLICT (MaTaiSan) DO NOTHING;

-- =============================================================
-- 17. BANG_GIAO (1500 handovers)
-- =============================================================
INSERT INTO BANG_GIAO (MaBanGiao, MaHopDong, NgayGiao, TinhTrang, MaNV)
SELECT
    'BG' || LPAD(i::text, 5, '0'),
    'HD' || LPAD((i + 2)::text, 5, '0'),
    timestamp '2022-01-01' + (i * interval '12 hours'),
    'COMPLETED',
    'NV' || LPAD(((i % 20) + 1)::text, 3, '0')
FROM generate_series(1, 1500) AS i
ON CONFLICT (MaBanGiao) DO NOTHING;

-- =============================================================
-- 18. BANGGIAO_TAISAN (6000 records, 4 per handover)
-- =============================================================
INSERT INTO BANGGIAO_TAISAN (MaBanGiao, MaTaiSan, SoLuong, TinhTrangLucGiao, GhiChu, DaKiemTra)
SELECT
    'BG' || LPAD((((i - 1) / 4) + 1)::text, 5, '0'),
    'TS' || LPAD((((i - 1) % 20) + 1)::text, 3, '0'),
    1,
    'Tốt',
    'Bàn giao tài sản tự động',
    TRUE
FROM generate_series(1, 6000) AS i
ON CONFLICT (MaBanGiao, MaTaiSan) DO NOTHING;

-- =============================================================
-- 19. TRA_PHONG (1000 checkouts)
-- =============================================================
INSERT INTO TRA_PHONG (MaTra, MaHopDong, NgayYeuCau, NgayTraDuKien, NgayTraThucTe, TinhTrangPhong, LyDo, TyLeHoanCoc, SoTienHoan, TrangThai, MaNVXuLy)
SELECT
    'TP' || LPAD(i::text, 5, '0'),
    'HD' || LPAD((i + 2)::text, 5, '0'),
    timestamp '2023-12-01' + (i * interval '5 hours'),
    (timestamp '2023-12-01' + (i * interval '5 hours') + interval '5 days')::date,
    (timestamp '2023-12-01' + (i * interval '5 hours') + interval '5 days')::date,
    CASE WHEN i % 10 = 0 THEN 'DAMAGED' WHEN i % 5 = 0 THEN 'DIRTY' ELSE 'GOOD' END,
    'Hết hạn hợp đồng',
    100.00,
    (random() * 2000000 + 1000000)::numeric(12,0),
    CASE WHEN i % 100 < 50 THEN 'COMPLETED' WHEN i % 100 < 70 THEN 'INSPECTING' ELSE 'PENDING' END,
    'NV' || LPAD(((i % 20) + 1)::text, 3, '0')
FROM generate_series(1, 1000) AS i
ON CONFLICT (MaTra) DO NOTHING;

-- =============================================================
-- 20. CHITIETKHAUTRU (3000 deductions, 3 per checkout)
-- =============================================================
INSERT INTO CHITIETKHAUTRU (MaTra, LoaiPhi, SoTien, GhiChu)
SELECT
    'TP' || LPAD((((i - 1) / 3) + 1)::text, 5, '0'),
    CASE (i % 6)
        WHEN 0 THEN 'DIEN' WHEN 1 THEN 'NUOC' WHEN 2 THEN 'DICH_VU'
        WHEN 3 THEN 'HU_HONG' WHEN 4 THEN 'PHAT' ELSE 'NO_TIEN_PHONG'
    END,
    (random() * 500000 + 50000)::numeric(12,0),
    'Khấu trừ tự động ' || i
FROM generate_series(1, 3000) AS i;

-- =============================================================
-- 21. QUY_DINH (10 rules total, add 7 more)
-- =============================================================
INSERT INTO QUY_DINH (MaQuyDinh, TieuDe, NhomQuyDinh, NoiDung, NgayHieuLuc, TrangThai)
SELECT
    'QD' || LPAD((i + 3)::text, 3, '0'),
    'Quy định ' || (i + 3),
    'Chung',
    'Nội dung quy định ' || (i + 3),
    '2022-01-01',
    'ACTIVE'
FROM generate_series(1, 7) AS i
ON CONFLICT (MaQuyDinh) DO NOTHING;

-- =============================================================
-- FINAL CONSISTENCY UPDATES
-- =============================================================

-- For COMPLETED checkouts, terminate contracts and set rooms to AVAILABLE
UPDATE HOP_DONG_THUE_NHA SET TinhTrang = 'TERMINATED'
WHERE MaHopDong IN (SELECT MaHopDong FROM TRA_PHONG WHERE TrangThai = 'COMPLETED')
  AND TinhTrang != 'TERMINATED';

UPDATE PHONG SET TinhTrang = 'AVAILABLE'
WHERE MaPhong IN (
    SELECT h.MaPhong FROM HOP_DONG_THUE_NHA h
    JOIN TRA_PHONG t ON h.MaHopDong = t.MaHopDong
    WHERE t.TrangThai = 'COMPLETED'
);

-- Ensure rooms with active contracts are OCCUPIED (in case some were missed)
UPDATE PHONG SET TinhTrang = 'OCCUPIED'
WHERE MaPhong IN (SELECT MaPhong FROM HOP_DONG_THUE_NHA WHERE TinhTrang = 'ACTIVE')
  AND TinhTrang NOT IN ('OCCUPIED', 'MAINTENANCE');