import React, { useState, useEffect, useCallback } from 'react';
import toast from 'react-hot-toast';
import {
  FiSearch, FiEdit2, FiX, FiHome, FiPlus,
} from 'react-icons/fi';

import Sidebar from '../components/layout/Sidebar';
import Topbar from '../components/layout/Topbar';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Modal from '../components/ui/Modal';

import * as roomService from '../services/roomService';
import { formatCurrency, roomStatusConfig } from '../utils/formatters';

/* ─────────────────────────────────────────────
   Constants
───────────────────────────────────────────── */
const KHU_OPTIONS = [
  { value: '', label: 'Tất cả' },
  { value: 'A', label: 'Khu A' },
  { value: 'B', label: 'Khu B' },
  { value: 'C', label: 'Khu C' },
];

const TANG_OPTIONS = [
  { value: '', label: 'Tất cả' },
  ...Array.from({ length: 10 }, (_, i) => ({ value: String(i + 1), label: `Tầng ${i + 1}` })),
];

const TRANG_THAI_OPTIONS = [
  { value: '', label: 'Tất cả' },
  { value: 'AVAILABLE', label: 'Còn trống' },
  { value: 'PENDING', label: 'Chờ cọc' },
  { value: 'RESERVED', label: 'Đã cọc' },
  { value: 'OCCUPIED', label: 'Đang sử dụng' },
  { value: 'MAINTENANCE', label: 'Bảo trì' },
];

const STATUS_VARIANT_MAP = {
  AVAILABLE: 'available',
  PENDING: 'pending',
  RESERVED: 'reserved',
  OCCUPIED: 'occupied',
  MAINTENANCE: 'maintenance',
  INACTIVE: 'secondary',
};

const EMPTY_FORM = {
  maPhong: '',
  khu: '',
  tang: '',
  sucChua: '',
  giaThue: '',
  trangThai: 'AVAILABLE',
  ghiChu: '',
};

/* ─────────────────────────────────────────────
   Sub-components
───────────────────────────────────────────── */

/** Right-side slide-in drawer */
const Drawer = ({ isOpen, onClose, title, children, footer }) => {
  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          style={{
            position: 'fixed', inset: 0,
            backgroundColor: 'rgba(0,0,0,0.35)',
            zIndex: 300,
          }}
        />
      )}
      {/* Panel */}
      <div
        style={{
          position: 'fixed', top: 0, right: 0,
          width: '450px', height: '100vh',
          backgroundColor: '#fff',
          boxShadow: '-4px 0 24px rgba(0,0,0,0.12)',
          zIndex: 301,
          display: 'flex', flexDirection: 'column',
          transform: isOpen ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 0.28s cubic-bezier(.4,0,.2,1)',
        }}
      >
        {/* Header */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '20px 24px', borderBottom: '1px solid #e9ecef', flexShrink: 0,
        }}>
          <h3 style={{ margin: 0, fontSize: '17px', fontWeight: 600, color: '#212529' }}>
            {title}
          </h3>
          <button
            onClick={onClose}
            style={{
              border: 'none', background: 'transparent', cursor: 'pointer',
              color: '#6c757d', display: 'flex', alignItems: 'center',
              justifyContent: 'center', borderRadius: '6px', padding: '4px',
            }}
          >
            <FiX size={20} />
          </button>
        </div>

        {/* Body */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '24px' }}>
          {children}
        </div>

        {/* Footer */}
        {footer && (
          <div style={{
            padding: '16px 24px', borderTop: '1px solid #e9ecef',
            display: 'flex', gap: '12px', justifyContent: 'flex-end', flexShrink: 0,
          }}>
            {footer}
          </div>
        )}
      </div>
    </>
  );
};

