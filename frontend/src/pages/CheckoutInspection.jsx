import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiCheck, FiArrowLeft, FiRefreshCw, FiEye, FiPlus } from 'react-icons/fi';
import toast from 'react-hot-toast';
import Sidebar from '../components/layout/Sidebar';
import Topbar from '../components/layout/Topbar';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import Input from '../components/ui/Input';
import { getCheckoutRequests, getCheckoutById, startInspection, completeInspection, addDamage } from '../services/checkoutService';
import { formatCurrency, formatDateTime, checkoutStatusConfig } from '../utils/formatters';

export default function CheckoutInspection() {
  const navigate = useNavigate();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedId, setSelectedId] = useState(null);
  const [checkout, setCheckout] = useState(null);
  const [inspectionStarted, setInspectionStarted] = useState(false);
  const [damages, setDamages] = useState([]);
  const [newDamage, setNewDamage] = useState({ loaiPhi: '', soTien: '', ghiChu: '' });
  const [submitting, setSubmitting] = useState(false);
  const [tinhTrangPhong, setTinhTrangPhong] = useState('GOOD');
  const [ngayTraThucTe, setNgayTraThucTe] = useState('');

  const fetchRequests = async () => {
    setLoading(true);
    try {
      const res = await getCheckoutRequests({ status: 'PENDING,INSPECTING' });
      const list = res?.data?.checkouts || [];
      setRequests(list);
    } catch (err) {
      toast.error('Không thể tải danh sách yêu cầu');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const handleSelect = async (maTra) => {
    setSelectedId(maTra);
    setCheckout(null);
    setInspectionStarted(false);
    setDamages([]);
    setNewDamage({ loaiPhi: '', soTien: '', ghiChu: '' });
    setTinhTrangPhong('GOOD');
    setNgayTraThucTe('');
    try {
      const res = await getCheckoutById(maTra);
      setCheckout(res.data);
      setInspectionStarted(res.data.TrangThai === 'INSPECTING');
    } catch (err) {
      toast.error('Không thể tải chi tiết yêu cầu');
    }
  };

  const handleStartInspection = async () => {
    if (!selectedId) return;
    setSubmitting(true);
    try {
      await startInspection(selectedId);
      toast.success('Bắt đầu kiểm tra phòng');
      handleSelect(selectedId);
    } catch (err) {
      toast.error(err?.message || 'Lỗi khi bắt đầu kiểm tra');
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
      await addDamage(selectedId, newDamage);
      toast.success('Đã thêm khoản khấu trừ');
      setNewDamage({ loaiPhi: '', soTien: '', ghiChu: '' });
      // Refresh checkout để cập nhật danh sách khấu trừ (nếu backend trả về)
      const res = await getCheckoutById(selectedId);
      setCheckout(res.data);
    } catch (err) {
      toast.error(err?.message || 'Thêm thất bại');
    } finally {
      setSubmitting(false);
    }
  };

  const handleCompleteInspection = async () => {
    if (!ngayTraThucTe) {
      toast.error('Vui lòng chọn ngày trả thực tế');
      return;
    }
    setSubmitting(true);
    try {
      await completeInspection(selectedId, { tinhTrangPhong, ngayTraThucTe });
      toast.success('Hoàn tất kiểm tra, chuyển sang kế toán');
      fetchRequests();
      setSelectedId(null);
      setCheckout(null);
    } catch (err) {
      toast.error(err?.message || 'Lỗi khi hoàn tất kiểm tra');
    } finally {
      setSubmitting(false);
    }
  };

  const isPending = checkout?.TrangThai === 'PENDING';
  const isInspecting = checkout?.TrangThai === 'INSPECTING';

  return (
    <div className="app-layout">
      <Sidebar />
      <div className="app-content">
        <Topbar title="Kiểm tra trả phòng" />
        <main className="main-content">
          <div style={{ display: 'flex', gap: 24, alignItems: 'flex-start' }}>
            {/* Cột trái: Danh sách yêu cầu */}
            <div className="card" style={{ flex: '0 0 360px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 20px', borderBottom: '1px solid #e9ecef' }}>
                <h3 style={{ margin: 0, fontSize: 16, fontWeight: 600 }}>Chờ kiểm tra</h3>
                <button onClick={fetchRequests} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                  <FiRefreshCw size={16} />
                </button>
              </div>
              <div style={{ maxHeight: 'calc(100vh - 200px)', overflowY: 'auto' }}>
                {loading ? (
                  <div style={{ padding: 20, textAlign: 'center' }}>Đang tải...</div>
                ) : requests.length === 0 ? (
                  <div style={{ padding: 40, textAlign: 'center', color: '#6c757d' }}>Không có yêu cầu nào</div>
                ) : (
                  requests.map(req => (
                    <div
                      key={req.MaTra}
                      onClick={() => handleSelect(req.MaTra)}
                      style={{
                        padding: '12px 16px',
                        borderBottom: '1px solid #f1f3f5',
                        cursor: 'pointer',
                        background: selectedId === req.MaTra ? '#e8f0fe' : 'white',
                      }}
                    >
                      <div style={{ fontWeight: 600, marginBottom: 4 }}>{req.MaTra}</div>
                      <div style={{ fontSize: 13, color: '#495057' }}>Phòng {req.hopDong?.phong?.MaPhong}</div>
                      <div style={{ fontSize: 12, color: '#6c757d', marginTop: 4 }}>
                        {formatDateTime(req.NgayYeuCau)}
                      </div>
                      <Badge variant={req.TrangThai === 'PENDING' ? 'warning' : 'info'} size="sm">
                        {checkoutStatusConfig[req.TrangThai]?.label || req.TrangThai}
                      </Badge>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Cột phải: Chi tiết kiểm tra */}
            <div style={{ flex: 1 }}>
              {!selectedId ? (
                <div className="card" style={{ textAlign: 'center', padding: 60, color: '#6c757d' }}>
                  <FiEye size={48} style={{ opacity: 0.4, marginBottom: 16 }} />
                  <p>Chọn một yêu cầu từ danh sách bên trái</p>
                </div>
              ) : !checkout ? (
                <div className="card" style={{ padding: 40, textAlign: 'center' }}>Đang tải chi tiết...</div>
              ) : (
                <>
                  {/* Thông tin yêu cầu */}
                  <div className="card" style={{ marginBottom: 20 }}>
                    <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 12 }}>Thông tin trả phòng</h3>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, fontSize: 14 }}>
                      <div><span style={{ color: '#6C757D' }}>Mã yêu cầu:</span> <strong>{checkout.MaTra}</strong></div>
                      <div><span style={{ color: '#6C757D' }}>Trạng thái:</span> <Badge variant={isInspecting ? 'info' : 'warning'}>{checkout.TrangThai}</Badge></div>
                      <div><span style={{ color: '#6C757D' }}>Hợp đồng:</span> <strong>{checkout.maHopDong}</strong></div>
                      <div><span style={{ color: '#6C757D' }}>Phòng:</span> <strong>{checkout.hopDong?.phong?.MaPhong}</strong></div>
                      <div><span style={{ color: '#6C757D' }}>Khách hàng:</span> <strong>{checkout.hopDong?.nhom?.daiDien?.HoTen}</strong></div>
                      <div><span style={{ color: '#6C757D' }}>Ngày yêu cầu:</span> <strong>{formatDateTime(checkout.NgayYeuCau)}</strong></div>
                      <div><span style={{ color: '#6C757D' }}>Ngày trả dự kiến:</span> <strong>{formatDateTime(checkout.NgayTraDuKien)}</strong></div>
                    </div>
                  </div>

                  {/* Danh sách khấu trừ đã có */}
                  {checkout.chiTietKhauTrus?.length > 0 && (
                    <div className="card" style={{ marginBottom: 20 }}>
                      <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 12 }}>Các khoản khấu trừ đã ghi nhận</h3>
                      <table className="data-table">
                        <thead><tr><th>Loại phí</th><th>Số tiền</th><th>Ghi chú</th></tr></thead>
                        <tbody>
                          {checkout.chiTietKhauTrus.map((k, i) => (
                            <tr key={i}>
                              <td>{k.LoaiPhi}</td>
                              <td style={{ color: '#DC3545' }}>-{formatCurrency(k.SoTien)}</td>
                              <td>{k.GhiChu}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}

                  {/* Nút bắt đầu kiểm tra (nếu đang PENDING) */}
                  {isPending && !inspectionStarted && (
                    <div className="card" style={{ textAlign: 'center', padding: 30, marginBottom: 20 }}>
                      <Button variant="primary" loading={submitting} onClick={handleStartInspection}>
                        Bắt đầu kiểm tra
                      </Button>
                    </div>
                  )}

                  {/* Form kiểm tra (khi đang INSPECTING) */}
                  {isInspecting && (
                    <div className="card">
                      <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 16 }}>Kiểm tra hiện trạng</h3>
                      
                      {/* Tình trạng phòng */}
                      <div className="form-group">
                        <label className="form-label">Tình trạng phòng</label>
                        <select className="form-control" value={tinhTrangPhong} onChange={e => setTinhTrangPhong(e.target.value)}>
                          <option value="GOOD">Tốt</option>
                          <option value="DIRTY">Bẩn</option>
                          <option value="DAMAGED">Hư hỏng nhẹ</option>
                          <option value="SEVERELY_DAMAGED">Hư hỏng nặng</option>
                        </select>
                      </div>

                      {/* Ngày trả thực tế */}
                      <div className="form-group">
                        <label className="form-label">Ngày trả thực tế *</label>
                        <input type="date" className="form-control" value={ngayTraThucTe} onChange={e => setNgayTraThucTe(e.target.value)} required />
                      </div>

                      {/* Thêm khoản khấu trừ */}
                      <div style={{ background: '#F8F9FA', padding: 16, borderRadius: 8, marginBottom: 20 }}>
                        <h4 style={{ fontSize: 14, fontWeight: 600, marginBottom: 12 }}>Thêm khoản khấu trừ (nếu có)</h4>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 2fr auto', gap: 12, alignItems: 'flex-end' }}>
                          <select
                            className="form-control"
                            value={newDamage.loaiPhi}
                            onChange={e => setNewDamage(d => ({ ...d, loaiPhi: e.target.value }))}
                          >
                            <option value="">Chọn loại</option>
                            <option value="HU_HONG">Hư hỏng tài sản</option>
                            <option value="PHAT">Tiền phạt</option>
                            <option value="NO_TIEN_PHONG">Nợ tiền phòng</option>
                            <option value="DIEN">Tiền điện</option>
                            <option value="NUOC">Tiền nước</option>
                            <option value="DICH_VU">Phí dịch vụ</option>
                          </select>
                          <input
                            type="number"
                            className="form-control"
                            placeholder="Số tiền"
                            value={newDamage.soTien}
                            onChange={e => setNewDamage(d => ({ ...d, soTien: e.target.value }))}
                          />
                          <input
                            className="form-control"
                            placeholder="Ghi chú"
                            value={newDamage.ghiChu}
                            onChange={e => setNewDamage(d => ({ ...d, ghiChu: e.target.value }))}
                          />
                          <Button variant="primary" onClick={handleAddDamage} loading={submitting} size="sm">
                            <FiPlus size={14} /> Thêm
                          </Button>
                        </div>
                      </div>

                      <Button variant="primary" loading={submitting} onClick={handleCompleteInspection}>
                        Hoàn tất kiểm tra & Chuyển kế toán
                      </Button>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}