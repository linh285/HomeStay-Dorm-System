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
import { getDepositById } from '../services/depositService';
import { formatDate, formatDateTime, checkoutStatusConfig } from '../utils/formatters';

export default function CheckoutRequest() {
  const navigate = useNavigate();
  const [checkouts, setCheckouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [foundContract, setFoundContract] = useState(null);
  const [foundDeposit, setFoundDeposit] = useState(null);
  const [searching, setSearching] = useState(false);
  const [form, setForm] = useState({ ngayTraDuKien: '', lyDo: '', ghiChu: '' });
  const [submitting, setSubmitting] = useState(false);
  const [searchType, setSearchType] = useState('contract'); // 'contract' or 'deposit'

  const fetchCheckouts = async () => {
    setLoading(true);
    try {
      const res = await getCheckoutRequests({});
      const checkoutList = Array.isArray(res?.data?.checkouts) ? res.data.checkouts : [];
      setCheckouts(checkoutList);
    } catch (err) {
      console.error('Lỗi khi tải danh sách trả phòng:', err);
      toast.error('Không thể tải danh sách');
      setCheckouts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchCheckouts(); }, []);

  const handleSearch = async () => {
    if (!searchKeyword.trim()) return;
    setSearching(true);
    setFoundContract(null);
    setFoundDeposit(null);
    try {
      if (searchType === 'contract') {
        const res = await getContracts({ search: searchKeyword });
        const list = res?.data?.contracts || [];
        const active = list.find(c => c.TinhTrang === 'ACTIVE');
        if (active) {
          setFoundContract(active);
          toast.success('Tìm thấy hợp đồng!');
        } else {
          toast.error('Không tìm thấy hợp đồng đang hoạt động');
        }
      } else {
        // Tìm theo mã cọc
        const res = await getDepositById(searchKeyword);
        const deposit = res?.data;
        if (deposit && deposit.TinhTrang === 'APPROVED') {
          setFoundDeposit(deposit);
          // Nếu có deposit, tìm hợp đồng liên quan (nếu có)
          if (deposit.MaHopDong) {
            const contractRes = await getContracts({ search: deposit.MaHopDong });
            const contract = contractRes?.data?.contracts?.find(c => c.MaHopDong === deposit.MaHopDong);
            if (contract) setFoundContract(contract);
          }
          toast.success('Tìm thấy phiếu đặt cọc!');
        } else {
          toast.error('Không tìm thấy phiếu đặt cọc hợp lệ (cần có trạng thái APPROVED)');
        }
      }
    } catch {
      toast.error('Lỗi tìm kiếm');
    } finally {
      setSearching(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!foundContract) {
      toast.error('Vui lòng tìm và chọn hợp đồng (hoặc phiếu cọc có liên kết hợp đồng)');
      return;
    }
    if (!form.ngayTraDuKien || !form.lyDo) {
      toast.error('Vui lòng điền đủ thông tin');
      return;
    }
    setSubmitting(true);
    try {
      await createCheckout({ maHopDong: foundContract.MaHopDong, ...form });
      toast.success('✅ Tạo yêu cầu trả phòng thành công');
      setFoundContract(null);
      setFoundDeposit(null);
      setSearchKeyword('');
      setForm({ ngayTraDuKien: '', lyDo: '', ghiChu: '' });
      fetchCheckouts();
    } catch (err) {
      toast.error(err?.message || 'Tạo thất bại');
    } finally {
      setSubmitting(false);
    }
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
              <div className="form-group">
                <label className="form-label">Tìm theo</label>
                <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <input type="radio" name="searchType" value="contract" checked={searchType === 'contract'} onChange={() => setSearchType('contract')} />
                    Mã hợp đồng / SĐT
                  </label>
                  <label style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <input type="radio" name="searchType" value="deposit" checked={searchType === 'deposit'} onChange={() => setSearchType('deposit')} />
                    Mã phiếu đặt cọc
                  </label>
                </div>
                <div style={{ display: 'flex', gap: 8 }}>
                  <input
                    className="form-control"
                    placeholder={searchType === 'contract' ? 'Nhập mã HD hoặc SĐT...' : 'Nhập mã cọc (VD: COC-xxx)...'}
                    value={searchKeyword}
                    onChange={e => setSearchKeyword(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && handleSearch()}
                  />
                  <Button variant="primary" loading={searching} onClick={handleSearch}>
                    <FiSearch size={16} />
                  </Button>
                </div>
              </div>

              {/* Kết quả tìm thấy */}
              {foundContract && (
                <div style={{ background: '#F0FFF4', border: '1px solid #198754', borderRadius: 8, padding: 12, marginBottom: 16, fontSize: 14 }}>
                  <div style={{ fontWeight: 600, color: '#198754', marginBottom: 6 }}>✅ Tìm thấy hợp đồng</div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6 }}>
                    <div><span style={{ color: '#6C757D' }}>Mã HD:</span> <strong>{foundContract.MaHopDong}</strong></div>
                    <div><span style={{ color: '#6C757D' }}>Phòng:</span> <strong>{foundContract.phong?.MaPhong}</strong></div>
                    <div><span style={{ color: '#6C757D' }}>Khách:</span> <strong>{foundContract.nhom?.daiDien?.HoTen}</strong></div>
                    <div><span style={{ color: '#6C757D' }}>Trạng thái:</span> <Badge variant="available">Đang hiệu lực</Badge></div>
                  </div>
                  {foundDeposit && (
                    <div style={{ marginTop: 8, paddingTop: 8, borderTop: '1px solid #c6e9c6' }}>
                      <div><span style={{ color: '#6C757D' }}>Mã cọc liên quan:</span> <strong>{foundDeposit.MaCoc}</strong></div>
                      <div><span style={{ color: '#6C757D' }}>Số tiền cọc:</span> <strong>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(foundDeposit.SoTienCoc)}</strong></div>
                    </div>
                  )}
                </div>
              )}

              {foundDeposit && !foundContract && (
                <div style={{ background: '#FFF9EC', border: '1px solid #FAAD14', borderRadius: 8, padding: 12, marginBottom: 16, fontSize: 14 }}>
                  <div style={{ fontWeight: 600, color: '#A67400', marginBottom: 6 }}>⚠️ Tìm thấy phiếu cọc nhưng chưa có hợp đồng</div>
                  <div><span style={{ color: '#6C757D' }}>Mã cọc:</span> {foundDeposit.MaCoc}</div>
                  <div><span style={{ color: '#6C757D' }}>Khách hàng:</span> {foundDeposit.khachHang?.HoTen}</div>
                  <div><span style={{ color: '#6C757D' }}>Phòng:</span> {foundDeposit.phong?.MaPhong}</div>
                  <div style={{ marginTop: 8, fontSize: 13, color: '#DC3545' }}>Không thể tạo yêu cầu trả phòng vì chưa có hợp đồng chính thức.</div>
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label className="form-label">Ngày trả dự kiến *</label>
                  <input
                    type="date"
                    className="form-control"
                    value={form.ngayTraDuKien}
                    disabled={!foundContract}
                    min={new Date().toISOString().split('T')[0]}
                    onChange={e => setForm(f => ({ ...f, ngayTraDuKien: e.target.value }))}
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Lý do trả phòng *</label>
                  <textarea
                    className="form-control"
                    rows={3}
                    disabled={!foundContract}
                    value={form.lyDo}
                    placeholder="Nhập lý do trả phòng..."
                    required
                    onChange={e => setForm(f => ({ ...f, lyDo: e.target.value }))}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Ghi chú thêm</label>
                  <textarea
                    className="form-control"
                    rows={2}
                    disabled={!foundContract}
                    value={form.ghiChu}
                    placeholder="Tùy chọn..."
                    onChange={e => setForm(f => ({ ...f, ghiChu: e.target.value }))}
                  />
                </div>
                <div style={{ display: 'flex', gap: 8 }}>
                  <Button type="submit" variant="primary" loading={submitting} disabled={!foundContract} fullWidth>
                    <FiPlus size={16} style={{ marginRight: 6 }} /> Lưu yêu cầu
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => { setFoundContract(null); setFoundDeposit(null); setSearchKeyword(''); setForm({ ngayTraDuKien: '', lyDo: '', ghiChu: '' }); }}
                  >
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
                          {co.hopDong?.datCoc && (
                            <div style={{ color: '#6C757D', fontSize: 11, marginTop: 2 }}>
                              Cọc: {co.hopDong?.datCoc?.MaCoc} - {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(co.hopDong?.datCoc?.SoTienCoc)}
                            </div>
                          )}
                        </div>
                        <Badge variant={statusVariant(co.TrangThai)}>
                          {checkoutStatusConfig[co.TrangThai]?.label || co.TrangThai}
                        </Badge>
                      </div>
                      {/* ✅ SALE không thấy nút "Xử lý" - chỉ hiển thị trạng thái */}
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