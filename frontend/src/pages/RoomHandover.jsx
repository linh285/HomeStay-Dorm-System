import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiCheck, FiAlertTriangle, FiPlus, FiSearch, FiRefreshCw, FiFilter } from 'react-icons/fi';
import toast from 'react-hot-toast';
import Sidebar from '../components/layout/Sidebar';
import Topbar from '../components/layout/Topbar';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Badge from '../components/ui/Badge';
import { getHandover, createHandover, confirmHandover, updateAssetCheck, getHandovers } from '../services/handoverService';
import { getContracts } from '../services/contractService';
import { formatDate, formatCurrency } from '../utils/formatters';

export default function RoomHandover() {
  const navigate = useNavigate();

  // ========== TÌM KIẾM HỢP ĐỒNG ==========
  const [searchKeyword, setSearchKeyword] = useState('');
  const [searching, setSearching] = useState(false);
  const [foundContract, setFoundContract] = useState(null);
  const [selectedContract, setSelectedContract] = useState(null);

  // ========== BÀN GIAO HIỆN TẠI ==========
  const [bangGiao, setBangGiao] = useState(null);
  const [loadingBG, setLoadingBG] = useState(false);
  const [assets, setAssets] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [creating, setCreating] = useState(false);

  // ========== LỊCH SỬ BÀN GIAO (FILTER) ==========
  const [historyHandovers, setHistoryHandovers] = useState([]);
  const [loadingHistory, setLoadingHistory] = useState(false);
  const [historyFilters, setHistoryFilters] = useState({
    search: '',
    trangThai: '',
    fromDate: '',
    toDate: '',
  });

  // Hàm tìm kiếm hợp đồng (theo mã HD hoặc SĐT)
  const handleSearchContract = async () => {
    if (!searchKeyword.trim()) {
      toast.error('Vui lòng nhập mã hợp đồng hoặc SĐT');
      return;
    }
    setSearching(true);
    setFoundContract(null);
    try {
      const res = await getContracts({ search: searchKeyword });
      // Cấu trúc: { data: { contracts: [...] } }
      const list = res?.data?.contracts || [];
      if (list.length === 0) {
        toast.error('Không tìm thấy hợp đồng nào');
        return;
      }
      // Ưu tiên hợp đồng đang ACTIVE, nếu không thì lấy cái đầu tiên
      const active = list.find(c => c.TinhTrang === 'ACTIVE');
      const contract = active || list[0];
      setFoundContract(contract);
      toast.success(`Tìm thấy hợp đồng ${contract.MaHopDong}`);
    } catch (err) {
      console.error(err);
      toast.error('Lỗi tìm kiếm hợp đồng');
    } finally {
      setSearching(false);
    }
  };

  // Chọn hợp đồng để bàn giao
  const handleSelectContract = () => {
    if (!foundContract) return;
    setSelectedContract(foundContract);
    setFoundContract(null);
    setSearchKeyword('');
    setBangGiao(null);
    setAssets([]);
  };

  // Khi selectedContract thay đổi, lấy biên bản bàn giao nếu có
  useEffect(() => {
    if (!selectedContract) return;
    setLoadingBG(true);
    getHandover(selectedContract.MaHopDong)
      .then(r => {
        const handover = r?.data;
        setBangGiao(handover);
        setAssets(handover?.taiSans?.map(ts => ({
          ...ts,
          soLuong: ts.BangGiaoTaiSan?.SoLuong || 1,
          tinhTrang: ts.BangGiaoTaiSan?.TinhTrangLucGiao || 'Tốt',
          daKiemTra: ts.BangGiaoTaiSan?.DaKiemTra || false,
        })) || []);
      })
      .catch(() => setBangGiao(null))
      .finally(() => setLoadingBG(false));
  }, [selectedContract]);

  // Tạo biên bản bàn giao mới
  const handleCreateBangGiao = async () => {
    setCreating(true);
    try {
      const res = await createHandover(selectedContract.MaHopDong);
      const handover = res?.data;
      setBangGiao(handover);
      setAssets(handover?.taiSans?.map(ts => ({
        ...ts,
        soLuong: ts.BangGiaoTaiSan?.SoLuong || 1,
        tinhTrang: ts.BangGiaoTaiSan?.TinhTrangLucGiao || 'Tốt',
        daKiemTra: false,
      })) || []);
      toast.success('Tạo biên bản bàn giao thành công');
    } catch (err) {
      toast.error(err?.message || 'Tạo biên bản thất bại');
    } finally {
      setCreating(false);
    }
  };

  const handleAssetChange = async (index, field, value) => {
    const updated = assets.map((a, i) => i === index ? { ...a, [field]: value } : a);
    setAssets(updated);
    if (bangGiao && field === 'daKiemTra') {
      const asset = updated[index];
      try {
        await updateAssetCheck(bangGiao.MaBanGiao, asset.MaTaiSan, {
          daKiemTra: asset.daKiemTra,
          tinhTrangLucGiao: asset.tinhTrang,
        });
      } catch {
        toast.error('Cập nhật tài sản thất bại');
      }
    }
  };

  const handleConfirm = async () => {
    if (!bangGiao) return;
    const unchecked = assets.filter(a => !a.daKiemTra);
    if (unchecked.length > 0) {
      toast.error(`Còn ${unchecked.length} tài sản chưa kiểm tra`);
      return;
    }
    setSubmitting(true);
    try {
      await confirmHandover(bangGiao.MaBanGiao);
      toast.success('✅ Xác nhận bàn giao thành công! Phòng đã chuyển sang OCCUPIED.');
      // Sau khi bàn giao thành công, reset selectedContract để có thể chọn hợp đồng khác
      setSelectedContract(null);
      setBangGiao(null);
      setAssets([]);
      // Reload danh sách lịch sử bàn giao (nếu có)
      loadHistoryHandovers();
      navigate('/dashboard');
    } catch (err) {
      toast.error(err?.message || 'Xác nhận thất bại');
    } finally {
      setSubmitting(false);
    }
  };

  // ========== Lấy lịch sử bàn giao (có filter) ==========
  const loadHistoryHandovers = async () => {
    setLoadingHistory(true);
    try {
      // Tạo params từ filter
      const params = {};
      if (historyFilters.search) params.search = historyFilters.search;
      if (historyFilters.trangThai) params.trangThai = historyFilters.trangThai;
      if (historyFilters.fromDate) params.fromDate = historyFilters.fromDate;
      if (historyFilters.toDate) params.toDate = historyFilters.toDate;

      // Gọi API lấy danh sách bàn giao (cần được thêm trong handoverService)
      // Giả sử service có hàm getHandovers(params)
      const res = await getHandovers(params);
      const list = res?.data?.handovers || [];
      setHistoryHandovers(list);
    } catch (err) {
      console.error('Lỗi tải lịch sử bàn giao:', err);
      toast.error('Không thể tải lịch sử bàn giao');
    } finally {
      setLoadingHistory(false);
    }
  };

  useEffect(() => {
    loadHistoryHandovers();
  }, [historyFilters]);

  const checkedCount = assets.filter(a => a.daKiemTra).length;
  const allChecked = assets.length > 0 && checkedCount === assets.length;
  const isContractActive = selectedContract?.TinhTrang === 'ACTIVE';

  // Helper để hiển thị trạng thái bàn giao
  const renderHistoryStatus = (status) => {
    const variant = status === 'COMPLETED' ? 'available' : status === 'PENDING' ? 'warning' : 'secondary';
    const label = status === 'COMPLETED' ? 'Hoàn tất' : status === 'PENDING' ? 'Chờ xử lý' : 'Khác';
    return <Badge variant={variant}>{label}</Badge>;
  };

  return (
    <div className="app-layout">
      <Sidebar />
      <div className="app-content">
        <Topbar title="Bàn giao phòng" />
        <main className="main-content">
          <h1 style={{ fontSize: 22, fontWeight: 700, marginBottom: 20 }}>Bàn giao phòng</h1>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
            {/* CỘT TRÁI: Xử lý bàn giao cho hợp đồng mới */}
            <div>
              {/* Tìm kiếm hợp đồng */}
              <div className="card" style={{ marginBottom: 16 }}>
                <div className="card-header">
                  <h3 className="card-title">1. Tìm hợp đồng cần bàn giao</h3>
                </div>
                <div className="card-body">
                  <div style={{ display: 'flex', gap: 8 }}>
                    <Input
                      placeholder="Nhập mã hợp đồng hoặc SĐT..."
                      value={searchKeyword}
                      onChange={(e) => setSearchKeyword(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleSearchContract()}
                      style={{ flex: 1 }}
                    />
                    <Button variant="primary" onClick={handleSearchContract} loading={searching}>
                      <FiSearch size={16} /> Tìm
                    </Button>
                  </div>

                  {foundContract && (
                    <div style={{ marginTop: 12, background: '#F0FFF4', border: '1px solid #198754', borderRadius: 8, padding: 12 }}>
                      <div style={{ fontWeight: 600, marginBottom: 6 }}>✅ Kết quả tìm kiếm</div>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6, fontSize: 13 }}>
                        <div><span style={{ color: '#6C757D' }}>Mã HD:</span> <strong>{foundContract.MaHopDong}</strong></div>
                        <div><span style={{ color: '#6C757D' }}>Phòng:</span> <strong>{foundContract.phong?.MaPhong}</strong></div>
                        <div><span style={{ color: '#6C757D' }}>Khách:</span> <strong>{foundContract.nhom?.daiDien?.HoTen}</strong></div>
                        <div><span style={{ color: '#6C757D' }}>Trạng thái:</span> <Badge variant={foundContract.TinhTrang === 'ACTIVE' ? 'available' : 'warning'}>{foundContract.TinhTrang === 'ACTIVE' ? 'Đang hiệu lực' : 'Chờ thanh toán kỳ đầu'}</Badge></div>
                      </div>
                      <Button variant="primary" size="sm" onClick={handleSelectContract} style={{ marginTop: 10 }}>Chọn hợp đồng này</Button>
                    </div>
                  )}

                  {selectedContract && !foundContract && (
                    <div style={{ marginTop: 12, background: '#E8F0FE', borderRadius: 8, padding: 12 }}>
                      <div style={{ fontWeight: 600 }}>📄 Hợp đồng đang chọn: <strong>{selectedContract.MaHopDong}</strong></div>
                      <div style={{ fontSize: 13, marginTop: 4 }}>Phòng {selectedContract.phong?.MaPhong} - {selectedContract.nhom?.daiDien?.HoTen}</div>
                      <Button variant="outline" size="sm" onClick={() => setSelectedContract(null)} style={{ marginTop: 8 }}>Đổi hợp đồng</Button>
                    </div>
                  )}
                </div>
              </div>

              {/* Thông tin hợp đồng và bàn giao */}
              {selectedContract && (
                <>
                  <div className="card" style={{ marginBottom: 16 }}>
                    <div className="card-header">
                      <h3 className="card-title">Thông tin hợp đồng</h3>
                    </div>
                    <div className="card-body">
                      <div style={{ fontSize: 14, display: 'flex', flexDirection: 'column', gap: 10 }}>
                        {[
                          ['Mã HD', selectedContract.MaHopDong],
                          ['Khách thuê', selectedContract.nhom?.daiDien?.HoTen],
                          ['Phòng', selectedContract.phong?.MaPhong],
                          ['Ngày bắt đầu', formatDate(selectedContract.NgayBatDau)],
                          ['Giá thuê', formatCurrency(selectedContract.GiaThue)],
                        ].map(([l, v]) => (
                          <div key={l} style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span style={{ color: '#6C757D' }}>{l}:</span>
                            <strong>{v || '—'}</strong>
                          </div>
                        ))}
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <span style={{ color: '#6C757D' }}>Trạng thái HĐ:</span>
                          <Badge variant={isContractActive ? 'available' : 'warning'}>
                            {isContractActive ? 'Đang hiệu lực' : 'Chờ thanh toán kỳ đầu'}
                          </Badge>
                        </div>
                      </div>
                      {!isContractActive && (
                        <div style={{ background: '#FFF2F2', border: '1px solid #DC3545', borderRadius: 8, padding: 12, marginTop: 12, fontSize: 13, color: '#DC3545' }}>
                          <FiAlertTriangle style={{ marginRight: 6 }} />
                          Hợp đồng chưa được thanh toán tiền thuê kỳ đầu. Không thể bàn giao phòng.
                        </div>
                      )}
                    </div>
                  </div>

                  {bangGiao && (
                    <div className="card" style={{ marginBottom: 16 }}>
                      <div className="card-header">
                        <h3 className="card-title">Trạng thái bàn giao</h3>
                      </div>
                      <div className="card-body">
                        <Badge variant={bangGiao.TinhTrang === 'COMPLETED' ? 'available' : 'warning'}>
                          {bangGiao.TinhTrang === 'COMPLETED' ? '✅ Đã bàn giao' : '⏳ Đang chờ xác nhận'}
                        </Badge>
                        <div style={{ marginTop: 10, fontSize: 13, color: '#6C757D' }}>
                          Đã kiểm tra: {checkedCount}/{assets.length} tài sản
                        </div>
                      </div>
                    </div>
                  )}

                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    {!bangGiao && isContractActive && (
                      <Button variant="outline" fullWidth loading={creating} onClick={handleCreateBangGiao}>
                        <FiPlus size={16} style={{ marginRight: 6 }} /> Tạo biên bản bàn giao
                      </Button>
                    )}
                    {bangGiao?.TinhTrang !== 'COMPLETED' && (
                      <Button
                        variant="primary"
                        fullWidth
                        loading={submitting}
                        disabled={!bangGiao || !allChecked || !isContractActive}
                        onClick={handleConfirm}
                        title={!allChecked ? 'Cần hoàn tất kiểm tra tài sản' : ''}
                      >
                        <FiCheck size={16} style={{ marginRight: 6 }} /> Xác nhận bàn giao
                      </Button>
                    )}
                    {bangGiao?.TinhTrang === 'COMPLETED' && (
                      <div style={{ background: '#F0FFF4', border: '1px solid #198754', borderRadius: 8, padding: '10px 14px', textAlign: 'center', color: '#198754', fontWeight: 600, fontSize: 14 }}>
                        ✅ Bàn giao đã hoàn thành
                      </div>
                    )}
                  </div>

                  {/* Bảng kiểm tài sản */}
                  {bangGiao && (
                    <div className="card" style={{ marginTop: 16 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                        <h3 style={{ fontSize: 16, fontWeight: 600, margin: 0 }}>Biên bản bàn giao tài sản</h3>
                        <span style={{ fontSize: 13, color: '#6C757D' }}>Đã kiểm tra: {checkedCount}/{assets.length}</span>
                      </div>
                      {loadingBG ? (
                        <div className="skeleton" style={{ height: 200 }} />
                      ) : assets.length === 0 ? (
                        <div style={{ textAlign: 'center', padding: 40, color: '#6C757D' }}>
                          {bangGiao ? 'Không có tài sản' : 'Chưa có biên bản. Nhấn "Tạo biên bản" để bắt đầu.'}
                        </div>
                      ) : (
                        <table className="data-table">
                          <thead>
                            <tr>
                              <th style={{ width: '40%' }}>Tên tài sản</th>
                              <th style={{ width: '15%' }}>Số lượng</th>
                              <th style={{ width: '25%' }}>Tình trạng</th>
                              <th style={{ width: '20%', textAlign: 'center' }}>Đã kiểm tra</th>
                            </tr>
                          </thead>
                          <tbody>
                            {assets.map((asset, i) => (
                              <tr key={asset.MaTaiSan} style={{ background: asset.daKiemTra ? '#F0FFF4' : 'white' }}>
                                <td>{asset.TenTaiSan}</td>
                                <td>{asset.soLuong}</td>
                                <td>
                                  <select
                                    className="form-control"
                                    style={{ padding: '4px 8px', fontSize: 13 }}
                                    value={asset.tinhTrang}
                                    onChange={e => handleAssetChange(i, 'tinhTrang', e.target.value)}
                                  >
                                    <option value="Mới">Mới</option>
                                    <option value="Tốt">Tốt</option>
                                    <option value="Hư hỏng">Hư hỏng</option>
                                  </select>
                                </td>
                                <td style={{ textAlign: 'center' }}>
                                  <input
                                    type="checkbox"
                                    checked={asset.daKiemTra}
                                    onChange={e => handleAssetChange(i, 'daKiemTra', e.target.checked)}
                                    style={{ width: 18, height: 18, cursor: 'pointer', accentColor: '#198754' }}
                                  />
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      )}
                      {allChecked && (
                        <div style={{ background: '#F0FFF4', border: '1px solid #198754', borderRadius: 8, padding: 12, marginTop: 12, textAlign: 'center', color: '#198754', fontSize: 14, fontWeight: 600 }}>
                          ✅ Tất cả tài sản đã được kiểm tra. Sẵn sàng xác nhận bàn giao!
                        </div>
                      )}
                    </div>
                  )}
                </>
              )}
            </div>

            {/* CỘT PHẢI: Lịch sử bàn giao (có bộ lọc) */}
            <div className="card">
              <div className="card-header">
                <h3 className="card-title">Lịch sử bàn giao</h3>
                <button onClick={loadHistoryHandovers} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                  <FiRefreshCw size={16} />
                </button>
              </div>
              <div className="card-body">
                {/* Bộ lọc */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 16 }}>
                  <Input
                    placeholder="Tìm theo tên khách, phòng, mã HD..."
                    value={historyFilters.search}
                    onChange={(e) => setHistoryFilters(f => ({ ...f, search: e.target.value }))}
                  />
                  <select
                    className="form-control"
                    value={historyFilters.trangThai}
                    onChange={(e) => setHistoryFilters(f => ({ ...f, trangThai: e.target.value }))}
                  >
                    <option value="">Tất cả trạng thái</option>
                    <option value="COMPLETED">Hoàn tất</option>
                    <option value="PENDING">Đang xử lý</option>
                  </select>
                  <Input
                    type="date"
                    placeholder="Từ ngày"
                    value={historyFilters.fromDate}
                    onChange={(e) => setHistoryFilters(f => ({ ...f, fromDate: e.target.value }))}
                  />
                  <Input
                    type="date"
                    placeholder="Đến ngày"
                    value={historyFilters.toDate}
                    onChange={(e) => setHistoryFilters(f => ({ ...f, toDate: e.target.value }))}
                  />
                </div>

                {loadingHistory ? (
                  <div className="skeleton" style={{ height: 200 }} />
                ) : historyHandovers.length === 0 ? (
                  <div style={{ textAlign: 'center', padding: 40, color: '#6C757D' }}>Chưa có dữ liệu bàn giao</div>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 10, maxHeight: 500, overflowY: 'auto' }}>
                    {historyHandovers.map(h => (
                      <div key={h.MaBanGiao} style={{ background: '#F8F9FA', borderRadius: 8, padding: 12, border: '1px solid #E5E7EB' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                          <div style={{ fontSize: 14 }}>
                            <div style={{ fontWeight: 600 }}>HD: {h.maHopDong} – Phòng {h.phong?.MaPhong}</div>
                            <div style={{ color: '#6C757D', fontSize: 12 }}>Khách: {h.khachHang?.HoTen}</div>
                            <div style={{ color: '#6C757D', fontSize: 12 }}>Ngày bàn giao: {formatDate(h.ngayBanGiao)}</div>
                          </div>
                          {renderHistoryStatus(h.trangThai)}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}