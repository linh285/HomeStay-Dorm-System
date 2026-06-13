-- =============================================================
-- HomeStay Dorm System – AUGMENTED SEED DATA
-- Run AFTER init.sql (which already created tables + base data)
-- This file only INSERTs additional rows; no DROP/CREATE/ALTER.
-- =============================================================
SET client_encoding = 'UTF8';

-- =============================================================
-- 1. CHI_NHANH  (thêm 3, tổng = 5)
-- =============================================================
INSERT INTO CHI_NHANH (MaChiNhanh, TenChiNhanh, DiaChi, SDT, Email) VALUES
('CN003', 'HomeStay Dorm Bình Thạnh', '88 Xô Viết Nghệ Tĩnh, Phường 19, Bình Thạnh, TP.HCM', '0283334455', 'binhthanh@homestay.vn'),
('CN004', 'HomeStay Dorm Gò Vấp',    '210 Nguyễn Văn Nghi, Phường 7, Gò Vấp, TP.HCM',        '0285556677', 'govap@homestay.vn'),
('CN005', 'HomeStay Dorm Tân Bình',   '55 Hoàng Văn Thụ, Phường 8, Tân Bình, TP.HCM',         '0287778899', 'tanbinh@homestay.vn');

-- =============================================================
-- 2. PHONG  (thêm 42 phòng → tổng ≥ 50)
-- Quy ước: PX_KkTtSs  (X=số CN, K=khu, t=tầng, S=số phòng)
-- CN001: P1xx, CN002: P2xx, CN003: P3xx, CN004: P4xx, CN005: P5xx
-- Khu A=2-person, B=4-person, C=6-person
-- =============================================================
INSERT INTO PHONG (MaPhong, MaChiNhanh, GiaThue, KhuVuc, Tang, SucChua, TinhTrang, GhiChu) VALUES
-- CN001 thêm
('P111', 'CN001', 2600000, 'A', 1, 2, 'AVAILABLE',   'Phòng đôi tầng 1 khu A'),
('P112', 'CN001', 2600000, 'A', 1, 2, 'OCCUPIED',    'Phòng đôi đang thuê'),
('P121', 'CN001', 3200000, 'A', 2, 4, 'AVAILABLE',   'Phòng 4 giường tầng 2'),
('P122', 'CN001', 3200000, 'A', 2, 4, 'PENDING',     'Chờ xác nhận cọc'),
('P131', 'CN001', 4200000, 'B', 3, 4, 'AVAILABLE',   'Phòng B tầng 3'),
('P132', 'CN001', 4200000, 'B', 3, 4, 'RESERVED',    'Đã đặt trước'),
('P141', 'CN001', 5000000, 'C', 4, 6, 'AVAILABLE',   'Phòng C lớn tầng 4'),
('P142', 'CN001', 5000000, 'C', 4, 6, 'OCCUPIED',    'Đang có 6 sinh viên'),
('P151', 'CN001', 5000000, 'C', 5, 6, 'MAINTENANCE', 'Sơn lại tường'),
-- CN002 thêm
('P211', 'CN002', 2800000, 'A', 1, 2, 'AVAILABLE',   'Phòng đôi tầng 1'),
('P212', 'CN002', 2800000, 'A', 1, 2, 'AVAILABLE',   'Phòng đôi view đường'),
('P221', 'CN002', 3400000, 'B', 2, 4, 'OCCUPIED',    'Đang có khách'),
('P222', 'CN002', 3400000, 'B', 2, 4, 'AVAILABLE',   'Phòng trống'),
('P231', 'CN002', 3400000, 'B', 3, 4, 'RESERVED',    'Cọc đã duyệt'),
('P241', 'CN002', 4800000, 'C', 4, 6, 'AVAILABLE',   'Phòng lớn'),
-- CN003 (9 phòng mới)
('P311', 'CN003', 2500000, 'A', 1, 2, 'AVAILABLE',   'Phòng đôi BT'),
('P312', 'CN003', 2500000, 'A', 1, 2, 'OCCUPIED',    'Có người thuê'),
('P321', 'CN003', 3100000, 'A', 2, 4, 'AVAILABLE',   'Phòng 4 giường BT'),
('P322', 'CN003', 3100000, 'A', 2, 4, 'PENDING',     'Chờ cọc'),
('P331', 'CN003', 4100000, 'B', 3, 4, 'AVAILABLE',   'Phòng B tầng 3'),
('P332', 'CN003', 4100000, 'B', 3, 4, 'RESERVED',    'Đã đặt trước'),
('P341', 'CN003', 4900000, 'C', 4, 6, 'AVAILABLE',   'Phòng C lớn'),
('P342', 'CN003', 4900000, 'C', 4, 6, 'OCCUPIED',    'Đang thuê'),
('P351', 'CN003', 4900000, 'C', 5, 6, 'MAINTENANCE', 'Bảo trì ống nước'),
-- CN004 (9 phòng)
('P411', 'CN004', 2700000, 'A', 1, 2, 'AVAILABLE',   'Phòng đôi GV'),
('P412', 'CN004', 2700000, 'A', 1, 2, 'AVAILABLE',   'Phòng đôi mới'),
('P421', 'CN004', 3300000, 'A', 2, 4, 'OCCUPIED',    'Có 4 sinh viên'),
('P422', 'CN004', 3300000, 'A', 2, 4, 'AVAILABLE',   'Phòng trống'),
('P431', 'CN004', 4300000, 'B', 3, 4, 'RESERVED',    'Đã cọc'),
('P432', 'CN004', 4300000, 'B', 3, 4, 'AVAILABLE',   'Sẵn sàng'),
('P441', 'CN004', 5100000, 'C', 4, 6, 'AVAILABLE',   'Phòng lớn GV'),
('P442', 'CN004', 5100000, 'C', 4, 6, 'OCCUPIED',    'Đang thuê GV'),
('P451', 'CN004', 5100000, 'C', 5, 6, 'MAINTENANCE', 'Sửa điều hòa'),
-- CN005 (9 phòng)
('P511', 'CN005', 2900000, 'A', 1, 2, 'AVAILABLE',   'Phòng đôi TB'),
('P512', 'CN005', 2900000, 'A', 1, 2, 'OCCUPIED',    'Có người thuê TB'),
('P521', 'CN005', 3500000, 'B', 2, 4, 'AVAILABLE',   'Phòng 4G TB'),
('P522', 'CN005', 3500000, 'B', 2, 4, 'PENDING',     'Chờ xác nhận'),
('P531', 'CN005', 4500000, 'B', 3, 4, 'AVAILABLE',   'Tầng 3 TB'),
('P532', 'CN005', 4500000, 'B', 3, 4, 'RESERVED',    'Đặt trước'),
('P541', 'CN005', 5200000, 'C', 4, 6, 'AVAILABLE',   'Phòng lớn TB'),
('P542', 'CN005', 5200000, 'C', 4, 6, 'OCCUPIED',    'Đang thuê'),
('P551', 'CN005', 5200000, 'C', 5, 6, 'AVAILABLE',   'Tầng 5 view đẹp');

-- =============================================================
-- 3. GIUONG  (thêm giường cho 42 phòng mới)
-- Phòng SucChua=2 → 2 giường, SucChua=4 → 4 giường, SucChua=6 → 6 giường
-- =============================================================
INSERT INTO GIUONG (MaGiuong, MaPhong, GiaGiuong, TinhTrang) VALUES
-- CN001 phòng mới
('G111A','P111',1300000,'AVAILABLE'),('G111B','P111',1300000,'AVAILABLE'),
('G112A','P112',1300000,'OCCUPIED'), ('G112B','P112',1300000,'OCCUPIED'),
('G121A','P121',800000, 'AVAILABLE'),('G121B','P121',800000, 'AVAILABLE'),('G121C','P121',800000,'AVAILABLE'),('G121D','P121',800000,'AVAILABLE'),
('G122A','P122',800000, 'PENDING'),  ('G122B','P122',800000, 'AVAILABLE'),('G122C','P122',800000,'AVAILABLE'),('G122D','P122',800000,'AVAILABLE'),
('G131A','P131',1050000,'AVAILABLE'),('G131B','P131',1050000,'AVAILABLE'),('G131C','P131',1050000,'AVAILABLE'),('G131D','P131',1050000,'AVAILABLE'),
('G132A','P132',1050000,'RESERVED'), ('G132B','P132',1050000,'RESERVED'), ('G132C','P132',1050000,'RESERVED'), ('G132D','P132',1050000,'AVAILABLE'),
('G141A','P141',833000, 'AVAILABLE'),('G141B','P141',833000, 'AVAILABLE'),('G141C','P141',833000,'AVAILABLE'),('G141D','P141',833000,'AVAILABLE'),('G141E','P141',833000,'AVAILABLE'),('G141F','P141',833000,'AVAILABLE'),
('G142A','P142',833000, 'OCCUPIED'), ('G142B','P142',833000, 'OCCUPIED'), ('G142C','P142',833000,'OCCUPIED'), ('G142D','P142',833000,'OCCUPIED'), ('G142E','P142',833000,'OCCUPIED'), ('G142F','P142',833000,'OCCUPIED'),
('G151A','P151',833000, 'AVAILABLE'),('G151B','P151',833000, 'AVAILABLE'),('G151C','P151',833000,'AVAILABLE'),('G151D','P151',833000,'AVAILABLE'),('G151E','P151',833000,'AVAILABLE'),('G151F','P151',833000,'AVAILABLE'),
-- CN002 phòng mới
('G211A','P211',1400000,'AVAILABLE'),('G211B','P211',1400000,'AVAILABLE'),
('G212A','P212',1400000,'AVAILABLE'),('G212B','P212',1400000,'AVAILABLE'),
('G221A','P221',850000, 'OCCUPIED'), ('G221B','P221',850000, 'OCCUPIED'), ('G221C','P221',850000,'OCCUPIED'),('G221D','P221',850000,'OCCUPIED'),
('G222A','P222',850000, 'AVAILABLE'),('G222B','P222',850000, 'AVAILABLE'),('G222C','P222',850000,'AVAILABLE'),('G222D','P222',850000,'AVAILABLE'),
('G231A','P231',850000, 'RESERVED'), ('G231B','P231',850000, 'RESERVED'), ('G231C','P231',850000,'AVAILABLE'),('G231D','P231',850000,'AVAILABLE'),
('G241A','P241',800000, 'AVAILABLE'),('G241B','P241',800000, 'AVAILABLE'),('G241C','P241',800000,'AVAILABLE'),('G241D','P241',800000,'AVAILABLE'),('G241E','P241',800000,'AVAILABLE'),('G241F','P241',800000,'AVAILABLE'),
-- CN003
('G311A','P311',1250000,'AVAILABLE'),('G311B','P311',1250000,'AVAILABLE'),
('G312A','P312',1250000,'OCCUPIED'), ('G312B','P312',1250000,'OCCUPIED'),
('G321A','P321',775000, 'AVAILABLE'),('G321B','P321',775000, 'AVAILABLE'),('G321C','P321',775000,'AVAILABLE'),('G321D','P321',775000,'AVAILABLE'),
('G322A','P322',775000, 'PENDING'),  ('G322B','P322',775000, 'AVAILABLE'),('G322C','P322',775000,'AVAILABLE'),('G322D','P322',775000,'AVAILABLE'),
('G331A','P331',1025000,'AVAILABLE'),('G331B','P331',1025000,'AVAILABLE'),('G331C','P331',1025000,'AVAILABLE'),('G331D','P331',1025000,'AVAILABLE'),
('G332A','P332',1025000,'RESERVED'), ('G332B','P332',1025000,'RESERVED'), ('G332C','P332',1025000,'AVAILABLE'),('G332D','P332',1025000,'AVAILABLE'),
('G341A','P341',817000, 'AVAILABLE'),('G341B','P341',817000, 'AVAILABLE'),('G341C','P341',817000,'AVAILABLE'),('G341D','P341',817000,'AVAILABLE'),('G341E','P341',817000,'AVAILABLE'),('G341F','P341',817000,'AVAILABLE'),
('G342A','P342',817000, 'OCCUPIED'), ('G342B','P342',817000, 'OCCUPIED'), ('G342C','P342',817000,'OCCUPIED'), ('G342D','P342',817000,'OCCUPIED'), ('G342E','P342',817000,'OCCUPIED'), ('G342F','P342',817000,'OCCUPIED'),
('G351A','P351',817000, 'AVAILABLE'),('G351B','P351',817000, 'AVAILABLE'),('G351C','P351',817000,'AVAILABLE'),('G351D','P351',817000,'AVAILABLE'),('G351E','P351',817000,'AVAILABLE'),('G351F','P351',817000,'AVAILABLE'),
-- CN004
('G411A','P411',1350000,'AVAILABLE'),('G411B','P411',1350000,'AVAILABLE'),
('G412A','P412',1350000,'AVAILABLE'),('G412B','P412',1350000,'AVAILABLE'),
('G421A','P421',825000, 'OCCUPIED'), ('G421B','P421',825000, 'OCCUPIED'), ('G421C','P421',825000,'OCCUPIED'),('G421D','P421',825000,'OCCUPIED'),
('G422A','P422',825000, 'AVAILABLE'),('G422B','P422',825000, 'AVAILABLE'),('G422C','P422',825000,'AVAILABLE'),('G422D','P422',825000,'AVAILABLE'),
('G431A','P431',1075000,'RESERVED'), ('G431B','P431',1075000,'RESERVED'), ('G431C','P431',1075000,'AVAILABLE'),('G431D','P431',1075000,'AVAILABLE'),
('G432A','P432',1075000,'AVAILABLE'),('G432B','P432',1075000,'AVAILABLE'),('G432C','P432',1075000,'AVAILABLE'),('G432D','P432',1075000,'AVAILABLE'),
('G441A','P441',850000, 'AVAILABLE'),('G441B','P441',850000, 'AVAILABLE'),('G441C','P441',850000,'AVAILABLE'),('G441D','P441',850000,'AVAILABLE'),('G441E','P441',850000,'AVAILABLE'),('G441F','P441',850000,'AVAILABLE'),
('G442A','P442',850000, 'OCCUPIED'), ('G442B','P442',850000, 'OCCUPIED'), ('G442C','P442',850000,'OCCUPIED'), ('G442D','P442',850000,'OCCUPIED'), ('G442E','P442',850000,'OCCUPIED'), ('G442F','P442',850000,'OCCUPIED'),
('G451A','P451',850000, 'AVAILABLE'),('G451B','P451',850000, 'AVAILABLE'),('G451C','P451',850000,'AVAILABLE'),('G451D','P451',850000,'AVAILABLE'),('G451E','P451',850000,'AVAILABLE'),('G451F','P451',850000,'AVAILABLE'),
-- CN005
('G511A','P511',1450000,'AVAILABLE'),('G511B','P511',1450000,'AVAILABLE'),
('G512A','P512',1450000,'OCCUPIED'), ('G512B','P512',1450000,'OCCUPIED'),
('G521A','P521',875000, 'AVAILABLE'),('G521B','P521',875000, 'AVAILABLE'),('G521C','P521',875000,'AVAILABLE'),('G521D','P521',875000,'AVAILABLE'),
('G522A','P522',875000, 'PENDING'),  ('G522B','P522',875000, 'AVAILABLE'),('G522C','P522',875000,'AVAILABLE'),('G522D','P522',875000,'AVAILABLE'),
('G531A','P531',1125000,'AVAILABLE'),('G531B','P531',1125000,'AVAILABLE'),('G531C','P531',1125000,'AVAILABLE'),('G531D','P531',1125000,'AVAILABLE'),
('G532A','P532',1125000,'RESERVED'), ('G532B','P532',1125000,'RESERVED'), ('G532C','P532',1125000,'AVAILABLE'),('G532D','P532',1125000,'AVAILABLE'),
('G541A','P541',867000, 'AVAILABLE'),('G541B','P541',867000, 'AVAILABLE'),('G541C','P541',867000,'AVAILABLE'),('G541D','P541',867000,'AVAILABLE'),('G541E','P541',867000,'AVAILABLE'),('G541F','P541',867000,'AVAILABLE'),
('G542A','P542',867000, 'OCCUPIED'), ('G542B','P542',867000, 'OCCUPIED'), ('G542C','P542',867000,'OCCUPIED'), ('G542D','P542',867000,'OCCUPIED'), ('G542E','P542',867000,'OCCUPIED'), ('G542F','P542',867000,'OCCUPIED'),
('G551A','P551',867000, 'AVAILABLE'),('G551B','P551',867000, 'AVAILABLE'),('G551C','P551',867000,'AVAILABLE'),('G551D','P551',867000,'AVAILABLE'),('G551E','P551',867000,'AVAILABLE'),('G551F','P551',867000,'AVAILABLE');

