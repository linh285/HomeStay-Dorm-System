import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import toast from 'react-hot-toast';
import {
  FiUser, FiFileText, FiAlertTriangle, FiCheckCircle,
  FiXCircle, FiInfo, FiCalendar, FiHome, FiEye, FiArrowLeft,
} from 'react-icons/fi';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Badge from '../components/ui/Badge';
import Modal from '../components/ui/Modal';
import * as contractService from '../services/contractService';
import * as depositService from '../services/depositService';

const KY_THANH_TOAN_OPTIONS = [
  { value: 'MONTHLY', label: 'Hàng tháng' },
  { value: 'QUARTERLY', label: 'Hàng quý' },
  { value: 'SEMI_ANNUAL', label: '6 tháng/lần' },
  { value: 'ANNUAL', label: 'Hàng năm' },
];

const DIEU_KHOAN_TEXT = `ĐIỀU KHOẢN THUÊ PHÒNG

1. THỜI HẠN THUÊ
Hợp đồng có hiệu lực từ ngày bắt đầu đến ngày kết thúc ghi trên hợp đồng. Nếu không có thông báo trước 30 ngày, hợp đồng sẽ tự động gia hạn thêm 1 tháng.

2. THANH TOÁN
Tiền thuê phòng phải được thanh toán đầy đủ trước ngày 5 hàng tháng. Trễ hơn 7 ngày sẽ bị tính phí phạt 2%/ngày trên số tiền chưa thanh toán.

3. SỬ DỤNG PHÒNG
Khách thuê có trách nhiệm giữ gìn vệ sinh phòng và khu vực chung. Không được tự ý sửa chữa, thay đổi cơ sở vật chất. Không được cho người không có trong hợp đồng ở lại qua đêm mà không thông báo.

4. AN NINH & TRẬT TỰ
Tuân thủ giờ giấc quy định: cổng đóng lúc 23:00. Không gây ồn ào, mất trật tự sau 22:00. Không sử dụng chất kích thích, cờ bạc trong khuôn viên.

5. ĐIỆN NƯỚC & DỊCH VỤ
Tiền điện tính theo chỉ số công tơ riêng với giá 3.500đ/kWh. Tiền nước tính theo đầu người: 60.000đ/người/tháng. Phí dịch vụ vệ sinh chung: 50.000đ/phòng/tháng.

6. CHẤM DỨT HỢP ĐỒNG
Bên thuê cần thông báo trước ít nhất 30 ngày. Vi phạm điều khoản nghiêm trọng sẽ dẫn đến chấm dứt hợp đồng ngay lập tức và mất tiền cọc.`;

const formatCurrency = (n) =>
  new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(n);

