# 📋 Tài liệu tổng hợp hệ thống – HomeStay Dorm

> Dành cho nhóm phát triển. Bao gồm: mapping UI với Use Case, phân quyền truy cập theo vai trò, luồng liên kết giữa các màn, và thuộc tính UI – bảng dữ liệu.

---

## 1. Danh sách màn hình (UI) và Use Case hệ thống tương ứng

| Màn hình (Tên UI)                                     | Các Use Case hệ thống                | Giải thích (tại sao)                                                                                             |
|-------------------------------------------------------|--------------------------------------|------------------------------------------------------------------------------------------------------------------|
| **Screen 1 – Đăng nhập**                              | UC1: Đăng nhập                       | Cổng vào duy nhất cho tất cả nhân viên.                                                                          |
| **Screen 2 – Dashboard (Tổng quan & công việc chờ)**  | UC1, UC5, UC6, UC7                   | Thống kê nhanh, lịch xem hôm nay, các yêu cầu cần xử lý. Trung tâm điều hướng.                                   |
| **Screen 3 – Quản lý phòng**                          | UC3: Quản lý danh mục chỗ ở          | Thêm, sửa, xóa, cập nhật trạng thái phòng/giường.                                                                |
| **Screen 4 – Đăng ký & Đặt lịch (Booking Workspace)** | UC5, UC6, một phần UC7               | Sale nhập thông tin khách, tìm phòng, tạo lịch xem, tạo yêu cầu cọc.                                             |
| **Screen 5 – Rà soát & Lập hợp đồng**                 | UC9, UC10                            | Kiểm tra điều kiện từng thành viên, lập hợp đồng (PENDING_FIRST_PAYMENT).                                         |
| **Screen 6 – Bàn giao phòng & Biên bản tài sản**      | UC11, UC12                           | Quản lý kiểm tra tài sản, xác nhận bàn giao (chỉ khi hợp đồng đã ACTIVE).                                         |
| **Screen 7 – Yêu cầu trả phòng**                      | UC13                                 | Sale ghi nhận yêu cầu từ khách, chuyển cho quản lý kiểm tra.                                                     |
| **Screen 8 – Kiểm tra trả phòng & Khấu trừ**          | UC14, UC15, UC16                     | Quản lý kiểm tra hiện trạng; kế toán tính tỷ lệ hoàn cọc và khấu trừ.                                            |
| **Screen 9 – Quyết toán & Hoàn cọc**                  | UC17, UC18                           | Kế toán xác nhận thu thêm hoặc hoàn trả tiền cọc.                                                                |
| **Screen 10 – Lập hóa đơn (Invoice Generator)**       | UC19                                 | Kế toán tạo hóa đơn cho đặt cọc, hoàn cọc, tiền phòng, phí dịch vụ, phạt.                                        |
| **Screen 11 – Xác nhận thanh toán cọc**               | UC7 (phần xác nhận), UC8             | Kế toán xem danh sách cọc chờ, xác nhận đã thu tiền → RESERVED. Hệ thống tự động hủy cọc quá hạn.                 |
| **Screen 12 – Quản lý quy định**                      | UC4                                  | Quản lý thêm/sửa/xóa các quy định lưu trú, nội quy, tỷ lệ hoàn cọc, phạt.                                         |

---

## 2. Phân quyền truy cập theo vai trò (Role)

| Màn hình / Route                               | ADMIN | MANAGER | SALE | ACCOUNTANT |
|------------------------------------------------|:-----:|:-------:|:----:|:----------:|
| `/dashboard` (Dashboard)                       | ✅    | ✅      | ✅   | ✅         |
| `/rooms` (Quản lý phòng)                       | ✅    | ✅      | ❌   | ❌         |
| `/booking` (Đăng ký & đặt lịch)                | ✅    | ✅      | ✅   | ❌         |
| `/contracts` (Hợp đồng)                        | ✅    | ✅      | ✅   | ❌         |
| `/handover` (Bàn giao)                         | ✅    | ✅      | ✅   | ❌         |
| `/checkout`, `/checkout/inspect` (Trả phòng)   | ✅    | ✅      | ✅   | ❌         |
| `/settlement` (Quyết toán)                     | ✅    | ✅      | ❌   | ✅         |
| `/create-deposit` (Tạo đơn cọc từ lịch xem)    | ✅    | ❌      | ❌   | ✅         |
| `/deposits` (Quản lý cọc)                      | ✅    | ✅      | ❌   | ✅         |
| `/invoices/new` (Lập hóa đơn)                  | ✅    | ❌      | ❌   | ✅         |
| `/policies` (Quy định)                         | ✅    | ✅      | ❌   | ❌         |

