import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FiAlertTriangle, FiCheck, FiX, FiPlus, FiTrash2 } from 'react-icons/fi';
import toast from 'react-hot-toast';
import Sidebar from '../components/layout/Sidebar';
import Topbar from '../components/layout/Topbar';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import { getCheckoutById, startInspection, completeInspection, addDamage } from '../services/checkoutService';
import { formatCurrency, formatDate } from '../utils/formatters';

const LOAI_PHI_OPTIONS = [
  { value: 'DIEN', label: 'Tiền điện' },
  { value: 'NUOC', label: 'Tiền nước' },
  { value: 'DICH_VU', label: 'Phí dịch vụ' },
  { value: 'HU_HONG', label: 'Hư hỏng tài sản' },
  { value: 'PHAT', label: 'Tiền phạt' },
  { value: 'NO_TIEN_PHONG', label: 'Nợ tiền phòng' },
];

const INSPECTION_ITEMS = [
  'Vệ sinh phòng',
  'Tình trạng tài sản',
  'Chìa khóa / thẻ từ',
  'Hóa đơn điện nước',
  'Vi phạm nội quy',
];

const TINH_TRANG_PHONG = [
  { value: 'GOOD', label: 'Tốt - không hư hỏng' },
  { value: 'DIRTY', label: 'Dơ bẩn - cần dọn vệ sinh' },
  { value: 'DAMAGED', label: 'Hư hỏng nhẹ' },
  { value: 'SEVERELY_DAMAGED', label: 'Hư hỏng nặng' },
];

