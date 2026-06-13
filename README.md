# HomeStay Dorm Management System

Hệ thống quản lý ký túc xá tư nhân – kiến trúc 3 tầng (Presentation – Business – Data).

## Công nghệ sử dụng

| Tầng | Công nghệ |
|------|-----------|
| **Frontend** | React 18, React Router v6, Axios, React Hook Form, react-hot-toast |
| **Backend** | Node.js, Express.js, Sequelize ORM, JWT, bcrypt, node-cron |
| **Database** | PostgreSQL 15 |
| **DevOps** | Docker Compose |

## Cấu trúc thư mục

```
HomeStay-Dorm-System/
├── backend/
│   └── src/
│       ├── config/        # Cấu hình DB (Sequelize)
│       ├── controllers/   # Xử lý request/response
│       ├── services/      # Logic nghiệp vụ
│       ├── models/        # Sequelize models
│       ├── routes/        # API routes
│       ├── middleware/    # Auth (JWT), error handler
│       ├── utils/         # Helpers
│       └── cron/          # Cron job hủy cọc quá hạn
├── frontend/
│   └── src/
│       ├── components/    # Sidebar, Topbar, Button, Badge…
│       ├── pages/         # 12+ màn hình chính
│       ├── services/      # Axios wrappers
│       ├── contexts/      # AuthContext
│       ├── hooks/         # useAuth
│       └── utils/         # formatters, validators
├── database/
│   ├── init.sql                # Schema + seed dữ liệu nghiệp vụ
│   └── seed-augmented.sql      # Dữ liệu demo mở rộng (50 phòng, 204 giường)
├── docker-compose.yml
└── README.md
```

---

## Hướng dẫn cài đặt

### Yêu cầu hệ thống

- **Node.js** ≥ 18.x
- **Docker** & **Docker Compose** (Docker Desktop cho Windows/Mac)
- **npm** (đi kèm Node.js)

### Bước 1 – Clone repository

```bash
git clone <link-repository>
cd HomeStay-Dorm-System
```

### Bước 2 – Tạo file `.env` cho Backend

```bash
cd backend
copy .env.example .env    # Windows
# hoặc
cp .env.example .env      # Linux / Mac
```

Nội dung mặc định (không cần sửa nếu dùng Docker theo hướng dẫn):

```
DB_HOST=localhost
DB_PORT=5432
DB_NAME=homestay_dorm
DB_USER=postgres
DB_PASSWORD=postgres123
JWT_SECRET=homestay_dorm_super_secret_jwt_key_2025
PORT=5000
FRONTEND_URL=http://localhost:5173
```

### Bước 3 – Khởi động Database (Docker)

```bash
cd ..
docker-compose up -d
docker-compose ps          # kiểm tra container đang chạy
```

Database tự động chạy theo thứ tự khi khởi tạo lần đầu:
1. `database/init.sql` — tạo bảng + dữ liệu nghiệp vụ cơ bản
2. `database/seed-augmented.sql` — bổ sung dữ liệu demo (thêm chi nhánh, phòng, giường)

### Bước 4 – Chạy Backend

```bash
cd backend
npm install
npm run dev
```

Backend chạy tại **http://localhost:5000**.  
Kiểm tra: `GET http://localhost:5000/health` → `{ "status": "OK" }`

### Bước 5 – Chạy Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend chạy tại **http://localhost:5173**.

---

## Tài khoản mặc định

| Vai trò | Email | Mật khẩu |
|---------|-------|-----------|
| Admin | admin@homestay.com | 123456 |
| Quản lý (Manager) | manager@homestay.com | 123456 |
| Kinh doanh (Sale) | sale@homestay.com | 123456 |
| Kế toán (Accountant) | accountant@homestay.com | 123456 |

---

## Lưu ý khi chạy

