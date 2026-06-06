import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiCheck, FiRefreshCw, FiDollarSign } from 'react-icons/fi';
import toast from 'react-hot-toast';
import Sidebar from '../components/layout/Sidebar';
import Topbar from '../components/layout/Topbar';
import Button from '../components/ui/Button';
import Modal from '../components/ui/Modal';
import { getContracts, activateContract } from '../services/contractService';
import { formatCurrency, formatDate } from '../utils/formatters';

export default function FirstPaymentConfirmation() {
  const navigate = useNavigate();
  const [contracts, setContracts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedContract, setSelectedContract] = useState(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const fetchContracts = async () => {
    setLoading(true);
    try {
      const res = await getContracts({ tinhTrang: 'PENDING_FIRST_PAYMENT' });
      const list = res?.data?.contracts || [];
      setContracts(list);
    } catch (err) {
      toast.error('Không thể tải danh sách hợp đồng');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContracts();
  }, []);

  const handleConfirm = async () => {
    if (!selectedContract) return;
    setSubmitting(true);
    try {
      await activateContract(selectedContract.MaHopDong);
      toast.success(`Hợp đồng ${selectedContract.MaHopDong} đã được kích hoạt!`);
      setConfirmOpen(false);
      setSelectedContract(null);
      fetchContracts();
    } catch (err) {
      toast.error(err?.message || 'Kích hoạt thất bại');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="app-layout">
      <Sidebar />
      <div className="app-content">
        <Topbar title="Xác nhận thanh toán kỳ đầu" />
        <main className="main-content">
          <h1 style={{ fontSize: 22, fontWeight: 700, marginBottom: 20 }}>Xác nhận thanh toán kỳ đầu</h1>
          <div className="card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <h3 style={{ margin: 0, fontSize: 16, fontWeight: 600 }}>Danh sách hợp đồng chờ thanh toán</h3>
              <button onClick={fetchContracts} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                <FiRefreshCw size={16} />
              </button>
            </div>
            {loading ? (
              <div className="skeleton" style={{ height: 200 }} />
            ) : contracts.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '40px 0', color: '#6C757D' }}>
                <FiDollarSign size={40} style={{ opacity: 0.4 }} />
                <p>Không có hợp đồng nào đang chờ thanh toán kỳ đầu</p>
              </div>
            ) : (
              <div style={{ overflowX: 'auto' }}>
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Mã hợp đồng</th>
                      <th>Phòng</th>
                      <th>Khách hàng</th>
                      <th>Giá thuê</th>
                      <th>Ngày ký</th>
                      <th>Ngày bắt đầu</th>
                      <th>Thao tác</th>
                    </tr>
                  </thead>
                  <tbody>
                    {contracts.map(contract => (
                      <tr key={contract.MaHopDong}>
                        <td><strong>{contract.MaHopDong}</strong></td>
                        <td>{contract.phong?.MaPhong || '—'}</td>
                        <td>{contract.nhom?.daiDien?.HoTen || '—'}</td>
                        <td>{formatCurrency(contract.GiaThue)}</td>
                        <td>{formatDate(contract.NgayKy)}</td>
                        <td>{formatDate(contract.NgayBatDau)}</td>
                        <td>
                          <Button
                            variant="primary"
                            size="sm"
                            onClick={() => {
                              setSelectedContract(contract);
                              setConfirmOpen(true);
                            }}
                          >
                            <FiCheck size={14} /> Xác nhận thanh toán
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          <Modal
            isOpen={confirmOpen}
            onClose={() => setConfirmOpen(false)}
            title="Xác nhận thanh toán kỳ đầu"
            size="sm"
            footer={
              <div style={{ display: 'flex', gap: 8 }}>
                <Button variant="outline" onClick={() => setConfirmOpen(false)}>Hủy</Button>
                <Button variant="primary" loading={submitting} onClick={handleConfirm}>Xác nhận</Button>
              </div>
            }
          >
            {selectedContract && (
              <div>
                <p>Xác nhận đã thu đủ tiền thuê kỳ đầu của hợp đồng <strong>{selectedContract.MaHopDong}</strong>?</p>
                <p style={{ fontSize: 13, color: '#6C757D' }}>Hành động này sẽ kích hoạt hợp đồng và cho phép bàn giao phòng.</p>
              </div>
            )}
          </Modal>
        </main>
      </div>
    </div>
  );
}