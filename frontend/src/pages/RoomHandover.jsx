import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiCheck, FiAlertTriangle, FiPlus, FiSearch, FiList } from 'react-icons/fi';
import toast from 'react-hot-toast';
import Sidebar from '../components/layout/Sidebar';
import Topbar from '../components/layout/Topbar';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Badge from '../components/ui/Badge';
import { getHandover, createHandover, confirmHandover, updateAssetCheck } from '../services/handoverService';
import { getContracts } from '../services/contractService';
import { formatDate, formatCurrency } from '../utils/formatters';

export default function RoomHandover() {
  const navigate = useNavigate();

  // ========== DANH SÁCH HỢP ĐỒNG CẦN BÀN GIAO ==========
  const [contractsList, setContractsList] = useState([]);
  const [loadingList, setLoadingList] = useState(false);
  const [selectedContract, setSelectedContract] = useState(null);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [searching, setSearching] = useState(false);
  const [searchResults, setSearchResults] = useState([]);

  // ========== BÀN GIAO HIỆN TẠI ==========
  const [bangGiao, setBangGiao] = useState(null);
  const [loadingBG, setLoadingBG] = useState(false);
  const [assets, setAssets] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [creating, setCreating] = useState(false);

  // Lấy danh sách hợp đồng cần bàn giao (ACTIVE hoặc PENDING_FIRST_PAYMENT, chưa có bàn giao hoàn tất)
  const fetchContractsNeedingHandover = async () => {
    setLoadingList(true);
    try {
      // Gọi riêng cho từng trạng thái vì backend không hỗ trợ nhiều giá trị cùng lúc
      const [activeRes, pendingPayRes] = await Promise.all([
        getContracts({ tinhTrang: 'ACTIVE' }),
        getContracts({ tinhTrang: 'PENDING_FIRST_PAYMENT' })
      ]);
      const activeContracts = activeRes?.data?.contracts || [];
      const pendingPayContracts = pendingPayRes?.data?.contracts || [];
      const allContracts = [...activeContracts, ...pendingPayContracts];
      
      // Lọc những hợp đồng chưa có bàn giao hoặc bàn giao chưa hoàn tất
      const contractsWithHandoverStatus = await Promise.all(
        allContracts.map(async (contract) => {
          try {
            const handover = await getHandover(contract.MaHopDong);
            const handoverData = handover?.data;
            return {
              ...contract,
              hasCompleteHandover: handoverData?.TinhTrang === 'COMPLETED',
              handoverStatus: handoverData?.TinhTrang || 'NONE'
            };
          } catch {
            return { ...contract, hasCompleteHandover: false, handoverStatus: 'NONE' };
          }
        })
      );
      
      // Chỉ hiển thị hợp đồng chưa có bàn giao hoàn tất (PENDING hoặc chưa có biên bản)
      const pendingContracts = contractsWithHandoverStatus.filter(c => !c.hasCompleteHandover);
      setContractsList(pendingContracts);
    } catch (err) {
      console.error(err);
      toast.error('Không thể tải danh sách hợp đồng');
    } finally {
      setLoadingList(false);
    }
  };

  useEffect(() => {
    fetchContractsNeedingHandover();
  }, []);

  // Hàm tìm kiếm hợp đồng (theo yêu cầu tìm kiếm thủ công)
  const handleSearchContract = async () => {
    const keyword = searchKeyword.trim();
    if (!keyword) {
      toast.error('Vui lòng nhập mã hợp đồng hoặc SĐT');
      return;
    }
    setSearching(true);
    setSearchResults([]);
    try {
      const res = await getContracts({ search: keyword });
      const allContracts = res?.data?.contracts || [];
      const lowerKeyword = keyword.toLowerCase();
      const filtered = allContracts.filter(contract => {
        const maHopDong = contract.MaHopDong?.toLowerCase() || '';
        const tenKhach = contract.nhom?.daiDien?.HoTen?.toLowerCase() || '';
        return maHopDong.includes(lowerKeyword) || tenKhach.includes(lowerKeyword);
      });
      if (filtered.length === 0) {
        toast.error('Không tìm thấy hợp đồng nào');
        setSearchResults([]);
      } else {
        setSearchResults(filtered);
        toast.success(`Tìm thấy ${filtered.length} hợp đồng`);
      }
    } catch (err) {
      toast.error('Lỗi tìm kiếm hợp đồng');
    } finally {
      setSearching(false);
    }
  };

  // Chọn hợp đồng từ danh sách hoặc kết quả tìm kiếm
  const handleSelectContract = (contract) => {
    setSelectedContract(contract);
    setSearchResults([]);
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
      // Refresh danh sách hợp đồng cần bàn giao (xóa hợp đồng vừa được tạo khỏi list)
      fetchContractsNeedingHandover();
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
      fetchContractsNeedingHandover();
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

          <div style={{ display: 'flex', gap: 24, alignItems: 'flex-start' }}>
            {/* CỘT TRÁI: Danh sách hợp đồng cần bàn giao */}
            <div className="card" style={{ flex: '0 0 360px', maxHeight: 'calc(100vh - 180px)', display: 'flex', flexDirection: 'column' }}>
              <div style={{ padding: '16px 20px', borderBottom: '1px solid #e9ecef' }}>
                <h3 style={{ margin: 0, fontSize: 16, fontWeight: 600 }}>📋 Hợp đồng cần bàn giao</h3>
              </div>
              <div style={{ padding: '12px 16px', borderBottom: '1px solid #e9ecef' }}>
                <div style={{ display: 'flex', gap: 8 }}>
                  <Input
                    placeholder="Tìm theo mã HD hoặc SĐT..."
                    value={searchKeyword}
                    onChange={(e) => setSearchKeyword(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSearchContract()}
                    style={{ flex: 1 }}
                  />
                  <Button variant="primary" onClick={handleSearchContract} loading={searching} size="sm">
                    <FiSearch size={14} />
                  </Button>
                </div>
                {searchResults.length > 0 && (
                  <div style={{ marginTop: 12 }}>
                    <div style={{ fontWeight: 600, marginBottom: 6, fontSize: 13 }}>Kết quả tìm kiếm:</div>
                    {searchResults.map(contract => (
                      <div
                        key={contract.MaHopDong}
                        onClick={() => handleSelectContract(contract)}
                        style={{
                          padding: '10px 12px',
                          marginBottom: 8,
                          background: '#F8F9FA',
                          borderRadius: 8,
                          cursor: 'pointer',
                          border: '1px solid #E5E7EB'
                        }}
                      >
                        <div><strong>{contract.MaHopDong}</strong> – Phòng {contract.phong?.MaPhong}</div>
                        <div style={{ fontSize: 12, color: '#6C757D' }}>{contract.nhom?.daiDien?.HoTen}</div>
                        <Badge variant={contract.TinhTrang === 'ACTIVE' ? 'available' : 'warning'} size="sm">
                          {contract.TinhTrang === 'ACTIVE' ? 'Đang hiệu lực' : 'Chờ thanh toán'}
                        </Badge>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div style={{ flex: 1, overflowY: 'auto', padding: '12px 16px' }}>
                {loadingList ? (
                  <div style={{ textAlign: 'center', padding: 20 }}>Đang tải...</div>
                ) : contractsList.length === 0 ? (
                  <div style={{ textAlign: 'center', padding: 20, color: '#6C757D' }}>
                    <FiList size={32} style={{ opacity: 0.4, marginBottom: 8 }} />
                    <p>Không có hợp đồng nào cần bàn giao</p>
                  </div>
                ) : (
                  contractsList.map(contract => (
                    <div
                      key={contract.MaHopDong}
                      onClick={() => handleSelectContract(contract)}
                      style={{
                        padding: '12px',
                        marginBottom: 10,
                        background: selectedContract?.MaHopDong === contract.MaHopDong ? '#E8F0FE' : '#F8F9FA',
                        borderRadius: 8,
                        cursor: 'pointer',
                        border: `1px solid ${selectedContract?.MaHopDong === contract.MaHopDong ? '#0A58CA' : '#E5E7EB'}`,
                        transition: 'all 0.1s'
                      }}
                    >
                      <div style={{ fontWeight: 600, marginBottom: 4 }}>{contract.MaHopDong}</div>
                      <div style={{ fontSize: 13, color: '#495057' }}>Phòng {contract.phong?.MaPhong}</div>
                      <div style={{ fontSize: 12, color: '#6C757D', marginTop: 4 }}>
                        {contract.nhom?.daiDien?.HoTen}
                      </div>
                      <Badge variant={contract.TinhTrang === 'ACTIVE' ? 'available' : 'warning'} size="sm">
                        {contract.TinhTrang === 'ACTIVE' ? 'Đang hiệu lực' : 'Chờ thanh toán'}
                      </Badge>
                    </div>
                  ))
                )}
              </div>
              <div style={{ padding: '12px 16px', borderTop: '1px solid #e9ecef' }}>
                <Button variant="outline" size="sm" onClick={fetchContractsNeedingHandover} fullWidth>
                  🔄 Làm mới danh sách
                </Button>
              </div>
            </div>

            {/* CỘT PHẢI: Chi tiết bàn giao */}
            <div style={{ flex: 1 }}>
              {!selectedContract ? (
                <div className="card" style={{ textAlign: 'center', padding: 60, color: '#6c757d' }}>
                  <FiList size={48} style={{ opacity: 0.4, marginBottom: 16 }} />
                  <p>Chọn một hợp đồng từ danh sách bên trái để bắt đầu bàn giao</p>
                </div>
              ) : (
                <>
                  {/* Thông tin hợp đồng */}
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

                  {/* Trạng thái bàn giao */}
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
                            * Bàn giao này chỉ mang tính lịch sử.
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Nút tạo/ xác nhận */}
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

                  {/* Danh sách tài sản */}
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
                      {allChecked && bangGiao?.TinhTrang !== 'COMPLETED' && (
                        <div style={{ background: '#F0FFF4', border: '1px solid #198754', borderRadius: 8, padding: 12, marginTop: 12, textAlign: 'center', color: '#198754', fontSize: 14, fontWeight: 600 }}>
                          ✅ Tất cả tài sản đã được kiểm tra. Sẵn sàng xác nhận bàn giao!
                        </div>
                      )}
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