-- =============================================================
-- 4. KHACH_HANG  (thêm 95 → tổng = 100)
-- =============================================================
INSERT INTO KHACH_HANG (MaKH, HoTen, GioiTinh, QuocTich, GiayToTuyThan, SDT, Email, NgaySinh, DiaChi) VALUES
('KH006','Vũ Thị Phương',       'Nữ', 'Việt Nam',  '038111000006','0906000006','vuphuong@gmail.com',     '1999-02-14','15 Phan Đình Phùng, Phú Nhuận'),
('KH007','Đặng Minh Tuấn',      'Nam','Việt Nam',  '038111000007','0907000007','dangminhtuan@gmail.com', '1998-06-25','20 Lý Thường Kiệt, Q10'),
('KH008','Bùi Thị Lan',         'Nữ', 'Việt Nam',  '038111000008','0908000008','builanhoa@gmail.com',    '2000-11-03','5 Bùi Thị Xuân, Q1'),
('KH009','Trịnh Văn Hải',       'Nam','Việt Nam',  '038111000009','0909000009','trinhvanhai@gmail.com',  '1997-04-18','30 Đinh Bộ Lĩnh, BT'),
('KH010','Ngô Thị Thu',         'Nữ', 'Việt Nam',  '038111000010','0910000010','ngothithu@gmail.com',    '2001-08-07','88 CMT8, Q3'),
('KH011','Lương Văn Đức',       'Nam','Việt Nam',  '038111000011','0911000011','luongvanduc@gmail.com',  '1996-12-30','12 Kỳ Đồng, Q3'),
('KH012','Hồ Thị Mai',          'Nữ', 'Việt Nam',  '038111000012','0912000012','hothimai@gmail.com',     '2000-03-21','7 Trần Quang Khải, Q1'),
('KH013','Phan Văn Long',       'Nam','Việt Nam',  '038111000013','0913000013','phanvanlong@gmail.com',  '1999-07-15','45 Nguyễn Bỉnh Khiêm, Q1'),
('KH014','Cao Thị Hương',       'Nữ', 'Việt Nam',  '038111000014','0914000014','caohthhuong@gmail.com',  '1998-05-09','22 Phan Xích Long, PN'),
('KH015','Đinh Văn Nam',        'Nam','Việt Nam',  '038111000015','0915000015','dinhvannam@gmail.com',   '2001-01-28','56 Nguyễn Thái Bình, Q1'),
('KH016','Lê Thị Hằng',         'Nữ', 'Việt Nam',  '038111000016','0916000016','lethihang@gmail.com',   '1997-09-11','10 Ngô Đức Kế, Q1'),
('KH017','Nguyễn Văn Bình',     'Nam','Việt Nam',  '038111000017','0917000017','nguyenvanbinh@gmail.com','2000-04-05','33 Trần Hưng Đạo, Q5'),
('KH018','Trần Thị Cúc',        'Nữ', 'Việt Nam',  '038111000018','0918000018','tranthicuc@gmail.com',   '1999-10-17','77 Điện Biên Phủ, BT'),
('KH019','Phạm Văn Tùng',       'Nam','Việt Nam',  '038111000019','0919000019','phamvantung@gmail.com',  '1998-08-22','19 Bà Huyện Thanh Quan, Q3'),
('KH020','Hoàng Thị Nga',       'Nữ', 'Việt Nam',  '038111000020','0920000020','hoangthinga@gmail.com',  '2001-06-14','60 Sư Vạn Hạnh, Q10'),
('KH021','Đỗ Văn Kiên',         'Nam','Việt Nam',  '038111000021','0921000021','dovankien@gmail.com',    '1997-02-03','8 Nguyễn Thị Minh Khai, Q1'),
('KH022','Võ Thị Yến',          'Nữ', 'Việt Nam',  '038111000022','0922000022','vothiyen@gmail.com',     '2000-12-25','14 Lê Văn Sỹ, Q3'),
('KH023','Tạ Văn Hùng',         'Nam','Việt Nam',  '038111000023','0923000023','tavanhung@gmail.com',    '1996-07-08','25 Nguyễn Đình Chiểu, Q3'),
('KH024','Mai Thị Loan',        'Nữ', 'Việt Nam',  '038111000024','0924000024','maithiloan@gmail.com',   '1999-05-19','3 Hoàng Diệu, Q4'),
('KH025','Chu Văn Thắng',       'Nam','Việt Nam',  '038111000025','0925000025','chuvanThang@gmail.com',  '2001-11-30','71 Lê Duẩn, Q1'),
('KH026','Lưu Thị Hạnh',        'Nữ', 'Việt Nam',  '038111000026','0926000026','luuthihanh@gmail.com',   '1998-03-07','40 Nguyễn Chí Thanh, Q5'),
('KH027','Mạc Văn Hiếu',        'Nam','Việt Nam',  '038111000027','0927000027','macvanhieu@gmail.com',   '1997-01-15','55 Tô Hiến Thành, Q10'),
('KH028','Trương Thị Liên',     'Nữ', 'Việt Nam',  '038111000028','0928000028','truongthilien@gmail.com','2000-07-28','16 Bạch Đằng, Tân Bình'),
('KH029','Lý Văn Quân',         'Nam','Việt Nam',  '038111000029','0929000029','lyvanquan@gmail.com',    '1999-09-04','9 Phan Chu Trinh, Q1'),
('KH030','Dương Thị Thảo',      'Nữ', 'Việt Nam',  '038111000030','0930000030','duongthithao@gmail.com', '2001-03-16','28 Cống Quỳnh, Q1'),
('KH031','Khổng Văn Tài',       'Nam','Việt Nam',  '038111000031','0931000031','khongvantai@gmail.com',  '1996-11-02','62 Ngô Thời Nhiệm, Q3'),
('KH032','Tôn Thị Hà',          'Nữ', 'Việt Nam',  '038111000032','0932000032','tonthiha@gmail.com',     '2000-08-23','11 Hai Bà Trưng, Q1'),
('KH033','Ông Văn Phú',         'Nam','Việt Nam',  '038111000033','0933000033','ongvanphu@gmail.com',    '1998-04-12','37 Lê Lợi, Q1'),
('KH034','Từ Thị Nguyệt',       'Nữ', 'Việt Nam',  '038111000034','0934000034','tuthinguyet@gmail.com',  '1999-06-27','83 Bùi Viện, Q1'),
('KH035','Thái Văn Dũng',       'Nam','Việt Nam',  '038111000035','0935000035','thaivandung@gmail.com',  '1997-10-09','47 Trần Phú, Q5'),
('KH036','Giáp Thị Nhung',      'Nữ', 'Việt Nam',  '038111000036','0936000036','giapthinung@gmail.com',  '2001-02-18','19 Hồ Xuân Hương, Q3'),
('KH037','Vương Văn Đạt',       'Nam','Việt Nam',  '038111000037','0937000037','vuongvandat@gmail.com',  '2000-05-31','66 Nguyễn Thị Nhỏ, Q11'),
('KH038','Bành Thị Lan',        'Nữ', 'Việt Nam',  '038111000038','0938000038','banthilan@gmail.com',    '1998-09-14','72 Phạm Viết Chánh, BT'),
('KH039','Cù Văn Minh',         'Nam','Việt Nam',  '038111000039','0939000039','cuvanminh@gmail.com',    '1997-07-21','34 Trần Quốc Thảo, Q3'),
('KH040','Liêu Thị Trà',        'Nữ', 'Việt Nam',  '038111000040','0940000040','lieuthitra@gmail.com',   '2000-01-06','5 Yên Thế, Tân Bình'),
('KH041','Thạch Văn Hòa',       'Nam','Việt Nam',  '038111000041','0941000041','thachvanhoa@gmail.com',  '1999-11-25','48 Hoàng Sa, Q1'),
('KH042','Sơn Thị Bích',        'Nữ', 'Việt Nam',  '038111000042','0942000042','sonthibich@gmail.com',   '2001-04-08','21 Trần Não, Q2'),
('KH043','Huỳnh Văn Khoa',      'Nam','Việt Nam',  '038111000043','0943000043','huynhvankhoa@gmail.com', '1996-08-17','99 Đinh Tiên Hoàng, Q1'),
('KH044','La Thị Kim',          'Nữ', 'Việt Nam',  '038111000044','0944000044','lathikim@gmail.com',     '2000-06-02','26 Võ Văn Tần, Q3'),
('KH045','Dư Văn Phong',        'Nam','Việt Nam',  '038111000045','0945000045','duvanphong@gmail.com',   '1998-12-11','13 Mạc Đĩnh Chi, Q1'),
('KH046','Tiêu Thị Linh',       'Nữ', 'Việt Nam',  '038111000046','0946000046','tiealthiLinh@gmail.com', '1999-03-29','58 Nguyễn Đình Khơi, TB'),
('KH047','Khưu Văn Hậu',        'Nam','Việt Nam',  '038111000047','0947000047','khuuvanhau@gmail.com',   '1997-05-06','44 Cách Mạng Tháng 8, Q3'),
('KH048','Nguyễn Thị Phúc',     'Nữ', 'Việt Nam',  '038111000048','0948000048','nguyenthiphuc@gmail.com','2001-07-19','30 Đồng Khởi, Q1'),
('KH049','Đoàn Văn Lợi',        'Nam','Việt Nam',  '038111000049','0949000049','doanvanloi@gmail.com',   '2000-09-13','17 Lê Quý Đôn, Q3'),
('KH050','Châu Thị Thanh',      'Nữ', 'Việt Nam',  '038111000050','0950000050','chauthithanh@gmail.com', '1998-01-24','82 Pasteur, Q1'),
-- 51–70: sinh viên nước ngoài (đa dạng quốc tịch)
('KH051','Zhang Wei',            'Nam','Trung Quốc','X90100000051', '0951000051','zhangwei@qq.com',        '1999-04-15','—'),
('KH052','Li Na',                'Nữ', 'Trung Quốc','X90100000052', '0952000052','lina@qq.com',            '2000-08-20','—'),
('KH053','Tanaka Hiroshi',       'Nam','Nhật Bản',  'JP10000000053','0953000053','tanaka@gmail.com',       '1998-02-28','—'),
('KH054','Yamamoto Yuki',        'Nữ', 'Nhật Bản',  'JP10000000054','0954000054','yamamoto@gmail.com',    '2001-11-05','—'),
('KH055','Kim Min-jun',          'Nam','Hàn Quốc',  'KR10000000055','0955000055','kimmin@naver.com',       '1997-06-17','—'),
('KH056','Park Ji-yeon',         'Nữ', 'Hàn Quốc',  'KR10000000056','0956000056','parkjy@naver.com',      '2000-10-09','—'),
('KH057','Nguyen Van Kiet',      'Nam','Việt Nam',  '038111000057','0957000057','kietnv@gmail.com',       '1999-07-22','Hà Nội'),
('KH058','Le Thi Bao Tran',      'Nữ', 'Việt Nam',  '038111000058','0958000058','tranltb@gmail.com',      '2001-03-14','Đà Nẵng'),
('KH059','Pham Van Nghia',       'Nam','Việt Nam',  '038111000059','0959000059','nghiapv@gmail.com',      '1998-09-30','Cần Thơ'),
('KH060','Tran Thi Quynh',       'Nữ', 'Việt Nam',  '038111000060','0960000060','quynhtt@gmail.com',      '2000-05-26','Hải Phòng'),
('KH061','Hoang Van Phuc',       'Nam','Việt Nam',  '038111000061','0961000061','phuchv@gmail.com',       '1997-12-08','Huế'),
('KH062','Do Thi Ngoc',          'Nữ', 'Việt Nam',  '038111000062','0962000062','ngocdt@gmail.com',       '2001-01-19','Nha Trang'),
('KH063','Vo Van Tai',           'Nam','Việt Nam',  '038111000063','0963000063','taivv@gmail.com',        '1999-08-04','Bình Dương'),
('KH064','Bui Thi Kim Anh',      'Nữ', 'Việt Nam',  '038111000064','0964000064','kimanhbtk@gmail.com',   '2000-02-11','Đồng Nai'),
('KH065','Dang Van Vinh',        'Nam','Việt Nam',  '038111000065','0965000065','vinhdv@gmail.com',       '1998-06-29','Vũng Tàu'),
('KH066','Nguyen Thi Kieu',      'Nữ', 'Việt Nam',  '038111000066','0966000066','kieunt@gmail.com',       '2001-04-03','Long An'),
('KH067','Tran Van Lam',         'Nam','Việt Nam',  '038111000067','0967000067','lamtv@gmail.com',        '1996-10-21','Tiền Giang'),
('KH068','Le Van Cuong',         'Nam','Việt Nam',  '038111000068','0968000068','cuonglv@gmail.com',      '1999-09-16','Bến Tre'),
('KH069','Pham Thi Diem',        'Nữ', 'Việt Nam',  '038111000069','0969000069','diempt@gmail.com',       '2000-07-07','Sóc Trăng'),
('KH070','Hoang Thi Bich Ngoc',  'Nữ', 'Việt Nam',  '038111000070','0970000070','ngochbt@gmail.com',      '1998-11-13','Kiên Giang'),
-- 71–100: hỗn hợp thêm
('KH071','Đào Văn Trọng',        'Nam','Việt Nam',  '038111000071','0971000071','trongdv@gmail.com',      '1997-03-27','TP.HCM'),
('KH072','Nhữ Thị Thủy',         'Nữ', 'Việt Nam',  '038111000072','0972000072','thuynt@gmail.com',       '2000-06-18','TP.HCM'),
('KH073','Quách Văn Hải',        'Nam','Việt Nam',  '038111000073','0973000073','haiqv@gmail.com',        '1999-02-05','TP.HCM'),
('KH074','Uông Thị Nhi',         'Nữ', 'Việt Nam',  '038111000074','0974000074','nhiut@gmail.com',        '2001-05-14','TP.HCM'),
('KH075','Yên Văn Tâm',          'Nam','Việt Nam',  '038111000075','0975000075','tamyv@gmail.com',        '1998-08-31','TP.HCM'),
('KH076','Điền Thị Ánh',         'Nữ', 'Việt Nam',  '038111000076','0976000076','anhdt@gmail.com',        '2000-01-22','TP.HCM'),
('KH077','Khuất Văn Lộc',        'Nam','Việt Nam',  '038111000077','0977000077','lockv@gmail.com',        '1997-07-09','TP.HCM'),
('KH078','Ích Thị Hiền',         'Nữ', 'Việt Nam',  '038111000078','0978000078','hien78@gmail.com',       '2001-10-26','TP.HCM'),
('KH079','Tào Văn Cảnh',         'Nam','Việt Nam',  '038111000079','0979000079','canhTv@gmail.com',       '1996-04-03','TP.HCM'),
('KH080','Ân Thị Giang',         'Nữ', 'Việt Nam',  '038111000080','0980000080','giangat@gmail.com',      '2000-09-19','TP.HCM'),
('KH081','Biện Văn Sơn',         'Nam','Việt Nam',  '038111000081','0981000081','sonbv@gmail.com',        '1999-12-12','TP.HCM'),
('KH082','Cảnh Thị Nhàn',        'Nữ', 'Việt Nam',  '038111000082','0982000082','nhanct@gmail.com',       '2001-08-05','TP.HCM'),
('KH083','Đặc Văn Hưng',         'Nam','Việt Nam',  '038111000083','0983000083','hungdv83@gmail.com',     '1997-06-28','TP.HCM'),
('KH084','Ế Thị Phượng',         'Nữ', 'Việt Nam',  '038111000084','0984000084','phuonget@gmail.com',     '2000-03-09','TP.HCM'),
('KH085','Giang Văn Tín',        'Nam','Việt Nam',  '038111000085','0985000085','tingv@gmail.com',        '1998-07-16','TP.HCM'),
('KH086','Hứa Thị Mỹ Linh',      'Nữ', 'Việt Nam',  '038111000086','0986000086','linhhtm@gmail.com',      '2001-02-23','TP.HCM'),
('KH087','Ích Văn Dương',         'Nam','Việt Nam',  '038111000087','0987000087','duongiv@gmail.com',      '1997-11-07','TP.HCM'),
('KH088','Kiều Thị Phương Anh',   'Nữ', 'Việt Nam',  '038111000088','0988000088','anhktp@gmail.com',       '2000-04-30','TP.HCM'),
('KH089','Linh Văn Kha',          'Nam','Việt Nam',  '038111000089','0989000089','khalv@gmail.com',        '1999-08-13','TP.HCM'),
('KH090','Mẫn Thị Hoa',           'Nữ', 'Việt Nam',  '038111000090','0990000090','hoamt@gmail.com',        '1998-01-01','TP.HCM'),
('KH091','Nhan Văn Long',          'Nam','Việt Nam',  '038111000091','0991000091','longnv91@gmail.com',    '2001-06-06','TP.HCM'),
('KH092','Oanh Thị Thu',           'Nữ', 'Việt Nam',  '038111000092','0992000092','thuot@gmail.com',       '1997-09-24','TP.HCM'),
('KH093','Phe Văn Hiệp',           'Nam','Việt Nam',  '038111000093','0993000093','hieppv@gmail.com',      '2000-11-17','TP.HCM'),
('KH094','Quế Thị Kim Chi',        'Nữ', 'Việt Nam',  '038111000094','0994000094','chiqtk@gmail.com',      '1999-05-08','TP.HCM'),
('KH095','Rạng Văn Tú',            'Nam','Việt Nam',  '038111000095','0995000095','turv@gmail.com',        '1996-03-15','TP.HCM'),
('KH096','Sáng Thị Vân',           'Nữ', 'Việt Nam',  '038111000096','0996000096','vanst@gmail.com',       '2001-07-29','TP.HCM'),
('KH097','Tước Văn Minh',          'Nam','Việt Nam',  '038111000097','0997000097','minhtv97@gmail.com',    '1998-10-04','TP.HCM'),
('KH098','Uyên Thị Lan',           'Nữ', 'Việt Nam',  '038111000098','0998000098','lanut@gmail.com',       '2000-12-21','TP.HCM'),
('KH099','Vinh Văn Thọ',           'Nam','Việt Nam',  '038111000099','0999000099','thovv@gmail.com',       '1997-04-11','TP.HCM'),
('KH100','Xuyên Thị Ngân',         'Nữ', 'Việt Nam',  '038111000100','0900000100','nganxt@gmail.com',      '2001-09-03','TP.HCM');

-- =============================================================
-- 5. NHAN_VIEN  (thêm 16 → tổng = 20)
-- Password hash '$2a$10$navmmUPXpAw5h/IzDcTRe.TktMaPX/SJ0Hc.FvdeTS2OAkGoiLk7C' = '123456'
-- =============================================================
INSERT INTO NHAN_VIEN (MaNV, MaChiNhanh, TenNV, ChucVu, SDT, Email, MatKhau, NgayVaoLam, IsActive) VALUES
('NV005','CN002','Lê Văn Duy',         'MANAGER',    '0905555555','manager2@homestay.com',    '$2a$10$navmmUPXpAw5h/IzDcTRe.TktMaPX/SJ0Hc.FvdeTS2OAkGoiLk7C','2022-05-01',TRUE),
('NV006','CN002','Trần Thị Tuyết',     'SALE',       '0906666666','sale2@homestay.com',       '$2a$10$navmmUPXpAw5h/IzDcTRe.TktMaPX/SJ0Hc.FvdeTS2OAkGoiLk7C','2023-03-01',TRUE),
('NV007','CN002','Phạm Minh Khoa',     'ACCOUNTANT', '0907777777','acc2@homestay.com',        '$2a$10$navmmUPXpAw5h/IzDcTRe.TktMaPX/SJ0Hc.FvdeTS2OAkGoiLk7C','2022-08-15',TRUE),
('NV008','CN003','Hoàng Thị Lan',      'MANAGER',    '0908888888','manager3@homestay.com',    '$2a$10$navmmUPXpAw5h/IzDcTRe.TktMaPX/SJ0Hc.FvdeTS2OAkGoiLk7C','2023-01-01',TRUE),
('NV009','CN003','Vũ Văn Hùng',        'SALE',       '0909999999','sale3@homestay.com',       '$2a$10$navmmUPXpAw5h/IzDcTRe.TktMaPX/SJ0Hc.FvdeTS2OAkGoiLk7C','2023-04-15',TRUE),
('NV010','CN003','Đặng Thị Thu',       'ACCOUNTANT', '0910101010','acc3@homestay.com',        '$2a$10$navmmUPXpAw5h/IzDcTRe.TktMaPX/SJ0Hc.FvdeTS2OAkGoiLk7C','2023-02-01',TRUE),
('NV011','CN004','Bùi Văn Nam',        'MANAGER',    '0911111111','manager4@homestay.com',    '$2a$10$navmmUPXpAw5h/IzDcTRe.TktMaPX/SJ0Hc.FvdeTS2OAkGoiLk7C','2022-10-01',TRUE),
('NV012','CN004','Trịnh Thị Hoa',      'SALE',       '0912121212','sale4@homestay.com',       '$2a$10$navmmUPXpAw5h/IzDcTRe.TktMaPX/SJ0Hc.FvdeTS2OAkGoiLk7C','2023-05-01',TRUE),
('NV013','CN004','Ngô Văn Tài',        'ACCOUNTANT', '0913131313','acc4@homestay.com',        '$2a$10$navmmUPXpAw5h/IzDcTRe.TktMaPX/SJ0Hc.FvdeTS2OAkGoiLk7C','2023-01-15',TRUE),
('NV014','CN005','Lý Thị Nhung',       'MANAGER',    '0914141414','manager5@homestay.com',    '$2a$10$navmmUPXpAw5h/IzDcTRe.TktMaPX/SJ0Hc.FvdeTS2OAkGoiLk7C','2023-02-15',TRUE),
('NV015','CN005','Dương Văn Sơn',      'SALE',       '0915151515','sale5@homestay.com',       '$2a$10$navmmUPXpAw5h/IzDcTRe.TktMaPX/SJ0Hc.FvdeTS2OAkGoiLk7C','2023-06-01',TRUE),
('NV016','CN005','Đinh Thị Hà',        'ACCOUNTANT', '0916161616','acc5@homestay.com',        '$2a$10$navmmUPXpAw5h/IzDcTRe.TktMaPX/SJ0Hc.FvdeTS2OAkGoiLk7C','2023-03-01',TRUE),
('NV017','CN001','Mai Văn Phong',       'SALE',       '0917171717','sale1b@homestay.com',      '$2a$10$navmmUPXpAw5h/IzDcTRe.TktMaPX/SJ0Hc.FvdeTS2OAkGoiLk7C','2023-07-01',TRUE),
('NV018','CN001','Lưu Thị Kiều',       'ACCOUNTANT', '0918181818','acc1b@homestay.com',       '$2a$10$navmmUPXpAw5h/IzDcTRe.TktMaPX/SJ0Hc.FvdeTS2OAkGoiLk7C','2022-11-01',TRUE),
('NV019','CN001','Tạ Văn Sáng',        'SALE',       '0919191919','sale1c@homestay.com',      '$2a$10$navmmUPXpAw5h/IzDcTRe.TktMaPX/SJ0Hc.FvdeTS2OAkGoiLk7C','2024-01-02',TRUE),
('NV020','CN002','Châu Thị Bình',      'ADMIN',      '0920202020','admin2@homestay.com',      '$2a$10$navmmUPXpAw5h/IzDcTRe.TktMaPX/SJ0Hc.FvdeTS2OAkGoiLk7C','2022-02-01',TRUE);

-- =============================================================
-- 6. NHOM  (thêm 29 nhóm → tổng ≥ 30)
-- =============================================================
INSERT INTO NHOM (MaNhom, TenNhom, MaDaiDien, MaHopDong, NgayTao, TrangThai) VALUES
('NHO002','Nhóm Tuấn - Phương',  'KH007',NULL,'2024-02-01 09:00:00','ACTIVE'),
('NHO003','Nhóm Cường - Dung',   'KH003',NULL,'2024-02-05 10:00:00','ACTIVE'),
('NHO004','Nhóm Lan - Hải',      'KH008',NULL,'2024-03-01 08:00:00','ACTIVE'),
('NHO005','Nhóm Thu - Bình',     'KH010',NULL,'2024-03-10 09:30:00','ACTIVE'),
('NHO006','Nhóm Đức - Mai',      'KH011',NULL,'2024-04-01 10:00:00','ACTIVE'),
('NHO007','Nhóm Long - Hương',   'KH013',NULL,'2024-04-15 11:00:00','ACTIVE'),
('NHO008','Nhóm Nam - Hằng',     'KH015',NULL,'2024-05-01 09:00:00','ACTIVE'),
('NHO009','Nhóm Bình - Cúc',     'KH017',NULL,'2024-05-10 10:00:00','ACTIVE'),
('NHO010','Nhóm Tùng - Nga',     'KH019',NULL,'2024-06-01 08:30:00','ACTIVE'),
('NHO011','Nhóm Kiên - Yến',     'KH021',NULL,'2024-06-15 09:00:00','ACTIVE'),
('NHO012','Nhóm Hùng - Loan',    'KH023',NULL,'2024-07-01 10:30:00','ACTIVE'),
('NHO013','Nhóm Thắng - Hạnh',   'KH025',NULL,'2024-07-10 08:00:00','ACTIVE'),
('NHO014','Nhóm Hiếu - Liên',    'KH027',NULL,'2024-08-01 09:00:00','ACTIVE'),
('NHO015','Nhóm Quân - Thảo',    'KH029',NULL,'2024-08-15 10:00:00','ACTIVE'),
('NHO016','Nhóm Tài - Hà',       'KH031',NULL,'2024-09-01 11:00:00','ACTIVE'),
('NHO017','Nhóm Phú - Nguyệt',   'KH033',NULL,'2024-09-10 08:30:00','ACTIVE'),
('NHO018','Nhóm Dũng - Nhung',   'KH035',NULL,'2024-10-01 09:00:00','ACTIVE'),
('NHO019','Nhóm Đạt - Lan',      'KH037',NULL,'2024-10-15 10:00:00','ACTIVE'),
('NHO020','Nhóm Minh - Trà',     'KH039',NULL,'2024-11-01 09:00:00','ACTIVE'),
('NHO021','Nhóm Hòa - Bích',     'KH041',NULL,'2024-11-10 08:00:00','ACTIVE'),
('NHO022','Nhóm Khoa - Kim',     'KH043',NULL,'2024-12-01 10:00:00','ACTIVE'),
('NHO023','Nhóm Phong - Linh',   'KH045',NULL,'2024-12-10 09:30:00','ACTIVE'),
('NHO024','Nhóm Hậu - Phúc',     'KH047',NULL,'2025-01-05 09:00:00','ACTIVE'),
('NHO025','Nhóm Lợi - Thanh',    'KH049',NULL,'2025-01-10 10:00:00','ACTIVE'),
('NHO026','Nhóm Zhang - Li',     'KH051',NULL,'2025-01-15 08:30:00','ACTIVE'),
('NHO027','Nhóm Tanaka - Kim',   'KH053',NULL,'2025-02-01 09:00:00','ACTIVE'),
('NHO028','Nhóm Kiet - Tran',    'KH057',NULL,'2025-02-10 10:00:00','ACTIVE'),
('NHO029','Nhóm Nghia - Quynh',  'KH059',NULL,'2025-02-15 09:00:00','ACTIVE'),
('NHO030','Nhóm Phuc - Ngoc',    'KH061',NULL,'2025-03-01 08:00:00','ACTIVE');

