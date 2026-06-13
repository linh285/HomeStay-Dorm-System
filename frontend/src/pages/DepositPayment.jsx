import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import Sidebar from '../components/layout/Sidebar';
import Topbar from '../components/layout/Topbar';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import Modal from '../components/ui/Modal';
import {
  getDeposits, sendPaymentRequest, confirmDeposit, cancelDeposit, rejectDeposit,
} from '../services/depositService';
import { formatCurrency, formatDateTime, depositStatusConfig } from '../utils/formatters';
import { useAuth } from '../hooks/useAuth';

export default function DepositPayment() {
  const navigate = useNavigate();
  const { hasRole } = useAuth();
  const [deposits, setDeposits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);
  // actionMode: 'send_payment' | 'confirm' | 'cancel' | 'reject'
  const [actionMode, setActionMode] = useState(null);
  const [confirmForm, setConfirmForm] = useState({
    phuongThuc: 'TIEN_MAT',
    ngayThanhToan: new Date().toISOString().split('T')[0],
    maSoChungTu: '',
    ghiChu: '',
  });
  const [reasonForm, setReasonForm] = useState({ lyDo: '', phuongThuc: 'TIEN_MAT', ghiChu: '' });
  const [submitting, setSubmitting] = useState(false);

  // Role checks per spec (3.1.2):
  // Kế toán tính tiền cọc & gửi yêu cầu thanh toán
  const canSendPaymentRequest = hasRole('ACCOUNTANT', 'ADMIN');
  // Quản lý đối chiếu chứng từ & xác nhận đã nhận cọc hợp lệ
  const canConfirm = hasRole('MANAGER', 'ADMIN');
  // Manager can reject (không đạt điều kiện) or approve screening
  const canReject = hasRole('MANAGER', 'ADMIN');
  // Sale/Manager/Admin can cancel a deposit request
  const canCancel = hasRole('SALE', 'MANAGER', 'ADMIN');
  // Sale creates contract from approved deposit
  const canCreateContract = hasRole('SALE', 'ADMIN');

  const fetchDeposits = async () => {
    setLoading(true);
    try {
      const res = await getDeposits({});
      let list = [];
      if (Array.isArray(res)) list = res;
      else if (res?.data && Array.isArray(res.data)) list = res.data;
      else if (res?.deposits && Array.isArray(res.deposits)) list = res.deposits;
      setDeposits(list);
    } catch (err) {
      toast.error('Không thể tải danh sách đặt cọc');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchDeposits(); }, []);

  const openAction = (row, mode) => {
    setSelected(row);
    setActionMode(mode);
    setReasonForm({ lyDo: '', phuongThuc: 'TIEN_MAT', ghiChu: '' });
    setConfirmForm({
      phuongThuc: 'TIEN_MAT',
      ngayThanhToan: new Date().toISOString().split('T')[0],
      maSoChungTu: '',
      ghiChu: '',
    });
  };

  const closeModal = () => { setSelected(null); setActionMode(null); };

  const handleSendPayment = async () => {
    if (!selected) return;
    setSubmitting(true);
    try {
      await sendPaymentRequest(selected.MaCoc);
      toast.success('Đã gửi yêu cầu thanh toán. Khách có 24 giờ để nộp tiền cọc.');
      closeModal();
      fetchDeposits();
    } catch (err) {
      toast.error(err?.response?.data?.message || err?.message || 'Gửi yêu cầu thất bại');
    } finally {
      setSubmitting(false);
    }
  };

  const handleConfirm = async () => {
    if (!selected) return;
    setSubmitting(true);
    try {
      await confirmDeposit(selected.MaCoc, confirmForm);
      toast.success('Xác nhận thanh toán cọc thành công!');
      closeModal();
      fetchDeposits();
    } catch (err) {
      toast.error(err?.response?.data?.message || err?.message || 'Xác nhận thất bại');
    } finally {
      setSubmitting(false);
    }
  };

  const handleCancel = async () => {
    if (!selected) return;
    setSubmitting(true);
    try {
      const res = await cancelDeposit(selected.MaCoc, reasonForm);
      const refund = res?.data?.soTienHoan;
      toast.success(`Đã hủy đặt cọc.${refund ? ` Hoàn trả 80% = ${formatCurrency(refund)}` : ''}`);
      closeModal();
      fetchDeposits();
    } catch (err) {
      toast.error(err?.response?.data?.message || err?.message || 'Hủy thất bại');
    } finally {
      setSubmitting(false);
    }
  };

  const handleReject = async () => {
    if (!selected) return;
    setSubmitting(true);
    try {
      await rejectDeposit(selected.MaCoc, reasonForm);
      toast.success('Đã từ chối đặt cọc');
      closeModal();
      fetchDeposits();
    } catch (err) {
      toast.error(err?.response?.data?.message || err?.message || 'Từ chối thất bại');
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
            <div>
              <h1 style={{ fontSize: 22, fontWeight: 700, margin: 0 }}>Danh sách đặt cọc</h1>
              <p style={{ color: '#6C757D', margin: '4px 0 0', fontSize: 13 }}>
                Luồng xử lý: Sale tạo cọc → Kế toán gửi yêu cầu TT → Khách thanh toán 24h → Quản lý đối chiếu &amp; xác nhận
              </p>
            </div>
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
                      <th style={th}>Mã cọc</th>
                      <th style={th}>Khách hàng</th>
                      <th style={th}>Phòng/Giường</th>
                      <th style={{ ...th, textAlign: 'right' }}>Số tiền cọc</th>
                      <th style={th}>Ngày đặt</th>
                      <th style={th}>Hạn thanh toán</th>
                      <th style={th}>Trạng thái</th>
                      <th style={{ ...th, textAlign: 'center' }}>Thao tác</th>
                    </tr>
                  </thead>
                  <tbody>
                    {deposits.map((row, idx) => {
                      if (!row) return null;
                      const cfg = depositStatusConfig[row.TinhTrang] || { label: row.TinhTrang, color: 'secondary' };
                      const now = new Date();
                      const expired = row.ThoiGianHetHan ? new Date(row.ThoiGianHetHan) < now : false;
                      const isApprovalPending = row.TinhTrang === 'PENDING_APPROVAL';
                      const isPaymentPending = row.TinhTrang === 'PENDING_PAYMENT';
                      const isApproved = row.TinhTrang === 'APPROVED';
                      return (
                        <tr key={row.MaCoc || idx} style={{ borderBottom: '1px solid #f1f3f5' }}>
                          <td style={td}><strong>{row.MaCoc || '—'}</strong></td>
                          <td style={td}>{row.khachHang?.HoTen || '—'}</td>
                          <td style={td}>{row.giuong?.MaGiuong || row.phong?.MaPhong || '—'}</td>
                          <td style={{ ...td, textAlign: 'right' }}>{formatCurrency(row.SoTienCoc)}</td>
                          <td style={td}>{formatDateTime(row.NgayDatCoc)}</td>
                          <td style={{ ...td, color: expired ? '#DC3545' : 'inherit', fontSize: 12 }}>
                            {row.ThoiGianHetHan ? formatDateTime(row.ThoiGianHetHan) : '—'}
                          </td>
                          <td style={td}><Badge variant={cfg.color}>{cfg.label}</Badge></td>
                          <td style={{ ...td, textAlign: 'center' }}>
                            <div style={{ display: 'flex', gap: 6, justifyContent: 'center', flexWrap: 'wrap' }}>

                              {/* PENDING_APPROVAL: kế toán gửi yêu cầu thanh toán */}
                              {isApprovalPending && canSendPaymentRequest && (
                                <Button variant="primary" size="sm" onClick={() => openAction(row, 'send_payment')}>
                                  Gửi yêu cầu TT
                                </Button>
                              )}
                              {isApprovalPending && canReject && (
                                <Button variant="danger" size="sm" onClick={() => openAction(row, 'reject')}>
                                  Từ chối
                                </Button>
                              )}
                              {isApprovalPending && canCancel && (
                                <Button variant="outline" size="sm" onClick={() => openAction(row, 'cancel')}>
                                  Hủy
                                </Button>
                              )}

                              {/* PENDING_PAYMENT: kế toán xác nhận khách đã trả tiền */}
                              {isPaymentPending && canConfirm && (
                                <Button variant="primary" size="sm" onClick={() => openAction(row, 'confirm')}>
                                  Xác nhận đã thu
                                </Button>
                              )}
                              {isPaymentPending && canReject && (
                                <Button variant="danger" size="sm" onClick={() => openAction(row, 'reject')}>
                                  Từ chối
                                </Button>
                              )}

                              {/* APPROVED: lập hợp đồng hoặc hủy (hoàn 80%) */}
                              {isApproved && !row.MaHopDong && canCreateContract && (
                                <Button
                                  variant="primary"
                                  size="sm"
                                  onClick={() => navigate('/contracts', { state: { maCoc: row.MaCoc } })}
                                >
                                  Lập hợp đồng
                                </Button>
                              )}
                              {isApproved && !row.MaHopDong && canCancel && (
                                <Button variant="danger" size="sm" onClick={() => openAction(row, 'cancel')}>
                                  Hủy (hoàn 80%)
                                </Button>
                              )}
                              {isApproved && row.MaHopDong && (
                                <Badge variant="available">Đã lập HĐ</Badge>
                              )}
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Modal: Gửi yêu cầu thanh toán */}
          <Modal
            isOpen={actionMode === 'send_payment'}
            onClose={closeModal}
            title="Gửi yêu cầu thanh toán cọc"
            size="md"
            footer={
              <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
                <Button variant="outline" onClick={closeModal}>Hủy</Button>
                <Button variant="primary" loading={submitting} onClick={handleSendPayment}>Gửi yêu cầu</Button>
              </div>
            }
          >
            {selected && (
              <div>
                <div style={{ background: '#E8F4FD', border: '1px solid #B6D4FE', borderRadius: 8, padding: 14, marginBottom: 16, fontSize: 14 }}>
                  <strong style={{ color: '#084298' }}>Thông báo:</strong> Sau khi gửi, khách hàng có <strong>24 giờ</strong> để hoàn tất thanh toán. Nếu quá hạn, yêu cầu đặt cọc sẽ tự động hủy.
                </div>
                <div style={{ background: '#F8F9FA', borderRadius: 8, padding: 14, fontSize: 14, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                  <div><span style={{ color: '#6C757D' }}>Mã cọc:</span> <strong>{selected.MaCoc}</strong></div>
                  <div><span style={{ color: '#6C757D' }}>Phòng/Giường:</span> <strong>{selected.giuong?.MaGiuong || selected.phong?.MaPhong || '—'}</strong></div>
                  <div><span style={{ color: '#6C757D' }}>Khách hàng:</span> <strong>{selected.khachHang?.HoTen}</strong></div>
                  <div><span style={{ color: '#6C757D' }}>Số tiền cọc:</span> <strong style={{ color: '#0A58CA' }}>{formatCurrency(selected.SoTienCoc)}</strong></div>
                </div>
              </div>
            )}
          </Modal>

          {/* Modal: Xác nhận thanh toán */}
          <Modal
            isOpen={actionMode === 'confirm'}
            onClose={closeModal}
            title="Xác nhận đã thu tiền cọc"
            size="md"
            footer={
              <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
                <Button variant="outline" onClick={closeModal}>Hủy</Button>
                <Button variant="primary" loading={submitting} onClick={handleConfirm}>Xác nhận</Button>
              </div>
            }
          >
            {selected && (
              <div>
                <div style={{ background: '#F8F9FA', borderRadius: 8, padding: 16, marginBottom: 16 }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, fontSize: 14 }}>
                    <div><span style={{ color: '#6C757D' }}>Mã cọc:</span> <strong>{selected.MaCoc}</strong></div>
                    <div><span style={{ color: '#6C757D' }}>Phòng:</span> <strong>{selected.giuong?.MaGiuong || selected.phong?.MaPhong || '—'}</strong></div>
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

          {/* Modal: Hủy đặt cọc */}
          <Modal
            isOpen={actionMode === 'cancel'}
            onClose={closeModal}
            title={selected?.TinhTrang === 'APPROVED' ? 'Hủy đặt cọc – Hoàn tiền 80%' : 'Hủy yêu cầu đặt cọc'}
            size="md"
            footer={
              <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
                <Button variant="outline" onClick={closeModal}>Không</Button>
                <Button variant="danger" loading={submitting} onClick={handleCancel}>Xác nhận hủy</Button>
              </div>
            }
          >
            {selected && (
              <div>
                {selected.TinhTrang === 'APPROVED' ? (
                  <div style={{ background: '#FFF3CD', border: '1px solid #FAAD14', borderRadius: 8, padding: 14, marginBottom: 16, fontSize: 14 }}>
                    <strong>Lưu ý:</strong> Đặt cọc đã xác nhận thanh toán. Theo quy định, hủy trước khi ký hợp đồng sẽ <strong>hoàn lại 80%</strong>.
                    <div style={{ marginTop: 8 }}>
                      Hoàn: <strong style={{ color: '#198754' }}>{formatCurrency(Math.round(Number(selected.SoTienCoc) * 0.8))}</strong>
                      {' '}· Giữ lại 20%: <strong style={{ color: '#DC3545' }}>{formatCurrency(Math.round(Number(selected.SoTienCoc) * 0.2))}</strong>
                    </div>
                  </div>
                ) : (
                  <div style={{ background: '#F8F9FA', border: '1px solid #DEE2E6', borderRadius: 8, padding: 14, marginBottom: 16, fontSize: 14 }}>
                    Yêu cầu đặt cọc chưa được thanh toán. Hủy sẽ giải phóng phòng/giường. Không phát sinh hoàn tiền.
                  </div>
                )}
                <div style={{ background: '#F8F9FA', borderRadius: 8, padding: 12, marginBottom: 14, fontSize: 14 }}>
                  <div><span style={{ color: '#6C757D' }}>Khách hàng:</span> <strong>{selected.khachHang?.HoTen}</strong></div>
                  <div><span style={{ color: '#6C757D' }}>Phòng/Giường:</span> <strong>{selected.giuong?.MaGiuong || selected.phong?.MaPhong || '—'}</strong></div>
                  <div><span style={{ color: '#6C757D' }}>Số tiền đặt cọc:</span> <strong>{formatCurrency(selected.SoTienCoc)}</strong></div>
                </div>
                <div className="form-group">
                  <label className="form-label">Lý do hủy *</label>
                  <textarea className="form-control" rows={3} placeholder="Nhập lý do hủy đặt cọc..." value={reasonForm.lyDo} onChange={e => setReasonForm(f => ({ ...f, lyDo: e.target.value }))} />
                </div>
                {selected.TinhTrang === 'APPROVED' && (
                  <div className="form-group">
                    <label className="form-label">Phương thức hoàn tiền</label>
                    <div style={{ display: 'flex', gap: 12 }}>
                      {['TIEN_MAT', 'CHUYEN_KHOAN'].map(m => (
                        <label key={m} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                          <input type="radio" name="phuongThucHoan" value={m} checked={reasonForm.phuongThuc === m} onChange={() => setReasonForm(f => ({ ...f, phuongThuc: m }))} />
                          {m === 'TIEN_MAT' ? 'Tiền mặt' : 'Chuyển khoản'}
                        </label>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </Modal>

          {/* Modal: Từ chối đặt cọc */}
          <Modal
            isOpen={actionMode === 'reject'}
            onClose={closeModal}
            title="Từ chối đặt cọc"
            size="md"
            footer={
              <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
                <Button variant="outline" onClick={closeModal}>Không</Button>
                <Button variant="danger" loading={submitting} onClick={handleReject}>Xác nhận từ chối</Button>
              </div>
            }
          >
            {selected && (
              <div>
                <div style={{ background: '#F8F9FA', borderRadius: 8, padding: 12, marginBottom: 14, fontSize: 14 }}>
                  <div><span style={{ color: '#6C757D' }}>Khách hàng:</span> <strong>{selected.khachHang?.HoTen}</strong></div>
                  <div><span style={{ color: '#6C757D' }}>Phòng/Giường:</span> <strong>{selected.giuong?.MaGiuong || selected.phong?.MaPhong || '—'}</strong></div>
                  <div><span style={{ color: '#6C757D' }}>Số tiền cọc:</span> <strong>{formatCurrency(selected.SoTienCoc)}</strong></div>
                </div>
                <div style={{ background: '#FFF3CD', border: '1px solid #FAAD14', borderRadius: 8, padding: 14, marginBottom: 16, fontSize: 14 }}>
                  <strong>Lưu ý:</strong> Từ chối đặt cọc. Phòng/giường sẽ được giải phóng. Không có khoản hoàn tiền.
                </div>
                <div className="form-group">
                  <label className="form-label">Lý do từ chối *</label>
                  <textarea className="form-control" rows={3} placeholder="Nhập lý do từ chối..." value={reasonForm.lyDo} onChange={e => setReasonForm(f => ({ ...f, lyDo: e.target.value }))} />
                </div>
              </div>
            )}
          </Modal>
        </main>
      </div>
    </div>
  );
}

const th = { padding: '12px', textAlign: 'left', fontSize: 13, color: '#495057' };
const td = { padding: '12px', fontSize: 14 };