const ContractCreation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const maCoc = location.state?.maCoc;

  // State cho dữ liệu từ backend
  const [loadingData, setLoadingData] = useState(true);
  const [khachHang, setKhachHang] = useState(null);
  const [phong, setPhong] = useState(null);
  const [giaThue, setGiaThue] = useState(0);
  const [soTienCoc, setSoTienCoc] = useState(0);
  const [members, setMembers] = useState([]);

  // State cho rà soát
  const [screeningSaved, setScreeningSaved] = useState(false);
  const [contractUnlocked, setContractUnlocked] = useState(false);

  // State cho form hợp đồng
  const [form, setForm] = useState({
    ngayBatDau: '',
    ngayKetThuc: '',
    soNguoiThue: '1',
    kyThanhToan: 'MONTHLY',
  });
  const [agreed, setAgreed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [infoModalOpen, setInfoModalOpen] = useState(false);
  const [createdContractId, setCreatedContractId] = useState('');

  // Dùng ref để tránh mở modal hai lần do StrictMode
  const modalOpenedRef = useRef(false);

  // Fetch dữ liệu từ deposit
  useEffect(() => {
    if (!maCoc) {
      toast.error('Không tìm thấy thông tin đặt cọc. Vui lòng quay lại.');
      navigate('/booking');
      return;
    }

    depositService.getDepositById(maCoc)
      .then(res => {
        const deposit = res.data;
        setKhachHang(deposit.khachHang);
        setPhong(deposit.phong);
        setGiaThue(deposit.phong?.GiaThue || 0);
        setSoTienCoc(deposit.SoTienCoc || 0);
        setMembers([]);
        const today = new Date().toISOString().split('T')[0];
        const nextYear = new Date();
        nextYear.setFullYear(nextYear.getFullYear() + 1);
        const nextYearStr = nextYear.toISOString().split('T')[0];
        setForm(prev => ({
          ...prev,
          ngayBatDau: today,
          ngayKetThuc: nextYearStr,
        }));
        setLoadingData(false);
      })
      .catch(err => {
        toast.error('Không thể tải thông tin đặt cọc: ' + (err.message || ''));
        navigate('/booking');
      });
  }, [maCoc, navigate]);

  const allChecked = members.length === 0 || members.every(m => m.trangThai !== null);
  const approvedCount = members.filter(m => m.trangThai === 'dat').length;
  const failedCount = members.filter(m => m.trangThai === 'khong_dat').length;
  const allFailed = members.length > 0 && failedCount === members.length;
  const someFailedNotAll = failedCount > 0 && !allFailed;

  const isFormValid = agreed && form.ngayBatDau && form.ngayKetThuc && form.soNguoiThue && form.kyThanhToan;

  const handleMemberStatus = (id, status) => {
    setMembers(prev =>
      prev.map(m => (m.id === id ? { ...m, trangThai: status } : m))
    );
    setScreeningSaved(false);
    setContractUnlocked(false);
  };

  const handleSaveScreening = () => {
    if (!allChecked) {
      toast.error('Vui lòng xét duyệt tất cả thành viên trước khi lưu.');
      return;
    }
    setScreeningSaved(true);
    if (approvedCount > 0 || members.length === 0) {
      setContractUnlocked(true);
      toast.success('Kết quả rà soát đã được lưu. Có thể lập hợp đồng.');
    } else {
      toast.error('Tất cả thành viên không đạt. Không thể lập hợp đồng.');
    }
  };

  const handleReject = () => {
    toast('Đã từ chối thuê. Yêu cầu sẽ bị huỷ.', { icon: '🚫' });
    setTimeout(() => navigate('/dashboard'), 1500);
  };

  const handlePreview = () => {
    toast('Tính năng xem trước đang được phát triển.', { icon: '📄' });
  };

  const handleCreateContract = async () => {
    if (loading) return;
    if (!isFormValid) return;
    setLoading(true);
    try {
      const res = await contractService.createContract({
        maPhong: phong?.MaPhong,
        ngayBatDau: form.ngayBatDau,
        ngayKetThuc: form.ngayKetThuc,
        giaThue: giaThue,
        noiQuy: DIEU_KHOAN_TEXT,
        chiTietThue: [],
      });
      setCreatedContractId(res?.data?.MaHopDong || '');
      // Chỉ mở modal nếu chưa mở (tránh StrictMode gọi hai lần)
      if (!modalOpenedRef.current) {
        modalOpenedRef.current = true;
        setInfoModalOpen(true);
      }
    } catch (err) {
      toast.error(err?.message || 'Tạo hợp đồng thất bại. Vui lòng thử lại.');
    } finally {
      setLoading(false);
    }
  };

  const memberStatusBadge = (trangThai) => {
    if (trangThai === 'dat')
      return <span style={s.badgeDat}><FiCheckCircle size={11} /> Đạt</span>;
    if (trangThai === 'khong_dat')
      return <span style={s.badgeKhongDat}><FiXCircle size={11} /> Không đạt</span>;
    return <span style={s.badgePending}>Chưa xét</span>;
  };

  if (loadingData) {
    return (
      <div style={s.page}>
        <div className="card" style={{ textAlign: 'center', padding: 40 }}>
          <div className="spinner" style={{ margin: '0 auto 20px' }} />
          <p>Đang tải thông tin đặt cọc...</p>
        </div>
      </div>
    );
  }

  if (!khachHang || !phong) {
    return (
      <div style={s.page}>
        <div className="card" style={{ textAlign: 'center', padding: 40, color: 'red' }}>
          <FiAlertTriangle size={48} />
          <p>Không tìm thấy thông tin hợp lệ. Vui lòng quay lại màn đăng ký.</p>
          <Button variant="primary" onClick={() => navigate('/booking')}>Quay lại</Button>
        </div>
      </div>
    );
  }

  return (
    <div style={s.page}>
      {/* Back button */}
      <div style={{ marginBottom: 20 }}>
        <button
          onClick={() => navigate(-1)}
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            padding: '6px 14px', border: '1px solid #dee2e6', borderRadius: 8,
            backgroundColor: '#fff', color: '#495057', fontSize: 14,
            fontWeight: 500, cursor: 'pointer',
          }}
        >
          <FiArrowLeft size={15} /> Quay lại
        </button>
      </div>

      {/* TOP SECTION: Screening */}
      <div style={s.card}>
        <div style={s.cardHeader}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={s.iconWrap}><FiUser size={16} color="#0A58CA" /></div>
            <div>
              <div style={s.cardTitle}>Rà soát điều kiện lưu trú</div>
              <div style={s.cardSubtitle}>Kiểm tra và xác nhận điều kiện của khách trước khi lập hợp đồng</div>
            </div>
          </div>
        </div>
        <div style={s.cardBody}>
          <div style={s.tenantInfoGrid}>
            <InfoItem icon={<FiUser size={13} />} label="Họ tên" value={khachHang?.HoTen || '—'} />
            <InfoItem icon={<FiFileText size={13} />} label="CCCD" value={khachHang?.GiayToTuyThan || '—'} />
            <InfoItem icon={<FiUser size={13} />} label="SĐT" value={khachHang?.SDT || '—'} />
            <InfoItem icon={<FiUser size={13} />} label="Loại khách" value={members.length > 0 ? 'Nhóm' : 'Cá nhân'} />
            <div style={{ gridColumn: 'span 2' }}>
              <InfoItem
                icon={<FiCheckCircle size={13} />}
                label="Trạng thái xác minh"
                value={<Badge variant="success">Đã xác minh</Badge>}
              />
            </div>
          </div>

          {members.length > 0 && (
            <div style={{ marginTop: 20 }}>
              <div style={s.tableLabel}>Danh sách thành viên nhóm</div>
              <div style={{ overflowX: 'auto' }}>
                <table style={s.table}>
                  <thead>
                    <tr><th style={s.th}>Họ tên</th><th style={s.th}>Giấy tờ</th><th style={{ ...s.th, textAlign: 'center' }}>Trạng thái</th><th style={{ ...s.th, textAlign: 'center' }}>Thao tác</th></tr>
                  </thead>
                  <tbody>
                    {members.map((m) => (
                      <tr key={m.id}>
                        <td style={s.td}>{m.hoTen}</td>
                        <td style={s.td}>{m.giayTo}</td>
                        <td style={{ ...s.td, textAlign: 'center' }}>{memberStatusBadge(m.trangThai)}</td>
                        <td style={{ ...s.td, textAlign: 'center' }}>
                          <div style={{ display: 'flex', gap: 6, justifyContent: 'center' }}>
                            <button style={{ ...s.actionBtn, ...s.actionBtnDat }} disabled={m.trangThai !== null} onClick={() => handleMemberStatus(m.id, 'dat')}>
                              <FiCheckCircle size={13} /> Đạt
                            </button>
                            <button style={{ ...s.actionBtn, ...s.actionBtnKhong }} disabled={m.trangThai !== null} onClick={() => handleMemberStatus(m.id, 'khong_dat')}>
                              <FiXCircle size={13} /> Không đạt
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {screeningSaved && someFailedNotAll && (
            <div style={s.warningBanner}>
              <FiAlertTriangle size={16} color="#856404" />
              <span><strong>{failedCount} thành viên</strong> không đạt yêu cầu. Hợp đồng chỉ áp dụng cho {approvedCount} thành viên đạt.</span>
            </div>
          )}

          <div style={s.screeningActions}>
            <Button variant="primary" onClick={handleSaveScreening} disabled={!allChecked}>
              <FiCheckCircle size={14} /> Lưu kết quả rà soát
            </Button>
            {screeningSaved && allFailed && (
              <Button variant="danger" onClick={handleReject}>
                <FiXCircle size={14} /> Từ chối thuê
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* BOTTOM SECTION: Contract Form */}
      <div style={{ ...s.card, opacity: contractUnlocked ? 1 : 0.5, pointerEvents: contractUnlocked ? 'auto' : 'none', position: 'relative' }}>
        {!contractUnlocked && (
          <div style={s.lockedOverlay}>
            <FiInfo size={18} color="#6c757d" />
            <span style={{ color: '#6c757d', fontSize: 14 }}>Chưa thể lập hợp đồng. Vui lòng hoàn tất rà soát phía trên.</span>
          </div>
        )}
        <div style={s.cardHeader}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={s.iconWrap}><FiFileText size={16} color="#0A58CA" /></div>
            <div>
              <div style={s.cardTitle}>Lập hợp đồng thuê</div>
              <div style={s.cardSubtitle}>Điền đầy đủ thông tin và xác nhận điều khoản trước khi tạo hợp đồng</div>
            </div>
          </div>
        </div>
        <div style={s.cardBody}>
          <div style={s.formGrid}>
            <Input label="Mã hợp đồng" value={`HD-${Date.now()}`} readOnly onChange={() => {}} />
            <Input label="Ngày bắt đầu" type="date" required value={form.ngayBatDau} onChange={(e) => setForm(f => ({ ...f, ngayBatDau: e.target.value }))} icon={<FiCalendar size={14} />} />
            <Input label="Khách thuê" value={khachHang?.HoTen || ''} readOnly onChange={() => {}} icon={<FiUser size={14} />} />
            <Input label="Ngày kết thúc" type="date" required value={form.ngayKetThuc} onChange={(e) => setForm(f => ({ ...f, ngayKetThuc: e.target.value }))} icon={<FiCalendar size={14} />} />
            <Input label="Phòng / Giường" value={phong?.MaPhong || ''} readOnly onChange={() => {}} icon={<FiHome size={14} />} />
            <Input label="Giá thuê (VNĐ/tháng)" value={formatCurrency(giaThue)} readOnly onChange={() => {}} />
            <Input label="Số người thuê" type="number" required value={form.soNguoiThue} onChange={(e) => setForm(f => ({ ...f, soNguoiThue: e.target.value }))} placeholder="Nhập số người" />
            <Input label="Kỳ thanh toán" type="select" required value={form.kyThanhToan} onChange={(e) => setForm(f => ({ ...f, kyThanhToan: e.target.value }))} options={KY_THANH_TOAN_OPTIONS} />
          </div>

          <div style={{ marginTop: 20 }}>
            <Input label="Điều khoản hợp đồng" type="textarea" value={DIEU_KHOAN_TEXT} readOnly onChange={() => {}} rows={6} />
            <style>{`textarea[readonly] { height: 120px !important; overflow-y: auto !important; resize: none !important; }`}</style>
          </div>

          <label style={s.checkboxLabel}>
            <input type="checkbox" checked={agreed} onChange={(e) => setAgreed(e.target.checked)} style={s.checkbox} />
            <span>Tôi đã đọc và đồng ý với <span style={{ color: '#0A58CA', fontWeight: 500 }}>điều khoản hợp đồng</span> nêu trên</span>
          </label>

          <div style={s.contractActions}>
            <Button variant="outline" onClick={handlePreview} disabled={!contractUnlocked}><FiEye size={14} /> Xem trước hợp đồng</Button>
            <Button variant="primary" onClick={handleCreateContract} loading={loading} disabled={!isFormValid || !contractUnlocked}><FiFileText size={14} /> Tạo hợp đồng</Button>
          </div>
        </div>
      </div>

      {/* Info Modal */}
      <Modal
        isOpen={infoModalOpen}
        onClose={() => {
          setInfoModalOpen(false);
          modalOpenedRef.current = false; // reset flag khi đóng modal
          navigate('/dashboard');
        }}
        title="Hợp đồng đã được tạo"
        size="md"
        footer={
          <Button variant="primary" onClick={() => {
            setInfoModalOpen(false);
            modalOpenedRef.current = false;
            navigate('/dashboard');
          }}>Về trang chủ</Button>
        }
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={s.modalSuccessIcon}><FiCheckCircle size={48} color="#198754" /></div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontWeight: 600, fontSize: 16, marginBottom: 8 }}>Hợp đồng <span style={{ color: '#0A58CA' }}>{createdContractId}</span> đã được tạo thành công!</div>
            <div style={{ color: '#6c757d', fontSize: 14, lineHeight: 1.6 }}>Hợp đồng hiện đang ở trạng thái <Badge variant="warning">PENDING_FIRST_PAYMENT</Badge> — chờ khách thanh toán tiền thuê kỳ đầu tiên.</div>
          </div>
          <div style={s.infoBanner}><FiInfo size={15} color="#084298" /><span style={{ fontSize: 13 }}>Sau khi khách thanh toán thành công, hợp đồng sẽ tự động chuyển sang trạng thái <strong>ACTIVE</strong> và bạn có thể tiến hành bàn giao phòng.</span></div>
        </div>
      </Modal>
    </div>
  );
};

const InfoItem = ({ icon, label, value }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
    <span style={{ fontSize: 12, color: '#6c757d', display: 'flex', alignItems: 'center', gap: 4 }}>{icon} {label}</span>
    <span style={{ fontSize: 14, fontWeight: 500, color: '#212529' }}>{value}</span>
  </div>
);

const s = {
  page: { padding: '24px', maxWidth: '1000px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '20px', fontFamily: 'Inter, sans-serif' },
  card: { backgroundColor: '#ffffff', borderRadius: '12px', border: '1px solid #e9ecef', boxShadow: '0 1px 4px rgba(0,0,0,0.06)', overflow: 'hidden', transition: 'opacity 0.2s ease' },
  cardHeader: { padding: '18px 24px', borderBottom: '1px solid #e9ecef', backgroundColor: '#fafbfc' },
  cardTitle: { fontSize: '16px', fontWeight: '600', color: '#212529' },
  cardSubtitle: { fontSize: '13px', color: '#6c757d', marginTop: '2px' },
  cardBody: { padding: '24px' },
  iconWrap: { width: '36px', height: '36px', borderRadius: '8px', backgroundColor: '#e8f0fe', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 },
  tenantInfoGrid: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' },
  tableLabel: { fontSize: '13px', fontWeight: '600', color: '#495057', marginBottom: '10px' },
  table: { width: '100%', borderCollapse: 'collapse', fontSize: '14px' },
  th: { padding: '10px 14px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#6c757d', backgroundColor: '#f8f9fa', borderBottom: '1px solid #e9ecef', textTransform: 'uppercase', letterSpacing: '0.4px', whiteSpace: 'nowrap' },
  td: { padding: '12px 14px', color: '#212529', verticalAlign: 'middle' },
  badgeDat: { display: 'inline-flex', alignItems: 'center', gap: 4, padding: '3px 9px', borderRadius: '20px', fontSize: '12px', fontWeight: '500', backgroundColor: '#d1e7dd', color: '#0f5132' },
  badgeKhongDat: { display: 'inline-flex', alignItems: 'center', gap: 4, padding: '3px 9px', borderRadius: '20px', fontSize: '12px', fontWeight: '500', backgroundColor: '#f8d7da', color: '#842029' },
  badgePending: { display: 'inline-flex', alignItems: 'center', padding: '3px 9px', borderRadius: '20px', fontSize: '12px', fontWeight: '500', backgroundColor: '#f1f3f5', color: '#6c757d' },
  actionBtn: { display: 'inline-flex', alignItems: 'center', gap: 4, padding: '5px 12px', borderRadius: '6px', fontSize: '12px', fontWeight: '500', border: '1px solid transparent', transition: 'opacity 0.15s' },
  actionBtnDat: { backgroundColor: '#d1e7dd', color: '#0f5132', border: '1px solid #badbcc' },
  actionBtnKhong: { backgroundColor: '#f8d7da', color: '#842029', border: '1px solid #f5c2c7' },
  warningBanner: { display: 'flex', alignItems: 'flex-start', gap: '10px', marginTop: '16px', padding: '12px 16px', borderRadius: '8px', backgroundColor: '#fff3cd', border: '1px solid #ffecb5', fontSize: '13px', color: '#664d03', lineHeight: 1.5 },
  screeningActions: { display: 'flex', gap: '12px', marginTop: '20px', flexWrap: 'wrap' },
  lockedOverlay: { display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', padding: '10px 0 0' },
  formGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' },
  checkboxLabel: { display: 'flex', alignItems: 'center', gap: '10px', marginTop: '18px', fontSize: '14px', color: '#495057', cursor: 'pointer', userSelect: 'none' },
  checkbox: { width: '16px', height: '16px', accentColor: '#0A58CA', cursor: 'pointer', flexShrink: 0 },
  contractActions: { display: 'flex', gap: '12px', marginTop: '20px', justifyContent: 'flex-end', flexWrap: 'wrap' },
  modalSuccessIcon: { display: 'flex', justifyContent: 'center', marginTop: 8 },
  infoBanner: { display: 'flex', alignItems: 'flex-start', gap: '10px', padding: '12px 14px', borderRadius: '8px', backgroundColor: '#cfe2ff', border: '1px solid #b6d4fe', color: '#084298', lineHeight: 1.55 },
};

export default ContractCreation;