-- THANHVIEN_NHOM (2-3 thành viên mỗi nhóm)
INSERT INTO THANHVIEN_NHOM (MaNhom, MaKH, TrangThai) VALUES
('NHO002','KH007','ACTIVE'),('NHO002','KH006','ACTIVE'),('NHO002','KH008','ACTIVE'),
('NHO003','KH003','ACTIVE'),('NHO003','KH004','ACTIVE'),
('NHO004','KH008','ACTIVE'),('NHO004','KH009','ACTIVE'),('NHO004','KH010','ACTIVE'),
('NHO005','KH010','ACTIVE'),('NHO005','KH011','ACTIVE'),
('NHO006','KH011','ACTIVE'),('NHO006','KH012','ACTIVE'),('NHO006','KH013','ACTIVE'),
('NHO007','KH013','ACTIVE'),('NHO007','KH014','ACTIVE'),
('NHO008','KH015','ACTIVE'),('NHO008','KH016','ACTIVE'),('NHO008','KH017','ACTIVE'),
('NHO009','KH017','ACTIVE'),('NHO009','KH018','ACTIVE'),
('NHO010','KH019','ACTIVE'),('NHO010','KH020','ACTIVE'),('NHO010','KH021','ACTIVE'),
('NHO011','KH021','ACTIVE'),('NHO011','KH022','ACTIVE'),
('NHO012','KH023','ACTIVE'),('NHO012','KH024','ACTIVE'),('NHO012','KH025','ACTIVE'),
('NHO013','KH025','ACTIVE'),('NHO013','KH026','ACTIVE'),
('NHO014','KH027','ACTIVE'),('NHO014','KH028','ACTIVE'),('NHO014','KH029','ACTIVE'),
('NHO015','KH029','ACTIVE'),('NHO015','KH030','ACTIVE'),
('NHO016','KH031','ACTIVE'),('NHO016','KH032','ACTIVE'),('NHO016','KH033','ACTIVE'),
('NHO017','KH033','ACTIVE'),('NHO017','KH034','ACTIVE'),
('NHO018','KH035','ACTIVE'),('NHO018','KH036','ACTIVE'),('NHO018','KH037','ACTIVE'),
('NHO019','KH037','ACTIVE'),('NHO019','KH038','ACTIVE'),
('NHO020','KH039','ACTIVE'),('NHO020','KH040','ACTIVE'),('NHO020','KH041','ACTIVE'),
('NHO021','KH041','ACTIVE'),('NHO021','KH042','ACTIVE'),
('NHO022','KH043','ACTIVE'),('NHO022','KH044','ACTIVE'),('NHO022','KH045','ACTIVE'),
('NHO023','KH045','ACTIVE'),('NHO023','KH046','ACTIVE'),
('NHO024','KH047','ACTIVE'),('NHO024','KH048','ACTIVE'),('NHO024','KH049','ACTIVE'),
('NHO025','KH049','ACTIVE'),('NHO025','KH050','ACTIVE'),
('NHO026','KH051','ACTIVE'),('NHO026','KH052','ACTIVE'),
('NHO027','KH053','ACTIVE'),('NHO027','KH054','ACTIVE'),('NHO027','KH055','ACTIVE'),
('NHO028','KH057','ACTIVE'),('NHO028','KH058','ACTIVE'),
('NHO029','KH059','ACTIVE'),('NHO029','KH060','ACTIVE'),('NHO029','KH061','ACTIVE'),
('NHO030','KH061','ACTIVE'),('NHO030','KH062','ACTIVE');

-- =============================================================
-- 7. LICH_XEM_PHONG  (thêm 98 → tổng = 100)
-- =============================================================
INSERT INTO LICH_XEM_PHONG (MaLich, MaKH, MaPhong, MaNV, NgayXem, GioXem, KetQua, GhiChu, TrangThai) VALUES
('LXP003','KH006','P111','NV003','2024-02-05','09:00:00','INTERESTED',     'Khách muốn thuê tháng 3',     'COMPLETED'),
('LXP004','KH007','P121','NV003','2024-02-08','10:30:00','BOOKED',         'Đặt cọc ngay sau xem',        'COMPLETED'),
('LXP005','KH008','P131','NV006','2024-02-10','14:00:00','NOT_INTERESTED',  'Phòng chưa phù hợp',          'COMPLETED'),
('LXP006','KH009','P141','NV006','2024-02-12','15:00:00','INTERESTED',     'Sẽ quyết định sau 3 ngày',    'COMPLETED'),
('LXP007','KH010','P211','NV006','2024-02-15','09:30:00','BOOKED',         'Khách nhóm 2 người',          'COMPLETED'),
('LXP008','KH011','P221','NV009','2024-02-18','11:00:00','INTERESTED',     'Muốn xem thêm',               'COMPLETED'),
('LXP009','KH012','P321','NV009','2024-02-20','14:30:00','NOT_INTERESTED',  'Giá cao hơn budget',          'COMPLETED'),
('LXP010','KH013','P331','NV009','2024-02-22','10:00:00','BOOKED',         'Đồng ý cọc',                  'COMPLETED'),
('LXP011','KH014','P411','NV012','2024-03-01','09:00:00','INTERESTED',     'Xem thêm tuần sau',           'COMPLETED'),
('LXP012','KH015','P421','NV012','2024-03-03','13:00:00','BOOKED',         'OK',                          'COMPLETED'),
('LXP013','KH016','P431','NV012','2024-03-05','10:30:00','NOT_INTERESTED',  'Xa nơi làm việc',             'COMPLETED'),
('LXP014','KH017','P511','NV015','2024-03-08','14:00:00','BOOKED',         'Cọc ngay',                    'COMPLETED'),
('LXP015','KH018','P521','NV015','2024-03-10','09:30:00','INTERESTED',     'Sẽ trả lời sớm',              'COMPLETED'),
('LXP016','KH019','P531','NV015','2024-03-12','11:00:00','NOT_INTERESTED',  'Thiếu nội thất',              'COMPLETED'),
('LXP017','KH020','P112','NV003','2024-03-15','14:30:00','BOOKED',         'Ưng ý',                       'COMPLETED'),
('LXP018','KH021','P122','NV003','2024-03-18','10:00:00','INTERESTED',     'Xem thêm lần nữa',            'COMPLETED'),
('LXP019','KH022','P132','NV006','2024-03-20','09:00:00','NOT_INTERESTED',  'Không ưng tầng',              'COMPLETED'),
('LXP020','KH023','P142','NV006','2024-03-22','15:00:00','BOOKED',         'Nhóm 6 người',                'COMPLETED'),
('LXP021','KH024','P212','NV006','2024-03-25','11:30:00','INTERESTED',     'Hỏi thêm về giá',             'COMPLETED'),
('LXP022','KH025','P222','NV009','2024-04-01','10:00:00','BOOKED',         'Cọc cuối tuần này',           'COMPLETED'),
('LXP023','KH026','P231','NV009','2024-04-03','09:30:00','NOT_INTERESTED',  'Đổi ý',                       'COMPLETED'),
('LXP024','KH027','P311','NV009','2024-04-05','14:00:00','BOOKED',         'OK, làm hợp đồng',            'COMPLETED'),
('LXP025','KH028','P312','NV012','2024-04-08','11:00:00','INTERESTED',     'Cần thêm thông tin',          'COMPLETED'),
('LXP026','KH029','P322','NV012','2024-04-10','09:00:00','BOOKED',         'Xác nhận thuê',               'COMPLETED'),
('LXP027','KH030','P332','NV012','2024-04-12','14:30:00','NOT_INTERESTED',  'Xa trường học',               'COMPLETED'),
('LXP028','KH031','P342','NV015','2024-04-15','10:30:00','BOOKED',         'Nhóm 6 bạn',                  'COMPLETED'),
('LXP029','KH032','P412','NV015','2024-04-18','09:00:00','INTERESTED',     'Gần cơ quan',                 'COMPLETED'),
('LXP030','KH033','P422','NV015','2024-04-20','14:00:00','BOOKED',         'Thanh toán cọc',              'COMPLETED'),
('LXP031','KH034','P432','NV003','2024-04-22','11:00:00','NOT_INTERESTED',  'Phòng nhỏ quá',               'COMPLETED'),
('LXP032','KH035','P441','NV003','2024-05-01','09:30:00','BOOKED',         'Nhóm 6 người',                'COMPLETED'),
('LXP033','KH036','P512','NV006','2024-05-03','14:00:00','INTERESTED',     'Sẽ liên hệ lại',              'COMPLETED'),
('LXP034','KH037','P522','NV006','2024-05-05','10:00:00','BOOKED',         'Cọc ngay',                    'COMPLETED'),
('LXP035','KH038','P532','NV009','2024-05-08','09:00:00','NOT_INTERESTED',  'Thay đổi kế hoạch',           'COMPLETED'),
('LXP036','KH039','P541','NV009','2024-05-10','15:00:00','BOOKED',         'Nhóm 6 bạn đại học',          'COMPLETED'),
('LXP037','KH040','P542','NV012','2024-05-12','11:30:00','INTERESTED',     'Đang cân nhắc',               'COMPLETED'),
('LXP038','KH041','P551','NV012','2024-05-15','10:00:00','BOOKED',         'View đẹp, đồng ý',            'COMPLETED'),
('LXP039','KH042','P111','NV015','2024-05-18','09:30:00','NOT_INTERESTED',  'Tầng thấp không ưng',         'COMPLETED'),
('LXP040','KH043','P121','NV015','2024-05-20','14:30:00','BOOKED',         'OK',                          'COMPLETED'),
('LXP041','KH044','P131','NV003','2024-05-22','10:00:00','INTERESTED',     'Xem lần 2',                   'COMPLETED'),
('LXP042','KH045','P141','NV003','2024-06-01','09:00:00','BOOKED',         'Thuê cả phòng',               'COMPLETED'),
('LXP043','KH046','P211','NV006','2024-06-03','14:00:00','NOT_INTERESTED',  'Đổi vị trí',                  'COMPLETED'),
('LXP044','KH047','P221','NV006','2024-06-05','11:00:00','BOOKED',         'Nhóm 4 người',                'COMPLETED'),
('LXP045','KH048','P231','NV009','2024-06-08','10:30:00','INTERESTED',     'Cần thêm tuần',               'COMPLETED'),
('LXP046','KH049','P311','NV009','2024-06-10','09:00:00','BOOKED',         'Cọc cuối tháng',              'COMPLETED'),
('LXP047','KH050','P321','NV012','2024-06-12','14:00:00','NOT_INTERESTED',  'Giá vẫn cao',                 'COMPLETED'),
('LXP048','KH051','P331','NV012','2024-06-15','10:00:00','BOOKED',         'Khách nước ngoài OK',         'COMPLETED'),
('LXP049','KH052','P341','NV015','2024-06-18','09:30:00','INTERESTED',     'Cần dịch tài liệu',           'COMPLETED'),
('LXP050','KH053','P411','NV015','2024-06-20','15:00:00','BOOKED',         'Ký hợp đồng tuần tới',        'COMPLETED'),
('LXP051','KH054','P421','NV003','2024-06-22','11:00:00','NOT_INTERESTED',  'Không phù hợp',               'COMPLETED'),
('LXP052','KH055','P431','NV003','2024-07-01','10:00:00','BOOKED',         'Bạn bè giới thiệu',           'COMPLETED'),
('LXP053','KH056','P441','NV006','2024-07-03','09:00:00','INTERESTED',     'Xem thêm',                    'COMPLETED'),
('LXP054','KH057','P511','NV006','2024-07-05','14:30:00','BOOKED',         'Đồng ý thuê',                 'COMPLETED'),
('LXP055','KH058','P521','NV009','2024-07-08','10:30:00','NOT_INTERESTED',  'Xa chỗ học',                  'COMPLETED'),
('LXP056','KH059','P531','NV009','2024-07-10','09:00:00','BOOKED',         'Nhóm 3 bạn',                  'COMPLETED'),
('LXP057','KH060','P541','NV012','2024-07-12','14:00:00','INTERESTED',     'Cân nhắc thêm',               'COMPLETED'),
('LXP058','KH061','P551','NV012','2024-07-15','11:00:00','BOOKED',         'Tầng cao view đẹp',           'COMPLETED'),
('LXP059','KH062','P112','NV015','2024-07-18','10:00:00','NOT_INTERESTED',  'Đã tìm được chỗ khác',        'COMPLETED'),
('LXP060','KH063','P122','NV015','2024-07-20','09:30:00','BOOKED',         'Đặt ngay',                    'COMPLETED'),
('LXP061','KH064','P132','NV003','2024-07-22','14:00:00','INTERESTED',     'Xem lần 3',                   'COMPLETED'),
('LXP062','KH065','P142','NV003','2024-08-01','09:00:00','BOOKED',         'Nhóm 6 bạn',                  'COMPLETED'),
('LXP063','KH066','P212','NV006','2024-08-03','15:00:00','NOT_INTERESTED',  'Không có thang máy',          'COMPLETED'),
('LXP064','KH067','P222','NV006','2024-08-05','10:30:00','BOOKED',         'OK',                          'COMPLETED'),
('LXP065','KH068','P312','NV009','2024-08-08','09:00:00','INTERESTED',     'Sẽ xem thêm',                 'COMPLETED'),
('LXP066','KH069','P322','NV009','2024-08-10','14:00:00','BOOKED',         'Cọc ngay',                    'COMPLETED'),
('LXP067','KH070','P332','NV012','2024-08-12','11:00:00','NOT_INTERESTED',  'Xa bệnh viện nơi thực tập',   'COMPLETED'),
('LXP068','KH071','P342','NV012','2024-08-15','10:00:00','BOOKED',         'OK',                          'COMPLETED'),
('LXP069','KH072','P412','NV015','2024-08-18','09:30:00','INTERESTED',     'Đang hỏi bạn bè',             'COMPLETED'),
('LXP070','KH073','P422','NV015','2024-08-20','14:30:00','BOOKED',         'Ký hợp đồng',                 'COMPLETED'),
('LXP071','KH074','P432','NV003','2024-08-22','10:00:00','NOT_INTERESTED',  'Quá đắt',                     'COMPLETED'),
('LXP072','KH075','P442','NV003','2024-09-01','09:00:00','BOOKED',         'Thuê cả phòng 6G',            'COMPLETED'),
('LXP073','KH076','P512','NV006','2024-09-03','15:00:00','INTERESTED',     'Xem thêm lần nữa',            'COMPLETED'),
('LXP074','KH077','P522','NV006','2024-09-05','11:00:00','BOOKED',         'OK',                          'COMPLETED'),
('LXP075','KH078','P532','NV009','2024-09-08','10:30:00','NOT_INTERESTED',  'Đã thuê nơi khác',            'COMPLETED'),
('LXP076','KH079','P542','NV009','2024-09-10','09:00:00','BOOKED',         'Nhóm 6 người',                'COMPLETED'),
('LXP077','KH080','P551','NV012','2024-09-12','14:00:00','INTERESTED',     'Xem 2 lần',                   'COMPLETED'),
-- Lịch tương lai (PENDING)
('LXP078','KH081','P111','NV003','2025-07-01','10:00:00', NULL,            'Đặt lịch xem',                'PENDING'),
('LXP079','KH082','P211','NV006','2025-07-02','09:30:00', NULL,            'Khách mới',                   'PENDING'),
('LXP080','KH083','P311','NV009','2025-07-03','14:00:00', NULL,            'Qua điện thoại',              'PENDING'),
('LXP081','KH084','P411','NV012','2025-07-04','11:00:00', NULL,            'Sinh viên mới',               'PENDING'),
('LXP082','KH085','P511','NV015','2025-07-05','10:30:00', NULL,            'Năm học mới',                 'PENDING'),
('LXP083','KH086','P121','NV003','2025-07-07','09:00:00', NULL,            'Nhóm 4 người',                'PENDING'),
('LXP084','KH087','P221','NV006','2025-07-08','14:30:00', NULL,            'Khách ngoại quốc',            'PENDING'),
('LXP085','KH088','P321','NV009','2025-07-09','10:00:00', NULL,            'Sinh viên đại học',           'PENDING'),
('LXP086','KH089','P421','NV012','2025-07-10','09:30:00', NULL,            'Tốt nghiệp, muốn thuê',       'PENDING'),
('LXP087','KH090','P521','NV015','2025-07-11','15:00:00', NULL,            'Xem phòng lần đầu',           'PENDING'),
-- Lịch đã hủy (CANCELLED)
('LXP088','KH091','P131','NV003','2024-10-01','10:00:00', NULL,            'Khách hủy đột xuất',          'CANCELLED'),
('LXP089','KH092','P231','NV006','2024-10-05','09:00:00', NULL,            'Không liên lạc được',         'CANCELLED'),
('LXP090','KH093','P331','NV009','2024-10-08','14:00:00', NULL,            'Đổi lịch không xác nhận',     'CANCELLED'),
('LXP091','KH094','P431','NV012','2024-10-10','11:00:00', NULL,            'Hủy vì lý do cá nhân',        'CANCELLED'),
('LXP092','KH095','P531','NV015','2024-10-12','10:30:00', NULL,            'Hủy bệnh',                    'CANCELLED'),
('LXP093','KH096','P141','NV003','2024-10-15','09:00:00', NULL,            'Đã tìm phòng khác',           'CANCELLED'),
('LXP094','KH097','P241','NV006','2024-10-18','14:30:00', NULL,            'Nhân viên bận',               'CANCELLED'),
('LXP095','KH098','P341','NV009','2024-10-20','10:00:00', NULL,            'Khách bận',                   'CANCELLED'),
('LXP096','KH099','P441','NV012','2024-10-22','09:30:00', NULL,            'Hủy giờ chót',                'CANCELLED'),
('LXP097','KH100','P541','NV015','2024-10-25','15:00:00', NULL,            'Không confirm',               'CANCELLED'),
('LXP098','KH006','P122','NV017','2024-11-01','10:00:00','INTERESTED',     'Xem thêm',                    'COMPLETED'),
('LXP099','KH015','P132','NV019','2024-11-05','09:30:00','BOOKED',         'Quyết định cọc',              'COMPLETED'),
('LXP100','KH025','P142','NV017','2024-11-10','14:00:00','NOT_INTERESTED',  'Không phù hợp',               'COMPLETED');

