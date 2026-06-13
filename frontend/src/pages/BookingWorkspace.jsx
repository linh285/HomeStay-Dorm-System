import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import {
  FiUser, FiPhone, FiMail, FiUsers, FiHome, FiCalendar,
  FiFileText, FiSearch, FiCheck, FiPlus, FiTrash2, FiClock,
  FiDollarSign, FiAlertCircle, FiXCircle,
} from 'react-icons/fi';
import Sidebar from '../components/layout/Sidebar';
import Topbar from '../components/layout/Topbar';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Badge from '../components/ui/Badge';
import * as roomService from '../services/roomService';
import * as depositService from '../services/depositService';
import { useAuth } from '../hooks/useAuth';
import * as lichXemService from '../services/lichXemService';
import * as customerService from '../services/customerService';
import * as groupService from '../services/groupService';
// ─── Constants ────────────────────────────────────────────────────────────────

const ROOM_TYPES = [
  { value: '', label: 'Tất cả loại phòng' },
  { value: 'SINGLE', label: 'Phòng đơn' },
  { value: 'DOUBLE', label: 'Phòng đôi' },
  { value: 'DORMITORY', label: 'Phòng tập thể (ký túc xá)' },
  { value: 'STUDIO', label: 'Studio' },
  { value: 'APARTMENT', label: 'Căn hộ' },
];

const CONTACT_CHANNELS = [
  { value: 'EMAIL', label: 'Email' },
  { value: 'PHONE', label: 'Điện thoại' },
];

const INITIAL_FORM = {
  hoTenKhach: '',
  sdt: '',
  email: '',
  loaiKhach: 'CA_NHAN',
  soNguoiThue: 1,
  loaiPhongMongMuon: '',
  ngayDuKienVaoO: '',
  yeuCauDacBiet: '',
  ghiChuSale: '',
  thanhVien: [],
};

const INITIAL_SCHEDULE = {
  ngayXem: '',
  gioXem: '',
  kenhLienHe: 'PHONE',
  ghiChu: '',
};

// ─── Sub-components ───────────────────────────────────────────────────────────

/** Empty state placeholder for room list */
const EmptyRoomState = ({ searched }) => (
  <div style={styles.emptyState}>
    <FiHome size={40} style={{ color: '#dee2e6', marginBottom: '12px' }} />
    <p style={styles.emptyTitle}>
      {searched ? 'Không tìm thấy phòng phù hợp' : 'Nhấn "Tìm phòng phù hợp" để xem danh sách phòng'}
    </p>
    <p style={styles.emptySubtitle}>
      {searched
        ? 'Hãy thử thay đổi tiêu chí tìm kiếm hoặc ngày vào ở.'
        : 'Hệ thống sẽ hiển thị các phòng còn trống phù hợp với yêu cầu.'}
    </p>
  </div>
);

/** Individual room card */
const RoomCard = ({ room, isSelected, onSelect }) => {
  const statusVariant = {
    AVAILABLE: 'available',
    RESERVED: 'reserved',
    OCCUPIED: 'occupied',
    MAINTENANCE: 'maintenance',
  };
  const statusLabel = {
    AVAILABLE: 'Còn trống',
    RESERVED: 'Đã đặt',
    OCCUPIED: 'Đang thuê',
    MAINTENANCE: 'Bảo trì',
  };

  return (
    <div
      style={{
        ...styles.roomCard,
        ...(isSelected ? styles.roomCardSelected : {}),
      }}
    >
      <div style={styles.roomCardHeader}>
        <div>
          <span style={styles.roomCode}>{room.maPhong}</span>
          <Badge
            variant={statusVariant[room.trangThai] || 'default'}
            size="sm"
          >
            {statusLabel[room.trangThai] || room.trangThai}
          </Badge>
        </div>
        <span style={styles.roomPrice}>
          {Number(room.giaThuePhanThang || room.giaThue || 0).toLocaleString('vi-VN')}
          <span style={styles.roomPriceUnit}>đ/tháng</span>
        </span>
      </div>

      <div style={styles.roomCardMeta}>
        <span style={styles.metaItem}>
          <FiHome size={12} style={{ marginRight: '4px' }} />
          {room.loaiPhong}
        </span>
        <span style={styles.metaDot}>·</span>
        <span style={styles.metaItem}>
          Khu {room.khu || '—'} – Tầng {room.tang || '—'}
        </span>
        {room.soGiuong && (
          <>
            <span style={styles.metaDot}>·</span>
            <span style={styles.metaItem}>{room.soGiuong} giường</span>
          </>
        )}
      </div>

      <div style={styles.roomCardFooter}>
        <Button
          variant={isSelected ? 'primary' : 'outline'}
          size="sm"
          onClick={() => onSelect(room)}
        >
          {isSelected ? <><FiCheck size={13} /> Đã chọn</> : 'Chọn phòng'}
        </Button>
      </div>
    </div>
  );
};

