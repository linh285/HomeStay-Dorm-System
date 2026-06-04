import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import Sidebar from '../components/layout/Sidebar';
import Topbar from '../components/layout/Topbar';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import Modal from '../components/ui/Modal';
import { getDeposits, confirmDeposit } from '../services/depositService';
import { formatCurrency, formatDateTime, depositStatusConfig } from '../utils/formatters';

export default function DepositPayment() {
  const navigate = useNavigate();
  const [deposits, setDeposits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);
  const [confirmForm, setConfirmForm] = useState({
    phuongThuc: 'TIEN_MAT',
    ngayThanhToan: new Date().toISOString().split('T')[0],
    maSoChungTu: '',
    ghiChu: '',
  });
  const [submitting, setSubmitting] = useState(false);

  const fetchDeposits = async () => {
    setLoading(true);
    try {
      const res = await getDeposits({});
      let list = [];
      if (Array.isArray(res)) {
        list = res;
      } else if (res?.data && Array.isArray(res.data)) {
        list = res.data;
      } else if (res?.deposits && Array.isArray(res.deposits)) {
        list = res.deposits;
      }
      setDeposits(list);
    } catch (err) {
      console.error(err);
      toast.error('Không thể tải danh sách đặt cọc');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDeposits();
  }, []);

  const handleConfirm = async () => {
    if (!selected) return;
    setSubmitting(true);
    try {
      await confirmDeposit(selected.MaCoc, confirmForm);
      toast.success('✅ Xác nhận thanh toán cọc thành công!');
      setSelected(null);
      fetchDeposits();
    } catch (err) {
      toast.error(err?.message || 'Xác nhận thất bại');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="app-layout">
        <Sidebar />
        <div className="app-content">
          <Topbar title="Quản lý đặt cọc" />
          <main className="main-content">
            <div style={{ textAlign: 'center', padding: 40 }}>Đang tải...</div>
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className="app-layout">
      <Sidebar />
      <div className="app-content">
        <Topbar title="Quản lý đặt cọc" />
        <main className="main-content">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
            <h1 style={{ fontSize: 22, fontWeight: 700, margin: 0 }}>Danh sách đặt cọc</h1>
            <Button variant="outline" onClick={fetchDeposits} size="sm">Làm mới</Button>
          </div>

          <div className="card">
            {deposits.length === 0 ? (
              <div style={{ textAlign: 'center', padding: 40, color: '#6c757d' }}>Không có dữ liệu đặt cọc</div>
            ) : (
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead style={{ backgroundColor: '#f8f9fa', borderBottom: '2px solid #e9ecef' }}>
                    <tr>
                      <th style={{ padding: '12px', textAlign: 'left' }}>Mã cọc</th>
                      <th style={{ padding: '12px', textAlign: 'left' }}>Khách hàng</th>
                      <th style={{ padding: '12px', textAlign: 'left' }}>Phòng</th>
                      <th style={{ padding: '12px', textAlign: 'right' }}>Số tiền</th>
                      <th style={{ padding: '12px', textAlign: 'left' }}>Ngày đặt</th>
                      <th style={{ padding: '12px', textAlign: 'left' }}>Hạn thanh toán</th>
                      <th style={{ padding: '12px', textAlign: 'left' }}>Trạng thái</th>
                      <th style={{ padding: '12px', textAlign: 'center' }}>Thao tác</th>
                    </tr>
                  </thead>
                  <tbody>
                    {deposits.map((row, idx) => {
                      if (!row) return null;
                      console.log('MaCoc:', row.MaCoc, 'ThoiGianHetHan:', row.ThoiGianHetHan);
                      const cfg = depositStatusConfig[row.TinhTrang] || { label: row.TinhTrang, color: 'secondary' };
                      // So sánh dựa trên chuỗi ngày (YYYY-MM-DD)
                       const expired = row.ThoiGianHetHan ? row.ThoiGianHetHan.slice(0,10) < new Date().toISOString().slice(0,10) : false;
                      return (
                        <tr key={row.MaCoc || idx} style={{ borderBottom: '1px solid #f1f3f5' }}>
                          <td style={{ padding: '12px' }}>{row.MaCoc || '—'}</td>
                          <td style={{ padding: '12px' }}>{row.khachHang?.HoTen || '—'}</td>
                          <td style={{ padding: '12px' }}>{row.phong?.MaPhong || row.giuong?.MaGiuong || '—'}</td>
                          <td style={{ padding: '12px', textAlign: 'right' }}>{formatCurrency(row.SoTienCoc)}</td>
                          <td style={{ padding: '12px' }}>{formatDateTime(row.NgayDatCoc)}</td>
                          <td style={{ padding: '12px', color: expired ? '#DC3545' : 'inherit' }}>{formatDateTime(row.ThoiGianHetHan)}</td>
                          <td style={{ padding: '12px' }}><Badge variant={cfg.color}>{cfg.label}</Badge></td>
                          <td style={{ padding: '12px', textAlign: 'center' }}>
                            {row.TinhTrang === 'PENDING_PAYMENT' && (
                              <Button variant="primary" size="sm" onClick={() => setSelected(row)}>Xác nhận</Button>
                            )}
                            {row.TinhTrang === 'APPROVED' && <Badge variant="available">Đã thanh toán</Badge>}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          <Modal isOpen={!!selected} onClose={() => setSelected(null)} title="Xác nhận thanh toán cọc" size="md"
            footer={
              <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
                <Button variant="outline" onClick={() => setSelected(null)}>Hủy</Button>
                <Button variant="primary" loading={submitting} onClick={handleConfirm}>Xác nhận</Button>
              </div>
            }
          >
            {selected && (
              <div>
                <div style={{ background: '#F8F9FA', borderRadius: 8, padding: 16, marginBottom: 16 }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, fontSize: 14 }}>
                    <div><span style={{ color: '#6C757D' }}>Mã cọc:</span> <strong>{selected.MaCoc}</strong></div>
                    <div><span style={{ color: '#6C757D' }}>Phòng:</span> <strong>{selected.phong?.MaPhong || '—'}</strong></div>
                    <div><span style={{ color: '#6C757D' }}>Khách hàng:</span> <strong>{selected.khachHang?.HoTen}</strong></div>
                    <div><span style={{ color: '#6C757D' }}>Số tiền cọc:</span> <strong>{formatCurrency(selected.SoTienCoc)}</strong></div>
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label">Phương thức thanh toán *</label>
                  <div style={{ display: 'flex', gap: 12 }}>
                    {['TIEN_MAT', 'CHUYEN_KHOAN', 'THE'].map(m => (
                      <label key={m} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                        <input type="radio" name="phuongThuc" value={m} checked={confirmForm.phuongThuc === m} onChange={() => setConfirmForm(f => ({ ...f, phuongThuc: m }))} />
                        {m === 'TIEN_MAT' ? 'Tiền mặt' : m === 'CHUYEN_KHOAN' ? 'Chuyển khoản' : 'Thẻ'}
                      </label>
                    ))}
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label">Ngày thanh toán *</label>
                  <input type="date" className="form-control" value={confirmForm.ngayThanhToan} onChange={e => setConfirmForm(f => ({ ...f, ngayThanhToan: e.target.value }))} />
                </div>
                <div className="form-group">
                  <label className="form-label">Số chứng từ</label>
                  <input className="form-control" placeholder="Tùy chọn" value={confirmForm.maSoChungTu} onChange={e => setConfirmForm(f => ({ ...f, maSoChungTu: e.target.value }))} />
                </div>
                <div className="form-group">
                  <label className="form-label">Ghi chú</label>
                  <textarea className="form-control" rows={2} value={confirmForm.ghiChu} onChange={e => setConfirmForm(f => ({ ...f, ghiChu: e.target.value }))} />
                </div>
              </div>
            )}
          </Modal>
        </main>
      </div>
    </div>
  );
}