-- =============================================================
-- 8. HOP_DONG_THUE_NHA  (thêm 58 → tổng = 60)
-- =============================================================
INSERT INTO HOP_DONG_THUE_NHA (MaHopDong, MaPhong, MaNhom, NgayBatDau, NgayKetThuc, GiaThue, NoiQuy, TinhTrang, NgayKy, MaNVPhuTrach) VALUES
('HD003','P112','NHO002','2024-03-01','2025-02-28',2600000,'Nội quy chung: yên tĩnh, vệ sinh, không hút thuốc.','ACTIVE','2024-02-20 10:00:00','NV002'),
('HD004','P121','NHO003','2024-03-15','2025-03-14',3200000,'Nội quy chung.','ACTIVE','2024-03-05 09:00:00','NV002'),
('HD005','P131','NHO004','2024-04-01','2025-03-31',4200000,'Nội quy chung.','ACTIVE','2024-03-20 10:00:00','NV005'),
('HD006','P141','NHO005','2024-04-15','2025-04-14',5000000,'Nội quy chung.','ACTIVE','2024-04-05 09:00:00','NV005'),
('HD007','P211','NHO006','2024-05-01','2025-04-30',2800000,'Nội quy chung.','ACTIVE','2024-04-20 10:00:00','NV005'),
('HD008','P221','NHO007','2024-05-15','2025-05-14',3400000,'Nội quy chung.','ACTIVE','2024-05-05 09:00:00','NV008'),
('HD009','P231','NHO008','2024-06-01','2025-05-31',3400000,'Nội quy chung.','ACTIVE','2024-05-20 10:00:00','NV008'),
('HD010','P311','NHO009','2024-06-15','2025-06-14',2500000,'Nội quy chung.','ACTIVE','2024-06-05 09:00:00','NV008'),
('HD011','P321','NHO010','2024-07-01','2025-06-30',3100000,'Nội quy chung.','ACTIVE','2024-06-20 10:00:00','NV011'),
('HD012','P331','NHO011','2024-07-15','2025-07-14',4100000,'Nội quy chung.','ACTIVE','2024-07-05 09:00:00','NV011'),
('HD013','P341','NHO012','2024-08-01','2025-07-31',4900000,'Nội quy chung.','ACTIVE','2024-07-20 10:00:00','NV011'),
('HD014','P411','NHO013','2024-08-15','2025-08-14',2700000,'Nội quy chung.','ACTIVE','2024-08-05 09:00:00','NV014'),
('HD015','P421','NHO014','2024-09-01','2025-08-31',3300000,'Nội quy chung.','ACTIVE','2024-08-20 10:00:00','NV014'),
('HD016','P431','NHO015','2024-09-15','2025-09-14',4300000,'Nội quy chung.','ACTIVE','2024-09-05 09:00:00','NV014'),
('HD017','P441','NHO016','2024-10-01','2025-09-30',5100000,'Nội quy chung.','ACTIVE','2024-09-20 10:00:00','NV002'),
('HD018','P511','NHO017','2024-10-15','2025-10-14',2900000,'Nội quy chung.','ACTIVE','2024-10-05 09:00:00','NV002'),
('HD019','P521','NHO018','2024-11-01','2025-10-31',3500000,'Nội quy chung.','ACTIVE','2024-10-20 10:00:00','NV005'),
('HD020','P531','NHO019','2024-11-15','2025-11-14',4500000,'Nội quy chung.','ACTIVE','2024-11-05 09:00:00','NV005'),
('HD021','P541','NHO020','2024-12-01','2025-11-30',5200000,'Nội quy chung.','ACTIVE','2024-11-20 10:00:00','NV008'),
('HD022','P551','NHO021','2024-12-15','2025-12-14',5200000,'Nội quy chung.','ACTIVE','2024-12-05 09:00:00','NV008'),
-- PENDING_FIRST_PAYMENT
('HD023','P122','NHO022','2025-02-01','2026-01-31',2600000,'Nội quy chung.','PENDING_FIRST_PAYMENT','2025-01-20 10:00:00','NV009'),
('HD024','P212','NHO023','2025-02-15','2026-02-14',2800000,'Nội quy chung.','PENDING_FIRST_PAYMENT','2025-02-05 09:00:00','NV012'),
('HD025','P312','NHO024','2025-03-01','2026-02-28',2500000,'Nội quy chung.','PENDING_FIRST_PAYMENT','2025-02-18 10:00:00','NV015'),
('HD026','P412','NHO025','2025-03-15','2026-03-14',2700000,'Nội quy chung.','PENDING_FIRST_PAYMENT','2025-03-05 09:00:00','NV017'),
('HD027','P512','NHO026','2025-04-01','2026-03-31',2900000,'Nội quy chung.','PENDING_FIRST_PAYMENT','2025-03-20 10:00:00','NV019'),
-- TERMINATED (đã thanh lý)
('HD028','P132','NHO027','2023-07-01','2024-06-30',3200000,'Nội quy chung.','TERMINATED','2023-06-20 10:00:00','NV002'),
('HD029','P222','NHO028','2023-08-01','2024-07-31',3400000,'Nội quy chung.','TERMINATED','2023-07-20 09:00:00','NV005'),
('HD030','P322','NHO029','2023-09-01','2024-08-31',3100000,'Nội quy chung.','TERMINATED','2023-08-20 10:00:00','NV008'),
('HD031','P432','NHO030','2023-10-01','2024-09-30',4300000,'Nội quy chung.','TERMINATED','2023-09-20 09:00:00','NV011'),
-- EXPIRED
('HD032','P142',NULL,'2022-06-01','2023-05-31',5000000,'Nội quy chung.','EXPIRED','2022-05-20 10:00:00','NV002'),
('HD033','P241',NULL,'2022-07-01','2023-06-30',4800000,'Nội quy chung.','EXPIRED','2022-06-20 09:00:00','NV005'),
('HD034','P342',NULL,'2022-08-01','2023-07-31',4900000,'Nội quy chung.','EXPIRED','2022-07-20 10:00:00','NV008'),
('HD035','P442',NULL,'2022-09-01','2023-08-31',5100000,'Nội quy chung.','EXPIRED','2022-08-20 09:00:00','NV011'),
('HD036','P542',NULL,'2022-10-01','2023-09-30',5200000,'Nội quy chung.','EXPIRED','2022-09-20 10:00:00','NV014'),
-- CANCELLED
('HD037','P522',NULL,'2025-05-01','2026-04-30',3500000,'Nội quy chung.','CANCELLED','2025-04-20 10:00:00','NV015'),
-- Thêm ACTIVE để đủ dữ liệu bàn giao / trả phòng
('HD038','P532','NHO002','2024-01-10','2025-01-09',4500000,'Nội quy chung.','ACTIVE','2024-01-01 10:00:00','NV002'),
('HD039','P112','NHO003','2023-03-01','2024-02-29',2600000,'Nội quy chung.','TERMINATED','2023-02-20 10:00:00','NV003'),
('HD040','P201',NULL,'2024-03-01','2025-02-28',3500000,'Nội quy chung.','ACTIVE','2024-02-20 09:00:00','NV002'),
('HD041','P202',NULL,'2024-04-01','2025-03-31',4000000,'Nội quy chung.','ACTIVE','2024-03-20 10:00:00','NV003'),
('HD042','P401',NULL,'2024-05-01','2025-04-30',2800000,'Nội quy chung.','ACTIVE','2024-04-20 09:00:00','NV006'),
('HD043','P402',NULL,'2024-06-01','2025-05-31',3200000,'Nội quy chung.','ACTIVE','2024-05-20 10:00:00','NV006'),
('HD044','P111',NULL,'2025-01-01','2025-12-31',2600000,'Nội quy chung.','PENDING_FIRST_PAYMENT','2024-12-20 10:00:00','NV017'),
('HD045','P112',NULL,'2025-02-01','2025-12-31',2600000,'Nội quy chung.','PENDING_FIRST_PAYMENT','2025-01-20 09:00:00','NV019'),
-- Thêm ACTIVE dùng cho TRA_PHONG
('HD046','P211',NULL,'2023-01-01','2024-12-31',2800000,'Nội quy chung.','TERMINATED','2022-12-20 10:00:00','NV005'),
('HD047','P212',NULL,'2023-02-01','2024-01-31',2800000,'Nội quy chung.','TERMINATED','2023-01-20 09:00:00','NV006'),
('HD048','P221',NULL,'2023-03-01','2024-02-29',3400000,'Nội quy chung.','TERMINATED','2023-02-20 10:00:00','NV008'),
('HD049','P222',NULL,'2023-04-01','2024-03-31',3400000,'Nội quy chung.','TERMINATED','2023-03-20 09:00:00','NV009'),
('HD050','P231',NULL,'2023-05-01','2024-04-30',3400000,'Nội quy chung.','TERMINATED','2023-04-20 10:00:00','NV011'),
('HD051','P241',NULL,'2023-06-01','2024-05-31',4800000,'Nội quy chung.','TERMINATED','2023-05-20 09:00:00','NV012'),
('HD052','P311',NULL,'2023-07-01','2024-06-30',2500000,'Nội quy chung.','TERMINATED','2023-06-20 10:00:00','NV014'),
('HD053','P312',NULL,'2023-08-01','2024-07-31',2500000,'Nội quy chung.','TERMINATED','2023-07-20 09:00:00','NV015'),
('HD054','P321',NULL,'2023-09-01','2024-08-31',3100000,'Nội quy chung.','TERMINATED','2023-08-20 10:00:00','NV017'),
('HD055','P322',NULL,'2023-10-01','2024-09-30',3100000,'Nội quy chung.','TERMINATED','2023-09-20 09:00:00','NV019'),
('HD056','P331',NULL,'2023-11-01','2024-10-31',4100000,'Nội quy chung.','TERMINATED','2023-10-20 10:00:00','NV002'),
('HD057','P332',NULL,'2023-12-01','2024-11-30',4100000,'Nội quy chung.','TERMINATED','2023-11-20 09:00:00','NV003'),
('HD058','P341',NULL,'2024-01-01','2024-12-31',4900000,'Nội quy chung.','TERMINATED','2023-12-20 10:00:00','NV005'),
('HD059','P342',NULL,'2024-02-01','2025-01-31',4900000,'Nội quy chung.','ACTIVE','2024-01-20 09:00:00','NV006'),
('HD060','P401',NULL,'2024-03-01','2025-02-28',2800000,'Nội quy chung.','ACTIVE','2024-02-20 10:00:00','NV008');

-- Update NHOM.MaHopDong
UPDATE NHOM SET MaHopDong='HD003' WHERE MaNhom='NHO002';
UPDATE NHOM SET MaHopDong='HD004' WHERE MaNhom='NHO003';
UPDATE NHOM SET MaHopDong='HD005' WHERE MaNhom='NHO004';
UPDATE NHOM SET MaHopDong='HD006' WHERE MaNhom='NHO005';
UPDATE NHOM SET MaHopDong='HD007' WHERE MaNhom='NHO006';
UPDATE NHOM SET MaHopDong='HD008' WHERE MaNhom='NHO007';
UPDATE NHOM SET MaHopDong='HD009' WHERE MaNhom='NHO008';
UPDATE NHOM SET MaHopDong='HD010' WHERE MaNhom='NHO009';
UPDATE NHOM SET MaHopDong='HD011' WHERE MaNhom='NHO010';
UPDATE NHOM SET MaHopDong='HD012' WHERE MaNhom='NHO011';
UPDATE NHOM SET MaHopDong='HD013' WHERE MaNhom='NHO012';
UPDATE NHOM SET MaHopDong='HD014' WHERE MaNhom='NHO013';
UPDATE NHOM SET MaHopDong='HD015' WHERE MaNhom='NHO014';
UPDATE NHOM SET MaHopDong='HD016' WHERE MaNhom='NHO015';
UPDATE NHOM SET MaHopDong='HD017' WHERE MaNhom='NHO016';
UPDATE NHOM SET MaHopDong='HD018' WHERE MaNhom='NHO017';
UPDATE NHOM SET MaHopDong='HD019' WHERE MaNhom='NHO018';
UPDATE NHOM SET MaHopDong='HD020' WHERE MaNhom='NHO019';
UPDATE NHOM SET MaHopDong='HD021' WHERE MaNhom='NHO020';
UPDATE NHOM SET MaHopDong='HD022' WHERE MaNhom='NHO021';
UPDATE NHOM SET MaHopDong='HD023' WHERE MaNhom='NHO022';
UPDATE NHOM SET MaHopDong='HD024' WHERE MaNhom='NHO023';
UPDATE NHOM SET MaHopDong='HD025' WHERE MaNhom='NHO024';
UPDATE NHOM SET MaHopDong='HD026' WHERE MaNhom='NHO025';
UPDATE NHOM SET MaHopDong='HD027' WHERE MaNhom='NHO026';
UPDATE NHOM SET MaHopDong='HD028' WHERE MaNhom='NHO027';
UPDATE NHOM SET MaHopDong='HD029' WHERE MaNhom='NHO028';
UPDATE NHOM SET MaHopDong='HD030' WHERE MaNhom='NHO029';
UPDATE NHOM SET MaHopDong='HD031' WHERE MaNhom='NHO030';

-- =============================================================
-- 9. DAT_COC  (thêm 78 → tổng = 80)
-- Trước HĐ ~1 tháng; đa dạng trạng thái
-- =============================================================
INSERT INTO DAT_COC (MaCoc, MaHopDong, MaKH, MaPhong, MaGiuong, NguoiPheDuyet, NgayDatCoc, SoTienCoc, PhuongThucThanhToan, TinhTrang, ThoiGianHetHan, ThoiGianPheDuyet, GhiChu) VALUES
('COC003','HD003','KH007','P112',NULL,'NV002','2024-02-10 09:00:00',2600000,'BANK_TRANSFER','APPROVED','2024-02-17 09:00:00','2024-02-11 08:00:00','Cọc hợp đồng HD003'),
('COC004','HD004','KH003','P121',NULL,'NV002','2024-02-25 10:00:00',3200000,'BANK_TRANSFER','APPROVED','2024-03-04 10:00:00','2024-02-26 09:00:00','Cọc hợp đồng HD004'),
('COC005','HD005','KH008','P131',NULL,'NV005','2024-03-10 09:00:00',4200000,'CASH',         'APPROVED','2024-03-17 09:00:00','2024-03-11 08:00:00','Cọc hợp đồng HD005'),
('COC006','HD006','KH010','P141',NULL,'NV005','2024-03-25 10:00:00',5000000,'BANK_TRANSFER','APPROVED','2024-04-01 10:00:00','2024-03-26 09:00:00','Cọc hợp đồng HD006'),
('COC007','HD007','KH011','P211',NULL,'NV005','2024-04-10 09:00:00',2800000,'CASH',         'APPROVED','2024-04-17 09:00:00','2024-04-11 08:00:00','Cọc hợp đồng HD007'),
('COC008','HD008','KH013','P221',NULL,'NV007','2024-04-25 10:00:00',3400000,'BANK_TRANSFER','APPROVED','2024-05-02 10:00:00','2024-04-26 09:00:00','Cọc hợp đồng HD008'),
('COC009','HD009','KH015','P231',NULL,'NV007','2024-05-10 09:00:00',3400000,'CASH',         'APPROVED','2024-05-17 09:00:00','2024-05-11 08:00:00','Cọc hợp đồng HD009'),
('COC010','HD010','KH017','P311',NULL,'NV010','2024-05-25 10:00:00',2500000,'BANK_TRANSFER','APPROVED','2024-06-01 10:00:00','2024-05-26 09:00:00','Cọc hợp đồng HD010'),
('COC011','HD011','KH019','P321',NULL,'NV010','2024-06-10 09:00:00',3100000,'CASH',         'APPROVED','2024-06-17 09:00:00','2024-06-11 08:00:00','Cọc hợp đồng HD011'),
('COC012','HD012','KH021','P331',NULL,'NV010','2024-06-25 10:00:00',4100000,'BANK_TRANSFER','APPROVED','2024-07-02 10:00:00','2024-06-26 09:00:00','Cọc hợp đồng HD012'),
('COC013','HD013','KH023','P341',NULL,'NV013','2024-07-10 09:00:00',4900000,'CASH',         'APPROVED','2024-07-17 09:00:00','2024-07-11 08:00:00','Cọc hợp đồng HD013'),
('COC014','HD014','KH025','P411',NULL,'NV013','2024-07-25 10:00:00',2700000,'BANK_TRANSFER','APPROVED','2024-08-01 10:00:00','2024-07-26 09:00:00','Cọc hợp đồng HD014'),
('COC015','HD015','KH027','P421',NULL,'NV013','2024-08-10 09:00:00',3300000,'CASH',         'APPROVED','2024-08-17 09:00:00','2024-08-11 08:00:00','Cọc hợp đồng HD015'),
('COC016','HD016','KH029','P431',NULL,'NV016','2024-08-25 10:00:00',4300000,'BANK_TRANSFER','APPROVED','2024-09-01 10:00:00','2024-08-26 09:00:00','Cọc hợp đồng HD016'),
('COC017','HD017','KH031','P441',NULL,'NV016','2024-09-10 09:00:00',5100000,'CASH',         'APPROVED','2024-09-17 09:00:00','2024-09-11 08:00:00','Cọc hợp đồng HD017'),
('COC018','HD018','KH033','P511',NULL,'NV016','2024-09-25 10:00:00',2900000,'BANK_TRANSFER','APPROVED','2024-10-02 10:00:00','2024-09-26 09:00:00','Cọc hợp đồng HD018'),
('COC019','HD019','KH035','P521',NULL,'NV004','2024-10-10 09:00:00',3500000,'CASH',         'APPROVED','2024-10-17 09:00:00','2024-10-11 08:00:00','Cọc hợp đồng HD019'),
('COC020','HD020','KH037','P531',NULL,'NV004','2024-10-25 10:00:00',4500000,'BANK_TRANSFER','APPROVED','2024-11-01 10:00:00','2024-10-26 09:00:00','Cọc hợp đồng HD020'),
('COC021','HD021','KH039','P541',NULL,'NV007','2024-11-10 09:00:00',5200000,'CASH',         'APPROVED','2024-11-17 09:00:00','2024-11-11 08:00:00','Cọc hợp đồng HD021'),
('COC022','HD022','KH041','P551',NULL,'NV007','2024-11-25 10:00:00',5200000,'BANK_TRANSFER','APPROVED','2024-12-02 10:00:00','2024-11-26 09:00:00','Cọc hợp đồng HD022'),
-- PENDING_PAYMENT (HD023–HD027 chưa duyệt)
('COC023','HD023','KH043','P122',NULL,NULL,'2025-01-10 10:00:00',2600000,'BANK_TRANSFER','PENDING_PAYMENT','2025-01-17 10:00:00',NULL,'Chờ thanh toán cọc'),
('COC024','HD024','KH045','P212',NULL,NULL,'2025-01-25 09:00:00',2800000,'CASH',          'PENDING_PAYMENT','2025-02-01 09:00:00',NULL,'Chờ thanh toán cọc'),
('COC025','HD025','KH047','P312',NULL,NULL,'2025-02-08 10:00:00',2500000,'BANK_TRANSFER', 'PENDING_PAYMENT','2025-02-15 10:00:00',NULL,'Chờ thanh toán cọc'),
('COC026','HD026','KH049','P412',NULL,NULL,'2025-02-22 09:00:00',2700000,'CASH',          'PENDING_PAYMENT','2025-03-01 09:00:00',NULL,'Chờ thanh toán cọc'),
('COC027','HD027','KH051','P512',NULL,NULL,'2025-03-08 10:00:00',2900000,'BANK_TRANSFER', 'PENDING_PAYMENT','2025-03-15 10:00:00',NULL,'Chờ thanh toán cọc'),
-- EXPIRED
('COC028',NULL,'KH053','P111',NULL,NULL,'2024-01-05 09:00:00',2600000,'CASH',          'EXPIRED','2024-01-12 09:00:00',NULL,'Quá hạn không thanh toán'),
('COC029',NULL,'KH055','P211',NULL,NULL,'2024-02-03 10:00:00',2800000,'BANK_TRANSFER', 'EXPIRED','2024-02-10 10:00:00',NULL,'Quá hạn'),
('COC030',NULL,'KH057','P311',NULL,NULL,'2024-03-01 09:00:00',2500000,'CASH',          'EXPIRED','2024-03-08 09:00:00',NULL,'Quá hạn'),
('COC031',NULL,'KH059','P411',NULL,NULL,'2024-04-01 10:00:00',2700000,'BANK_TRANSFER', 'EXPIRED','2024-04-08 10:00:00',NULL,'Quá hạn'),
('COC032',NULL,'KH061','P511',NULL,NULL,'2024-05-01 09:00:00',2900000,'CASH',          'EXPIRED','2024-05-08 09:00:00',NULL,'Quá hạn'),
-- CANCELLED
('COC033',NULL,'KH063','P121','G121A',NULL,'2024-06-01 10:00:00',3200000,'BANK_TRANSFER','CANCELLED','2024-06-08 10:00:00',NULL,'Khách hủy'),
('COC034',NULL,'KH065','P321','G321A',NULL,'2024-07-01 09:00:00',3100000,'CASH',         'CANCELLED','2024-07-08 09:00:00',NULL,'Khách hủy'),
('COC035',NULL,'KH067','P421','G421A',NULL,'2024-08-01 10:00:00',3300000,'BANK_TRANSFER','CANCELLED','2024-08-08 10:00:00',NULL,'Khách hủy'),
('COC036',NULL,'KH069','P521','G521A',NULL,'2024-09-01 09:00:00',3500000,'CASH',         'CANCELLED','2024-09-08 09:00:00',NULL,'Khách hủy'),
('COC037',NULL,'KH071','P141','G141A',NULL,'2024-10-01 10:00:00',5000000,'BANK_TRANSFER','CANCELLED','2024-10-08 10:00:00',NULL,'Khách hủy'),
-- Thêm APPROVED cho hợp đồng trước terminated
('COC038','HD028','KH057','P132',NULL,'NV002','2023-06-05 09:00:00',3200000,'BANK_TRANSFER','APPROVED','2023-06-12 09:00:00','2023-06-06 08:00:00','Cọc HD028'),
('COC039','HD029','KH059','P222',NULL,'NV005','2023-07-05 10:00:00',3400000,'CASH',        'APPROVED','2023-07-12 10:00:00','2023-07-06 09:00:00','Cọc HD029'),
('COC040','HD030','KH061','P322',NULL,'NV008','2023-08-05 09:00:00',3100000,'BANK_TRANSFER','APPROVED','2023-08-12 09:00:00','2023-08-06 08:00:00','Cọc HD030'),
('COC041','HD031','KH063','P432',NULL,'NV011','2023-09-05 10:00:00',4300000,'CASH',        'APPROVED','2023-09-12 10:00:00','2023-09-06 09:00:00','Cọc HD031'),
('COC042','HD032','KH065','P142',NULL,'NV002','2022-05-05 09:00:00',5000000,'BANK_TRANSFER','APPROVED','2022-05-12 09:00:00','2022-05-06 08:00:00','Cọc HD032'),
('COC043','HD033','KH067','P241',NULL,'NV005','2022-06-05 10:00:00',4800000,'CASH',        'APPROVED','2022-06-12 10:00:00','2022-06-06 09:00:00','Cọc HD033'),
('COC044','HD034','KH069','P342',NULL,'NV008','2022-07-05 09:00:00',4900000,'BANK_TRANSFER','APPROVED','2022-07-12 09:00:00','2022-07-06 08:00:00','Cọc HD034'),
('COC045','HD035','KH071','P442',NULL,'NV011','2022-08-05 10:00:00',5100000,'CASH',        'APPROVED','2022-08-12 10:00:00','2022-08-06 09:00:00','Cọc HD035'),
('COC046','HD036','KH073','P542',NULL,'NV014','2022-09-05 09:00:00',5200000,'BANK_TRANSFER','APPROVED','2022-09-12 09:00:00','2022-09-06 08:00:00','Cọc HD036'),
('COC047','HD038','KH007','P532',NULL,'NV002','2023-12-20 09:00:00',4500000,'BANK_TRANSFER','APPROVED','2023-12-27 09:00:00','2023-12-21 08:00:00','Cọc HD038'),
('COC048','HD040','KH009','P201',NULL,'NV002','2024-02-05 10:00:00',3500000,'CASH',        'APPROVED','2024-02-12 10:00:00','2024-02-06 09:00:00','Cọc HD040'),
('COC049','HD041','KH011','P202',NULL,'NV003','2024-03-05 09:00:00',4000000,'BANK_TRANSFER','APPROVED','2024-03-12 09:00:00','2024-03-06 08:00:00','Cọc HD041'),
('COC050','HD042','KH013','P401',NULL,'NV006','2024-04-05 10:00:00',2800000,'CASH',        'APPROVED','2024-04-12 10:00:00','2024-04-06 09:00:00','Cọc HD042'),
('COC051','HD043','KH015','P402',NULL,'NV006','2024-05-05 09:00:00',3200000,'BANK_TRANSFER','APPROVED','2024-05-12 09:00:00','2024-05-06 08:00:00','Cọc HD043'),
('COC052','HD059','KH017','P342',NULL,'NV006','2024-01-05 10:00:00',4900000,'CASH',        'APPROVED','2024-01-12 10:00:00','2024-01-06 09:00:00','Cọc HD059'),
('COC053','HD060','KH019','P401',NULL,'NV008','2024-02-05 09:00:00',2800000,'BANK_TRANSFER','APPROVED','2024-02-12 09:00:00','2024-02-06 08:00:00','Cọc HD060'),
-- Thêm một số PENDING_APPROVAL
('COC054',NULL,'KH075','P131','G131A',NULL,'2025-06-01 09:00:00',4200000,'BANK_TRANSFER','PENDING_APPROVAL','2025-06-08 09:00:00',NULL,'Chờ phê duyệt'),
('COC055',NULL,'KH077','P141','G141A',NULL,'2025-06-02 10:00:00',5000000,'CASH',         'PENDING_APPROVAL','2025-06-09 10:00:00',NULL,'Chờ phê duyệt'),
('COC056',NULL,'KH079','P241','G241A',NULL,'2025-06-03 09:00:00',4800000,'BANK_TRANSFER','PENDING_APPROVAL','2025-06-10 09:00:00',NULL,'Chờ phê duyệt'),
-- REJECTED
('COC057',NULL,'KH081','P341','G341A','NV013','2025-05-01 10:00:00',4900000,'CASH','REJECTED','2025-05-08 10:00:00','2025-05-02 09:00:00','Từ chối do khách không đủ điều kiện'),
('COC058',NULL,'KH083','P441','G441A','NV016','2025-05-05 09:00:00',5100000,'BANK_TRANSFER','REJECTED','2025-05-12 09:00:00','2025-05-06 08:00:00','Từ chối'),
-- Thêm APPROVED cho HĐ 44,45
('COC059','HD044','KH085','P111',NULL,'NV018','2024-12-10 10:00:00',2600000,'BANK_TRANSFER','APPROVED','2024-12-17 10:00:00','2024-12-11 09:00:00','Cọc HD044'),
('COC060',NULL,'KH087','P201','G201A',NULL,'2025-06-10 09:00:00',3500000,'CASH','PENDING_PAYMENT','2025-06-17 09:00:00',NULL,'Cọc giường lẻ');

