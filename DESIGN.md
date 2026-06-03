SCREEN 1: SYSTEM LOGIN – "Đăng nhập"
1. Mục đích
Cổng vào duy nhất cho tất cả nhân viên (Sale, Quản lý, Kế toán, Admin).

Xác thực tài khoản, mật khẩu; sau thành công chuyển đến Screen 2: Dashboard.

2. Bố cục tổng thể (Layout)
Khung hiển thị: Desktop Web, tỷ lệ 16:9 (khuyến nghị độ phân giải 1366×768 hoặc 1920×1080).

Cấu trúc: Chia 2 cột dọc bằng nhau (50% – 50%) toàn màn hình.

Cột trái: Màu nền #0A58CA (Primary Blue), chứa thương hiệu + hình minh họa.

Cột phải: Nền xám nhạt #F8F9FA, căn giữa một thẻ trắng (Surface) chứa form đăng nhập.

3. Chi tiết từng cột
3.1. Cột trái (Brand)
Kích thước: Width 50%, height 100vh.

Màu nền: #0A58CA.

Nội dung (đặt giữa theo chiều dọc và ngang):

Logo: Icon 3D abstract building (màu trắng, kích thước 80×80px). Nếu có logo thật của nhóm, thay thế.

Tiêu đề chính: "HomeStay Dorm" – font Inter, size 36px, weight Bold, color white, margin-top 24px.

Tagline: "Hệ thống quản lý ký túc xá thông minh" – font Inter, size 16px, weight Regular, color white (opacity 0.85), margin-top 12px.

Hình minh họa: (tuỳ chọn) một vector isometric về tòa nhà, ký túc xá, key, dashboard. Kích thước khoảng 300×200px, đặt dưới tagline, margin-top 48px.

3.2. Cột phải (Form đăng nhập)
Kích thước: Width 50%, height 100vh, background #F8F9FA.

Vị trí form: Flexbox căn giữa (center, center). Bên trong là card trắng.

Card trắng:

Background: #FFFFFF.

Border-radius: 8px.

Padding: 32px 28px.

Width: 400px (tương đối, có thể responsive).

Box-shadow: 0px 8px 24px rgba(0, 0, 0, 0.05).

3.2.1. Tiêu đề form
Text: "Đăng nhập hệ thống" – font Inter, size 24px, weight SemiBold, color #212529, text-align left, margin-bottom 24px.

3.2.2. Trường nhập "Tài khoản" (Username)
Label: "Tài khoản" – font Inter, size 14px, weight Medium, color #212529, margin-bottom 6px.

Input box:

Width 100%, height 44px, border 1px solid #E5E7EB, border-radius 4px, padding 0 12px.

Font Inter, size 14px, color #212529.

