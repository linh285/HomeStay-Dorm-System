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
homestay-dorm/
├── backend/               # Node.js + Express API server
│   ├── src/
│   │   ├── config/        # Cấu hình database
│   │   ├── controllers/   # Request/response handlers
│   │   ├── services/      # Business logic
│   │   ├── models/        # Sequelize models (21 tables)
│   │   ├── routes/        # API routes
│   │   ├── middleware/    # Auth, error handling
│   │   ├── utils/         # Helpers
│   │   └── jobs/          # Cron jobs (auto-expire deposits)
│   ├── .env               # Environment variables
│   └── server.js          # Entry point
├── frontend/              # React application
│   ├── src/
│   │   ├── components/    # Reusable components (Sidebar, Topbar, Modal, Drawer...)
│   │   ├── pages/         # 12 screens
│   │   ├── services/      # API calls via Axios
│   │   ├── contexts/      # Auth & Notification contexts
│   │   ├── hooks/         # Custom hooks
│   │   └── utils/         # Formatters, validators
│   └── package.json
├── database/
│   └── init.sql           # Database schema + seed data
├── docker-compose.yml     # PostgreSQL container
└── README.md
```

## 🚀 Hướng dẫn cài đặt

### Yêu cầu hệ thống
- Node.js >= 18.x
- Docker & Docker Compose
- npm hoặc yarn

### Bước 1: Clone và cài đặt

```bash
# Di chuyển vào thư mục project
cd "HomeStay Dorm System"
```

### Bước 2: Khởi động Database

```bash
# Chạy PostgreSQL bằng Docker
docker-compose up -d

# Kiểm tra database đã chạy
docker-compose ps
```

Database sẽ tự động chạy file `database/init.sql` để tạo bảng và seed data.

### Bước 3: Cài đặt và chạy Backend

```bash
cd backend

# Cài đặt dependencies
npm install

# Chạy development server
npm run dev
```

Backend sẽ chạy tại: **http://localhost:5000**

### Bước 4: Cài đặt và chạy Frontend

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

## 🔄 Quy trình nghiệp vụ

```
Đăng ký thuê
    ↓
Chọn phòng phù hợp
    ↓
Đặt lịch xem phòng
    ↓
Tạo yêu cầu đặt cọc (tự hủy sau 24h nếu không thanh toán)
    ↓
Kế toán xác nhận cọc → Phòng RESERVED
    ↓
Rà soát khách thuê → Lập hợp đồng → PENDING_FIRST_PAYMENT
    ↓
Kế toán thu tiền thuê kỳ đầu → Hợp đồng ACTIVE
    ↓
Bàn giao phòng + biên bản tài sản → Phòng OCCUPIED
    ↓
[Sử dụng dịch vụ trong thời gian thuê]
    ↓
Ghi nhận yêu cầu trả phòng
    ↓
Kiểm tra hiện trạng, ghi nhận hư hại
    ↓
Tính toán khấu trừ + tỷ lệ hoàn cọc
    ↓
Xác nhận thanh toán chênh lệch / hoàn cọc
    ↓
Lập hóa đơn → Phòng AVAILABLE
```

## 📐 Quy tắc tính tiền cọc

```
Tiền cọc = (Giá thuê/tháng × 2) × Số giường thuê
```

## 📊 Quy tắc hoàn cọc

| Trường hợp | Tỷ lệ hoàn |
|-----------|-----------|
| Chưa ký hợp đồng | 80% |
| Đã ký HĐ, ở < 6 tháng | 50% |
| Đã ký HĐ, ở ≥ 6 tháng | 70% |
| HĐ đã hết hạn tự nhiên | 100% |

## ⚙️ Cron Jobs

- **Mỗi giờ**: Kiểm tra đặt cọc quá 24h chưa thanh toán → tự động hủy, trả phòng về AVAILABLE

## 🎨 Design System

| Token | Giá trị |
|-------|---------|
| Primary Color | `#0A58CA` |
| Success | `#198754` |
| Warning | `#FAAD14` |
| Danger | `#DC3545` |
| Text | `#212529` |
| Background | `#F8F9FA` |
| Font | Inter |
| Border Radius (card) | `8px` |
| Border Radius (input) | `4px` |

## 🔧 Environment Variables

Xem file `.env.example` trong thư mục `backend/` để biết các biến môi trường cần thiết.

---

*Được phát triển bởi nhóm HomeStay Dorm · HCMUS · 2025-2026*