-- =============================================================
-- 10. CHI_TIET_THUE  (thêm ~117 → tổng ≥ 120)
-- =============================================================
INSERT INTO CHI_TIET_THUE (MaHopDong, MaGiuong, MaKH, GiaThueThucTe) VALUES
-- HD003 (P112, 2G)
('HD003','G112A','KH007',1300000),('HD003','G112B','KH006',1300000),
-- HD004 (P121, 4G)
('HD004','G121A','KH003',800000),('HD004','G121B','KH004',800000),('HD004','G121C','KH008',800000),('HD004','G121D','KH009',800000),
-- HD005 (P131, 4G)
('HD005','G131A','KH008',1050000),('HD005','G131B','KH009',1050000),('HD005','G131C','KH010',1050000),('HD005','G131D','KH011',1050000),
-- HD006 (P141, 6G)
('HD006','G141A','KH010',833000),('HD006','G141B','KH011',833000),('HD006','G141C','KH012',833000),('HD006','G141D','KH013',833000),('HD006','G141E','KH014',833000),('HD006','G141F','KH015',833000),
-- HD007 (P211, 2G)
('HD007','G211A','KH011',1400000),('HD007','G211B','KH012',1400000),
-- HD008 (P221, 4G)
('HD008','G221A','KH013',850000),('HD008','G221B','KH014',850000),('HD008','G221C','KH015',850000),('HD008','G221D','KH016',850000),
-- HD009 (P231, 4G)
('HD009','G231A','KH015',850000),('HD009','G231B','KH016',850000),
-- HD010 (P311, 2G)
('HD010','G311A','KH017',1250000),('HD010','G311B','KH018',1250000),
-- HD011 (P321, 4G)
('HD011','G321A','KH019',775000),('HD011','G321B','KH020',775000),('HD011','G321C','KH021',775000),('HD011','G321D','KH022',775000),
-- HD012 (P331, 4G)
('HD012','G331A','KH021',1025000),('HD012','G331B','KH022',1025000),('HD012','G331C','KH023',1025000),('HD012','G331D','KH024',1025000),
-- HD013 (P341, 6G)
('HD013','G341A','KH023',817000),('HD013','G341B','KH024',817000),('HD013','G341C','KH025',817000),('HD013','G341D','KH026',817000),('HD013','G341E','KH027',817000),('HD013','G341F','KH028',817000),
-- HD014 (P411, 2G)
('HD014','G411A','KH025',1350000),('HD014','G411B','KH026',1350000),
-- HD015 (P421, 4G)
('HD015','G421A','KH027',825000),('HD015','G421B','KH028',825000),('HD015','G421C','KH029',825000),('HD015','G421D','KH030',825000),
-- HD016 (P431, 4G)
('HD016','G431A','KH029',1075000),('HD016','G431B','KH030',1075000),
-- HD017 (P441, 6G)
('HD017','G441A','KH031',850000),('HD017','G441B','KH032',850000),('HD017','G441C','KH033',850000),('HD017','G441D','KH034',850000),('HD017','G441E','KH035',850000),('HD017','G441F','KH036',850000),
-- HD018 (P511, 2G)
('HD018','G511A','KH033',1450000),('HD018','G511B','KH034',1450000),
-- HD019 (P521, 4G)
('HD019','G521A','KH035',875000),('HD019','G521B','KH036',875000),('HD019','G521C','KH037',875000),('HD019','G521D','KH038',875000),
-- HD020 (P531, 4G)
('HD020','G531A','KH037',1125000),('HD020','G531B','KH038',1125000),('HD020','G531C','KH039',1125000),('HD020','G531D','KH040',1125000),
-- HD021 (P541, 6G)
('HD021','G541A','KH039',867000),('HD021','G541B','KH040',867000),('HD021','G541C','KH041',867000),('HD021','G541D','KH042',867000),('HD021','G541E','KH043',867000),('HD021','G541F','KH044',867000),
-- HD022 (P551, 6G)
('HD022','G551A','KH041',867000),('HD022','G551B','KH042',867000),('HD022','G551C','KH043',867000),('HD022','G551D','KH044',867000),('HD022','G551E','KH045',867000),('HD022','G551F','KH046',867000),
-- HD040 (P201, 4G)
('HD040','G201A','KH009',875000),('HD040','G201B','KH010',875000),('HD040','G201C','KH011',875000),('HD040','G201D','KH012',875000),
-- HD041 (P202, 6G)
('HD041','G202A','KH011',667000),('HD041','G202B','KH012',667000),('HD041','G202C','KH013',667000),('HD041','G202D','KH014',667000),('HD041','G202E','KH015',667000),('HD041','G202F','KH016',667000),
-- HD059 (P342, 6G)
('HD059','G342A','KH017',817000),('HD059','G342B','KH018',817000),('HD059','G342C','KH019',817000),('HD059','G342D','KH020',817000),('HD059','G342E','KH021',817000),('HD059','G342F','KH022',817000);

-- =============================================================
-- 11. THANH_TOAN  (thêm ~148 → tổng ≥ 150)
-- =============================================================
INSERT INTO THANH_TOAN (MaThanhToan, MaHopDong, MaCoc, SoTien, PhuongThuc, NgayThanhToan, LoaiThanhToan, TinhTrang, GhiChu, MaSoChungTu) VALUES
-- Cọc đã approve (COC003–COC022, COC038–COC053)
('TT003',NULL,'COC003',2600000,'BANK_TRANSFER','2024-02-11 09:30:00','DEPOSIT','COMPLETED','Thanh toán cọc HD003','CT20240211003'),
('TT004',NULL,'COC004',3200000,'BANK_TRANSFER','2024-02-26 10:30:00','DEPOSIT','COMPLETED','Thanh toán cọc HD004','CT20240226004'),
('TT005',NULL,'COC005',4200000,'CASH',         '2024-03-11 09:30:00','DEPOSIT','COMPLETED','Thanh toán cọc HD005','CT20240311005'),
('TT006',NULL,'COC006',5000000,'BANK_TRANSFER','2024-03-26 10:30:00','DEPOSIT','COMPLETED','Thanh toán cọc HD006','CT20240326006'),
('TT007',NULL,'COC007',2800000,'CASH',         '2024-04-11 09:30:00','DEPOSIT','COMPLETED','Thanh toán cọc HD007','CT20240411007'),
('TT008',NULL,'COC008',3400000,'BANK_TRANSFER','2024-04-26 10:30:00','DEPOSIT','COMPLETED','Thanh toán cọc HD008','CT20240426008'),
('TT009',NULL,'COC009',3400000,'CASH',         '2024-05-11 09:30:00','DEPOSIT','COMPLETED','Thanh toán cọc HD009','CT20240511009'),
('TT010',NULL,'COC010',2500000,'BANK_TRANSFER','2024-05-26 10:30:00','DEPOSIT','COMPLETED','Thanh toán cọc HD010','CT20240526010'),
('TT011',NULL,'COC011',3100000,'CASH',         '2024-06-11 09:30:00','DEPOSIT','COMPLETED','Thanh toán cọc HD011','CT20240611011'),
('TT012',NULL,'COC012',4100000,'BANK_TRANSFER','2024-06-26 10:30:00','DEPOSIT','COMPLETED','Thanh toán cọc HD012','CT20240626012'),
('TT013',NULL,'COC013',4900000,'CASH',         '2024-07-11 09:30:00','DEPOSIT','COMPLETED','Thanh toán cọc HD013','CT20240711013'),
('TT014',NULL,'COC014',2700000,'BANK_TRANSFER','2024-07-26 10:30:00','DEPOSIT','COMPLETED','Thanh toán cọc HD014','CT20240726014'),
('TT015',NULL,'COC015',3300000,'CASH',         '2024-08-11 09:30:00','DEPOSIT','COMPLETED','Thanh toán cọc HD015','CT20240811015'),
('TT016',NULL,'COC016',4300000,'BANK_TRANSFER','2024-08-26 10:30:00','DEPOSIT','COMPLETED','Thanh toán cọc HD016','CT20240826016'),
('TT017',NULL,'COC017',5100000,'CASH',         '2024-09-11 09:30:00','DEPOSIT','COMPLETED','Thanh toán cọc HD017','CT20240911017'),
('TT018',NULL,'COC018',2900000,'BANK_TRANSFER','2024-09-26 10:30:00','DEPOSIT','COMPLETED','Thanh toán cọc HD018','CT20240926018'),
('TT019',NULL,'COC019',3500000,'CASH',         '2024-10-11 09:30:00','DEPOSIT','COMPLETED','Thanh toán cọc HD019','CT20241011019'),
('TT020',NULL,'COC020',4500000,'BANK_TRANSFER','2024-10-26 10:30:00','DEPOSIT','COMPLETED','Thanh toán cọc HD020','CT20241026020'),
('TT021',NULL,'COC021',5200000,'CASH',         '2024-11-11 09:30:00','DEPOSIT','COMPLETED','Thanh toán cọc HD021','CT20241111021'),
('TT022',NULL,'COC022',5200000,'BANK_TRANSFER','2024-11-26 10:30:00','DEPOSIT','COMPLETED','Thanh toán cọc HD022','CT20241126022'),
-- Tiền thuê tháng đầu (MONTHLY_RENT) cho hợp đồng ACTIVE
('TT023','HD003',NULL,2600000,'BANK_TRANSFER','2024-03-01 08:00:00','MONTHLY_RENT','COMPLETED','Tháng 3/2024 HD003','CT20240301023'),
('TT024','HD004',NULL,3200000,'BANK_TRANSFER','2024-03-15 08:00:00','MONTHLY_RENT','COMPLETED','Tháng 3/2024 HD004','CT20240315024'),
('TT025','HD005',NULL,4200000,'CASH',         '2024-04-01 08:00:00','MONTHLY_RENT','COMPLETED','Tháng 4/2024 HD005','CT20240401025'),
('TT026','HD006',NULL,5000000,'BANK_TRANSFER','2024-04-15 08:00:00','MONTHLY_RENT','COMPLETED','Tháng 4/2024 HD006','CT20240415026'),
('TT027','HD007',NULL,2800000,'CASH',         '2024-05-01 08:00:00','MONTHLY_RENT','COMPLETED','Tháng 5/2024 HD007','CT20240501027'),
('TT028','HD008',NULL,3400000,'BANK_TRANSFER','2024-05-15 08:00:00','MONTHLY_RENT','COMPLETED','Tháng 5/2024 HD008','CT20240515028'),
('TT029','HD009',NULL,3400000,'CASH',         '2024-06-01 08:00:00','MONTHLY_RENT','COMPLETED','Tháng 6/2024 HD009','CT20240601029'),
('TT030','HD010',NULL,2500000,'BANK_TRANSFER','2024-06-15 08:00:00','MONTHLY_RENT','COMPLETED','Tháng 6/2024 HD010','CT20240615030'),
('TT031','HD011',NULL,3100000,'CASH',         '2024-07-01 08:00:00','MONTHLY_RENT','COMPLETED','Tháng 7/2024 HD011','CT20240701031'),
('TT032','HD012',NULL,4100000,'BANK_TRANSFER','2024-07-15 08:00:00','MONTHLY_RENT','COMPLETED','Tháng 7/2024 HD012','CT20240715032'),
('TT033','HD013',NULL,4900000,'CASH',         '2024-08-01 08:00:00','MONTHLY_RENT','COMPLETED','Tháng 8/2024 HD013','CT20240801033'),
('TT034','HD014',NULL,2700000,'BANK_TRANSFER','2024-08-15 08:00:00','MONTHLY_RENT','COMPLETED','Tháng 8/2024 HD014','CT20240815034'),
('TT035','HD015',NULL,3300000,'CASH',         '2024-09-01 08:00:00','MONTHLY_RENT','COMPLETED','Tháng 9/2024 HD015','CT20240901035'),
('TT036','HD016',NULL,4300000,'BANK_TRANSFER','2024-09-15 08:00:00','MONTHLY_RENT','COMPLETED','Tháng 9/2024 HD016','CT20240915036'),
('TT037','HD017',NULL,5100000,'CASH',         '2024-10-01 08:00:00','MONTHLY_RENT','COMPLETED','Tháng 10/2024 HD017','CT20241001037'),
('TT038','HD018',NULL,2900000,'BANK_TRANSFER','2024-10-15 08:00:00','MONTHLY_RENT','COMPLETED','Tháng 10/2024 HD018','CT20241015038'),
('TT039','HD019',NULL,3500000,'CASH',         '2024-11-01 08:00:00','MONTHLY_RENT','COMPLETED','Tháng 11/2024 HD019','CT20241101039'),
('TT040','HD020',NULL,4500000,'BANK_TRANSFER','2024-11-15 08:00:00','MONTHLY_RENT','COMPLETED','Tháng 11/2024 HD020','CT20241115040'),
('TT041','HD021',NULL,5200000,'CASH',         '2024-12-01 08:00:00','MONTHLY_RENT','COMPLETED','Tháng 12/2024 HD021','CT20241201041'),
('TT042','HD022',NULL,5200000,'BANK_TRANSFER','2024-12-15 08:00:00','MONTHLY_RENT','COMPLETED','Tháng 12/2024 HD022','CT20241215042'),
-- Tiền thuê tháng 2 cho hợp đồng còn active
('TT043','HD003',NULL,2600000,'BANK_TRANSFER','2024-04-01 08:00:00','MONTHLY_RENT','COMPLETED','Tháng 4/2024 HD003','CT20240401043'),
('TT044','HD004',NULL,3200000,'BANK_TRANSFER','2024-04-15 08:00:00','MONTHLY_RENT','COMPLETED','Tháng 4/2024 HD004','CT20240415044'),
('TT045','HD005',NULL,4200000,'CASH',         '2024-05-01 08:00:00','MONTHLY_RENT','COMPLETED','Tháng 5/2024 HD005','CT20240501045'),
('TT046','HD040',NULL,3500000,'BANK_TRANSFER','2024-03-01 08:00:00','MONTHLY_RENT','COMPLETED','Tháng 3/2024 HD040','CT20240301046'),
('TT047','HD041',NULL,4000000,'CASH',         '2024-04-01 08:00:00','MONTHLY_RENT','COMPLETED','Tháng 4/2024 HD041','CT20240401047'),
('TT048','HD042',NULL,2800000,'BANK_TRANSFER','2024-05-01 08:00:00','MONTHLY_RENT','COMPLETED','Tháng 5/2024 HD042','CT20240501048'),
('TT049','HD043',NULL,3200000,'CASH',         '2024-06-01 08:00:00','MONTHLY_RENT','COMPLETED','Tháng 6/2024 HD043','CT20240601049'),
('TT050','HD059',NULL,4900000,'BANK_TRANSFER','2024-02-01 08:00:00','MONTHLY_RENT','COMPLETED','Tháng 2/2024 HD059','CT20240201050'),
-- PENDING
('TT051','HD003',NULL,2600000,'BANK_TRANSFER','2025-06-01 08:00:00','MONTHLY_RENT','PENDING','Tháng 6/2025 HD003','CT20250601051'),
('TT052','HD011',NULL,3100000,'CASH',         '2025-06-01 08:00:00','MONTHLY_RENT','PENDING','Tháng 6/2025 HD011','CT20250601052'),
-- PENALTY
('TT053','HD005',NULL,420000,'CASH','2024-06-10 10:00:00','PENALTY','COMPLETED','Phạt trễ tiền thuê tháng 6','CT20240610053'),
('TT054','HD012',NULL,410000,'BANK_TRANSFER','2024-08-10 09:00:00','PENALTY','COMPLETED','Phạt trễ tiền thuê','CT20240810054'),
-- REFUND (hoàn cọc các hợp đồng terminated)
('TT055','HD028',NULL,2240000,'BANK_TRANSFER','2024-07-05 10:00:00','REFUND','COMPLETED','Hoàn cọc HD028 (70%)','CT20240705055'),
('TT056','HD029',NULL,2380000,'CASH',         '2024-08-05 10:00:00','REFUND','COMPLETED','Hoàn cọc HD029 (70%)','CT20240805056'),
('TT057','HD030',NULL,2170000,'BANK_TRANSFER','2024-09-05 10:00:00','REFUND','COMPLETED','Hoàn cọc HD030 (70%)','CT20240905057'),
('TT058','HD031',NULL,3010000,'CASH',         '2024-10-05 10:00:00','REFUND','COMPLETED','Hoàn cọc HD031 (70%)','CT20241005058'),
-- Cọc deposits cho các hợp đồng terminated
('TT059',NULL,'COC038',3200000,'BANK_TRANSFER','2023-06-06 09:00:00','DEPOSIT','COMPLETED','Cọc HD028','CT20230606059'),
('TT060',NULL,'COC039',3400000,'CASH','2023-07-06 10:00:00','DEPOSIT','COMPLETED','Cọc HD029','CT20230706060'),
('TT061',NULL,'COC040',3100000,'BANK_TRANSFER','2023-08-06 09:00:00','DEPOSIT','COMPLETED','Cọc HD030','CT20230806061'),
('TT062',NULL,'COC041',4300000,'CASH','2023-09-06 10:00:00','DEPOSIT','COMPLETED','Cọc HD031','CT20230906062'),
('TT063',NULL,'COC047',4500000,'BANK_TRANSFER','2023-12-21 09:00:00','DEPOSIT','COMPLETED','Cọc HD038','CT20231221063'),
('TT064',NULL,'COC048',3500000,'CASH','2024-02-06 10:00:00','DEPOSIT','COMPLETED','Cọc HD040','CT20240206064'),
('TT065',NULL,'COC049',4000000,'BANK_TRANSFER','2024-03-06 09:00:00','DEPOSIT','COMPLETED','Cọc HD041','CT20240306065'),
('TT066',NULL,'COC050',2800000,'CASH','2024-04-06 10:00:00','DEPOSIT','COMPLETED','Cọc HD042','CT20240406066'),
('TT067',NULL,'COC051',3200000,'BANK_TRANSFER','2024-05-06 09:00:00','DEPOSIT','COMPLETED','Cọc HD043','CT20240506067'),
('TT068',NULL,'COC052',4900000,'CASH','2024-01-06 10:00:00','DEPOSIT','COMPLETED','Cọc HD059','CT20240106068'),
('TT069',NULL,'COC053',2800000,'BANK_TRANSFER','2024-02-06 09:00:00','DEPOSIT','COMPLETED','Cọc HD060','CT20240206069'),
-- Monthly rent cho tháng gần đây
('TT070','HD038',NULL,4500000,'BANK_TRANSFER','2024-02-01 08:00:00','MONTHLY_RENT','COMPLETED','Tháng 2/2024 HD038','CT20240201070'),
('TT071','HD060',NULL,2800000,'CASH','2024-04-01 08:00:00','MONTHLY_RENT','COMPLETED','Tháng 4/2024 HD060','CT20240401071'),
-- SERVICE charges
('TT072','HD003',NULL,100000,'BANK_TRANSFER','2024-04-01 09:00:00','SERVICE','COMPLETED','WiFi tháng 4 HD003','CT20240401072'),
('TT073','HD004',NULL,100000,'BANK_TRANSFER','2024-04-15 09:00:00','SERVICE','COMPLETED','WiFi tháng 4 HD004','CT20240415073'),
('TT074','HD005',NULL,100000,'CASH','2024-05-01 09:00:00','SERVICE','COMPLETED','WiFi tháng 5 HD005','CT20240501074'),
('TT075','HD006',NULL,100000,'BANK_TRANSFER','2024-05-15 09:00:00','SERVICE','COMPLETED','WiFi tháng 5 HD006','CT20240515075'),
-- Thêm để đủ 150
('TT076','HD007',NULL,2800000,'CASH','2024-06-01 08:00:00','MONTHLY_RENT','COMPLETED','Tháng 6/2024 HD007','CT20240601076'),
('TT077','HD008',NULL,3400000,'BANK_TRANSFER','2024-06-15 08:00:00','MONTHLY_RENT','COMPLETED','Tháng 6/2024 HD008','CT20240615077'),
('TT078','HD009',NULL,3400000,'CASH','2024-07-01 08:00:00','MONTHLY_RENT','COMPLETED','Tháng 7/2024 HD009','CT20240701078'),
('TT079','HD010',NULL,2500000,'BANK_TRANSFER','2024-07-15 08:00:00','MONTHLY_RENT','COMPLETED','Tháng 7/2024 HD010','CT20240715079'),
('TT080','HD011',NULL,3100000,'CASH','2024-08-01 08:00:00','MONTHLY_RENT','COMPLETED','Tháng 8/2024 HD011','CT20240801080'),
('TT081','HD012',NULL,4100000,'BANK_TRANSFER','2024-08-15 08:00:00','MONTHLY_RENT','COMPLETED','Tháng 8/2024 HD012','CT20240815081'),
('TT082','HD013',NULL,4900000,'CASH','2024-09-01 08:00:00','MONTHLY_RENT','COMPLETED','Tháng 9/2024 HD013','CT20240901082'),
('TT083','HD014',NULL,2700000,'BANK_TRANSFER','2024-09-15 08:00:00','MONTHLY_RENT','COMPLETED','Tháng 9/2024 HD014','CT20240915083'),
('TT084','HD015',NULL,3300000,'CASH','2024-10-01 08:00:00','MONTHLY_RENT','COMPLETED','Tháng 10/2024 HD015','CT20241001084'),
('TT085','HD016',NULL,4300000,'BANK_TRANSFER','2024-10-15 08:00:00','MONTHLY_RENT','COMPLETED','Tháng 10/2024 HD016','CT20241015085'),
('TT086','HD017',NULL,5100000,'CASH','2024-11-01 08:00:00','MONTHLY_RENT','COMPLETED','Tháng 11/2024 HD017','CT20241101086'),
('TT087','HD018',NULL,2900000,'BANK_TRANSFER','2024-11-15 08:00:00','MONTHLY_RENT','COMPLETED','Tháng 11/2024 HD018','CT20241115087'),
('TT088','HD019',NULL,3500000,'CASH','2024-12-01 08:00:00','MONTHLY_RENT','COMPLETED','Tháng 12/2024 HD019','CT20241201088'),
('TT089','HD020',NULL,4500000,'BANK_TRANSFER','2024-12-15 08:00:00','MONTHLY_RENT','COMPLETED','Tháng 12/2024 HD020','CT20241215089'),
('TT090','HD021',NULL,5200000,'CASH','2025-01-01 08:00:00','MONTHLY_RENT','COMPLETED','Tháng 1/2025 HD021','CT20250101090'),
('TT091','HD022',NULL,5200000,'BANK_TRANSFER','2025-01-15 08:00:00','MONTHLY_RENT','COMPLETED','Tháng 1/2025 HD022','CT20250115091'),
('TT092','HD003',NULL,2600000,'BANK_TRANSFER','2025-01-01 08:00:00','MONTHLY_RENT','COMPLETED','Tháng 1/2025 HD003','CT20250101092'),
('TT093','HD004',NULL,3200000,'CASH','2025-01-15 08:00:00','MONTHLY_RENT','COMPLETED','Tháng 1/2025 HD004','CT20250115093'),
('TT094','HD005',NULL,4200000,'BANK_TRANSFER','2025-02-01 08:00:00','MONTHLY_RENT','COMPLETED','Tháng 2/2025 HD005','CT20250201094'),
('TT095','HD006',NULL,5000000,'CASH','2025-02-15 08:00:00','MONTHLY_RENT','COMPLETED','Tháng 2/2025 HD006','CT20250215095'),
('TT096','HD007',NULL,2800000,'BANK_TRANSFER','2025-03-01 08:00:00','MONTHLY_RENT','COMPLETED','Tháng 3/2025 HD007','CT20250301096'),
('TT097','HD008',NULL,3400000,'CASH','2025-03-15 08:00:00','MONTHLY_RENT','COMPLETED','Tháng 3/2025 HD008','CT20250315097'),
('TT098','HD009',NULL,3400000,'BANK_TRANSFER','2025-04-01 08:00:00','MONTHLY_RENT','COMPLETED','Tháng 4/2025 HD009','CT20250401098'),
('TT099','HD010',NULL,2500000,'CASH','2025-04-15 08:00:00','MONTHLY_RENT','COMPLETED','Tháng 4/2025 HD010','CT20250415099'),
('TT100','HD011',NULL,3100000,'BANK_TRANSFER','2025-05-01 08:00:00','MONTHLY_RENT','COMPLETED','Tháng 5/2025 HD011','CT20250501100'),
('TT101','HD012',NULL,4100000,'CASH','2025-05-15 08:00:00','MONTHLY_RENT','COMPLETED','Tháng 5/2025 HD012','CT20250515101'),
('TT102','HD017',NULL,5100000,'BANK_TRANSFER','2025-02-01 08:00:00','MONTHLY_RENT','COMPLETED','Tháng 2/2025 HD017','CT20250201102'),
('TT103','HD018',NULL,2900000,'CASH','2025-02-15 08:00:00','MONTHLY_RENT','COMPLETED','Tháng 2/2025 HD018','CT20250215103'),
('TT104','HD019',NULL,3500000,'BANK_TRANSFER','2025-03-01 08:00:00','MONTHLY_RENT','COMPLETED','Tháng 3/2025 HD019','CT20250301104'),
('TT105','HD020',NULL,4500000,'CASH','2025-03-15 08:00:00','MONTHLY_RENT','COMPLETED','Tháng 3/2025 HD020','CT20250315105'),
-- REFUND cho expired
('TT106','HD032',NULL,3500000,'BANK_TRANSFER','2023-06-05 10:00:00','REFUND','COMPLETED','Hoàn cọc HD032','CT20230605106'),
('TT107','HD033',NULL,3360000,'CASH','2023-07-05 10:00:00','REFUND','COMPLETED','Hoàn cọc HD033 (70%)','CT20230705107'),
('TT108','HD034',NULL,3430000,'BANK_TRANSFER','2023-08-05 10:00:00','REFUND','COMPLETED','Hoàn cọc HD034 (70%)','CT20230805108'),
-- Deposit cho expired HĐ
('TT109',NULL,'COC042',5000000,'BANK_TRANSFER','2022-05-06 09:00:00','DEPOSIT','COMPLETED','Cọc HD032','CT20220506109'),
('TT110',NULL,'COC043',4800000,'CASH','2022-06-06 10:00:00','DEPOSIT','COMPLETED','Cọc HD033','CT20220606110'),
('TT111',NULL,'COC044',4900000,'BANK_TRANSFER','2022-07-06 09:00:00','DEPOSIT','COMPLETED','Cọc HD034','CT20220706111'),
('TT112',NULL,'COC045',5100000,'CASH','2022-08-06 10:00:00','DEPOSIT','COMPLETED','Cọc HD035','CT20220806112'),
('TT113',NULL,'COC046',5200000,'BANK_TRANSFER','2022-09-06 09:00:00','DEPOSIT','COMPLETED','Cọc HD036','CT20220906113'),
-- Thêm monthly rent cũ cho expired
('TT114','HD032',NULL,5000000,'BANK_TRANSFER','2022-07-01 08:00:00','MONTHLY_RENT','COMPLETED','Tháng 7/2022','CT20220701114'),
('TT115','HD033',NULL,4800000,'CASH','2022-08-01 08:00:00','MONTHLY_RENT','COMPLETED','Tháng 8/2022','CT20220801115'),
('TT116','HD034',NULL,4900000,'BANK_TRANSFER','2022-09-01 08:00:00','MONTHLY_RENT','COMPLETED','Tháng 9/2022','CT20220901116'),
('TT117','HD028',NULL,3200000,'CASH','2023-07-01 08:00:00','MONTHLY_RENT','COMPLETED','Tháng 7/2023 HD028','CT20230701117'),
('TT118','HD029',NULL,3400000,'BANK_TRANSFER','2023-08-01 08:00:00','MONTHLY_RENT','COMPLETED','Tháng 8/2023 HD029','CT20230801118'),
('TT119','HD030',NULL,3100000,'CASH','2023-09-01 08:00:00','MONTHLY_RENT','COMPLETED','Tháng 9/2023 HD030','CT20230901119'),
('TT120','HD031',NULL,4300000,'BANK_TRANSFER','2023-10-01 08:00:00','MONTHLY_RENT','COMPLETED','Tháng 10/2023 HD031','CT20231001120');