> **Ghi chú:** Quyền được kiểm soát cả ở Sidebar (ẩn menu) và Route (PrivateRoute với prop `roles`).

---

## 3. Luồng liên kết giữa các màn hình (sơ đồ điều hướng)

| Bước | Từ màn hình                     | Hành động                                                                                       | Đi đến màn hình                                   |
|------|---------------------------------|------------------------------------------------------------------------------------------------|--------------------------------------------------|
| 1    | Login                           | Đăng nhập thành công                                                                            | Dashboard                                        |
| 2    | Dashboard                       | Nhấn "+ Tạo đăng ký mới" hoặc menu "Đăng ký & đặt lịch"                                          | Screen 4 (Đăng ký & Đặt lịch)                    |
| 3    | Screen 4                        | Nhập thông tin → Chọn phòng → Lưu lịch xem → Tick "Khách đồng ý" → "Tạo yêu cầu đặt cọc"        | Screen 5 (Lập hợp đồng)                          |
| 4    | Screen 5                        | Rà soát thành viên → Lưu → Điền hợp đồng → "Tạo hợp đồng"                                        | Dashboard (hoặc thông báo)                      |
| 5    | Dashboard / menu                | Kế toán vào "Quản lý cọc"                                                                       | Screen 11 (Xác nhận cọc)                         |
| 6    | Screen 11                       | Xác nhận thanh toán cọc → cập nhật RESERVED                                                      | Screen 10 (Lập hóa đơn cọc)                      |
| 7    | Dashboard / menu                | Kế toán vào "Lập hóa đơn" (thanh toán kỳ đầu) → Xác nhận                                          | Hợp đồng chuyển thành ACTIVE                     |
| 8    | Dashboard / menu                | Manager/Sale vào "Bàn giao"                                                                     | Screen 6 (Bàn giao phòng)                        |
| 9    | Screen 6                        | Kiểm tra tài sản → "Xác nhận bàn giao"                                                           | Dashboard (phòng thành OCCUPIED)                 |
| 10   | Dashboard / menu                | Sale vào "Trả phòng"                                                                            | Screen 7 (Yêu cầu trả phòng)                     |
| 11   | Screen 7                        | Tìm hợp đồng → Nhập ngày trả, lý do → Lưu                                                       | Screen 7 (cập nhật danh sách)                    |
| 12   | Screen 7 (danh sách)            | Quản lý click "Xử lý"                                                                           | Screen 8 (Kiểm tra trả phòng)                    |
| 13   | Screen 8                        | Kiểm tra hiện trạng → Ghi nhận hư hỏng → Tính khấu trừ                                           | Screen 9 (Quyết toán & Hoàn cọc)                 |
| 14   | Screen 9                        | Xác nhận số tiền hoàn/thu thêm → "Xác nhận quyết toán"                                           | Screen 10 (Lập hóa đơn hoàn cọc / thu thêm)      |

**Các liên kết phụ:**
- Từ Dashboard, worklist "Lịch xem hôm nay" → nút "Bắt đầu" → Screen 4 (pre‑fill lịch hẹn).
- Từ Dashboard, worklist "Chờ xử lý cọc" → Screen 11.
- Từ Screen 11, click "Xem hóa đơn" → Screen 10 (chế độ xem hóa đơn cọc).

---

## 4. Thuộc tính chính trên mỗi UI và mapping với bảng dữ liệu

### Screen 1 – Đăng nhập
| UI Field                     | Bảng                        |
|------------------------------|-----------------------------|
| Tài khoản (email/username)   | NHAN_VIEN.Email (hoặc MaNV) |
| Mật khẩu                     | NHAN_VIEN.MatKhau           |
| Ghi nhớ đăng nhập            | (lưu token)                 |