// ─── Main Component ───────────────────────────────────────────────────────────

const BookingWorkspace = () => {
  const navigate = useNavigate();
  const { logout, hasRole } = useAuth();

  // ── Form state
  const [form, setForm] = useState(INITIAL_FORM);
  const [memberRow, setMemberRow] = useState({ hoTen: '', sdt: '', email: '' });

  // ── Room search state
  const [rooms, setRooms] = useState([]);
  const [roomsLoading, setRoomsLoading] = useState(false);
  const [roomsSearched, setRoomsSearched] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);

  // ── Schedule state
  const [schedule, setSchedule] = useState(INITIAL_SCHEDULE);
  const [scheduleSaved, setScheduleSaved] = useState(false);
  const [savingSchedule, setSavingSchedule] = useState(false);

  // ── Deposit confirm state
  const [khachDaDongY, setKhachDaDongY] = useState(false);
  const [creatingDeposit, setCreatingDeposit] = useState(false);

   // ── Thêm state lưu mã khách hàng sau khi tạo cọc
  const [khachHangId, setKhachHangId] = useState(null);
  const [maNhom, setMaNhom] = useState(null);
  // ── Form helpers
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === 'soNguoiThue' ? Number(value) : value,
    }));
  };
  

  const handleClearForm = () => {
    setForm(INITIAL_FORM);
    setRooms([]);
    setRoomsSearched(false);
    setSelectedRoom(null);
    setSchedule(INITIAL_SCHEDULE);
    setScheduleSaved(false);
    setKhachDaDongY(false);
  };

  // ── Member table helpers
  const handleAddMember = () => {
    if (!memberRow.hoTen.trim()) return;
    setForm((prev) => ({
      ...prev,
      thanhVien: [...prev.thanhVien, { ...memberRow, id: Date.now() }],
    }));
    setMemberRow({ hoTen: '', sdt: '', email: '' });
  };

  const handleRemoveMember = (id) => {
    setForm((prev) => ({
      ...prev,
      thanhVien: prev.thanhVien.filter((m) => m.id !== id),
    }));
  };

  // ── Check conditions (stub)
  const handleKiemTraDieuKien = () => {
    if (!form.hoTenKhach.trim() || !form.sdt.trim()) {
      toast.error('Vui lòng nhập ít nhất Họ tên và SĐT để kiểm tra.');
      return;
    }
    toast.success('Khách hàng đủ điều kiện đăng ký thuê.');
  };

  const handleFindRooms = useCallback(async () => {
    setRoomsLoading(true);
    setRoomsSearched(false);
    setSelectedRoom(null);
    setScheduleSaved(false);
    setKhachDaDongY(false);
    try {
      // Map frontend fields → backend query params
      const params = {};
      if (form.soNguoiThue) params.SucChua = form.soNguoiThue;
      const res = await roomService.getAvailableRooms(params);
      // axios wraps body in .data; backend returns { success, data: [...] }
      const raw = res?.data ?? [];
      // Normalize backend field names (PascalCase) to camelCase for RoomCard
      const list = (Array.isArray(raw) ? raw : []).map((r) => ({
        maPhong: r.MaPhong ?? r.maPhong,
        loaiPhong: r.LoaiPhong ?? r.loaiPhong ?? '—',
        khu: r.KhuVuc ?? r.khu,
        tang: r.Tang ?? r.tang,
        soGiuong: r.SucChua ?? r.soGiuong,
        giaThue: r.GiaThue ?? r.giaThue,
        giaThuePhanThang: r.GiaThue ?? r.giaThuePhanThang,
        trangThai: r.TinhTrang ?? r.trangThai,
        giuongs: r.giuongs,
      }));
      setRooms(list);
      if (list.length === 0) {
        toast('Không tìm thấy phòng phù hợp với tiêu chí đã chọn.', { icon: '🔍' });
      } else {
        toast.success(`Tìm thấy ${list.length} phòng phù hợp.`);
      }
    } catch (err) {
      toast.error('Không thể tải danh sách phòng. Vui lòng thử lại.');
      setRooms([]);
    } finally {
      setRoomsLoading(false);
      setRoomsSearched(true);
    }
  }, [form.loaiPhongMongMuon, form.ngayDuKienVaoO, form.soNguoiThue]);

  // ── Save registration (stub)
  const handleLuuDangKy = async () => {
    if (!form.hoTenKhach.trim() || !form.sdt.trim()) {
      toast.error('Vui lòng nhập Họ tên và SĐT để lưu đăng ký.');
      return;
    }
    try {
      // Tìm kiếm khách hàng theo SĐT
      const searchRes = await customerService.getAllCustomers({ search: form.sdt });
      let existing = searchRes?.data?.customers?.[0];
      let maKH = existing?.MaKH;

      if (!maKH) {
        const newCustomer = await customerService.createCustomer({
          HoTen: form.hoTenKhach,
          SDT: form.sdt,
          Email: form.email || null,
        });
        maKH = newCustomer?.data?.MaKH;
      }
      setKhachHangId(maKH);
      toast.success('Đã lưu thông tin khách hàng.');

      // Nếu là nhóm và có thành viên, tạo nhóm
      if (form.loaiKhach === 'NHOM' && form.thanhVien.length > 0) {
        const members = form.thanhVien.map(m => ({ hoTen: m.hoTen, sdt: m.sdt, email: m.email }));
        // Thêm người đại diện nếu chưa có trong danh sách
        const isDaiDienInList = members.some(m => m.sdt === form.sdt);
        if (!isDaiDienInList) {
          members.unshift({ hoTen: form.hoTenKhach, sdt: form.sdt, email: form.email });
        }
        const groupData = {
          tenNhom: `Nhóm của ${form.hoTenKhach}`,
          maDaiDien: maKH,
          thanhViens: members,
        };
        const groupRes = await groupService.createGroup(groupData);
        const maNhomCreated = groupRes?.data?.MaNhom;
        if (maNhomCreated) {
          setMaNhom(maNhomCreated);
          toast.success('Đã tạo nhóm và thêm thành viên.');
        }
      } else {
        setMaNhom(null);
      }
    } catch (err) {
      console.error(err);
      toast.error('Lưu đăng ký thất bại. Vui lòng thử lại.');
    }
  };
  // ── Save schedule
  const handleLuuLichXem = async () => {
    if (!schedule.ngayXem || !schedule.gioXem) {
      toast.error('Vui lòng chọn ngày và giờ xem phòng.');
      return;
    }
    if (!selectedRoom) {
      toast.error('Chưa chọn phòng.');
      return;
    }
    if (!khachHangId) {
    toast.error('Vui lòng lưu đăng ký trước để tạo thông tin khách hàng.');
    return;
  }
    setSavingSchedule(true);
    try {
      await lichXemService.createLichXem({
        MaKH: khachHangId,
        MaPhong: selectedRoom.maPhong,
        NgayXem: schedule.ngayXem,
        GioXem: schedule.gioXem,
        GhiChu: schedule.ghiChu,
      });
      setScheduleSaved(true);
      toast.success('Đã lưu lịch xem phòng!');
    } catch (error) {
      console.error(error);
      toast.error('Lỗi khi lưu lịch xem. Vui lòng thử lại.');
    } finally {
      setSavingSchedule(false);
    }
  };

  // ── Create deposit
  const handleTaoYeuCauDatCoc = async () => {
    if (!selectedRoom || !form.hoTenKhach.trim() || !form.sdt.trim()) {
      toast.error('Thiếu thông tin khách hàng hoặc phòng.');
      return;
    }
    setCreatingDeposit(true);
    try {
      const soGiuong = selectedRoom.soGiuong || 1;
      const giaThue = selectedRoom.giaThuePhanThang || selectedRoom.giaThue || 0;
      const tienCoc = giaThue * 2; // thuê nguyên phòng: cọc = 2 tháng tiền phòng

      const response = await depositService.createDeposit({
        maPhong: selectedRoom.maPhong,
        hoTenKhach: form.hoTenKhach,
        sdt: form.sdt,
        email: form.email || undefined,
        tienCoc,
        phuongThucThanhToan: 'TIEN_MAT',
        ghiChu: form.ghiChuSale,
      });

      // Lấy mã cọc và mã khách hàng từ response
      const maCoc = response?.data?.MaCoc || response?.MaCoc;
      const maKH = response?.data?.MaKH || response?.MaKH; // ← thêm dòng này
      if (maCoc && maKH) {
        setKhachHangId(maKH); // ← lưu lại để dùng cho lịch xem
        toast.success('Tạo yêu cầu đặt cọc thành công! Chờ xác nhận thanh toán cọc.');
        if (hasRole('MANAGER', 'ADMIN', 'ACCOUNTANT')) {
          navigate('/deposits');
        } else {
          navigate('/dashboard');
        }
      } else {
        toast.error('Không nhận được mã cọc hoặc mã khách hàng, vui lòng thử lại.');
      }
    } catch (err) {
      toast.error(err?.message || 'Tạo yêu cầu đặt cọc thất bại. Vui lòng thử lại.');
    } finally {
      setCreatingDeposit(false);
    }
  };

  // ── Deposit amount calculation
  const soGiuong = selectedRoom?.soGiuong || 1;
  const giaThue = selectedRoom?.giaThuePhanThang || selectedRoom?.giaThue || 0;
  const tienCoc = giaThue * 2; // thuê nguyên phòng: cọc = 2 tháng tiền phòng

  // ─────────────────────────────────────────────────────────────────────────────
  return (
    <div style={styles.appShell}>
      <Sidebar onLogout={logout} />
      <div style={styles.mainContent}>
        <Topbar />
        <div style={styles.pageBody}>

          {/* Page header */}
          <div style={styles.pageHeader}>
            <h1 style={styles.pageTitle}>Đăng ký & Đặt lịch</h1>
            <p style={styles.pageSubtitle}>Tiếp nhận đăng ký mới, tìm phòng và lên lịch xem phòng cho khách</p>
          </div>

          {/* 2-column workspace */}
          <div style={styles.workspace}>

            {/* ── LEFT COLUMN: Registration Form ── */}
            <div style={styles.leftColumn}>
              <div style={styles.card}>
                <div style={styles.cardHeader}>
                  <FiFileText size={18} style={{ color: '#0A58CA' }} />
                  <h2 style={styles.cardTitle}>Thông tin đăng ký thuê</h2>
                </div>
                <div style={styles.cardBody}>

                  <div style={styles.formGrid2}>
                    <Input
                      label="Họ tên khách"
                      name="hoTenKhach"
                      icon={<FiUser size={15} />}
                      placeholder="Nguyễn Văn A"
                      value={form.hoTenKhach}
                      onChange={handleFormChange}
                      required
                    />
                    <Input
                      label="SĐT"
                      name="sdt"
                      type="tel"
                      icon={<FiPhone size={15} />}
                      placeholder="0901 234 567"
                      value={form.sdt}
                      onChange={handleFormChange}
                      required
                    />
                  </div>

                  <Input
                    label="Email"
                    name="email"
                    type="email"
                    icon={<FiMail size={15} />}
                    placeholder="khachhang@email.com"
                    value={form.email}
                    onChange={handleFormChange}
                  />

                  <div style={styles.formGrid2}>
                    <Input
                      label="Loại khách"
                      name="loaiKhach"
                      type="select"
                      value={form.loaiKhach}
                      onChange={handleFormChange}
                      options={[
                        { value: 'CA_NHAN', label: 'Cá nhân' },
                        { value: 'NHOM', label: 'Nhóm' },
                      ]}
                    />
                    <Input
                      label="Số người thuê"
                      name="soNguoiThue"
                      type="number"
                      icon={<FiUsers size={15} />}
                      value={form.soNguoiThue}
                      onChange={handleFormChange}
                      min={1}
                    />
                  </div>

                  {/* Member table for group bookings */}
                  {form.loaiKhach === 'NHOM' && (
                    <div style={styles.memberSection}>
                      <p style={styles.memberSectionTitle}>
                        <FiUsers size={14} style={{ marginRight: '6px', color: '#0A58CA' }} />
                        Danh sách thành viên nhóm
                      </p>
                      {form.thanhVien.length > 0 && (
                        <div style={styles.memberTableWrapper}>
                          <table style={styles.memberTable}>
                            <thead>
                              <tr>
                                <th style={styles.th}>Họ tên</th>
                                <th style={styles.th}>SĐT</th>
                                <th style={styles.th}>Email</th>
                                <th style={styles.th}></th>
                              </tr>
                            </thead>
                            <tbody>
                              {form.thanhVien.map((m) => (
                                <tr key={m.id}>
                                  <td style={styles.td}>{m.hoTen}</td>
                                  <td style={styles.td}>{m.sdt || '—'}</td>
                                  <td style={styles.td}>{m.email || '—'}</td>
                                  <td style={styles.td}>
                                    <button
                                      style={styles.removeBtn}
                                      onClick={() => handleRemoveMember(m.id)}
                                      title="Xóa thành viên"
                                    >
                                      <FiTrash2 size={13} />
                                    </button>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      )}
                      {/* Add member row */}
                      <div style={styles.addMemberRow}>
                        <input
                          style={styles.inlineInput}
                          placeholder="Họ tên *"
                          value={memberRow.hoTen}
                          onChange={(e) => setMemberRow((p) => ({ ...p, hoTen: e.target.value }))}
                        />
                        <input
                          style={styles.inlineInput}
                          placeholder="SĐT"
                          value={memberRow.sdt}
                          onChange={(e) => setMemberRow((p) => ({ ...p, sdt: e.target.value }))}
                        />
                        <input
                          style={styles.inlineInput}
                          placeholder="Email"
                          value={memberRow.email}
                          onChange={(e) => setMemberRow((p) => ({ ...p, email: e.target.value }))}
                        />
                        <Button variant="outline" size="sm" onClick={handleAddMember}>
                          <FiPlus size={13} /> Thêm
                        </Button>
                      </div>
                    </div>
                  )}

                  <div style={styles.formGrid2}>
                    <Input
                      label="Loại phòng mong muốn"
                      name="loaiPhongMongMuon"
                      type="select"
                      value={form.loaiPhongMongMuon}
                      onChange={handleFormChange}
                      options={ROOM_TYPES}
                    />
                    <Input
                      label="Ngày dự kiến vào ở"
                      name="ngayDuKienVaoO"
                      type="date"
                      icon={<FiCalendar size={15} />}
                      value={form.ngayDuKienVaoO}
                      onChange={handleFormChange}
                    />
                  </div>

                  <Input
                    label="Yêu cầu đặc biệt"
                    name="yeuCauDacBiet"
                    type="textarea"
                    rows={2}
                    placeholder="Phòng yên tĩnh, không hút thuốc, gần thang máy..."
                    value={form.yeuCauDacBiet}
                    onChange={handleFormChange}
                  />

                  <Input
                    label="Ghi chú sale"
                    name="ghiChuSale"
                    type="textarea"
                    rows={2}
                    placeholder="Ghi chú nội bộ dành cho nhân viên sale..."
                    value={form.ghiChuSale}
                    onChange={handleFormChange}
                  />

                  {/* Action buttons */}
                  <div style={styles.formActions}>
                    <Button variant="outline" onClick={handleKiemTraDieuKien} fullWidth>
                      <FiAlertCircle size={15} />
                      Kiểm tra điều kiện
                    </Button>
                    <Button variant="primary" onClick={handleFindRooms} loading={roomsLoading} fullWidth>
                      <FiSearch size={15} />
                      Tìm phòng phù hợp
                    </Button>
                    <Button variant="secondary" onClick={handleLuuDangKy} fullWidth>
                      <FiCheck size={15} />
                      Lưu đăng ký
                    </Button>
                    <Button
                      variant="text-link"
                      onClick={handleClearForm}
                      style={{ color: '#dc3545', fontSize: '13px' }}
                      fullWidth
                    >
                      <FiXCircle size={14} />
                      Xóa form
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* ── RIGHT COLUMN: Room list + Schedule panel ── */}
            <div style={styles.rightColumn}>

              {/* Upper: Available rooms */}
              <div style={styles.card}>
                <div style={styles.cardHeader}>
                  <FiHome size={18} style={{ color: '#0A58CA' }} />
                  <h2 style={styles.cardTitle}>Các phòng phù hợp</h2>
                  {rooms.length > 0 && (
                    <span style={styles.roomCount}>{rooms.length} phòng</span>
                  )}
                </div>
                <div style={styles.cardBody}>
                  {roomsLoading ? (
                    <div style={styles.loadingState}>
                      <div style={styles.spinner} />
                      <p style={{ marginTop: '12px', color: '#6c757d', fontSize: '14px' }}>
                        Đang tìm kiếm phòng...
                      </p>
                    </div>
                  ) : rooms.length > 0 ? (
                    <div style={styles.roomList}>
                      {rooms.map((room) => (
                        <RoomCard
                          key={room.maPhong}
                          room={room}
                          isSelected={selectedRoom?.maPhong === room.maPhong}
                          onSelect={(r) => {
                            setSelectedRoom(r);
                            setScheduleSaved(false);
                            setKhachDaDongY(false);
                            setSchedule(INITIAL_SCHEDULE);
                          }}
                        />
                      ))}
                    </div>
                  ) : (
                    <EmptyRoomState searched={roomsSearched} />
                  )}
                </div>
              </div>

              {/* Lower: Schedule panel (only when room selected) */}
              {selectedRoom && (
                <div style={{ ...styles.card, ...styles.scheduleCard }}>
                  <div style={styles.cardHeader}>
                    <FiClock size={18} style={{ color: '#0A58CA' }} />
                    <h2 style={styles.cardTitle}>Đặt lịch xem phòng</h2>
                    <span style={styles.selectedRoomBadge}>
                      Phòng {selectedRoom.maPhong}
                    </span>
                  </div>
                  <div style={styles.cardBody}>

                    {/* Selected room summary */}
                    <div style={styles.selectedRoomSummary}>
                      <div style={styles.summaryRow}>
                        <span style={styles.summaryLabel}>Mã phòng:</span>
                        <span style={styles.summaryValue}>{selectedRoom.maPhong}</span>
                      </div>
                      <div style={styles.summaryRow}>
                        <span style={styles.summaryLabel}>Loại phòng:</span>
                        <span style={styles.summaryValue}>{selectedRoom.loaiPhong}</span>
                      </div>
                      <div style={styles.summaryRow}>
                        <span style={styles.summaryLabel}>Khu / Tầng:</span>
                        <span style={styles.summaryValue}>
                          Khu {selectedRoom.khu || '—'} – Tầng {selectedRoom.tang || '—'}
                        </span>
                      </div>
                      <div style={styles.summaryRow}>
                        <span style={styles.summaryLabel}>Giá thuê:</span>
                        <span style={{ ...styles.summaryValue, fontWeight: '600', color: '#0A58CA' }}>
                          {Number(giaThue).toLocaleString('vi-VN')} đ/tháng
                        </span>
                      </div>
                    </div>

                    {/* Schedule fields */}
                    <div style={styles.formGrid2}>
                      <Input
                        label="Ngày xem"
                        name="ngayXem"
                        type="date"
                        icon={<FiCalendar size={15} />}
                        value={schedule.ngayXem}
                        onChange={(e) => setSchedule((p) => ({ ...p, ngayXem: e.target.value }))}
                        required
                        disabled={scheduleSaved}
                      />
                      <Input
                        label="Giờ xem"
                        name="gioXem"
                        type="time"
                        icon={<FiClock size={15} />}
                        value={schedule.gioXem}
                        onChange={(e) => setSchedule((p) => ({ ...p, gioXem: e.target.value }))}
                        required
                        disabled={scheduleSaved}
                      />
                    </div>

                    {/* Contact channel radio */}
                    <div style={styles.fieldGroup}>
                      <label style={styles.fieldLabel}>Kênh liên hệ</label>
                      <div style={styles.radioGroup}>
                        {CONTACT_CHANNELS.map((ch) => (
                          <label key={ch.value} style={styles.radioLabel}>
                            <input
                              type="radio"
                              name="kenhLienHe"
                              value={ch.value}
                              checked={schedule.kenhLienHe === ch.value}
                              onChange={(e) =>
                                setSchedule((p) => ({ ...p, kenhLienHe: e.target.value }))
                              }
                              disabled={scheduleSaved}
                              style={{ marginRight: '6px' }}
                            />
                            {ch.label}
                          </label>
                        ))}
                      </div>
                    </div>

                    <Input
                      label="Ghi chú"
                      name="ghiChuLich"
                      type="textarea"
                      rows={2}
                      placeholder="Ghi chú thêm về lịch xem..."
                      value={schedule.ghiChu}
                      onChange={(e) => setSchedule((p) => ({ ...p, ghiChu: e.target.value }))}
                      disabled={scheduleSaved}
                    />

                    {!scheduleSaved ? (
                      <Button
                        variant="primary"
                        onClick={handleLuuLichXem}
                        loading={savingSchedule}
                        fullWidth
                      >
                        <FiCheck size={15} />
                        Lưu lịch xem
                      </Button>
                    ) : (
                      <div style={styles.scheduleConfirmedBanner}>
                        <FiCheck size={15} style={{ color: '#198754', marginRight: '6px' }} />
                        Đã lưu lịch xem phòng thành công
                      </div>
                    )}

                    {/* Checkbox: khách đã đồng ý */}
                    {scheduleSaved && (
                      <label style={styles.agreementCheckbox}>
                        <input
                          type="checkbox"
                          checked={khachDaDongY}
                          onChange={(e) => setKhachDaDongY(e.target.checked)}
                          style={{ marginRight: '8px', width: '16px', height: '16px', cursor: 'pointer' }}
                        />
                        <span>Khách đã xem phòng và <strong>đồng ý thuê</strong></span>
                      </label>
                    )}

                    {/* Deposit confirmation panel */}
                    {scheduleSaved && khachDaDongY && (
                      <div style={styles.depositPanel}>
                        <div style={styles.depositPanelHeader}>
                          <FiDollarSign size={18} style={{ color: '#0A58CA' }} />
                          <span style={styles.depositPanelTitle}>Xác nhận đặt cọc</span>
                        </div>

                        {/* Deposit formula */}
                        <div style={styles.depositFormula}>
                          <div style={styles.formulaRow}>
                            <span style={styles.formulaLabel}>Giá thuê</span>
                            <span style={styles.formulaValue}>
                              {Number(giaThue).toLocaleString('vi-VN')} đ
                            </span>
                          </div>
                          <div style={styles.formulaRow}>
                            <span style={styles.formulaLabel}>× 2 tháng</span>
                            <span style={styles.formulaValue}>× 2</span>
                          </div>
                          <div style={styles.formulaRow}>
                            <span style={styles.formulaLabel}>× Số giường</span>
                            <span style={styles.formulaValue}>× {soGiuong}</span>
                          </div>
                          <div style={styles.formulaDivider} />
                          <div style={styles.formulaRow}>
                            <span style={{ ...styles.formulaLabel, fontWeight: '700', color: '#212529' }}>
                              Tiền cọc
                            </span>
                            <span style={styles.formulaTotal}>
                              {Number(tienCoc).toLocaleString('vi-VN')} đ
                            </span>
                          </div>
                        </div>

                        <Button
                          variant="primary"
                          size="lg"
                          fullWidth
                          loading={creatingDeposit}
                          onClick={handleTaoYeuCauDatCoc}
                          style={{ backgroundColor: '#0A58CA', marginTop: '8px' }}
                        >
                          <FiDollarSign size={16} />
                          Tạo yêu cầu đặt cọc
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
            {/* end right column */}
          </div>
          {/* end workspace */}
        </div>
      </div>
    </div>
  );
};

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = {
  appShell: {
    display: 'flex',
    minHeight: '100vh',
    backgroundColor: '#f8f9fa',
  },
  mainContent: {
    marginLeft: '260px',
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
  },
  pageBody: {
    marginTop: '64px',
    padding: '24px',
    flex: 1,
  },

  // Page header
  pageHeader: {
    marginBottom: '24px',
  },
  pageTitle: {
    margin: 0,
    fontSize: '22px',
    fontWeight: '700',
    color: '#212529',
  },
  pageSubtitle: {
    margin: '4px 0 0',
    fontSize: '14px',
    color: '#6c757d',
  },

  // 2-column layout
  workspace: {
    display: 'flex',
    gap: '20px',
    alignItems: 'flex-start',
  },
  leftColumn: {
    flex: '0 0 40%',
    maxWidth: '40%',
  },
  rightColumn: {
    flex: '1 1 60%',
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },

  // Card
  card: {
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    border: '1px solid #e9ecef',
    boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
    overflow: 'hidden',
  },
  scheduleCard: {
    borderTop: '3px solid #0A58CA',
  },
  cardHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    padding: '18px 20px',
    borderBottom: '1px solid #e9ecef',
    backgroundColor: '#fafbfc',
  },
  cardTitle: {
    margin: 0,
    fontSize: '15px',
    fontWeight: '600',
    color: '#212529',
    flex: 1,
  },
  cardBody: {
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    gap: '14px',
  },

  // Form
  formGrid2: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '12px',
  },
  formActions: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    marginTop: '4px',
  },

  // Member table
  memberSection: {
    backgroundColor: '#f8f9fa',
    borderRadius: '8px',
    padding: '12px',
    border: '1px solid #e9ecef',
  },
  memberSectionTitle: {
    margin: '0 0 10px',
    fontSize: '13px',
    fontWeight: '600',
    color: '#495057',
    display: 'flex',
    alignItems: 'center',
  },
  memberTableWrapper: {
    overflowX: 'auto',
    marginBottom: '10px',
  },
  memberTable: {
    width: '100%',
    borderCollapse: 'collapse',
    fontSize: '13px',
  },
  th: {
    padding: '6px 10px',
    textAlign: 'left',
    color: '#6c757d',
    fontWeight: '600',
    borderBottom: '1px solid #dee2e6',
    whiteSpace: 'nowrap',
  },
  td: {
    padding: '7px 10px',
    borderBottom: '1px solid #f1f3f5',
    color: '#495057',
    fontSize: '13px',
  },
  removeBtn: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    color: '#dc3545',
    padding: '2px 4px',
    borderRadius: '4px',
    display: 'flex',
    alignItems: 'center',
  },
  addMemberRow: {
    display: 'flex',
    gap: '8px',
    alignItems: 'center',
  },
  inlineInput: {
    flex: 1,
    height: '34px',
    border: '1px solid #dee2e6',
    borderRadius: '6px',
    padding: '0 10px',
    fontSize: '13px',
    color: '#212529',
    outline: 'none',
    minWidth: 0,
  },

  // Room list
  roomList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  roomCount: {
    fontSize: '12px',
    fontWeight: '600',
    color: '#0A58CA',
    backgroundColor: '#e8f0fe',
    padding: '2px 8px',
    borderRadius: '20px',
  },

  // Room card
  roomCard: {
    border: '1px solid #dee2e6',
    borderRadius: '10px',
    padding: '14px 16px',
    backgroundColor: '#ffffff',
    transition: 'border-color 0.15s ease, box-shadow 0.15s ease',
    cursor: 'default',
  },
  roomCardSelected: {
    borderColor: '#0A58CA',
    boxShadow: '0 0 0 3px rgba(10, 88, 202, 0.1)',
  },
  roomCardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '8px',
    gap: '8px',
  },
  roomCode: {
    fontSize: '15px',
    fontWeight: '700',
    color: '#212529',
    marginRight: '8px',
  },
  roomPrice: {
    fontSize: '15px',
    fontWeight: '700',
    color: '#0A58CA',
  },
  roomPriceUnit: {
    fontSize: '11px',
    fontWeight: '400',
    color: '#6c757d',
    marginLeft: '2px',
  },
  roomCardMeta: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    flexWrap: 'wrap',
    marginBottom: '10px',
  },
  metaItem: {
    fontSize: '12px',
    color: '#6c757d',
    display: 'flex',
    alignItems: 'center',
  },
  metaDot: {
    color: '#adb5bd',
    fontSize: '14px',
  },
  roomCardFooter: {
    display: 'flex',
    justifyContent: 'flex-end',
  },

  // Empty / loading states
  emptyState: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '40px 20px',
    textAlign: 'center',
    color: '#adb5bd',
  },
  emptyTitle: {
    margin: 0,
    fontSize: '14px',
    fontWeight: '600',
    color: '#6c757d',
  },
  emptySubtitle: {
    margin: '6px 0 0',
    fontSize: '13px',
    color: '#adb5bd',
  },
  loadingState: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '40px 20px',
  },
  spinner: {
    width: '32px',
    height: '32px',
    border: '3px solid #dee2e6',
    borderTop: '3px solid #0A58CA',
    borderRadius: '50%',
    animation: 'spin 0.8s linear infinite',
  },

  // Schedule panel
  selectedRoomBadge: {
    fontSize: '12px',
    fontWeight: '600',
    color: '#0A58CA',
    backgroundColor: '#e8f0fe',
    padding: '3px 10px',
    borderRadius: '20px',
  },
  selectedRoomSummary: {
    backgroundColor: '#f8f9fa',
    borderRadius: '8px',
    padding: '12px 14px',
    border: '1px solid #e9ecef',
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
  },
  summaryRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  summaryLabel: {
    fontSize: '13px',
    color: '#6c757d',
  },
  summaryValue: {
    fontSize: '13px',
    color: '#212529',
    fontWeight: '500',
  },

  // Radio group
  fieldGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
  },
  fieldLabel: {
    fontSize: '13px',
    fontWeight: '500',
    color: '#495057',
  },
  radioGroup: {
    display: 'flex',
    gap: '20px',
  },
  radioLabel: {
    fontSize: '14px',
    color: '#495057',
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
  },

  // Schedule saved banner
  scheduleConfirmedBanner: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#d1e7dd',
    color: '#0a3622',
    borderRadius: '8px',
    padding: '10px 14px',
    fontSize: '13px',
    fontWeight: '500',
    border: '1px solid #a3cfbb',
  },

  // Agreement checkbox
  agreementCheckbox: {
    display: 'flex',
    alignItems: 'center',
    fontSize: '14px',
    color: '#212529',
    cursor: 'pointer',
    userSelect: 'none',
    backgroundColor: '#fff3cd',
    border: '1px solid #ffe083',
    borderRadius: '8px',
    padding: '10px 14px',
  },

  // Deposit panel
  depositPanel: {
    border: '2px solid #0A58CA',
    borderRadius: '10px',
    overflow: 'hidden',
  },
  depositPanelHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '12px 16px',
    backgroundColor: '#e8f0fe',
    borderBottom: '1px solid #c6d9f8',
  },
  depositPanelTitle: {
    fontSize: '14px',
    fontWeight: '700',
    color: '#0A58CA',
  },
  depositFormula: {
    padding: '14px 16px',
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    backgroundColor: '#ffffff',
  },
  formulaRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  formulaLabel: {
    fontSize: '13px',
    color: '#6c757d',
  },
  formulaValue: {
    fontSize: '13px',
    color: '#495057',
    fontWeight: '500',
  },
  formulaDivider: {
    height: '1px',
    backgroundColor: '#e9ecef',
    margin: '2px 0',
  },
  formulaTotal: {
    fontSize: '18px',
    fontWeight: '700',
    color: '#0A58CA',
  },
};

// Inject spinner keyframes once
const spinnerStyle = document.createElement('style');
spinnerStyle.textContent = `@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`;
if (!document.head.querySelector('[data-bw-spin]')) {
  spinnerStyle.setAttribute('data-bw-spin', '1');
  document.head.appendChild(spinnerStyle);
}

export default BookingWorkspace;