-- =============================================================
-- 12. TAI_SAN (thêm 4 → tổng = 10)
-- =============================================================
INSERT INTO TAI_SAN (MaTaiSan, TenTaiSan, LoaiTaiSan, TinhTrang) VALUES
('TS007','Bàn học',        'Nội thất',  'IN_USE'),
('TS008','Ghế',            'Nội thất',  'IN_USE'),
('TS009','Tủ lạnh mini',   'Điện máy',  'IN_USE'),
('TS010','Bình nóng lạnh', 'Điện máy',  'IN_USE');

-- =============================================================
-- 13. BANG_GIAO  (thêm 39 → tổng = 40)
-- Chỉ cho hợp đồng ACTIVE / TERMINATED
-- =============================================================
INSERT INTO BANG_GIAO (MaBanGiao, MaHopDong, NgayGiao, TinhTrang, MaNV) VALUES
('BG002','HD003','2024-03-01 09:00:00','COMPLETED','NV002'),
('BG003','HD004','2024-03-15 09:00:00','COMPLETED','NV002'),
('BG004','HD005','2024-04-01 09:00:00','COMPLETED','NV005'),
('BG005','HD006','2024-04-15 09:00:00','COMPLETED','NV005'),
('BG006','HD007','2024-05-01 09:00:00','COMPLETED','NV005'),
('BG007','HD008','2024-05-15 09:00:00','COMPLETED','NV008'),
('BG008','HD009','2024-06-01 09:00:00','COMPLETED','NV008'),
('BG009','HD010','2024-06-15 09:00:00','COMPLETED','NV008'),
('BG010','HD011','2024-07-01 09:00:00','COMPLETED','NV011'),
('BG011','HD012','2024-07-15 09:00:00','COMPLETED','NV011'),
('BG012','HD013','2024-08-01 09:00:00','COMPLETED','NV011'),
('BG013','HD014','2024-08-15 09:00:00','COMPLETED','NV014'),
('BG014','HD015','2024-09-01 09:00:00','COMPLETED','NV014'),
('BG015','HD016','2024-09-15 09:00:00','COMPLETED','NV014'),
('BG016','HD017','2024-10-01 09:00:00','COMPLETED','NV002'),
('BG017','HD018','2024-10-15 09:00:00','COMPLETED','NV002'),
('BG018','HD019','2024-11-01 09:00:00','COMPLETED','NV005'),
('BG019','HD020','2024-11-15 09:00:00','COMPLETED','NV005'),
('BG020','HD021','2024-12-01 09:00:00','COMPLETED','NV008'),
('BG021','HD022','2024-12-15 09:00:00','COMPLETED','NV008'),
('BG022','HD028','2023-07-01 09:00:00','COMPLETED','NV002'),
('BG023','HD029','2023-08-01 09:00:00','COMPLETED','NV005'),
('BG024','HD030','2023-09-01 09:00:00','COMPLETED','NV008'),
('BG025','HD031','2023-10-01 09:00:00','COMPLETED','NV011'),
('BG026','HD032','2022-06-01 09:00:00','COMPLETED','NV002'),
('BG027','HD033','2022-07-01 09:00:00','COMPLETED','NV005'),
('BG028','HD034','2022-08-01 09:00:00','COMPLETED','NV008'),
('BG029','HD038','2024-01-10 09:00:00','COMPLETED','NV002'),
('BG030','HD040','2024-03-01 09:00:00','COMPLETED','NV002'),
('BG031','HD041','2024-04-01 09:00:00','COMPLETED','NV003'),
('BG032','HD042','2024-05-01 09:00:00','COMPLETED','NV006'),
('BG033','HD043','2024-06-01 09:00:00','COMPLETED','NV006'),
('BG034','HD059','2024-02-01 09:00:00','COMPLETED','NV006'),
('BG035','HD060','2024-03-01 09:00:00','COMPLETED','NV008'),
-- PENDING (hợp đồng PENDING_FIRST_PAYMENT)
('BG036','HD023','2025-02-01 09:00:00','PENDING','NV009'),
('BG037','HD024','2025-02-15 09:00:00','PENDING','NV012'),
('BG038','HD025','2025-03-01 09:00:00','PENDING','NV015'),
-- CANCELLED
('BG039','HD035','2022-09-01 09:00:00','CANCELLED','NV011'),
('BG040','HD036','2022-10-01 09:00:00','CANCELLED','NV014');