export default function CheckoutInspection() {
  const location = useLocation();
  const navigate = useNavigate();
  const maTra = location.state?.maTra;
  const [traPhong, setTraPhong] = useState(null);
  const [loading, setLoading] = useState(true);
  const [results, setResults] = useState({});
  const [tinhTrangPhong, setTinhTrangPhong] = useState('GOOD');
  const [ghiChu, setGhiChu] = useState('');
  const [damages, setDamages] = useState([]);
  const [newDamage, setNewDamage] = useState({ loaiPhi: 'HU_HONG', soTien: '', ghiChu: '' });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!maTra) { navigate('/checkout'); return; }
    getCheckoutById(maTra).then(r => {
      setTraPhong(r.data);
      setDamages(r.data?.chiTietKhauTrus || []);
      if (r.data?.TrangThai === 'PENDING') startInspection(maTra);
    }).catch(() => toast.error('Không thể tải thông tin trả phòng'))
      .finally(() => setLoading(false));
  }, [maTra]);

  const handleAddDamage = async () => {
    if (!newDamage.soTien || !newDamage.ghiChu) { toast.error('Điền đủ thông tin khấu trừ'); return; }
    try {
      const res = await addDamage(maTra, { ...newDamage, soTien: Number(newDamage.soTien) });
      setDamages(d => [...d, res.data]);
      setNewDamage({ loaiPhi: 'HU_HONG', soTien: '', ghiChu: '' });
      toast.success('Đã thêm khoản khấu trừ');
    } catch { toast.error('Thêm thất bại'); }
  };

  const handleComplete = async () => {
    const unchecked = INSPECTION_ITEMS.filter(item => !results[item]);
    if (unchecked.length > 0) { toast.error(`Chưa kiểm tra: ${unchecked.join(', ')}`); return; }
    setSubmitting(true);
    try {
      await completeInspection(maTra, { tinhTrangPhong, ngayTraThucTe: new Date().toISOString().split('T')[0], ghiChu });
      toast.success('✅ Hoàn tất kiểm tra phòng!');
      navigate('/settlement', { state: { maTra } });
    } catch (err) { toast.error(err?.message || 'Lỗi hoàn tất kiểm tra'); }
    finally { setSubmitting(false); }
  };

  const tongKhauTru = damages.reduce((s, d) => s + Number(d.SoTien || 0), 0);
  const soTienCoc = traPhong?.hopDong?.datCoc?.SoTienCoc || 0;

  if (loading) return <div className="app-layout"><Sidebar /><div className="app-content"><Topbar /><main className="main-content"><div className="skeleton" style={{ height: 400 }} /></main></div></div>;

  return (
    <div className="app-layout">
      <Sidebar />
      <div className="app-content">
        <Topbar title="Kiểm tra trả phòng" />
        <main className="main-content">
          <h1 style={{ fontSize: 22, fontWeight: 700, marginBottom: 20 }}>
            Kiểm tra hiện trạng trả phòng · <span style={{ color: '#6C757D', fontSize: 16 }}>{maTra}</span>
          </h1>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>

            {/* LEFT: Checklist */}
            <div>
              <div className="card" style={{ marginBottom: 16 }}>
                <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 16 }}>Thông tin hợp đồng</h3>
                {traPhong && (
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, fontSize: 14 }}>
                    <div><span style={{ color: '#6C757D' }}>Mã HD:</span> <strong>{traPhong.MaHopDong}</strong></div>
                    <div><span style={{ color: '#6C757D' }}>Phòng:</span> <strong>{traPhong.hopDong?.phong?.MaPhong}</strong></div>
                    <div><span style={{ color: '#6C757D' }}>Tiền cọc gốc:</span> <strong style={{ color: '#0A58CA' }}>{formatCurrency(soTienCoc)}</strong></div>
                    <div><span style={{ color: '#6C757D' }}>Ngày trả DK:</span> <strong>{formatDate(traPhong.NgayTraDuKien)}</strong></div>
                  </div>
                )}
              </div>

              <div className="card" style={{ marginBottom: 16 }}>
                <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 16 }}>📋 Checklist kiểm tra</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {INSPECTION_ITEMS.map(item => (
                    <div key={item} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 14px', background: '#F8F9FA', borderRadius: 8, border: `1px solid ${results[item] ? (results[item] === 'DAT' ? '#198754' : '#DC3545') : '#E5E7EB'}` }}>
                      <span style={{ fontSize: 14, fontWeight: 500 }}>{item}</span>
                      <div style={{ display: 'flex', gap: 6 }}>
                        <button onClick={() => setResults(r => ({ ...r, [item]: 'DAT' }))}
                          style={{ background: results[item] === 'DAT' ? '#198754' : '#fff', color: results[item] === 'DAT' ? '#fff' : '#198754', border: '1px solid #198754', borderRadius: 6, padding: '4px 10px', cursor: 'pointer', fontSize: 12, fontWeight: 600 }}>
                          ✓ Đạt
                        </button>
                        <button onClick={() => setResults(r => ({ ...r, [item]: 'KHONG_DAT' }))}
                          style={{ background: results[item] === 'KHONG_DAT' ? '#DC3545' : '#fff', color: results[item] === 'KHONG_DAT' ? '#fff' : '#DC3545', border: '1px solid #DC3545', borderRadius: 6, padding: '4px 10px', cursor: 'pointer', fontSize: 12, fontWeight: 600 }}>
                          ✗ Không đạt
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="card">
                <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 12 }}>Kết quả tổng thể</h3>
                <div className="form-group">
                  <label className="form-label">Tình trạng phòng</label>
                  <select className="form-control" value={tinhTrangPhong} onChange={e => setTinhTrangPhong(e.target.value)}>
                    {TINH_TRANG_PHONG.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Ghi chú</label>
                  <textarea className="form-control" rows={3} value={ghiChu} onChange={e => setGhiChu(e.target.value)} placeholder="Ghi chú thêm về tình trạng phòng..." />
                </div>
                <Button variant="primary" fullWidth loading={submitting} onClick={handleComplete}>
                  <FiCheck size={16} style={{ marginRight: 6 }} /> Hoàn tất kiểm tra → Quyết toán
                </Button>
              </div>
            </div>

            {/* RIGHT: Damages */}
            <div>
              <div className="card" style={{ marginBottom: 16 }}>
                <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 16 }}>💸 Ghi nhận khấu trừ</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 16 }}>
                  <select className="form-control" value={newDamage.loaiPhi} onChange={e => setNewDamage(d => ({ ...d, loaiPhi: e.target.value }))}>
                    {LOAI_PHI_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                  </select>
                  <input className="form-control" type="number" placeholder="Số tiền (VND)..." value={newDamage.soTien}
                    onChange={e => setNewDamage(d => ({ ...d, soTien: e.target.value }))} />
                  <input className="form-control" placeholder="Mô tả / ghi chú..." value={newDamage.ghiChu}
                    onChange={e => setNewDamage(d => ({ ...d, ghiChu: e.target.value }))} />
                  <Button variant="outline" onClick={handleAddDamage}><FiPlus size={14} style={{ marginRight: 6 }} />Thêm khoản khấu trừ</Button>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 8, maxHeight: 260, overflowY: 'auto' }}>
                  {damages.length === 0 && <div style={{ color: '#6C757D', textAlign: 'center', padding: 20 }}>Chưa có khoản khấu trừ</div>}
                  {damages.map((d, i) => (
                    <div key={i} style={{ background: '#FFF2F2', borderRadius: 8, padding: '8px 12px', border: '1px solid #DC3545', display: 'flex', justifyContent: 'space-between' }}>
                      <div style={{ fontSize: 13 }}>
                        <div style={{ fontWeight: 600 }}>{LOAI_PHI_OPTIONS.find(o => o.value === d.LoaiPhi)?.label}</div>
                        <div style={{ color: '#6C757D' }}>{d.GhiChu}</div>
                      </div>
                      <strong style={{ color: '#DC3545' }}>-{formatCurrency(d.SoTien)}</strong>
                    </div>
                  ))}
                </div>
              </div>

              {/* Summary */}
              <div className="card" style={{ background: 'linear-gradient(135deg, #F0F7FF 0%, #E8F4FD 100%)', border: '2px solid #0A58CA' }}>
                <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 16, color: '#0A58CA' }}>📊 Tóm tắt quyết toán sơ bộ</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14 }}>
                    <span>Tiền cọc gốc:</span>
                    <strong>{formatCurrency(soTienCoc)}</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14, color: '#DC3545' }}>
                    <span>Tổng khấu trừ:</span>
                    <strong>-{formatCurrency(tongKhauTru)}</strong>
                  </div>
                  <div style={{ borderTop: '2px solid #0A58CA', paddingTop: 10, display: 'flex', justifyContent: 'space-between', fontSize: 16 }}>
                    <strong>Dự kiến hoàn trả:</strong>
                    <strong style={{ color: soTienCoc - tongKhauTru > 0 ? '#198754' : '#DC3545' }}>
                      {formatCurrency(Math.max(0, soTienCoc - tongKhauTru))}
                    </strong>
                  </div>
                  {soTienCoc - tongKhauTru < 0 && (
                    <div style={{ background: '#FFF2F2', borderRadius: 6, padding: 8, fontSize: 13, color: '#DC3545', textAlign: 'center' }}>
                      ⚠️ Khách cần thanh toán thêm: {formatCurrency(Math.abs(soTienCoc - tongKhauTru))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