/* ─────────────────────────────────────────────
   Main Page Component
───────────────────────────────────────────── */
const RoomInventory = () => {
  /* ── State ── */
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  // Filters
  const [filterKhu, setFilterKhu] = useState('');
  const [filterTang, setFilterTang] = useState('');
  const [filterTrangThai, setFilterTrangThai] = useState('');
  const [filterSearch, setFilterSearch] = useState('');

  // Drawer
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [editingRoom, setEditingRoom] = useState(null); // null = add mode
  const [form, setForm] = useState(EMPTY_FORM);
  const [formErrors, setFormErrors] = useState({});

  /* ── Data fetching ── */
  const fetchRooms = useCallback(async (params = {}) => {
    setLoading(true);
    try {
      const res = await roomService.getRooms(params);
      // API returns array or { data: [...] }
      const list = Array.isArray(res) ? res : (res?.data ?? res?.rooms ?? []);
      setRooms(list);
    } catch (err) {
      toast.error('Không thể tải danh sách phòng!');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchRooms();
  }, [fetchRooms]);

  /* ── Filter handler ── */
  const handleFilter = () => {
    const params = {};
    if (filterKhu) params.khu = filterKhu;
    if (filterTang) params.tang = filterTang;
    if (filterTrangThai) params.trangThai = filterTrangThai;
    if (filterSearch) params.search = filterSearch;
    fetchRooms(params);
  };

  const handleReset = () => {
    setFilterKhu('');
    setFilterTang('');
    setFilterTrangThai('');
    setFilterSearch('');
    fetchRooms();
  };

  /* ── Drawer helpers ── */
  const openAddDrawer = () => {
    setEditingRoom(null);
    setForm(EMPTY_FORM);
    setFormErrors({});
    setDrawerOpen(true);
  };

  const openEditDrawer = (room) => {
    setEditingRoom(room);
    setForm({
      maPhong: room.maPhong ?? '',
      khu: room.khu ?? '',
      tang: room.tang ?? '',
      sucChua: room.sucChua ?? '',
      giaThue: room.giaThue ?? '',
      trangThai: room.trangThai ?? 'AVAILABLE',
      ghiChu: room.ghiChu ?? '',
    });
    setFormErrors({});
    setDrawerOpen(true);
  };

  const closeDrawer = () => {
    setDrawerOpen(false);
    setEditingRoom(null);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  /* ── Validation ── */
  const validate = () => {
    const errors = {};
    if (!form.maPhong.trim()) errors.maPhong = 'Vui lòng nhập mã phòng';
    if (!form.khu.trim()) errors.khu = 'Vui lòng chọn khu/tòa';
    if (!form.tang) errors.tang = 'Vui lòng nhập tầng';
    if (!form.sucChua) errors.sucChua = 'Vui lòng nhập sức chứa';
    if (!form.giaThue) errors.giaThue = 'Vui lòng nhập giá thuê';
    return errors;
  };

  /* ── Save ── */
  const handleSave = async () => {
    const errors = validate();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setSaving(true);
    try {
      const payload = {
        ...form,
        tang: Number(form.tang),
        sucChua: Number(form.sucChua),
        giaThue: Number(form.giaThue),
      };

      if (editingRoom) {
        await roomService.updateRoom(editingRoom.maPhong, payload);
        toast.success('Cập nhật phòng thành công!');
      } else {
        await roomService.createRoom(payload);
        toast.success('Thêm phòng mới thành công!');
      }
      closeDrawer();
      fetchRooms();
    } catch (err) {
      toast.error(err?.message || 'Có lỗi xảy ra, vui lòng thử lại!');
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  /* ── Render badge ── */
  const renderStatusBadge = (trangThai) => {
    const cfg = roomStatusConfig[trangThai];
    const variant = STATUS_VARIANT_MAP[trangThai] || 'default';
    return <Badge variant={variant}>{cfg?.label ?? trangThai}</Badge>;
  };

  /* ── Layout ── */
  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f8f9fa' }}>
      {/* Sidebar */}
      <Sidebar />

      {/* Main area */}
      <div style={{ marginLeft: '260px', flex: 1, display: 'flex', flexDirection: 'column' }}>
        {/* Topbar */}
        <Topbar />

        {/* Page content */}
        <main style={{ marginTop: '64px', padding: '28px 28px 40px' }}>

          {/* Page header */}
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            marginBottom: '24px',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{
                width: '40px', height: '40px', borderRadius: '10px',
                backgroundColor: '#e8f0fe', display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <FiHome size={20} color="#0A58CA" />
              </div>
              <div>
                <h1 style={{ margin: 0, fontSize: '22px', fontWeight: 700, color: '#212529' }}>
                  Danh sách phòng / giường
                </h1>
                <p style={{ margin: 0, fontSize: '13px', color: '#6c757d', marginTop: '2px' }}>
                  Quản lý toàn bộ phòng và giường trong ký túc xá
                </p>
              </div>
            </div>
            <Button onClick={openAddDrawer} size="md">
              <FiPlus size={16} />
              Thêm phòng mới
            </Button>
          </div>

          {/* Filter bar */}
          <div style={{
            backgroundColor: '#fff', borderRadius: '12px',
            border: '1px solid #e9ecef', padding: '20px 24px',
            marginBottom: '20px',
            boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
          }}>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'flex-end' }}>
              {/* Khu/Tòa */}
              <div style={{ minWidth: '140px', flex: '0 0 auto' }}>
                <Input
                  label="Khu/Tòa"
                  type="select"
                  name="filterKhu"
                  value={filterKhu}
                  onChange={(e) => setFilterKhu(e.target.value)}
                  options={KHU_OPTIONS}
                />
              </div>

              {/* Tầng */}
              <div style={{ minWidth: '130px', flex: '0 0 auto' }}>
                <Input
                  label="Tầng"
                  type="select"
                  name="filterTang"
                  value={filterTang}
                  onChange={(e) => setFilterTang(e.target.value)}
                  options={TANG_OPTIONS}
                />
              </div>

              {/* Trạng thái */}
              <div style={{ minWidth: '160px', flex: '0 0 auto' }}>
                <Input
                  label="Trạng thái"
                  type="select"
                  name="filterTrangThai"
                  value={filterTrangThai}
                  onChange={(e) => setFilterTrangThai(e.target.value)}
                  options={TRANG_THAI_OPTIONS}
                />
              </div>

              {/* Search */}
              <div style={{ flex: 1, minWidth: '200px' }}>
                <label style={{ fontSize: '13px', fontWeight: 500, color: '#495057', display: 'block', marginBottom: '6px' }}>
                  Tìm kiếm
                </label>
                <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                  <FiSearch size={16} style={{
                    position: 'absolute', left: '12px', color: '#adb5bd', pointerEvents: 'none',
                  }} />
                  <input
                    type="text"
                    placeholder="Mã phòng, loại phòng..."
                    value={filterSearch}
                    onChange={(e) => setFilterSearch(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleFilter()}
                    style={{
                      width: '100%', height: '38px', border: '1px solid #dee2e6',
                      borderRadius: '20px', padding: '0 16px 0 38px',
                      fontSize: '14px', color: '#212529', outline: 'none',
                      backgroundColor: '#fff', boxSizing: 'border-box',
                    }}
                  />
                </div>
              </div>

              {/* Action buttons */}
              <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-end', paddingBottom: '0' }}>
                <Button onClick={handleFilter} size="md" style={{ minWidth: '70px' }}>
                  Lọc
                </Button>
                <button
                  onClick={handleReset}
                  style={{
                    background: 'none', border: 'none', color: '#0A58CA',
                    fontSize: '14px', fontWeight: 500, cursor: 'pointer',
                    padding: '9px 4px', whiteSpace: 'nowrap',
                  }}
                >
                  Reset
                </button>
              </div>
            </div>
          </div>

          {/* Data table */}
          <div style={{
            backgroundColor: '#fff', borderRadius: '12px',
            border: '1px solid #e9ecef', overflow: 'hidden',
            boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
          }}>
            {loading ? (
              <div style={{ textAlign: 'center', padding: '60px 0', color: '#6c757d' }}>
                <div style={{ fontSize: '32px', marginBottom: '12px' }}>⏳</div>
                <p style={{ margin: 0 }}>Đang tải dữ liệu...</p>
              </div>
            ) : rooms.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '60px 0', color: '#6c757d' }}>
                <div style={{ fontSize: '40px', marginBottom: '12px' }}>🏠</div>
                <p style={{ margin: 0, fontSize: '15px' }}>Không có dữ liệu phòng</p>
              </div>
            ) : (
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ backgroundColor: '#f8f9fa', borderBottom: '1px solid #e9ecef' }}>
                      {[
                        'Mã phòng', 'Khu/Tầng', 'Loại/Sức chứa',
                        'Giá thuê', 'Trạng thái', 'Số giường trống', 'Thao tác',
                      ].map((col) => (
                        <th
                          key={col}
                          style={{
                            padding: '13px 16px', textAlign: 'left',
                            fontSize: '12px', fontWeight: 600,
                            color: '#6c757d', letterSpacing: '0.5px',
                            textTransform: 'uppercase', whiteSpace: 'nowrap',
                          }}
                        >
                          {col}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {rooms.map((room, idx) => (
                      <tr
                        key={room.maPhong ?? idx}
                        style={{
                          borderBottom: '1px solid #f1f3f5',
                          transition: 'background-color 0.1s ease',
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#fafbfc'}
                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                      >
                        {/* Mã phòng */}
                        <td style={tdStyle}>
                          <span style={{ fontWeight: 600, color: '#212529' }}>
                            {room.maPhong}
                          </span>
                        </td>

                        {/* Khu/Tầng */}
                        <td style={tdStyle}>
                          <div style={{ color: '#495057', fontSize: '14px' }}>
                            {room.khu ? `Khu ${room.khu}` : '—'}
                          </div>
                          <div style={{ color: '#adb5bd', fontSize: '12px', marginTop: '2px' }}>
                            {room.tang ? `Tầng ${room.tang}` : '—'}
                          </div>
                        </td>

                        {/* Loại/Sức chứa */}
                        <td style={tdStyle}>
                          <div style={{ color: '#495057', fontSize: '14px' }}>
                            {room.loaiPhong ?? '—'}
                          </div>
                          <div style={{ color: '#adb5bd', fontSize: '12px', marginTop: '2px' }}>
                            {room.sucChua ? `${room.sucChua} giường` : '—'}
                          </div>
                        </td>

                        {/* Giá thuê */}
                        <td style={tdStyle}>
                          <span style={{ color: '#0A58CA', fontWeight: 500 }}>
                            {formatCurrency(room.giaThue)}
                          </span>
                        </td>

                        {/* Trạng thái */}
                        <td style={tdStyle}>
                          {renderStatusBadge(room.trangThai)}
                        </td>

                        {/* Số giường trống */}
                        <td style={tdStyle}>
                          <span style={{
                            fontWeight: 600,
                            color: room.soGiuongTrong > 0 ? '#198754' : '#dc3545',
                          }}>
                            {room.soGiuongTrong ?? '—'}
                          </span>
                          {room.sucChua && (
                            <span style={{ color: '#adb5bd', fontSize: '12px', marginLeft: '4px' }}>
                              / {room.sucChua}
                            </span>
                          )}
                        </td>

                        {/* Thao tác */}
                        <td style={tdStyle}>
                          <button
                            onClick={() => openEditDrawer(room)}
                            title="Chỉnh sửa"
                            style={{
                              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                              width: '32px', height: '32px', borderRadius: '8px',
                              border: '1px solid #dee2e6', backgroundColor: '#fff',
                              cursor: 'pointer', color: '#0A58CA',
                              transition: 'background-color 0.15s ease',
                            }}
                            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#e8f0fe'}
                            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#fff'}
                          >
                            <FiEdit2 size={14} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Row count */}
          {!loading && rooms.length > 0 && (
            <p style={{ margin: '12px 0 0', fontSize: '13px', color: '#6c757d' }}>
              Hiển thị <strong>{rooms.length}</strong> phòng
            </p>
          )}
        </main>
      </div>

      {/* Add / Edit Drawer */}
      <Drawer
        isOpen={drawerOpen}
        onClose={closeDrawer}
        title={editingRoom ? 'Chỉnh sửa phòng' : 'Thêm phòng mới'}
        footer={
          <>
            <Button variant="secondary" onClick={closeDrawer} disabled={saving}>
              Hủy
            </Button>
            <Button variant="primary" onClick={handleSave} loading={saving}>
              {editingRoom ? 'Lưu thay đổi' : 'Thêm phòng'}
            </Button>
          </>
        }
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Mã phòng */}
          <Input
            label="Mã phòng"
            name="maPhong"
            value={form.maPhong}
            onChange={handleFormChange}
            placeholder="VD: A101"
            required
            disabled={!!editingRoom}
            error={formErrors.maPhong}
          />

          {/* Khu/Tòa */}
          <Input
            label="Khu/Tòa"
            type="select"
            name="khu"
            value={form.khu}
            onChange={handleFormChange}
            placeholder="-- Chọn khu --"
            required
            error={formErrors.khu}
            options={[
              { value: 'A', label: 'Khu A' },
              { value: 'B', label: 'Khu B' },
              { value: 'C', label: 'Khu C' },
            ]}
          />

          {/* Tầng */}
          <Input
            label="Tầng"
            type="number"
            name="tang"
            value={form.tang}
            onChange={handleFormChange}
            placeholder="VD: 3"
            required
            error={formErrors.tang}
            min={1}
            max={20}
          />

          {/* Sức chứa */}
          <Input
            label="Sức chứa (số giường)"
            type="number"
            name="sucChua"
            value={form.sucChua}
            onChange={handleFormChange}
            placeholder="VD: 4"
            required
            error={formErrors.sucChua}
            min={1}
            max={20}
          />

          {/* Giá thuê */}
          <Input
            label="Giá thuê (VND/tháng)"
            type="number"
            name="giaThue"
            value={form.giaThue}
            onChange={handleFormChange}
            placeholder="VD: 1500000"
            required
            error={formErrors.giaThue}
            min={0}
          />

          {/* Trạng thái */}
          <Input
            label="Trạng thái"
            type="select"
            name="trangThai"
            value={form.trangThai}
            onChange={handleFormChange}
            options={TRANG_THAI_OPTIONS.filter((o) => o.value !== '')}
          />

          {/* Ghi chú */}
          <Input
            label="Ghi chú"
            type="textarea"
            name="ghiChu"
            value={form.ghiChu}
            onChange={handleFormChange}
            placeholder="Ghi chú thêm về phòng..."
            rows={4}
          />
        </div>
      </Drawer>
    </div>
  );
};

/* ─────────────────────────────────────────────
   Shared cell style
───────────────────────────────────────────── */
const tdStyle = {
  padding: '14px 16px',
  fontSize: '14px',
  color: '#495057',
  verticalAlign: 'middle',
};

export default RoomInventory;