Placeholder: "Nhập email hoặc mã nhân viên" (màu #6C757D).

Icon bên trái: người dùng (User icon), màu #6C757D, kích thước 18×18px.

Khi focus: outline none, border-color #0A58CA, box-shadow 0 0 0 2px rgba(10,88,202,0.2).

Validate: không để trống. Nếu trống khi submit → hiển thị lỗi.

3.2.3. Trường nhập "Mật khẩu" (Password)
Label: "Mật khẩu" – font Inter, size 14px, weight Medium, color #212529, margin-bottom 6px.

Input box:

Width 100%, height 44px, border 1px solid #E5E7EB, border-radius 4px, padding 0 12px.

Font Inter, size 14px, color #212529.

Placeholder: "Nhập mật khẩu" (màu #6C757D).

Icon bên trái: khóa (Lock icon), màu #6C757D.

Icon bên phải: mắt (Eye icon) để toggle hiện/ẩn mật khẩu – khi click sẽ đổi qua Eye-slash, không submit form.

Validate: không để trống.

3.2.4. Tuỳ chọn "Ghi nhớ đăng nhập" và "Quên mật khẩu"
Row: Flex, justify-content space-between, align-items center, margin 16px 0.

Checkbox "Ghi nhớ đăng nhập":

<input type="checkbox"> kích thước 16×16px, accent color #0A58CA.

Label: "Ghi nhớ đăng nhập" – font Inter, size 14px, color #212529.

Link "Quên mật khẩu?":

Dạng text link, màu #0A58CA, font size 14px, text-decoration none.

Khi hover: underline.

(Sẽ dẫn đến modal hoặc màn hình reset password – tạm thời chưa có màn riêng, nhưng để link để demo).

3.2.5. Nút Đăng nhập
Style:

Width 100%, height 44px, background #0A58CA, border none, border-radius 4px.

Font Inter, size 16px, weight SemiBold, color white.

Cursor pointer.

Disabled state (khi chưa nhập đủ username/password): background #A3C2E0, cursor not-allowed.

Hiệu ứng khi hover (nếu không disabled): background #084298.

Hành vi:

Click → gọi xác thực giả lập. Nếu đúng (username: demo@homestay.com, password: 123456 hoặc bất kỳ → demo) thì chuyển sang Screen 2: Dashboard.

Nếu sai → hiển thị thông báo lỗi bên dưới nút.

3.2.6. Thông báo lỗi (Error message)
Vị trí: Ngay bên dưới nút Đăng nhập, margin-top 12px.

Style: font Inter, size 13px, color #DC3545, background #FEE2E2, padding 8px 12px, border-radius 4px.

Nội dung: "Sai tài khoản hoặc mật khẩu. Vui lòng thử lại."

Chỉ hiện khi có lỗi từ server/validation. Mặc định ẩn.

3.2.7. Hỗ trợ phím tắt
Khi người dùng nhấn Enter ở ô password, cũng kích hoạt nút Đăng nhập.

4. Luồng điều hướng (Navigation)
Thành công: chuyển sang Screen 2: Manager Dashboard & Quick Reports (màn chính dành cho quản lý; các vai trò khác sẽ có cùng layout nhưng menu khác – sẽ định nghĩa sau).

Thất bại: ở lại màn hình hiện tại, hiển thị thông báo lỗi.

5. Các thành phần tái sử dụng cho màn sau
Các màu, font, border radius, padding của input, button, card sẽ giữ nguyên xuyên suốt.

Icon mắt (show/hide password) có thể xuất hiện lại ở các form khác (ví dụ đổi mật khẩu).

Thông báo lỗi dạng red badge dùng lại cho các màn khác (như khi nhập liệu sai).

6. Ghi chú cho AI sinh ảnh (Google Stitch, v.v.)
Hãy tạo một màn hình đăng nhập duy nhất với bố cục 2 cột như mô tả.

Cột trái: nền xanh đậm, có hình minh họa tòa nhà hoặc key, chữ trắng.

Cột phải: card trắng với 2 input, checkbox, link, nút xanh.

Không thêm các element không cần thiết (ví dụ không có sidebar ở màn này).

Đảm bảo font Inter được sử dụng cho toàn bộ text.










////////////////////////////////////////////////////////////////////

SCREEN 2: MANAGER DASHBOARD & WORKLIST – "Tổng quan và công việc chờ"
1. Mục đích
Là màn hình chính sau khi đăng nhập thành công (từ Screen 1).

Cung cấp cái nhìn tổng quan về tình trạng phòng, doanh thu, và danh sách các công việc cần xử lý theo vai trò Quản lý.

Là trung tâm điều hướng đến các màn hình nghiệp vụ khác (Quản lý phòng, Đăng ký, Hợp đồng, v.v.).

2. Bố cục tổng thể (Layout)
Khung hiển thị: Desktop Web, tỷ lệ 16:9, chiều rộng tối thiểu 1200px.

Cấu trúc: 3 vùng chính:

Sidebar trái (cố định, rộng 260px, nền trắng, border phải)

Top bar (cao 64px, nền trắng, border dưới)

Main content (phần còn lại, nền #F8F9FA, padding 24px, có thể cuộn dọc nếu nội dung dài)

3. Sidebar trái
Kích thước: Width 260px, height 100vh (cố định khi cuộn), background #FFFFFF, border-right: 1px solid #E5E7EB.

Logo: Đầu sidebar, padding 20px 16px 16px 16px.

Logo text: "HomeStay Dorm" – font Inter, size 20px, weight Bold, color #0A58CA.

Có thể thêm icon nhỏ bên cạnh (dạng mái nhà).

User info: (dưới logo) Avatar tròn 40px, tên "Nguyễn Văn A", vai trò "Quản lý" – font size 14px.

Menu items (danh sách dọc):

Mỗi item: icon (20x20px) + text, padding 12px 16px, border-radius 8px, margin 4px 8px.

Màu chữ mặc định: #212529.

Màu nền hover: #F1F5F9.

Active item (Dashboard): background #E6F0FF, color #0A58CA, icon cũng màu xanh.

Các item:

Dashboard (active) – icon biểu đồ.
Quản lý phòng – icon danh sách (dẫn đến Screen 3).
Đăng ký & đặt lịch – icon lịch (dẫn đến Screen 4).
Hợp đồng – icon giấy tờ (dẫn đến Screen 5).
Bàn giao – icon chìa khóa (dẫn đến Screen 6).
Trả phòng & khấu trừ – icon thùng rác (dẫn đến Screen 7, 8).
Hóa đơn – icon hóa đơn (dẫn đến Screen 9).
Cuối sidebar: nút Đăng xuất – icon ra ngoài, màu #DC3545, cách bottom 20px.

4. Top bar
Kích thước: Height 64px, background #FFFFFF, border-bottom: 1px solid #E5E7EB, padding 0 24px.

Bên trái: Breadcrumb (ví dụ: "Trang chủ / Dashboard") – font Inter 14px, màu #6C757D.

Bên phải: Các thành phần sắp xếp ngang, gap 20px.

Ô tìm kiếm toàn cục:

Width 240px, height 36px, border 1px solid #E5E7EB, border-radius 20px, padding 0 12px.

Icon kính lúp bên trái, placeholder: "Tìm kiếm hợp đồng, khách hàng..."

Icon chuông thông báo:

Biểu tượng chuông (24x24px), có badge đỏ (nếu có thông báo chưa đọc).

Khi click: hiển thị dropdown nhỏ (sẽ mô tả ở màn phụ, tạm thời để tương tác giả).

Avatar & tên:

Avatar 36x36px (hình tròn), tên "Quản lý", dropdown nhỏ để mở hồ sơ hoặc đăng xuất.

5. Main content – Chi tiết
Padding: 24px 28px, background #F8F9FA.

Có thể cuộn dọc (overflow-y: auto).

5.1. Khối thẻ thống kê nhanh (4 cards)
Layout: Grid 4 cột, gap 20px, margin-bottom 32px.

Mỗi card:

Background #FFFFFF, border-radius 8px, padding 20px, box-shadow nhẹ.

Bên trái: tiêu đề (font Inter 14px, màu #6C757D), giá trị số lớn (font 28px, weight Bold, màu #212529).

Bên phải: icon (40x40px, màu phù hợp).

Card 1: "Phòng trống"

Giá trị: 24 (màu xanh lá #198754).

Icon: ngôi nhà mở.

Card 2: "Đang giữ chỗ / cọc"

Giá trị: 8 (màu vàng #FAAD14).

Icon: đồng hồ.

Card 3: "Đang sử dụng"

Giá trị: 156 (màu xanh dương #0A58CA).

Icon: người.

Card 4: "Doanh thu tháng"

Giá trị: 125.000.000 VND (màu xám đậm).

Icon: tiền.

5.2. Khối công việc chờ (Worklist – 2 cột)
Layout: Grid 2 cột, gap 24px.

Mỗi cột là một card trắng, tiêu đề + bảng/list.

5.2.1. Cột trái: "Lịch xem hôm nay"
Card: background #FFFFFF, border-radius 8px, padding 20px.

Tiêu đề: "Lịch xem hôm nay" + icon lịch, bên phải có nút "Xem tất cả" (text link, màu #0A58CA).

Bảng (dạng danh sách đơn giản):

Header: Giờ, Khách hàng, Phòng, SĐT (nếu có).

Mỗi dòng: border-bottom 1px solid #E5E7EB, padding 12px 0.

Ví dụ:

10:00 | Trần Văn B | P.201 | 0909123456

14:30 | Lê Thị C | P.105 | 0988777666

Dòng cuối cùng có nút nhỏ "Bắt đầu" (outline, dẫn đến Screen 4 – Booking Workspace).

Nếu không có dữ liệu: hiển thị "Không có lịch xem hôm nay".

5.2.2. Cột phải: "Chờ xử lý / Phê duyệt"
Card: background #FFFFFF, border-radius 8px, padding 20px.

Tiêu đề: "Chờ xử lý" + icon chờ, nút "Xem tất cả".

Danh sách dạng card nhỏ:

Mỗi item: background #F8F9FA, border-radius 8px, padding 12px, margin-bottom 12px.

Nội dung:

Tiêu đề: "Yêu cầu đặt cọc – P.203"

Thông tin: "Khách: Nguyễn Văn D – 15/03/2025"

Badge trạng thái: "Chờ duyệt" (màu vàng #FAAD14).

Hành động: nút "Xem xét" (outline nhỏ, dẫn đến màn duyệt cọc – sẽ định nghĩa sau).

Có thể có nhiều loại: Hợp đồng chờ ký, yêu cầu trả phòng, khấu trừ chờ duyệt.

5.3. Các nút chuyển trang nhanh (Quick actions)
Đặt dưới cùng của main content (hoặc trên cùng bên phải):

Nút "+ Tạo đăng ký mới" (primary, dẫn đến Screen 4).

Nút "Quản lý phòng" (outline, dẫn đến Screen 3).

Style nút: Primary – background #0A58CA, màu trắng, padding 8px 16px, border-radius 4px. Outline – border 1px solid #0A58CA, màu xanh, nền trắng.

6. Luồng điều hướng từ Screen 2
Đăng xuất (sidebar): mở modal xác nhận (Screen phụ) → quay về Screen 1.

Menu Quản lý phòng → chuyển sang Screen 3 (Room Inventory).

Menu Đăng ký & đặt lịch → chuyển sang Screen 4.

Menu Hợp đồng → chuyển sang Screen 5.

Menu Bàn giao → chuyển sang Screen 6.

Menu Trả phòng → chuyển sang Screen 7 (Checkout Inspection).

Nút "Bắt đầu" trong lịch xem → chuyển đến Screen 4 (Booking Workspace) và tự động chọn lịch hẹn đó.

Nút "Xem xét" trong danh sách chờ → chuyển đến màn duyệt cọc (sẽ định nghĩa ở Screen 4.5 hoặc 5).

7. Các thành phần tái sử dụng cho màn sau
Sidebar, top bar giữ nguyên xuyên suốt các màn 2–9, chỉ thay đổi active menu và nội dung main.

Các card thống kê có thể xuất hiện ở các dashboard khác (Sale, Kế toán) với số liệu khác.

Bảng danh sách (worklist) sẽ được tái sử dụng ở nhiều màn với dữ liệu động.

8. Ghi chú cho AI sinh ảnh
Vẽ toàn bộ màn hình với sidebar, top bar và main content như mô tả.

Số liệu thống kê có thể lấy mẫu cứng (24, 8, 156, 125,000,000).

Tạo các badge màu vàng/xanh/đỏ cho trạng thái.

Đảm bảo font Inter, màu sắc đúng hex.

Các nút bấm có hiệu ứng hover (tùy AI, có thể mặc định vẽ trạng thái bình thường).

Không thêm các element không có trong đặc tả (ví dụ: không có form nhập liệu ở đây).










/////////////////////////////////////////////////////////////////////////////////////////////
SCREEN 3: ROOM INVENTORY MANAGEMENT – "Quản lý danh mục chỗ ở"
1. Mục đích
Dành cho Quản lý (và Admin) để xem, thêm, sửa, xóa, cập nhật trạng thái phòng và giường.

Tương ứng với Use case 3 (Quản lý danh mục chỗ ở) và một phần của UC 12 (tài sản phòng – sẽ chi tiết ở màn 6).

Là nơi quản trị dữ liệu đầu vào cho toàn bộ hệ thống (phòng trống, đang sử dụng, bảo trì).

2. Bố cục tổng thể
Global layout: giống Screen 2 (Sidebar trái + Top bar + Main content).

Main content: full width, nền #F8F9FA, padding 24px.

Trong main content: Chia làm 3 phần:

Thanh tiêu đề & nút thêm mới (top)
Bộ lọc tìm kiếm (filter bar)
Bảng danh sách phòng (data table) + Drawer chỉnh sửa bên phải (xuất hiện khi click "Sửa").
3. Sidebar và Top bar
Giống hệt Screen 2, nhưng mục "Quản lý phòng" trong menu sẽ được active (màu xanh #0A58CA, nền #E6F0FF).

Các menu khác vẫn hiển thị nhưng chưa active.

4. Main content – chi tiết
4.1. Thanh tiêu đề & nút thêm
Dòng 1 (flex, justify-between, align-items center, margin-bottom 20px):

Tiêu đề: "Danh sách phòng / giường" – font Inter, size 24px, weight SemiBold, color #212529.

Nút "+ Thêm phòng mới" – primary button (background #0A58CA, border-radius 4px, padding 8px 16px, color white).
Khi click → mở Drawer thêm phòng (bên phải, tương tự như Drawer sửa nhưng form rỗng).

4.2. Bộ lọc tìm kiếm (Filter bar)
Layout: Dạng row, flex wrap, gap 16px, margin-bottom 24px, background white, padding 16px 20px, border-radius 8px.

Các thành phần:

Dropdown "Khu / Tòa": width 180px, height 36px, border 1px solid #E5E7EB, border-radius 4px, padding 0 8px. Options: Tất cả, Khu A, Khu B, Khu C.

Dropdown "Tầng": width 120px, similar: Tất cả, 1,2,3,...

Dropdown "Trạng thái": width 150px: Tất cả, Còn trống, Đang giữ chỗ, Đang sử dụng, Bảo trì.

Ô tìm kiếm: width 240px, height 36px, border-radius 20px, icon kính lúp, placeholder: "Tìm theo mã phòng, mã giường".

Nút "Lọc": primary outline (border 1px solid #0A58CA, color #0A58CA, background white, padding 0 16px).

Nút "Reset": text link, color #6C757D.

4.3. Bảng danh sách phòng (Data table)
Khung: background white, border-radius 8px, overflow-x auto.

Bảng: width 100%, border-collapse collapse.

Header: background #F8F9FA, border-bottom 1px solid #E5E7EB.

Các cột (từ trái sang phải):

Mã phòng (width 100px)
Khu / Tầng (120px)
Loại phòng / Sức chứa (100px)
Giá thuê (120px)
Trạng thái (100px)
Số giường trống (100px)
Thao tác (80px)
Mỗi dòng (row):

Padding: 12px 16px, border-bottom 1px solid #E5E7EB.

Font size 14px, color #212529.

Cột Trạng thái: dùng badge tròn.

AVAILABLE: badge xanh lá (#198754) – "Còn trống"

PENDING: badge vàng (#FAAD14) – "Chờ cọc"

RESERVED: badge xanh dương (#0A58CA) – "Đã cọc"

OCCUPIED: badge đỏ (#DC3545) – "Đang sử dụng"

MAINTENANCE: badge xám (#6C757D) – "Bảo trì"

Cột Thao tác: icon bút chì (Edit) màu #0A58CA, click → mở Drawer sửa bên phải.

4.4. Drawer chỉnh sửa / thêm phòng (bên phải)
Kích thước: width 400px, background white, box-shadow left, position fixed, top 0, right 0, height 100vh.

Xuất hiện khi click "Sửa" trên 1 dòng hoặc nút "+ Thêm phòng mới".

Cấu trúc Drawer:

Header: "Chỉnh sửa phòng" (hoặc "Thêm phòng mới") – font 18px, weight SemiBold, padding 20px, border-bottom 1px solid #E5E7EB.

Nút đóng (X) ở góc phải.

Body (form): padding 20px, gap 16px (dạng column).

Trường Mã phòng (text input, required, placeholder "VD: P101").

Dropdown Khu/Tòa (options: A, B, C).

Dropdown Tầng (1..10).

Loại phòng / Sức chứa (dropdown: 2 giường, 4 giường, 6 giường).

Giá thuê (number input, đơn vị VND).

Trạng thái (dropdown: như các trạng thái ở trên).

Ghi chú (textarea, optional).

Danh sách giường (đọc-only hoặc hiển thị dạng list nhỏ, có thể thêm/sửa sau).

Footer (button): padding 20px, border-top 1px solid #E5E7EB.

Nút "Lưu thay đổi" (primary, màu xanh) – click → cập nhật bảng, đóng drawer.

Nút "Hủy" (outline) – đóng drawer không lưu.

(Đối với phòng đã có hợp đồng, ẩn nút xóa hoặc disable trạng thái).

5. Tương tác & điều hướng
Click "Sửa" trên một dòng → mở Drawer với dữ liệu của dòng đó.

Click "+ Thêm phòng mới" → mở Drawer rỗng.

Sau khi lưu → bảng tự động cập nhật (reload dữ liệu giả lập).

Click menu khác (VD: Dashboard) → chuyển sang màn tương ứng (Screen 2).

Click "Đăng xuất" → modal xác nhận → về Screen 1.

6. Các thành phần tái sử dụng
Badge trạng thái (xanh, vàng, đỏ, xám) dùng lại ở nhiều màn (hợp đồng, đặt cọc, trả phòng).

Drawer chỉnh sửa (400px, có header, body, footer) sẽ tái sử dụng cho các màn sau (VD: sửa quy định, sửa hợp đồng).

Bảng (data table) và bộ lọc (filter bar) có thể tái sử dụng cho màn danh sách hợp đồng, danh sách hóa đơn.

7. Ghi chú cho AI sinh ảnh
Giữ nguyên sidebar, top bar từ Screen 2 (chỉ đổi active menu).

Vẽ main content với bộ lọc, bảng, và một Drawer mở ra bên phải (có thể vẽ dạng overlay mờ, drawer trượt từ phải sang).

Bảng có ít nhất 3-4 dòng dữ liệu mẫu.

Các nút, input, dropdown phải rõ ràng, đúng màu sắc.

Không cần animation thực tế, chỉ cần thể hiện trạng thái "Drawer đang mở" (nửa mờ nền, drawer nổi).






/////////////////////////////////////////////////////////////////////////
SCREEN 3: ROOM INVENTORY MANAGEMENT – "Quản lý danh mục chỗ ở"
1. Mục đích
Dành cho Quản lý (và Admin) để xem, thêm, sửa, xóa, cập nhật trạng thái phòng và giường.

Tương ứng với Use case 3 (Quản lý danh mục chỗ ở) và một phần của UC 12 (tài sản phòng – sẽ chi tiết ở màn 6).

Là nơi quản trị dữ liệu đầu vào cho toàn bộ hệ thống (phòng trống, đang sử dụng, bảo trì).

2. Bố cục tổng thể
Global layout: giống Screen 2 (Sidebar trái + Top bar + Main content).

Main content: full width, nền #F8F9FA, padding 24px.

Trong main content: Chia làm 3 phần:

Thanh tiêu đề & nút thêm mới (top)
Bộ lọc tìm kiếm (filter bar)
Bảng danh sách phòng (data table) + Drawer chỉnh sửa bên phải (xuất hiện khi click "Sửa").
3. Sidebar và Top bar
Giống hệt Screen 2, nhưng mục "Quản lý phòng" trong menu sẽ được active (màu xanh #0A58CA, nền #E6F0FF).

Các menu khác vẫn hiển thị nhưng chưa active.

4. Main content – chi tiết
4.1. Thanh tiêu đề & nút thêm
Dòng 1 (flex, justify-between, align-items center, margin-bottom 20px):

Tiêu đề: "Danh sách phòng / giường" – font Inter, size 24px, weight SemiBold, color #212529.

Nút "+ Thêm phòng mới" – primary button (background #0A58CA, border-radius 4px, padding 8px 16px, color white).
Khi click → mở Drawer thêm phòng (bên phải, tương tự như Drawer sửa nhưng form rỗng).

4.2. Bộ lọc tìm kiếm (Filter bar)
Layout: Dạng row, flex wrap, gap 16px, margin-bottom 24px, background white, padding 16px 20px, border-radius 8px.

Các thành phần:

Dropdown "Khu / Tòa": width 180px, height 36px, border 1px solid #E5E7EB, border-radius 4px, padding 0 8px. Options: Tất cả, Khu A, Khu B, Khu C.

Dropdown "Tầng": width 120px, similar: Tất cả, 1,2,3,...

Dropdown "Trạng thái": width 150px: Tất cả, Còn trống, Đang giữ chỗ, Đang sử dụng, Bảo trì.

Ô tìm kiếm: width 240px, height 36px, border-radius 20px, icon kính lúp, placeholder: "Tìm theo mã phòng, mã giường".

Nút "Lọc": primary outline (border 1px solid #0A58CA, color #0A58CA, background white, padding 0 16px).

Nút "Reset": text link, color #6C757D.

4.3. Bảng danh sách phòng (Data table)
Khung: background white, border-radius 8px, overflow-x auto.

Bảng: width 100%, border-collapse collapse.

Header: background #F8F9FA, border-bottom 1px solid #E5E7EB.

Các cột (từ trái sang phải):

Mã phòng (width 100px)
Khu / Tầng (120px)
Loại phòng / Sức chứa (100px)
Giá thuê (120px)
Trạng thái (100px)
Số giường trống (100px)
Thao tác (80px)
Mỗi dòng (row):

Padding: 12px 16px, border-bottom 1px solid #E5E7EB.

Font size 14px, color #212529.

Cột Trạng thái: dùng badge tròn.

AVAILABLE: badge xanh lá (#198754) – "Còn trống"

PENDING: badge vàng (#FAAD14) – "Chờ cọc"

RESERVED: badge xanh dương (#0A58CA) – "Đã cọc"

OCCUPIED: badge đỏ (#DC3545) – "Đang sử dụng"

MAINTENANCE: badge xám (#6C757D) – "Bảo trì"

Cột Thao tác: icon bút chì (Edit) màu #0A58CA, click → mở Drawer sửa bên phải.

4.4. Drawer chỉnh sửa / thêm phòng (bên phải)
Kích thước: width 400px, background white, box-shadow left, position fixed, top 0, right 0, height 100vh.

Xuất hiện khi click "Sửa" trên 1 dòng hoặc nút "+ Thêm phòng mới".

Cấu trúc Drawer:

Header: "Chỉnh sửa phòng" (hoặc "Thêm phòng mới") – font 18px, weight SemiBold, padding 20px, border-bottom 1px solid #E5E7EB.

Nút đóng (X) ở góc phải.

Body (form): padding 20px, gap 16px (dạng column).

Trường Mã phòng (text input, required, placeholder "VD: P101").

Dropdown Khu/Tòa (options: A, B, C).

Dropdown Tầng (1..10).

Loại phòng / Sức chứa (dropdown: 2 giường, 4 giường, 6 giường).

Giá thuê (number input, đơn vị VND).

Trạng thái (dropdown: như các trạng thái ở trên).

Ghi chú (textarea, optional).

Danh sách giường (đọc-only hoặc hiển thị dạng list nhỏ, có thể thêm/sửa sau).

Footer (button): padding 20px, border-top 1px solid #E5E7EB.

Nút "Lưu thay đổi" (primary, màu xanh) – click → cập nhật bảng, đóng drawer.

Nút "Hủy" (outline) – đóng drawer không lưu.

(Đối với phòng đã có hợp đồng, ẩn nút xóa hoặc disable trạng thái).

5. Tương tác & điều hướng
Click "Sửa" trên một dòng → mở Drawer với dữ liệu của dòng đó.

Click "+ Thêm phòng mới" → mở Drawer rỗng.

Sau khi lưu → bảng tự động cập nhật (reload dữ liệu giả lập).

Click menu khác (VD: Dashboard) → chuyển sang màn tương ứng (Screen 2).

Click "Đăng xuất" → modal xác nhận → về Screen 1.

6. Các thành phần tái sử dụng
Badge trạng thái (xanh, vàng, đỏ, xám) dùng lại ở nhiều màn (hợp đồng, đặt cọc, trả phòng).

Drawer chỉnh sửa (400px, có header, body, footer) sẽ tái sử dụng cho các màn sau (VD: sửa quy định, sửa hợp đồng).

Bảng (data table) và bộ lọc (filter bar) có thể tái sử dụng cho màn danh sách hợp đồng, danh sách hóa đơn.

7. Ghi chú cho AI sinh ảnh
Giữ nguyên sidebar, top bar từ Screen 2 (chỉ đổi active menu).

Vẽ main content với bộ lọc, bảng, và một Drawer mở ra bên phải (có thể vẽ dạng overlay mờ, drawer trượt từ phải sang).

Bảng có ít nhất 3-4 dòng dữ liệu mẫu.

Các nút, input, dropdown phải rõ ràng, đúng màu sắc.

Không cần animation thực tế, chỉ cần thể hiện trạng thái "Drawer đang mở" (nửa mờ nền, drawer nổi).










//////////////////////////////////////////////////////////////////////////////////////////////

SCREEN 4: BOOKING WORKSPACE – "Tiếp nhận đăng ký & Sắp xếp lịch xem" (ĐÃ SỬA – Bổ sung nút Tạo yêu cầu đặt cọc)
1. Mục đích
Dành cho Nhân viên Sale để:

Nhập thông tin đăng ký thuê phòng của khách hàng (UC5).

Tìm kiếm phòng phù hợp, chọn phòng/giường.

Sắp xếp lịch xem phòng (UC6) và gửi xác nhận.

Sau khi khách xem phòng và đồng ý thuê, Sale bấm nút “Tạo yêu cầu đặt cọc” để sinh yêu cầu thanh toán cọc (UC7) và chuyển sang kế toán (Screen 11).
Công thức tính cọc: Tiền cọc = (Giá thuê tháng × 2) × Số giường thuê (nếu thuê nguyên phòng, số giường = sức chứa tối đa).

2. Bố cục tổng thể
Global layout: Giữ nguyên Sidebar trái (active menu: “Đăng ký & đặt lịch”) và Top bar.

Main content: Chia 2 cột dọc (40% – 60%), padding 24px, nền #F8F9FA.

Cột trái (40%): Form tiếp nhận đăng ký (thông tin khách & yêu cầu).

Cột phải (60%): Chia làm 2 khối dọc:

Khối trên: Danh sách phòng phù hợp (dạng card hoặc bảng đơn giản).

Khối dưới: Panel đặt lịch xem (hiện ra khi chọn một phòng) + sau khi có kết quả xem phòng (khách đồng ý), hiển thị nút “Tạo yêu cầu đặt cọc”.

3. Sidebar và Top bar
Sidebar: Menu “Đăng ký & đặt lịch” active.

Top bar: Breadcrumb: “Đăng ký / Tạo đăng ký mới”.

4. Cột trái – Form tiếp nhận đăng ký
Khung: Card trắng, border-radius 8px, padding 24px.

Tiêu đề: “Thông tin đăng ký thuê” – font 18px, weight SemiBold.

Các trường nhập (dạng cột dọc, gap 16px):

Trường	Kiểu	Placeholder / Options	Ghi chú
Họ tên khách thuê	Text input	“Nhập họ tên”	required
Số điện thoại	Tel	“0909 123 456”	required
Email	Email	“khach@example.com”	optional
Loại khách	Dropdown	Cá nhân / Nhóm	chọn “Nhóm” sẽ hiện bảng nhập thành viên tóm lược
Số người thuê	Number	“Số lượng”	min=1, max=6
Loại phòng mong muốn	Dropdown	Phòng 2 giường / 4 giường / 6 giường	
Ngày dự kiến vào ở	Date picker	“Chọn ngày”	
Yêu cầu đặc biệt	Textarea	“Ví dụ: yên tĩnh, gần cửa…”	3 dòng, không bắt buộc
Ghi chú sale	Textarea	“Nội bộ”	2 dòng, không bắt buộc
Các nút bên dưới form (flex, gap 12px):

“Kiểm tra điều kiện” (outline) – kiểm tra sơ bộ điều kiện lưu trú, hiện toast.
“Tìm phòng phù hợp” (primary, #0A58CA) – gọi API tìm phòng, cập nhật danh sách bên phải.
“Lưu đăng ký” (secondary outline) – lưu thông tin tạm (chưa có lịch xem).
“Xóa form” (text link, màu đỏ nhạt) – reset.
5. Cột phải – Kết quả & lịch xem
5.1. Khối trên: Danh sách phòng phù hợp
Tiêu đề: “Các phòng phù hợp” – font 16px, weight SemiBold.

Hiển thị dạng card dọc (mỗi card cách nhau 12px):

Mỗi card phòng: background white, border-radius 8px, padding 12px, border 1px solid #E5E7EB.

Nội dung: Mã phòng, loại phòng, khu/tầng, giá thuê/tháng, badge trạng thái (Available, Pending…).

Nút “Chọn phòng” (outline nhỏ, width 100%, margin-top 8px) – khi click, kích hoạt panel đặt lịch bên dưới và lưu mã phòng đã chọn.

5.2. Khối dưới: Panel đặt lịch xem + Tạo yêu cầu cọc
Khung: Card trắng, border-top 3px solid #0A58CA (khi đã chọn phòng), padding 20px, margin-top 20px.

Tiêu đề: “Đặt lịch xem phòng” – font 16px, weight SemiBold.

Thông tin phòng đã chọn: dòng nhỏ màu xám.

Các trường:

Ngày xem (date picker, required)

Giờ xem (time picker, required)

Kênh liên hệ (radio: Email / Điện thoại)

Ghi chú cuộc hẹn (textarea, optional)

Nút “Lưu lịch xem” (primary) – lưu appointment, gửi thông báo cho khách, hiện toast thành công.

Sau khi lưu lịch xem và khách đã đồng ý thuê (giả lập: Sale có thể check một checkbox “Khách đã xem phòng và đồng ý thuê”):

Hiển thị một panel con (hoặc khu vực mới) với tiêu đề “Xác nhận đặt cọc”.

Thông tin tính cọc: hiển thị giá thuê tháng, số giường thuê, số tiền cọc tính theo công thức:
Tiền cọc = (GiaThue × 2) × SoGiuongThue (định dạng VND).

Nút “Tạo yêu cầu đặt cọc” (primary, màu xanh #0A58CA, kích thước lớn) – click sẽ:

Gửi yêu cầu đặt cọc (tạo bản ghi DAT_COC với trạng thái PENDING_PAYMENT, thời hạn 24 giờ).

Hiển thị toast: “Đã gửi yêu cầu đặt cọc. Kế toán sẽ xác nhận thanh toán.”

Chuyển hướng về Screen 2 Dashboard (hoặc ở lại và reset form).

6. Tương tác & điều hướng
Click “Tìm phòng” → hiển thị danh sách phòng.

Click “Chọn phòng” → mở khóa panel đặt lịch.

Click “Lưu lịch xem” → lưu, hiện toast, đồng thời hiện checkbox “Khách đã đồng ý thuê” (hoặc nút “Xác nhận thuê”).

Sau khi tick “Khách đồng ý”, panel tính cọc và nút “Tạo yêu cầu đặt cọc” xuất hiện.

Click “Tạo yêu cầu đặt cọc” → hệ thống tính đúng công thức, tạo yêu cầu, chuyển về Dashboard.

7. Các thành phần tái sử dụng
Form, card, button, toast, date/time picker – dùng chung style guide.

Kết nối với Screen 11 (Deposit Payment Confirmation) qua bảng DAT_COC.

8. Ghi chú cho AI sinh ảnh
Vẽ 2 cột đầy đủ form và danh sách phòng.

Khu vực đặt lịch có dạng mở rộng, có các trường nhập.

Bên dưới khu vực đặt lịch, thêm một panel riêng (nền xám nhạt) hiển thị:
“Thông tin cọc: Giá thuê 2.500.000 VND/tháng × 2 tháng × 2 giường = 10.000.000 VND” và nút “Tạo yêu cầu đặt cọc”.

Giữ nguyên sidebar, top bar.







///////////////////////////////////////////////////////////////////////////////
SCREEN 5: CONTRACT CREATION – "Rà soát khách thuê & Lập hợp đồng"
1. Mục đích
Dành cho Nhân viên Sale và Quản lý để:

Rà soát, xác minh giấy tờ và điều kiện lưu trú của khách thuê (cá nhân hoặc từng thành viên trong nhóm) – UC9.

Lập hợp đồng thuê chính thức sau khi rà soát đạt – UC10.

Màn này thường được truy cập từ Screen 4 (sau khi khách đã chọn phòng và xác nhận đặt cọc) hoặc từ Worklist (hồ sơ chờ ký hợp đồng).

2. Bố cục tổng thể
Global layout: Giữ nguyên Sidebar trái (active menu: "Hợp đồng") và Top bar.

Main content: Chia làm 2 phần dọc (không phải 2 cột):

Phần trên (khoảng 45% chiều cao): Rà soát thông tin khách thuê (Screening).

Phần dưới (khoảng 50%): Lập hợp đồng thuê (Contract). Ban đầu bị mờ/disable, chỉ mở khóa sau khi rà soát thành công.

Có thể cuộn dọc toàn bộ main content nếu nội dung dài.

3. Sidebar và Top bar
Sidebar: Mục "Hợp đồng" active (màu xanh #0A58CA, nền #E6F0FF). Các menu khác không active.

Top bar: Breadcrumb: "Hợp đồng / Tạo hợp đồng mới". Giữ nguyên search, chuông, avatar.

4. Phần trên – Rà soát khách thuê (Screening)
4.1. Khung tổng thể
Card trắng, border-radius 8px, padding 20px, margin-bottom 24px, background #FFFFFF.

Tiêu đề: "Rà soát điều kiện lưu trú" – font Inter, size 18px, weight SemiBold, margin-bottom 16px.

4.2. Thông tin khách thuê chính (dạng 2 cột nhỏ)
Cột trái (50%):

Họ tên: Nguyễn Văn A (font 14px, bold)

Giấy tờ: CCCD 123456789 (font 14px)

Số điện thoại: 0909123456

Cột phải (50%):

Loại khách: Cá nhân hoặc Nhóm (trưởng nhóm)

Trạng thái xác minh: badge Chưa kiểm tra (màu xám #6C757D) hoặc Đạt (xanh) hoặc Không đạt (đỏ).

4.3. Danh sách thành viên (nếu thuê nhóm)
Chỉ hiển thị khi Loại khách = Nhóm. Nếu cá nhân thì ẩn hoặc chỉ có 1 dòng.

Bảng nhỏ: width 100%, border-collapse collapse.

Header: Họ tên, Giấy tờ, Trạng thái, Thao tác.

Mỗi dòng: padding 10px 0, border-bottom 1px solid #E5E7EB.

Cột Thao tác: hai nút nhỏ cạnh nhau:

Nút "Đạt" (primary outline, màu xanh lá #198754, chữ trắng? thực tế là nền trắng viền xanh lá).

Nút "Không đạt" (outline, màu đỏ #DC3545).

Khi click một nút, cập nhật trạng thái thành badge tương ứng và disable hai nút đó.

4.4. Nút chức năng của phần rà soát
Nút "Lưu kết quả rà soát" (primary, màu xanh #0A58CA) – lưu lại các đánh giá đạt/không đạt.

Sau khi lưu, nếu tất cả thành viên bắt buộc đều Đạt (hoặc không có ai không đạt), thì phần dưới (Lập hợp đồng) sẽ được mở khóa (sáng, có thể nhập).

Nếu có ít nhất một thành viên không đạt, hiển thị cảnh báo vàng: "Một số thành viên không đủ điều kiện. Hợp đồng chỉ áp dụng cho thành viên đạt." Vẫn cho phép mở khóa nhưng có ghi chú.

Nút "Từ chối thuê" (danger outline, màu đỏ) – chỉ bật nếu khách chính hoặc toàn bộ nhóm không đạt. Click → mở modal xác nhận, sau đó quay về Dashboard.

5. Phần dưới – Lập hợp đồng thuê (Contract)
5.1. Trạng thái
Ban đầu: card này bị mờ (opacity 0.5) và tất cả input đều disabled. Có dòng chữ nhỏ: "Vui lòng hoàn tất rà soát phía trên để lập hợp đồng."

Sau khi lưu rà soát thành công (có ít nhất 1 người đạt): card sáng hẳn, các input enabled.

5.2. Khung tổng thể
Card trắng, border-radius 8px, padding 20px, background #FFFFFF.

Tiêu đề: "Lập hợp đồng thuê" – font Inter, size 18px, weight SemiBold, margin-bottom 16px.

5.3. Các trường thông tin hợp đồng (dạng 2 cột)
Cột trái	Cột phải
Mã hợp đồng (tự động, read-only)	Ngày bắt đầu (date picker, required)
Khách thuê (tên, đã fill từ trên)	Ngày kết thúc (date picker, required)
Phòng/giường (đã chọn từ Screen 4)	Giá thuê (number, VND, pre-filled)
Số người thuê (số lượng thành viên đạt)	Kỳ thanh toán (dropdown: Tháng / Quý)
5.4. Điều khoản thuê (Terms & Conditions)
Khung text scrollable: chiều cao 120px, border 1px solid #E5E7EB, border-radius 4px, padding 12px, background #F8F9FA, overflow-y auto.

Nội dung mẫu: "1. Tuân thủ nội quy ký túc xá... 2. Thanh toán đúng hạn... 3. Bồi thường hư hỏng..."

Checkbox đồng ý: [ ] Tôi đã đọc và đồng ý với các điều khoản trên – bắt buộc phải tick mới cho phép tạo hợp đồng.

5.5. Các nút chức năng
Nút "Xem trước hợp đồng" (outline) – mở modal preview (không cần vẽ chi tiết, chỉ để giả lập).

Nút "Tạo hợp đồng" (primary, màu xanh) – chỉ enabled khi:

Đã tick checkbox điều khoản.

Các trường bắt buộc đã nhập.

Đã có ít nhất một người đạt trong rà soát.

Khi click "Tạo hợp đồng": hiển thị toast "Hợp đồng đã được tạo thành công" và chuyển hướng về Screen 2 Dashboard (hoặc đến Screen 6: Bàn giao phòng tùy luồng).

6. Tương tác & điều hướng
Từ Screen 4 (Booking Workspace), sau khi lưu lịch xem và khách đồng ý thuê → chuyển sang Screen 5 (màn này) với dữ liệu khách, phòng đã được truyền sang.

Click "Lưu kết quả rà soát" → mở khóa phần hợp đồng.

Click "Tạo hợp đồng" → lưu dữ liệu, chuyển về Screen 2 (hoặc có thể chuyển tiếp sang Screen 6 nếu thiết kế liên tục, nhưng theo luồng chính thì sau hợp đồng mới đến bàn giao). Ở đây tạm thời quay về Dashboard, từ Dashboard có menu "Bàn giao" để vào Screen 6.

Click menu "Bàn giao" ở sidebar → chuyển sang Screen 6.

7. Các thành phần tái sử dụng
Card, input, button, badge giống các màn trước.

Modal xác nhận (dùng cho "Từ chối thuê") sẽ tái sử dụng ở màn sau.

Scrollable text box (điều khoản) có thể dùng lại cho các hợp đồng khác.

8. Ghi chú cho AI sinh ảnh
Vẽ đủ hai phần rõ ràng: phần trên (rà soát) và phần dưới (hợp đồng) trong cùng một màn hình, có thể cuộn.

Phần dưới lúc đầu nên thể hiện trạng thái mờ/disabled (có thể vẽ với opacity 0.5 và các input màu nền xám).

Hoặc vẽ ở trạng thái đã mở khóa (sau khi rà soát) để người xem thấy rõ form hợp đồng – tùy bạn, nhưng nên có chú thích.

Có bảng danh sách thành viên với các nút "Đạt"/"Không đạt".

Đảm bảo checkbox điều khoản và nút "Tạo hợp đồng" rõ ràng.

Giữ nguyên sidebar, top bar từ các màn trước, chỉ đổi active menu.








//////////////////////////////////////////////////////////////////
SCREEN 6: ROOM HANDOVER & ASSET CHECKLIST – "Bàn giao phòng & Biên bản tài sản"
1. Mục đích
Dành cho Quản lý (và Nhân viên sale khi cần) để:

Xem thông tin hợp đồng và phòng/giường đã được ký (từ Screen 5).

Kiểm tra hiện trạng phòng, lập biên bản bàn giao tài sản (UC11 + UC12).

Xác nhận bàn giao phòng cho khách, cập nhật trạng thái phòng thành "Đang sử dụng".

Màn này thường được truy cập từ Dashboard (qua menu "Bàn giao") hoặc từ Worklist (phòng chờ bàn giao sau khi hợp đồng được ký).

2. Bố cục tổng thể
Global layout: Giữ nguyên Sidebar trái (active menu: "Bàn giao") và Top bar.

Main content: Chia làm 2 cột dọc (35% – 65%), padding 24px, nền #F8F9FA.

Cột trái (35%): Thông tin hợp đồng và bàn giao (read-only + nút xác nhận).

Cột phải (65%): Danh sách tài sản cần bàn giao (checklist + tình trạng, số lượng).

3. Sidebar và Top bar
Sidebar: Mục "Bàn giao" active (màu xanh #0A58CA, nền #E6F0FF). Các menu khác không active.

Top bar: Breadcrumb: "Bàn giao / Bàn giao phòng". Giữ nguyên search, chuông, avatar.

4. Cột trái – Thông tin hợp đồng & bàn giao
4.1. Khung tổng thể
Card trắng, border-radius 8px, padding 20px, background #FFFFFF.

Tiêu đề: "Thông tin hợp đồng & bàn giao" – font Inter, size 18px, weight SemiBold, margin-bottom 16px.

4.2. Các trường thông tin (dạng label – value, dọc)
Mã hợp đồng: HD-2025-00123 (font 14px, bold, màu #0A58CA)

Khách thuê: Nguyễn Văn A (và danh sách thành viên nếu có – viết tắt)

Phòng / giường: P.201 – Giường số 2 (hoặc nguyên phòng)

Thời hạn: 01/04/2025 – 31/03/2026

Nhân viên phụ trách: Trần Thị B (Sale)

Trạng thái bàn giao hiện tại: badge Chưa bàn giao (màu vàng #FAAD14)

4.3. Các nút chức năng (bên dưới thông tin)
Nút "Tải hợp đồng" (outline, icon tải xuống) – giả lập tải file PDF hợp đồng (không đổi trang).

Nút "Xác nhận bàn giao" (primary, màu xanh #0A58CA) – chỉ enabled khi tất cả tài sản bên cột phải đã được kiểm tra (checkbox đánh dấu) và không có lỗi.

Click → hiện toast "Bàn giao thành công", cập nhật trạng thái phòng thành "Đang sử dụng", chuyển về Dashboard (Screen 2).

Nút "Hủy bỏ" (outline, màu đỏ nhạt) – quay về Dashboard mà không lưu.

5. Cột phải – Danh sách tài sản bàn giao (Checklist)
5.1. Khung tổng thể
Card trắng, border-radius 8px, padding 20px, background #FFFFFF.

Tiêu đề: "Biên bản bàn giao tài sản" – font 18px, weight SemiBold, margin-bottom 12px.

Dòng phụ: "Kiểm tra và xác nhận từng tài sản trước khi bàn giao" – font 13px, màu #6C757D, margin-bottom 16px.

5.2. Bảng danh sách tài sản (dạng table)
Bảng: width 100%, border-collapse collapse.

Header: background #F8F9FA, border-bottom 1px solid #E5E7EB.

Các cột: Tên tài sản (40%), Số lượng (15%), Tình trạng (25%), Đã kiểm tra (20%).

Mỗi dòng (tối thiểu 4-5 dòng mẫu):

Giường tầng | 2 | Dropdown (Mới / Tốt / Hư hỏng) | Checkbox [ ].

Nệm | 2 | Dropdown (Mới / Tốt / Hư hỏng) | Checkbox [ ].

Tủ quần áo | 1 | Dropdown | Checkbox [ ].

Chìa khóa / thẻ từ | 2 | Dropdown | Checkbox [ ].

Điều hòa nhiệt độ | 1 | Dropdown | Checkbox [ ].

Quạt treo tường | 1 | Dropdown | Checkbox [ ].

Style dropdown: border 1px solid #E5E7EB, border-radius 4px, padding 4px 8px, font 13px.

Checkbox: kích thước 18x18px, accent color #0A58CA.

5.3. Thêm tài sản tùy chỉnh (tuỳ chọn, nhưng nên có để linh hoạt)
Dòng cuối cùng của bảng (hoặc phía dưới bảng):

Nút nhỏ "+ Thêm tài sản" (text link, màu xanh, font 13px) – click sẽ thêm một dòng mới với các ô trống (có thể nhập tên tài sản, số lượng).

Không bắt buộc vẽ chi tiết animation, chỉ cần thể hiện một dòng trống mẫu là đủ.

5.4. Tóm tắt số lượng đã kiểm tra
Phía dưới bảng (right align): hiển thị Đã kiểm tra: 3 / 6 tài sản (font 13px, màu xám). Số này tăng khi checkbox được tick.

6. Tương tác & điều hướng
Dữ liệu hợp đồng và tài sản mặc định được lấy từ hợp đồng đã ký (truyền từ Screen 5). AI chỉ cần vẽ mẫu với dữ liệu giả định.

Khi người dùng tick checkbox "Đã kiểm tra" ở một dòng, dropdown tình trạng có thể chọn, nhưng không bắt buộc phải có logic thật trong ảnh tĩnh; chỉ cần thể hiện trạng thái UI (checkbox có thể tick).

Nút "Xác nhận bàn giao" chỉ enabled khi tất cả checkbox được tick. Trong ảnh tĩnh, có thể vẽ nút ở trạng thái enabled (màu xanh đậm) hoặc disabled (màu xám) tùy ý, nhưng nên để enabled để thấy rõ hành động.

Sau khi click "Xác nhận bàn giao" (trong prototype giả lập) → chuyển về Screen 2 (Dashboard) và cập nhật trạng thái phòng.

7. Các thành phần tái sử dụng
Bảng checklist với checkbox và dropdown sẽ tái sử dụng ở màn 7 (Kiểm tra trả phòng) nhưng với mục đích khác.

Dropdown tình trạng (Mới / Tốt / Hư hỏng) dùng chung style.

Nút "Xác nhận" primary và "Hủy" outline dùng lại ở nhiều màn.

8. Ghi chú cho AI sinh ảnh
Vẽ đủ 2 cột với cột trái là thông tin hợp đồng, cột phải là bảng tài sản.

Bảng tài sản có ít nhất 5 dòng với các checkbox và dropdown.

Có hiển thị dòng "Đã kiểm tra: 3/6" ở dưới bảng.

Nút "Xác nhận bàn giao" có màu xanh #0A58CA, nổi bật.

Giữ nguyên sidebar, top bar từ các màn trước (chỉ đổi active menu).

Màu nền main content vẫn là #F8F9FA, các card trắng.










////////////////////////////////////////////////////////////////////////
SCREEN 7: CONTRACT CREATION – "Rà soát khách thuê & Lập hợp đồng" (ĐÃ SỬA – Bổ sung bước thanh toán kỳ đầu)
1. Mục đích
Dành cho Nhân viên Sale và Quản lý để:

Rà soát, xác minh giấy tờ và điều kiện lưu trú của khách thuê (UC9).

Lập hợp đồng thuê sau khi rà soát đạt (UC10).

Sau khi tạo hợp đồng, hệ thống chuyển sang trạng thái "Chờ thanh toán kỳ đầu".
Chỉ khi Kế toán xác nhận đã thu đủ tiền thuê kỳ đầu (và các phí liên quan) thì hợp đồng mới được kích hoạt để bàn giao phòng (theo yêu cầu đề bài mục 3.1.3).

Màn này thường được truy cập từ Screen 4 (sau khi tạo yêu cầu cọc thành công) hoặc từ Dashboard (hồ sơ chờ ký hợp đồng).

2. Bố cục tổng thể
Global layout: Giữ nguyên Sidebar trái (active menu: “Hợp đồng”) và Top bar.

Main content: Chia làm 2 phần dọc:

Phần trên (45% chiều cao): Rà soát khách thuê (Screening).

Phần dưới (50%): Lập hợp đồng thuê (Contract). Ban đầu bị mờ/disable, chỉ mở khóa sau khi rà soát thành công.

Có thể cuộn dọc toàn bộ main content.

3. Sidebar và Top bar
Sidebar: Mục “Hợp đồng” active.

Top bar: Breadcrumb: “Hợp đồng / Tạo hợp đồng mới”.

4. Phần trên – Rà soát khách thuê (Screening)
Card trắng, border-radius 8px, padding 20px, margin-bottom 24px.

Tiêu đề: “Rà soát điều kiện lưu trú” – font 18px, weight SemiBold.

4.1. Thông tin khách chính
2 cột nhỏ: Họ tên, giấy tờ, SĐT, loại khách (Cá nhân/Nhóm).

Trạng thái xác minh: badge “Chưa kiểm tra” (xám).

4.2. Danh sách thành viên (nếu thuê nhóm)
Bảng: Họ tên, giấy tờ, trạng thái, thao tác.

Mỗi dòng có nút “Đạt” (xanh lá) và “Không đạt” (đỏ viền). Khi click, cập nhật badge và disable hai nút.

4.3. Nút chức năng
“Lưu kết quả rà soát” (primary) – lưu lại các đánh giá. Nếu có ít nhất một người đạt, phần hợp đồng bên dưới sẽ được mở khóa.

“Từ chối thuê” (danger outline) – chỉ bật nếu không ai đạt, mở modal xác nhận, quay về Dashboard.

5. Phần dưới – Lập hợp đồng thuê (Contract)
Trạng thái ban đầu: card mờ (opacity 0.5), các input disabled, dòng thông báo: “Chưa thể lập hợp đồng. Vui lòng hoàn tất rà soát phía trên.”

Sau khi lưu rà soát thành công: card sáng, các input enabled.

5.1. Card nội dung hợp đồng
Background #FFFFFF, border-radius 8px, padding 24px.

Tiêu đề: “Thông tin hợp đồng thuê” – font 18px, weight SemiBold.

5.2. Các trường thông tin (dạng 2 cột)
Cột trái	Cột phải
Mã hợp đồng (tự động, read-only)	Ngày bắt đầu (date picker)
Khách thuê (từ trên)	Ngày kết thúc (date picker)
Phòng/giường (từ Screen 4)	Giá thuê/tháng (read-only)
Số người thuê (đã đạt)	Kỳ thanh toán (dropdown: Tháng / Quý)
5.3. Điều khoản thuê (Terms)
Khung text scrollable (height 120px, border, nền #F8F9FA).

Checkbox “Tôi đã đọc và đồng ý với các điều khoản” – bắt buộc.

5.4. Các nút chức năng
“Xem trước hợp đồng” (outline) – mở modal preview.

“Tạo hợp đồng” (primary, màu xanh) – chỉ enabled khi: đã tick điều khoản, các trường bắt buộc đã nhập, và có ít nhất một người đạt.

Click → hệ thống tạo bản ghi HOP_DONG_THUE_NHA với trạng thái PENDING_FIRST_PAYMENT (chờ thanh toán kỳ đầu).

Hiển thị modal thông báo:
“Hợp đồng đã được tạo. Vui lòng chuyển sang bước thanh toán tiền thuê kỳ đầu (và các phí liên quan) trước khi bàn giao phòng. Kế toán sẽ xác nhận thanh toán và kích hoạt hợp đồng.”

Chuyển hướng về Dashboard (Screen 2) hoặc đến Screen 12 (Invoice Generator) để lập hóa đơn tiền thuê kỳ đầu.

6. Bổ sung: Quy trình thanh toán kỳ đầu (kết nối với Screen 12)
Sau khi hợp đồng được tạo với trạng thái PENDING_FIRST_PAYMENT, Kế toán vào Screen 12 (Invoice Generator) chọn loại hóa đơn “Tiền thuê kỳ đầu”, nhập mã hợp đồng, số tiền, xác nhận thanh toán.

Khi kế toán xác nhận thanh toán thành công:

Hệ thống cập nhật trạng thái hợp đồng thành ACTIVE.

Phòng/giường vẫn giữ trạng thái RESERVED (chưa chuyển thành OCCUPIED).

Lúc này, màn hình Screen 8 (Room Handover) mới cho phép bàn giao (nút “Xác nhận bàn giao” sẽ enabled).

7. Tương tác & điều hướng
Từ Screen 4 → Screen 7: Sau khi tạo yêu cầu cọc thành công, Sale chuyển sang màn này với dữ liệu khách, phòng đã có.

Sau khi tạo hợp đồng: Chuyển về Dashboard, đồng thời thông báo cho Kế toán (qua worklist) để xử lý thanh toán kỳ đầu.

Khi Kế toán hoàn tất thanh toán kỳ đầu: Cập nhật trạng thái hợp đồng thành ACTIVE, sale/quản lý mới được phép vào Screen 8.

8. Các thành phần tái sử dụng
Card, badge, button, modal, date picker, checkbox, textarea.

Modal thông báo (dùng chung).

9. Ghi chú cho AI sinh ảnh
Vẽ 2 phần rõ ràng: phần trên (rà soát) với bảng thành viên và các nút Đạt/Không đạt.

Phần dưới (hợp đồng) ở trạng thái đã mở khóa (sau khi rà soát), có đầy đủ các trường và checkbox.

Nút “Tạo hợp đồng” màu xanh nổi bật.

Có thể vẽ thêm một modal nhỏ thông báo về bước thanh toán kỳ đầu (nhưng không bắt buộc).

Giữ nguyên sidebar, top bar, đúng style guide.









///////////////////////////////////////////////////////////
SCREEN 8: ROOM HANDOVER & ASSET CHECKLIST – "Bàn giao phòng & Biên bản tài sản" (ĐÃ SỬA – Bổ sung điều kiện thanh toán kỳ đầu)
1. Mục đích
Dành cho Quản lý (và Nhân viên sale) để:

Xem thông tin hợp đồng và phòng/giường đã được ký (từ Screen 7).

Kiểm tra hiện trạng phòng, lập biên bản bàn giao tài sản (UC11 + UC12).

Chỉ được phép xác nhận bàn giao khi hợp đồng đã ở trạng thái ACTIVE (tức là Kế toán đã xác nhận thu đủ tiền thuê kỳ đầu và các phí liên quan, theo yêu cầu đề bài mục 3.1.3). Nếu hợp đồng vẫn ở trạng thái PENDING_FIRST_PAYMENT, nút bàn giao bị disable và hiển thị cảnh báo.

Màn này thường được truy cập từ Dashboard (menu “Bàn giao”) hoặc từ Worklist (phòng chờ bàn giao sau khi hợp đồng được kích hoạt).

2. Bố cục tổng thể
Global layout: Giữ nguyên Sidebar trái (active menu: “Bàn giao”) và Top bar.

Main content: Chia làm 2 cột dọc (35% – 65%), padding 24px, nền #F8F9FA.

Cột trái (35%): Thông tin hợp đồng, trạng thái thanh toán, và nút xác nhận bàn giao.

Cột phải (65%): Danh sách tài sản cần bàn giao (checklist + tình trạng, số lượng, checkbox kiểm tra).

3. Sidebar và Top bar
Sidebar: Mục “Bàn giao” active.

Top bar: Breadcrumb: “Bàn giao / Bàn giao phòng”.

4. Cột trái – Thông tin hợp đồng & bàn giao
4.1. Card thông tin hợp đồng
Card trắng, border-radius 8px, padding 20px.

Tiêu đề: “Thông tin hợp đồng & bàn giao” – font 18px, weight SemiBold.

4.2. Các trường thông tin (dạng label-value, dọc)
Mã hợp đồng: HD-2025-00123

Khách thuê: Nguyễn Văn A (và danh sách thành viên nếu có)

Phòng / giường: P.201 – Giường số 2 (hoặc nguyên phòng)

Thời hạn: 01/04/2025 – 31/03/2026

Trạng thái thanh toán kỳ đầu: hiển thị badge:

Màu vàng (#FAAD14) “Chưa thanh toán” nếu hợp đồng đang PENDING_FIRST_PAYMENT

Màu xanh lá (#198754) “Đã thanh toán” nếu hợp đồng đã ACTIVE

Trạng thái bàn giao hiện tại: badge “Chưa bàn giao” (màu vàng) hoặc “Đã bàn giao” (xanh lá).

4.3. Cảnh báo (nếu chưa thanh toán kỳ đầu)
Nếu hợp đồng chưa được thanh toán kỳ đầu (PENDING_FIRST_PAYMENT), hiển thị một khung cảnh báo đỏ nhạt (background #FEE2E2, border-left 4px solid #DC3545, padding 12px) với nội dung:

“Hợp đồng chưa được thanh toán tiền thuê kỳ đầu và các phí liên quan. Vui lòng liên hệ Kế toán để hoàn tất thanh toán trước khi bàn giao phòng.”

4.4. Các nút chức năng
Nút “Tải hợp đồng” (outline, icon tải xuống) – tải file PDF hợp đồng.

Nút “Xác nhận bàn giao” (primary, màu xanh #0A58CA):

Enabled chỉ khi:

Hợp đồng đã ở trạng thái ACTIVE (đã thanh toán kỳ đầu).
Tất cả tài sản bên cột phải đã được tick checkbox “Đã kiểm tra”.
Nếu chưa đủ điều kiện, nút bị disable (màu xám, cursor not-allowed) và hiển thị tooltip (hoặc dòng chữ nhỏ bên cạnh) giải thích lý do.

Khi click → hiện toast “Bàn giao thành công”, cập nhật trạng thái phòng/giường thành OCCUPIED, chuyển về Dashboard (Screen 2).

Nút “Hủy” (outline, màu đỏ nhạt) – quay về Dashboard mà không lưu.

5. Cột phải – Danh sách tài sản bàn giao (Checklist)
5.1. Card tiêu đề
Card trắng, border-radius 8px, padding 20px.

Tiêu đề: “Biên bản bàn giao tài sản” – font 18px, weight SemiBold.

Dòng phụ: “Kiểm tra và xác nhận từng tài sản trước khi bàn giao” – font 13px, màu #6C757D.

5.2. Bảng danh sách tài sản
Bảng width 100%, border-collapse collapse.

Header: background #F8F9FA, border-bottom 1px solid #E5E7EB.

Các cột: Tên tài sản (40%), Số lượng (15%), Tình trạng (25%), Đã kiểm tra (20%).

Mỗi dòng (ít nhất 5-6 dòng mẫu):

Giường tầng | 2 | Dropdown (Mới / Tốt / Hư hỏng) | Checkbox [ ]

Nệm | 2 | Dropdown | Checkbox [ ]

Tủ quần áo | 1 | Dropdown | Checkbox [ ]

Chìa khóa / thẻ từ | 2 | Dropdown | Checkbox [ ]

Điều hòa | 1 | Dropdown | Checkbox [ ]

Quạt treo | 1 | Dropdown | Checkbox [ ]

Checkbox có thể được tick/untick. Khi tick, hàng đó coi như đã kiểm tra.

5.3. Thêm tài sản tùy chỉnh (optional)
Nút “+ Thêm tài sản” (text link, màu xanh, font 13px) – thêm dòng mới với các ô trống.

5.4. Tóm tắt số lượng đã kiểm tra
Hiển thị bên dưới bảng, right align: Đã kiểm tra: 3 / 6 tài sản (font 13px, màu xám). Số này tự động tăng khi checkbox được tick.

6. Tương tác & điều hướng
Khi vào màn này: Hệ thống tự động kiểm tra trạng thái hợp đồng. Nếu PENDING_FIRST_PAYMENT, hiển thị cảnh báo đỏ và disable nút “Xác nhận bàn giao”.

Người dùng tick checkbox ở cột phải → cập nhật số lượng đã kiểm tra.

Chỉ khi tất cả checkbox đều được tick VÀ hợp đồng đã ACTIVE thì nút “Xác nhận bàn giao” mới enabled.

Click “Xác nhận bàn giao” → cập nhật trạng thái phòng thành OCCUPIED, hợp đồng chuyển thành ACTIVE (nếu chưa), lưu biên bản bàn giao, chuyển về Dashboard.

Click menu khác → chuyển màn tương ứng.

7. Các thành phần tái sử dụng
Card, bảng, badge, dropdown, checkbox, button, toast cảnh báo.

Dropdown tình trạng (Mới / Tốt / Hư hỏng) dùng chung.

Nút “Xác nhận bàn giao” primary style.

8. Ghi chú cho AI sinh ảnh
Vẽ 2 cột: cột trái có thông tin hợp đồng, badge trạng thái thanh toán, khung cảnh báo đỏ (nếu chưa thanh toán). Nút “Xác nhận bàn giao” nên vẽ ở trạng thái disabled (màu xám) nếu hợp đồng chưa active, hoặc enabled (xanh) nếu đã active – tùy theo kịch bản minh họa. Tốt nhất vẽ cả hai? Thực tế chỉ cần vẽ một trạng thái điển hình: hợp đồng đã thanh toán để thấy nút sáng, kèm chú thích.

Cột phải có bảng checklist với 5-6 dòng, checkbox, dropdown.

Có dòng “Đã kiểm tra: X/Y” ở cuối bảng.

Giữ nguyên sidebar, top bar, active menu “Bàn giao”.

Màu sắc, font, border radius theo style guide.







///////////////////////////////////////////////////////
SCREEN 9: STANDALONE INVOICE GENERATOR – "Lập hóa đơn"
1. Mục đích
Dành cho Kế toán (và Quản lý) để:

Tạo hóa đơn thanh toán độc lập cho các giao dịch: đặt cọc (UC7), thanh toán chênh lệch (UC17), hoàn cọc (UC18), hoặc các khoản thu khác (tiền phòng, dịch vụ…).

Xem trước hóa đơn dạng receipt trước khi gửi cho khách.

Gửi hóa đơn qua email hoặc tải xuống PDF.

Màn này có thể được truy cập từ:

Screen 8 (Financial Settlement) – sau khi xác nhận đối soát, click “Lập hóa đơn”.

Dashboard (menu “Hóa đơn” → “Tạo hóa đơn mới”).

Worklist (hóa đơn chờ tạo).

2. Bố cục tổng thể
Global layout: Giữ nguyên Sidebar trái (active menu: “Hóa đơn”) và Top bar.

Main content: Chia làm 2 cột dọc (40% – 60%), padding 24px, nền #F8F9FA.

Cột trái (40%): Form nhập thông tin hóa đơn.

Cột phải (60%): Preview hóa đơn dạng receipt (cập nhật theo dữ liệu form).

3. Sidebar và Top bar
Sidebar: Mục “Hóa đơn” active (màu xanh #0A58CA, nền #E6F0FF). Các menu khác không active.

Top bar: Breadcrumb: “Hóa đơn / Tạo hóa đơn”. Giữ nguyên search, chuông, avatar.

4. Cột trái – Form nhập thông tin hóa đơn
Card trắng, border-radius 8px, padding 24px, background #FFFFFF.

4.1. Tiêu đề form
“Thông tin hóa đơn” – font Inter, size 18px, weight SemiBold, margin-bottom 20px.

4.2. Các trường nhập (dạng cột dọc, gap 16px)
Trường	Kiểu	Options / Placeholder	Ghi chú
Loại giao dịch	Dropdown	Đặt cọc, Thanh toán chênh lệch, Hoàn cọc, Tiền phòng tháng, Phí dịch vụ, Phạt vi phạm	required
Mã hợp đồng / Mã cọc	Text input	“Nhập mã hợp đồng hoặc mã cọc”	có thể tự động fill nếu đến từ Screen 8
Tên khách hàng	Text input	“Nguyễn Văn A”	required
Phòng / giường	Text input	“P.201 – Giường 2”	optional
Số tiền	Number input	“0” VND	required, >0
Ngày phát hành	Date picker	mặc định là ngày hiện tại	required
Hạn thanh toán	Date picker	(chỉ hiển thị nếu loại giao dịch yêu cầu thanh toán)	optional
Ghi chú	Textarea	“Nội dung thêm…”	3 dòng, optional
4.3. Nút chức năng (bên dưới form, flex, gap 12px)
Nút “Xem trước hóa đơn” (outline) – cập nhật preview bên phải theo dữ liệu nhập (không đổi trang).

Nút “Tạo hóa đơn” (primary, màu xanh #0A58CA) – lưu hóa đơn, hiển thị toast “Hóa đơn đã được tạo”, chuyển về Dashboard hoặc ở lại màn (tùy). Trong prototype, chuyển về Screen 2.

Nút “Hủy” (text link, màu đỏ) – quay lại Dashboard.

5. Cột phải – Preview hóa đơn (dạng receipt)
5.1. Khung tổng thể
Card trắng, border-radius 8px, padding 20px, background #FFFFFF, border: 1px dashed #0A58CA (để nhấn là preview).

Tiêu đề: “Hóa đơn mẫu” – font 14px, color #6C757D, text-align center, margin-bottom 12px.

5.2. Nội dung hóa đơn (thiết kế giống phiếu in)
Phần đầu (căn giữa):

Logo: “HomeStay Dorm” (font bold, size 20px, color #0A58CA)

Dòng 2: “HÓA ĐƠN THANH TOÁN” (font 18px, weight bold, uppercase)

Số hóa đơn: HD-2025-00001 (tự động sinh, màu xám)

Thông tin khách hàng (bảng 2 cột, font 13px):

Tên khách: Nguyễn Văn A

Mã hợp đồng: HD-2025-00123

Phòng: P.201

Ngày lập: 15/12/2025

Bảng kê chi tiết (dạng table):

Diễn giải	Số tiền
Tiền cọc (2 tháng)	3.000.000 VND
Khấu trừ hư hỏng	-600.000 VND
Khấu trừ điện nước	-200.000 VND
Hoàn cọc (50% tỷ lệ)	700.000 VND
(Chỉ hiển thị các dòng phù hợp với loại giao dịch)	
Tổng cộng (cuối bảng, font bold, size 16px): 700.000 VND (màu xanh nếu là hoàn tiền, đỏ nếu phải thu).

Chân trang: “Cảm ơn quý khách!” – font 12px, màu xám, line.

5.3. Nút trong preview (bên dưới receipt)
Nút “Tải PDF” (outline nhỏ) – giả lập tải file.

Nút “Gửi email” (outline nhỏ) – giả lập gửi.

6. Tương tác & điều hướng
Khi người dùng nhập liệu ở form trái, click “Xem trước hóa đơn” → preview bên phải cập nhật nội dung tương ứng. Trong ảnh tĩnh, có thể vẽ preview với dữ liệu mẫu (từ Screen 8: hoàn cọc 700.000 VND).

Khi click “Tạo hóa đơn” → hiện toast “Đã lưu hóa đơn”, chuyển về Screen 2 (Dashboard).

Từ Screen 8: Nếu người dùng click “Lập hóa đơn”, sẽ tự động chuyển đến Screen 9 với các trường đã được điền sẵn (mã hợp đồng, tên khách, số tiền, loại giao dịch). AI có thể vẽ trạng thái form đã được pre-fill để minh họa (tức là các ô không rỗng).

Click menu “Dashboard” ở sidebar → quay về Screen 2.

7. Các thành phần tái sử dụng
Form style, input, dropdown, button giống các màn trước.

Preview receipt có thể tái sử dụng ở các màn báo cáo xuất hóa đơn.

Toast thông báo dùng chung.

8. Ghi chú cho AI sinh ảnh
Vẽ 2 cột rõ ràng: bên trái là form nhập liệu (các trường như trên, có thể pre-fill dữ liệu mẫu từ hoàn cọc), bên phải là preview receipt dạng card viền đứt.

Preview receipt nên có đủ các thành phần: logo, tiêu đề hóa đơn, thông tin khách, bảng kê, tổng cộng.

Các nút “Xem trước hóa đơn”, “Tạo hóa đơn”, “Tải PDF”, “Gửi email” hiển thị rõ.

Giữ nguyên sidebar, top bar, active menu “Hóa đơn”.

Màu sắc, font chữ, bo góc theo đúng style guide.






///////////////////////////////////////////////////
SCREEN 10: POLICY MANAGEMENT – "Quản lý quy định, quy tắc"
1. Mục đích
Dành cho Quản lý (và Admin) để:

Xem, thêm, sửa, xóa các quy định lưu trú và nội quy ký túc xá (UC4).

Các quy định này ảnh hưởng đến: tỷ lệ hoàn cọc (theo thời gian ở), điều kiện lưu trú (giới tính, quốc tịch, giấy tờ), các khoản phạt vi phạm, quy định đặt cọc…

Màn này có thể truy cập từ Dashboard (menu “Quản lý quy định” – chưa có trong 9 màn trước, cần thêm vào sidebar).

2. Bố cục tổng thể
Global layout: Giữ nguyên Sidebar trái (thêm mục “Quy định” active) và Top bar.

Main content: Chia làm 2 phần dọc (không phải cột):

Phần trên: Bộ lọc + nút thêm mới.

Phần dưới: Bảng danh sách quy định (dạng table, có thể sửa/xóa từng dòng).

Khi click “Sửa” hoặc “Thêm mới” → mở Drawer chỉnh sửa bên phải (giống Screen 3).

3. Sidebar và Top bar (cập nhật)
Sidebar: Thêm mục “Quy định” (icon luật) vào giữa “Dashboard” và “Quản lý phòng”. Mục này active.

Top bar: Breadcrumb: “Quản lý / Quy định & nội quy”.

4. Phần trên – Bộ lọc và thao tác
Card trắng, border-radius 8px, padding 16px 20px, margin-bottom 20px.

Layout: Flex, justify-content space-between, align-items center.

Bên trái (bộ lọc):

Ô tìm kiếm: width 240px, height 36px, border-radius 20px, placeholder: “Tìm theo tiêu đề, nội dung...”.

Dropdown “Nhóm quy định”: width 160px (Tất cả / Quy định lưu trú / Nội quy phòng / Quy định cọc / Quy định khấu trừ).

Dropdown “Trạng thái”: width 120px (Tất cả / Đang áp dụng / Sắp áp dụng / Hết hiệu lực).

Nút “Lọc” (outline), nút “Reset” (text link).

Bên phải: Nút “+ Thêm quy định mới” (primary, màu xanh #0A58CA) – click mở Drawer thêm mới.

5. Phần dưới – Bảng danh sách quy định
Card trắng, border-radius 8px, padding 0 (table bao quanh), overflow-x auto.

Bảng (data table): width 100%, border-collapse collapse.

Header: background #F8F9FA, border-bottom 1px solid #E5E7EB.

Các cột: Mã (80px), Tiêu đề (25%), Nhóm (15%), Nội dung tóm tắt (30%), Ngày hiệu lực (12%), Trạng thái (10%), Thao tác (8%).

Mỗi dòng: padding 12px 16px, border-bottom 1px solid #E5E7EB, font 14px.

Ví dụ dòng 1: R001 | Tỷ lệ hoàn cọc theo thời gian | Quy định cọc | Dưới 6 tháng:50%, trên 6 tháng:70%... | 01/01/2025 | badge xanh “Đang áp dụng” | icon sửa + xóa.

Ví dụ dòng 2: R002 | Giới tính lưu trú | Quy định lưu trú | Khu A: nữ, Khu B: nam, Khu C: hỗn hợp | 01/01/2025 | badge xanh | icon sửa + xóa.

Ví dụ dòng 3: R003 | Quy định về gửi xe | Nội quy chung | Mỗi phòng được gửi 2 xe máy, 1 ô tô | 15/03/2025 | badge vàng “Sắp áp dụng” | icon sửa + xóa.

Badge trạng thái:

Đang áp dụng: màu xanh lá #198754.

Sắp áp dụng: màu vàng #FAAD14.

Hết hiệu lực: màu xám #6C757D.

6. Drawer chỉnh sửa / thêm quy định (bên phải)
Kích thước: width 500px, background white, box-shadow left, height 100vh, fixed, right 0, top 0.

Header: “Thêm quy định mới” hoặc “Chỉnh sửa quy định” – font 18px, weight SemiBold, padding 20px, border-bottom 1px solid #E5E7EB. Có nút đóng (X).

Body (form): padding 20px, gap 16px dạng cột.

Tiêu đề quy định (text input, required, placeholder “VD: Quy định hoàn cọc”).

Nhóm quy định (dropdown: Quy định lưu trú / Nội quy phòng / Quy định cọc / Quy định khấu trừ / Quy định chung).

Nội dung chi tiết (textarea, 6 dòng, required, placeholder “Mô tả đầy đủ nội dung quy định…”).

Ngày hiệu lực (date picker, required).

Ngày hết hiệu lực (date picker, optional – để trống nghĩa là vô thời hạn).

Trạng thái (dropdown: Đang áp dụng / Sắp áp dụng / Hết hiệu lực).

Ưu tiên (dropdown: Cao / Trung bình / Thấp) – dùng để xếp hạng quy định nếu có nhiều.

Áp dụng cho (checkbox group: Toàn hệ thống / Khu A / Khu B / Khu C / Phòng 2 giường / Phòng 4 giường…) – có thể chọn nhiều.

Tệp đính kèm (nút upload file – tùy chọn).

Footer: padding 20px, border-top 1px solid #E5E7EB, flex gap 12px.

Nút “Lưu quy định” (primary, màu xanh) – lưu và đóng drawer, cập nhật bảng.

Nút “Hủy” (outline) – đóng drawer không lưu.

Nút “Xóa” (danger outline, màu đỏ) – chỉ hiển thị ở chế độ sửa, click mở modal xác nhận xóa.

7. Tương tác & điều hướng
Click “+ Thêm quy định mới” → mở Drawer rỗng.

Click icon sửa (bút chì) trên một dòng → mở Drawer với dữ liệu của dòng đó.

Click icon xóa (thùng rác) → mở modal xác nhận “Bạn có chắc muốn xóa quy định này?”. Nếu xóa, xóa khỏi bảng.

Click “Lưu quy định” → đóng drawer, cập nhật bảng (thêm dòng mới hoặc cập nhật dòng cũ).

Click menu khác ở sidebar → chuyển sang màn tương ứng.

8. Các thành phần tái sử dụng
Drawer (giống Screen 3), bảng (giống Screen 3), badge, button, dropdown.

Modal xác nhận xóa tái sử dụng từ các màn trước.

9. Ghi chú cho AI sinh ảnh
Vẽ màn hình với sidebar có thêm mục “Quy định” (active).

Bảng có ít nhất 3 dòng dữ liệu mẫu, mỗi dòng có icon sửa/xóa.

Có drawer mở ra bên phải với form như mô tả (vẽ drawer đang mở, nền mờ phía sau).

Các input, textarea, dropdown, checkbox phải rõ ràng.

Màu sắc, font, border radius giữ đúng style guide.












////////////////////////////////////////////////
SCREEN 11: DEPOSIT PAYMENT CONFIRMATION – "Xác nhận thanh toán cọc" (ĐÃ SỬA – Tự động hủy theo cronjob, không có nút hủy thủ công)
1. Mục đích
Dành cho Kế toán (và Quản lý) để:

Xem danh sách các yêu cầu đặt cọc đang chờ thanh toán (từ Screen 4).

Xác nhận khách hàng đã thanh toán tiền cọc (UC7), cập nhật trạng thái phòng/giường thành RESERVED.

Tự động tạo hóa đơn cọc (kết nối Screen 12) sau khi xác nhận.

Theo dõi các yêu cầu đã quá hạn (UC8): Hệ thống tự động chuyển trạng thái thành "QUÁ HẠN" và sau đó "ĐÃ HỦY" (do cronjob). Kế toán KHÔNG có nút hủy thủ công.

Màn này được truy cập từ Dashboard (worklist: “Cọc chờ xác nhận”) hoặc từ menu “Quản lý cọc”.

2. Bố cục tổng thể
Global layout: Giữ nguyên Sidebar trái (active menu: “Quản lý cọc”) và Top bar.

Main content: Chia làm 2 phần:

Bộ lọc danh sách cọc (phía trên).
Bảng danh sách các yêu cầu đặt cọc – thể hiện các trạng thái: Chờ thanh toán, Đã thanh toán, Quá hạn, Đã hủy (do hệ thống tự động).
Không có nút "Hủy cọc" nào dành cho kế toán.
3. Sidebar và Top bar
Sidebar: Mục “Quản lý cọc” (hoặc gộp trong “Tài chính”) active.

Top bar: Breadcrumb: “Tài chính / Xác nhận cọc”.

4. Bộ lọc danh sách cọc
Card trắng, padding 16px, margin-bottom 20px, border-radius 8px.

Layout: Flex wrap, gap 16px, align-items flex-end.

Tìm kiếm: input text, width 220px, placeholder “Mã cọc, tên khách, mã phòng”.

Lọc trạng thái: dropdown (Tất cả / Chờ thanh toán / Đã thanh toán / Quá hạn / Đã hủy).

Lọc chi nhánh: dropdown (Tất cả chi nhánh).

Ngày đặt cọc từ – đến: 2 date picker nhỏ.

Nút “Lọc” (outline), nút “Reset” (text link).

Góc phải card: nút “Xuất Excel” (outline nhỏ) – tùy chọn.

5. Bảng danh sách đặt cọc
Card trắng, border-radius 8px, overflow-x auto, padding 0.

Bảng: width 100%, border-collapse collapse.

Header: background #F8F9FA, border-bottom 1px solid #E5E7EB, font weight 600.

Các cột: Mã cọc (10%), Khách hàng (15%), Phòng / Giường (15%), Số tiền cọc (12%), Ngày đặt (10%), Hạn thanh toán (12%), Trạng thái (10%), Thao tác (16%).

5.1. Dữ liệu mẫu trong bảng
Dòng 1 (Chờ thanh toán):

COC001 | Nguyễn Văn A | P.201 – Giường 2 | 3.000.000 VND | 10/04/2025 09:00 | 11/04/2025 09:00 | badge vàng “Chờ thanh toán” | nút “Xác nhận” (xanh) + cột thao tác không có nút hủy.

Dòng 2 (Quá hạn – do hệ thống tự đánh dấu):

COC002 | Trần Thị B | P.105 – Nguyên phòng | 10.000.000 VND | 09/04/2025 14:00 | 10/04/2025 14:00 | badge đỏ “Quá hạn” | không có nút nào (chỉ hiển thị, không thao tác). Sau khi cronjob chạy, nó sẽ chuyển thành “Đã hủy”.

Dòng 3 (Đã hủy – hệ thống tự động hủy sau 24h):

COC003 | Lê Văn C | P.308 – Giường 4 | 2.500.000 VND | 08/04/2025 10:00 | 09/04/2025 10:00 | badge xám “Đã hủy” | không có nút.

Dòng 4 (Đã thanh toán):

COC004 | Phạm Thị D | P.202 – Giường 1 | 3.000.000 VND | 11/04/2025 08:00 | 12/04/2025 08:00 | badge xanh lá “Đã thanh toán” | nút “Xem hóa đơn” (outline xanh).

5.2. Badge trạng thái và quy tắc hiển thị
Chờ thanh toán: màu vàng #FAAD14.

Quá hạn: màu đỏ #DC3545. (Chỉ xuất hiện khi đã quá 24h mà chưa được thanh toán; kế toán không thể tác động.)

Đã hủy: màu xám #6C757D. (Sau khi cronjob chạy, chuyển từ “Quá hạn” sang “Đã hủy”, phòng/giường trở về AVAILABLE.)

Đã thanh toán: màu xanh lá #198754.

5.3. Nút thao tác trong từng dòng
Hàng “Chờ thanh toán”: nút “Xác nhận” (primary nhỏ, background #0A58CA, padding 4px 12px, border-radius 4px).
Click → mở modal xác nhận thanh toán (xem mục 6).

Hàng “Đã thanh toán”: nút “Xem hóa đơn” (outline, màu xanh) – mở Screen 12 với hóa đơn cọc tương ứng.

Hàng “Quá hạn” và “Đã hủy”: không có nút (chỉ hiển thị thông tin, không can thiệp).

6. Modal xác nhận thanh toán (xuất hiện khi click “Xác nhận”)
Kích thước: width 450px, background white, border-radius 8px, box-shadow, center screen, nền mờ.

Nội dung:

Tiêu đề: “Xác nhận thanh toán cọc”

Thông tin cọc: mã cọc, khách hàng, phòng, số tiền (read-only).

Phương thức thanh toán: radio group (Tiền mặt / Chuyển khoản).

Ngày thanh toán: date picker (mặc định ngày hiện tại).

Số chứng từ / giao dịch (text input, optional, placeholder “Mã giao dịch”).

Ghi chú (textarea, 2 dòng, optional).

Nút “Xác nhận và lập hóa đơn” (primary) – lưu thanh toán, cập nhật:

Trạng thái cọc thành Đã thanh toán.

Trạng thái phòng/giường thành RESERVED.

Tự động chuyển sang Screen 12 (Invoice Generator) với loại hóa đơn “Đặt cọc”, thông tin pre-fill.

Đóng modal.

Nút “Hủy” (outline) – đóng modal không lưu.

7. Tương tác & điều hướng
Yêu cầu cọc được sinh từ Screen 4 (Booking Workspace) khi Sale click “Tạo yêu cầu đặt cọc” → xuất hiện trong bảng này với trạng thái “Chờ thanh toán”, thời hạn 24h.

Hệ thống tự động (cronjob) mỗi giờ kiểm tra các yêu cầu quá hạn: chuyển trạng thái “Quá hạn” → sau đó (hoặc cùng lúc) chuyển thành “Đã hủy” và trả phòng về AVAILABLE. Kế toán không làm gì cả.

Click “Xác nhận” → mở modal → sau khi xác nhận, chuyển sang Screen 12.

Click “Xem hóa đơn” → mở Screen 12 (chế độ xem).

Click menu khác → chuyển màn.

8. Các thành phần tái sử dụng
Bảng, badge, modal, button, date picker, radio group.

Kết nối với Screen 12 (Invoice Generator) cho cả tạo mới và xem.

9. Ghi chú cho AI sinh ảnh
Vẽ bảng với ít nhất 4 dòng minh họa các trạng thái (Chờ thanh toán, Quá hạn, Đã hủy, Đã thanh toán).

Hàng “Chờ thanh toán” có nút “Xác nhận” màu xanh. Không có nút “Hủy cọc” bất kỳ.

Hàng “Quá hạn” và “Đã hủy” không có nút thao tác.

Có bộ lọc phía trên.

Giữ nguyên sidebar, top bar, active menu “Quản lý cọc”.

Màu sắc, font, border radius theo style guide.










///////////////////////////////////////////////////////////
SCREEN 12: CHECKOUT REQUEST – "Ghi nhận yêu cầu trả phòng"
1. Mục đích
Dành cho Nhân viên Sale để:

Ghi nhận yêu cầu trả phòng từ khách hàng (UC13).

Nhập thông tin hợp đồng, ngày trả dự kiến, lý do.

Chuyển yêu cầu cho Quản lý để tiến hành kiểm tra trả phòng (dẫn đến Screen 7).

Màn này được truy cập từ Dashboard (worklist “Yêu cầu trả phòng”) hoặc từ menu “Trả phòng” trên sidebar.

2. Bố cục tổng thể
Global layout: Giữ nguyên Sidebar trái (active menu: “Trả phòng” – thêm mục này) và Top bar.

Main content: Chia làm 2 cột dọc (40% – 60%).

Cột trái: Form ghi nhận yêu cầu trả phòng.

Cột phải: Danh sách các yêu cầu trả phòng đã ghi nhận (chờ xử lý, đang kiểm tra, đã hoàn tất).

3. Sidebar và Top bar
Sidebar: Thêm mục “Trả phòng” (icon cửa ra vào) – active.

Top bar: Breadcrumb: “Trả phòng / Yêu cầu mới”.

4. Cột trái – Form ghi nhận yêu cầu trả phòng
Card trắng, border-radius 8px, padding 24px.

Tiêu đề: “Thông tin yêu cầu trả phòng” – font 18px, weight SemiBold.

4.1. Khối tìm kiếm hợp đồng (bắt buộc)
Label: “Mã hợp đồng hoặc số điện thoại khách hàng” – font 14px, margin-bottom 6px.

Input + nút: flex, gap 8px.

Input text, width 70%, placeholder “Nhập mã HD: HD-2025-00123 hoặc SĐT”.

Nút “Tìm” (primary outline).

Kết quả tìm thấy: hiển thị ngay bên dưới (card nhỏ, nền #F8F9FA, padding 12px).

Ví dụ: HD-2025-00123 – Nguyễn Văn A – P.201 – Đang sử dụng.

4.2. Form nhập yêu cầu (chỉ enabled sau khi tìm thấy hợp đồng)
Ngày trả dự kiến (date picker, required) – chọn ngày trong tương lai.

Lý do trả phòng (textarea, 3 dòng, required) – placeholder: “Ví dụ: kết thúc hợp đồng, chuyển nơi ở, lý do cá nhân…”.

Ghi chú thêm (textarea, 2 dòng, optional).

Nút “Lưu yêu cầu” (primary, màu xanh) – lưu lại, thông báo thành công, reset form (hoặc xóa).

Nút “Hủy” (outline) – reset form.

5. Cột phải – Danh sách yêu cầu trả phòng
Card trắng, border-radius 8px, padding 20px.

Tiêu đề: “Danh sách yêu cầu trả phòng” + nút “Làm mới” (icon nhỏ).

Bảng danh sách (dạng card nhỏ theo chiều dọc, mỗi dòng là một yêu cầu):

Mỗi dòng: background #F8F9FA, border-radius 8px, padding 12px, margin-bottom 12px.

Nội dung dòng:

Dòng 1: Mã HD: HD-2025-00123 – Khách: Nguyễn Văn A – Phòng P.201

Dòng 2: Ngày yêu cầu: 15/12/2025 – Ngày trả dự kiến: 20/12/2025

Dòng 3: Trạng thái badge (Chờ duyệt / Đang kiểm tra / Đã hoàn tất) + nút “Xử lý” (outline nhỏ).

Badge trạng thái:

Chờ duyệt: màu vàng #FAAD14.

Đang kiểm tra: màu xanh dương #0A58CA.

Đã hoàn tất: màu xanh lá #198754.

Hành vi khi click “Xử lý”:

Nếu trạng thái = Chờ duyệt → chuyển sang Screen 7 (Checkout Inspection) để bắt đầu kiểm tra.

Nếu trạng thái = Đang kiểm tra → quay lại Screen 7 (tiếp tục).

Nếu Đã hoàn tất → chỉ xem chi tiết (hoặc không có nút).

6. Tương tác & điều hướng
Bước 1: Sale nhập mã hợp đồng/SĐT, click “Tìm” → hiển thị thông tin hợp đồng.

Bước 2: Nhập ngày trả, lý do → click “Lưu yêu cầu” → thêm dòng mới vào danh sách bên phải (trạng thái “Chờ duyệt”).

Bước 3: Quản lý (hoặc sale có quyền) click “Xử lý” → chuyển sang Screen 7 (Kiểm tra trả phòng) với dữ liệu hợp đồng được truyền sang.

Sau khi hoàn tất kiểm tra và kế toán xong ở Screen 8, Screen 9, yêu cầu trả phòng sẽ tự động cập nhật trạng thái “Đã hoàn tất” (giả lập).

Click menu “Dashboard” → quay về Screen 2.

7. Các thành phần tái sử dụng
Form tìm kiếm, button, badge, card – đều có trong style guide.

Luồng dữ liệu từ màn 12 → màn 7 → màn 8 → màn 9 đã được kết nối.

8. Ghi chú cho AI sinh ảnh
Vẽ 2 cột: bên trái form nhập, bên phải danh sách yêu cầu (có ít nhất 2 dòng mẫu, một dòng “Chờ duyệt”, một dòng “Đang kiểm tra”).

Có ô tìm kiếm hợp đồng và kết quả hiển thị bên dưới.

Nút “Lưu yêu cầu” màu xanh, nút “Xử lý” màu outline.

Giữ nguyên sidebar, top bar (active menu “Trả phòng”).

Màu sắc, font, bo góc đúng guide.










/////////////////////////////////////////////
ĐÂY LÀ ĐẶC TẢ USE CASE HỆ THỐNG 
Đặc tả use case hệ thống
1. Đăng nhập
Tên use case
Đăng nhập
Tóm tắt
Người dùng đăng nhập vào hệ thống quản lý kí túc xá
Tác nhân
Nhân viên
Use case liên quan
Không 
Dòng sự kiện chính
1. Hệ thống hiển thị màn hình đăng nhập. 
2. Nhân viên nhập tài khoản và mật khẩu. 
3. Hệ thống sẽ kiểm tra thông tin đăng nhập
4. Được cho phép truy cập vào hệ thống


Dòng sự kiện phụ
A3. Tại bước nếu tài khoản hay mật khẩu không đúng
Hệ thống thông báo lỗi đăng nhập
Quay lại bước 2
Điều kiện tiên quyết
Nhân viên đã có sẵn tài khoản hợp lệ 
Hậu điều kiện
Nhân viên đăng nhập thành công vào hệ thống 


2. Đăng xuất 
Tên use case
Đăng xuất
Tóm tắt
Kết thúc phiên làm việc trên hệ thống 
Tác nhân
Nhân viên 
Use case liên quan
Không
Dòng sự kiện chính
1. Nhân viên chọn chức năng “Đăng xuất”
2. Hệ thống xác nhận đăng xuất
3. Kết thúc phiên làm việc và quay về màn hình đăng nhập 
Dòng sự kiện phụ
Không
Điều kiện tiên quyết
Nhân viên đã đăng nhập vào hệ thống 
Hậu điều kiện
Phiên đăng nhập kết thúc


3. Quản lý danh mục chỗ ở
Tên use case
Quản lý danh mục chỗ ở
Tóm tắt
Quản lý cập nhật danh sách phòng, giường và trạng thái chỗ ở trong ký túc xá. 
Tác nhân
Quản lý 
Use case liên quan
Không
Dòng sự kiện chính
1. Quản lý chọn chức năng “Quản lý danh mục chỗ ở”
2. Hệ thống hiển thị danh sách phòng và giường hiện có
3. Quản lý có thể thêm, sửa hoặc cập nhật trạng thái chỗ ở
4. Hệ thống sẽ lưu thông tin cập nhật
Dòng sự kiện phụ
A3. Nếu dữ liệu không hợp lệ:
Hệ thống thông báo lỗi
Quay lại bước 3
Điều kiện tiên quyết
Quản lý đã đăng nhập vào hệ thống 
Hậu điều kiện
Thông tin chỗ ở được cập nhật


4. Quản lý quy định, quy tắc
Tên use case
Quản lý quy định, quy tắc
Tóm tắt
Quản lý cập nhật các quy định lưu trú và nội quy ký túc xá 
Tác nhân
Quản lý 
Use case liên quan
Không
Dòng sự kiện chính
1. Quản lý chọn chức năng “Quản lý quy định, quy tắc”
2. Hệ thống hiển thị danh sách quy định hiện có
3. Quản lý thêm, sửa hoặc xóa quy định.
4. Hệ thống lưu các thay đổi
Dòng sự kiện phụ
A3. Nếu dữ liệu không hợp lệ:
Hệ thống thông báo lỗi
Quay lại bước 2
Điều kiện tiên quyết
Quản lý đã đăng nhập vào hệ thống 
Hậu điều kiện
Quy định được cập nhật


5. Tiếp nhận đăng ký 
Tên use case
Tiếp nhận đăng ký
Tóm tắt
Nhân viên sale tiếp nhận thông tin đăng ký thuê phòng của khách hàng 
Tác nhân
Nhân viên sale
Use case liên quan
Sắp xếp lịch xem
Dòng sự kiện chính
1. Khách thuê liên hệ nhân viên sale để đăng ký thuê phòng.
2. Nhân viên sale chọn chức năng “Tiếp nhận đăng ký”.
3. Hệ thống hiển thị form thông tin đăng ký thuê.
4. Nhân viên sale nhập thông tin khách thuê và các yêu cầu thuê phòng.
5. Hệ thống kiểm tra tình trạng phòng/giường hiện có.
6. Hệ thống đối chiếu thông tin thuê với điều kiện cho thuê của ký túc xá.
7. Hệ thống hiển thị danh sách phòng/giường phù hợp.
8. Nhân viên sale thực hiện UC “Sắp xếp lịch xem”.
9. Hệ thống lưu thông tin đăng ký thuê. 
Dòng sự kiện phụ
A5. Nếu không có phòng/ giường phù hợp: 
Hệ thống thông báo “Không tìm thấy phòng phù hợp”.
A6. Nếu thông tin thuê không phù hợp điều kiện lưu trú: 
Hệ thống thông báo không đủ điều kiện đăng ký thuê. 


Điều kiện tiên quyết
Nhân viên sale đã đăng nhập vào hệ thống
Hậu điều kiện
Thông tin đăng ký thuê được lưu trên hệ thống. 


6. Sắp xếp lịch xem
Tên use case
Sắp xếp lịch xem
Tóm tắt
Nhân viên sale sắp xếp lịch xem phòng cho khách thuê. 
Tác nhân
Nhân viên sale
Use case liên quan
Tiếp nhận đăng kí
Dòng sự kiện chính
1. Nhân viên sale chọn chức năng “Sắp xếp lịch xem”
2. Hệ thống hiển thị lịch xem phòng hiện có
3. Nhân viên sale chọn thời gian xem phòng 
4. Hệ thống lưu lịch xem phòng
5. Hệ thống gửi thông tin lịch hẹn cho khách thuê qua email hoặc số điện thoại đã đăng ký
Dòng sự kiện phụ
A3. Nếu thời gian đó đã có lịch hẹn khác: 
Hệ thống sẽ yêu cầu nhân viên sale chọn lại thời gian khác
Điều kiện tiên quyết
Đã tồn tại thông tin đăng kí thuê của khách hàng 
Hậu điều kiện
Lịch xem phòng được lưu trên hệ thống 


7. Thanh toán tiền cọc 
Tên use case
Thanh toán tiền cọc
Tóm tắt
Kế toán xác nhận thanh toán tiền cọc của khách thuê và cập nhật trạng thái đặt cọc trên hệ thống
Tác nhân
Kế toán
Use case liên quan
Hủy giữ chỗ, Lập hóa đơn 
Dòng sự kiện chính
1. Kế toán chọn chức năng “Thanh toán tiền cọc”
2. Hệ thống hiển thị thông tin khách thuê, phòng/giường thuê và số tiền cọc cần thanh toán
3. Hệ thống tính số tiền cọc theo quy định
4. Kế toán xác nhận khách thuê đã thanh toán tiền cọc
5. Hệ thống cập nhật trạng thái đặt cọc của phòng/giường
6. Hệ thống thực hiện UC “Lập hóa đơn”
7. Hệ thống ghi nhận thông tin khách cọc, phòng/giường đã cọc, thời điểm đặt cọc và chi nhánh 
Dòng sự kiện phụ
A4. Nếu khách thuê chưa hoàn tất thanh toán trong thời hạn quy định:
Hệ thống sẽ thực hiện UC “Hủy giữ chỗ”
A5. Nếu phòng/giường đã được đặt cọc trước:
• Hệ thống thông báo phòng/giường không còn khả năng nhận cọc
Điều kiện tiên quyết
Kế toán đã đăng nhập hệ thống
Hậu điều kiện
Thông tin đặt cọc được lưu trên hệ thống và phòng/giường không còn ở trạng thái trống


8. Hủy giữ chỗ
Tên use case
Hủy giữ chỗ
Tóm tắt
Hệ thống sẽ hủy yêu cầu đặt cọc của khách thuê khi quá thời hạn thanh toán. 
Tác nhân
Hệ thống
Use case liên quan
Thanh toán tiền cọc 
Dòng sự kiện chính
1. Hệ thống ghi nhận yêu cầu đặt cọc đã quá 24 giờ mà chưa được thanh toán
2. Hệ thống tự động cập nhật trạng thái phòng/giường thành còn trống. 
3.Hệ thống lưu lại lịch sử hủy giữ chỗ.
Dòng sự kiện phụ
Không
Điều kiện tiên quyết
Nhân viên sale đã đăng nhập hệ thống. 
Hậu điều kiện
Trạng thái giữ chỗ đã bị hủy


9. Rà soát thông tin khách thuê 
Tên use case
Rà soát thông tin khách thuê 
Tóm tắt
Nhân viên sale kiểm tra điều kiện lưu trú của khách thuê hoặc các thành viên trong nhóm thuê trước khi kí hợp đồng
Tác nhân
Nhân viên sale
Use case liên quan
Không
Dòng sự kiện chính
1. Nhân viên sale chọn chức năng “Rà soát thông tin khách thuê”
2. Hệ thống hiển thị thông tin khách thuê và danh sách thành viên thuê
3. Nhân viên sale kiểm tra giấy tờ tùy thân và điều kiện lưu trú của khách thuê/thành viên
4. Hệ thống ghi nhận kết quả xác minh điều kiện lưu trú
Dòng sự kiện phụ
A3. Nếu khách thuê cá nhân không đáp ứng điều kiện lưu trú:
Hệ thống ghi nhận từ chối ký hợp đồng thuê
A3.1. Nếu một hoặc nhiều thành viên trong nhóm không đáp ứng điều kiện: 
Hệ thống ghi nhận các thành viên không đủ điều kiện tham gia thuê
Điều kiện tiên quyết
Nhân viên sale đã đăng nhập vào hệ thống.
Khách hàng đã xác nhận thuê phòng.
Hậu điều kiện
Kết quả xác minh được lưu vào hệ thống


10. Lập hợp đồng thuê 
Tên use case
Lập hợp đồng thuê
Tóm tắt
Nhân viên sale lập hợp đồng thuê phòng cho khách thuê
Tác nhân
Nhân viên sale
Use case liên quan
Không
Dòng sự kiện chính
1. Nhân viên sale chọn chức năng “Lập hợp đồng thuê”
2. Hệ thống hiển thị thông tin khách thuê và phòng/giường thuê
3. Nhân viên nhập thông tin hợp đồng thuê
4. Hệ thống hiển thị các điều khoản thuê phòng
5. Nhân viên xác nhận thông tin hợp đồng
6. Hệ thống tạo hợp đồng thuê
Dòng sự kiện phụ
A3. Nếu số lượng thành viên thuê không phù hợp số giường/phòng đã đặt: 
Hệ thống thông báo lỗi thông tin thuê
A3.1. Nếu thành viên không đáp ứng điều kiện lưu trú: 
Hệ thống không ghi nhận thành viên đó trong hợp đồng thuê
Điều kiện tiên quyết
Nhân viên sale đã đăng nhập hệ thống.
Hậu điều kiện
Hợp đồng thuê được lưu trên hệ thống. 


11. Bàn giao phòng
Tên use case
Bàn giao phòng
Tóm tắt
Quản lý bàn giao phòng/giường và tài sản cho khách thuê sau khi hoàn tất thủ tục thuê
Tác nhân
Quản lý
Use case liên quan
Khởi tạo biên bản tài sản 
Dòng sự kiện chính
1. Quản lý chọn chức năng “Bàn giao phòng”
2. Hệ thống hiển thị thông tin phòng/giường thuê và tài sản bàn giao
3. Quản lý kiểm tra hiện trạng khu vực ở
4. Hệ thống thực hiện UC “Khởi tạo biên bản tài sản”
5. Quản lý ghi nhận các vật dụng được cấp cho khách thuê
6. Quản lý hướng dẫn quy định sử dụng tiện ích và lưu ý an toàn
7. Quản lý xác nhận bàn giao phòng
8. Hệ thống cập nhật trạng thái phòng/giường đang sử dụng
Dòng sự kiện phụ
A3. Nếu thông tin tài sản bàn giao chưa đầy đủ: 
Hệ thống yêu cầu cập nhật lại biên bản tài sản. 
Điều kiện tiên quyết
Quản lý đã đăng nhập vào hệ thống 
Hậu điều kiện
Phòng được bàn giao cho khách thuê. 


12. Khởi tạo biên bản tài sản 
Tên use case
Khởi tạo biên bản tài sản
Tóm tắt
Hệ thống sẽ tạo biên bản bàn giao tài sản cho phòng thuê. 
Tác nhân
Quản lý
Use case liên quan
Bàn giao phòng
Dòng sự kiện chính
1. Hệ thống tự động hiển thị danh sách tài sản tương ứng với phòng/giường đang bàn giao
2. Quản lý xác nhận thông tin tài sản
3. Hệ thống tạo biên bản tài sản
Dòng sự kiện phụ
Không
Điều kiện tiên quyết
Quản lý đã đăng nhập vào hệ thống 
Hậu điều kiện
Biên bản bàn giao sẽ được lưu trên hệ thống. 


13. Ghi nhận yêu cầu trả phòng 
Tên use case
Ghi nhận yêu cầu trả phòng
Tóm tắt
Nhân viên sale ghi nhận yêu cầu trả phòng của khách thuê trên hệ thống
Tác nhân
Nhân viên sale
Use case liên quan
Không
Dòng sự kiện chính
1. Nhân viên sale chọn chức năng “Ghi nhận yêu cầu trả phòng”
2. Hệ thống hiển thị mẫu thông tin trả phòng
3. Nhân viên sale nhập thông tin hợp đồng/phiếu đặt cọc và thời gian trả phòng theo yêu cầu của khách thuê
4. Hệ thống lưu yêu cầu trả phòng
Dòng sự kiện phụ
A3. Nếu thông tin hợp đồng không tồn tại:  
Hệ thống thông báo lỗi 
Điều kiện tiên quyết
Nhân viên sale đã đăng nhập vào hệ thống 
Hậu điều kiện
Yêu cầu trả phòng được lưu trên hệ thống


14. Kiểm tra tình trạng trả phòng 
Tên use case
Kiểm tra tình trạng trả phòng
Tóm tắt
Quản lý kiểm tra hiện trạng phòng/giường khi khách trả phòng
Tác nhân
Quản lý
Use case liên quan
Ghi nhận sự cố hư hại 
Dòng sự kiện chính
1. Quản lý chọn chức năng “Kiểm tra tình trạng trả phòng”
2. Hệ thống hiển thị thông tin hợp đồng thuê và thông tin phòng/giường
3. Quản lý kiểm tra hiện trạng tài sản, vệ sinh và các nghĩa vụ liên quan
4. Hệ thống ghi nhận kết quả kiểm tra
5. Hệ thống chuyển thông tin kiểm tra cho kế toán
Dòng sự kiện phụ
A3. Nếu phát hiện hư hỏng hoặc mất mát tài sản: 
Quản lí thực hiện UC “Ghi nhận sự cố hư hại”
Điều kiện tiên quyết
Quản lý đã đăng nhập hệ thống
Hậu điều kiện
Kết quả kiểm tra trả phòng được lưu trên hệ thống


15. Ghi nhận sự cố hư hại
Tên use case
Ghi nhận sự cố hư hại
Tóm tắt
Quản lý ghi nhận các hư hỏng hoặc mất mát phát sinh khi trả phòng. 
Tác nhân
Quản lý
Use case liên quan
Kiểm tra tình trạng trả phòng
Dòng sự kiện chính
1. Quản lý chọn chức năng “Ghi nhận sự cố hư hại”.
2. Hệ thống hiển thị form thông tin hư hại.
3. Quản lý nhập thông tin hư hỏng hoặc mất mát tài sản.
4. Hệ thống lưu thông tin sự cố hư hại. 
Dòng sự kiện phụ
Không
Điều kiện tiên quyết
Quản lý đã đăng nhập hệ thống
Hậu điều kiện
Thông tin hư hại được lưu trên hệ thống. 


16. Tính toán khấu trừ 
Tên use case
Tính toán khấu trừ
Tóm tắt
Kế toán tính toán khoản hoàn cọc và các khoản khấu trừ phát sinh. 
Tác nhân
Kế toán 
Use case liên quan
Hoàn cọc
Dòng sự kiện chính
1. Kế toán chọn chức năng “Tính toán khấu trừ”.
2. Hệ thống hiển thị thông tin trả phòng và kết quả kiểm tra phòng.
3. Kế toán xác định tỷ lệ hoàn cọc theo tình trạng thuê và thời gian lưu trú.
4. Kế toán nhập hoặc xác nhận các khoản khấu trừ phát sinh.
5. Hệ thống tính số tiền hoàn cọc hoặc số tiền khách cần thanh toán thêm.
6. Hệ thống hiển thị kết quả đối soát. 
Dòng sự kiện phụ
Không
Điều kiện tiên quyết
Kế toán đã đăng nhập hệ thống
Hậu điều kiện
Kết quả đối soát được lưu trên hệ thống


17. Thanh toán khoản chênh lệch 
Tên use case
Thanh toán khoản chênh lệch
Tóm tắt
Kế toán ghi nhận khoản thanh toán chênh lệch phát sinh khi trả phòng
Tác nhân
Kế toán 
Use case liên quan
Lập hóa đơn 
Dòng sự kiện chính
1. Kế toán chọn chức năng “Thanh toán khoản chênh lệch”
2. Hệ thống hiển thị khoản tiền khách cần thanh toán thêm
3. Kế toán xác nhận thanh toán từ khách thuê
4. Hệ thống cập nhật trạng thái thanh toán
5. Hệ thống thực hiện UC “Lập hóa đơn”
Dòng sự kiện phụ
A3. Nếu khách thuê chưa hoàn tất thanh toán: 
Hệ thống ghi nhận công nợ chưa thanh toán
Điều kiện tiên quyết
Kế toán đã đăng nhập hệ thống
Hậu điều kiện
Khoản thanh toán chênh lệch được lưu trên hệ thống


18. Hoàn cọc
Tên use case
Hoàn cọc
Tóm tắt
Kế toán thực hiện hoàn trả tiền cọc cho khách thuê sau khi hoàn tất đối soát trả phòng
Tác nhân
Kế toán 
Use case liên quan
Tính toán khấu trừ, Lập hóa đơn 
Dòng sự kiện chính
1. Kế toán chọn chức năng “Hoàn cọc”
2. Hệ thống hiển thị kết quả từ UC “Tính toán khấu trừ”. 
3. Hệ thống hiển thị kết quả đối soát và số tiền hoàn cọc
4. Kế toán xác nhận phương thức hoàn cọc
5. Hệ thống cập nhật trạng thái hoàn cọc
6. Hệ thống thực hiện UC “Lập hóa đơn” 
7. Hệ thống cập nhật trạng thái phòng/giường thành còn trống
Dòng sự kiện phụ
A3. Nếu không phát sinh khoản hoàn cọc: 
Hệ thống thông báo không có khoản hoàn cọc
Điều kiện tiên quyết
Đã hoàn tất UC “Tính toán khấu trừ”
Hậu điều kiện
Hoàn tất thủ tục trả phòng trên hệ thống


19. Lập hóa đơn
Tên use case
Lập hóa đơn
Tóm tắt
Hệ thống tạo hóa đơn thanh toán cho khách thuê
Tác nhân
Kế toán 
Use case liên quan
Thanh toán tiền cọc, Thanh toán khoản chênh lệch, Hoàn cọc
Dòng sự kiện chính
1. Hệ thống nhận dữ liệu thanh toán từ UC 'Thanh toán tiền cọc'.
2. Hệ thống hiển thị thông tin thanh toán
3. Kế toán xác nhận tạo hóa đơn
4. Hệ thống tạo hóa đơn thanh toán
5. Hệ thống lưu hóa đơn trên hệ thống
Dòng sự kiện phụ
A3. Nếu thông tin thanh toán không hợp lệ: 
Hệ thống thông báo lỗi tạo hóa đơn
Điều kiện tiên quyết
Kế toán đã đăng nhập hệ thống
Hậu điều kiện
Hóa đơn thanh toán được lưu trên hệ thống







///////////////////////////////////////////////
ĐÂY LÀ ERD MẪU, ERD NÀY CÓ THỂ SỬA LẠI, CHỈ LÀ MẦU THÔI !!!! ƯU TIÊN ĐÚNG ĐẶC TẢ VÀ ĐÚNG YÊU CẦU CỦA BÀI TOÁN( ĐỀ CỦA BÀI TOÁN WEB)
LƯỢC ĐỒ QUAN HỆ HỆ THỐNG QUẢN LÝ HOMESTAY DORM


1. CHI_NHANH

CHI_NHANH(
    MaChiNhanh PK,
    TenChiNhanh,
    DiaChi,
    SDT,
    Email
)

Ý nghĩa
Quản lý các chi nhánh của hệ thống ký túc xá.


2. PHONG

PHONG(
    MaPhong PK,
    MaChiNhanh FK,
    GiaThue,
    KhuVuc,
    SucChua,
    TinhTrang,
)

FK
MaChiNhanh → CHI_NHANH(MaChiNhanh) 


TinhTrang gồm

AVAILABLE      : còn trống
PENDING        : đang có yêu cầu đặt cọc
RESERVED       : đã đặt cọc
OCCUPIED       : đang có người ở
MAINTENANCE    : đang sửa chữa
INACTIVE       : ngưng sử dụng



Nghiệp vụ
Khi khách tạo yêu cầu đặt cọc

AVAILABLE
    ↓
PENDING



Khi khách thanh toán cọc thành công

PENDING
    ↓
RESERVED



Khi khách nhận phòng và ký hợp đồng

RESERVED
    ↓
OCCUPIED



Khi khách trả phòng

OCCUPIED
    ↓
AVAILABLE



Khi quá hạn đặt cọc

PENDING
    ↓
AVAILABLE



3. GIUONG

GIUONG(
    MaGiuong PK,
    MaPhong FK,
    GiaGiuong,
    TinhTrang
)

FK
MaPhong → PHONG(MaPhong) 


TinhTrang

AVAILABLE
PENDING
RESERVED
OCCUPIED
BROKEN



Nghiệp vụ
Nếu thuê theo giường:
trạng thái giường thay đổi độc lập. 
Nếu thuê nguyên phòng:
toàn bộ giường trong phòng đổi trạng thái. 


4. KHACH_HANG

KHACH_HANG(
    MaKH PK,
    HoTen,
    GioiTinh,
    QuocTich,
    GiayToTuyThan,
    SDT,
    Email,
    NgaySinh,
    DiaChi
)



5. NHOM

NHOM(
    MaNhom PK,
    TenNhom,
    MaKhachHangDaiDien FK,
    MaHopDong FK,
    NgayTao,
    TrangThai
)

FK
MaDaiDien → KHACH_HANG(MaKH) 


TrangThai

ACTIVE
CANCELLED
COMPLETED



6. THANHVIEN_NHOM

THANHVIEN_NHOM(
    MaNhom FK,
    MaKH FK,
    TrangThai,
    PRIMARY KEY(MaNhom, MaKH)
)

FK
MaNhom → NHOM(MaNhom) 
MaKH → KHACH_HANG(MaKH) 


TrangThai

PENDING
APPROVED
REJECTED



7. NHAN_VIEN

NHAN_VIEN(
    MaNV PK,
    MaChiNhanh FK,
    TenNV,
    ChucVu,
    SDT,
    Email,
    NgayVaoLam
)



ChucVu

SALE
MANAGER
ACCOUNTANT
ADMIN



8. LICH_XEM_PHONG

LICH_XEM_PHONG(
    MaLich PK,
    MaKH FK,
    MaPhong FK,
    MaNV FK,
    NgayXem,
    GioXem,
    KetQua,
    GhiChu,
    TrangThai
)

FK
MaKH → KHACH_HANG 
MaPhong → PHONG 
MaNV → NHAN_VIEN 


TrangThai

PENDING
COMPLETED
CANCELLED



KetQua

INTERESTED
NOT_INTERESTED
BOOKED



9. DAT_COC

DAT_COC(
    MaCoc PK,
    MaHopDong FK,
    MaKH FK,
    MaPhong FK NULL,
    MaGiuong FK NULL,
    NguoiPheDuyet FK,
    NgayDatCoc,
    SoTienCoc,
    PhuongThucThanhToan,
    TinhTrang,
    ThoiGianHetHan,
    ThoiGianPheDuyet
)

FK
MaKH → KHACH_HANG 
MaPhong → PHONG 
MaGiuong → GIUONG 
NguoiPheDuyet → NHAN_VIEN 


Business Rule

Một phòng/giường chỉ được tồn tại
một đặt cọc ACTIVE tại cùng thời điểm.



TinhTrang

PENDING_APPROVAL
PENDING_PAYMENT
APPROVED
EXPIRED
CANCELLED
REJECTED



Nghiệp vụ
Sale gửi yêu cầu đặt cọc

TinhTrang = PENDING_APPROVAL



Quản lý duyệt

PENDING_APPROVAL
    ↓
PENDING_PAYMENT

Đồng thời:

Phong/Giuong
    ↓
PENDING



Khách thanh toán thành công

PENDING_PAYMENT
    ↓
APPROVED

Đồng thời:

Phong/Giuong
    ↓
RESERVED



Quá 24h chưa thanh toán

PENDING_PAYMENT
    ↓
EXPIRED

Đồng thời:

Phong/Giuong
    ↓
AVAILABLE



10. HOP_DONG_THUE_NHA

HOP_DONG_THUE_NHA(
    MaHopDong PK,
    MaPhong  FK NULL,
    MaNhom FK NULL,
    NgayBatDau,
    NgayKetThuc,
    GiaThue,
    NoiQuy,
    TinhTrang,
    NgayKy
)
Giải thích
Nếu thuê cá nhân: 
Nguyên căn: MaNhom = NULL, MaGiuong = NULL 
Ghép giường: MaNhom = NULL, MaGiuong sẽ quản lý trong cột chi tiết thuê 
Nếu thuê nhóm: 
Nguyên căn: MaNhom chứa nhóm, MaGiuong = NULL 
Ghép giường: MaNhom chứa nhóm, MaGiuong quản lý trong chi tiết thuê



TinhTrang

PENDING
ACTIVE
EXPIRED
TERMINATED
CANCELLED

11. CHI_TIET_THUE 


CHI_TIET_THUE(
    MaHopDong FK,
    MaGiuong FK NULL,
    MaKH FK NULL,      -- dùng nếu cần tracking thành viên cá nhân
    GiaThueThucTe,
    PRIMARY KEY(MaHopDong, MaGiuong, MaKH)
)

Giải thích
Quản lý ai thuê giường nào. 
Nếu thuê nguyên phòng, MaGiuong = NULL và chỉ tính tổng phòng. 
Nếu nhóm thuê ghép giường, MaKH dùng để biết ai thuê giường nào.
13. Yeu_Cau_Thue 
DICH_VU(
    MaYeuCauThue PK,
    MaKH FK,
    LoaiPhong,
    GiaMongMuon 
    TieuChiKhac.
)
Loai phong: nguyên căn/ ở ghép
13. DICH_VU

DICH_VU(
    MaDV PK,
    TenDV,
    Gia,
    NgayApDung 
    MoTa
)



14. DICHVU_PHONG

DICHVU_PHONG(
    MaPhong FK,
    MaDV FK,
    PRIMARY KEY(MaPhong, MaDV)
)



15. THANH_TOAN

THANH_TOAN(
    MaThanhToan PK,
    MaHopDong FK NULL,
    MaCoc FK NULL,
    SoTien,
    PhuongThuc,
    NgayThanhToan,
    LoaiThanhToan,
    TinhTrang
)



LoaiThanhToan

DEPOSIT
MONTHLY_RENT
SERVICE
PENALTY
REFUND



TinhTrang

PENDING
SUCCESS
FAILED
CANCELLED



16. TAI_SAN

TAI_SAN(
    MaTaiSan PK,
    TenTaiSan,
    TinhTrang
)



TinhTrang

AVAILABLE
IN_USE
BROKEN
LOST



17. BANG_GIAO

BANG_GIAO(
    MaBanGiao PK,
    MaHopDong FK,
    NgayGiao,
    TinhTrang
)



TinhTrang

PENDING
COMPLETED
CANCELLED



18. BANGGIAO_TAISAN

BANGGIAO_TAISAN(
    MaBanGiao FK,
    MaTaiSan FK,
    SoLuong,
    GhiChu,
    TrangThai,
    PRIMARY KEY(MaBanGiao, MaTaiSan)
)



19. TRA_PHONG

TRA_PHONG(
    MaTra PK,
    MaHopDong FK,
    NgayTra,
    TinhTrangPhong,
    {HuHong},
    TyLeHoanCoc,
    SoTienHoan
)



TinhTrangPhong

GOOD
DIRTY
DAMAGED
SEVERELY_DAMAGED



Nghiệp vụ
Khi trả phòng thành công

HopDong
    ↓
TERMINATED

và:

Phong/Giuong
    ↓
AVAILABLE



20. CHITIETKHAUTRU

CHITIETKHAUTRU(
    STT PK,
    MaTra PK,
    LoaiPhi,
    SoTien,
    GhiChu
)



LoaiPhi

DIEN
NUOC
DICH_VU
HU_HONG
PHAT
NO_TIEN_PHONG



TỔNG KẾT THIẾT KẾ
Điểm mạnh hiện tại
Hệ thống đã hỗ trợ:
thuê cá nhân 
thuê nhóm 
thuê giường 
thuê nguyên phòng 
đặt cọc 
timeout đặt cọc 
approval workflow 
payment classification 
trả phòng 
khấu trừ hoàn cọc 
quản lý tài sản 


Business workflow chính

Xem phòng
    ↓
Đặt cọc
    ↓
Duyệt cọc
    ↓
Thanh toán cọc
    ↓
Ký hợp đồng
    ↓
Nhận phòng
    ↓
Sử dụng dịch vụ
    ↓
Trả phòng
    ↓
Hoàn cọc



//////////////////////////////////////////////////////
đây là đề (bài toán) của web chúng ta, tất cả đều phải thõa đề này (đề có thể thiếu logic nên chúng ta ưu tiên đúng đề và có thể làm vượt yêu cầu đề miễn sao phù hợp business, làm web)
Mô tả đồ án
3.1. Ngữ cảnh
Hệ thống ký túc xá tư nhân HomeStay Dorm chuyên cung cấp các dịch vụ lưu trú dài hạn cho
khách hàng cá nhân và tổ chức với các quy trình được mô tả như sau:
3.1.1. Quy trình đăng ký thuê phòng
Ký túc xá tư nhân HomeStay Dorm hỗ trợ khách hàng thuê chỗ ở theo hai hình thức:
thuê phòng nguyên căn hoặc thuê giường ở ghép. Khi phát sinh nhu cầu thuê, người
thuê (hoặc người đại diện của nhóm thuê) sẽ liên hệ với nhân viên kinh doanh (sale) để
được tư vấn và sắp xếp lịch xem phòng.
Trong quá trình đăng ký, khách hàng cung cấp các thông tin và yêu cầu cơ bản, bao
gồm: thông tin cá nhân, số lượng người dự kiến ở, giới tính, khu vực mong muốn, loại
phòng, mức giá, thời gian dự kiến vào ở, thời hạn thuê và một số tiêu chí ưu tiên khác (giờ
giấc sinh hoạt, yêu cầu yên tĩnh, gửi xe, trang bị điều hòa,…).
Sau khi tiếp nhận yêu cầu, nhân viên sale tiến hành kiểm tra tình trạng giường/phòng
hiện có (còn trống và chưa được đặt cọc), đồng thời đối chiếu thông tin khách thuê với các
điều kiện cho thuê của ký túc xá (phù hợp khu vực, giới tính, sức chứa phòng theo số
người dự kiến, mức giá và các tiêu chí đi kèm). Thông tin đăng ký của khách hàng được
ghi nhận để sắp xếp lịch xem phòng và thông báo lại cho khách hàng qua email hoặc số
điện thoại đã cung cấp.
Đến thời điểm hẹn, nhân viên sale dẫn khách hàng đi xem phòng và giới thiệu chi tiết
các thông tin liên quan, bao gồm: giá thuê, số người ở tối đa, nội quy ký túc xá, chi phí
điện nước và các dịch vụ đi kèm, quy định đặt cọc – giữ phòng, cũng như các quy định về
lưu trú. Đối với trường hợp thuê theo nhóm, nhân viên sale sẽ trao đổi rõ hai hình thức phổ
biến: thuê nguyên phòng (số người không vượt quá sức chứa tối đa của phòng) hoặc đăng
ký ở ghép (nhóm có số lượng ít hơn sức chứa và chấp nhận ở cùng người khác theo các
tiêu chí ghép phòng).
Kết thúc buổi xem phòng, khách hàng có thể lựa chọn đặt cọc ngay cho một hoặc
nhiều giường/phòng đã xem, hoặc chưa đưa ra quyết định và hẹn xem thêm phòng hay
điều chỉnh tiêu chí trong các lần tiếp theo.
3.1.2. Quy trình đặt cọc & xác nhận thuê
Sau khi xem phòng và phát sinh nhu cầu thuê, nếu khách hàng xác nhận thuê, nhân
viên sale sẽ trao đổi và rà soát lại toàn bộ thông tin của khách thuê, đặc biệt là các điều
kiện lưu trú theo quy định của ký túc xá như: giới tính, quốc tịch, yêu cầu về giấy tờ, khả
năng tài chính (nếu có áp dụng) và các tiêu chí liên quan khác. Đồng thời, nhân viên sale
liên hệ với quản lý để kiểm tra tình trạng thực tế của phòng/giường tại thời điểm xác nhận,
bao gồm việc còn trống hay đã được giữ chỗ hoặc đặt cọc bởi nhân viên sale khác.
Trường hợp quản lý xác nhận phòng/giường vẫn còn khả năng nhận cọc, nhân viên
sale sẽ thông báo cho khách hàng để tiến hành đặt cọc. Ngược lại, nếu phòng/giường đã
được khách khác giữ chỗ hoặc đặt cọc trước, nhân viên sale sẽ thông báo và đề nghị khách
hàng xem xét các lựa chọn khác.
KHOA CÔNG NGHỆ THÔNG TIN
TRƯỜNG ĐẠI HỌC KHOA HỌC TỰ NHIÊN – ĐHQG-HCM
227 Nguyễn Văn Cừ, Phường Chợ Quán, TP.HCM
Điện thoại: (08) 38.354.266 – Fax: (08) 38.350.096
Khi khách thuê (hoặc đại diện nhóm thuê) xác nhận đồng ý tuân thủ các điều kiện thuê
và nội quy ký túc xá, nhân viên sale thực hiện các bước tiếp theo để tiến hành đặt cọc.
Trường hợp thông tin thuê có thay đổi so với thời điểm đăng ký ban đầu, khách hàng cần
bổ sung hoặc cập nhật thông tin trước khi thực hiện đặt cọc.
Sau khi khách hàng xác nhận đặt cọc, nhân viên sale chuyển thông tin xác nhận thuê
sang bộ phận kế toán để tính toán số tiền cọc và gửi yêu cầu thanh toán cho khách hàng.
Khách hàng có thể thanh toán bằng tiền mặt hoặc chuyển khoản. Thời hạn thanh toán cọc
là 24 giờ kể từ thời điểm nhận được yêu cầu thanh toán; quá thời hạn này, nếu khách hàng
chưa hoàn tất thanh toán, yêu cầu đặt cọc sẽ tự động bị hủy.
Số tiền cọc được xác định theo công thức:
Tiền cọc = (Tiền thuê 2 tháng) × (Số giường thuê).
Trong trường hợp khách thuê nguyên phòng, số giường thuê được hiểu là toàn bộ số
giường theo sức chứa tối đa của phòng (ví dụ: phòng 4 người tương ứng 4 giường). Nhân
viên sale có trách nhiệm thông báo rõ ràng mức tiền cọc tương ứng với lựa chọn thuê của
khách hàng và hướng dẫn đầy đủ các thông tin cần thiết để khách thực hiện thanh toán.
Sau khi khách thanh toán, chứng từ hoặc hình ảnh giao dịch cùng thông tin khách cọc sẽ
được gửi cho quản lý để đối chiếu và xác nhận.
Khi quản lý xác nhận đã nhận được khoản tiền cọc hợp lệ, nhân viên sale thông báo lại
cho khách hàng rằng việc đặt cọc đã hoàn tất và thống nhất thời gian thực hiện thủ tục
nhận phòng theo thỏa thuận.
Sau khi đặt cọc thành công, thông tin cọc được ghi nhận trên hệ thống, bao gồm: thông
tin khách cọc, phòng/giường đã cọc, thời điểm đặt cọc và chi nhánh. Kể từ thời điểm này,
phòng/giường đã cọc sẽ không được tiếp nhận đặt cọc từ khách hàng khác và không được
nhân viên sale giới thiệu như một lựa chọn còn trống.
3.1.3. Quy trình nhận phòng, ký thỏa thuận thuê và bàn giao phòng
Khi khách hàng đến nhận phòng theo lịch hẹn, nhân viên sale tại chi nhánh sẽ kiểm tra
thông tin đặt cọc, đối chiếu giấy tờ tùy thân của người thuê và thu thập đầy đủ thông tin cư
trú cần thiết. Đối với trường hợp thuê theo nhóm, người đại diện cung cấp thông tin của
các thành viên ở cùng, đảm bảo số lượng người ở phù hợp với số giường/phòng đã đặt cọc
và tuân thủ quy định về giới tính/khu vực (nếu có).
Tiếp theo, quản lý sẽ kiểm tra lại điều kiện lưu trú của khách thuê hoặc các thành viên
trong nhóm theo quy định của ký túc xá. Đối với trường hợp thuê cá nhân, nếu khách thuê
không đáp ứng điều kiện, quản lý sẽ từ chối ký hợp đồng thuê. Đối với trường hợp thuê
theo nhóm, nếu có thành viên không đáp ứng yêu cầu, các thành viên đó sẽ không được
tham gia ký hợp đồng và không được sắp xếp vào ở theo danh sách đã đăng ký. Khi xảy ra
trường hợp này, nhóm có thể lựa chọn tiếp tục ký hợp đồng với các thành viên còn lại đáp
ứng điều kiện (với điều kiện số người ở thực tế vẫn phù hợp số giường/phòng đã đặt),
hoặc không ký hợp đồng và dừng thủ tục thuê theo quy định của ký túc xá.
Sau khi hoàn tất bước kiểm tra điều kiện, nhân viên phụ trách sẽ lập và hướng dẫn khách
hàng ký thỏa thuận/hợp đồng thuê. Nội dung hợp đồng thể hiện rõ phòng/giường thuê, số
giường thuê (hoặc thuê cả phòng), giá thuê theo giường/phòng, kỳ thanh toán, các khoản
phí dịch vụ (điện, nước, wifi, gửi xe…), quy định hoàn hoặc khấu trừ tiền cọc, nội quy, và
các điều khoản xử lý vi phạm. Sau khi khách hàng ký xác nhận, nhân viên kế toán sẽ tiến
hành tính các khoản cần thanh toán theo hợp đồng đã ký của khách hàng. Khách sẽ thực
hiện các khoản thanh toán cần thiết khi vào ở (thường bao gồm tiền thuê kỳ đầu và các phí
liên quan theo quy định). Nhân viên kế toán xác nhận đã thu đủ các khoản cần thu trước
khi tiến hành bàn giao phòng/giường cho khách.
KHOA CÔNG NGHỆ THÔNG TIN
TRƯỜNG ĐẠI HỌC KHOA HỌC TỰ NHIÊN – ĐHQG-HCM
227 Nguyễn Văn Cừ, Phường Chợ Quán, TP.HCM
Điện thoại: (08) 38.354.266 – Fax: (08) 38.350.096
Sau khi hoàn tất phần ký kết và thanh toán, nhân viên quản lý tiến hành bàn giao
phòng/giường và tài sản cho khách hàng. Việc bàn giao bao gồm kiểm tra hiện trạng khu
vực ở, ghi nhận các vật dụng được cấp (giường, nệm, tủ, chìa khóa/thẻ từ), hướng dẫn quy
định sử dụng tiện ích chung và các lưu ý an toàn. Nhân viên và khách hàng cùng xác nhận
vào biên bản bàn giao. Khi kết thúc thủ tục, khách hàng chính thức được nhận phòng và
bắt đầu thời gian cư trú theo thỏa thuận đã ký.
3.1.4. Quy trình trả phòng và hoàn cọc
Khi khách hàng có nhu cầu trả phòng, khách (hoặc đại diện nhóm) liên hệ nhân viên sale
tại chi nhánh để đăng ký thời gian trả phòng và cung cấp thông tin hợp đồng/phiếu đặt
cọc. Đến thời điểm trả phòng, nhân viên quản lý sẽ kiểm tra tình trạng thực tế của
phòng/giường (hiện trạng tài sản, vệ sinh, hư hỏng nếu có), đồng thời đối chiếu thông tin
hợp đồng và các nghĩa vụ liên quan của khách thuê. Sau khi hoàn tất kiểm tra ban đầu,
nhân viên quản lý sẽ tổng hợp và chuyển các thông tin cần thiết cho nhân viên kế toán để
thực hiện tính toán khoản hoàn cọc và các khoản khấu trừ phát sinh.
Trước tiên, kế toán xác định tỷ lệ hoàn cọc cơ bản theo tình trạng thuê và thời gian lưu trú
của khách, cụ thể:
● Trường hợp khách đã đặt cọc nhưng chưa ký hợp đồng (do không đạt điều kiện ký
hoặc khách muốn hủy thuê): hoàn 80% tiền cọc.
● Trường hợp đã ký hợp đồng nhưng chưa hết hạn thuê, và khách lưu trú dưới 6 tháng:
hoàn 50% tiền cọc.
● Trường hợp đã ký hợp đồng nhưng chưa hết hạn thuê, và khách lưu trú trên 6 tháng:
hoàn 70% tiền cọc.
● Trường hợp hết hạn thuê theo hợp đồng: hoàn 100% tiền cọc.
Sau khi xác định mức hoàn cọc cơ bản, kế toán sẽ tiếp tục khấu trừ các chi phí phát sinh
trong quá trình lưu trú, bao gồm nhưng không giới hạn: tiền thuê còn nợ, tiền điện
nước/dịch vụ còn nợ, chi phí sửa chữa hoặc bồi thường hư hỏng/mất mát do khách thuê
gây ra, và các khoản phạt vi phạm (nếu có). Kết quả đối soát có thể xảy ra hai trường hợp:
(1) Nếu sau khấu trừ vẫn còn dư, phần tiền cọc còn lại sẽ được hoàn trả cho khách;
(2) Nếu các chi phí phát sinh lớn hơn số tiền cọc được hoàn, khách thuê phải thanh toán
thêm phần chênh lệch theo thông báo của ký túc xá.
Sau khi tính toán xong, kế toán sẽ lập bảng đối soát/phiếu thanh toán và báo lại cho quản
lý để quản lý làm việc với khách thuê. Quản lý sẽ thông báo chi tiết các khoản khấu trừ và
số tiền hoàn cọc (hoặc số tiền cần thanh toán thêm), đồng thời xác nhận lại với khách về
việc đồng ý trả phòng theo kết quả đối soát. Nếu khách cần thanh toán thêm, khách thực
hiện thanh toán theo hướng dẫn của kế toán; nếu khách được hoàn cọc, hai bên thống nhất
phương thức hoàn (tiền mặt hoặc chuyển khoản theo quy định).
Khi khách đã xác nhận kết quả đối soát và hoàn tất thanh toán các khoản phát sinh (nếu
có), ký túc xá tiến hành cho khách ký biên bản trả phòng và thanh lý hợp đồng thuê. Sau
khi thanh lý hợp đồng, kế toán thực hiện hoàn cọc cho khách hàng (nếu có số dư được
hoàn) theo đúng số tiền đã đối soát và ghi nhận hoàn tất thủ tục trả phòng.
Sau khi hoàn tất thủ tục trả phòng/giường và thanh lý hợp đồng, ký túc xá sẽ thu hồi toàn
bộ chìa khóa/thẻ ra vào (nếu có), cập nhật lại thông tin bàn giao tài sản và xác nhận khách
đã kết thúc lưu trú. Phòng/giường sau đó được ghi nhận là trống và sẵn sàng cho khách
hàng tiếp theo đăng ký thuê.
KHOA CÔ