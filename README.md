# 🏠 HomeStay Dorm Management System

Hệ thống quản lý ký túc xá thông minh HomeStay Dorm – kiến trúc 3 tầng (Presentation – Business – Data).

## 📋 Công nghệ sử dụng

| Tầng | Công nghệ |
|------|-----------|
| **Frontend** | React 18, React Router v6, Axios, React Hook Form, react-hot-toast |
| **Backend** | Node.js, Express.js, Sequelize ORM, JWT, bcrypt, node-cron |
| **Database** | PostgreSQL 15 |
| **DevOps** | Docker Compose |

## 🗂️ Cấu trúc thư mục

```
HomeStay Dorm System/
├── backend/ # Node.js + Express API
│ ├── src/
│ │ ├── config/ # Cấu hình DB
│ │ ├── controllers/ # Xử lý request/response
│ │ ├── services/ # Logic nghiệp vụ
│ │ ├── models/ # Sequelize models (21 bảng)
│ │ ├── routes/ # API routes
│ │ ├── middleware/ # Auth, error handling
│ │ ├── utils/ # Helpers
│ │ └── cron/ # Cron job tự động hủy cọc
│ ├── .env.example # Mẫu file biến môi trường
│ └── server.js # Entry point
├── frontend/ # React app
│ ├── src/
│ │ ├── components/ # Sidebar, Topbar, Modal, Drawer...
│ │ ├── pages/ # 12 màn hình chính
│ │ ├── services/ # Gọi API qua Axios
│ │ ├── contexts/ # Context (Auth, Notification)
│ │ ├── hooks/ # Custom hooks
│ │ └── utils/ # Format, validation
│ └── package.json
├── database/
│ └── init.sql # Schema + seed data
├── docker-compose.yml # PostgreSQL container
└── README.md


---
```
## 🚀 Hướng dẫn cài đặt

### Yêu cầu hệ thống
```bash
- **Node.js** ≥ 18.x (`node -v`)
- **Docker** & **Docker Compose** (cài Docker Desktop nếu dùng Windows/Mac)
- **npm** hoặc **yarn** (đi kèm Node.js)
```
### Bước 1: Clone repository

```bash
git clone <link-repository-của-nhóm>
cd "HomeStay Dorm System"

### Bước 2: Tạo file .env cho Backend
cd backend
copy .env.example .env          # Windows
# hoặc
cp .env.example .env            # Linux / Mac

Nội dung file .env mặc định (không cần sửa nếu dùng Docker theo hướng dẫn):
DB_HOST=localhost
DB_PORT=5432
DB_NAME=homestay_dorm
DB_USER=postgres
DB_PASSWORD=postgres123
JWT_SECRET=homestay_dorm_super_secret_jwt_key_2025
PORT=5000
FRONTEND_URL=http://localhost:5173
```
### Bước 3: Khởi động Database bằng Docker
1. Quay lại thư mục gốc:
```bash
cd ..
docker-compose up -d

3. Kiểm tra:
docker-compose ps
# hoặc
docker ps --filter "name=homestay_db"

Database sẽ tự động chạy file `database/init.sql` để tạo bảng và seed data.
```
### Bước 4: Cài đặt và chạy Backend

```bash
cd backend

# Cài đặt dependencies
npm install

# Chạy development server
npm run dev
```

Backend sẽ chạy tại: **http://localhost:5000**
Thử: http://localhost:5000/health → thấy { status: "OK" }.

### Bước 5: Cài đặt và chạy Frontend

```bash
cd frontend

# Cài đặt dependencies
npm install

# Chạy development server
npm run dev
```

Frontend sẽ chạy tại: **http://localhost:5173**

---

## 🔐 Tài khoản mặc định

| Role | Email | Mật khẩu |
|------|-------|-----------|
| Admin | admin@homestay.com | 123456 |
| Quản lý | manager@homestay.com | 123456 |
| Sale | sale@homestay.com | 123456 |
| Kế toán | accountant@homestay.com | 123456 |

---


## ⚠️ Lưu ý khi chạy lần đầu
- Lần đầu, database mất ~10‑15 giây để khởi tạo. Đợi log database system is ready to accept connections.
- Nếu backend báo lỗi kết nối DB, kiểm tra Docker (docker ps). Restart container: docker-compose restart.
- Khi tắt máy, cần chạy lại docker-compose up -d trước khi start backend.
- Reset toàn bộ dữ liệu (xoá sạch DB):
docker-compose down -v
docker-compose up -d