- Lần đầu chạy, database mất ~10–15 giây khởi tạo. Đợi log `database system is ready to accept connections`.
- Nếu backend báo lỗi kết nối DB, kiểm tra `docker ps`. Khởi động lại: `docker-compose restart`.
- Khi tắt máy, cần `docker-compose up -d` trước khi chạy backend.
- Reset toàn bộ dữ liệu (xóa sạch DB và chạy lại cả hai file SQL):
  ```bash
  docker-compose down -v
  docker-compose up -d
  ```
  > Lệnh này xóa volume cũ, tạo lại từ đầu và tự động chạy `01-init.sql` rồi `02-seed-augmented.sql`.

---

## Quy trình nghiệp vụ chính

### 1. Đăng ký & đặt cọc

| Bước | Người thực hiện | Mô tả |
|------|-----------------|-------|
| Đặt lịch xem phòng | SALE | Tạo lịch xem cho khách |
| Tạo yêu cầu đặt cọc | SALE | Từ lịch đã xem → tạo đơn cọc, trạng thái `PENDING_APPROVAL` |
| Tính cọc &amp; gửi yêu cầu thanh toán | ACCOUNTANT | Kế toán tính tiền cọc, gửi yêu cầu, trạng thái → `PENDING_PAYMENT` (24h timer) |
| Đối chiếu &amp; xác nhận đã nhận cọc | MANAGER | Quản lý đối chiếu chứng từ, xác nhận, trạng thái → `APPROVED`, phòng → `RESERVED` |
| Từ chối / Hủy | MANAGER / SALE | Từ chối hoặc hủy yêu cầu cọc |

### 2. Ký hợp đồng & thanh toán kỳ đầu

| Bước | Người thực hiện | Mô tả |
|------|-----------------|-------|
| Rà soát hồ sơ thành viên | SALE | Rà soát điều kiện lưu trú của khách/nhóm (spec 3.1.2) |
| Lập hợp đồng | SALE | Tạo hợp đồng từ cọc đã `APPROVED`, HĐ → `PENDING_FIRST_PAYMENT` |
| Thu tiền kỳ đầu | ACCOUNTANT | Xác nhận thanh toán tháng đầu, HĐ → `ACTIVE` |

### 3. Bàn giao phòng

| Bước | Người thực hiện | Mô tả |
|------|-----------------|-------|
| Tạo biên bản bàn giao | MANAGER | Liệt kê tài sản, bàn giao chìa khóa |
| Xác nhận bàn giao | MANAGER | Đánh dấu `COMPLETED`, phòng → `OCCUPIED` |

### 4. Trả phòng & quyết toán

| Bước | Người thực hiện | Mô tả |
|------|-----------------|-------|
| Tạo yêu cầu trả phòng | SALE | Ghi ngày dự kiến và lý do, trạng thái → `PENDING` |
| Bắt đầu kiểm tra | MANAGER | Trạng thái → `INSPECTING` |
| Thêm khoản khấu trừ | MANAGER | Ghi điện, nước, hư hỏng… |
| Hoàn tất kiểm tra | MANAGER | Chốt tỷ lệ hoàn cọc, trạng thái giữ `INSPECTING` |
| Xác nhận quyết toán | ACCOUNTANT | Hoàn trả hoặc thu thêm, trạng thái → `COMPLETED` |
| Lập hóa đơn | ACCOUNTANT | Xuất hóa đơn cuối kỳ |

---

## Quy tắc tính tiền cọc & hoàn cọc

### Tiền cọc

```
SoTienCoc = (GiaThue / thang) × 2 × SoGiuong
```

- Thuê cả phòng: `SoGiuong = SucChua` (sức chứa tối đa của phòng)
- Thuê theo giường: `SoGiuong = 1`

### Tỷ lệ hoàn cọc

| Trường hợp | Tỷ lệ |
|------------|-------|
| Chưa ký hợp đồng (hủy cọc) | 80% |
| Đã ký HĐ, ở < 6 tháng | 50% |
| Đã ký HĐ, ở ≥ 6 tháng | 70% |
| HĐ đã hết hạn tự nhiên | 100% |

