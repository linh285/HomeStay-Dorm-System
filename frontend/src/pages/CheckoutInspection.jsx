import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FiCheck, FiArrowLeft } from 'react-icons/fi';
import toast from 'react-hot-toast';
import Sidebar from '../components/layout/Sidebar';
import Topbar from '../components/layout/Topbar';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import { getCheckoutById, startInspection, completeInspection, addDamage } from '../services/checkoutService';
import { getSettlement, confirmSettlement } from '../services/settlementService';
import { formatCurrency, formatDateTime } from '../utils/formatters';
import { useAuth } from '../hooks/useAuth';

export default function CheckoutInspection() {
  const location = useLocation();
  const navigate = useNavigate();
  const { hasRole } = useAuth();
  const maTra = location.state?.maTra;

  const [checkout, setCheckout] = useState(null);
  const [loading, setLoading] = useState(true);
  const [settlement, setSettlement] = useState(null);
  const [step, setStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const [newDamage, setNewDamage] = useState({ loaiPhi: '', soTien: '', ghiChu: '' });
  const [inspectionForm, setInspectionForm] = useState({
    tinhTrangPhong: 'GOOD',
    ngayTraThucTe: new Date().toISOString().split('T')[0],
    ghiChu: '',
  });

  const canManageInspection = hasRole('MANAGER', 'ADMIN');
  const canConfirmSettlement = hasRole('ACCOUNTANT', 'ADMIN');

  useEffect(() => {
    if (!maTra) {
      toast.error('Không tìm thấy thông tin yêu cầu trả phòng');
      navigate('/checkout');
      return;
    }
    fetchCheckout();
  }, [maTra]);

  const fetchCheckout = async () => {
    try {
      const res = await getCheckoutById(maTra);
      const data = res.data || res;
      setCheckout(data);
      // If already INSPECTING with TyLeHoanCoc set, we can show settlement
      if (data.TrangThai === 'INSPECTING' && data.TyLeHoanCoc !== null && data.TyLeHoanCoc !== undefined) {
        try {
          const sRes = await getSettlement(maTra);
          setSettlement(sRes.data || sRes);
          setStep(2);
        } catch {
          // Not yet completed inspection, stay on step 1
        }
      } else if (data.TrangThai === 'COMPLETED') {
        try {
          const sRes = await getSettlement(maTra);
          setSettlement(sRes.data || sRes);
        } catch {}
        setStep(3);
      }
    } catch (err) {
      toast.error('Không thể tải thông tin trả phòng');
      navigate('/checkout');
    } finally {
      setLoading(false);
    }
  };

  const handleStartInspection = async () => {
    setSubmitting(true);
    try {
      await startInspection(maTra);
      toast.success('Bắt đầu kiểm tra phòng');
      await fetchCheckout();
    } catch (err) {
      toast.error(err?.response?.data?.message || err?.message || 'Lỗi khi bắt đầu kiểm tra');
    } finally {
      setSubmitting(false);
    }
  };

  const handleAddDamage = async () => {
    if (!newDamage.loaiPhi || !newDamage.soTien) {
      toast.error('Vui lòng nhập loại phí và số tiền');
      return;
    }
    setSubmitting(true);
    try {
      await addDamage(maTra, newDamage);
      toast.success('Đã thêm khoản khấu trừ');
      setNewDamage({ loaiPhi: '', soTien: '', ghiChu: '' });
      await fetchCheckout();
    } catch (err) {
      toast.error(err?.response?.data?.message || err?.message || 'Thêm thất bại');
    } finally {
      setSubmitting(false);
    }
  };

  const handleCompleteInspection = async () => {
    setSubmitting(true);
    try {
      await completeInspection(maTra, inspectionForm);
      toast.success('Hoàn tất kiểm tra, chuyển sang đối soát');
      const settlementRes = await getSettlement(maTra);
      setSettlement(settlementRes.data || settlementRes);
      setStep(2);
    } catch (err) {
      toast.error(err?.response?.data?.message || err?.message || 'Lỗi khi hoàn tất kiểm tra');
    } finally {
      setSubmitting(false);
    }
  };

  const handleConfirmSettlement = async () => {
    if (!confirmed) {
      toast.error('Vui lòng xác nhận khách đồng ý kết quả');
      return;
    }
    setSubmitting(true);
    try {
      await confirmSettlement(maTra, { phuongThuc: 'TIEN_MAT' });
      toast.success('Quyết toán hoàn tất!');
      setStep(3);
    } catch (err) {
      toast.error(err?.response?.data?.message || err?.message || 'Xác nhận quyết toán thất bại');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="app-layout">
        <Sidebar />
        <div className="app-content">
          <Topbar title="Kiểm tra trả phòng" />
          <main className="main-content">Đang tải...</main>
        </div>
      </div>
    );
  }

  if (!checkout) return null;

  const isPending = checkout.TrangThai === 'PENDING';
  const isInspecting = checkout.TrangThai === 'INSPECTING';
  const isCompleted = checkout.TrangThai === 'COMPLETED';
  const chiTietKhauTrus = checkout.chiTietKhauTrus || [];

  return (
    <div className="app-layout">
      <Sidebar />
      <div className="app-content">
        <Topbar title="Kiểm tra trả phòng" />
        <main className="main-content">
          <div style={{ marginBottom: 20 }}>
            <button
              onClick={() => navigate('/checkout')}
              style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'none', border: 'none', color: '#0A58CA', cursor: 'pointer' }}
            >
              <FiArrowLeft size={16} /> Quay lại danh sách
            </button>
          </div>

          {/* Thông tin yêu cầu */}
          <div className="card" style={{ marginBottom: 20 }}>
            <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 12 }}>Thông tin trả phòng</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, fontSize: 14 }}>
              <div><span style={{ color: '#6C757D' }}>Mã yêu cầu:</span> <strong>{checkout.MaTra}</strong></div>
              <div><span style={{ color: '#6C757D' }}>Trạng thái:</span> <Badge variant={isCompleted ? 'available' : isInspecting ? 'info' : 'warning'}>{checkout.TrangThai}</Badge></div>
              <div><span style={{ color: '#6C757D' }}>Hợp đồng:</span> <strong>{checkout.MaHopDong}</strong></div>
              <div><span style={{ color: '#6C757D' }}>Phòng:</span> <strong>{checkout.hopDong?.phong?.MaPhong}</strong></div>
              <div><span style={{ color: '#6C757D' }}>Khách hàng:</span> <strong>{checkout.hopDong?.nhom?.daiDien?.HoTen}</strong></div>
              <div><span style={{ color: '#6C757D' }}>Ngày yêu cầu:</span> <strong>{formatDateTime(checkout.NgayYeuCau)}</strong></div>
              <div><span style={{ color: '#6C757D' }}>Ngày trả dự kiến:</span> <strong>{formatDateTime(checkout.NgayTraDuKien)}</strong></div>
              {checkout.LyDo && <div style={{ gridColumn: '1/-1' }}><span style={{ color: '#6C757D' }}>Lý do:</span> <strong>{checkout.LyDo}</strong></div>}
            </div>
          </div>

          {/* Bước 1: Bắt đầu kiểm tra */}
          {step === 1 && isPending && (
            <div className="card" style={{ textAlign: 'center', padding: 30 }}>
              <p style={{ marginBottom: 20 }}>Bắt đầu quy trình kiểm tra phòng và tài sản trước khi trả phòng.</p>
              {canManageInspection ? (
                <Button variant="primary" loading={submitting} onClick={handleStartInspection}>
                  Bắt đầu kiểm tra
                </Button>
              ) : (
                <div style={{ color: '#6C757D' }}>Chờ quản lý bắt đầu kiểm tra</div>
              )}
            </div>
          )}

          {/* Bước 1: Đang kiểm tra */}
          {step === 1 && isInspecting && (
            <div className="card">
              <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 16 }}>Kiểm tra tài sản và khấu trừ</h3>

              {/* Danh sách khoản khấu trừ đã thêm */}
              <div style={{ marginBottom: 20 }}>
                <h4 style={{ fontSize: 14, fontWeight: 600, marginBottom: 10 }}>Các khoản đã khấu trừ ({chiTietKhauTrus.length})</h4>
                {chiTietKhauTrus.length === 0 ? (
                  <div style={{ color: '#6C757D', padding: 10, background: '#F8F9FA', borderRadius: 8 }}>Chưa có khoản khấu trừ nào</div>
                ) : (
                  <table className="data-table">
                    <thead>
                      <tr><th>Loại phí</th><th>Số tiền</th><th>Ghi chú</th></tr>
                    </thead>
                    <tbody>
                      {chiTietKhauTrus.map((item, idx) => (
                        <tr key={idx}>
                          <td>{item.LoaiPhi}</td>
                          <td style={{ color: '#DC3545' }}>-{formatCurrency(item.SoTien)}</td>
                          <td>{item.GhiChu}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>

              {/* Thêm khoản khấu trừ mới */}
              {canManageInspection && (
                <div style={{ background: '#F8F9FA', padding: 16, borderRadius: 8, marginBottom: 20 }}>
                  <h4 style={{ fontSize: 14, fontWeight: 600, marginBottom: 12 }}>Thêm khoản khấu trừ</h4>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 2fr auto', gap: 12, alignItems: 'flex-end' }}>
                    <select className="form-control" value={newDamage.loaiPhi} onChange={e => setNewDamage(d => ({ ...d, loaiPhi: e.target.value }))}>
                      <option value="">Chọn loại</option>
                      <option value="HU_HONG">Hư hỏng tài sản</option>
                      <option value="PHAT">Tiền phạt</option>
                      <option value="NO_TIEN_PHONG">Nợ tiền phòng</option>
                      <option value="DIEN">Tiền điện</option>
                      <option value="NUOC">Tiền nước</option>
                      <option value="DICH_VU">Phí dịch vụ</option>
                    </select>
                    <input type="number" className="form-control" placeholder="Số tiền" value={newDamage.soTien} onChange={e => setNewDamage(d => ({ ...d, soTien: e.target.value }))} />
                    <input className="form-control" placeholder="Ghi chú" value={newDamage.ghiChu} onChange={e => setNewDamage(d => ({ ...d, ghiChu: e.target.value }))} />
                    <Button variant="primary" onClick={handleAddDamage} loading={submitting} size="sm">Thêm</Button>
                  </div>
                </div>
              )}

              {/* Tình trạng phòng & ngày trả */}
              {canManageInspection && (
                <div style={{ background: '#F0F7FF', padding: 16, borderRadius: 8, marginBottom: 20 }}>
                  <h4 style={{ fontSize: 14, fontWeight: 600, marginBottom: 12 }}>Kết quả kiểm tra phòng</h4>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                    <div className="form-group">
                      <label className="form-label">Tình trạng phòng *</label>
                      <select className="form-control" value={inspectionForm.tinhTrangPhong} onChange={e => setInspectionForm(f => ({ ...f, tinhTrangPhong: e.target.value }))}>
                        <option value="GOOD">Tốt</option>
                        <option value="DIRTY">Bẩn</option>
                        <option value="DAMAGED">Hư hỏng nhẹ</option>
                        <option value="SEVERELY_DAMAGED">Hư hỏng nặng</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label className="form-label">Ngày trả thực tế *</label>
                      <input type="date" className="form-control" value={inspectionForm.ngayTraThucTe} onChange={e => setInspectionForm(f => ({ ...f, ngayTraThucTe: e.target.value }))} />
                    </div>
                    <div className="form-group" style={{ gridColumn: '1/-1' }}>
                      <label className="form-label">Ghi chú</label>
                      <textarea className="form-control" rows={2} placeholder="Ghi chú kiểm tra..." value={inspectionForm.ghiChu} onChange={e => setInspectionForm(f => ({ ...f, ghiChu: e.target.value }))} />
                    </div>
                  </div>
                </div>
              )}

              {canManageInspection && (
                <Button variant="primary" onClick={handleCompleteInspection} loading={submitting}>
                  Hoàn tất kiểm tra & Tiến hành đối soát
                </Button>
              )}
            </div>
          )}

          {/* Bước 2: Đối soát */}
          {step === 2 && settlement && (
            <div>
              <div className="card" style={{ marginBottom: 20 }}>
                <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 16 }}>Kết quả đối soát</h3>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                  <div>
                    <div style={{ marginBottom: 12 }}><strong>Tiền cọc gốc:</strong> {formatCurrency(settlement.soTienCoc)}</div>
                    <div style={{ marginBottom: 12 }}><strong>Tỷ lệ hoàn cọc:</strong> {settlement.tyLeHoanCoc}%</div>
                    <div><strong>Hoàn cọc cơ bản:</strong> {formatCurrency(settlement.soTienHoanCoBan)}</div>
                  </div>
                  <div>
                    <div style={{ marginBottom: 12, color: '#DC3545' }}><strong>Tổng khấu trừ:</strong> -{formatCurrency(settlement.tongKhauTru)}</div>
                    <div style={{ fontSize: 18, fontWeight: 700, color: settlement.ketQua === 'HOAN_COC' ? '#198754' : '#DC3545' }}>
                      {settlement.ketQua === 'HOAN_COC' ? 'Hoàn trả:' : 'Thu thêm:'} {formatCurrency(settlement.soTienHoanCuoi)}
                    </div>
                  </div>
                </div>
                {settlement.chiTietKhauTru?.length > 0 && (
                  <div style={{ marginTop: 16 }}>
                    <h4 style={{ fontSize: 14, fontWeight: 600, marginBottom: 8 }}>Chi tiết khấu trừ</h4>
                    <table className="data-table">
                      <thead><tr><th>Loại phí</th><th>Số tiền</th><th>Ghi chú</th></tr></thead>
                      <tbody>
                        {settlement.chiTietKhauTru.map((item, idx) => (
                          <tr key={idx}>
                            <td>{item.LoaiPhi}</td>
                            <td style={{ color: '#DC3545' }}>-{formatCurrency(item.SoTien)}</td>
                            <td>{item.GhiChu}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>

              <div className="card">
                <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 16 }}>Xác nhận quyết toán</h3>
                <label style={{ display: 'flex', gap: 10, alignItems: 'flex-start', marginBottom: 20, padding: 12, background: '#FFF9EC', borderRadius: 8 }}>
                  <input type="checkbox" checked={confirmed} onChange={e => setConfirmed(e.target.checked)} style={{ marginTop: 2 }} />
                  <span>Khách hàng đã đồng ý với kết quả đối soát. Xác nhận hoàn tất trả phòng.</span>
                </label>
                {canConfirmSettlement ? (
                  <Button variant="primary" loading={submitting} onClick={handleConfirmSettlement} disabled={!confirmed}>
                    <FiCheck size={16} style={{ marginRight: 6 }} /> Xác nhận quyết toán
                  </Button>
                ) : (
                  <div style={{ padding: 12, background: '#F0F7FF', border: '1px solid #B6D4FE', borderRadius: 8, color: '#084298', fontSize: 14 }}>
                    Kết quả kiểm tra đã sẵn sàng. Kế toán sẽ thực hiện hoàn cọc hoặc thu thêm ở bước quyết toán.
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Bước 3: Hoàn tất */}
          {step === 3 && (
            <div className="card" style={{ textAlign: 'center', padding: 40 }}>
              <div style={{ fontSize: 48, marginBottom: 16 }}>✅</div>
              <h3 style={{ marginBottom: 8 }}>Quyết toán hoàn tất!</h3>
              <p style={{ color: '#6C757D', marginBottom: 20 }}>Phòng đã được trả thành công.</p>
              <Button variant="primary" onClick={() => navigate('/checkout')}>Quay lại danh sách</Button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