### Screen 2 – Dashboard
| UI Component                                                             | Bảng (nguồn dữ liệu)                         |
|--------------------------------------------------------------------------|----------------------------------------------|
| Thống kê: phòng trống, đang giữ chỗ, đang sử dụng, doanh thu tháng       | PHONG (TinhTrang), THANH_TOAN (doanh thu)    |
| Lịch xem hôm nay (Ngày, giờ, khách, phòng, SĐT)                          | LICH_XEM_PHONG + KHACH_HANG + PHONG          |
| Danh sách cọc chờ xử lý (khách, phòng, số tiền)                          | DAT_COC + KHACH_HANG + PHONG                 |

### Screen 3 – Quản lý phòng
| UI Field                                                                 | Bảng                                         |
|--------------------------------------------------------------------------|----------------------------------------------|
| Mã phòng, Khu/Tầng, Loại phòng/Sức chứa, Giá thuê                         | PHONG (MaPhong, KhuVuc, Tang, SucChua, GiaThue) |
| Trạng thái (badge)                                                       | PHONG.TinhTrang                              |
| Số giường trống                                                          | GIUONG (TinhTrang)                           |
| Drawer thêm/sửa: Mã phòng, Khu, Tầng, Sức chứa, Giá thuê, Trạng thái, Ghi chú | PHONG                                        |

### Screen 4 – Đăng ký & Đặt lịch
| UI Field                                                                 | Bảng                                         |
|--------------------------------------------------------------------------|----------------------------------------------|
| Họ tên khách, SĐT, Email                                                 | KHACH_HANG (tạo mới nếu chưa có)             |
| Loại khách (Cá nhân/Nhóm), Số người thuê                                 | (lưu vào NHOM và THANHVIEN_NHOM)             |
| Loại phòng mong muốn, Ngày dự kiến                                       | (tiêu chí tìm kiếm)                          |
| Danh sách phòng phù hợp (mã phòng, loại, giá)                             | PHONG + GIUONG                               |
| Lịch xem: Ngày, giờ, kênh liên hệ, ghi chú                               | LICH_XEM_PHONG                               |
| Panel tạo cọc: Giá thuê, số giường, tiền cọc                              | PHONG.GiaThue, PHONG.SucChua → tính toán     |

### Screen 5 – Rà soát & Lập hợp đồng
| UI Field                                                                 | Bảng                                         |
|--------------------------------------------------------------------------|----------------------------------------------|
| Thông tin khách chính (Họ tên, giấy tờ, SĐT)                             | KHACH_HANG                                   |
| Danh sách thành viên nhóm (nếu có)                                       | THANHVIEN_NHOM + KHACH_HANG                  |
| Kết quả rà soát (Đạt/Không đạt)                                          | THANHVIEN_NHOM.TrangThai                     |
| Hợp đồng: Mã HD (tự sinh), Ngày bắt đầu, Ngày kết thúc, Giá thuê, Kỳ thanh toán, Điều khoản | HOP_DONG_THUE_NHA                            |
| Phòng/giường thuê                                                        | HOP_DONG_THUE_NHA.MaPhong, CHI_TIET_THUE.MaGiuong |

### Screen 6 – Bàn giao phòng
| UI Field                                                                 | Bảng                                         |
|--------------------------------------------------------------------------|----------------------------------------------|
| Thông tin hợp đồng (Mã HD, khách, phòng, thời hạn)                       | HOP_DONG_THUE_NHA, NHOM, KHACH_HANG, PHONG   |
| Trạng thái thanh toán kỳ đầu                                             | HOP_DONG_THUE_NHA.TinhTrang (ACTIVE/PENDING_FIRST_PAYMENT) |
| Danh sách tài sản (Tên, số lượng, tình trạng, checkbox)                  | TAI_SAN, BANGGIAO_TAISAN                     |
| Nút xác nhận bàn giao                                                    | Cập nhật PHONG.TinhTrang = OCCUPIED, BANG_GIAO.TinhTrang = COMPLETED |

### Screen 7 – Yêu cầu trả phòng
| UI Field                                                                 | Bảng                                         |
|--------------------------------------------------------------------------|----------------------------------------------|
| Tìm hợp đồng (mã HD/SĐT)                                                 | HOP_DONG_THUE_NHA + KHACH_HANG               |
| Ngày trả dự kiến, Lý do, Ghi chú                                         | TRA_PHONG (NgayTraDuKien, LyDo)              |
| Danh sách yêu cầu đã tạo                                                 | TRA_PHONG + HOP_DONG_THUE_NHA                |