---

## Cron job tự động hủy cọc quá hạn

- **Lịch chạy:** Mỗi giờ
- **Chức năng:** Cọc `PENDING_PAYMENT` quá 24h → `EXPIRED`, giường/phòng trở về `AVAILABLE`
- **File:** `backend/src/cron/expireDeposits.js`

---

## Phân quyền theo màn hình

| Màn hình | SALE | MANAGER | ACCOUNTANT | ADMIN |
|----------|------|---------|------------|-------|
| Dashboard | ✓ | ✓ | ✓ | ✓ |
| Quản lý phòng | | ✓ | | ✓ |
| Đăng ký & đặt lịch | ✓ | | | ✓ |
| Tạo đơn cọc từ lịch | ✓ | | | ✓ |
| Quản lý đặt cọc | ✓ | ✓ | ✓ | ✓ |
| Lập hợp đồng | ✓ | | | ✓ |
| Thanh toán kỳ đầu | | | ✓ | ✓ |
| Bàn giao phòng | | ✓ | | ✓ |
| Trả phòng (danh sách) | ✓ | ✓ | ✓ | ✓ |
| Kiểm tra / Quyết toán | | ✓ | ✓ | ✓ |
| Quy định | | ✓ | | ✓ |

> Bên trong trang Kiểm tra: MANAGER quản lý kiểm tra, ACCOUNTANT xác nhận quyết toán.
> Trong trang Quản lý đặt cọc: SALE tạo cọc, ACCOUNTANT gửi yêu cầu thanh toán, MANAGER đối chiếu &amp; xác nhận đã nhận cọc (spec 3.1.2).

---

## API Endpoints

### Authentication

| Method | Endpoint | Mô tả |
|--------|----------|-------|
| POST | `/api/auth/login` | Đăng nhập |
| POST | `/api/auth/change-password` | Đổi mật khẩu |
| GET | `/api/auth/profile` | Thông tin user hiện tại |

### Phòng & Giường

| Method | Endpoint | Mô tả |
|--------|----------|-------|
| GET | `/api/rooms` | Danh sách phòng |
| GET | `/api/rooms/available` | Phòng/giường còn trống |
| GET | `/api/rooms/:id` | Chi tiết phòng |
| POST | `/api/rooms` | Thêm phòng mới |
| PUT | `/api/rooms/:id` | Cập nhật phòng |
| DELETE | `/api/rooms/:id` | Xóa phòng |

### Đặt cọc

| Method | Endpoint | Vai trò | Mô tả |
|--------|----------|---------|-------|
| GET | `/api/deposits` | ALL | Danh sách đặt cọc |
| GET | `/api/deposits/calculate` | ALL | Tính tiền cọc |
| GET | `/api/deposits/:id` | ALL | Chi tiết đặt cọc |
| POST | `/api/deposits` | SALE, ADMIN | Tạo yêu cầu đặt cọc |
| PUT | `/api/deposits/:id/send-payment` | ACCOUNTANT, ADMIN | Kế toán tính cọc + gửi yêu cầu TT (24h timer) |
| PUT | `/api/deposits/:id/confirm` | MANAGER, ADMIN | Quản lý đối chiếu chứng từ + xác nhận đã nhận cọc |
| PUT | `/api/deposits/:id/reject` | MANAGER, ADMIN | Từ chối yêu cầu cọc |
| PUT | `/api/deposits/:id/cancel` | SALE, MANAGER, ADMIN | Hủy đặt cọc |

### Lịch xem phòng

| Method | Endpoint | Mô tả |
|--------|----------|-------|
| GET | `/api/lich-xem` | Danh sách lịch xem |
| POST | `/api/lich-xem` | Tạo lịch xem |
| PUT | `/api/lich-xem/:id` | Cập nhật lịch xem |

### Hợp đồng

