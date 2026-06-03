import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiSearch, FiPlus, FiRefreshCw, FiArrowRight } from 'react-icons/fi';
import toast from 'react-hot-toast';
import Sidebar from '../components/layout/Sidebar';
import Topbar from '../components/layout/Topbar';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import { getCheckoutRequests, createCheckout } from '../services/checkoutService';
import { getContracts } from '../services/contractService';
import { formatDate, formatDateTime, checkoutStatusConfig } from '../utils/formatters';

export default function CheckoutRequest() {
  const navigate = useNavigate();
  const [checkouts, setCheckouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [foundContract, setFoundContract] = useState(null);
  const [searching, setSearching] = useState(false);
  const [form, setForm] = useState({ ngayTraDuKien: '', lyDo: '', ghiChu: '' });
  const [submitting, setSubmitting] = useState(false);

  const fetchCheckouts = async () => {
    setLoading(true);
    try {
      const res = await getCheckoutRequests({});
      setCheckouts(res.data?.checkouts || res.data || []);
    } catch { toast.error('Không thể tải danh sách'); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchCheckouts(); }, []);

  const handleSearch = async () => {
    if (!searchKeyword.trim()) return;
    setSearching(true);
    try {
      const res = await getContracts({ search: searchKeyword });
      const list = res.data?.contracts || [];
      const active = list.find(c => c.TinhTrang === 'ACTIVE');
      if (active) { setFoundContract(active); toast.success('Tìm thấy hợp đồng!'); }
      else { setFoundContract(null); toast.error('Không tìm thấy hợp đồng đang hoạt động'); }
    } catch { toast.error('Lỗi tìm kiếm'); }
    finally { setSearching(false); }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!foundContract) { toast.error('Vui lòng tìm và chọn hợp đồng'); return; }
    if (!form.ngayTraDuKien || !form.lyDo) { toast.error('Vui lòng điền đủ thông tin'); return; }
    setSubmitting(true);
    try {
      await createCheckout({ maHopDong: foundContract.MaHopDong, ...form });
      toast.success('✅ Tạo yêu cầu trả phòng thành công');
      setFoundContract(null); setSearchKeyword(''); setForm({ ngayTraDuKien: '', lyDo: '', ghiChu: '' });
      fetchCheckouts();
    } catch (err) { toast.error(err?.message || 'Tạo thất bại'); }
    finally { setSubmitting(false); }
  };

  const statusVariant = (s) => {
    if (s === 'PENDING') return 'pending';
    if (s === 'INSPECTING') return 'info';
    if (s === 'COMPLETED') return 'available';
    return 'secondary';
  };

  return (
    <div className="app-layout">
      <Sidebar />
      <div className="app-content">
        <Topbar title="Trả phòng" />
        <main className="main-content">
          <h1 style={{ fontSize: 22, fontWeight: 700, marginBottom: 20 }}>Yêu cầu trả phòng</h1>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>

            {/* LEFT: Form */}
            <div className="card">
              <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 16, borderBottom: '1px solid #E5E7EB', paddingBottom: 12 }}>
                Thông tin yêu cầu trả phòng
              </h3>
              {/* Search */}
              <div className="form-group">
                <label className="form-label">Tìm hợp đồng (mã HD hoặc SĐT)</label>
                <div style={{ display: 'flex', gap: 8 }}>
                  <input className="form-control" placeholder="Nhập mã HD hoặc số điện thoại..." value={searchKeyword}
                    onChange={e => setSearchKeyword(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && handleSearch()} />
                  <Button variant="primary" loading={searching} onClick={handleSearch}>
                    <FiSearch size={16} />
                  </Button>
                </div>
              </div>

              {/* Found contract */}
              {foundContract && (
                <div style={{ background: '#F0FFF4', border: '1px solid #198754', borderRadius: 8, padding: 12, marginBottom: 16, fontSize: 14 }}>
                  <div style={{ fontWeight: 600, color: '#198754', marginBottom: 6 }}>✅ Tìm thấy hợp đồng</div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6 }}>
                    <div><span style={{ color: '#6C757D' }}>Mã HD:</span> <strong>{foundContract.MaHopDong}</strong></div>
                    <div><span style={{ color: '#6C757D' }}>Phòng:</span> <strong>{foundContract.phong?.MaPhong}</strong></div>
                    <div><span style={{ color: '#6C757D' }}>Khách:</span> <strong>{foundContract.nhom?.daiDien?.HoTen}</strong></div>
                    <div><span style={{ color: '#6C757D' }}>Trạng thái:</span> <Badge variant="available">Đang hiệu lực</Badge></div>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label className="form-label">Ngày trả dự kiến *</label>
                  <input type="date" className="form-control" value={form.ngayTraDuKien} disabled={!foundContract}
                    min={new Date().toISOString().split('T')[0]}
                    onChange={e => setForm(f => ({ ...f, ngayTraDuKien: e.target.value }))} required />
                </div>
                <div className="form-group">
                  <label className="form-label">Lý do trả phòng *</label>
                  <textarea className="form-control" rows={3} disabled={!foundContract} value={form.lyDo}
                    placeholder="Nhập lý do trả phòng..." required
                    onChange={e => setForm(f => ({ ...f, lyDo: e.target.value }))} />
                </div>
                <div className="form-group">
                  <label className="form-label">Ghi chú thêm</label>
                  <textarea className="form-control" rows={2} disabled={!foundContract} value={form.ghiChu}
                    placeholder="Tùy chọn..."
                    onChange={e => setForm(f => ({ ...f, ghiChu: e.target.value }))} />
                </div>
                <div style={{ display: 'flex', gap: 8 }}>
                  <Button type="submit" variant="primary" loading={submitting} disabled={!foundContract} fullWidth>
                    <FiPlus size={16} style={{ marginRight: 6 }} /> Lưu yêu cầu
                  </Button>
                  <Button type="button" variant="outline" onClick={() => { setFoundContract(null); setForm({ ngayTraDuKien: '', lyDo: '', ghiChu: '' }); }}>
                    Hủy
                  </Button>
                </div>
              </form>
            </div>

            {/* RIGHT: List */}
            <div className="card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                <h3 style={{ fontSize: 16, fontWeight: 600, margin: 0 }}>Danh sách yêu cầu trả phòng</h3>
                <button onClick={fetchCheckouts} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#6C757D' }}>
                  <FiRefreshCw size={16} />
                </button>
              </div>
              {loading ? (
                Array(3).fill(0).map((_, i) => <div key={i} className="skeleton" style={{ height: 80, marginBottom: 8, borderRadius: 8 }} />)
              ) : checkouts.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '40px 0', color: '#6C757D' }}>Chưa có yêu cầu nào</div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10, maxHeight: 500, overflowY: 'auto' }}>
                  {checkouts.map(co => (
                    <div key={co.MaTra} style={{ background: '#F8F9FA', borderRadius: 8, padding: 12, border: '1px solid #E5E7EB' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <div style={{ fontSize: 14 }}>
                          <div style={{ fontWeight: 600, marginBottom: 4 }}>{co.MaTra} · {co.hopDong?.nhom?.daiDien?.HoTen || '—'}</div>
                          <div style={{ color: '#6C757D', fontSize: 12 }}>
                            Phòng {co.hopDong?.phong?.MaPhong} · Yêu cầu: {formatDate(co.NgayYeuCau)}
                          </div>
                          <div style={{ color: '#6C757D', fontSize: 12 }}>
                            Dự kiến trả: {formatDate(co.NgayTraDuKien)}
                          </div>
                        </div>
                        <Badge variant={statusVariant(co.TrangThai)}>
                          {checkoutStatusConfig[co.TrangThai]?.label || co.TrangThai}
                        </Badge>
                      </div>
                      {co.TrangThai !== 'COMPLETED' && (
                        <button className="btn btn-outline" style={{ marginTop: 8, width: '100%', fontSize: 12 }}
                          onClick={() => navigate('/checkout/inspect', { state: { maTra: co.MaTra } })}>
                          Xử lý <FiArrowRight size={12} />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
