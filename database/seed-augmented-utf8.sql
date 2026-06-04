-- =============================================================
-- HomeStay Dorm System 鈥?AUGMENTED SEED DATA
-- Run AFTER init.sql (which already created tables + base data)
-- This file only INSERTs additional rows; no DROP/CREATE/ALTER.
-- =============================================================
SET client_encoding = 'UTF8';

-- =============================================================
-- 1. CHI_NHANH  (th锚m 3, t峄昻g = 5)
-- =============================================================
INSERT INTO CHI_NHANH (MaChiNhanh, TenChiNhanh, DiaChi, SDT, Email) VALUES
('CN003', 'HomeStay Dorm B矛nh Th岷h', '88 X么 Vi岷縯 Ngh峄?T末nh, Ph瓢峄漬g 19, B矛nh Th岷h, TP.HCM', '0283334455', 'binhthanh@homestay.vn'),
('CN004', 'HomeStay Dorm G貌 V岷',    '210 Nguy峄卬 V膬n Nghi, Ph瓢峄漬g 7, G貌 V岷, TP.HCM',        '0285556677', 'govap@homestay.vn'),
('CN005', 'HomeStay Dorm T芒n B矛nh',   '55 Ho脿ng V膬n Th峄? Ph瓢峄漬g 8, T芒n B矛nh, TP.HCM',         '0287778899', 'tanbinh@homestay.vn');

-- =============================================================
-- 2. PHONG  (th锚m 42 ph貌ng 鈫?t峄昻g 鈮?50)
-- Quy 瓢峄沜: PX_KkTtSs  (X=s峄?CN, K=khu, t=t岷g, S=s峄?ph貌ng)
-- CN001: P1xx, CN002: P2xx, CN003: P3xx, CN004: P4xx, CN005: P5xx
-- Khu A=2-person, B=4-person, C=6-person
-- =============================================================
INSERT INTO PHONG (MaPhong, MaChiNhanh, GiaThue, KhuVuc, Tang, SucChua, TinhTrang, GhiChu) VALUES
-- CN001 th锚m
('P111', 'CN001', 2600000, 'A', 1, 2, 'AVAILABLE',   'Ph貌ng 膽么i t岷g 1 khu A'),
('P112', 'CN001', 2600000, 'A', 1, 2, 'OCCUPIED',    'Ph貌ng 膽么i 膽ang thu锚'),
('P121', 'CN001', 3200000, 'A', 2, 4, 'AVAILABLE',   'Ph貌ng 4 gi瓢峄漬g t岷g 2'),
('P122', 'CN001', 3200000, 'A', 2, 4, 'PENDING',     'Ch峄?x谩c nh岷璶 c峄峜'),
('P131', 'CN001', 4200000, 'B', 3, 4, 'AVAILABLE',   'Ph貌ng B t岷g 3'),
('P132', 'CN001', 4200000, 'B', 3, 4, 'RESERVED',    '膼茫 膽岷穞 tr瓢峄沜'),
('P141', 'CN001', 5000000, 'C', 4, 6, 'AVAILABLE',   'Ph貌ng C l峄沶 t岷g 4'),
('P142', 'CN001', 5000000, 'C', 4, 6, 'OCCUPIED',    '膼ang c贸 6 sinh vi锚n'),
('P151', 'CN001', 5000000, 'C', 5, 6, 'MAINTENANCE', 'S啤n l岷 t瓢峄漬g'),
-- CN002 th锚m
('P211', 'CN002', 2800000, 'A', 1, 2, 'AVAILABLE',   'Ph貌ng 膽么i t岷g 1'),
('P212', 'CN002', 2800000, 'A', 1, 2, 'AVAILABLE',   'Ph貌ng 膽么i view 膽瓢峄漬g'),
('P221', 'CN002', 3400000, 'B', 2, 4, 'OCCUPIED',    '膼ang c贸 kh谩ch'),
('P222', 'CN002', 3400000, 'B', 2, 4, 'AVAILABLE',   'Ph貌ng tr峄憂g'),
('P231', 'CN002', 3400000, 'B', 3, 4, 'RESERVED',    'C峄峜 膽茫 duy峄噒'),
('P241', 'CN002', 4800000, 'C', 4, 6, 'AVAILABLE',   'Ph貌ng l峄沶'),
-- CN003 (9 ph貌ng m峄沬)
('P311', 'CN003', 2500000, 'A', 1, 2, 'AVAILABLE',   'Ph貌ng 膽么i BT'),
('P312', 'CN003', 2500000, 'A', 1, 2, 'OCCUPIED',    'C贸 ng瓢峄漣 thu锚'),
('P321', 'CN003', 3100000, 'A', 2, 4, 'AVAILABLE',   'Ph貌ng 4 gi瓢峄漬g BT'),
('P322', 'CN003', 3100000, 'A', 2, 4, 'PENDING',     'Ch峄?c峄峜'),
('P331', 'CN003', 4100000, 'B', 3, 4, 'AVAILABLE',   'Ph貌ng B t岷g 3'),
('P332', 'CN003', 4100000, 'B', 3, 4, 'RESERVED',    '膼茫 膽岷穞 tr瓢峄沜'),
('P341', 'CN003', 4900000, 'C', 4, 6, 'AVAILABLE',   'Ph貌ng C l峄沶'),
('P342', 'CN003', 4900000, 'C', 4, 6, 'OCCUPIED',    '膼ang thu锚'),
('P351', 'CN003', 4900000, 'C', 5, 6, 'MAINTENANCE', 'B岷 tr矛 峄憂g n瓢峄沜'),
-- CN004 (9 ph貌ng)
('P411', 'CN004', 2700000, 'A', 1, 2, 'AVAILABLE',   'Ph貌ng 膽么i GV'),
('P412', 'CN004', 2700000, 'A', 1, 2, 'AVAILABLE',   'Ph貌ng 膽么i m峄沬'),
('P421', 'CN004', 3300000, 'A', 2, 4, 'OCCUPIED',    'C贸 4 sinh vi锚n'),
('P422', 'CN004', 3300000, 'A', 2, 4, 'AVAILABLE',   'Ph貌ng tr峄憂g'),
('P431', 'CN004', 4300000, 'B', 3, 4, 'RESERVED',    '膼茫 c峄峜'),
('P432', 'CN004', 4300000, 'B', 3, 4, 'AVAILABLE',   'S岷祅 s脿ng'),
('P441', 'CN004', 5100000, 'C', 4, 6, 'AVAILABLE',   'Ph貌ng l峄沶 GV'),
('P442', 'CN004', 5100000, 'C', 4, 6, 'OCCUPIED',    '膼ang thu锚 GV'),
('P451', 'CN004', 5100000, 'C', 5, 6, 'MAINTENANCE', 'S峄璦 膽i峄乽 h貌a'),
-- CN005 (9 ph貌ng)
('P511', 'CN005', 2900000, 'A', 1, 2, 'AVAILABLE',   'Ph貌ng 膽么i TB'),
('P512', 'CN005', 2900000, 'A', 1, 2, 'OCCUPIED',    'C贸 ng瓢峄漣 thu锚 TB'),
('P521', 'CN005', 3500000, 'B', 2, 4, 'AVAILABLE',   'Ph貌ng 4G TB'),
('P522', 'CN005', 3500000, 'B', 2, 4, 'PENDING',     'Ch峄?x谩c nh岷璶'),
('P531', 'CN005', 4500000, 'B', 3, 4, 'AVAILABLE',   'T岷g 3 TB'),
('P532', 'CN005', 4500000, 'B', 3, 4, 'RESERVED',    '膼岷穞 tr瓢峄沜'),
('P541', 'CN005', 5200000, 'C', 4, 6, 'AVAILABLE',   'Ph貌ng l峄沶 TB'),
('P542', 'CN005', 5200000, 'C', 4, 6, 'OCCUPIED',    '膼ang thu锚'),
('P551', 'CN005', 5200000, 'C', 5, 6, 'AVAILABLE',   'T岷g 5 view 膽岷筽');

