import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import Sidebar from '../components/layout/Sidebar';
import Topbar from '../components/layout/Topbar';
import Button from '../components/ui/Button';
import { createInvoice } from '../services/invoiceService';
import { formatCurrency, formatDateTime } from '../utils/formatters';

const LOAI_GD_OPTIONS = [
  { value: 'DEPOSIT', label: 'Đặt cọc' },
  { value: 'MONTHLY_RENT', label: 'Tiền phòng tháng' },
  { value: 'SERVICE', label: 'Phí dịch vụ' },
  { value: 'PENALTY', label: 'Phạt vi phạm' },
  { value: 'REFUND', label: 'Hoàn cọc' },
];

const PAYMENT_METHODS = [
  { value: 'TIEN_MAT', label: 'Tiền mặt' },
  { value: 'CHUYEN_KHOAN', label: 'Chuyển khoản' },
  { value: 'THE', label: 'Thẻ ngân hàng' },
];

export default function InvoiceGenerator() {
  const navigate = useNavigate();
  const location = useLocation();
  const [params] = useSearchParams();
  const [form, setForm] = useState({
    loaiThanhToan: params.get('loai') || 'MONTHLY_RENT',
    maHopDong: params.get('maHD') || location.state?.maHopDong || '',
    maCoc: params.get('maCoc') || location.state?.maCoc || '',
    tenKhachHang: location.state?.tenKhach || '',
    phong: location.state?.phong || '',
    soTien: location.state?.soTien || '',
    ngayPhatHanh: new Date().toISOString().split('T')[0],
    hanThanhToan: '',
    ghiChu: '',
    phuongThuc: 'TIEN_MAT',
  });
  const [submitting, setSubmitting] = useState(false);
  const invoiceNum = `HD-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 99999) + 1).padStart(5, '0')}`;

  const setField = (key, val) => setForm(f => ({ ...f, [key]: val }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.soTien || Number(form.soTien) <= 0) { toast.error('Số tiền phải lớn hơn 0'); return; }
    setSubmitting(true);
    try {
      await createInvoice({
        maHopDong: form.maHopDong || null,
        maCoc: form.maCoc || null,
        soTien: Number(form.soTien),
        phuongThuc: form.phuongThuc,
        loaiThanhToan: form.loaiThanhToan,
        ghiChu: form.ghiChu,
      });
      toast.success('✅ Hóa đơn đã được tạo thành công!');
      navigate('/dashboard');
    } catch (err) { toast.error(err?.message || 'Tạo hóa đơn thất bại'); }
    finally { setSubmitting(false); }
  };

  const loaiLabel = LOAI_GD_OPTIONS.find(o => o.value === form.loaiThanhToan)?.label || '';
  const isRefund = form.loaiThanhToan === 'REFUND';

  return (
    <div className="app-layout">
      <Sidebar />
      <div className="app-content">
        <Topbar title="Lập hóa đơn" />
        <main className="main-content">
          <h1 style={{ fontSize: 22, fontWeight: 700, marginBottom: 20 }}>Tạo hóa đơn thanh toán</h1>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>

            {/* LEFT: Form */}
            <form className="card" onSubmit={handleSubmit}>
              <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 20 }}>Thông tin hóa đơn</h3>
              <div className="form-group">
                <label className="form-label">Loại giao dịch *</label>
                <select className="form-control" value={form.loaiThanhToan} onChange={e => setField('loaiThanhToan', e.target.value)}>
                  {LOAI_GD_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                </select>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <div className="form-group">
                  <label className="form-label">Mã hợp đồng</label>
                  <input className="form-control" placeholder="HD-2026-..." value={form.maHopDong} onChange={e => setField('maHopDong', e.target.value)} />
                </div>
                <div className="form-group">
                  <label className="form-label">Mã cọc</label>
                  <input className="form-control" placeholder="COC-..." value={form.maCoc} onChange={e => setField('maCoc', e.target.value)} />
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Tên khách hàng *</label>
                <input className="form-control" required placeholder="Nguyễn Văn A..." value={form.tenKhachHang} onChange={e => setField('tenKhachHang', e.target.value)} />
              </div>
              <div className="form-group">
                <label className="form-label">Phòng</label>
                <input className="form-control" placeholder="P101..." value={form.phong} onChange={e => setField('phong', e.target.value)} />
              </div>
              <div className="form-group">
                <label className="form-label">Số tiền (VND) *</label>
                <input className="form-control" type="number" required min={1} placeholder="0" value={form.soTien} onChange={e => setField('soTien', e.target.value)} />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <div className="form-group">
                  <label className="form-label">Ngày phát hành</label>
                  <input type="date" className="form-control" value={form.ngayPhatHanh} onChange={e => setField('ngayPhatHanh', e.target.value)} />
                </div>
                <div className="form-group">
                  <label className="form-label">Phương thức</label>
                  <select className="form-control" value={form.phuongThuc} onChange={e => setField('phuongThuc', e.target.value)}>
                    {PAYMENT_METHODS.map(m => <option key={m.value} value={m.value}>{m.label}</option>)}
                  </select>
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Ghi chú</label>
                <textarea className="form-control" rows={2} value={form.ghiChu} onChange={e => setField('ghiChu', e.target.value)} />
              </div>
              <div style={{ display: 'flex', gap: 8 }}>
                <Button type="submit" variant="primary" loading={submitting} fullWidth>🧾 Tạo hóa đơn</Button>
                <Button type="button" variant="outline" onClick={() => navigate(-1)}>Hủy</Button>
              </div>
            </form>

            {/* RIGHT: Preview */}
            <div>
              <div style={{ border: '2px dashed #0A58CA', borderRadius: 12, padding: 24, background: '#F8FBFF' }}>
                <div style={{ textAlign: 'center', marginBottom: 16 }}>
                  <div style={{ fontSize: 20, fontWeight: 800, color: '#0A58CA' }}>🏠 HomeStay Dorm</div>
                  <div style={{ fontSize: 18, fontWeight: 700, textTransform: 'uppercase', marginTop: 4 }}>
                    {isRefund ? 'Phiếu hoàn cọc' : 'Hóa đơn thanh toán'}
                  </div>
                  <div style={{ fontSize: 12, color: '#6C757D', marginTop: 4 }}>Số: {invoiceNum}</div>
                </div>
                <hr style={{ borderColor: '#E5E7EB', margin: '12px 0' }} />
                <div style={{ fontSize: 13, display: 'flex', flexDirection: 'column', gap: 8 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: '#6C757D' }}>Khách hàng:</span>
                    <strong>{form.tenKhachHang || '—'}</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: '#6C757D' }}>Mã hợp đồng:</span>
                    <span>{form.maHopDong || '—'}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: '#6C757D' }}>Phòng:</span>
                    <span>{form.phong || '—'}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: '#6C757D' }}>Ngày lập:</span>
                    <span>{form.ngayPhatHanh}</span>
                  </div>
                </div>
                <hr style={{ borderColor: '#E5E7EB', margin: '12px 0' }} />
                <table style={{ width: '100%', fontSize: 13 }}>
                  <thead>
                    <tr style={{ borderBottom: '1px solid #E5E7EB' }}>
                      <th style={{ textAlign: 'left', padding: '6px 0', color: '#6C757D' }}>Diễn giải</th>
                      <th style={{ textAlign: 'right', padding: '6px 0', color: '#6C757D' }}>Số tiền</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td style={{ padding: '8px 0' }}>{loaiLabel || 'Thanh toán'}</td>
                      <td style={{ textAlign: 'right', fontWeight: 600, color: isRefund ? '#198754' : '#DC3545' }}>
                        {isRefund ? '+' : ''}{formatCurrency(form.soTien || 0)}
                      </td>
                    </tr>
                  </tbody>
                </table>
                <hr style={{ borderColor: '#E5E7EB', margin: '12px 0' }} />
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 16, fontWeight: 700 }}>
                  <span>TỔNG CỘNG:</span>
                  <span style={{ color: isRefund ? '#198754' : '#0A58CA' }}>{formatCurrency(form.soTien || 0)}</span>
                </div>
                <div style={{ textAlign: 'center', marginTop: 16, fontSize: 12, color: '#6C757D' }}>
                  Cảm ơn quý khách đã sử dụng dịch vụ HomeStay Dorm! 🙏
                </div>
              </div>
              <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
                <Button variant="outline" fullWidth>📥 Tải PDF</Button>
                <Button variant="outline" fullWidth>📧 Gửi email</Button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