-- =============================================================
-- 14. BANGGIAO_TAISAN  (~200 records, 5 tài sản × 40 bàn giao)
-- =============================================================
INSERT INTO BANGGIAO_TAISAN (MaBanGiao, MaTaiSan, SoLuong, TinhTrangLucGiao, GhiChu, DaKiemTra) VALUES
('BG002','TS001',2,'AVAILABLE','2 giường tầng',TRUE),('BG002','TS002',2,'AVAILABLE','2 nệm',TRUE),('BG002','TS003',1,'AVAILABLE','1 tủ',TRUE),('BG002','TS004',2,'AVAILABLE','2 chìa khóa',TRUE),('BG002','TS005',1,'AVAILABLE','1 điều hòa',TRUE),
('BG003','TS001',4,'AVAILABLE','4 giường tầng',TRUE),('BG003','TS002',4,'AVAILABLE','4 nệm',TRUE),('BG003','TS003',2,'AVAILABLE','2 tủ',TRUE),('BG003','TS004',4,'AVAILABLE','4 chìa khóa',TRUE),('BG003','TS005',1,'AVAILABLE','1 điều hòa',TRUE),
('BG004','TS001',4,'AVAILABLE','4 giường',TRUE),('BG004','TS002',4,'AVAILABLE','4 nệm',TRUE),('BG004','TS003',2,'AVAILABLE','2 tủ',TRUE),('BG004','TS004',4,'AVAILABLE','4 chìa',TRUE),('BG004','TS007',4,'AVAILABLE','4 bàn học',TRUE),
('BG005','TS001',6,'AVAILABLE','6 giường',TRUE),('BG005','TS002',6,'AVAILABLE','6 nệm',TRUE),('BG005','TS003',2,'AVAILABLE','2 tủ',TRUE),('BG005','TS004',6,'AVAILABLE','6 chìa',TRUE),('BG005','TS005',1,'AVAILABLE','1 ĐH',TRUE),
('BG006','TS001',2,'AVAILABLE','2 giường',TRUE),('BG006','TS002',2,'AVAILABLE','2 nệm',TRUE),('BG006','TS004',2,'AVAILABLE','2 chìa',TRUE),('BG006','TS007',2,'AVAILABLE','2 bàn',TRUE),('BG006','TS008',2,'AVAILABLE','2 ghế',TRUE),
('BG007','TS001',4,'AVAILABLE','4 giường',TRUE),('BG007','TS002',4,'AVAILABLE','4 nệm',TRUE),('BG007','TS003',2,'AVAILABLE','2 tủ',TRUE),('BG007','TS004',4,'AVAILABLE','4 chìa',TRUE),('BG007','TS005',1,'AVAILABLE','1 ĐH',TRUE),
('BG008','TS001',4,'AVAILABLE','4 giường',TRUE),('BG008','TS002',4,'AVAILABLE','4 nệm',TRUE),('BG008','TS004',4,'AVAILABLE','4 chìa',TRUE),('BG008','TS007',4,'AVAILABLE','4 bàn',TRUE),('BG008','TS008',4,'AVAILABLE','4 ghế',TRUE),
('BG009','TS001',2,'AVAILABLE','2 giường',TRUE),('BG009','TS002',2,'AVAILABLE','2 nệm',TRUE),('BG009','TS004',2,'AVAILABLE','2 chìa',TRUE),('BG009','TS006',1,'AVAILABLE','1 quạt',TRUE),('BG009','TS009',1,'AVAILABLE','1 tủ lạnh',TRUE),
('BG010','TS001',4,'AVAILABLE','4 giường',TRUE),('BG010','TS002',4,'AVAILABLE','4 nệm',TRUE),('BG010','TS003',2,'AVAILABLE','2 tủ',TRUE),('BG010','TS004',4,'AVAILABLE','4 chìa',TRUE),('BG010','TS005',1,'AVAILABLE','1 ĐH',TRUE),
('BG011','TS001',4,'AVAILABLE','4 giường',TRUE),('BG011','TS002',4,'AVAILABLE','4 nệm',TRUE),('BG011','TS004',4,'AVAILABLE','4 chìa',TRUE),('BG011','TS007',4,'AVAILABLE','4 bàn',TRUE),('BG011','TS010',1,'AVAILABLE','1 bình nóng lạnh',TRUE),
('BG012','TS001',6,'AVAILABLE','6 giường',TRUE),('BG012','TS002',6,'AVAILABLE','6 nệm',TRUE),('BG012','TS003',2,'AVAILABLE','2 tủ',TRUE),('BG012','TS004',6,'AVAILABLE','6 chìa',TRUE),('BG012','TS005',1,'AVAILABLE','1 ĐH',TRUE),
('BG013','TS001',2,'AVAILABLE','2 giường',TRUE),('BG013','TS002',2,'AVAILABLE','2 nệm',TRUE),('BG013','TS004',2,'AVAILABLE','2 chìa',TRUE),('BG013','TS007',2,'AVAILABLE','2 bàn',TRUE),('BG013','TS008',2,'AVAILABLE','2 ghế',TRUE),
('BG014','TS001',4,'AVAILABLE','4 giường',TRUE),('BG014','TS002',4,'AVAILABLE','4 nệm',TRUE),('BG014','TS003',2,'AVAILABLE','2 tủ',TRUE),('BG014','TS004',4,'AVAILABLE','4 chìa',TRUE),('BG014','TS009',1,'AVAILABLE','1 tủ lạnh',TRUE),
('BG015','TS001',4,'AVAILABLE','4 giường',TRUE),('BG015','TS002',4,'AVAILABLE','4 nệm',TRUE),('BG015','TS004',4,'AVAILABLE','4 chìa',TRUE),('BG015','TS005',1,'AVAILABLE','1 ĐH',TRUE),('BG015','TS010',1,'AVAILABLE','1 bình NL',TRUE),
('BG016','TS001',6,'AVAILABLE','6 giường',TRUE),('BG016','TS002',6,'AVAILABLE','6 nệm',TRUE),('BG016','TS003',2,'AVAILABLE','2 tủ',TRUE),('BG016','TS004',6,'AVAILABLE','6 chìa',TRUE),('BG016','TS005',1,'AVAILABLE','1 ĐH',TRUE),
('BG017','TS001',2,'AVAILABLE','2 giường',TRUE),('BG017','TS002',2,'AVAILABLE','2 nệm',TRUE),('BG017','TS004',2,'AVAILABLE','2 chìa',TRUE),('BG017','TS006',1,'AVAILABLE','1 quạt',TRUE),('BG017','TS007',2,'AVAILABLE','2 bàn',TRUE),
('BG018','TS001',4,'AVAILABLE','4 giường',TRUE),('BG018','TS002',4,'AVAILABLE','4 nệm',TRUE),('BG018','TS003',1,'AVAILABLE','1 tủ',TRUE),('BG018','TS004',4,'AVAILABLE','4 chìa',TRUE),('BG018','TS005',1,'AVAILABLE','1 ĐH',TRUE),
('BG019','TS001',4,'AVAILABLE','4 giường',TRUE),('BG019','TS002',4,'AVAILABLE','4 nệm',TRUE),('BG019','TS004',4,'AVAILABLE','4 chìa',TRUE),('BG019','TS007',4,'AVAILABLE','4 bàn',TRUE),('BG019','TS008',4,'AVAILABLE','4 ghế',TRUE),
('BG020','TS001',6,'AVAILABLE','6 giường',TRUE),('BG020','TS002',6,'AVAILABLE','6 nệm',TRUE),('BG020','TS003',2,'AVAILABLE','2 tủ',TRUE),('BG020','TS004',6,'AVAILABLE','6 chìa',TRUE),('BG020','TS009',1,'AVAILABLE','1 tủ lạnh',TRUE),
('BG021','TS001',6,'AVAILABLE','6 giường',TRUE),('BG021','TS002',6,'AVAILABLE','6 nệm',TRUE),('BG021','TS003',2,'AVAILABLE','2 tủ',TRUE),('BG021','TS004',6,'AVAILABLE','6 chìa',TRUE),('BG021','TS005',1,'AVAILABLE','1 ĐH',TRUE),
('BG022','TS001',4,'AVAILABLE','4 giường',TRUE),('BG022','TS002',4,'AVAILABLE','4 nệm',TRUE),('BG022','TS004',4,'AVAILABLE','4 chìa',TRUE),('BG022','TS005',1,'AVAILABLE','1 ĐH',TRUE),('BG022','TS010',1,'AVAILABLE','1 BNL',TRUE),
('BG023','TS001',4,'AVAILABLE','4 giường',TRUE),('BG023','TS002',4,'AVAILABLE','4 nệm',TRUE),('BG023','TS004',4,'AVAILABLE','4 chìa',TRUE),('BG023','TS007',4,'AVAILABLE','4 bàn',TRUE),('BG023','TS008',4,'AVAILABLE','4 ghế',TRUE),
('BG024','TS001',4,'AVAILABLE','4 giường',TRUE),('BG024','TS002',4,'AVAILABLE','4 nệm',TRUE),('BG024','TS003',2,'AVAILABLE','2 tủ',TRUE),('BG024','TS004',4,'AVAILABLE','4 chìa',TRUE),('BG024','TS009',1,'AVAILABLE','1 tủ lạnh',TRUE),
('BG025','TS001',4,'AVAILABLE','4 giường',TRUE),('BG025','TS002',4,'AVAILABLE','4 nệm',TRUE),('BG025','TS004',4,'AVAILABLE','4 chìa',TRUE),('BG025','TS005',1,'AVAILABLE','1 ĐH',TRUE),('BG025','TS006',1,'AVAILABLE','1 quạt',TRUE),
('BG026','TS001',6,'AVAILABLE','6 giường',TRUE),('BG026','TS002',6,'AVAILABLE','6 nệm',TRUE),('BG026','TS003',2,'AVAILABLE','2 tủ',TRUE),('BG026','TS004',6,'AVAILABLE','6 chìa',TRUE),('BG026','TS005',1,'AVAILABLE','1 ĐH',TRUE),
('BG027','TS001',6,'AVAILABLE','6 giường',TRUE),('BG027','TS002',6,'AVAILABLE','6 nệm',TRUE),('BG027','TS003',2,'AVAILABLE','2 tủ',TRUE),('BG027','TS004',6,'AVAILABLE','6 chìa',TRUE),('BG027','TS010',1,'AVAILABLE','1 BNL',TRUE),
('BG028','TS001',6,'AVAILABLE','6 giường',TRUE),('BG028','TS002',6,'AVAILABLE','6 nệm',TRUE),('BG028','TS003',2,'AVAILABLE','2 tủ',TRUE),('BG028','TS004',6,'AVAILABLE','6 chìa',TRUE),('BG028','TS005',1,'AVAILABLE','1 ĐH',TRUE),
('BG029','TS001',4,'AVAILABLE','4 giường',TRUE),('BG029','TS002',4,'AVAILABLE','4 nệm',TRUE),('BG029','TS004',4,'AVAILABLE','4 chìa',TRUE),('BG029','TS005',1,'AVAILABLE','1 ĐH',TRUE),('BG029','TS007',4,'AVAILABLE','4 bàn',TRUE),
('BG030','TS001',4,'AVAILABLE','4 giường',TRUE),('BG030','TS002',4,'AVAILABLE','4 nệm',TRUE),('BG030','TS003',2,'AVAILABLE','2 tủ',TRUE),('BG030','TS004',4,'AVAILABLE','4 chìa',TRUE),('BG030','TS005',1,'AVAILABLE','1 ĐH',TRUE),
('BG031','TS001',6,'AVAILABLE','6 giường',TRUE),('BG031','TS002',6,'AVAILABLE','6 nệm',TRUE),('BG031','TS003',2,'AVAILABLE','2 tủ',TRUE),('BG031','TS004',6,'AVAILABLE','6 chìa',TRUE),('BG031','TS008',6,'AVAILABLE','6 ghế',TRUE),
('BG032','TS001',4,'AVAILABLE','4 giường',TRUE),('BG032','TS002',4,'AVAILABLE','4 nệm',TRUE),('BG032','TS003',2,'AVAILABLE','2 tủ',TRUE),('BG032','TS004',4,'AVAILABLE','4 chìa',TRUE),('BG032','TS009',1,'AVAILABLE','1 tủ lạnh',TRUE),
('BG033','TS001',2,'AVAILABLE','2 giường',TRUE),('BG033','TS002',2,'AVAILABLE','2 nệm',TRUE),('BG033','TS004',2,'AVAILABLE','2 chìa',TRUE),('BG033','TS007',2,'AVAILABLE','2 bàn',TRUE),('BG033','TS010',1,'AVAILABLE','1 BNL',TRUE),
('BG034','TS001',6,'AVAILABLE','6 giường',TRUE),('BG034','TS002',6,'AVAILABLE','6 nệm',TRUE),('BG034','TS003',2,'AVAILABLE','2 tủ',TRUE),('BG034','TS004',6,'AVAILABLE','6 chìa',TRUE),('BG034','TS005',1,'AVAILABLE','1 ĐH',TRUE),
('BG035','TS001',4,'AVAILABLE','4 giường',TRUE),('BG035','TS002',4,'AVAILABLE','4 nệm',TRUE),('BG035','TS004',4,'AVAILABLE','4 chìa',TRUE),('BG035','TS005',1,'AVAILABLE','1 ĐH',TRUE),('BG035','TS007',4,'AVAILABLE','4 bàn',TRUE),
-- BG036–040 (PENDING/CANCELLED - chưa kiểm tra)
('BG036','TS001',2,'AVAILABLE','2 giường',FALSE),('BG036','TS002',2,'AVAILABLE','2 nệm',FALSE),('BG036','TS004',2,'AVAILABLE','2 chìa',FALSE),('BG036','TS007',2,'AVAILABLE','2 bàn',FALSE),('BG036','TS008',2,'AVAILABLE','2 ghế',FALSE),
('BG037','TS001',2,'AVAILABLE','2 giường',FALSE),('BG037','TS002',2,'AVAILABLE','2 nệm',FALSE),('BG037','TS004',2,'AVAILABLE','2 chìa',FALSE),('BG037','TS007',2,'AVAILABLE','2 bàn',FALSE),('BG037','TS009',1,'AVAILABLE','1 tủ lạnh',FALSE),
('BG038','TS001',2,'AVAILABLE','2 giường',FALSE),('BG038','TS002',2,'AVAILABLE','2 nệm',FALSE),('BG038','TS004',2,'AVAILABLE','2 chìa',FALSE),('BG038','TS006',1,'AVAILABLE','1 quạt',FALSE),('BG038','TS010',1,'AVAILABLE','1 BNL',FALSE),
('BG039','TS001',6,'AVAILABLE','6 giường',FALSE),('BG039','TS002',6,'AVAILABLE','6 nệm',FALSE),('BG039','TS003',2,'AVAILABLE','2 tủ',FALSE),('BG039','TS004',6,'AVAILABLE','6 chìa',FALSE),('BG039','TS005',1,'AVAILABLE','1 ĐH',FALSE),
('BG040','TS001',6,'AVAILABLE','6 giường',FALSE),('BG040','TS002',6,'AVAILABLE','6 nệm',FALSE),('BG040','TS003',2,'AVAILABLE','2 tủ',FALSE),('BG040','TS004',6,'AVAILABLE','6 chìa',FALSE),('BG040','TS005',1,'AVAILABLE','1 ĐH',FALSE);

-- =============================================================
-- 15. TRA_PHONG  (30 yêu cầu cho HĐ TERMINATED/ACTIVE cũ)
-- =============================================================
INSERT INTO TRA_PHONG (MaTra, MaHopDong, NgayYeuCau, NgayTraDuKien, NgayTraThucTe, TinhTrangPhong, LyDo, TyLeHoanCoc, SoTienHoan, TrangThai, MaNVXuLy) VALUES
('TR001','HD028','2024-06-15 09:00:00','2024-06-30','2024-06-30','GOOD','Hết hợp đồng, không gia hạn',100.00,3200000,'COMPLETED','NV002'),
('TR002','HD029','2024-07-20 10:00:00','2024-07-31','2024-07-31','DIRTY','Hết HĐ',70.00,2380000,'COMPLETED','NV005'),
('TR003','HD030','2024-08-20 09:00:00','2024-08-31','2024-08-31','GOOD','Hết HĐ',100.00,3100000,'COMPLETED','NV008'),
('TR004','HD031','2024-09-20 10:00:00','2024-09-30','2024-09-30','DAMAGED','Hỏng cửa sổ',50.00,2150000,'COMPLETED','NV011'),
('TR005','HD032','2023-05-20 09:00:00','2023-05-31','2023-05-31','GOOD','Hết HĐ, không gia hạn',100.00,5000000,'COMPLETED','NV002'),
('TR006','HD033','2023-06-20 10:00:00','2023-06-30','2023-06-30','DIRTY','Phòng bẩn',70.00,3360000,'COMPLETED','NV005'),
('TR007','HD034','2023-07-20 09:00:00','2023-07-31','2023-07-31','GOOD','Hết HĐ',100.00,4900000,'COMPLETED','NV008'),
('TR008','HD035','2023-08-20 10:00:00','2023-08-31','2023-08-31','SEVERELY_DAMAGED','Phòng hư nặng',0.00,0,'COMPLETED','NV011'),
('TR009','HD036','2023-09-20 09:00:00','2023-09-30','2023-09-30','GOOD','Hết HĐ',100.00,5200000,'COMPLETED','NV014'),
('TR010','HD038','2024-12-25 10:00:00','2025-01-09','2025-01-09','DIRTY','Phòng chưa dọn',70.00,3150000,'COMPLETED','NV002'),
('TR011','HD039','2024-02-15 09:00:00','2024-02-29','2024-02-29','GOOD','Hết HĐ',100.00,3200000,'COMPLETED','NV003'),
('TR012','HD046','2024-12-20 10:00:00','2024-12-31','2024-12-31','DAMAGED','Hư hỏng tủ',60.00,1680000,'COMPLETED','NV005'),
('TR013','HD047','2024-01-20 09:00:00','2024-01-31','2024-01-31','GOOD','Hết HĐ',100.00,2800000,'COMPLETED','NV006'),
('TR014','HD048','2024-02-20 10:00:00','2024-02-29','2024-02-29','DIRTY','Bẩn',70.00,2380000,'COMPLETED','NV008'),
('TR015','HD049','2024-03-20 09:00:00','2024-03-31','2024-03-31','GOOD','Hết HĐ',100.00,3400000,'COMPLETED','NV009'),
('TR016','HD050','2024-04-20 10:00:00','2024-04-30','2024-04-30','GOOD','Hết HĐ',100.00,3400000,'COMPLETED','NV011'),
('TR017','HD051','2024-05-20 09:00:00','2024-05-31','2024-05-31','DAMAGED','Hỏng đèn',80.00,3840000,'COMPLETED','NV012'),
('TR018','HD052','2024-06-20 10:00:00','2024-06-30','2024-06-30','GOOD','Hết HĐ',100.00,2500000,'COMPLETED','NV014'),
('TR019','HD053','2024-07-20 09:00:00','2024-07-31','2024-07-31','DIRTY','Cần tổng vệ sinh',70.00,1750000,'COMPLETED','NV015'),
('TR020','HD054','2024-08-20 10:00:00','2024-08-31','2024-08-31','GOOD','Hết HĐ',100.00,3100000,'COMPLETED','NV017'),
('TR021','HD055','2024-09-20 09:00:00','2024-09-30','2024-09-30','SEVERELY_DAMAGED','Hư nặng',0.00,0,'COMPLETED','NV019'),
('TR022','HD056','2024-10-20 10:00:00','2024-10-31','2024-10-31','GOOD','Hết HĐ',100.00,4100000,'COMPLETED','NV002'),
('TR023','HD057','2024-11-20 09:00:00','2024-11-30','2024-11-30','DIRTY','Bẩn vừa',70.00,2870000,'COMPLETED','NV003'),
('TR024','HD058','2024-12-20 10:00:00','2024-12-31','2024-12-31','GOOD','Hết HĐ',100.00,4900000,'COMPLETED','NV005'),
-- INSPECTING
('TR025','HD003','2025-06-01 09:00:00','2025-06-28', NULL,         NULL,'Chuyển nơi ở',NULL,NULL,'INSPECTING','NV002'),
('TR026','HD007','2025-06-02 10:00:00','2025-06-30', NULL,         NULL,'Kết thúc hợp đồng',NULL,NULL,'INSPECTING','NV005'),
('TR027','HD011','2025-06-03 09:00:00','2025-06-30', NULL,         NULL,'Sinh viên tốt nghiệp',NULL,NULL,'INSPECTING','NV008'),
-- PENDING
('TR028','HD013','2025-06-04 10:00:00','2025-07-01', NULL,         NULL,'Chuyển công tác',NULL,NULL,'PENDING',NULL),
('TR029','HD017','2025-06-05 09:00:00','2025-07-01', NULL,         NULL,'Gia đình có việc',NULL,NULL,'PENDING',NULL),
('TR030','HD021','2025-06-06 10:00:00','2025-07-01', NULL,         NULL,'Hết tiền',NULL,NULL,'PENDING',NULL);

-- =============================================================
-- 16. CHITIETKHAUTRU  (90 bản ghi, ~3 mỗi tra phòng)
-- =============================================================
INSERT INTO CHITIETKHAUTRU (MaTra, LoaiPhi, SoTien, GhiChu) VALUES
('TR001','DIEN',  150000,'Tiền điện tháng cuối'),
('TR001','NUOC',   80000,'Tiền nước tháng cuối'),
('TR001','DICH_VU',100000,'WiFi tháng cuối'),
('TR002','DIEN',  200000,'Điện vượt chỉ tiêu'),
('TR002','NUOC',  100000,'Nước phát sinh'),
('TR002','HU_HONG',960000,'Phạt phòng dơ 30% cọc'),
('TR003','DIEN',  120000,'Điện tháng cuối'),
('TR003','NUOC',   60000,'Nước tháng cuối'),
('TR003','DICH_VU', 50000,'Phí vệ sinh chung'),
('TR004','DIEN',  180000,'Điện tháng cuối'),
('TR004','NUOC',   90000,'Nước tháng cuối'),
('TR004','HU_HONG',1075000,'Hỏng cửa sổ, bồi thường'),
('TR005','DIEN',  250000,'Tiền điện'),
('TR005','NUOC',  120000,'Tiền nước'),
('TR005','DICH_VU',100000,'WiFi'),
('TR006','DIEN',  300000,'Điện dư'),
('TR006','NUOC',  150000,'Nước dư'),
('TR006','HU_HONG',1440000,'Phạt bẩn 30% cọc'),
('TR007','DIEN',  200000,'Điện'),
('TR007','NUOC',   80000,'Nước'),
('TR007','DICH_VU', 50000,'Phí VV'),
('TR008','DIEN',  350000,'Điện vượt'),
('TR008','NUOC',  200000,'Nước vượt'),
('TR008','HU_HONG',5100000,'Hư nặng, không hoàn cọc'),
('TR009','DIEN',  180000,'Điện'),
('TR009','NUOC',   90000,'Nước'),
('TR009','DICH_VU',100000,'WiFi'),
('TR010','DIEN',  220000,'Điện'),
('TR010','NUOC',  110000,'Nước'),
('TR010','HU_HONG',1350000,'Phạt bẩn 30%'),
('TR011','DIEN',  160000,'Điện'),
('TR011','NUOC',   70000,'Nước'),
('TR011','DICH_VU', 50000,'Phí vệ sinh'),
('TR012','DIEN',  200000,'Điện'),
('TR012','NUOC',  100000,'Nước'),
('TR012','HU_HONG',1120000,'Hỏng tủ, bồi thường'),
('TR013','DIEN',  140000,'Điện'),
('TR013','NUOC',   60000,'Nước'),
('TR013','DICH_VU',100000,'WiFi'),
('TR014','DIEN',  210000,'Điện'),
('TR014','NUOC',  100000,'Nước'),
('TR014','HU_HONG',1020000,'Phạt bẩn'),
('TR015','DIEN',  170000,'Điện'),
('TR015','NUOC',   80000,'Nước'),
('TR015','DICH_VU', 50000,'Phí VV'),
('TR016','DIEN',  190000,'Điện'),
('TR016','NUOC',   95000,'Nước'),
('TR016','DICH_VU',100000,'WiFi'),
('TR017','DIEN',  230000,'Điện'),
('TR017','NUOC',  115000,'Nước'),
('TR017','HU_HONG', 960000,'Hỏng đèn'),
('TR018','DIEN',  150000,'Điện'),
('TR018','NUOC',   70000,'Nước'),
('TR018','DICH_VU', 50000,'Phí VV'),
('TR019','DIEN',  200000,'Điện'),
('TR019','NUOC',  100000,'Nước'),
('TR019','HU_HONG', 750000,'Phạt bẩn 30%'),
('TR020','DIEN',  160000,'Điện'),
('TR020','NUOC',   75000,'Nước'),
('TR020','DICH_VU',100000,'WiFi'),
('TR021','DIEN',  280000,'Điện'),
('TR021','NUOC',  150000,'Nước'),
('TR021','HU_HONG',3100000,'Hư nặng toàn bộ'),
('TR022','DIEN',  175000,'Điện'),
('TR022','NUOC',   85000,'Nước'),
('TR022','DICH_VU', 50000,'Phí VV'),
('TR023','DIEN',  220000,'Điện'),
('TR023','NUOC',  110000,'Nước'),
('TR023','HU_HONG',1230000,'Phạt bẩn 30%'),
('TR024','DIEN',  200000,'Điện'),
('TR024','NUOC',   95000,'Nước'),
('TR024','DICH_VU',100000,'WiFi'),
-- TR025-030 không có chi tiết khấu trừ vì chưa hoàn thành
-- Thêm các khoản phạt trả chậm
('TR001','PHAT',   50000,'Phạt trả chậm 2 ngày'),
('TR002','PHAT',  100000,'Phạt trả chậm 5 ngày'),
('TR004','PHAT',   50000,'Phạt trả chậm'),
('TR006','PHAT',  150000,'Phạt trả chậm 7 ngày'),
('TR008','PHAT',  200000,'Phạt nhiều vi phạm'),
('TR010','PHAT',   80000,'Phạt trả chậm'),
('TR012','PHAT',  100000,'Phạt trả chậm'),
('TR014','PHAT',   60000,'Phạt trả chậm'),
('TR017','PHAT',   80000,'Phạt trả chậm'),
('TR019','PHAT',  100000,'Phạt trả chậm'),
('TR021','PHAT',  300000,'Nhiều vi phạm'),
('TR023','PHAT',  120000,'Phạt trả chậm'),
-- NO_TIEN_PHONG
('TR001','NO_TIEN_PHONG',  200000,'Nợ tiền phòng tháng cuối'),
('TR002','NO_TIEN_PHONG',  350000,'Nợ phí dịch vụ'),
('TR004','NO_TIEN_PHONG',  150000,'Nợ tiền điện');