-- =============================================================
-- 3. GIUONG  (th锚m gi瓢峄漬g cho 42 ph貌ng m峄沬)
-- Ph貌ng SucChua=2 鈫?2 gi瓢峄漬g, SucChua=4 鈫?4 gi瓢峄漬g, SucChua=6 鈫?6 gi瓢峄漬g
-- =============================================================
INSERT INTO GIUONG (MaGiuong, MaPhong, GiaGiuong, TinhTrang) VALUES
-- CN001 ph貌ng m峄沬
('G111A','P111',1300000,'AVAILABLE'),('G111B','P111',1300000,'AVAILABLE'),
('G112A','P112',1300000,'OCCUPIED'), ('G112B','P112',1300000,'OCCUPIED'),
('G121A','P121',800000, 'AVAILABLE'),('G121B','P121',800000, 'AVAILABLE'),('G121C','P121',800000,'AVAILABLE'),('G121D','P121',800000,'AVAILABLE'),
('G122A','P122',800000, 'PENDING'),  ('G122B','P122',800000, 'AVAILABLE'),('G122C','P122',800000,'AVAILABLE'),('G122D','P122',800000,'AVAILABLE'),
('G131A','P131',1050000,'AVAILABLE'),('G131B','P131',1050000,'AVAILABLE'),('G131C','P131',1050000,'AVAILABLE'),('G131D','P131',1050000,'AVAILABLE'),
('G132A','P132',1050000,'RESERVED'), ('G132B','P132',1050000,'RESERVED'), ('G132C','P132',1050000,'RESERVED'), ('G132D','P132',1050000,'AVAILABLE'),
('G141A','P141',833000, 'AVAILABLE'),('G141B','P141',833000, 'AVAILABLE'),('G141C','P141',833000,'AVAILABLE'),('G141D','P141',833000,'AVAILABLE'),('G141E','P141',833000,'AVAILABLE'),('G141F','P141',833000,'AVAILABLE'),
('G142A','P142',833000, 'OCCUPIED'), ('G142B','P142',833000, 'OCCUPIED'), ('G142C','P142',833000,'OCCUPIED'), ('G142D','P142',833000,'OCCUPIED'), ('G142E','P142',833000,'OCCUPIED'), ('G142F','P142',833000,'OCCUPIED'),
('G151A','P151',833000, 'AVAILABLE'),('G151B','P151',833000, 'AVAILABLE'),('G151C','P151',833000,'AVAILABLE'),('G151D','P151',833000,'AVAILABLE'),('G151E','P151',833000,'AVAILABLE'),('G151F','P151',833000,'AVAILABLE'),
-- CN002 ph貌ng m峄沬
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
-- 4. KHACH_HANG  (th锚m 95 鈫?t峄昻g = 100)
-- =============================================================
INSERT INTO KHACH_HANG (MaKH, HoTen, GioiTinh, QuocTich, GiayToTuyThan, SDT, Email, NgaySinh, DiaChi) VALUES
('KH006','V农 Th峄?Ph瓢啤ng',       'N峄?, 'Vi峄噒 Nam',  '038111000006','0906000006','vuphuong@gmail.com',     '1999-02-14','15 Phan 膼矛nh Ph霉ng, Ph煤 Nhu岷璶'),
('KH007','膼岷穘g Minh Tu岷',      'Nam','Vi峄噒 Nam',  '038111000007','0907000007','dangminhtuan@gmail.com', '1998-06-25','20 L媒 Th瓢峄漬g Ki峄噒, Q10'),
('KH008','B霉i Th峄?Lan',         'N峄?, 'Vi峄噒 Nam',  '038111000008','0908000008','builanhoa@gmail.com',    '2000-11-03','5 B霉i Th峄?Xu芒n, Q1'),
('KH009','Tr峄媙h V膬n H岷',       'Nam','Vi峄噒 Nam',  '038111000009','0909000009','trinhvanhai@gmail.com',  '1997-04-18','30 膼inh B峄?L末nh, BT'),
('KH010','Ng么 Th峄?Thu',         'N峄?, 'Vi峄噒 Nam',  '038111000010','0910000010','ngothithu@gmail.com',    '2001-08-07','88 CMT8, Q3'),
('KH011','L瓢啤ng V膬n 膼峄ヽ',       'Nam','Vi峄噒 Nam',  '038111000011','0911000011','luongvanduc@gmail.com',  '1996-12-30','12 K峄?膼峄搉g, Q3'),
('KH012','H峄?Th峄?Mai',          'N峄?, 'Vi峄噒 Nam',  '038111000012','0912000012','hothimai@gmail.com',     '2000-03-21','7 Tr岷 Quang Kh岷, Q1'),
('KH013','Phan V膬n Long',       'Nam','Vi峄噒 Nam',  '038111000013','0913000013','phanvanlong@gmail.com',  '1999-07-15','45 Nguy峄卬 B峄塶h Khi锚m, Q1'),
('KH014','Cao Th峄?H瓢啤ng',       'N峄?, 'Vi峄噒 Nam',  '038111000014','0914000014','caohthhuong@gmail.com',  '1998-05-09','22 Phan X铆ch Long, PN'),
('KH015','膼inh V膬n Nam',        'Nam','Vi峄噒 Nam',  '038111000015','0915000015','dinhvannam@gmail.com',   '2001-01-28','56 Nguy峄卬 Th谩i B矛nh, Q1'),
('KH016','L锚 Th峄?H岷眓g',         'N峄?, 'Vi峄噒 Nam',  '038111000016','0916000016','lethihang@gmail.com',   '1997-09-11','10 Ng么 膼峄ヽ K岷? Q1'),
('KH017','Nguy峄卬 V膬n B矛nh',     'Nam','Vi峄噒 Nam',  '038111000017','0917000017','nguyenvanbinh@gmail.com','2000-04-05','33 Tr岷 H瓢ng 膼岷, Q5'),
('KH018','Tr岷 Th峄?C煤c',        'N峄?, 'Vi峄噒 Nam',  '038111000018','0918000018','tranthicuc@gmail.com',   '1999-10-17','77 膼i峄噉 Bi锚n Ph峄? BT'),
('KH019','Ph岷 V膬n T霉ng',       'Nam','Vi峄噒 Nam',  '038111000019','0919000019','phamvantung@gmail.com',  '1998-08-22','19 B脿 Huy峄噉 Thanh Quan, Q3'),
('KH020','Ho脿ng Th峄?Nga',       'N峄?, 'Vi峄噒 Nam',  '038111000020','0920000020','hoangthinga@gmail.com',  '2001-06-14','60 S瓢 V岷 H岷h, Q10'),
('KH021','膼峄?V膬n Ki锚n',         'Nam','Vi峄噒 Nam',  '038111000021','0921000021','dovankien@gmail.com',    '1997-02-03','8 Nguy峄卬 Th峄?Minh Khai, Q1'),
('KH022','V玫 Th峄?Y岷縩',          'N峄?, 'Vi峄噒 Nam',  '038111000022','0922000022','vothiyen@gmail.com',     '2000-12-25','14 L锚 V膬n S峄? Q3'),
('KH023','T岷?V膬n H霉ng',         'Nam','Vi峄噒 Nam',  '038111000023','0923000023','tavanhung@gmail.com',    '1996-07-08','25 Nguy峄卬 膼矛nh Chi峄僽, Q3'),
('KH024','Mai Th峄?Loan',        'N峄?, 'Vi峄噒 Nam',  '038111000024','0924000024','maithiloan@gmail.com',   '1999-05-19','3 Ho脿ng Di峄噓, Q4'),
('KH025','Chu V膬n Th岷痭g',       'Nam','Vi峄噒 Nam',  '038111000025','0925000025','chuvanThang@gmail.com',  '2001-11-30','71 L锚 Du岷﹏, Q1'),
('KH026','L瓢u Th峄?H岷h',        'N峄?, 'Vi峄噒 Nam',  '038111000026','0926000026','luuthihanh@gmail.com',   '1998-03-07','40 Nguy峄卬 Ch铆 Thanh, Q5'),
('KH027','M岷 V膬n Hi岷縰',        'Nam','Vi峄噒 Nam',  '038111000027','0927000027','macvanhieu@gmail.com',   '1997-01-15','55 T么 Hi岷縩 Th脿nh, Q10'),
('KH028','Tr瓢啤ng Th峄?Li锚n',     'N峄?, 'Vi峄噒 Nam',  '038111000028','0928000028','truongthilien@gmail.com','2000-07-28','16 B岷h 膼岷眓g, T芒n B矛nh'),
('KH029','L媒 V膬n Qu芒n',         'Nam','Vi峄噒 Nam',  '038111000029','0929000029','lyvanquan@gmail.com',    '1999-09-04','9 Phan Chu Trinh, Q1'),
('KH030','D瓢啤ng Th峄?Th岷',      'N峄?, 'Vi峄噒 Nam',  '038111000030','0930000030','duongthithao@gmail.com', '2001-03-16','28 C峄憂g Qu峄硁h, Q1'),
('KH031','Kh峄昻g V膬n T脿i',       'Nam','Vi峄噒 Nam',  '038111000031','0931000031','khongvantai@gmail.com',  '1996-11-02','62 Ng么 Th峄漣 Nhi峄噈, Q3'),
('KH032','T么n Th峄?H脿',          'N峄?, 'Vi峄噒 Nam',  '038111000032','0932000032','tonthiha@gmail.com',     '2000-08-23','11 Hai B脿 Tr瓢ng, Q1'),
('KH033','脭ng V膬n Ph煤',         'Nam','Vi峄噒 Nam',  '038111000033','0933000033','ongvanphu@gmail.com',    '1998-04-12','37 L锚 L峄, Q1'),
('KH034','T峄?Th峄?Nguy峄噒',       'N峄?, 'Vi峄噒 Nam',  '038111000034','0934000034','tuthinguyet@gmail.com',  '1999-06-27','83 B霉i Vi峄噉, Q1'),
('KH035','Th谩i V膬n D农ng',       'Nam','Vi峄噒 Nam',  '038111000035','0935000035','thaivandung@gmail.com',  '1997-10-09','47 Tr岷 Ph煤, Q5'),
('KH036','Gi谩p Th峄?Nhung',      'N峄?, 'Vi峄噒 Nam',  '038111000036','0936000036','giapthinung@gmail.com',  '2001-02-18','19 H峄?Xu芒n H瓢啤ng, Q3'),
('KH037','V瓢啤ng V膬n 膼岷',       'Nam','Vi峄噒 Nam',  '038111000037','0937000037','vuongvandat@gmail.com',  '2000-05-31','66 Nguy峄卬 Th峄?Nh峄? Q11'),
('KH038','B脿nh Th峄?Lan',        'N峄?, 'Vi峄噒 Nam',  '038111000038','0938000038','banthilan@gmail.com',    '1998-09-14','72 Ph岷 Vi岷縯 Ch谩nh, BT'),
('KH039','C霉 V膬n Minh',         'Nam','Vi峄噒 Nam',  '038111000039','0939000039','cuvanminh@gmail.com',    '1997-07-21','34 Tr岷 Qu峄慶 Th岷, Q3'),
('KH040','Li锚u Th峄?Tr脿',        'N峄?, 'Vi峄噒 Nam',  '038111000040','0940000040','lieuthitra@gmail.com',   '2000-01-06','5 Y锚n Th岷? T芒n B矛nh'),
('KH041','Th岷h V膬n H貌a',       'Nam','Vi峄噒 Nam',  '038111000041','0941000041','thachvanhoa@gmail.com',  '1999-11-25','48 Ho脿ng Sa, Q1'),
('KH042','S啤n Th峄?B铆ch',        'N峄?, 'Vi峄噒 Nam',  '038111000042','0942000042','sonthibich@gmail.com',   '2001-04-08','21 Tr岷 N茫o, Q2'),
('KH043','Hu峄硁h V膬n Khoa',      'Nam','Vi峄噒 Nam',  '038111000043','0943000043','huynhvankhoa@gmail.com', '1996-08-17','99 膼inh Ti锚n Ho脿ng, Q1'),
('KH044','La Th峄?Kim',          'N峄?, 'Vi峄噒 Nam',  '038111000044','0944000044','lathikim@gmail.com',     '2000-06-02','26 V玫 V膬n T岷, Q3'),
('KH045','D瓢 V膬n Phong',        'Nam','Vi峄噒 Nam',  '038111000045','0945000045','duvanphong@gmail.com',   '1998-12-11','13 M岷 膼末nh Chi, Q1'),
('KH046','Ti锚u Th峄?Linh',       'N峄?, 'Vi峄噒 Nam',  '038111000046','0946000046','tiealthiLinh@gmail.com', '1999-03-29','58 Nguy峄卬 膼矛nh Kh啤i, TB'),
('KH047','Kh瓢u V膬n H岷璾',        'Nam','Vi峄噒 Nam',  '038111000047','0947000047','khuuvanhau@gmail.com',   '1997-05-06','44 C谩ch M岷g Th谩ng 8, Q3'),
('KH048','Nguy峄卬 Th峄?Ph煤c',     'N峄?, 'Vi峄噒 Nam',  '038111000048','0948000048','nguyenthiphuc@gmail.com','2001-07-19','30 膼峄搉g Kh峄焛, Q1'),
('KH049','膼o脿n V膬n L峄',        'Nam','Vi峄噒 Nam',  '038111000049','0949000049','doanvanloi@gmail.com',   '2000-09-13','17 L锚 Qu媒 膼么n, Q3'),
('KH050','Ch芒u Th峄?Thanh',      'N峄?, 'Vi峄噒 Nam',  '038111000050','0950000050','chauthithanh@gmail.com', '1998-01-24','82 Pasteur, Q1'),
-- 51鈥?0: sinh vi锚n n瓢峄沜 ngo脿i (膽a d岷g qu峄慶 t峄媍h)
('KH051','Zhang Wei',            'Nam','Trung Qu峄慶','X90100000051', '0951000051','zhangwei@qq.com',        '1999-04-15','鈥?),
('KH052','Li Na',                'N峄?, 'Trung Qu峄慶','X90100000052', '0952000052','lina@qq.com',            '2000-08-20','鈥?),
('KH053','Tanaka Hiroshi',       'Nam','Nh岷璽 B岷',  'JP10000000053','0953000053','tanaka@gmail.com',       '1998-02-28','鈥?),
('KH054','Yamamoto Yuki',        'N峄?, 'Nh岷璽 B岷',  'JP10000000054','0954000054','yamamoto@gmail.com',    '2001-11-05','鈥?),
('KH055','Kim Min-jun',          'Nam','H脿n Qu峄慶',  'KR10000000055','0955000055','kimmin@naver.com',       '1997-06-17','鈥?),
('KH056','Park Ji-yeon',         'N峄?, 'H脿n Qu峄慶',  'KR10000000056','0956000056','parkjy@naver.com',      '2000-10-09','鈥?),
('KH057','Nguyen Van Kiet',      'Nam','Vi峄噒 Nam',  '038111000057','0957000057','kietnv@gmail.com',       '1999-07-22','H脿 N峄檌'),
('KH058','Le Thi Bao Tran',      'N峄?, 'Vi峄噒 Nam',  '038111000058','0958000058','tranltb@gmail.com',      '2001-03-14','膼脿 N岷祅g'),
('KH059','Pham Van Nghia',       'Nam','Vi峄噒 Nam',  '038111000059','0959000059','nghiapv@gmail.com',      '1998-09-30','C岷 Th啤'),
('KH060','Tran Thi Quynh',       'N峄?, 'Vi峄噒 Nam',  '038111000060','0960000060','quynhtt@gmail.com',      '2000-05-26','H岷 Ph貌ng'),
('KH061','Hoang Van Phuc',       'Nam','Vi峄噒 Nam',  '038111000061','0961000061','phuchv@gmail.com',       '1997-12-08','Hu岷?),
('KH062','Do Thi Ngoc',          'N峄?, 'Vi峄噒 Nam',  '038111000062','0962000062','ngocdt@gmail.com',       '2001-01-19','Nha Trang'),
('KH063','Vo Van Tai',           'Nam','Vi峄噒 Nam',  '038111000063','0963000063','taivv@gmail.com',        '1999-08-04','B矛nh D瓢啤ng'),
('KH064','Bui Thi Kim Anh',      'N峄?, 'Vi峄噒 Nam',  '038111000064','0964000064','kimanhbtk@gmail.com',   '2000-02-11','膼峄搉g Nai'),
('KH065','Dang Van Vinh',        'Nam','Vi峄噒 Nam',  '038111000065','0965000065','vinhdv@gmail.com',       '1998-06-29','V农ng T脿u'),
('KH066','Nguyen Thi Kieu',      'N峄?, 'Vi峄噒 Nam',  '038111000066','0966000066','kieunt@gmail.com',       '2001-04-03','Long An'),
('KH067','Tran Van Lam',         'Nam','Vi峄噒 Nam',  '038111000067','0967000067','lamtv@gmail.com',        '1996-10-21','Ti峄乶 Giang'),
('KH068','Le Van Cuong',         'Nam','Vi峄噒 Nam',  '038111000068','0968000068','cuonglv@gmail.com',      '1999-09-16','B岷縩 Tre'),
('KH069','Pham Thi Diem',        'N峄?, 'Vi峄噒 Nam',  '038111000069','0969000069','diempt@gmail.com',       '2000-07-07','S贸c Tr膬ng'),
('KH070','Hoang Thi Bich Ngoc',  'N峄?, 'Vi峄噒 Nam',  '038111000070','0970000070','ngochbt@gmail.com',      '1998-11-13','Ki锚n Giang'),
-- 71鈥?00: h峄梟 h峄 th锚m
('KH071','膼脿o V膬n Tr峄峮g',        'Nam','Vi峄噒 Nam',  '038111000071','0971000071','trongdv@gmail.com',      '1997-03-27','TP.HCM'),
('KH072','Nh峄?Th峄?Th峄',         'N峄?, 'Vi峄噒 Nam',  '038111000072','0972000072','thuynt@gmail.com',       '2000-06-18','TP.HCM'),
('KH073','Qu谩ch V膬n H岷',        'Nam','Vi峄噒 Nam',  '038111000073','0973000073','haiqv@gmail.com',        '1999-02-05','TP.HCM'),
('KH074','U么ng Th峄?Nhi',         'N峄?, 'Vi峄噒 Nam',  '038111000074','0974000074','nhiut@gmail.com',        '2001-05-14','TP.HCM'),
('KH075','Y锚n V膬n T芒m',          'Nam','Vi峄噒 Nam',  '038111000075','0975000075','tamyv@gmail.com',        '1998-08-31','TP.HCM'),
('KH076','膼i峄乶 Th峄?脕nh',         'N峄?, 'Vi峄噒 Nam',  '038111000076','0976000076','anhdt@gmail.com',        '2000-01-22','TP.HCM'),
('KH077','Khu岷 V膬n L峄檆',        'Nam','Vi峄噒 Nam',  '038111000077','0977000077','lockv@gmail.com',        '1997-07-09','TP.HCM'),
('KH078','脥ch Th峄?Hi峄乶',         'N峄?, 'Vi峄噒 Nam',  '038111000078','0978000078','hien78@gmail.com',       '2001-10-26','TP.HCM'),
('KH079','T脿o V膬n C岷h',         'Nam','Vi峄噒 Nam',  '038111000079','0979000079','canhTv@gmail.com',       '1996-04-03','TP.HCM'),
('KH080','脗n Th峄?Giang',         'N峄?, 'Vi峄噒 Nam',  '038111000080','0980000080','giangat@gmail.com',      '2000-09-19','TP.HCM'),
('KH081','Bi峄噉 V膬n S啤n',         'Nam','Vi峄噒 Nam',  '038111000081','0981000081','sonbv@gmail.com',        '1999-12-12','TP.HCM'),
('KH082','C岷h Th峄?Nh脿n',        'N峄?, 'Vi峄噒 Nam',  '038111000082','0982000082','nhanct@gmail.com',       '2001-08-05','TP.HCM'),
('KH083','膼岷穋 V膬n H瓢ng',         'Nam','Vi峄噒 Nam',  '038111000083','0983000083','hungdv83@gmail.com',     '1997-06-28','TP.HCM'),
('KH084','岷?Th峄?Ph瓢峄g',         'N峄?, 'Vi峄噒 Nam',  '038111000084','0984000084','phuonget@gmail.com',     '2000-03-09','TP.HCM'),
('KH085','Giang V膬n T铆n',        'Nam','Vi峄噒 Nam',  '038111000085','0985000085','tingv@gmail.com',        '1998-07-16','TP.HCM'),
('KH086','H峄゛ Th峄?M峄?Linh',      'N峄?, 'Vi峄噒 Nam',  '038111000086','0986000086','linhhtm@gmail.com',      '2001-02-23','TP.HCM'),
('KH087','脥ch V膬n D瓢啤ng',         'Nam','Vi峄噒 Nam',  '038111000087','0987000087','duongiv@gmail.com',      '1997-11-07','TP.HCM'),
('KH088','Ki峄乽 Th峄?Ph瓢啤ng Anh',   'N峄?, 'Vi峄噒 Nam',  '038111000088','0988000088','anhktp@gmail.com',       '2000-04-30','TP.HCM'),
('KH089','Linh V膬n Kha',          'Nam','Vi峄噒 Nam',  '038111000089','0989000089','khalv@gmail.com',        '1999-08-13','TP.HCM'),
('KH090','M岷玭 Th峄?Hoa',           'N峄?, 'Vi峄噒 Nam',  '038111000090','0990000090','hoamt@gmail.com',        '1998-01-01','TP.HCM'),
('KH091','Nhan V膬n Long',          'Nam','Vi峄噒 Nam',  '038111000091','0991000091','longnv91@gmail.com',    '2001-06-06','TP.HCM'),
('KH092','Oanh Th峄?Thu',           'N峄?, 'Vi峄噒 Nam',  '038111000092','0992000092','thuot@gmail.com',       '1997-09-24','TP.HCM'),
('KH093','Phe V膬n Hi峄噋',           'Nam','Vi峄噒 Nam',  '038111000093','0993000093','hieppv@gmail.com',      '2000-11-17','TP.HCM'),
('KH094','Qu岷?Th峄?Kim Chi',        'N峄?, 'Vi峄噒 Nam',  '038111000094','0994000094','chiqtk@gmail.com',      '1999-05-08','TP.HCM'),
('KH095','R岷g V膬n T煤',            'Nam','Vi峄噒 Nam',  '038111000095','0995000095','turv@gmail.com',        '1996-03-15','TP.HCM'),
('KH096','S谩ng Th峄?V芒n',           'N峄?, 'Vi峄噒 Nam',  '038111000096','0996000096','vanst@gmail.com',       '2001-07-29','TP.HCM'),
('KH097','T瓢峄沜 V膬n Minh',          'Nam','Vi峄噒 Nam',  '038111000097','0997000097','minhtv97@gmail.com',    '1998-10-04','TP.HCM'),
('KH098','Uy锚n Th峄?Lan',           'N峄?, 'Vi峄噒 Nam',  '038111000098','0998000098','lanut@gmail.com',       '2000-12-21','TP.HCM'),
('KH099','Vinh V膬n Th峄?,           'Nam','Vi峄噒 Nam',  '038111000099','0999000099','thovv@gmail.com',       '1997-04-11','TP.HCM'),
('KH100','Xuy锚n Th峄?Ng芒n',         'N峄?, 'Vi峄噒 Nam',  '038111000100','0900000100','nganxt@gmail.com',      '2001-09-03','TP.HCM');

-- =============================================================
-- 5. NHAN_VIEN  (th锚m 16 鈫?t峄昻g = 20)
-- Password hash '$2a$10$navmmUPXpAw5h/IzDcTRe.TktMaPX/SJ0Hc.FvdeTS2OAkGoiLk7C' = '123456'
-- =============================================================
INSERT INTO NHAN_VIEN (MaNV, MaChiNhanh, TenNV, ChucVu, SDT, Email, MatKhau, NgayVaoLam, IsActive) VALUES
('NV005','CN002','L锚 V膬n Duy',         'MANAGER',    '0905555555','manager2@homestay.com',    '$2a$10$navmmUPXpAw5h/IzDcTRe.TktMaPX/SJ0Hc.FvdeTS2OAkGoiLk7C','2022-05-01',TRUE),
('NV006','CN002','Tr岷 Th峄?Tuy岷縯',     'SALE',       '0906666666','sale2@homestay.com',       '$2a$10$navmmUPXpAw5h/IzDcTRe.TktMaPX/SJ0Hc.FvdeTS2OAkGoiLk7C','2023-03-01',TRUE),
('NV007','CN002','Ph岷 Minh Khoa',     'ACCOUNTANT', '0907777777','acc2@homestay.com',        '$2a$10$navmmUPXpAw5h/IzDcTRe.TktMaPX/SJ0Hc.FvdeTS2OAkGoiLk7C','2022-08-15',TRUE),
('NV008','CN003','Ho脿ng Th峄?Lan',      'MANAGER',    '0908888888','manager3@homestay.com',    '$2a$10$navmmUPXpAw5h/IzDcTRe.TktMaPX/SJ0Hc.FvdeTS2OAkGoiLk7C','2023-01-01',TRUE),
('NV009','CN003','V农 V膬n H霉ng',        'SALE',       '0909999999','sale3@homestay.com',       '$2a$10$navmmUPXpAw5h/IzDcTRe.TktMaPX/SJ0Hc.FvdeTS2OAkGoiLk7C','2023-04-15',TRUE),
('NV010','CN003','膼岷穘g Th峄?Thu',       'ACCOUNTANT', '0910101010','acc3@homestay.com',        '$2a$10$navmmUPXpAw5h/IzDcTRe.TktMaPX/SJ0Hc.FvdeTS2OAkGoiLk7C','2023-02-01',TRUE),
('NV011','CN004','B霉i V膬n Nam',        'MANAGER',    '0911111111','manager4@homestay.com',    '$2a$10$navmmUPXpAw5h/IzDcTRe.TktMaPX/SJ0Hc.FvdeTS2OAkGoiLk7C','2022-10-01',TRUE),
('NV012','CN004','Tr峄媙h Th峄?Hoa',      'SALE',       '0912121212','sale4@homestay.com',       '$2a$10$navmmUPXpAw5h/IzDcTRe.TktMaPX/SJ0Hc.FvdeTS2OAkGoiLk7C','2023-05-01',TRUE),
('NV013','CN004','Ng么 V膬n T脿i',        'ACCOUNTANT', '0913131313','acc4@homestay.com',        '$2a$10$navmmUPXpAw5h/IzDcTRe.TktMaPX/SJ0Hc.FvdeTS2OAkGoiLk7C','2023-01-15',TRUE),
('NV014','CN005','L媒 Th峄?Nhung',       'MANAGER',    '0914141414','manager5@homestay.com',    '$2a$10$navmmUPXpAw5h/IzDcTRe.TktMaPX/SJ0Hc.FvdeTS2OAkGoiLk7C','2023-02-15',TRUE),
('NV015','CN005','D瓢啤ng V膬n S啤n',      'SALE',       '0915151515','sale5@homestay.com',       '$2a$10$navmmUPXpAw5h/IzDcTRe.TktMaPX/SJ0Hc.FvdeTS2OAkGoiLk7C','2023-06-01',TRUE),
('NV016','CN005','膼inh Th峄?H脿',        'ACCOUNTANT', '0916161616','acc5@homestay.com',        '$2a$10$navmmUPXpAw5h/IzDcTRe.TktMaPX/SJ0Hc.FvdeTS2OAkGoiLk7C','2023-03-01',TRUE),
('NV017','CN001','Mai V膬n Phong',       'SALE',       '0917171717','sale1b@homestay.com',      '$2a$10$navmmUPXpAw5h/IzDcTRe.TktMaPX/SJ0Hc.FvdeTS2OAkGoiLk7C','2023-07-01',TRUE),
('NV018','CN001','L瓢u Th峄?Ki峄乽',       'ACCOUNTANT', '0918181818','acc1b@homestay.com',       '$2a$10$navmmUPXpAw5h/IzDcTRe.TktMaPX/SJ0Hc.FvdeTS2OAkGoiLk7C','2022-11-01',TRUE),
('NV019','CN001','T岷?V膬n S谩ng',        'SALE',       '0919191919','sale1c@homestay.com',      '$2a$10$navmmUPXpAw5h/IzDcTRe.TktMaPX/SJ0Hc.FvdeTS2OAkGoiLk7C','2024-01-02',TRUE),
('NV020','CN002','Ch芒u Th峄?B矛nh',      'ADMIN',      '0920202020','admin2@homestay.com',      '$2a$10$navmmUPXpAw5h/IzDcTRe.TktMaPX/SJ0Hc.FvdeTS2OAkGoiLk7C','2022-02-01',TRUE);

-- =============================================================
-- 6. NHOM  (th锚m 29 nh贸m 鈫?t峄昻g 鈮?30)
-- =============================================================
INSERT INTO NHOM (MaNhom, TenNhom, MaDaiDien, MaHopDong, NgayTao, TrangThai) VALUES
('NHO002','Nh贸m Tu岷 - Ph瓢啤ng',  'KH007',NULL,'2024-02-01 09:00:00','ACTIVE'),
('NHO003','Nh贸m C瓢峄漬g - Dung',   'KH003',NULL,'2024-02-05 10:00:00','ACTIVE'),
('NHO004','Nh贸m Lan - H岷',      'KH008',NULL,'2024-03-01 08:00:00','ACTIVE'),
('NHO005','Nh贸m Thu - B矛nh',     'KH010',NULL,'2024-03-10 09:30:00','ACTIVE'),
('NHO006','Nh贸m 膼峄ヽ - Mai',      'KH011',NULL,'2024-04-01 10:00:00','ACTIVE'),
('NHO007','Nh贸m Long - H瓢啤ng',   'KH013',NULL,'2024-04-15 11:00:00','ACTIVE'),
('NHO008','Nh贸m Nam - H岷眓g',     'KH015',NULL,'2024-05-01 09:00:00','ACTIVE'),
('NHO009','Nh贸m B矛nh - C煤c',     'KH017',NULL,'2024-05-10 10:00:00','ACTIVE'),
('NHO010','Nh贸m T霉ng - Nga',     'KH019',NULL,'2024-06-01 08:30:00','ACTIVE'),
('NHO011','Nh贸m Ki锚n - Y岷縩',     'KH021',NULL,'2024-06-15 09:00:00','ACTIVE'),
('NHO012','Nh贸m H霉ng - Loan',    'KH023',NULL,'2024-07-01 10:30:00','ACTIVE'),
('NHO013','Nh贸m Th岷痭g - H岷h',   'KH025',NULL,'2024-07-10 08:00:00','ACTIVE'),
('NHO014','Nh贸m Hi岷縰 - Li锚n',    'KH027',NULL,'2024-08-01 09:00:00','ACTIVE'),
('NHO015','Nh贸m Qu芒n - Th岷',    'KH029',NULL,'2024-08-15 10:00:00','ACTIVE'),
('NHO016','Nh贸m T脿i - H脿',       'KH031',NULL,'2024-09-01 11:00:00','ACTIVE'),
('NHO017','Nh贸m Ph煤 - Nguy峄噒',   'KH033',NULL,'2024-09-10 08:30:00','ACTIVE'),
('NHO018','Nh贸m D农ng - Nhung',   'KH035',NULL,'2024-10-01 09:00:00','ACTIVE'),
('NHO019','Nh贸m 膼岷 - Lan',      'KH037',NULL,'2024-10-15 10:00:00','ACTIVE'),
('NHO020','Nh贸m Minh - Tr脿',     'KH039',NULL,'2024-11-01 09:00:00','ACTIVE'),
('NHO021','Nh贸m H貌a - B铆ch',     'KH041',NULL,'2024-11-10 08:00:00','ACTIVE'),
('NHO022','Nh贸m Khoa - Kim',     'KH043',NULL,'2024-12-01 10:00:00','ACTIVE'),
('NHO023','Nh贸m Phong - Linh',   'KH045',NULL,'2024-12-10 09:30:00','ACTIVE'),
('NHO024','Nh贸m H岷璾 - Ph煤c',     'KH047',NULL,'2025-01-05 09:00:00','ACTIVE'),
('NHO025','Nh贸m L峄 - Thanh',    'KH049',NULL,'2025-01-10 10:00:00','ACTIVE'),
('NHO026','Nh贸m Zhang - Li',     'KH051',NULL,'2025-01-15 08:30:00','ACTIVE'),
('NHO027','Nh贸m Tanaka - Kim',   'KH053',NULL,'2025-02-01 09:00:00','ACTIVE'),
('NHO028','Nh贸m Kiet - Tran',    'KH057',NULL,'2025-02-10 10:00:00','ACTIVE'),
('NHO029','Nh贸m Nghia - Quynh',  'KH059',NULL,'2025-02-15 09:00:00','ACTIVE'),
('NHO030','Nh贸m Phuc - Ngoc',    'KH061',NULL,'2025-03-01 08:00:00','ACTIVE');

-- THANHVIEN_NHOM (2-3 th脿nh vi锚n m峄梚 nh贸m)
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
-- 7. LICH_XEM_PHONG  (th锚m 98 鈫?t峄昻g = 100)
-- =============================================================
INSERT INTO LICH_XEM_PHONG (MaLich, MaKH, MaPhong, MaNV, NgayXem, GioXem, KetQua, GhiChu, TrangThai) VALUES
('LXP003','KH006','P111','NV003','2024-02-05','09:00:00','INTERESTED',     'Kh谩ch mu峄憂 thu锚 th谩ng 3',     'COMPLETED'),
('LXP004','KH007','P121','NV003','2024-02-08','10:30:00','BOOKED',         '膼岷穞 c峄峜 ngay sau xem',        'COMPLETED'),
('LXP005','KH008','P131','NV006','2024-02-10','14:00:00','NOT_INTERESTED',  'Ph貌ng ch瓢a ph霉 h峄',          'COMPLETED'),
('LXP006','KH009','P141','NV006','2024-02-12','15:00:00','INTERESTED',     'S岷?quy岷縯 膽峄媙h sau 3 ng脿y',    'COMPLETED'),
('LXP007','KH010','P211','NV006','2024-02-15','09:30:00','BOOKED',         'Kh谩ch nh贸m 2 ng瓢峄漣',          'COMPLETED'),
('LXP008','KH011','P221','NV009','2024-02-18','11:00:00','INTERESTED',     'Mu峄憂 xem th锚m',               'COMPLETED'),
('LXP009','KH012','P321','NV009','2024-02-20','14:30:00','NOT_INTERESTED',  'Gi谩 cao h啤n budget',          'COMPLETED'),
('LXP010','KH013','P331','NV009','2024-02-22','10:00:00','BOOKED',         '膼峄搉g 媒 c峄峜',                  'COMPLETED'),
('LXP011','KH014','P411','NV012','2024-03-01','09:00:00','INTERESTED',     'Xem th锚m tu岷 sau',           'COMPLETED'),
('LXP012','KH015','P421','NV012','2024-03-03','13:00:00','BOOKED',         'OK',                          'COMPLETED'),
('LXP013','KH016','P431','NV012','2024-03-05','10:30:00','NOT_INTERESTED',  'Xa n啤i l脿m vi峄嘽',             'COMPLETED'),
('LXP014','KH017','P511','NV015','2024-03-08','14:00:00','BOOKED',         'C峄峜 ngay',                    'COMPLETED'),
('LXP015','KH018','P521','NV015','2024-03-10','09:30:00','INTERESTED',     'S岷?tr岷?l峄漣 s峄沵',              'COMPLETED'),
('LXP016','KH019','P531','NV015','2024-03-12','11:00:00','NOT_INTERESTED',  'Thi岷縰 n峄檌 th岷',              'COMPLETED'),
('LXP017','KH020','P112','NV003','2024-03-15','14:30:00','BOOKED',         '漂ng 媒',                       'COMPLETED'),
('LXP018','KH021','P122','NV003','2024-03-18','10:00:00','INTERESTED',     'Xem th锚m l岷 n峄痑',            'COMPLETED'),
('LXP019','KH022','P132','NV006','2024-03-20','09:00:00','NOT_INTERESTED',  'Kh么ng 瓢ng t岷g',              'COMPLETED'),
('LXP020','KH023','P142','NV006','2024-03-22','15:00:00','BOOKED',         'Nh贸m 6 ng瓢峄漣',                'COMPLETED'),
('LXP021','KH024','P212','NV006','2024-03-25','11:30:00','INTERESTED',     'H峄廼 th锚m v峄?gi谩',             'COMPLETED'),
('LXP022','KH025','P222','NV009','2024-04-01','10:00:00','BOOKED',         'C峄峜 cu峄慽 tu岷 n脿y',           'COMPLETED'),
('LXP023','KH026','P231','NV009','2024-04-03','09:30:00','NOT_INTERESTED',  '膼峄昳 媒',                       'COMPLETED'),
('LXP024','KH027','P311','NV009','2024-04-05','14:00:00','BOOKED',         'OK, l脿m h峄 膽峄搉g',            'COMPLETED'),
('LXP025','KH028','P312','NV012','2024-04-08','11:00:00','INTERESTED',     'C岷 th锚m th么ng tin',          'COMPLETED'),
('LXP026','KH029','P322','NV012','2024-04-10','09:00:00','BOOKED',         'X谩c nh岷璶 thu锚',               'COMPLETED'),
('LXP027','KH030','P332','NV012','2024-04-12','14:30:00','NOT_INTERESTED',  'Xa tr瓢峄漬g h峄峜',               'COMPLETED'),
('LXP028','KH031','P342','NV015','2024-04-15','10:30:00','BOOKED',         'Nh贸m 6 b岷',                  'COMPLETED'),
('LXP029','KH032','P412','NV015','2024-04-18','09:00:00','INTERESTED',     'G岷 c啤 quan',                 'COMPLETED'),
('LXP030','KH033','P422','NV015','2024-04-20','14:00:00','BOOKED',         'Thanh to谩n c峄峜',              'COMPLETED'),
('LXP031','KH034','P432','NV003','2024-04-22','11:00:00','NOT_INTERESTED',  'Ph貌ng nh峄?qu谩',               'COMPLETED'),
('LXP032','KH035','P441','NV003','2024-05-01','09:30:00','BOOKED',         'Nh贸m 6 ng瓢峄漣',                'COMPLETED'),
('LXP033','KH036','P512','NV006','2024-05-03','14:00:00','INTERESTED',     'S岷?li锚n h峄?l岷',              'COMPLETED'),
('LXP034','KH037','P522','NV006','2024-05-05','10:00:00','BOOKED',         'C峄峜 ngay',                    'COMPLETED'),
('LXP035','KH038','P532','NV009','2024-05-08','09:00:00','NOT_INTERESTED',  'Thay 膽峄昳 k岷?ho岷h',           'COMPLETED'),
('LXP036','KH039','P541','NV009','2024-05-10','15:00:00','BOOKED',         'Nh贸m 6 b岷 膽岷 h峄峜',          'COMPLETED'),
('LXP037','KH040','P542','NV012','2024-05-12','11:30:00','INTERESTED',     '膼ang c芒n nh岷痗',               'COMPLETED'),
('LXP038','KH041','P551','NV012','2024-05-15','10:00:00','BOOKED',         'View 膽岷筽, 膽峄搉g 媒',            'COMPLETED'),
('LXP039','KH042','P111','NV015','2024-05-18','09:30:00','NOT_INTERESTED',  'T岷g th岷 kh么ng 瓢ng',         'COMPLETED'),
('LXP040','KH043','P121','NV015','2024-05-20','14:30:00','BOOKED',         'OK',                          'COMPLETED'),
('LXP041','KH044','P131','NV003','2024-05-22','10:00:00','INTERESTED',     'Xem l岷 2',                   'COMPLETED'),
('LXP042','KH045','P141','NV003','2024-06-01','09:00:00','BOOKED',         'Thu锚 c岷?ph貌ng',               'COMPLETED'),
('LXP043','KH046','P211','NV006','2024-06-03','14:00:00','NOT_INTERESTED',  '膼峄昳 v峄?tr铆',                  'COMPLETED'),
('LXP044','KH047','P221','NV006','2024-06-05','11:00:00','BOOKED',         'Nh贸m 4 ng瓢峄漣',                'COMPLETED'),
('LXP045','KH048','P231','NV009','2024-06-08','10:30:00','INTERESTED',     'C岷 th锚m tu岷',               'COMPLETED'),
('LXP046','KH049','P311','NV009','2024-06-10','09:00:00','BOOKED',         'C峄峜 cu峄慽 th谩ng',              'COMPLETED'),
('LXP047','KH050','P321','NV012','2024-06-12','14:00:00','NOT_INTERESTED',  'Gi谩 v岷玭 cao',                 'COMPLETED'),
('LXP048','KH051','P331','NV012','2024-06-15','10:00:00','BOOKED',         'Kh谩ch n瓢峄沜 ngo脿i OK',         'COMPLETED'),
('LXP049','KH052','P341','NV015','2024-06-18','09:30:00','INTERESTED',     'C岷 d峄媍h t脿i li峄噓',           'COMPLETED'),
('LXP050','KH053','P411','NV015','2024-06-20','15:00:00','BOOKED',         'K媒 h峄 膽峄搉g tu岷 t峄沬',        'COMPLETED'),
('LXP051','KH054','P421','NV003','2024-06-22','11:00:00','NOT_INTERESTED',  'Kh么ng ph霉 h峄',               'COMPLETED'),
('LXP052','KH055','P431','NV003','2024-07-01','10:00:00','BOOKED',         'B岷 b猫 gi峄沬 thi峄噓',           'COMPLETED'),
('LXP053','KH056','P441','NV006','2024-07-03','09:00:00','INTERESTED',     'Xem th锚m',                    'COMPLETED'),
('LXP054','KH057','P511','NV006','2024-07-05','14:30:00','BOOKED',         '膼峄搉g 媒 thu锚',                 'COMPLETED'),
('LXP055','KH058','P521','NV009','2024-07-08','10:30:00','NOT_INTERESTED',  'Xa ch峄?h峄峜',                  'COMPLETED'),
('LXP056','KH059','P531','NV009','2024-07-10','09:00:00','BOOKED',         'Nh贸m 3 b岷',                  'COMPLETED'),
('LXP057','KH060','P541','NV012','2024-07-12','14:00:00','INTERESTED',     'C芒n nh岷痗 th锚m',               'COMPLETED'),
('LXP058','KH061','P551','NV012','2024-07-15','11:00:00','BOOKED',         'T岷g cao view 膽岷筽',           'COMPLETED'),
('LXP059','KH062','P112','NV015','2024-07-18','10:00:00','NOT_INTERESTED',  '膼茫 t矛m 膽瓢峄 ch峄?kh谩c',        'COMPLETED'),
('LXP060','KH063','P122','NV015','2024-07-20','09:30:00','BOOKED',         '膼岷穞 ngay',                    'COMPLETED'),
('LXP061','KH064','P132','NV003','2024-07-22','14:00:00','INTERESTED',     'Xem l岷 3',                   'COMPLETED'),
('LXP062','KH065','P142','NV003','2024-08-01','09:00:00','BOOKED',         'Nh贸m 6 b岷',                  'COMPLETED'),
('LXP063','KH066','P212','NV006','2024-08-03','15:00:00','NOT_INTERESTED',  'Kh么ng c贸 thang m谩y',          'COMPLETED'),
('LXP064','KH067','P222','NV006','2024-08-05','10:30:00','BOOKED',         'OK',                          'COMPLETED'),
('LXP065','KH068','P312','NV009','2024-08-08','09:00:00','INTERESTED',     'S岷?xem th锚m',                 'COMPLETED'),
('LXP066','KH069','P322','NV009','2024-08-10','14:00:00','BOOKED',         'C峄峜 ngay',                    'COMPLETED'),
('LXP067','KH070','P332','NV012','2024-08-12','11:00:00','NOT_INTERESTED',  'Xa b峄噉h vi峄噉 n啤i th峄眂 t岷璸',   'COMPLETED'),
('LXP068','KH071','P342','NV012','2024-08-15','10:00:00','BOOKED',         'OK',                          'COMPLETED'),
('LXP069','KH072','P412','NV015','2024-08-18','09:30:00','INTERESTED',     '膼ang h峄廼 b岷 b猫',             'COMPLETED'),
('LXP070','KH073','P422','NV015','2024-08-20','14:30:00','BOOKED',         'K媒 h峄 膽峄搉g',                 'COMPLETED'),
('LXP071','KH074','P432','NV003','2024-08-22','10:00:00','NOT_INTERESTED',  'Qu谩 膽岷痶',                     'COMPLETED'),
('LXP072','KH075','P442','NV003','2024-09-01','09:00:00','BOOKED',         'Thu锚 c岷?ph貌ng 6G',            'COMPLETED'),
('LXP073','KH076','P512','NV006','2024-09-03','15:00:00','INTERESTED',     'Xem th锚m l岷 n峄痑',            'COMPLETED'),
('LXP074','KH077','P522','NV006','2024-09-05','11:00:00','BOOKED',         'OK',                          'COMPLETED'),
('LXP075','KH078','P532','NV009','2024-09-08','10:30:00','NOT_INTERESTED',  '膼茫 thu锚 n啤i kh谩c',            'COMPLETED'),
('LXP076','KH079','P542','NV009','2024-09-10','09:00:00','BOOKED',         'Nh贸m 6 ng瓢峄漣',                'COMPLETED'),
('LXP077','KH080','P551','NV012','2024-09-12','14:00:00','INTERESTED',     'Xem 2 l岷',                   'COMPLETED'),
-- L峄媍h t瓢啤ng lai (PENDING)
('LXP078','KH081','P111','NV003','2025-07-01','10:00:00', NULL,            '膼岷穞 l峄媍h xem',                'PENDING'),
('LXP079','KH082','P211','NV006','2025-07-02','09:30:00', NULL,            'Kh谩ch m峄沬',                   'PENDING'),
('LXP080','KH083','P311','NV009','2025-07-03','14:00:00', NULL,            'Qua 膽i峄噉 tho岷',              'PENDING'),
('LXP081','KH084','P411','NV012','2025-07-04','11:00:00', NULL,            'Sinh vi锚n m峄沬',               'PENDING'),
('LXP082','KH085','P511','NV015','2025-07-05','10:30:00', NULL,            'N膬m h峄峜 m峄沬',                 'PENDING'),
('LXP083','KH086','P121','NV003','2025-07-07','09:00:00', NULL,            'Nh贸m 4 ng瓢峄漣',                'PENDING'),
('LXP084','KH087','P221','NV006','2025-07-08','14:30:00', NULL,            'Kh谩ch ngo岷 qu峄慶',            'PENDING'),
('LXP085','KH088','P321','NV009','2025-07-09','10:00:00', NULL,            'Sinh vi锚n 膽岷 h峄峜',           'PENDING'),
('LXP086','KH089','P421','NV012','2025-07-10','09:30:00', NULL,            'T峄憈 nghi峄噋, mu峄憂 thu锚',       'PENDING'),
('LXP087','KH090','P521','NV015','2025-07-11','15:00:00', NULL,            'Xem ph貌ng l岷 膽岷',           'PENDING'),
-- L峄媍h 膽茫 h峄 (CANCELLED)
('LXP088','KH091','P131','NV003','2024-10-01','10:00:00', NULL,            'Kh谩ch h峄 膽峄檛 xu岷',          'CANCELLED'),
('LXP089','KH092','P231','NV006','2024-10-05','09:00:00', NULL,            'Kh么ng li锚n l岷 膽瓢峄',         'CANCELLED'),
('LXP090','KH093','P331','NV009','2024-10-08','14:00:00', NULL,            '膼峄昳 l峄媍h kh么ng x谩c nh岷璶',     'CANCELLED'),
('LXP091','KH094','P431','NV012','2024-10-10','11:00:00', NULL,            'H峄 v矛 l媒 do c谩 nh芒n',        'CANCELLED'),
('LXP092','KH095','P531','NV015','2024-10-12','10:30:00', NULL,            'H峄 b峄噉h',                    'CANCELLED'),
('LXP093','KH096','P141','NV003','2024-10-15','09:00:00', NULL,            '膼茫 t矛m ph貌ng kh谩c',           'CANCELLED'),
('LXP094','KH097','P241','NV006','2024-10-18','14:30:00', NULL,            'Nh芒n vi锚n b岷璶',               'CANCELLED'),
('LXP095','KH098','P341','NV009','2024-10-20','10:00:00', NULL,            'Kh谩ch b岷璶',                   'CANCELLED'),
('LXP096','KH099','P441','NV012','2024-10-22','09:30:00', NULL,            'H峄 gi峄?ch贸t',                'CANCELLED'),
('LXP097','KH100','P541','NV015','2024-10-25','15:00:00', NULL,            'Kh么ng confirm',               'CANCELLED'),
('LXP098','KH006','P122','NV017','2024-11-01','10:00:00','INTERESTED',     'Xem th锚m',                    'COMPLETED'),
('LXP099','KH015','P132','NV019','2024-11-05','09:30:00','BOOKED',         'Quy岷縯 膽峄媙h c峄峜',              'COMPLETED'),
('LXP100','KH025','P142','NV017','2024-11-10','14:00:00','NOT_INTERESTED',  'Kh么ng ph霉 h峄',               'COMPLETED');

-- =============================================================
-- 8. HOP_DONG_THUE_NHA  (th锚m 58 鈫?t峄昻g = 60)
-- =============================================================
INSERT INTO HOP_DONG_THUE_NHA (MaHopDong, MaPhong, MaNhom, NgayBatDau, NgayKetThuc, GiaThue, NoiQuy, TinhTrang, NgayKy, MaNVPhuTrach) VALUES
('HD003','P112','NHO002','2024-03-01','2025-02-28',2600000,'N峄檌 quy chung: y锚n t末nh, v峄?sinh, kh么ng h煤t thu峄慶.','ACTIVE','2024-02-20 10:00:00','NV002'),
('HD004','P121','NHO003','2024-03-15','2025-03-14',3200000,'N峄檌 quy chung.','ACTIVE','2024-03-05 09:00:00','NV002'),
('HD005','P131','NHO004','2024-04-01','2025-03-31',4200000,'N峄檌 quy chung.','ACTIVE','2024-03-20 10:00:00','NV005'),
('HD006','P141','NHO005','2024-04-15','2025-04-14',5000000,'N峄檌 quy chung.','ACTIVE','2024-04-05 09:00:00','NV005'),
('HD007','P211','NHO006','2024-05-01','2025-04-30',2800000,'N峄檌 quy chung.','ACTIVE','2024-04-20 10:00:00','NV005'),
('HD008','P221','NHO007','2024-05-15','2025-05-14',3400000,'N峄檌 quy chung.','ACTIVE','2024-05-05 09:00:00','NV008'),
('HD009','P231','NHO008','2024-06-01','2025-05-31',3400000,'N峄檌 quy chung.','ACTIVE','2024-05-20 10:00:00','NV008'),
('HD010','P311','NHO009','2024-06-15','2025-06-14',2500000,'N峄檌 quy chung.','ACTIVE','2024-06-05 09:00:00','NV008'),
('HD011','P321','NHO010','2024-07-01','2025-06-30',3100000,'N峄檌 quy chung.','ACTIVE','2024-06-20 10:00:00','NV011'),
('HD012','P331','NHO011','2024-07-15','2025-07-14',4100000,'N峄檌 quy chung.','ACTIVE','2024-07-05 09:00:00','NV011'),
('HD013','P341','NHO012','2024-08-01','2025-07-31',4900000,'N峄檌 quy chung.','ACTIVE','2024-07-20 10:00:00','NV011'),
('HD014','P411','NHO013','2024-08-15','2025-08-14',2700000,'N峄檌 quy chung.','ACTIVE','2024-08-05 09:00:00','NV014'),
('HD015','P421','NHO014','2024-09-01','2025-08-31',3300000,'N峄檌 quy chung.','ACTIVE','2024-08-20 10:00:00','NV014'),
('HD016','P431','NHO015','2024-09-15','2025-09-14',4300000,'N峄檌 quy chung.','ACTIVE','2024-09-05 09:00:00','NV014'),
('HD017','P441','NHO016','2024-10-01','2025-09-30',5100000,'N峄檌 quy chung.','ACTIVE','2024-09-20 10:00:00','NV002'),
('HD018','P511','NHO017','2024-10-15','2025-10-14',2900000,'N峄檌 quy chung.','ACTIVE','2024-10-05 09:00:00','NV002'),
('HD019','P521','NHO018','2024-11-01','2025-10-31',3500000,'N峄檌 quy chung.','ACTIVE','2024-10-20 10:00:00','NV005'),
('HD020','P531','NHO019','2024-11-15','2025-11-14',4500000,'N峄檌 quy chung.','ACTIVE','2024-11-05 09:00:00','NV005'),
('HD021','P541','NHO020','2024-12-01','2025-11-30',5200000,'N峄檌 quy chung.','ACTIVE','2024-11-20 10:00:00','NV008'),
('HD022','P551','NHO021','2024-12-15','2025-12-14',5200000,'N峄檌 quy chung.','ACTIVE','2024-12-05 09:00:00','NV008'),
-- PENDING_FIRST_PAYMENT
('HD023','P122','NHO022','2025-02-01','2026-01-31',2600000,'N峄檌 quy chung.','PENDING_FIRST_PAYMENT','2025-01-20 10:00:00','NV009'),
('HD024','P212','NHO023','2025-02-15','2026-02-14',2800000,'N峄檌 quy chung.','PENDING_FIRST_PAYMENT','2025-02-05 09:00:00','NV012'),
('HD025','P312','NHO024','2025-03-01','2026-02-28',2500000,'N峄檌 quy chung.','PENDING_FIRST_PAYMENT','2025-02-18 10:00:00','NV015'),
('HD026','P412','NHO025','2025-03-15','2026-03-14',2700000,'N峄檌 quy chung.','PENDING_FIRST_PAYMENT','2025-03-05 09:00:00','NV017'),
('HD027','P512','NHO026','2025-04-01','2026-03-31',2900000,'N峄檌 quy chung.','PENDING_FIRST_PAYMENT','2025-03-20 10:00:00','NV019'),
-- TERMINATED (膽茫 thanh l媒)
('HD028','P132','NHO027','2023-07-01','2024-06-30',3200000,'N峄檌 quy chung.','TERMINATED','2023-06-20 10:00:00','NV002'),
('HD029','P222','NHO028','2023-08-01','2024-07-31',3400000,'N峄檌 quy chung.','TERMINATED','2023-07-20 09:00:00','NV005'),
('HD030','P322','NHO029','2023-09-01','2024-08-31',3100000,'N峄檌 quy chung.','TERMINATED','2023-08-20 10:00:00','NV008'),
('HD031','P432','NHO030','2023-10-01','2024-09-30',4300000,'N峄檌 quy chung.','TERMINATED','2023-09-20 09:00:00','NV011'),
-- EXPIRED
('HD032','P142',NULL,'2022-06-01','2023-05-31',5000000,'N峄檌 quy chung.','EXPIRED','2022-05-20 10:00:00','NV002'),
('HD033','P241',NULL,'2022-07-01','2023-06-30',4800000,'N峄檌 quy chung.','EXPIRED','2022-06-20 09:00:00','NV005'),
('HD034','P342',NULL,'2022-08-01','2023-07-31',4900000,'N峄檌 quy chung.','EXPIRED','2022-07-20 10:00:00','NV008'),
('HD035','P442',NULL,'2022-09-01','2023-08-31',5100000,'N峄檌 quy chung.','EXPIRED','2022-08-20 09:00:00','NV011'),
('HD036','P542',NULL,'2022-10-01','2023-09-30',5200000,'N峄檌 quy chung.','EXPIRED','2022-09-20 10:00:00','NV014'),
-- CANCELLED
('HD037','P522',NULL,'2025-05-01','2026-04-30',3500000,'N峄檌 quy chung.','CANCELLED','2025-04-20 10:00:00','NV015'),
-- Th锚m ACTIVE 膽峄?膽峄?d峄?li峄噓 b脿n giao / tr岷?ph貌ng
('HD038','P532','NHO002','2024-01-10','2025-01-09',4500000,'N峄檌 quy chung.','ACTIVE','2024-01-01 10:00:00','NV002'),
('HD039','P112','NHO003','2023-03-01','2024-02-29',2600000,'N峄檌 quy chung.','TERMINATED','2023-02-20 10:00:00','NV003'),
('HD040','P201',NULL,'2024-03-01','2025-02-28',3500000,'N峄檌 quy chung.','ACTIVE','2024-02-20 09:00:00','NV002'),
('HD041','P202',NULL,'2024-04-01','2025-03-31',4000000,'N峄檌 quy chung.','ACTIVE','2024-03-20 10:00:00','NV003'),
('HD042','P401',NULL,'2024-05-01','2025-04-30',2800000,'N峄檌 quy chung.','ACTIVE','2024-04-20 09:00:00','NV006'),
('HD043','P402',NULL,'2024-06-01','2025-05-31',3200000,'N峄檌 quy chung.','ACTIVE','2024-05-20 10:00:00','NV006'),
('HD044','P111',NULL,'2025-01-01','2025-12-31',2600000,'N峄檌 quy chung.','PENDING_FIRST_PAYMENT','2024-12-20 10:00:00','NV017'),
('HD045','P112',NULL,'2025-02-01','2025-12-31',2600000,'N峄檌 quy chung.','PENDING_FIRST_PAYMENT','2025-01-20 09:00:00','NV019'),
-- Th锚m ACTIVE d霉ng cho TRA_PHONG
('HD046','P211',NULL,'2023-01-01','2024-12-31',2800000,'N峄檌 quy chung.','TERMINATED','2022-12-20 10:00:00','NV005'),
('HD047','P212',NULL,'2023-02-01','2024-01-31',2800000,'N峄檌 quy chung.','TERMINATED','2023-01-20 09:00:00','NV006'),
('HD048','P221',NULL,'2023-03-01','2024-02-29',3400000,'N峄檌 quy chung.','TERMINATED','2023-02-20 10:00:00','NV008'),
('HD049','P222',NULL,'2023-04-01','2024-03-31',3400000,'N峄檌 quy chung.','TERMINATED','2023-03-20 09:00:00','NV009'),
('HD050','P231',NULL,'2023-05-01','2024-04-30',3400000,'N峄檌 quy chung.','TERMINATED','2023-04-20 10:00:00','NV011'),
('HD051','P241',NULL,'2023-06-01','2024-05-31',4800000,'N峄檌 quy chung.','TERMINATED','2023-05-20 09:00:00','NV012'),
('HD052','P311',NULL,'2023-07-01','2024-06-30',2500000,'N峄檌 quy chung.','TERMINATED','2023-06-20 10:00:00','NV014'),
('HD053','P312',NULL,'2023-08-01','2024-07-31',2500000,'N峄檌 quy chung.','TERMINATED','2023-07-20 09:00:00','NV015'),
('HD054','P321',NULL,'2023-09-01','2024-08-31',3100000,'N峄檌 quy chung.','TERMINATED','2023-08-20 10:00:00','NV017'),
('HD055','P322',NULL,'2023-10-01','2024-09-30',3100000,'N峄檌 quy chung.','TERMINATED','2023-09-20 09:00:00','NV019'),
('HD056','P331',NULL,'2023-11-01','2024-10-31',4100000,'N峄檌 quy chung.','TERMINATED','2023-10-20 10:00:00','NV002'),
('HD057','P332',NULL,'2023-12-01','2024-11-30',4100000,'N峄檌 quy chung.','TERMINATED','2023-11-20 09:00:00','NV003'),
('HD058','P341',NULL,'2024-01-01','2024-12-31',4900000,'N峄檌 quy chung.','TERMINATED','2023-12-20 10:00:00','NV005'),
('HD059','P342',NULL,'2024-02-01','2025-01-31',4900000,'N峄檌 quy chung.','ACTIVE','2024-01-20 09:00:00','NV006'),
('HD060','P401',NULL,'2024-03-01','2025-02-28',2800000,'N峄檌 quy chung.','ACTIVE','2024-02-20 10:00:00','NV008');

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
-- 9. DAT_COC  (th锚m 78 鈫?t峄昻g = 80)
-- Tr瓢峄沜 H膼 ~1 th谩ng; 膽a d岷g tr岷g th谩i
-- =============================================================
INSERT INTO DAT_COC (MaCoc, MaHopDong, MaKH, MaPhong, MaGiuong, NguoiPheDuyet, NgayDatCoc, SoTienCoc, PhuongThucThanhToan, TinhTrang, ThoiGianHetHan, ThoiGianPheDuyet, GhiChu) VALUES
('COC003','HD003','KH007','P112',NULL,'NV002','2024-02-10 09:00:00',2600000,'BANK_TRANSFER','APPROVED','2024-02-17 09:00:00','2024-02-11 08:00:00','C峄峜 h峄 膽峄搉g HD003'),
('COC004','HD004','KH003','P121',NULL,'NV002','2024-02-25 10:00:00',3200000,'BANK_TRANSFER','APPROVED','2024-03-04 10:00:00','2024-02-26 09:00:00','C峄峜 h峄 膽峄搉g HD004'),
('COC005','HD005','KH008','P131',NULL,'NV005','2024-03-10 09:00:00',4200000,'CASH',         'APPROVED','2024-03-17 09:00:00','2024-03-11 08:00:00','C峄峜 h峄 膽峄搉g HD005'),
('COC006','HD006','KH010','P141',NULL,'NV005','2024-03-25 10:00:00',5000000,'BANK_TRANSFER','APPROVED','2024-04-01 10:00:00','2024-03-26 09:00:00','C峄峜 h峄 膽峄搉g HD006'),
('COC007','HD007','KH011','P211',NULL,'NV005','2024-04-10 09:00:00',2800000,'CASH',         'APPROVED','2024-04-17 09:00:00','2024-04-11 08:00:00','C峄峜 h峄 膽峄搉g HD007'),
('COC008','HD008','KH013','P221',NULL,'NV007','2024-04-25 10:00:00',3400000,'BANK_TRANSFER','APPROVED','2024-05-02 10:00:00','2024-04-26 09:00:00','C峄峜 h峄 膽峄搉g HD008'),
('COC009','HD009','KH015','P231',NULL,'NV007','2024-05-10 09:00:00',3400000,'CASH',         'APPROVED','2024-05-17 09:00:00','2024-05-11 08:00:00','C峄峜 h峄 膽峄搉g HD009'),
('COC010','HD010','KH017','P311',NULL,'NV010','2024-05-25 10:00:00',2500000,'BANK_TRANSFER','APPROVED','2024-06-01 10:00:00','2024-05-26 09:00:00','C峄峜 h峄 膽峄搉g HD010'),
('COC011','HD011','KH019','P321',NULL,'NV010','2024-06-10 09:00:00',3100000,'CASH',         'APPROVED','2024-06-17 09:00:00','2024-06-11 08:00:00','C峄峜 h峄 膽峄搉g HD011'),
('COC012','HD012','KH021','P331',NULL,'NV010','2024-06-25 10:00:00',4100000,'BANK_TRANSFER','APPROVED','2024-07-02 10:00:00','2024-06-26 09:00:00','C峄峜 h峄 膽峄搉g HD012'),
('COC013','HD013','KH023','P341',NULL,'NV013','2024-07-10 09:00:00',4900000,'CASH',         'APPROVED','2024-07-17 09:00:00','2024-07-11 08:00:00','C峄峜 h峄 膽峄搉g HD013'),
('COC014','HD014','KH025','P411',NULL,'NV013','2024-07-25 10:00:00',2700000,'BANK_TRANSFER','APPROVED','2024-08-01 10:00:00','2024-07-26 09:00:00','C峄峜 h峄 膽峄搉g HD014'),
('COC015','HD015','KH027','P421',NULL,'NV013','2024-08-10 09:00:00',3300000,'CASH',         'APPROVED','2024-08-17 09:00:00','2024-08-11 08:00:00','C峄峜 h峄 膽峄搉g HD015'),
('COC016','HD016','KH029','P431',NULL,'NV016','2024-08-25 10:00:00',4300000,'BANK_TRANSFER','APPROVED','2024-09-01 10:00:00','2024-08-26 09:00:00','C峄峜 h峄 膽峄搉g HD016'),
('COC017','HD017','KH031','P441',NULL,'NV016','2024-09-10 09:00:00',5100000,'CASH',         'APPROVED','2024-09-17 09:00:00','2024-09-11 08:00:00','C峄峜 h峄 膽峄搉g HD017'),
('COC018','HD018','KH033','P511',NULL,'NV016','2024-09-25 10:00:00',2900000,'BANK_TRANSFER','APPROVED','2024-10-02 10:00:00','2024-09-26 09:00:00','C峄峜 h峄 膽峄搉g HD018'),
('COC019','HD019','KH035','P521',NULL,'NV004','2024-10-10 09:00:00',3500000,'CASH',         'APPROVED','2024-10-17 09:00:00','2024-10-11 08:00:00','C峄峜 h峄 膽峄搉g HD019'),
('COC020','HD020','KH037','P531',NULL,'NV004','2024-10-25 10:00:00',4500000,'BANK_TRANSFER','APPROVED','2024-11-01 10:00:00','2024-10-26 09:00:00','C峄峜 h峄 膽峄搉g HD020'),
('COC021','HD021','KH039','P541',NULL,'NV007','2024-11-10 09:00:00',5200000,'CASH',         'APPROVED','2024-11-17 09:00:00','2024-11-11 08:00:00','C峄峜 h峄 膽峄搉g HD021'),
('COC022','HD022','KH041','P551',NULL,'NV007','2024-11-25 10:00:00',5200000,'BANK_TRANSFER','APPROVED','2024-12-02 10:00:00','2024-11-26 09:00:00','C峄峜 h峄 膽峄搉g HD022'),
-- PENDING_PAYMENT (HD023鈥揌D027 ch瓢a duy峄噒)
('COC023','HD023','KH043','P122',NULL,NULL,'2025-01-10 10:00:00',2600000,'BANK_TRANSFER','PENDING_PAYMENT','2025-01-17 10:00:00',NULL,'Ch峄?thanh to谩n c峄峜'),
('COC024','HD024','KH045','P212',NULL,NULL,'2025-01-25 09:00:00',2800000,'CASH',          'PENDING_PAYMENT','2025-02-01 09:00:00',NULL,'Ch峄?thanh to谩n c峄峜'),
('COC025','HD025','KH047','P312',NULL,NULL,'2025-02-08 10:00:00',2500000,'BANK_TRANSFER', 'PENDING_PAYMENT','2025-02-15 10:00:00',NULL,'Ch峄?thanh to谩n c峄峜'),
('COC026','HD026','KH049','P412',NULL,NULL,'2025-02-22 09:00:00',2700000,'CASH',          'PENDING_PAYMENT','2025-03-01 09:00:00',NULL,'Ch峄?thanh to谩n c峄峜'),
('COC027','HD027','KH051','P512',NULL,NULL,'2025-03-08 10:00:00',2900000,'BANK_TRANSFER', 'PENDING_PAYMENT','2025-03-15 10:00:00',NULL,'Ch峄?thanh to谩n c峄峜'),
-- EXPIRED
('COC028',NULL,'KH053','P111',NULL,NULL,'2024-01-05 09:00:00',2600000,'CASH',          'EXPIRED','2024-01-12 09:00:00',NULL,'Qu谩 h岷 kh么ng thanh to谩n'),
('COC029',NULL,'KH055','P211',NULL,NULL,'2024-02-03 10:00:00',2800000,'BANK_TRANSFER', 'EXPIRED','2024-02-10 10:00:00',NULL,'Qu谩 h岷'),
('COC030',NULL,'KH057','P311',NULL,NULL,'2024-03-01 09:00:00',2500000,'CASH',          'EXPIRED','2024-03-08 09:00:00',NULL,'Qu谩 h岷'),
('COC031',NULL,'KH059','P411',NULL,NULL,'2024-04-01 10:00:00',2700000,'BANK_TRANSFER', 'EXPIRED','2024-04-08 10:00:00',NULL,'Qu谩 h岷'),
('COC032',NULL,'KH061','P511',NULL,NULL,'2024-05-01 09:00:00',2900000,'CASH',          'EXPIRED','2024-05-08 09:00:00',NULL,'Qu谩 h岷'),
-- CANCELLED
('COC033',NULL,'KH063','P121','G121A',NULL,'2024-06-01 10:00:00',3200000,'BANK_TRANSFER','CANCELLED','2024-06-08 10:00:00',NULL,'Kh谩ch h峄'),
('COC034',NULL,'KH065','P321','G321A',NULL,'2024-07-01 09:00:00',3100000,'CASH',         'CANCELLED','2024-07-08 09:00:00',NULL,'Kh谩ch h峄'),
('COC035',NULL,'KH067','P421','G421A',NULL,'2024-08-01 10:00:00',3300000,'BANK_TRANSFER','CANCELLED','2024-08-08 10:00:00',NULL,'Kh谩ch h峄'),
('COC036',NULL,'KH069','P521','G521A',NULL,'2024-09-01 09:00:00',3500000,'CASH',         'CANCELLED','2024-09-08 09:00:00',NULL,'Kh谩ch h峄'),
('COC037',NULL,'KH071','P141','G141A',NULL,'2024-10-01 10:00:00',5000000,'BANK_TRANSFER','CANCELLED','2024-10-08 10:00:00',NULL,'Kh谩ch h峄'),
-- Th锚m APPROVED cho h峄 膽峄搉g tr瓢峄沜 terminated
('COC038','HD028','KH057','P132',NULL,'NV002','2023-06-05 09:00:00',3200000,'BANK_TRANSFER','APPROVED','2023-06-12 09:00:00','2023-06-06 08:00:00','C峄峜 HD028'),
('COC039','HD029','KH059','P222',NULL,'NV005','2023-07-05 10:00:00',3400000,'CASH',        'APPROVED','2023-07-12 10:00:00','2023-07-06 09:00:00','C峄峜 HD029'),
('COC040','HD030','KH061','P322',NULL,'NV008','2023-08-05 09:00:00',3100000,'BANK_TRANSFER','APPROVED','2023-08-12 09:00:00','2023-08-06 08:00:00','C峄峜 HD030'),
('COC041','HD031','KH063','P432',NULL,'NV011','2023-09-05 10:00:00',4300000,'CASH',        'APPROVED','2023-09-12 10:00:00','2023-09-06 09:00:00','C峄峜 HD031'),
('COC042','HD032','KH065','P142',NULL,'NV002','2022-05-05 09:00:00',5000000,'BANK_TRANSFER','APPROVED','2022-05-12 09:00:00','2022-05-06 08:00:00','C峄峜 HD032'),
('COC043','HD033','KH067','P241',NULL,'NV005','2022-06-05 10:00:00',4800000,'CASH',        'APPROVED','2022-06-12 10:00:00','2022-06-06 09:00:00','C峄峜 HD033'),
('COC044','HD034','KH069','P342',NULL,'NV008','2022-07-05 09:00:00',4900000,'BANK_TRANSFER','APPROVED','2022-07-12 09:00:00','2022-07-06 08:00:00','C峄峜 HD034'),
('COC045','HD035','KH071','P442',NULL,'NV011','2022-08-05 10:00:00',5100000,'CASH',        'APPROVED','2022-08-12 10:00:00','2022-08-06 09:00:00','C峄峜 HD035'),
('COC046','HD036','KH073','P542',NULL,'NV014','2022-09-05 09:00:00',5200000,'BANK_TRANSFER','APPROVED','2022-09-12 09:00:00','2022-09-06 08:00:00','C峄峜 HD036'),
('COC047','HD038','KH007','P532',NULL,'NV002','2023-12-20 09:00:00',4500000,'BANK_TRANSFER','APPROVED','2023-12-27 09:00:00','2023-12-21 08:00:00','C峄峜 HD038'),
('COC048','HD040','KH009','P201',NULL,'NV002','2024-02-05 10:00:00',3500000,'CASH',        'APPROVED','2024-02-12 10:00:00','2024-02-06 09:00:00','C峄峜 HD040'),
('COC049','HD041','KH011','P202',NULL,'NV003','2024-03-05 09:00:00',4000000,'BANK_TRANSFER','APPROVED','2024-03-12 09:00:00','2024-03-06 08:00:00','C峄峜 HD041'),
('COC050','HD042','KH013','P401',NULL,'NV006','2024-04-05 10:00:00',2800000,'CASH',        'APPROVED','2024-04-12 10:00:00','2024-04-06 09:00:00','C峄峜 HD042'),
('COC051','HD043','KH015','P402',NULL,'NV006','2024-05-05 09:00:00',3200000,'BANK_TRANSFER','APPROVED','2024-05-12 09:00:00','2024-05-06 08:00:00','C峄峜 HD043'),
('COC052','HD059','KH017','P342',NULL,'NV006','2024-01-05 10:00:00',4900000,'CASH',        'APPROVED','2024-01-12 10:00:00','2024-01-06 09:00:00','C峄峜 HD059'),
('COC053','HD060','KH019','P401',NULL,'NV008','2024-02-05 09:00:00',2800000,'BANK_TRANSFER','APPROVED','2024-02-12 09:00:00','2024-02-06 08:00:00','C峄峜 HD060'),
-- Th锚m m峄檛 s峄?PENDING_APPROVAL
('COC054',NULL,'KH075','P131','G131A',NULL,'2025-06-01 09:00:00',4200000,'BANK_TRANSFER','PENDING_APPROVAL','2025-06-08 09:00:00',NULL,'Ch峄?ph锚 duy峄噒'),
('COC055',NULL,'KH077','P141','G141A',NULL,'2025-06-02 10:00:00',5000000,'CASH',         'PENDING_APPROVAL','2025-06-09 10:00:00',NULL,'Ch峄?ph锚 duy峄噒'),
('COC056',NULL,'KH079','P241','G241A',NULL,'2025-06-03 09:00:00',4800000,'BANK_TRANSFER','PENDING_APPROVAL','2025-06-10 09:00:00',NULL,'Ch峄?ph锚 duy峄噒'),
-- REJECTED
('COC057',NULL,'KH081','P341','G341A','NV013','2025-05-01 10:00:00',4900000,'CASH','REJECTED','2025-05-08 10:00:00','2025-05-02 09:00:00','T峄?ch峄慽 do kh谩ch kh么ng 膽峄?膽i峄乽 ki峄噉'),
('COC058',NULL,'KH083','P441','G441A','NV016','2025-05-05 09:00:00',5100000,'BANK_TRANSFER','REJECTED','2025-05-12 09:00:00','2025-05-06 08:00:00','T峄?ch峄慽'),
-- Th锚m APPROVED cho H膼 44,45
('COC059','HD044','KH085','P111',NULL,'NV018','2024-12-10 10:00:00',2600000,'BANK_TRANSFER','APPROVED','2024-12-17 10:00:00','2024-12-11 09:00:00','C峄峜 HD044'),
('COC060',NULL,'KH087','P201','G201A',NULL,'2025-06-10 09:00:00',3500000,'CASH','PENDING_PAYMENT','2025-06-17 09:00:00',NULL,'C峄峜 gi瓢峄漬g l岷?);

-- =============================================================
-- 10. CHI_TIET_THUE  (th锚m ~117 鈫?t峄昻g 鈮?120)
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
-- 11. THANH_TOAN  (th锚m ~148 鈫?t峄昻g 鈮?150)
-- =============================================================
INSERT INTO THANH_TOAN (MaThanhToan, MaHopDong, MaCoc, SoTien, PhuongThuc, NgayThanhToan, LoaiThanhToan, TinhTrang, GhiChu, MaSoChungTu) VALUES
-- C峄峜 膽茫 approve (COC003鈥揅OC022, COC038鈥揅OC053)
('TT003',NULL,'COC003',2600000,'BANK_TRANSFER','2024-02-11 09:30:00','DEPOSIT','COMPLETED','Thanh to谩n c峄峜 HD003','CT20240211003'),
('TT004',NULL,'COC004',3200000,'BANK_TRANSFER','2024-02-26 10:30:00','DEPOSIT','COMPLETED','Thanh to谩n c峄峜 HD004','CT20240226004'),
('TT005',NULL,'COC005',4200000,'CASH',         '2024-03-11 09:30:00','DEPOSIT','COMPLETED','Thanh to谩n c峄峜 HD005','CT20240311005'),
('TT006',NULL,'COC006',5000000,'BANK_TRANSFER','2024-03-26 10:30:00','DEPOSIT','COMPLETED','Thanh to谩n c峄峜 HD006','CT20240326006'),
('TT007',NULL,'COC007',2800000,'CASH',         '2024-04-11 09:30:00','DEPOSIT','COMPLETED','Thanh to谩n c峄峜 HD007','CT20240411007'),
('TT008',NULL,'COC008',3400000,'BANK_TRANSFER','2024-04-26 10:30:00','DEPOSIT','COMPLETED','Thanh to谩n c峄峜 HD008','CT20240426008'),
('TT009',NULL,'COC009',3400000,'CASH',         '2024-05-11 09:30:00','DEPOSIT','COMPLETED','Thanh to谩n c峄峜 HD009','CT20240511009'),
('TT010',NULL,'COC010',2500000,'BANK_TRANSFER','2024-05-26 10:30:00','DEPOSIT','COMPLETED','Thanh to谩n c峄峜 HD010','CT20240526010'),
('TT011',NULL,'COC011',3100000,'CASH',         '2024-06-11 09:30:00','DEPOSIT','COMPLETED','Thanh to谩n c峄峜 HD011','CT20240611011'),
('TT012',NULL,'COC012',4100000,'BANK_TRANSFER','2024-06-26 10:30:00','DEPOSIT','COMPLETED','Thanh to谩n c峄峜 HD012','CT20240626012'),
('TT013',NULL,'COC013',4900000,'CASH',         '2024-07-11 09:30:00','DEPOSIT','COMPLETED','Thanh to谩n c峄峜 HD013','CT20240711013'),
('TT014',NULL,'COC014',2700000,'BANK_TRANSFER','2024-07-26 10:30:00','DEPOSIT','COMPLETED','Thanh to谩n c峄峜 HD014','CT20240726014'),
('TT015',NULL,'COC015',3300000,'CASH',         '2024-08-11 09:30:00','DEPOSIT','COMPLETED','Thanh to谩n c峄峜 HD015','CT20240811015'),
('TT016',NULL,'COC016',4300000,'BANK_TRANSFER','2024-08-26 10:30:00','DEPOSIT','COMPLETED','Thanh to谩n c峄峜 HD016','CT20240826016'),
('TT017',NULL,'COC017',5100000,'CASH',         '2024-09-11 09:30:00','DEPOSIT','COMPLETED','Thanh to谩n c峄峜 HD017','CT20240911017'),
('TT018',NULL,'COC018',2900000,'BANK_TRANSFER','2024-09-26 10:30:00','DEPOSIT','COMPLETED','Thanh to谩n c峄峜 HD018','CT20240926018'),
('TT019',NULL,'COC019',3500000,'CASH',         '2024-10-11 09:30:00','DEPOSIT','COMPLETED','Thanh to谩n c峄峜 HD019','CT20241011019'),
('TT020',NULL,'COC020',4500000,'BANK_TRANSFER','2024-10-26 10:30:00','DEPOSIT','COMPLETED','Thanh to谩n c峄峜 HD020','CT20241026020'),
('TT021',NULL,'COC021',5200000,'CASH',         '2024-11-11 09:30:00','DEPOSIT','COMPLETED','Thanh to谩n c峄峜 HD021','CT20241111021'),
('TT022',NULL,'COC022',5200000,'BANK_TRANSFER','2024-11-26 10:30:00','DEPOSIT','COMPLETED','Thanh to谩n c峄峜 HD022','CT20241126022'),
-- Ti峄乶 thu锚 th谩ng 膽岷 (MONTHLY_RENT) cho h峄 膽峄搉g ACTIVE
('TT023','HD003',NULL,2600000,'BANK_TRANSFER','2024-03-01 08:00:00','MONTHLY_RENT','COMPLETED','Th谩ng 3/2024 HD003','CT20240301023'),
('TT024','HD004',NULL,3200000,'BANK_TRANSFER','2024-03-15 08:00:00','MONTHLY_RENT','COMPLETED','Th谩ng 3/2024 HD004','CT20240315024'),
('TT025','HD005',NULL,4200000,'CASH',         '2024-04-01 08:00:00','MONTHLY_RENT','COMPLETED','Th谩ng 4/2024 HD005','CT20240401025'),
('TT026','HD006',NULL,5000000,'BANK_TRANSFER','2024-04-15 08:00:00','MONTHLY_RENT','COMPLETED','Th谩ng 4/2024 HD006','CT20240415026'),
('TT027','HD007',NULL,2800000,'CASH',         '2024-05-01 08:00:00','MONTHLY_RENT','COMPLETED','Th谩ng 5/2024 HD007','CT20240501027'),
('TT028','HD008',NULL,3400000,'BANK_TRANSFER','2024-05-15 08:00:00','MONTHLY_RENT','COMPLETED','Th谩ng 5/2024 HD008','CT20240515028'),
('TT029','HD009',NULL,3400000,'CASH',         '2024-06-01 08:00:00','MONTHLY_RENT','COMPLETED','Th谩ng 6/2024 HD009','CT20240601029'),
('TT030','HD010',NULL,2500000,'BANK_TRANSFER','2024-06-15 08:00:00','MONTHLY_RENT','COMPLETED','Th谩ng 6/2024 HD010','CT20240615030'),
('TT031','HD011',NULL,3100000,'CASH',         '2024-07-01 08:00:00','MONTHLY_RENT','COMPLETED','Th谩ng 7/2024 HD011','CT20240701031'),
('TT032','HD012',NULL,4100000,'BANK_TRANSFER','2024-07-15 08:00:00','MONTHLY_RENT','COMPLETED','Th谩ng 7/2024 HD012','CT20240715032'),
('TT033','HD013',NULL,4900000,'CASH',         '2024-08-01 08:00:00','MONTHLY_RENT','COMPLETED','Th谩ng 8/2024 HD013','CT20240801033'),
('TT034','HD014',NULL,2700000,'BANK_TRANSFER','2024-08-15 08:00:00','MONTHLY_RENT','COMPLETED','Th谩ng 8/2024 HD014','CT20240815034'),
('TT035','HD015',NULL,3300000,'CASH',         '2024-09-01 08:00:00','MONTHLY_RENT','COMPLETED','Th谩ng 9/2024 HD015','CT20240901035'),
('TT036','HD016',NULL,4300000,'BANK_TRANSFER','2024-09-15 08:00:00','MONTHLY_RENT','COMPLETED','Th谩ng 9/2024 HD016','CT20240915036'),
('TT037','HD017',NULL,5100000,'CASH',         '2024-10-01 08:00:00','MONTHLY_RENT','COMPLETED','Th谩ng 10/2024 HD017','CT20241001037'),
('TT038','HD018',NULL,2900000,'BANK_TRANSFER','2024-10-15 08:00:00','MONTHLY_RENT','COMPLETED','Th谩ng 10/2024 HD018','CT20241015038'),
('TT039','HD019',NULL,3500000,'CASH',         '2024-11-01 08:00:00','MONTHLY_RENT','COMPLETED','Th谩ng 11/2024 HD019','CT20241101039'),
('TT040','HD020',NULL,4500000,'BANK_TRANSFER','2024-11-15 08:00:00','MONTHLY_RENT','COMPLETED','Th谩ng 11/2024 HD020','CT20241115040'),
('TT041','HD021',NULL,5200000,'CASH',         '2024-12-01 08:00:00','MONTHLY_RENT','COMPLETED','Th谩ng 12/2024 HD021','CT20241201041'),
('TT042','HD022',NULL,5200000,'BANK_TRANSFER','2024-12-15 08:00:00','MONTHLY_RENT','COMPLETED','Th谩ng 12/2024 HD022','CT20241215042'),
-- Ti峄乶 thu锚 th谩ng 2 cho h峄 膽峄搉g c貌n active
('TT043','HD003',NULL,2600000,'BANK_TRANSFER','2024-04-01 08:00:00','MONTHLY_RENT','COMPLETED','Th谩ng 4/2024 HD003','CT20240401043'),
('TT044','HD004',NULL,3200000,'BANK_TRANSFER','2024-04-15 08:00:00','MONTHLY_RENT','COMPLETED','Th谩ng 4/2024 HD004','CT20240415044'),
('TT045','HD005',NULL,4200000,'CASH',         '2024-05-01 08:00:00','MONTHLY_RENT','COMPLETED','Th谩ng 5/2024 HD005','CT20240501045'),
('TT046','HD040',NULL,3500000,'BANK_TRANSFER','2024-03-01 08:00:00','MONTHLY_RENT','COMPLETED','Th谩ng 3/2024 HD040','CT20240301046'),
('TT047','HD041',NULL,4000000,'CASH',         '2024-04-01 08:00:00','MONTHLY_RENT','COMPLETED','Th谩ng 4/2024 HD041','CT20240401047'),
('TT048','HD042',NULL,2800000,'BANK_TRANSFER','2024-05-01 08:00:00','MONTHLY_RENT','COMPLETED','Th谩ng 5/2024 HD042','CT20240501048'),
('TT049','HD043',NULL,3200000,'CASH',         '2024-06-01 08:00:00','MONTHLY_RENT','COMPLETED','Th谩ng 6/2024 HD043','CT20240601049'),
('TT050','HD059',NULL,4900000,'BANK_TRANSFER','2024-02-01 08:00:00','MONTHLY_RENT','COMPLETED','Th谩ng 2/2024 HD059','CT20240201050'),
-- PENDING
('TT051','HD003',NULL,2600000,'BANK_TRANSFER','2025-06-01 08:00:00','MONTHLY_RENT','PENDING','Th谩ng 6/2025 HD003','CT20250601051'),
('TT052','HD011',NULL,3100000,'CASH',         '2025-06-01 08:00:00','MONTHLY_RENT','PENDING','Th谩ng 6/2025 HD011','CT20250601052'),
-- PENALTY
('TT053','HD005',NULL,420000,'CASH','2024-06-10 10:00:00','PENALTY','COMPLETED','Ph岷 tr峄?ti峄乶 thu锚 th谩ng 6','CT20240610053'),
('TT054','HD012',NULL,410000,'BANK_TRANSFER','2024-08-10 09:00:00','PENALTY','COMPLETED','Ph岷 tr峄?ti峄乶 thu锚','CT20240810054'),
-- REFUND (ho脿n c峄峜 c谩c h峄 膽峄搉g terminated)
('TT055','HD028',NULL,2240000,'BANK_TRANSFER','2024-07-05 10:00:00','REFUND','COMPLETED','Ho脿n c峄峜 HD028 (70%)','CT20240705055'),
('TT056','HD029',NULL,2380000,'CASH',         '2024-08-05 10:00:00','REFUND','COMPLETED','Ho脿n c峄峜 HD029 (70%)','CT20240805056'),
('TT057','HD030',NULL,2170000,'BANK_TRANSFER','2024-09-05 10:00:00','REFUND','COMPLETED','Ho脿n c峄峜 HD030 (70%)','CT20240905057'),
('TT058','HD031',NULL,3010000,'CASH',         '2024-10-05 10:00:00','REFUND','COMPLETED','Ho脿n c峄峜 HD031 (70%)','CT20241005058'),
-- C峄峜 deposits cho c谩c h峄 膽峄搉g terminated
('TT059',NULL,'COC038',3200000,'BANK_TRANSFER','2023-06-06 09:00:00','DEPOSIT','COMPLETED','C峄峜 HD028','CT20230606059'),
('TT060',NULL,'COC039',3400000,'CASH','2023-07-06 10:00:00','DEPOSIT','COMPLETED','C峄峜 HD029','CT20230706060'),
('TT061',NULL,'COC040',3100000,'BANK_TRANSFER','2023-08-06 09:00:00','DEPOSIT','COMPLETED','C峄峜 HD030','CT20230806061'),
('TT062',NULL,'COC041',4300000,'CASH','2023-09-06 10:00:00','DEPOSIT','COMPLETED','C峄峜 HD031','CT20230906062'),
('TT063',NULL,'COC047',4500000,'BANK_TRANSFER','2023-12-21 09:00:00','DEPOSIT','COMPLETED','C峄峜 HD038','CT20231221063'),
('TT064',NULL,'COC048',3500000,'CASH','2024-02-06 10:00:00','DEPOSIT','COMPLETED','C峄峜 HD040','CT20240206064'),
('TT065',NULL,'COC049',4000000,'BANK_TRANSFER','2024-03-06 09:00:00','DEPOSIT','COMPLETED','C峄峜 HD041','CT20240306065'),
('TT066',NULL,'COC050',2800000,'CASH','2024-04-06 10:00:00','DEPOSIT','COMPLETED','C峄峜 HD042','CT20240406066'),
('TT067',NULL,'COC051',3200000,'BANK_TRANSFER','2024-05-06 09:00:00','DEPOSIT','COMPLETED','C峄峜 HD043','CT20240506067'),
('TT068',NULL,'COC052',4900000,'CASH','2024-01-06 10:00:00','DEPOSIT','COMPLETED','C峄峜 HD059','CT20240106068'),
('TT069',NULL,'COC053',2800000,'BANK_TRANSFER','2024-02-06 09:00:00','DEPOSIT','COMPLETED','C峄峜 HD060','CT20240206069'),
-- Monthly rent cho th谩ng g岷 膽芒y
('TT070','HD038',NULL,4500000,'BANK_TRANSFER','2024-02-01 08:00:00','MONTHLY_RENT','COMPLETED','Th谩ng 2/2024 HD038','CT20240201070'),
('TT071','HD060',NULL,2800000,'CASH','2024-04-01 08:00:00','MONTHLY_RENT','COMPLETED','Th谩ng 4/2024 HD060','CT20240401071'),
-- SERVICE charges
('TT072','HD003',NULL,100000,'BANK_TRANSFER','2024-04-01 09:00:00','SERVICE','COMPLETED','WiFi th谩ng 4 HD003','CT20240401072'),
('TT073','HD004',NULL,100000,'BANK_TRANSFER','2024-04-15 09:00:00','SERVICE','COMPLETED','WiFi th谩ng 4 HD004','CT20240415073'),
('TT074','HD005',NULL,100000,'CASH','2024-05-01 09:00:00','SERVICE','COMPLETED','WiFi th谩ng 5 HD005','CT20240501074'),
('TT075','HD006',NULL,100000,'BANK_TRANSFER','2024-05-15 09:00:00','SERVICE','COMPLETED','WiFi th谩ng 5 HD006','CT20240515075'),
-- Th锚m 膽峄?膽峄?150
('TT076','HD007',NULL,2800000,'CASH','2024-06-01 08:00:00','MONTHLY_RENT','COMPLETED','Th谩ng 6/2024 HD007','CT20240601076'),
('TT077','HD008',NULL,3400000,'BANK_TRANSFER','2024-06-15 08:00:00','MONTHLY_RENT','COMPLETED','Th谩ng 6/2024 HD008','CT20240615077'),
('TT078','HD009',NULL,3400000,'CASH','2024-07-01 08:00:00','MONTHLY_RENT','COMPLETED','Th谩ng 7/2024 HD009','CT20240701078'),
('TT079','HD010',NULL,2500000,'BANK_TRANSFER','2024-07-15 08:00:00','MONTHLY_RENT','COMPLETED','Th谩ng 7/2024 HD010','CT20240715079'),
('TT080','HD011',NULL,3100000,'CASH','2024-08-01 08:00:00','MONTHLY_RENT','COMPLETED','Th谩ng 8/2024 HD011','CT20240801080'),
('TT081','HD012',NULL,4100000,'BANK_TRANSFER','2024-08-15 08:00:00','MONTHLY_RENT','COMPLETED','Th谩ng 8/2024 HD012','CT20240815081'),
('TT082','HD013',NULL,4900000,'CASH','2024-09-01 08:00:00','MONTHLY_RENT','COMPLETED','Th谩ng 9/2024 HD013','CT20240901082'),
('TT083','HD014',NULL,2700000,'BANK_TRANSFER','2024-09-15 08:00:00','MONTHLY_RENT','COMPLETED','Th谩ng 9/2024 HD014','CT20240915083'),
('TT084','HD015',NULL,3300000,'CASH','2024-10-01 08:00:00','MONTHLY_RENT','COMPLETED','Th谩ng 10/2024 HD015','CT20241001084'),
('TT085','HD016',NULL,4300000,'BANK_TRANSFER','2024-10-15 08:00:00','MONTHLY_RENT','COMPLETED','Th谩ng 10/2024 HD016','CT20241015085'),
('TT086','HD017',NULL,5100000,'CASH','2024-11-01 08:00:00','MONTHLY_RENT','COMPLETED','Th谩ng 11/2024 HD017','CT20241101086'),
('TT087','HD018',NULL,2900000,'BANK_TRANSFER','2024-11-15 08:00:00','MONTHLY_RENT','COMPLETED','Th谩ng 11/2024 HD018','CT20241115087'),
('TT088','HD019',NULL,3500000,'CASH','2024-12-01 08:00:00','MONTHLY_RENT','COMPLETED','Th谩ng 12/2024 HD019','CT20241201088'),
('TT089','HD020',NULL,4500000,'BANK_TRANSFER','2024-12-15 08:00:00','MONTHLY_RENT','COMPLETED','Th谩ng 12/2024 HD020','CT20241215089'),
('TT090','HD021',NULL,5200000,'CASH','2025-01-01 08:00:00','MONTHLY_RENT','COMPLETED','Th谩ng 1/2025 HD021','CT20250101090'),
('TT091','HD022',NULL,5200000,'BANK_TRANSFER','2025-01-15 08:00:00','MONTHLY_RENT','COMPLETED','Th谩ng 1/2025 HD022','CT20250115091'),
('TT092','HD003',NULL,2600000,'BANK_TRANSFER','2025-01-01 08:00:00','MONTHLY_RENT','COMPLETED','Th谩ng 1/2025 HD003','CT20250101092'),
('TT093','HD004',NULL,3200000,'CASH','2025-01-15 08:00:00','MONTHLY_RENT','COMPLETED','Th谩ng 1/2025 HD004','CT20250115093'),
('TT094','HD005',NULL,4200000,'BANK_TRANSFER','2025-02-01 08:00:00','MONTHLY_RENT','COMPLETED','Th谩ng 2/2025 HD005','CT20250201094'),
('TT095','HD006',NULL,5000000,'CASH','2025-02-15 08:00:00','MONTHLY_RENT','COMPLETED','Th谩ng 2/2025 HD006','CT20250215095'),
('TT096','HD007',NULL,2800000,'BANK_TRANSFER','2025-03-01 08:00:00','MONTHLY_RENT','COMPLETED','Th谩ng 3/2025 HD007','CT20250301096'),
('TT097','HD008',NULL,3400000,'CASH','2025-03-15 08:00:00','MONTHLY_RENT','COMPLETED','Th谩ng 3/2025 HD008','CT20250315097'),
('TT098','HD009',NULL,3400000,'BANK_TRANSFER','2025-04-01 08:00:00','MONTHLY_RENT','COMPLETED','Th谩ng 4/2025 HD009','CT20250401098'),
('TT099','HD010',NULL,2500000,'CASH','2025-04-15 08:00:00','MONTHLY_RENT','COMPLETED','Th谩ng 4/2025 HD010','CT20250415099'),
('TT100','HD011',NULL,3100000,'BANK_TRANSFER','2025-05-01 08:00:00','MONTHLY_RENT','COMPLETED','Th谩ng 5/2025 HD011','CT20250501100'),
('TT101','HD012',NULL,4100000,'CASH','2025-05-15 08:00:00','MONTHLY_RENT','COMPLETED','Th谩ng 5/2025 HD012','CT20250515101'),
('TT102','HD017',NULL,5100000,'BANK_TRANSFER','2025-02-01 08:00:00','MONTHLY_RENT','COMPLETED','Th谩ng 2/2025 HD017','CT20250201102'),
('TT103','HD018',NULL,2900000,'CASH','2025-02-15 08:00:00','MONTHLY_RENT','COMPLETED','Th谩ng 2/2025 HD018','CT20250215103'),
('TT104','HD019',NULL,3500000,'BANK_TRANSFER','2025-03-01 08:00:00','MONTHLY_RENT','COMPLETED','Th谩ng 3/2025 HD019','CT20250301104'),
('TT105','HD020',NULL,4500000,'CASH','2025-03-15 08:00:00','MONTHLY_RENT','COMPLETED','Th谩ng 3/2025 HD020','CT20250315105'),
-- REFUND cho expired
('TT106','HD032',NULL,3500000,'BANK_TRANSFER','2023-06-05 10:00:00','REFUND','COMPLETED','Ho脿n c峄峜 HD032','CT20230605106'),
('TT107','HD033',NULL,3360000,'CASH','2023-07-05 10:00:00','REFUND','COMPLETED','Ho脿n c峄峜 HD033 (70%)','CT20230705107'),
('TT108','HD034',NULL,3430000,'BANK_TRANSFER','2023-08-05 10:00:00','REFUND','COMPLETED','Ho脿n c峄峜 HD034 (70%)','CT20230805108'),
-- Deposit cho expired H膼
('TT109',NULL,'COC042',5000000,'BANK_TRANSFER','2022-05-06 09:00:00','DEPOSIT','COMPLETED','C峄峜 HD032','CT20220506109'),
('TT110',NULL,'COC043',4800000,'CASH','2022-06-06 10:00:00','DEPOSIT','COMPLETED','C峄峜 HD033','CT20220606110'),
('TT111',NULL,'COC044',4900000,'BANK_TRANSFER','2022-07-06 09:00:00','DEPOSIT','COMPLETED','C峄峜 HD034','CT20220706111'),
('TT112',NULL,'COC045',5100000,'CASH','2022-08-06 10:00:00','DEPOSIT','COMPLETED','C峄峜 HD035','CT20220806112'),
('TT113',NULL,'COC046',5200000,'BANK_TRANSFER','2022-09-06 09:00:00','DEPOSIT','COMPLETED','C峄峜 HD036','CT20220906113'),
-- Th锚m monthly rent c农 cho expired
('TT114','HD032',NULL,5000000,'BANK_TRANSFER','2022-07-01 08:00:00','MONTHLY_RENT','COMPLETED','Th谩ng 7/2022','CT20220701114'),
('TT115','HD033',NULL,4800000,'CASH','2022-08-01 08:00:00','MONTHLY_RENT','COMPLETED','Th谩ng 8/2022','CT20220801115'),
('TT116','HD034',NULL,4900000,'BANK_TRANSFER','2022-09-01 08:00:00','MONTHLY_RENT','COMPLETED','Th谩ng 9/2022','CT20220901116'),
('TT117','HD028',NULL,3200000,'CASH','2023-07-01 08:00:00','MONTHLY_RENT','COMPLETED','Th谩ng 7/2023 HD028','CT20230701117'),
('TT118','HD029',NULL,3400000,'BANK_TRANSFER','2023-08-01 08:00:00','MONTHLY_RENT','COMPLETED','Th谩ng 8/2023 HD029','CT20230801118'),
('TT119','HD030',NULL,3100000,'CASH','2023-09-01 08:00:00','MONTHLY_RENT','COMPLETED','Th谩ng 9/2023 HD030','CT20230901119'),
('TT120','HD031',NULL,4300000,'BANK_TRANSFER','2023-10-01 08:00:00','MONTHLY_RENT','COMPLETED','Th谩ng 10/2023 HD031','CT20231001120');

-- =============================================================
-- 12. TAI_SAN (th锚m 4 鈫?t峄昻g = 10)
-- =============================================================
INSERT INTO TAI_SAN (MaTaiSan, TenTaiSan, LoaiTaiSan, TinhTrang) VALUES
('TS007','B脿n h峄峜',        'N峄檌 th岷',  'IN_USE'),
('TS008','Gh岷?,            'N峄檌 th岷',  'IN_USE'),
('TS009','T峄?l岷h mini',   '膼i峄噉 m谩y',  'IN_USE'),
('TS010','B矛nh n贸ng l岷h', '膼i峄噉 m谩y',  'IN_USE');

-- =============================================================
-- 13. BANG_GIAO  (th锚m 39 鈫?t峄昻g = 40)
-- Ch峄?cho h峄 膽峄搉g ACTIVE / TERMINATED
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
-- PENDING (h峄 膽峄搉g PENDING_FIRST_PAYMENT)
('BG036','HD023','2025-02-01 09:00:00','PENDING','NV009'),
('BG037','HD024','2025-02-15 09:00:00','PENDING','NV012'),
('BG038','HD025','2025-03-01 09:00:00','PENDING','NV015'),
-- CANCELLED
('BG039','HD035','2022-09-01 09:00:00','CANCELLED','NV011'),
('BG040','HD036','2022-10-01 09:00:00','CANCELLED','NV014');

-- =============================================================
-- 14. BANGGIAO_TAISAN  (~200 records, 5 t脿i s岷 脳 40 b脿n giao)
-- =============================================================
INSERT INTO BANGGIAO_TAISAN (MaBanGiao, MaTaiSan, SoLuong, TinhTrangLucGiao, GhiChu, DaKiemTra) VALUES
('BG002','TS001',2,'AVAILABLE','2 gi瓢峄漬g t岷g',TRUE),('BG002','TS002',2,'AVAILABLE','2 n峄噈',TRUE),('BG002','TS003',1,'AVAILABLE','1 t峄?,TRUE),('BG002','TS004',2,'AVAILABLE','2 ch矛a kh贸a',TRUE),('BG002','TS005',1,'AVAILABLE','1 膽i峄乽 h貌a',TRUE),
('BG003','TS001',4,'AVAILABLE','4 gi瓢峄漬g t岷g',TRUE),('BG003','TS002',4,'AVAILABLE','4 n峄噈',TRUE),('BG003','TS003',2,'AVAILABLE','2 t峄?,TRUE),('BG003','TS004',4,'AVAILABLE','4 ch矛a kh贸a',TRUE),('BG003','TS005',1,'AVAILABLE','1 膽i峄乽 h貌a',TRUE),
('BG004','TS001',4,'AVAILABLE','4 gi瓢峄漬g',TRUE),('BG004','TS002',4,'AVAILABLE','4 n峄噈',TRUE),('BG004','TS003',2,'AVAILABLE','2 t峄?,TRUE),('BG004','TS004',4,'AVAILABLE','4 ch矛a',TRUE),('BG004','TS007',4,'AVAILABLE','4 b脿n h峄峜',TRUE),
('BG005','TS001',6,'AVAILABLE','6 gi瓢峄漬g',TRUE),('BG005','TS002',6,'AVAILABLE','6 n峄噈',TRUE),('BG005','TS003',2,'AVAILABLE','2 t峄?,TRUE),('BG005','TS004',6,'AVAILABLE','6 ch矛a',TRUE),('BG005','TS005',1,'AVAILABLE','1 膼H',TRUE),
('BG006','TS001',2,'AVAILABLE','2 gi瓢峄漬g',TRUE),('BG006','TS002',2,'AVAILABLE','2 n峄噈',TRUE),('BG006','TS004',2,'AVAILABLE','2 ch矛a',TRUE),('BG006','TS007',2,'AVAILABLE','2 b脿n',TRUE),('BG006','TS008',2,'AVAILABLE','2 gh岷?,TRUE),
('BG007','TS001',4,'AVAILABLE','4 gi瓢峄漬g',TRUE),('BG007','TS002',4,'AVAILABLE','4 n峄噈',TRUE),('BG007','TS003',2,'AVAILABLE','2 t峄?,TRUE),('BG007','TS004',4,'AVAILABLE','4 ch矛a',TRUE),('BG007','TS005',1,'AVAILABLE','1 膼H',TRUE),
('BG008','TS001',4,'AVAILABLE','4 gi瓢峄漬g',TRUE),('BG008','TS002',4,'AVAILABLE','4 n峄噈',TRUE),('BG008','TS004',4,'AVAILABLE','4 ch矛a',TRUE),('BG008','TS007',4,'AVAILABLE','4 b脿n',TRUE),('BG008','TS008',4,'AVAILABLE','4 gh岷?,TRUE),
('BG009','TS001',2,'AVAILABLE','2 gi瓢峄漬g',TRUE),('BG009','TS002',2,'AVAILABLE','2 n峄噈',TRUE),('BG009','TS004',2,'AVAILABLE','2 ch矛a',TRUE),('BG009','TS006',1,'AVAILABLE','1 qu岷',TRUE),('BG009','TS009',1,'AVAILABLE','1 t峄?l岷h',TRUE),
('BG010','TS001',4,'AVAILABLE','4 gi瓢峄漬g',TRUE),('BG010','TS002',4,'AVAILABLE','4 n峄噈',TRUE),('BG010','TS003',2,'AVAILABLE','2 t峄?,TRUE),('BG010','TS004',4,'AVAILABLE','4 ch矛a',TRUE),('BG010','TS005',1,'AVAILABLE','1 膼H',TRUE),
('BG011','TS001',4,'AVAILABLE','4 gi瓢峄漬g',TRUE),('BG011','TS002',4,'AVAILABLE','4 n峄噈',TRUE),('BG011','TS004',4,'AVAILABLE','4 ch矛a',TRUE),('BG011','TS007',4,'AVAILABLE','4 b脿n',TRUE),('BG011','TS010',1,'AVAILABLE','1 b矛nh n贸ng l岷h',TRUE),
('BG012','TS001',6,'AVAILABLE','6 gi瓢峄漬g',TRUE),('BG012','TS002',6,'AVAILABLE','6 n峄噈',TRUE),('BG012','TS003',2,'AVAILABLE','2 t峄?,TRUE),('BG012','TS004',6,'AVAILABLE','6 ch矛a',TRUE),('BG012','TS005',1,'AVAILABLE','1 膼H',TRUE),
('BG013','TS001',2,'AVAILABLE','2 gi瓢峄漬g',TRUE),('BG013','TS002',2,'AVAILABLE','2 n峄噈',TRUE),('BG013','TS004',2,'AVAILABLE','2 ch矛a',TRUE),('BG013','TS007',2,'AVAILABLE','2 b脿n',TRUE),('BG013','TS008',2,'AVAILABLE','2 gh岷?,TRUE),
('BG014','TS001',4,'AVAILABLE','4 gi瓢峄漬g',TRUE),('BG014','TS002',4,'AVAILABLE','4 n峄噈',TRUE),('BG014','TS003',2,'AVAILABLE','2 t峄?,TRUE),('BG014','TS004',4,'AVAILABLE','4 ch矛a',TRUE),('BG014','TS009',1,'AVAILABLE','1 t峄?l岷h',TRUE),
('BG015','TS001',4,'AVAILABLE','4 gi瓢峄漬g',TRUE),('BG015','TS002',4,'AVAILABLE','4 n峄噈',TRUE),('BG015','TS004',4,'AVAILABLE','4 ch矛a',TRUE),('BG015','TS005',1,'AVAILABLE','1 膼H',TRUE),('BG015','TS010',1,'AVAILABLE','1 b矛nh NL',TRUE),
('BG016','TS001',6,'AVAILABLE','6 gi瓢峄漬g',TRUE),('BG016','TS002',6,'AVAILABLE','6 n峄噈',TRUE),('BG016','TS003',2,'AVAILABLE','2 t峄?,TRUE),('BG016','TS004',6,'AVAILABLE','6 ch矛a',TRUE),('BG016','TS005',1,'AVAILABLE','1 膼H',TRUE),
('BG017','TS001',2,'AVAILABLE','2 gi瓢峄漬g',TRUE),('BG017','TS002',2,'AVAILABLE','2 n峄噈',TRUE),('BG017','TS004',2,'AVAILABLE','2 ch矛a',TRUE),('BG017','TS006',1,'AVAILABLE','1 qu岷',TRUE),('BG017','TS007',2,'AVAILABLE','2 b脿n',TRUE),
('BG018','TS001',4,'AVAILABLE','4 gi瓢峄漬g',TRUE),('BG018','TS002',4,'AVAILABLE','4 n峄噈',TRUE),('BG018','TS003',1,'AVAILABLE','1 t峄?,TRUE),('BG018','TS004',4,'AVAILABLE','4 ch矛a',TRUE),('BG018','TS005',1,'AVAILABLE','1 膼H',TRUE),
('BG019','TS001',4,'AVAILABLE','4 gi瓢峄漬g',TRUE),('BG019','TS002',4,'AVAILABLE','4 n峄噈',TRUE),('BG019','TS004',4,'AVAILABLE','4 ch矛a',TRUE),('BG019','TS007',4,'AVAILABLE','4 b脿n',TRUE),('BG019','TS008',4,'AVAILABLE','4 gh岷?,TRUE),
('BG020','TS001',6,'AVAILABLE','6 gi瓢峄漬g',TRUE),('BG020','TS002',6,'AVAILABLE','6 n峄噈',TRUE),('BG020','TS003',2,'AVAILABLE','2 t峄?,TRUE),('BG020','TS004',6,'AVAILABLE','6 ch矛a',TRUE),('BG020','TS009',1,'AVAILABLE','1 t峄?l岷h',TRUE),
('BG021','TS001',6,'AVAILABLE','6 gi瓢峄漬g',TRUE),('BG021','TS002',6,'AVAILABLE','6 n峄噈',TRUE),('BG021','TS003',2,'AVAILABLE','2 t峄?,TRUE),('BG021','TS004',6,'AVAILABLE','6 ch矛a',TRUE),('BG021','TS005',1,'AVAILABLE','1 膼H',TRUE),
('BG022','TS001',4,'AVAILABLE','4 gi瓢峄漬g',TRUE),('BG022','TS002',4,'AVAILABLE','4 n峄噈',TRUE),('BG022','TS004',4,'AVAILABLE','4 ch矛a',TRUE),('BG022','TS005',1,'AVAILABLE','1 膼H',TRUE),('BG022','TS010',1,'AVAILABLE','1 BNL',TRUE),
('BG023','TS001',4,'AVAILABLE','4 gi瓢峄漬g',TRUE),('BG023','TS002',4,'AVAILABLE','4 n峄噈',TRUE),('BG023','TS004',4,'AVAILABLE','4 ch矛a',TRUE),('BG023','TS007',4,'AVAILABLE','4 b脿n',TRUE),('BG023','TS008',4,'AVAILABLE','4 gh岷?,TRUE),
('BG024','TS001',4,'AVAILABLE','4 gi瓢峄漬g',TRUE),('BG024','TS002',4,'AVAILABLE','4 n峄噈',TRUE),('BG024','TS003',2,'AVAILABLE','2 t峄?,TRUE),('BG024','TS004',4,'AVAILABLE','4 ch矛a',TRUE),('BG024','TS009',1,'AVAILABLE','1 t峄?l岷h',TRUE),
('BG025','TS001',4,'AVAILABLE','4 gi瓢峄漬g',TRUE),('BG025','TS002',4,'AVAILABLE','4 n峄噈',TRUE),('BG025','TS004',4,'AVAILABLE','4 ch矛a',TRUE),('BG025','TS005',1,'AVAILABLE','1 膼H',TRUE),('BG025','TS006',1,'AVAILABLE','1 qu岷',TRUE),
('BG026','TS001',6,'AVAILABLE','6 gi瓢峄漬g',TRUE),('BG026','TS002',6,'AVAILABLE','6 n峄噈',TRUE),('BG026','TS003',2,'AVAILABLE','2 t峄?,TRUE),('BG026','TS004',6,'AVAILABLE','6 ch矛a',TRUE),('BG026','TS005',1,'AVAILABLE','1 膼H',TRUE),
('BG027','TS001',6,'AVAILABLE','6 gi瓢峄漬g',TRUE),('BG027','TS002',6,'AVAILABLE','6 n峄噈',TRUE),('BG027','TS003',2,'AVAILABLE','2 t峄?,TRUE),('BG027','TS004',6,'AVAILABLE','6 ch矛a',TRUE),('BG027','TS010',1,'AVAILABLE','1 BNL',TRUE),
('BG028','TS001',6,'AVAILABLE','6 gi瓢峄漬g',TRUE),('BG028','TS002',6,'AVAILABLE','6 n峄噈',TRUE),('BG028','TS003',2,'AVAILABLE','2 t峄?,TRUE),('BG028','TS004',6,'AVAILABLE','6 ch矛a',TRUE),('BG028','TS005',1,'AVAILABLE','1 膼H',TRUE),
('BG029','TS001',4,'AVAILABLE','4 gi瓢峄漬g',TRUE),('BG029','TS002',4,'AVAILABLE','4 n峄噈',TRUE),('BG029','TS004',4,'AVAILABLE','4 ch矛a',TRUE),('BG029','TS005',1,'AVAILABLE','1 膼H',TRUE),('BG029','TS007',4,'AVAILABLE','4 b脿n',TRUE),
('BG030','TS001',4,'AVAILABLE','4 gi瓢峄漬g',TRUE),('BG030','TS002',4,'AVAILABLE','4 n峄噈',TRUE),('BG030','TS003',2,'AVAILABLE','2 t峄?,TRUE),('BG030','TS004',4,'AVAILABLE','4 ch矛a',TRUE),('BG030','TS005',1,'AVAILABLE','1 膼H',TRUE),
('BG031','TS001',6,'AVAILABLE','6 gi瓢峄漬g',TRUE),('BG031','TS002',6,'AVAILABLE','6 n峄噈',TRUE),('BG031','TS003',2,'AVAILABLE','2 t峄?,TRUE),('BG031','TS004',6,'AVAILABLE','6 ch矛a',TRUE),('BG031','TS008',6,'AVAILABLE','6 gh岷?,TRUE),
('BG032','TS001',4,'AVAILABLE','4 gi瓢峄漬g',TRUE),('BG032','TS002',4,'AVAILABLE','4 n峄噈',TRUE),('BG032','TS003',2,'AVAILABLE','2 t峄?,TRUE),('BG032','TS004',4,'AVAILABLE','4 ch矛a',TRUE),('BG032','TS009',1,'AVAILABLE','1 t峄?l岷h',TRUE),
('BG033','TS001',2,'AVAILABLE','2 gi瓢峄漬g',TRUE),('BG033','TS002',2,'AVAILABLE','2 n峄噈',TRUE),('BG033','TS004',2,'AVAILABLE','2 ch矛a',TRUE),('BG033','TS007',2,'AVAILABLE','2 b脿n',TRUE),('BG033','TS010',1,'AVAILABLE','1 BNL',TRUE),
('BG034','TS001',6,'AVAILABLE','6 gi瓢峄漬g',TRUE),('BG034','TS002',6,'AVAILABLE','6 n峄噈',TRUE),('BG034','TS003',2,'AVAILABLE','2 t峄?,TRUE),('BG034','TS004',6,'AVAILABLE','6 ch矛a',TRUE),('BG034','TS005',1,'AVAILABLE','1 膼H',TRUE),
('BG035','TS001',4,'AVAILABLE','4 gi瓢峄漬g',TRUE),('BG035','TS002',4,'AVAILABLE','4 n峄噈',TRUE),('BG035','TS004',4,'AVAILABLE','4 ch矛a',TRUE),('BG035','TS005',1,'AVAILABLE','1 膼H',TRUE),('BG035','TS007',4,'AVAILABLE','4 b脿n',TRUE),
-- BG036鈥?40 (PENDING/CANCELLED - ch瓢a ki峄僲 tra)
('BG036','TS001',2,'AVAILABLE','2 gi瓢峄漬g',FALSE),('BG036','TS002',2,'AVAILABLE','2 n峄噈',FALSE),('BG036','TS004',2,'AVAILABLE','2 ch矛a',FALSE),('BG036','TS007',2,'AVAILABLE','2 b脿n',FALSE),('BG036','TS008',2,'AVAILABLE','2 gh岷?,FALSE),
('BG037','TS001',2,'AVAILABLE','2 gi瓢峄漬g',FALSE),('BG037','TS002',2,'AVAILABLE','2 n峄噈',FALSE),('BG037','TS004',2,'AVAILABLE','2 ch矛a',FALSE),('BG037','TS007',2,'AVAILABLE','2 b脿n',FALSE),('BG037','TS009',1,'AVAILABLE','1 t峄?l岷h',FALSE),
('BG038','TS001',2,'AVAILABLE','2 gi瓢峄漬g',FALSE),('BG038','TS002',2,'AVAILABLE','2 n峄噈',FALSE),('BG038','TS004',2,'AVAILABLE','2 ch矛a',FALSE),('BG038','TS006',1,'AVAILABLE','1 qu岷',FALSE),('BG038','TS010',1,'AVAILABLE','1 BNL',FALSE),
('BG039','TS001',6,'AVAILABLE','6 gi瓢峄漬g',FALSE),('BG039','TS002',6,'AVAILABLE','6 n峄噈',FALSE),('BG039','TS003',2,'AVAILABLE','2 t峄?,FALSE),('BG039','TS004',6,'AVAILABLE','6 ch矛a',FALSE),('BG039','TS005',1,'AVAILABLE','1 膼H',FALSE),
('BG040','TS001',6,'AVAILABLE','6 gi瓢峄漬g',FALSE),('BG040','TS002',6,'AVAILABLE','6 n峄噈',FALSE),('BG040','TS003',2,'AVAILABLE','2 t峄?,FALSE),('BG040','TS004',6,'AVAILABLE','6 ch矛a',FALSE),('BG040','TS005',1,'AVAILABLE','1 膼H',FALSE);

-- =============================================================
-- 15. TRA_PHONG  (30 y锚u c岷 cho H膼 TERMINATED/ACTIVE c农)
-- =============================================================
INSERT INTO TRA_PHONG (MaTra, MaHopDong, NgayYeuCau, NgayTraDuKien, NgayTraThucTe, TinhTrangPhong, LyDo, TyLeHoanCoc, SoTienHoan, TrangThai, MaNVXuLy) VALUES
('TR001','HD028','2024-06-15 09:00:00','2024-06-30','2024-06-30','GOOD','H岷縯 h峄 膽峄搉g, kh么ng gia h岷',100.00,3200000,'COMPLETED','NV002'),
('TR002','HD029','2024-07-20 10:00:00','2024-07-31','2024-07-31','DIRTY','H岷縯 H膼',70.00,2380000,'COMPLETED','NV005'),
('TR003','HD030','2024-08-20 09:00:00','2024-08-31','2024-08-31','GOOD','H岷縯 H膼',100.00,3100000,'COMPLETED','NV008'),
('TR004','HD031','2024-09-20 10:00:00','2024-09-30','2024-09-30','DAMAGED','H峄弉g c峄璦 s峄?,50.00,2150000,'COMPLETED','NV011'),
('TR005','HD032','2023-05-20 09:00:00','2023-05-31','2023-05-31','GOOD','H岷縯 H膼, kh么ng gia h岷',100.00,5000000,'COMPLETED','NV002'),
('TR006','HD033','2023-06-20 10:00:00','2023-06-30','2023-06-30','DIRTY','Ph貌ng b岷﹏',70.00,3360000,'COMPLETED','NV005'),
('TR007','HD034','2023-07-20 09:00:00','2023-07-31','2023-07-31','GOOD','H岷縯 H膼',100.00,4900000,'COMPLETED','NV008'),
('TR008','HD035','2023-08-20 10:00:00','2023-08-31','2023-08-31','SEVERELY_DAMAGED','Ph貌ng h瓢 n岷穘g',0.00,0,'COMPLETED','NV011'),
('TR009','HD036','2023-09-20 09:00:00','2023-09-30','2023-09-30','GOOD','H岷縯 H膼',100.00,5200000,'COMPLETED','NV014'),
('TR010','HD038','2024-12-25 10:00:00','2025-01-09','2025-01-09','DIRTY','Ph貌ng ch瓢a d峄峮',70.00,3150000,'COMPLETED','NV002'),
('TR011','HD039','2024-02-15 09:00:00','2024-02-29','2024-02-29','GOOD','H岷縯 H膼',100.00,3200000,'COMPLETED','NV003'),
('TR012','HD046','2024-12-20 10:00:00','2024-12-31','2024-12-31','DAMAGED','H瓢 h峄弉g t峄?,60.00,1680000,'COMPLETED','NV005'),
('TR013','HD047','2024-01-20 09:00:00','2024-01-31','2024-01-31','GOOD','H岷縯 H膼',100.00,2800000,'COMPLETED','NV006'),
('TR014','HD048','2024-02-20 10:00:00','2024-02-29','2024-02-29','DIRTY','B岷﹏',70.00,2380000,'COMPLETED','NV008'),
('TR015','HD049','2024-03-20 09:00:00','2024-03-31','2024-03-31','GOOD','H岷縯 H膼',100.00,3400000,'COMPLETED','NV009'),
('TR016','HD050','2024-04-20 10:00:00','2024-04-30','2024-04-30','GOOD','H岷縯 H膼',100.00,3400000,'COMPLETED','NV011'),
('TR017','HD051','2024-05-20 09:00:00','2024-05-31','2024-05-31','DAMAGED','H峄弉g 膽猫n',80.00,3840000,'COMPLETED','NV012'),
('TR018','HD052','2024-06-20 10:00:00','2024-06-30','2024-06-30','GOOD','H岷縯 H膼',100.00,2500000,'COMPLETED','NV014'),
('TR019','HD053','2024-07-20 09:00:00','2024-07-31','2024-07-31','DIRTY','C岷 t峄昻g v峄?sinh',70.00,1750000,'COMPLETED','NV015'),
('TR020','HD054','2024-08-20 10:00:00','2024-08-31','2024-08-31','GOOD','H岷縯 H膼',100.00,3100000,'COMPLETED','NV017'),
('TR021','HD055','2024-09-20 09:00:00','2024-09-30','2024-09-30','SEVERELY_DAMAGED','H瓢 n岷穘g',0.00,0,'COMPLETED','NV019'),
('TR022','HD056','2024-10-20 10:00:00','2024-10-31','2024-10-31','GOOD','H岷縯 H膼',100.00,4100000,'COMPLETED','NV002'),
('TR023','HD057','2024-11-20 09:00:00','2024-11-30','2024-11-30','DIRTY','B岷﹏ v峄玜',70.00,2870000,'COMPLETED','NV003'),
('TR024','HD058','2024-12-20 10:00:00','2024-12-31','2024-12-31','GOOD','H岷縯 H膼',100.00,4900000,'COMPLETED','NV005'),
-- INSPECTING
('TR025','HD003','2025-06-01 09:00:00','2025-06-28', NULL,         NULL,'Chuy峄僴 n啤i 峄?,NULL,NULL,'INSPECTING','NV002'),
('TR026','HD007','2025-06-02 10:00:00','2025-06-30', NULL,         NULL,'K岷縯 th煤c h峄 膽峄搉g',NULL,NULL,'INSPECTING','NV005'),
('TR027','HD011','2025-06-03 09:00:00','2025-06-30', NULL,         NULL,'Sinh vi锚n t峄憈 nghi峄噋',NULL,NULL,'INSPECTING','NV008'),
-- PENDING
('TR028','HD013','2025-06-04 10:00:00','2025-07-01', NULL,         NULL,'Chuy峄僴 c么ng t谩c',NULL,NULL,'PENDING',NULL),
('TR029','HD017','2025-06-05 09:00:00','2025-07-01', NULL,         NULL,'Gia 膽矛nh c贸 vi峄嘽',NULL,NULL,'PENDING',NULL),
('TR030','HD021','2025-06-06 10:00:00','2025-07-01', NULL,         NULL,'H岷縯 ti峄乶',NULL,NULL,'PENDING',NULL);

-- =============================================================
-- 16. CHITIETKHAUTRU  (90 b岷 ghi, ~3 m峄梚 tra ph貌ng)
-- =============================================================
INSERT INTO CHITIETKHAUTRU (MaTra, LoaiPhi, SoTien, GhiChu) VALUES
('TR001','DIEN',  150000,'Ti峄乶 膽i峄噉 th谩ng cu峄慽'),
('TR001','NUOC',   80000,'Ti峄乶 n瓢峄沜 th谩ng cu峄慽'),
('TR001','DICH_VU',100000,'WiFi th谩ng cu峄慽'),
('TR002','DIEN',  200000,'膼i峄噉 v瓢峄 ch峄?ti锚u'),
('TR002','NUOC',  100000,'N瓢峄沜 ph谩t sinh'),
('TR002','HU_HONG',960000,'Ph岷 ph貌ng d啤 30% c峄峜'),
('TR003','DIEN',  120000,'膼i峄噉 th谩ng cu峄慽'),
('TR003','NUOC',   60000,'N瓢峄沜 th谩ng cu峄慽'),
('TR003','DICH_VU', 50000,'Ph铆 v峄?sinh chung'),
('TR004','DIEN',  180000,'膼i峄噉 th谩ng cu峄慽'),
('TR004','NUOC',   90000,'N瓢峄沜 th谩ng cu峄慽'),
('TR004','HU_HONG',1075000,'H峄弉g c峄璦 s峄? b峄搃 th瓢峄漬g'),
('TR005','DIEN',  250000,'Ti峄乶 膽i峄噉'),
('TR005','NUOC',  120000,'Ti峄乶 n瓢峄沜'),
('TR005','DICH_VU',100000,'WiFi'),
('TR006','DIEN',  300000,'膼i峄噉 d瓢'),
('TR006','NUOC',  150000,'N瓢峄沜 d瓢'),
('TR006','HU_HONG',1440000,'Ph岷 b岷﹏ 30% c峄峜'),
('TR007','DIEN',  200000,'膼i峄噉'),
('TR007','NUOC',   80000,'N瓢峄沜'),
('TR007','DICH_VU', 50000,'Ph铆 VV'),
('TR008','DIEN',  350000,'膼i峄噉 v瓢峄'),
('TR008','NUOC',  200000,'N瓢峄沜 v瓢峄'),
('TR008','HU_HONG',5100000,'H瓢 n岷穘g, kh么ng ho脿n c峄峜'),
('TR009','DIEN',  180000,'膼i峄噉'),
('TR009','NUOC',   90000,'N瓢峄沜'),
('TR009','DICH_VU',100000,'WiFi'),
('TR010','DIEN',  220000,'膼i峄噉'),
('TR010','NUOC',  110000,'N瓢峄沜'),
('TR010','HU_HONG',1350000,'Ph岷 b岷﹏ 30%'),
('TR011','DIEN',  160000,'膼i峄噉'),
('TR011','NUOC',   70000,'N瓢峄沜'),
('TR011','DICH_VU', 50000,'Ph铆 v峄?sinh'),
('TR012','DIEN',  200000,'膼i峄噉'),
('TR012','NUOC',  100000,'N瓢峄沜'),
('TR012','HU_HONG',1120000,'H峄弉g t峄? b峄搃 th瓢峄漬g'),
('TR013','DIEN',  140000,'膼i峄噉'),
('TR013','NUOC',   60000,'N瓢峄沜'),
('TR013','DICH_VU',100000,'WiFi'),
('TR014','DIEN',  210000,'膼i峄噉'),
('TR014','NUOC',  100000,'N瓢峄沜'),
('TR014','HU_HONG',1020000,'Ph岷 b岷﹏'),
('TR015','DIEN',  170000,'膼i峄噉'),
('TR015','NUOC',   80000,'N瓢峄沜'),
('TR015','DICH_VU', 50000,'Ph铆 VV'),
('TR016','DIEN',  190000,'膼i峄噉'),
('TR016','NUOC',   95000,'N瓢峄沜'),
('TR016','DICH_VU',100000,'WiFi'),
('TR017','DIEN',  230000,'膼i峄噉'),
('TR017','NUOC',  115000,'N瓢峄沜'),
('TR017','HU_HONG', 960000,'H峄弉g 膽猫n'),
('TR018','DIEN',  150000,'膼i峄噉'),
('TR018','NUOC',   70000,'N瓢峄沜'),
('TR018','DICH_VU', 50000,'Ph铆 VV'),
('TR019','DIEN',  200000,'膼i峄噉'),
('TR019','NUOC',  100000,'N瓢峄沜'),
('TR019','HU_HONG', 750000,'Ph岷 b岷﹏ 30%'),
('TR020','DIEN',  160000,'膼i峄噉'),
('TR020','NUOC',   75000,'N瓢峄沜'),
('TR020','DICH_VU',100000,'WiFi'),
('TR021','DIEN',  280000,'膼i峄噉'),
('TR021','NUOC',  150000,'N瓢峄沜'),
('TR021','HU_HONG',3100000,'H瓢 n岷穘g to脿n b峄?),
('TR022','DIEN',  175000,'膼i峄噉'),
('TR022','NUOC',   85000,'N瓢峄沜'),
('TR022','DICH_VU', 50000,'Ph铆 VV'),
('TR023','DIEN',  220000,'膼i峄噉'),
('TR023','NUOC',  110000,'N瓢峄沜'),
('TR023','HU_HONG',1230000,'Ph岷 b岷﹏ 30%'),
('TR024','DIEN',  200000,'膼i峄噉'),
('TR024','NUOC',   95000,'N瓢峄沜'),
('TR024','DICH_VU',100000,'WiFi'),
-- TR025-030 kh么ng c贸 chi ti岷縯 kh岷 tr峄?v矛 ch瓢a ho脿n th脿nh
-- Th锚m c谩c kho岷 ph岷 tr岷?ch岷璵
('TR001','PHAT',   50000,'Ph岷 tr岷?ch岷璵 2 ng脿y'),
('TR002','PHAT',  100000,'Ph岷 tr岷?ch岷璵 5 ng脿y'),
('TR004','PHAT',   50000,'Ph岷 tr岷?ch岷璵'),
('TR006','PHAT',  150000,'Ph岷 tr岷?ch岷璵 7 ng脿y'),
('TR008','PHAT',  200000,'Ph岷 nhi峄乽 vi ph岷'),
('TR010','PHAT',   80000,'Ph岷 tr岷?ch岷璵'),
('TR012','PHAT',  100000,'Ph岷 tr岷?ch岷璵'),
('TR014','PHAT',   60000,'Ph岷 tr岷?ch岷璵'),
('TR017','PHAT',   80000,'Ph岷 tr岷?ch岷璵'),
('TR019','PHAT',  100000,'Ph岷 tr岷?ch岷璵'),
('TR021','PHAT',  300000,'Nhi峄乽 vi ph岷'),
('TR023','PHAT',  120000,'Ph岷 tr岷?ch岷璵'),
-- NO_TIEN_PHONG
('TR001','NO_TIEN_PHONG',  200000,'N峄?ti峄乶 ph貌ng th谩ng cu峄慽'),
('TR002','NO_TIEN_PHONG',  350000,'N峄?ph铆 d峄媍h v峄?),
('TR004','NO_TIEN_PHONG',  150000,'N峄?ti峄乶 膽i峄噉');

-- =============================================================
-- 17. QUY_DINH  (th锚m 7 鈫?t峄昻g = 10)
-- =============================================================
INSERT INTO QUY_DINH (MaQuyDinh, TieuDe, NhomQuyDinh, NoiDung, NgayHieuLuc, NgayHetHieuLuc, TrangThai, UuTien, ApDungCho, NgayTao) VALUES
('QD004','Quy 膽峄媙h v峄?kh谩ch th膬m','N峄業 QUY PH脪NG','Kh谩ch th膬m ch峄?膽瓢峄 峄?l岷 膽岷縩 22:00. Kh么ng 膽瓢峄 膽峄?ng瓢峄漣 l岷?qua 膽锚m m脿 kh么ng 膽膬ng k媒. Ph岷 th么ng b谩o BQL tr瓢峄沜 24h.','2024-01-01',NULL,'ACTIVE','MEDIUM','T岷 c岷?c瓢 d芒n','2024-01-01 00:00:00'),
('QD005','Quy 膽峄媙h s峄?d峄g 膽i峄噉 n瓢峄沜','T脌I CH脥NH','M峄梚 ph貌ng c贸 m峄ヽ ti锚u th峄?膽i峄噉 mi峄卬 ph铆 50kWh/th谩ng. V瓢峄 m峄ヽ t铆nh 3.500膽/kWh. N瓢峄沜 t铆nh theo 膽岷 ng瓢峄漣 60.000膽/ng瓢峄漣/th谩ng. Thanh to谩n c霉ng ti峄乶 thu锚.','2024-01-01',NULL,'ACTIVE','HIGH','T岷 c岷?c瓢 d芒n','2024-01-01 00:00:00'),
('QD006','Quy 膽峄媙h 膽膬ng k媒 t岷 tr煤','H峄 膼峄扤G','C瓢 d芒n ph岷 cung c岷 CCCD/CMND b岷 g峄慶 膽峄?膽膬ng k媒 t岷 tr煤 trong v貌ng 7 ng脿y k峄?t峄?ng脿y nh岷璶 ph貌ng. BQL s岷?h峄?tr峄?th峄?t峄.','2024-01-01',NULL,'ACTIVE','HIGH','T岷 c岷?c瓢 d芒n','2024-01-01 00:00:00'),
('QD007','Ch铆nh s谩ch gia h岷 h峄 膽峄搉g','H峄 膼峄扤G','Th么ng b谩o gia h岷 tr瓢峄沜 30 ng脿y khi h岷縯 h岷. Gi谩 thu锚 m峄沬 谩p d峄g theo b岷g gi谩 hi峄噉 h脿nh. Kh么ng gia h岷 t峄?膽峄檔g n岷縰 kh么ng c贸 th么ng b谩o b岷眓g v膬n b岷.','2024-06-01',NULL,'ACTIVE','MEDIUM','T岷 c岷?c瓢 d芒n','2024-06-01 00:00:00'),
('QD008','Quy 膽峄媙h an to脿n ph貌ng ch谩y ch峄痑 ch谩y','AN NINH','Tuy峄噒 膽峄慽 kh么ng d霉ng b岷縫 gas, b岷縫 than trong ph貌ng. Kh么ng h煤t thu峄慶 trong t貌a nh脿. Bi岷縯 v峄?tr铆 b矛nh ch峄痑 ch谩y. Kh么ng ch岷痭 l峄慽 tho谩t hi峄僲.','2024-01-01',NULL,'ACTIVE','HIGH','T岷 c岷?c瓢 d芒n','2024-01-01 00:00:00'),
('QD009','Quy 膽峄媙h ch峄?膽峄?xe','N峄業 QUY PH脪NG','Xe m谩y 膽峄?膽煤ng n啤i quy 膽峄媙h, kh么ng 膽峄?tr瓢峄沜 c峄璦 ph貌ng. 脭 t么 kh么ng 膽瓢峄 膽峄?trong khu么n vi锚n. M岷 ch矛a kh贸a xe b谩o ngay BQL.','2024-01-01',NULL,'ACTIVE','LOW','T岷 c岷?c瓢 d芒n','2024-01-01 00:00:00'),
('QD010','Ch铆nh s谩ch mi峄卬 gi岷 ti峄乶 thu锚','T脌I CH脥NH','Sinh vi锚n xu岷 s岷痗 (GPA 鈮?3.5) 膽瓢峄 gi岷 5% ti峄乶 thu锚/th谩ng khi c贸 b岷g 膽i峄僲 x谩c nh岷璶. Nh贸m thu锚 t峄?6 th谩ng li锚n t峄 膽瓢峄 gi岷 3%. Kh么ng 谩p d峄g 膽峄搉g th峄漣.','2025-01-01',NULL,'UPCOMING','LOW','Sinh vi锚n 膽峄?膽i峄乽 ki峄噉','2024-12-01 00:00:00');

-- =============================================================
-- 18. YEU_CAU_THUE  (th锚m 18 鈫?t峄昻g = 20)
-- =============================================================
INSERT INTO YEU_CAU_THUE (MaYeuCauThue, MaKH, LoaiPhong, GiaMongMuon, TieuChiKhac, NgayTao) VALUES
('YCT003','KH006','DORMITORY',800000, 'G岷 tr瓢峄漬g 膼H B谩ch Khoa',    '2024-02-01 09:00:00'),
('YCT004','KH007','SHARED',    900000, 'Ph貌ng 4 ng瓢峄漣, c贸 wifi',      '2024-02-05 10:00:00'),
('YCT005','KH008','DORMITORY',750000, 'Khu y锚n t末nh, g岷 BX',       '2024-03-01 09:00:00'),
('YCT006','KH009','SHARED',   1000000,'4 ng瓢峄漣, c贸 膽i峄乽 h貌a',        '2024-03-10 10:00:00'),
('YCT007','KH010','DORMITORY',800000, 'Gi谩 t峄憈, tho谩ng',             '2024-04-01 09:00:00'),
('YCT008','KH011','SHARED',    850000, 'G岷 Q1, an ninh',             '2024-04-15 10:00:00'),
('YCT009','KH012','DORMITORY',700000, 'Sinh vi锚n, ng芒n s谩ch th岷',   '2024-05-01 09:00:00'),
('YCT010','KH013','SHARED',   1100000,'Ph貌ng 膽么i, s岷h s岷?,          '2024-05-10 10:00:00'),
('YCT011','KH051','DORMITORY',900000, 'Ng瓢峄漣 Trung Qu峄慶, ti岷縩g Anh', '2024-06-01 09:00:00'),
('YCT012','KH053','SHARED',    950000, 'Sinh vi锚n Nh岷璽, y锚n t末nh',   '2024-06-15 10:00:00'),
('YCT013','KH055','DORMITORY',850000, 'H脿n Qu峄慶, g岷 Metro',         '2024-07-01 09:00:00'),
('YCT014','KH057','SHARED',    800000, 'Sinh vi锚n t峄?H脿 N峄檌',         '2024-07-10 10:00:00'),
('YCT015','KH059','DORMITORY',750000, 'T峄?C岷 Th啤 l锚n, gi谩 v峄玜',    '2024-08-01 09:00:00'),
('YCT016','KH061','SHARED',    900000, 'Sinh vi锚n y khoa',            '2024-08-15 10:00:00'),
('YCT017','KH071','DORMITORY',800000, 'Ph貌ng 4-6 ng瓢峄漣 OK',          '2024-09-01 09:00:00'),
('YCT018','KH073','SHARED',    950000, 'G岷 b峄噉h vi峄噉 Ch峄?R岷珁',     '2024-09-15 10:00:00'),
('YCT019','KH085','DORMITORY',700000, 'Sinh vi锚n n膬m nh岷',          '2025-05-01 09:00:00'),
('YCT020','KH090','SHARED',    850000, 'T矛m ph貌ng cho th谩ng 7',      '2025-05-15 10:00:00');

-- =============================================================
-- 19. DICHVU_PHONG m峄?r峄檔g (cho c谩c ph貌ng m峄沬)
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
-- Done 鈥?seed-augmented.sql executed successfully
-- =============================================================

