import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiCheck, FiX, FiClock, FiAlertTriangle } from 'react-icons/fi';
import toast from 'react-hot-toast';
import Sidebar from '../components/layout/Sidebar';
import Topbar from '../components/layout/Topbar';
import DataTable from '../components/ui/DataTable';
import Modal from '../components/ui/Modal';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import { getDeposits, confirmDeposit } from '../services/depositService';
import { formatCurrency, formatDateTime, depositStatusConfig } from '../utils/formatters';

const PAYMENT_METHODS = [
  { value: 'TIEN_MAT', label: 'Tiền mặt' },
  { value: 'CHUYEN_KHOAN', label: 'Chuyển khoản ngân hàng' },
  { value: 'THE', label: 'Thẻ ngân hàng' },
];

export default function DepositPayment() {
  const navigate = useNavigate();
  const [deposits, setDeposits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({ tinhTrang: 'PENDING_PAYMENT', search: '' });
  const [selected, setSelected] = useState(null);
  const [confirmForm, setConfirmForm] = useState({ phuongThuc: 'TIEN_MAT', ngayThanhToan: new Date().toISOString().split('T')[0], maSoChungTu: '', ghiChu: '' });
  const [submitting, setSubmitting] = useState(false);

  const fetchDeposits = async () => {
    setLoading(true);
    try {
      const res = await getDeposits(filters);
      // api.js interceptor returns response.data directly,
      // so res = { success, message, data: [...] }
      const list = Array.isArray(res?.data) ? res.data : Array.isArray(res) ? res : [];
      setDeposits(list);
    } catch (err) {
      toast.error(err?.message || 'Không thể tải danh sách đặt cọc');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchDeposits(); }, [filters.tinhTrang]);

  const handleConfirm = async () => {
    if (!selected) return;
    setSubmitting(true);
    try {
      await confirmDeposit(selected.MaCoc, confirmForm);
      toast.success('✅ Xác nhận thanh toán cọc thành công! Phòng đã chuyển sang RESERVED.');
      setSelected(null);
      fetchDeposits();
    } catch (err) {
      toast.error(err?.message || 'Xác nhận thất bại');
    } finally {
      setSubmitting(false);
    }
  };

  const columns = [
    { key: 'MaCoc', title: 'Mã cọc', width: 120 },
    { key: 'khachHang', title: 'Khách hàng', render: (row) => row.khachHang?.HoTen || '—' },
    { key: 'phong', title: 'Phòng', render: (row) => row.phong?.MaPhong || row.giuong?.MaGiuong || '—' },
    { key: 'SoTienCoc', title: 'Số tiền cọc', render: (row) => <strong style={{ color: '#0A58CA' }}>{formatCurrency(row.SoTienCoc)}</strong> },
    { key: 'NgayDatCoc', title: 'Ngày đặt', render: (row) => formatDateTime(row.NgayDatCoc) },
    { key: 'ThoiGianHetHan', title: 'Hạn thanh toán', render: (row) => {
      const expired = new Date(row.ThoiGianHetHan) < new Date();
      return <span style={{ color: expired ? '#DC3545' : '#212529' }}>{formatDateTime(row.ThoiGianHetHan)}{expired && ' ⚠️'}</span>;
    }},
    { key: 'TinhTrang', title: 'Trạng thái', render: (row) => {
      const cfg = depositStatusConfig[row.TinhTrang] || { label: row.TinhTrang, color: 'secondary' };
      return <Badge variant={cfg.color}>{cfg.label}</Badge>;
    }},
    { key: 'actions', title: 'Thao tác', render: (row) => {
      if (row.TinhTrang === 'PENDING_PAYMENT') {
        return <button className="btn btn-primary" style={{ padding: '4px 12px', fontSize: 12 }} onClick={(e) => { e.stopPropagation(); setSelected(row); }}>✓ Xác nhận</button>;
      }
      if (row.TinhTrang === 'APPROVED') {
        return <span className="badge badge-available">Đã thanh toán</span>;
      }
      return <span style={{ color: '#999', fontSize: 12 }}>—</span>;
    }},
  ];

  return (
    <div className="app-layout">
      <Sidebar />
      <div className="app-content">
        <Topbar title="Quản lý đặt cọc" />
        <main className="main-content">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
            <h1 style={{ fontSize: 22, fontWeight: 700, margin: 0 }}>Danh sách đặt cọc</h1>
          </div>

          <div className="card" style={{ marginBottom: 16 }}>
            <div style={{ display: 'flex', gap: 12, alignItems: 'flex-end', flexWrap: 'wrap' }}>
              <div className="form-group" style={{ flex: '2', minWidth: 200 }}>
                <label className="form-label">Tìm kiếm</label>
                <input className="form-control" placeholder="Tên khách, mã cọc..." value={filters.search}
                  onChange={e => setFilters(f => ({ ...f, search: e.target.value }))} />
              </div>
              <div className="form-group" style={{ flex: '1', minWidth: 160 }}>
                <label className="form-label">Trạng thái</label>
                <select className="form-control" value={filters.tinhTrang}
                  onChange={e => setFilters(f => ({ ...f, tinhTrang: e.target.value }))}>
                  <option value="ALL">Tất cả</option>
                  <option value="PENDING_PAYMENT">Chờ thanh toán</option>
                  <option value="APPROVED">Đã thanh toán</option>
                  <option value="EXPIRED">Quá hạn</option>
                  <option value="CANCELLED">Đã hủy</option>
                </select>
              </div>
              <div style={{ display: 'flex', gap: 8 }}>
                <Button variant="primary" onClick={fetchDeposits}>Lọc</Button>
                <Button variant="outline" onClick={() => setFilters({ tinhTrang: 'PENDING_PAYMENT', search: '' })}>Reset</Button>
              </div>
            </div>
          </div>

          <div className="card">
            <DataTable columns={columns} data={deposits} loading={loading}
              emptyText="Không có đặt cọc nào" />
          </div>

          {/* Confirm Payment Modal */}
          <Modal isOpen={!!selected} onClose={() => setSelected(null)} title="✅ Xác nhận thanh toán cọc" size="md"
            footer={
              <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
                <Button variant="outline" onClick={() => setSelected(null)}>Hủy</Button>
                <Button variant="primary" loading={submitting} onClick={handleConfirm}>Xác nhận & Lập hóa đơn</Button>
              </div>
            }>
            {selected && (
              <div>
                <div style={{ background: '#F8F9FA', borderRadius: 8, padding: 16, marginBottom: 16 }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, fontSize: 14 }}>
                    <div><span style={{ color: '#6C757D' }}>Mã cọc:</span> <strong>{selected.MaCoc}</strong></div>
                    <div><span style={{ color: '#6C757D' }}>Phòng:</span> <strong>{selected.phong?.MaPhong || '—'}</strong></div>
                    <div><span style={{ color: '#6C757D' }}>Khách hàng:</span> <strong>{selected.khachHang?.HoTen}</strong></div>
                    <div><span style={{ color: '#6C757D' }}>Số tiền cọc:</span> <strong style={{ color: '#0A58CA' }}>{formatCurrency(selected.SoTienCoc)}</strong></div>
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label">Phương thức thanh toán *</label>
                  <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                    {PAYMENT_METHODS.map(m => (
                      <label key={m.value} style={{ display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer' }}>
                        <input type="radio" name="phuongThuc" value={m.value} checked={confirmForm.phuongThuc === m.value}
                          onChange={() => setConfirmForm(f => ({ ...f, phuongThuc: m.value }))} />
                        {m.label}
                      </label>
                    ))}
                  </div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                  <div className="form-group">
                    <label className="form-label">Ngày thanh toán *</label>
                    <input type="date" className="form-control" value={confirmForm.ngayThanhToan}
                      onChange={e => setConfirmForm(f => ({ ...f, ngayThanhToan: e.target.value }))} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Số chứng từ</label>
                    <input className="form-control" placeholder="Tùy chọn..." value={confirmForm.maSoChungTu}
                      onChange={e => setConfirmForm(f => ({ ...f, maSoChungTu: e.target.value }))} />
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label">Ghi chú</label>
                  <textarea className="form-control" rows={2} value={confirmForm.ghiChu}
                    onChange={e => setConfirmForm(f => ({ ...f, ghiChu: e.target.value }))} />
                </div>
              </div>
            )}
          </Modal>
        </main>
      </div>
    </div>
  );
}