### Screen 8 – Kiểm tra trả phòng & Khấu trừ
| UI Field                                                                 | Bảng                                         |
|--------------------------------------------------------------------------|----------------------------------------------|
| Thông tin hợp đồng, phòng                                                | HOP_DONG_THUE_NHA, PHONG                     |
| Hiện trạng phòng (sạch, bẩn, hư hỏng)                                    | TRA_PHONG.TinhTrangPhong                     |
| Ghi nhận hư hỏng, chi phí                                                | CHITIETKHAUTRU                               |
| Tính tỷ lệ hoàn cọc                                                      | Dựa trên thời gian lưu trú từ HOP_DONG_THUE_NHA |
| Danh sách các khoản khấu trừ                                             | CHITIETKHAUTRU                               |

### Screen 9 – Quyết toán & Hoàn cọc
| UI Field                                                                 | Bảng                                         |
|--------------------------------------------------------------------------|----------------------------------------------|
| Kết quả đối soát (số tiền hoàn/thu thêm)                                 | TRA_PHONG.SoTienHoan, TyLeHoanCoc            |
| Phương thức thanh toán                                                   | THANH_TOAN.PhuongThuc                        |
| Xác nhận hoàn tất                                                        | Cập nhật TRA_PHONG.TrangThai = COMPLETED, HOP_DONG_THUE_NHA.TinhTrang = TERMINATED, PHONG.TinhTrang = AVAILABLE |

### Screen 10 – Lập hóa đơn
| UI Field                                                                 | Bảng                                         |
|--------------------------------------------------------------------------|----------------------------------------------|
| Loại giao dịch (Đặt cọc, Hoàn cọc, Tiền phòng tháng, Phạt, ...)          | THANH_TOAN.LoaiThanhToan                     |
| Mã hợp đồng / Mã cọc                                                    | THANH_TOAN.MaHopDong, THANH_TOAN.MaCoc       |
| Tên khách hàng, Phòng                                                    | KHACH_HANG, PHONG                            |
| Số tiền, Ngày phát hành, Hạn thanh toán                                  | THANH_TOAN.SoTien, NgayThanhToan             |
| Preview hóa đơn                                                          | Tổng hợp từ các bảng trên                    |

### Screen 11 – Xác nhận thanh toán cọc
| UI Field                                                                 | Bảng                                         |
|--------------------------------------------------------------------------|----------------------------------------------|
| Danh sách cọc (Mã cọc, khách, phòng, số tiền, hạn thanh toán, trạng thái) | DAT_COC + KHACH_HANG + PHONG                 |
| Modal xác nhận: phương thức, ngày thanh toán, số chứng từ                | Cập nhật DAT_COC.TinhTrang = APPROVED, PHONG.TinhTrang = RESERVED, tạo THANH_TOAN |

### Screen 12 – Quản lý quy định
| UI Field                                                                 | Bảng                                         |
|--------------------------------------------------------------------------|----------------------------------------------|
| Tiêu đề, nhóm quy định, nội dung, ngày hiệu lực, trạng thái              | QUY_DINH                                     |
| Drawer thêm/sửa: Tiêu đề, nhóm, nội dung, ngày hiệu lực/hết hạn, trạng thái, ưu tiên, áp dụng cho | QUY_DINH |

---

## 5. Tóm tắt luồng dữ liệu chính giữa các bảng

- `KHACH_HANG` ↔ `NHOM` ↔ `THANHVIEN_NHOM`: quản lý nhóm thuê.
- `PHONG` ↔ `GIUONG`: quản lý chỗ ở.
- `DAT_COC` ↔ `HOP_DONG_THUE_NHA`: cọc và hợp đồng.
- `HOP_DONG_THUE_NHA` ↔ `CHI_TIET_THUE` ↔ `GIUONG`: chi tiết thuê giường.
- `BANG_GIAO` ↔ `BANGGIAO_TAISAN` ↔ `TAI_SAN`: bàn giao tài sản.
- `TRA_PHONG` ↔ `CHITIETKHAUTRU`: trả phòng và khấu trừ.
- `THANH_TOAN` ↔ `HOP_DONG_THUE_NHA` / `DAT_COC`: lịch sử thanh toán.
