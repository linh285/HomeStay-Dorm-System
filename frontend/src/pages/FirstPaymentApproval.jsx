import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { FiCheckCircle, FiRefreshCw } from 'react-icons/fi';
import Sidebar from '../components/layout/Sidebar';
import Topbar from '../components/layout/Topbar';
import Button from '../components/ui/Button';
import Modal from '../components/ui/Modal';
import Badge from '../components/ui/Badge';
import { getContracts, activateContract } from '../services/contractService';
import { formatCurrency, formatDate, contractStatusConfig } from '../utils/formatters';

export default function FirstPaymentApproval() {
  const [contracts, setContracts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    soTien: '',
    phuongThuc: 'TIEN_MAT',
    maSoChungTu: '',
    ghiChu: '',
  });

  const fetchContracts = async () => {
    setLoading(true);
    try {
      const res = await getContracts({ tinhTrang: 'PENDING_FIRST_PAYMENT', limit: 100 });
      setContracts(res?.data?.contracts || []);
    } catch (err) {
      toast.error(err?.message || 'Không thể tải hợp đồng chờ thanh toán');
      setContracts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchContracts(); }, []);

  const openConfirm = (contract) => {
    setSelected(contract);
    setForm({
      soTien: contract.GiaThue || '',
      phuongThuc: 'TIEN_MAT',
      maSoChungTu: '',
      ghiChu: '',
    });
  };

  const handleConfirm = async () => {
    if (!selected) return;
    if (!Number(form.soTien) || Number(form.soTien) <= 0) {
      toast.error('Số tiền thanh toán không hợp lệ');
      return;
    }

    setSubmitting(true);
    try {
      await activateContract(selected.MaHopDong, form);
      toast.success('Đã xác nhận thanh toán kỳ đầu và kích hoạt hợp đồng');
      setSelected(null);
      fetchContracts();
    } catch (err) {
      toast.error(err?.message || 'Xác nhận thanh toán thất bại');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="app-layout">
      <Sidebar />
      <div className="app-content">
        <Topbar title="Thanh toán kỳ đầu" />
        <main className="main-content">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
            <div>
              <h1 style={{ fontSize: 22, fontWeight: 700, margin: 0 }}>Hợp đồng chờ thanh toán kỳ đầu</h1>
              <p style={{ color: '#6C757D', margin: '4px 0 0' }}>Kế toán xác nhận khoản thu ban đầu trước khi bàn giao phòng.</p>
            </div>
            <Button variant="outline" onClick={fetchContracts} size="sm">
              <FiRefreshCw size={14} /> Làm mới
            </Button>
          </div>

          <div className="card">
            {loading ? (
              <div style={{ padding: 40, textAlign: 'center' }}>Đang tải...</div>
            ) : contracts.length === 0 ? (
              <div style={{ padding: 40, textAlign: 'center', color: '#6C757D' }}>Không có hợp đồng chờ thanh toán kỳ đầu</div>
            ) : (
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead style={{ backgroundColor: '#f8f9fa', borderBottom: '2px solid #e9ecef' }}>
                    <tr>
                      <th style={th}>Mã hợp đồng</th>
                      <th style={th}>Khách / nhóm</th>
                      <th style={th}>Phòng</th>
                      <th style={{ ...th, textAlign: 'right' }}>Số tiền kỳ đầu</th>
                      <th style={th}>Ngày ký</th>
                      <th style={th}>Trạng thái</th>
                      <th style={{ ...th, textAlign: 'center' }}>Thao tác</th>
                    </tr>
                  </thead>
                  <tbody>
                    {contracts.map((contract) => {
                      const cfg = contractStatusConfig[contract.TinhTrang] || { label: contract.TinhTrang, color: 'warning' };
                      return (
                        <tr key={contract.MaHopDong} style={{ borderBottom: '1px solid #f1f3f5' }}>
                          <td style={td}><strong>{contract.MaHopDong}</strong></td>
                          <td style={td}>{contract.nhom?.daiDien?.HoTen || '—'}</td>
                          <td style={td}>{contract.phong?.MaPhong || '—'}</td>
                          <td style={{ ...td, textAlign: 'right' }}>{formatCurrency(contract.GiaThue)}</td>
                          <td style={td}>{formatDate(contract.NgayKy)}</td>
                          <td style={td}><Badge variant={cfg.color}>{cfg.label}</Badge></td>
                          <td style={{ ...td, textAlign: 'center' }}>
                            <Button variant="primary" size="sm" onClick={() => openConfirm(contract)}>
                              <FiCheckCircle size={14} /> Xác nhận thu
                            </Button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          <Modal
            isOpen={!!selected}
            onClose={() => setSelected(null)}
            title="Xác nhận thanh toán kỳ đầu"
            size="md"
            footer={
              <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
                <Button variant="outline" onClick={() => setSelected(null)}>Hủy</Button>
                <Button variant="primary" loading={submitting} onClick={handleConfirm}>Xác nhận</Button>
              </div>
            }
          >
            {selected && (
              <div>
                <div style={{ background: '#F8F9FA', borderRadius: 8, padding: 14, marginBottom: 16, fontSize: 14 }}>
                  <div><span style={{ color: '#6C757D' }}>Mã hợp đồng:</span> <strong>{selected.MaHopDong}</strong></div>
                  <div style={{ marginTop: 6 }}><span style={{ color: '#6C757D' }}>Phòng:</span> <strong>{selected.phong?.MaPhong || '—'}</strong></div>
                </div>
                <div className="form-group">
                  <label className="form-label">Số tiền *</label>
                  <input className="form-control" type="number" value={form.soTien} onChange={e => setForm(f => ({ ...f, soTien: e.target.value }))} />
                </div>
                <div className="form-group">
                  <label className="form-label">Phương thức *</label>
                  <div style={{ display: 'flex', gap: 12 }}>
                    {['TIEN_MAT', 'CHUYEN_KHOAN', 'THE'].map(method => (
                      <label key={method} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                        <input type="radio" checked={form.phuongThuc === method} onChange={() => setForm(f => ({ ...f, phuongThuc: method }))} />
                        {method === 'TIEN_MAT' ? 'Tiền mặt' : method === 'CHUYEN_KHOAN' ? 'Chuyển khoản' : 'Thẻ'}
                      </label>
                    ))}
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label">Số chứng từ</label>
                  <input className="form-control" value={form.maSoChungTu} onChange={e => setForm(f => ({ ...f, maSoChungTu: e.target.value }))} />
                </div>
                <div className="form-group">
                  <label className="form-label">Ghi chú</label>
                  <textarea className="form-control" rows={2} value={form.ghiChu} onChange={e => setForm(f => ({ ...f, ghiChu: e.target.value }))} />
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