## 🔄 Quy trình nghiệp vụ chính (tóm tắt)

1. **Đăng ký & đặt cọc**  
   Đăng ký thuê → Chọn phòng → Đặt lịch xem → Tạo yêu cầu cọc (24h) → Xác nhận cọc → Phòng `RESERVED`

2. **Ký hợp đồng & thanh toán kỳ đầu**  
   Rà soát khách → Lập hợp đồng (`PENDING_FIRST_PAYMENT`) → Kế toán thu tiền kỳ đầu → Hợp đồng `ACTIVE`

3. **Bàn giao & sử dụng**  
   Bàn giao phòng + tài sản → Phòng `OCCUPIED` → [Sử dụng dịch vụ]

4. **Trả phòng & quyết toán**  
   Yêu cầu trả phòng → Kiểm tra, khấu trừ → Quyết toán hoàn cọc / thu thêm → Lập hóa đơn → Phòng `AVAILABLE`

## Quy tắc tính tiền cọc & hoàn cọc
Loại	                Công thức
Tiền cọc	            (Giá thuê/tháng × 2) × Số giường thuê
Hoàn cọc	            Xem bảng dưới
Trường hợp	            Tỷ lệ hoàn
Chưa ký hợp đồng	    80%
Đã ký HĐ, ở < 6 tháng	50%
Đã ký HĐ, ở ≥ 6 tháng	70%
HĐ đã hết hạn tự nhiên	100%

## Cron job tự động hủy cọc quá hạn
Lịch chạy: mỗi phút 0
Chức năng: Cọc PENDING_PAYMENT quá 24h → EXPIRED, phòng trở về AVAILABLE
File cấu hình: backend/src/cron/expireDeposits.js

## Design System (tham khảo)
Token	Giá trị
Màu chính	#0A58CA
Thành công	#198754
Cảnh báo	#FAAD14
Nguy hiểm	#DC3545
Chữ chính	#212529
Nền     	#F8F9FA
Font	    Inter
Bo góc card	 8px
Bo góc input 4px

## 📡 API Endpoints

### Authentication
| Method | Endpoint | Mô tả |
|--------|----------|-------|
| POST | `/api/auth/login` | Đăng nhập |
| POST | `/api/auth/change-password` | Đổi mật khẩu |
| GET | `/api/auth/profile` | Lấy thông tin user |

### Phòng (Rooms)
| Method | Endpoint | Mô tả |
|--------|----------|-------|
| GET | `/api/rooms` | Danh sách phòng |
| GET | `/api/rooms/available` | Phòng còn trống |
| GET | `/api/rooms/:id` | Chi tiết phòng |
| POST | `/api/rooms` | Thêm phòng mới |
| PUT | `/api/rooms/:id` | Cập nhật phòng |
| DELETE | `/api/rooms/:id` | Xóa phòng |

### Đặt cọc (Deposits)
| Method | Endpoint | Mô tả |
|--------|----------|-------|
| GET | `/api/deposits` | Danh sách đặt cọc |
| POST | `/api/deposits` | Tạo yêu cầu đặt cọc |
| PUT | `/api/deposits/:id/confirm` | Xác nhận thanh toán cọc |

### Hợp đồng (Contracts)
| Method | Endpoint | Mô tả |
|--------|----------|-------|
| GET | `/api/contracts` | Danh sách hợp đồng |
| POST | `/api/contracts` | Tạo hợp đồng |
| PUT | `/api/contracts/:id/activate` | Kích hoạt hợp đồng |

### Trả phòng (Checkout)
| Method | Endpoint | Mô tả |
|--------|----------|-------|
| GET | `/api/checkout` | Danh sách yêu cầu trả phòng |
| POST | `/api/checkout` | Tạo yêu cầu trả phòng |
| PUT | `/api/checkout/:id/complete` | Hoàn tất kiểm tra |

### Hóa đơn (Invoices)
| Method | Endpoint | Mô tả |
|--------|----------|-------|
| GET | `/api/invoices` | Danh sách hóa đơn |
| POST | `/api/invoices` | Tạo hóa đơn |

---

*Được phát triển bởi linh le HomeStay Dorm · HCMUS · 2025-2026*
