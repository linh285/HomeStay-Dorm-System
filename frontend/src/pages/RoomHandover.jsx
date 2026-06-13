import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiCheck, FiAlertTriangle, FiPlus, FiSearch } from 'react-icons/fi';
import toast from 'react-hot-toast';
import Sidebar from '../components/layout/Sidebar';
import Topbar from '../components/layout/Topbar';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Badge from '../components/ui/Badge';
import { getHandover, createHandover, confirmHandover, updateAssetCheck } from '../services/handoverService';
import { findContractBySearch } from '../services/contractService';
import { formatDate, formatCurrency } from '../utils/formatters';

export default function RoomHandover() {
  const navigate = useNavigate();

  // ========== TÌM KIẾM HỢP ĐỒNG ==========
  const [searchKeyword, setSearchKeyword] = useState('');
  const [searching, setSearching] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [selectedContract, setSelectedContract] = useState(null);

  // ========== BÀN GIAO HIỆN TẠI ==========
  const [bangGiao, setBangGiao] = useState(null);
  const [loadingBG, setLoadingBG] = useState(false);
  const [assets, setAssets] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [creating, setCreating] = useState(false);

  // Hàm tìm kiếm hợp đồng (lọc trên frontend)
  const handleSearchContract = async () => {
    const keyword = searchKeyword.trim();
    if (!keyword) {
      toast.error('Vui lòng nhập mã hợp đồng hoặc SĐT');
      return;
    }
    setSearching(true);
    setSearchResults([]);
    try {
      // Tìm đúng hợp đồng theo mã HD hoặc SĐT (endpoint /contracts/search)
      const res = await findContractBySearch(keyword);
      const contract = res?.data || null;

      if (!contract) {
        toast.error('Không tìm thấy hợp đồng nào');
        setSearchResults([]);
      } else {
        setSearchResults([contract]);
        toast.success('Tìm thấy hợp đồng');
      }
    } catch (err) {
      console.error(err);
      toast.error('Lỗi tìm kiếm hợp đồng');
    } finally {
      setSearching(false);
    }
  };

  // Chọn một hợp đồng để bàn giao
  const handleSelectContract = (contract) => {
    setSelectedContract(contract);
    setSearchResults([]);       // Xóa kết quả tìm kiếm
    setSearchKeyword('');       // Xóa từ khóa
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
      setSelectedContract(null);
      setBangGiao(null);
      setAssets([]);
      navigate('/dashboard');
    } catch (err) {
      toast.error(err?.message || 'Xác nhận thất bại');
    } finally {
      setSubmitting(false);
    }
  };

  const checkedCount = assets.filter(a => a.daKiemTra).length;
  const allChecked = assets.length > 0 && checkedCount === assets.length;
  const isContractActive = selectedContract?.TinhTrang === 'ACTIVE';

  return (
    <div className="app-layout">
      <Sidebar />
      <div className="app-content">
        <Topbar title="Bàn giao phòng" />
        <main className="main-content">
          <h1 style={{ fontSize: 22, fontWeight: 700, marginBottom: 20 }}>Bàn giao phòng</h1>

          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            {/* Tìm kiếm hợp đồng */}
            <div className="card" style={{ marginBottom: 24 }}>
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
                    <FiSearch size={16} /> Tìm kiếm
                  </Button>
                </div>

                {/* Hiển thị danh sách kết quả tìm kiếm (chỉ hiện khi có kết quả) */}
                {searchResults.length > 0 && (
                  <div style={{ marginTop: 16 }}>
                    <div style={{ fontWeight: 600, marginBottom: 8 }}>📋 Kết quả tìm thấy ({searchResults.length})</div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                      {searchResults.map((contract) => (
                        <div
                          key={contract.MaHopDong}
                          style={{
                            background: '#F8F9FA',
                            border: '1px solid #E5E7EB',
                            borderRadius: 8,
                            padding: 12,
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            flexWrap: 'wrap',
                            gap: 10,
                          }}
                        >
                          <div>
                            <div><strong>{contract.MaHopDong}</strong> – Phòng {contract.phong?.MaPhong}</div>
                            <div style={{ fontSize: 13, color: '#6C757D' }}>Khách: {contract.nhom?.daiDien?.HoTen || '—'}</div>
                            <div style={{ fontSize: 13, marginTop: 4 }}>
                              <Badge variant={contract.TinhTrang === 'ACTIVE' ? 'available' : 'warning'}>
                                {contract.TinhTrang === 'ACTIVE' ? 'Đang hiệu lực' : 'Chờ thanh toán kỳ đầu'}
                              </Badge>
                            </div>
                          </div>
                          <Button variant="primary" size="sm" onClick={() => handleSelectContract(contract)}>
                            Chọn hợp đồng này
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Thông tin hợp đồng đã chọn và bàn giao */}
            {selectedContract && (
              <>
                <div className="card" style={{ marginBottom: 16 }}>
                  <div className="card-header">
                    <h3 className="card-title">📄 Hợp đồng đã chọn</h3>
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
                        {bangGiao?.TinhTrang === 'COMPLETED' ? (
                          <>
                            <strong>⚠️ Hợp đồng hiện không còn hiệu lực (chưa thanh toán kỳ đầu).</strong><br />
                            Tuy nhiên, biên bản bàn giao phòng đã được hoàn tất trước đó vào ngày {formatDate(bangGiao.NgayGiao)}.
                            Vui lòng kiểm tra lại trạng thái hợp đồng trên hệ thống.
                          </>
                        ) : (
                          'Hợp đồng chưa được thanh toán tiền thuê kỳ đầu. Không thể bàn giao phòng.'
                        )}
                      </div>
                    )}
                    <Button variant="outline" size="sm" onClick={() => setSelectedContract(null)} style={{ marginTop: 12 }}>
                      Chọn hợp đồng khác
                    </Button>
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
                      {!isContractActive && bangGiao.TinhTrang === 'COMPLETED' && (
                        <div style={{ marginTop: 10, fontSize: 12, color: '#DC3545', fontStyle: 'italic' }}>
                          * Hợp đồng hiện không còn hiệu lực, bàn giao này chỉ mang tính lịch sử.
                        </div>
                      )}
                    </div>
                  </div>
                )}

                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
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
        </main>
      </div>
    </div>
  );
}