-- =============================================================
-- 17. QUY_DINH  (thêm 7 → tổng = 10)
-- =============================================================
INSERT INTO QUY_DINH (MaQuyDinh, TieuDe, NhomQuyDinh, NoiDung, NgayHieuLuc, NgayHetHieuLuc, TrangThai, UuTien, ApDungCho, NgayTao) VALUES
('QD004','Quy định về khách thăm','NỘI QUY PHÒNG','Khách thăm chỉ được ở lại đến 22:00. Không được để người lạ qua đêm mà không đăng ký. Phải thông báo BQL trước 24h.','2024-01-01',NULL,'ACTIVE','MEDIUM','Tất cả cư dân','2024-01-01 00:00:00'),
('QD005','Quy định sử dụng điện nước','TÀI CHÍNH','Mỗi phòng có mức tiêu thụ điện miễn phí 50kWh/tháng. Vượt mức tính 3.500đ/kWh. Nước tính theo đầu người 60.000đ/người/tháng. Thanh toán cùng tiền thuê.','2024-01-01',NULL,'ACTIVE','HIGH','Tất cả cư dân','2024-01-01 00:00:00'),
('QD006','Quy định đăng ký tạm trú','HỢP ĐỒNG','Cư dân phải cung cấp CCCD/CMND bản gốc để đăng ký tạm trú trong vòng 7 ngày kể từ ngày nhận phòng. BQL sẽ hỗ trợ thủ tục.','2024-01-01',NULL,'ACTIVE','HIGH','Tất cả cư dân','2024-01-01 00:00:00'),
('QD007','Chính sách gia hạn hợp đồng','HỢP ĐỒNG','Thông báo gia hạn trước 30 ngày khi hết hạn. Giá thuê mới áp dụng theo bảng giá hiện hành. Không gia hạn tự động nếu không có thông báo bằng văn bản.','2024-06-01',NULL,'ACTIVE','MEDIUM','Tất cả cư dân','2024-06-01 00:00:00'),
('QD008','Quy định an toàn phòng cháy chữa cháy','AN NINH','Tuyệt đối không dùng bếp gas, bếp than trong phòng. Không hút thuốc trong tòa nhà. Biết vị trí bình chữa cháy. Không chắn lối thoát hiểm.','2024-01-01',NULL,'ACTIVE','HIGH','Tất cả cư dân','2024-01-01 00:00:00'),
('QD009','Quy định chỗ để xe','NỘI QUY PHÒNG','Xe máy để đúng nơi quy định, không để trước cửa phòng. Ô tô không được đỗ trong khuôn viên. Mất chìa khóa xe báo ngay BQL.','2024-01-01',NULL,'ACTIVE','LOW','Tất cả cư dân','2024-01-01 00:00:00'),
('QD010','Chính sách miễn giảm tiền thuê','TÀI CHÍNH','Sinh viên xuất sắc (GPA ≥ 3.5) được giảm 5% tiền thuê/tháng khi có bảng điểm xác nhận. Nhóm thuê từ 6 tháng liên tục được giảm 3%. Không áp dụng đồng thời.','2025-01-01',NULL,'UPCOMING','LOW','Sinh viên đủ điều kiện','2024-12-01 00:00:00');

-- =============================================================
-- 18. YEU_CAU_THUE  (thêm 18 → tổng = 20)
-- =============================================================
INSERT INTO YEU_CAU_THUE (MaYeuCauThue, MaKH, LoaiPhong, GiaMongMuon, TieuChiKhac, NgayTao) VALUES
('YCT003','KH006','DORMITORY',800000, 'Gần trường ĐH Bách Khoa',    '2024-02-01 09:00:00'),
('YCT004','KH007','SHARED',    900000, 'Phòng 4 người, có wifi',      '2024-02-05 10:00:00'),
('YCT005','KH008','DORMITORY',750000, 'Khu yên tĩnh, gần BX',       '2024-03-01 09:00:00'),
('YCT006','KH009','SHARED',   1000000,'4 người, có điều hòa',        '2024-03-10 10:00:00'),
('YCT007','KH010','DORMITORY',800000, 'Giá tốt, thoáng',             '2024-04-01 09:00:00'),
('YCT008','KH011','SHARED',    850000, 'Gần Q1, an ninh',             '2024-04-15 10:00:00'),
('YCT009','KH012','DORMITORY',700000, 'Sinh viên, ngân sách thấp',   '2024-05-01 09:00:00'),
('YCT010','KH013','SHARED',   1100000,'Phòng đôi, sạch sẽ',          '2024-05-10 10:00:00'),
('YCT011','KH051','DORMITORY',900000, 'Người Trung Quốc, tiếng Anh', '2024-06-01 09:00:00'),
('YCT012','KH053','SHARED',    950000, 'Sinh viên Nhật, yên tĩnh',   '2024-06-15 10:00:00'),
('YCT013','KH055','DORMITORY',850000, 'Hàn Quốc, gần Metro',         '2024-07-01 09:00:00'),
('YCT014','KH057','SHARED',    800000, 'Sinh viên từ Hà Nội',         '2024-07-10 10:00:00'),
('YCT015','KH059','DORMITORY',750000, 'Từ Cần Thơ lên, giá vừa',    '2024-08-01 09:00:00'),
('YCT016','KH061','SHARED',    900000, 'Sinh viên y khoa',            '2024-08-15 10:00:00'),
('YCT017','KH071','DORMITORY',800000, 'Phòng 4-6 người OK',          '2024-09-01 09:00:00'),
('YCT018','KH073','SHARED',    950000, 'Gần bệnh viện Chợ Rẫy',     '2024-09-15 10:00:00'),
('YCT019','KH085','DORMITORY',700000, 'Sinh viên năm nhất',          '2025-05-01 09:00:00'),
('YCT020','KH090','SHARED',    850000, 'Tìm phòng cho tháng 7',      '2025-05-15 10:00:00');

-- =============================================================
-- 19. DICHVU_PHONG mở rộng (cho các phòng mới)
-- =============================================================
INSERT INTO DICHVU_PHONG (MaPhong, MaDV) VALUES
('P111','DV001'),('P111','DV002'),('P111','DV003'),
('P112','DV001'),('P112','DV002'),('P112','DV003'),
('P121','DV001'),('P121','DV002'),('P121','DV003'),
('P122','DV001'),('P122','DV002'),('P122','DV003'),
('P131','DV001'),('P131','DV002'),('P131','DV003'),
('P132','DV001'),('P132','DV002'),('P132','DV003'),
('P141','DV001'),('P141','DV002'),('P141','DV003'),
('P142','DV001'),('P142','DV002'),('P142','DV003'),
('P151','DV001'),('P151','DV002'),('P151','DV003'),
('P211','DV001'),('P211','DV002'),('P211','DV003'),
('P212','DV001'),('P212','DV002'),('P212','DV003'),
('P221','DV001'),('P221','DV002'),('P221','DV003'),
('P222','DV001'),('P222','DV002'),('P222','DV003'),
('P231','DV001'),('P231','DV002'),('P231','DV003'),
('P241','DV001'),('P241','DV002'),('P241','DV003'),
('P311','DV001'),('P311','DV002'),('P311','DV003'),
('P312','DV001'),('P312','DV002'),('P312','DV003'),
('P321','DV001'),('P321','DV002'),('P321','DV003'),
('P322','DV001'),('P322','DV002'),('P322','DV003'),
('P331','DV001'),('P331','DV002'),('P331','DV003'),
('P332','DV001'),('P332','DV002'),('P332','DV003'),
('P341','DV001'),('P341','DV002'),('P341','DV003'),
('P342','DV001'),('P342','DV002'),('P342','DV003'),
('P351','DV001'),('P351','DV002'),('P351','DV003'),
('P411','DV001'),('P411','DV002'),('P411','DV003'),
('P412','DV001'),('P412','DV002'),('P412','DV003'),
('P421','DV001'),('P421','DV002'),('P421','DV003'),
('P422','DV001'),('P422','DV002'),('P422','DV003'),
('P431','DV001'),('P431','DV002'),('P431','DV003'),
('P432','DV001'),('P432','DV002'),('P432','DV003'),
('P441','DV001'),('P441','DV002'),('P441','DV003'),
('P442','DV001'),('P442','DV002'),('P442','DV003'),
('P451','DV001'),('P451','DV002'),('P451','DV003'),
('P511','DV001'),('P511','DV002'),('P511','DV003'),
('P512','DV001'),('P512','DV002'),('P512','DV003'),
('P521','DV001'),('P521','DV002'),('P521','DV003'),
('P522','DV001'),('P522','DV002'),('P522','DV003'),
('P531','DV001'),('P531','DV002'),('P531','DV003'),
('P532','DV001'),('P532','DV002'),('P532','DV003'),
('P541','DV001'),('P541','DV002'),('P541','DV003'),
('P542','DV001'),('P542','DV002'),('P542','DV003'),
('P551','DV001'),('P551','DV002'),('P551','DV003');

-- =============================================================
-- 17. ĐẶT CỌC ĐÃ DUYỆT, CHƯA LẬP HỢP ĐỒNG
-- (Sale đã thu cọc, quản lý đã xác nhận → sẵn sàng để "Lập hợp đồng")
-- Đây là các đơn cọc APPROVED với MaHopDong = NULL nên trang
-- "Quản lý đặt cọc" sẽ hiển thị nút "Lập hợp đồng".
-- =============================================================
INSERT INTO KHACH_HANG (MaKH, HoTen, GioiTinh, QuocTich, GiayToTuyThan, SDT, Email, NgaySinh, DiaChi) VALUES
('KH200','Nguyễn Thành Đạt','Nam','Việt Nam','038111000200','0931000200','dat.nt@gmail.com','2000-05-12','100 Lê Lợi, Q1'),
('KH201','Trần Khánh Vy',   'Nữ', 'Việt Nam','038111000201','0931000201','vy.tk@gmail.com', '2001-09-08','200 Hai Bà Trưng, Q3'),
('KH202','Phạm Gia Bảo',    'Nam','Việt Nam','038111000202','0931000202','bao.pg@gmail.com','1999-03-20','300 CMT8, Q10'),
('KH203','Lê Thảo My',      'Nữ', 'Việt Nam','038111000203','0931000203','my.lt@gmail.com', '2002-01-15','400 Nguyễn Trãi, Q5'),
('KH204','Võ Minh Quân',    'Nam','Việt Nam','038111000204','0931000204','quan.vm@gmail.com','2000-07-30','500 Cách Mạng Tháng 8, Q3');

-- Phòng/giường riêng cho các đơn cọc này (giữ chỗ RESERVED do đã duyệt cọc)
INSERT INTO PHONG (MaPhong, MaChiNhanh, GiaThue, KhuVuc, Tang, SucChua, TinhTrang, GhiChu) VALUES
('P601','CN001',3000000,'A',6,2,'RESERVED','Đã cọc, chờ lập HĐ'),
('P602','CN001',3500000,'B',6,4,'RESERVED','Đã cọc, chờ lập HĐ'),
('P603','CN002',2800000,'A',6,2,'AVAILABLE','Còn 1 giường trống'),
('P604','CN002',3200000,'B',6,4,'AVAILABLE','Còn giường trống');

INSERT INTO GIUONG (MaGiuong, MaPhong, GiaGiuong, TinhTrang) VALUES
('G601A','P601',1500000,'RESERVED'),('G601B','P601',1500000,'RESERVED'),
('G602A','P602',875000,'RESERVED'), ('G602B','P602',875000,'RESERVED'),('G602C','P602',875000,'RESERVED'),('G602D','P602',875000,'RESERVED'),
('G603A','P603',1400000,'RESERVED'),('G603B','P603',1400000,'AVAILABLE'),
('G604A','P604',800000,'RESERVED'), ('G604B','P604',800000,'AVAILABLE'), ('G604C','P604',800000,'AVAILABLE'),('G604D','P604',800000,'AVAILABLE');

-- DAT_COC: APPROVED + MaHopDong NULL.  Cọc = tiền thuê 2 tháng × số giường.
-- COC061/062: thuê nguyên phòng | COC063/064/065: thuê giường lẻ
INSERT INTO DAT_COC (MaCoc, MaHopDong, MaKH, MaPhong, MaGiuong, NguoiPheDuyet, NgayDatCoc, SoTienCoc, PhuongThucThanhToan, TinhTrang, ThoiGianHetHan, ThoiGianPheDuyet, GhiChu) VALUES
('COC061',NULL,'KH200','P601',NULL,   'NV002', NOW() - INTERVAL '3 days', 6000000, 'BANK_TRANSFER','APPROVED', NOW() - INTERVAL '2 days', NOW() - INTERVAL '2 days','Thuê nguyên phòng P601 (2 giường) — chờ lập HĐ'),
('COC062',NULL,'KH201','P602',NULL,   'NV002', NOW() - INTERVAL '3 days', 7000000, 'CASH',         'APPROVED', NOW() - INTERVAL '2 days', NOW() - INTERVAL '2 days','Thuê nguyên phòng P602 (4 giường) — chờ lập HĐ'),
('COC063',NULL,'KH202','P603','G603A','NV005', NOW() - INTERVAL '3 days', 2800000, 'BANK_TRANSFER','APPROVED', NOW() - INTERVAL '2 days', NOW() - INTERVAL '2 days','Thuê giường G603A — chờ lập HĐ'),
('COC064',NULL,'KH203','P604','G604A','NV005', NOW() - INTERVAL '3 days', 1600000, 'CASH',         'APPROVED', NOW() - INTERVAL '2 days', NOW() - INTERVAL '2 days','Thuê giường G604A — chờ lập HĐ'),
('COC065',NULL,'KH204','P604','G604B','NV002', NOW() - INTERVAL '1 day',  1600000, 'BANK_TRANSFER','APPROVED', NOW(),                      NOW(),                     'Thuê giường G604B — chờ lập HĐ');

-- Thanh toán cọc tương ứng (TinhTrang = SUCCESS để khớp với logic app)
INSERT INTO THANH_TOAN (MaThanhToan, MaHopDong, MaCoc, SoTien, PhuongThuc, NgayThanhToan, LoaiThanhToan, TinhTrang, GhiChu, MaSoChungTu) VALUES
('TTA01',NULL,'COC061',6000000,'BANK_TRANSFER',NOW() - INTERVAL '2 days','DEPOSIT','SUCCESS','Thu cọc COC061','CTA20250001'),
('TTA02',NULL,'COC062',7000000,'CASH',         NOW() - INTERVAL '2 days','DEPOSIT','SUCCESS','Thu cọc COC062','CTA20250002'),
('TTA03',NULL,'COC063',2800000,'BANK_TRANSFER',NOW() - INTERVAL '2 days','DEPOSIT','SUCCESS','Thu cọc COC063','CTA20250003'),
('TTA04',NULL,'COC064',1600000,'CASH',         NOW() - INTERVAL '2 days','DEPOSIT','SUCCESS','Thu cọc COC064','CTA20250004'),
('TTA05',NULL,'COC065',1600000,'BANK_TRANSFER',NOW(),                     'DEPOSIT','SUCCESS','Thu cọc COC065','CTA20250005');

-- G604B chuyển sang RESERVED do COC065 đã duyệt
UPDATE GIUONG SET TinhTrang = 'RESERVED' WHERE MaGiuong = 'G604B';

-- =============================================================
-- 18. CHUẨN HÓA TÊN KHÁCH HÀNG
-- Tên sinh tự động khó nghe + cứng nhắc (nữ luôn "Thị", nam luôn "Văn").
-- Thay bằng tên Việt Nam tự nhiên, chữ đệm đa dạng, gán đúng theo giới tính.
-- Bỏ qua KH001-005 (khách gốc) và khách quốc tịch nước ngoài (KH051-056).
-- =============================================================
DO $$
DECLARE
  male TEXT[] := ARRAY[
    'Nguyễn Minh Quân','Trần Gia Bảo','Lê Hoàng Long','Phạm Anh Khoa','Hoàng Đức Duy',
    'Phan Quốc Hưng','Vũ Tuấn Kiệt','Đặng Hải Đăng','Bùi Nhật Nam','Đỗ Thành Đạt',
    'Hồ Đình Phúc','Ngô Bá Khang','Dương Công Minh','Đinh Hữu Thắng','Mai Xuân Trường',
    'Trịnh Việt Hoàng','Lương Thái Sơn','Cao Mạnh Cường','Tô Chí Dũng','Hà Trọng Nghĩa',
    'Lý Phú Quý','Vương Tấn Tài','Nguyễn Khánh Hòa','Trần Duy Khánh','Lê Bảo Lâm',
    'Phạm Hoàng Phong','Hoàng Gia Huy','Phan Minh Triết','Vũ Đức Anh','Đặng Quang Vinh',
    'Bùi Nhật Tân','Đỗ Trung Kiên','Hồ Anh Tú','Ngô Quốc Bảo','Dương Hữu Lộc',
    'Đinh Thành Trung','Mai Hoàng Sơn','Trịnh Đăng Khoa','Nguyễn Tiến Dũng','Trần Hồng Phúc',
    'Phạm Quốc Việt','Hoàng Minh Hiếu','Vũ Bá Đạt','Đặng Hoàng Nam','Bùi Gia Khải',
    'Đỗ Nhật Minh','Phan Tuấn Anh','Lê Khắc Huy','Nguyễn Hoàng Việt','Trần Thanh Tùng'
  ];
  female TEXT[] := ARRAY[
    'Nguyễn Ngọc Hân','Trần Thùy Dương','Lê Phương Anh','Phạm Khánh Linh','Hoàng Mai Anh',
    'Phan Thu Trang','Vũ Diệu Linh','Đặng Hà My','Bùi Bảo Ngọc','Đỗ Quỳnh Như',
    'Hồ Gia Hân','Ngô Yến Nhi','Dương Hồng Ngọc','Đinh Tường Vy','Mai Thảo Vy',
    'Trịnh Cát Tường','Lương Nhã Phương','Cao Hải Yến','Tô Kim Ngân','Hà Bích Phương',
    'Lý Mỹ Duyên','Vương Thanh Trúc','Nguyễn Hoài An','Trần Khánh Vân','Lê Ngọc Mai',
    'Phạm Thùy Linh','Hoàng Phương Thảo','Phan Diễm Quỳnh','Vũ Hương Giang','Đặng Bảo Trâm',
    'Bùi Thu Hà','Đỗ Quỳnh Anh','Hồ Lan Anh','Ngô Tuyết Nhi','Dương Mỹ Linh',
    'Đinh Hồng Nhung','Mai Ngọc Lan','Trịnh Thảo Nguyên','Nguyễn Hà Phương','Trần Bích Ngọc',
    'Phạm Yến Vy','Hoàng Minh Thư','Vũ Kiều Trang','Đặng Hoài Thương','Bùi Gia Linh',
    'Đỗ Nhật Lệ','Phan Tú Anh','Lê Thanh Tâm','Nguyễn Cẩm Tú','Trần Mỹ Hạnh'
  ];
  r RECORD;
  mi INT := 1;
  fi INT := 1;
BEGIN
  FOR r IN SELECT MaKH, GioiTinh FROM KHACH_HANG
           WHERE QuocTich = 'Việt Nam' AND MaKH > 'KH005' ORDER BY MaKH LOOP
    IF r.GioiTinh = 'Nam' THEN
      UPDATE KHACH_HANG SET HoTen = male[((mi - 1) % array_length(male, 1)) + 1] WHERE MaKH = r.MaKH;
      mi := mi + 1;
    ELSE
      UPDATE KHACH_HANG SET HoTen = female[((fi - 1) % array_length(female, 1)) + 1] WHERE MaKH = r.MaKH;
      fi := fi + 1;
    END IF;
  END LOOP;
END $$;

-- Đồng bộ lại tên các nhóm đặt theo tên đại diện (nếu có)
UPDATE NHOM n SET TenNhom = 'Nhóm ' || k.HoTen
FROM KHACH_HANG k
WHERE n.MaDaiDien = k.MaKH AND n.TenNhom LIKE 'Nhóm %';

-- =============================================================
-- 19. GẮN NHÓM CHO MỌI HỢP ĐỒNG CHƯA CÓ NHÓM
-- Tránh cột "Khách" bị rỗng ở danh sách hợp đồng / thu kỳ đầu / trả phòng.
-- Đại diện nhóm = khách thuê trong hợp đồng (chi tiết thuê hoặc đơn cọc).
-- =============================================================
DO $$
DECLARE
  r RECORD;
  rep VARCHAR(20);
  gid VARCHAR(20);
  i INT := 100;
BEGIN
  FOR r IN SELECT MaHopDong FROM HOP_DONG_THUE_NHA WHERE MaNhom IS NULL ORDER BY MaHopDong LOOP
    rep := NULL;
    SELECT MaKH INTO rep FROM CHI_TIET_THUE WHERE MaHopDong = r.MaHopDong AND MaKH IS NOT NULL LIMIT 1;
    IF rep IS NULL THEN
      SELECT MaKH INTO rep FROM DAT_COC WHERE MaHopDong = r.MaHopDong AND MaKH IS NOT NULL LIMIT 1;
    END IF;
    IF rep IS NULL THEN
      SELECT MaKH INTO rep FROM KHACH_HANG ORDER BY MaKH LIMIT 1;
    END IF;

    gid := 'NHOA' || i;
    INSERT INTO NHOM (MaNhom, TenNhom, MaDaiDien, MaHopDong, TrangThai)
      VALUES (gid, 'Nhóm ' || (SELECT HoTen FROM KHACH_HANG WHERE MaKH = rep), rep, r.MaHopDong, 'ACTIVE');
    INSERT INTO THANHVIEN_NHOM (MaNhom, MaKH, TrangThai)
      VALUES (gid, rep, 'APPROVED') ON CONFLICT DO NOTHING;
    UPDATE HOP_DONG_THUE_NHA SET MaNhom = gid WHERE MaHopDong = r.MaHopDong;
    i := i + 1;
  END LOOP;
END $$;

-- =============================================================
-- Done – seed-augmented.sql executed successfully
-- =============================================================
