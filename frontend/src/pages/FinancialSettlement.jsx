import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiCheck, FiArrowRight, FiRefreshCw, FiEye } from 'react-icons/fi';
import toast from 'react-hot-toast';
import Sidebar from '../components/layout/Sidebar';
import Topbar from '../components/layout/Topbar';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import Stepper from '../components/ui/Stepper';
import { getCheckoutRequests } from '../services/checkoutService';
import { getSettlement, confirmSettlement } from '../services/settlementService';
import { formatCurrency, formatDate } from '../utils/formatters';

const STEPS = [
  { title: 'Đối soát thông tin', description: 'Xem lại chi tiết quyết toán' },
  { title: 'Xác nhận thanh toán', description: 'Xác nhận kết quả' },
  { title: 'Hoàn tất', description: 'Hoàn thành quyết toán' },
];

const LOAI_PHI_LABELS = {
  DIEN: 'Tiền điện', NUOC: 'Tiền nước', DICH_VU: 'Phí dịch vụ',
  HU_HONG: 'Hư hỏng tài sản', PHAT: 'Tiền phạt', NO_TIEN_PHONG: 'Nợ tiền phòng'
};

export default function FinancialSettlement() {
  const navigate = useNavigate();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedId, setSelectedId] = useState(null);
  const [data, setData] = useState(null);
  const [step, setStep] = useState(0);
  const [phuongThuc, setPhuongThuc] = useState('TIEN_MAT');
  const [confirmed, setConfirmed] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const fetchRequests = async () => {
    setLoading(true);
    try {
      const res = await getCheckoutRequests({ status: 'INSPECTED' });
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
    setData(null);
    setStep(0);
    setConfirmed(false);
    try {
      const res = await getSettlement(maTra);
      setData(res.data);
    } catch (err) {
      toast.error('Không thể tải dữ liệu quyết toán');
    }
  };

  const handleConfirm = async () => {
    if (!confirmed) { toast.error('Vui lòng xác nhận khách đồng ý kết quả'); return; }
    setSubmitting(true);
    try {
      await confirmSettlement(selectedId, { phuongThuc });
      setStep(2);
      toast.success('Quyết toán hoàn tất!');
      // Xóa yêu cầu khỏi danh sách
      fetchRequests();
      setSelectedId(null);
      setData(null);
    } catch (err) { toast.error(err?.message || 'Lỗi xác nhận quyết toán'); }
    finally { setSubmitting(false); }
  };

  const refundRate = data?.tyLeHoanCoc ?? 0;
  const lyDoRefundRate = refundRate >= 100 ? 'Hợp đồng đã hết hạn tự nhiên'
    : refundRate >= 70 ? 'Hợp đồng chưa hết hạn, đã ở ≥ 6 tháng'
    : refundRate >= 50 ? 'Hợp đồng chưa hết hạn, ở < 6 tháng'
    : 'Chưa ký hợp đồng chính thức';

  return (
    <div className="app-layout">
      <Sidebar />
      <div className="app-content">
        <Topbar title="Quyết toán & Hoàn cọc" />
        <main className="main-content">
          <div style={{ display: 'flex', gap: 24, alignItems: 'flex-start' }}>
            {/* Cột trái: Danh sách yêu cầu đã kiểm tra */}
            <div className="card" style={{ flex: '0 0 360px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 20px', borderBottom: '1px solid #e9ecef' }}>
                <h3 style={{ margin: 0, fontSize: 16, fontWeight: 600 }}>Chờ quyết toán</h3>
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
                        {formatDate(req.NgayYeuCau)}
                      </div>
                      <Badge variant="info" size="sm">Đã kiểm tra</Badge>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Cột phải: Chi tiết quyết toán */}
            <div style={{ flex: 1 }}>
              {!selectedId ? (
                <div className="card" style={{ textAlign: 'center', padding: 60, color: '#6c757d' }}>
                  <FiEye size={48} style={{ opacity: 0.4, marginBottom: 16 }} />
                  <p>Chọn một yêu cầu từ danh sách bên trái</p>
                </div>
              ) : !data ? (
                <div className="card" style={{ padding: 40, textAlign: 'center' }}>Đang tải...</div>
              ) : (
                <>
                  <Stepper steps={STEPS} currentStep={step} />
                  <div style={{ marginTop: 24 }}>

                    {step === 0 && (
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
                        <div>
                          <div className="card" style={{ marginBottom: 16 }}>
                            <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 12 }}>Thông tin hợp đồng</h3>
                            <div style={{ fontSize: 14, display: 'flex', flexDirection: 'column', gap: 8 }}>
                              {[
                                ['Mã hợp đồng', data.traPhong?.MaHopDong],
                                ['Phòng', data.traPhong?.hopDong?.phong?.MaPhong],
                                ['Tiền cọc gốc', formatCurrency(data.soTienCoc)],
                              ].map(([label, val]) => (
                                <div key={label} style={{ display: 'flex', justifyContent: 'space-between' }}>
                                  <span style={{ color: '#6C757D' }}>{label}:</span>
                                  <strong>{val || '—'}</strong>
                                </div>
                              ))}
                            </div>
                          </div>
                          <div className="card">
                            <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 12 }}>Tỷ lệ hoàn cọc</h3>
                            <div style={{ background: '#F0F7FF', borderRadius: 8, padding: 12, marginBottom: 12, textAlign: 'center' }}>
                              <div style={{ fontSize: 28, fontWeight: 800, color: '#0A58CA' }}>{refundRate}%</div>
                              <div style={{ fontSize: 12, color: '#6C757D', marginTop: 4 }}>{lyDoRefundRate}</div>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14 }}>
                              <span>Hoàn cọc cơ bản:</span>
                              <strong style={{ color: '#198754' }}>{formatCurrency(data.soTienHoanCoBan)}</strong>
                            </div>
                          </div>
                        </div>
                        <div>
                          <div className="card" style={{ marginBottom: 16 }}>
                            <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 12 }}>Các khoản khấu trừ</h3>
                            {data.chiTietKhauTru?.length === 0
                              ? <div style={{ textAlign: 'center', color: '#6C757D', padding: 20 }}>Không có khoản khấu trừ</div>
                              : (
                                <div>
                                  {data.chiTietKhauTru?.map((k, i) => (
                                    <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #F0F0F0', fontSize: 14 }}>
                                      <span>{LOAI_PHI_LABELS[k.LoaiPhi] || k.LoaiPhi} · {k.GhiChu}</span>
                                      <strong style={{ color: '#DC3545' }}>-{formatCurrency(k.SoTien)}</strong>
                                    </div>
                                  ))}
                                  <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700, marginTop: 8 }}>
                                    <span>Tổng khấu trừ:</span>
                                    <span style={{ color: '#DC3545' }}>-{formatCurrency(data.tongKhauTru)}</span>
                                  </div>
                                </div>
                              )
                            }
                          </div>
                          <div className="card" style={{
                            background: data.ketQua === 'HOAN_COC' ? 'linear-gradient(135deg,#F0FFF4,#E8F8EF)' : 'linear-gradient(135deg,#FFF5F5,#FFE8E8)',
                            border: `2px solid ${data.ketQua === 'HOAN_COC' ? '#198754' : '#DC3545'}`
                          }}>
                            <div style={{ textAlign: 'center' }}>
                              <div style={{ fontSize: 14, color: '#6C757D', marginBottom: 6 }}>
                                {data.ketQua === 'HOAN_COC' ? '✅ Hoàn trả cho khách' : '⚠️ Thu thêm từ khách'}
                              </div>
                              <div style={{ fontSize: 32, fontWeight: 800, color: data.ketQua === 'HOAN_COC' ? '#198754' : '#DC3545' }}>
                                {formatCurrency(data.soTienHoanCuoi)}
                              </div>
                            </div>
                          </div>
                          <Button variant="primary" fullWidth style={{ marginTop: 12 }} onClick={() => setStep(1)}>
                            Tiếp theo <FiArrowRight size={16} />
                          </Button>
                        </div>
                      </div>
                    )}

                    {step === 1 && (
                      <div className="card" style={{ maxWidth: 600, margin: '0 auto' }}>
                        <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 20, textAlign: 'center' }}>Xác nhận thanh toán</h3>
                        <div style={{ background: '#F8F9FA', borderRadius: 8, padding: 16, marginBottom: 20, fontSize: 14 }}>
                          {[
                            ['Hoàn cọc cơ bản', formatCurrency(data.soTienHoanCoBan), '#198754'],
                            ['Tổng khấu trừ', `-${formatCurrency(data.tongKhauTru)}`, '#DC3545'],
                          ].map(([l, v, c]) => (
                            <div key={l} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                              <span>{l}:</span><strong style={{ color: c }}>{v}</strong>
                            </div>
                          ))}
                          <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700, fontSize: 16, borderTop: '1px solid #E5E7EB', paddingTop: 8 }}>
                            <span>{data.ketQua === 'HOAN_COC' ? 'Hoàn cho khách:' : 'Thu thêm từ khách:'}</span>
                            <span style={{ color: data.ketQua === 'HOAN_COC' ? '#198754' : '#DC3545' }}>{formatCurrency(data.soTienHoanCuoi)}</span>
                          </div>
                        </div>
                        <div className="form-group">
                          <label className="form-label">Phương thức {data.ketQua === 'HOAN_COC' ? 'hoàn cọc' : 'thanh toán'}</label>
                          <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
                            {[['TIEN_MAT', 'Tiền mặt'], ['CHUYEN_KHOAN', 'Chuyển khoản']].map(([v, l]) => (
                              <label key={v} style={{ display: 'flex', gap: 6, cursor: 'pointer', fontSize: 14 }}>
                                <input type="radio" checked={phuongThuc === v} onChange={() => setPhuongThuc(v)} /> {l}
                              </label>
                            ))}
                          </div>
                        </div>
                        <label style={{ display: 'flex', gap: 10, alignItems: 'flex-start', cursor: 'pointer', marginBottom: 20, padding: 12, background: '#FFF9EC', borderRadius: 8, border: '1px solid #FAAD14' }}>
                          <input type="checkbox" checked={confirmed} onChange={e => setConfirmed(e.target.checked)} style={{ marginTop: 2 }} />
                          <span style={{ fontSize: 14 }}>Khách hàng đã <strong>xem xét và đồng ý</strong> kết quả đối soát.</span>
                        </label>
                        <div style={{ display: 'flex', gap: 8 }}>
                          <Button variant="outline" onClick={() => setStep(0)}>← Quay lại</Button>
                          <Button variant="primary" fullWidth loading={submitting} onClick={handleConfirm}>
                            <FiCheck size={16} style={{ marginRight: 6 }} /> Xác nhận quyết toán
                          </Button>
                        </div>
                      </div>
                    )}

                    {step === 2 && (
                      <div className="card" style={{ maxWidth: 500, margin: '0 auto', textAlign: 'center', padding: 40 }}>
                        <div style={{ fontSize: 64, marginBottom: 16 }}>🎉</div>
                        <h2 style={{ fontSize: 24, fontWeight: 700, color: '#198754', marginBottom: 8 }}>Quyết toán hoàn tất!</h2>
                        <p style={{ color: '#6C757D', marginBottom: 24 }}>Phòng đã được trả thành công và hợp đồng đã được thanh lý.</p>
                        <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
                          <Button variant="primary" onClick={() => navigate('/invoices/new', { state: { soTien: data?.soTienHoanCuoi, maHopDong: data?.traPhong?.MaHopDong, loai: 'REFUND' } })}>
                            🧾 Lập hóa đơn
                          </Button>
                          <Button variant="outline" onClick={() => { setStep(0); setSelectedId(null); setData(null); fetchRequests(); }}>Tiếp tục</Button>
                        </div>
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}