| Method | Endpoint | Mô tả |
|--------|----------|-------|
| GET | `/api/contracts` | Danh sách hợp đồng |
| GET | `/api/contracts/:id` | Chi tiết hợp đồng |
| POST | `/api/contracts` | Tạo hợp đồng mới |
| PUT | `/api/contracts/:id/activate` | Kích hoạt (sau thanh toán kỳ đầu) |

### Thanh toán kỳ đầu

| Method | Endpoint | Mô tả |
|--------|----------|-------|
| GET | `/api/first-payments` | HĐ chờ thanh toán kỳ đầu |
| POST | `/api/first-payments/:id/confirm` | Xác nhận thu tiền kỳ đầu |

### Bàn giao

| Method | Endpoint | Mô tả |
|--------|----------|-------|
| GET | `/api/handover` | Danh sách bàn giao |
| GET | `/api/handover/:id` | Chi tiết bàn giao |
| POST | `/api/handover` | Tạo biên bản bàn giao |
| PUT | `/api/handover/:id/complete` | Xác nhận hoàn tất bàn giao |

### Trả phòng

| Method | Endpoint | Mô tả |
|--------|----------|-------|
| GET | `/api/checkout` | Danh sách yêu cầu trả phòng |
| GET | `/api/checkout/:id` | Chi tiết yêu cầu |
| POST | `/api/checkout` | Tạo yêu cầu trả phòng |
| PUT | `/api/checkout/:id/start-inspection` | Bắt đầu kiểm tra (MANAGER) |
| PUT | `/api/checkout/:id/add-damage` | Thêm khoản khấu trừ (MANAGER) |
| PUT | `/api/checkout/:id/complete-inspection` | Hoàn tất kiểm tra (MANAGER) |

### Quyết toán

| Method | Endpoint | Mô tả |
|--------|----------|-------|
| GET | `/api/settlement/:maTra` | Lấy dữ liệu quyết toán |
| POST | `/api/settlement/:maTra/confirm` | Xác nhận quyết toán (ACCOUNTANT) |

### Hóa đơn

| Method | Endpoint | Mô tả |
|--------|----------|-------|
| GET | `/api/invoices` | Danh sách hóa đơn |
| POST | `/api/invoices` | Tạo hóa đơn |

### Quy định

| Method | Endpoint | Mô tả |
|--------|----------|-------|
| GET | `/api/policies` | Danh sách quy định |
| POST | `/api/policies` | Thêm quy định |
| PUT | `/api/policies/:id` | Cập nhật quy định |
| DELETE | `/api/policies/:id` | Xóa quy định |

---

## Dữ liệu seed có sẵn

| Mã | Loại | Trạng thái | Mô tả |
|----|------|------------|-------|
| HD001 | Hợp đồng | ACTIVE | P102, KH001+KH002, có bàn giao, có checkout PENDING |
| HD002 | Hợp đồng | PENDING_FIRST_PAYMENT | P103, KH003, chờ kế toán thu tiền kỳ đầu |
| HD003 | Hợp đồng | ACTIVE | P402/G402A, KH006, có bàn giao, có checkout **INSPECTING** |
| COC001 | Đặt cọc | APPROVED | Linked HD001 |
| COC002 | Đặt cọc | PENDING_PAYMENT | G201A/P201, KH004, đang chờ khách thanh toán |
| COC003 | Đặt cọc | APPROVED | Linked HD003 |
| COC004 | Đặt cọc | PENDING_APPROVAL | G401A/P401, KH007, chờ kế toán gửi yêu cầu TT |
| COC005 | Đặt cọc | PENDING_PAYMENT | G101A/P101, KH008, đang chờ khách thanh toán |
| TR-0001 | Trả phòng | INSPECTING | HD003 — 50% hoàn cọc, có khấu trừ điện/nước — **kế toán xác nhận quyết toán** |
| TR-0002 | Trả phòng | PENDING | HD001 — quản lý bắt đầu kiểm tra |

---

*Phát triển bởi nhóm HomeStay Dorm · HCMUS · 2025–2026*
