import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiGrid, FiHome, FiCalendar, FiDollarSign, FiKey, FiRotateCcw, FiCreditCard, FiShield, FiArrowRight, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { useAuth } from '../hooks/useAuth';
import { getDashboardStats } from '../services/dashboardService';
import Sidebar from '../components/layout/Sidebar';
import Topbar from '../components/layout/Topbar';
import { formatCurrency, formatDateTime } from '../utils/formatters';

const StatCard = ({ icon: Icon, label, value, color, sub }) => (
  <div className="stat-card" style={{ borderTop: `4px solid ${color}` }}>
    <div className="stat-card-header">
      <div className="stat-card-icon" style={{ background: color + '18', color }}>
        <Icon size={22} />
      </div>
      <span className="stat-card-label">{label}</span>
    </div>
    <div className="stat-card-value" style={{ color }}>{value}</div>
    {sub && <div className="stat-card-sub">{sub}</div>}
  </div>
);

const toDateStr = (d) => {
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

export default function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  // Date filter state
  const today = new Date();
  const [filterMode, setFilterMode] = useState('day'); // 'day' | 'month'
  const [filterDate, setFilterDate] = useState(toDateStr(today)); // YYYY-MM-DD
  const [filterMonth, setFilterMonth] = useState(today.getMonth() + 1);
  const [filterYear, setFilterYear] = useState(today.getFullYear());

  const buildParams = useCallback(() => {
    if (filterMode === 'day') return { ngay: filterDate };
    return { thang: filterMonth, nam: filterYear };
  }, [filterMode, filterDate, filterMonth, filterYear]);

  const loadStats = useCallback(() => {
    setLoading(true);
    getDashboardStats(buildParams())
      .then(r => setStats(r.data))
      .catch(() => setStats({ phongTrong: 0, phongDangGiuCho: 0, phongDangSuDung: 0, doanhThuThang: 0, lichXemHomNay: [], choXuLy: [] }))
      .finally(() => setLoading(false));
  }, [buildParams]);

  useEffect(() => { loadStats(); }, [loadStats]);

  // Navigate to prev/next day
  const shiftDay = (delta) => {
    const d = new Date(filterDate);
    d.setDate(d.getDate() + delta);
    setFilterDate(toDateStr(d));
  };

  const lichTitle = filterMode === 'day'
    ? `Lịch xem phòng – ${filterDate === toDateStr(today) ? 'Hôm nay' : filterDate}`
    : `Lịch xem phòng – Tháng ${filterMonth}/${filterYear}`;

  return (
    <div className="app-layout">
      <Sidebar />
      <div className="app-content">
        <Topbar title="Tổng quan" />
        <main className="main-content">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
            <div>
              <h1 style={{ fontSize: 24, fontWeight: 700, color: '#212529', margin: 0 }}>
                Xin chào, {user?.tenNV} 👋
              </h1>
              <p style={{ color: '#6C757D', margin: '4px 0 0' }}>Đây là tổng quan hệ thống hôm nay</p>
            </div>
            <div style={{ display: 'flex', gap: 12 }}>
              {['SALE', 'ADMIN'].includes(user?.chucVu) && (
                <button className="btn btn-primary" onClick={() => navigate('/booking')}>
                  <FiCalendar size={16} style={{ marginRight: 6 }} /> + Tạo đăng ký mới
                </button>
              )}
              {['ACCOUNTANT', 'ADMIN'].includes(user?.chucVu) && (
                <button className="btn btn-outline" onClick={() => navigate('/first-payments')}>Thanh toán kỳ đầu</button>
              )}
              {['MANAGER', 'ADMIN'].includes(user?.chucVu) && (
                <button className="btn btn-outline" onClick={() => navigate('/rooms')}>
                  <FiHome size={16} style={{ marginRight: 6 }} /> Quản lý phòng
                </button>
              )}
            </div>
          </div>

          {/* Stat Cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 24 }}>
            {loading ? (
              Array(4).fill(0).map((_, i) => (
                <div key={i} className="card skeleton" style={{ height: 120 }} />
              ))
            ) : (
              <>
                <StatCard icon={FiHome} label="Phòng trống" value={stats?.phongTrong ?? 0} color="#198754" sub="Sẵn sàng cho thuê" />
                <StatCard icon={FiCalendar} label="Đang giữ chỗ" value={stats?.phongDangGiuCho ?? 0} color="#FAAD14" sub="Đang đặt cọc / chờ" />
                <StatCard icon={FiGrid} label="Đang sử dụng" value={stats?.phongDangSuDung ?? 0} color="#0A58CA" sub="Phòng đang có người ở" />
                <StatCard icon={FiDollarSign} label="Doanh thu tháng" value={formatCurrency(stats?.doanhThuThang)} color="#6C63FF" sub="Tháng hiện tại" />
              </>
            )}
          </div>

          {/* Worklist */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            {/* Lịch xem phòng */}
            <div className="card">
              <div className="card-header" style={{ flexWrap: 'wrap', gap: 8 }}>
                <h3 className="card-title" style={{ margin: 0 }}><FiCalendar style={{ marginRight: 8, color: '#0A58CA' }} />{lichTitle}</h3>
                <span className="badge badge-info">{stats?.lichXemHomNay?.length ?? 0}</span>
              </div>

              {/* Date filter controls */}
              <div style={{ padding: '8px 0 12px', display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
                <select
                  className="form-control"
                  style={{ width: 110, padding: '4px 8px', fontSize: 13 }}
                  value={filterMode}
                  onChange={e => setFilterMode(e.target.value)}
                >
                  <option value="day">Theo ngày</option>
                  <option value="month">Theo tháng</option>
                </select>

                {filterMode === 'day' ? (
                  <>
                    <button className="btn btn-outline" style={{ padding: '4px 8px' }} onClick={() => shiftDay(-1)}><FiChevronLeft /></button>
                    <input
                      type="date"
                      className="form-control"
                      style={{ width: 145, padding: '4px 8px', fontSize: 13 }}
                      value={filterDate}
                      onChange={e => setFilterDate(e.target.value)}
                    />
                    <button className="btn btn-outline" style={{ padding: '4px 8px' }} onClick={() => shiftDay(1)}><FiChevronRight /></button>
                    <button className="btn btn-outline" style={{ padding: '4px 8px', fontSize: 12 }} onClick={() => setFilterDate(toDateStr(today))}>Hôm nay</button>
                  </>
                ) : (
                  <>
                    <select className="form-control" style={{ width: 100, fontSize: 13, padding: '4px 8px' }} value={filterMonth} onChange={e => setFilterMonth(Number(e.target.value))}>
                      {Array.from({ length: 12 }, (_, i) => <option key={i + 1} value={i + 1}>Tháng {i + 1}</option>)}
                    </select>
                    <select className="form-control" style={{ width: 90, fontSize: 13, padding: '4px 8px' }} value={filterYear} onChange={e => setFilterYear(Number(e.target.value))}>
                      {[2023, 2024, 2025, 2026].map(y => <option key={y} value={y}>{y}</option>)}
                    </select>
                  </>
                )}
                <button className="btn btn-primary" style={{ padding: '4px 14px', fontSize: 13 }} onClick={loadStats}>Lọc</button>
              </div>

              {loading ? <div className="skeleton" style={{ height: 80 }} /> : (
                stats?.lichXemHomNay?.length === 0 ? (
                  <div style={{ textAlign: 'center', padding: '32px 0', color: '#6C757D' }}>
                    <FiCalendar size={32} style={{ marginBottom: 8, opacity: 0.4 }} /><br />Không có lịch xem trong khoảng thời gian này
                  </div>
                ) : (
                  <div style={{ overflowX: 'auto' }}>
                    <table className="data-table">
                      <thead><tr><th>Ngày</th><th>Giờ</th><th>Khách</th><th>Phòng</th><th>SĐT</th><th>Trạng thái</th></tr></thead>
                      <tbody>
                        {stats?.lichXemHomNay?.map((l, i) => (
                          <tr key={i}>
                            <td style={{ fontSize: 12 }}>{l.NgayXem}</td>
                            <td>{l.GioXem || '--:--'}</td>
                            <td>{l.khachHang?.HoTen}</td>
                            <td>{l.phong?.MaPhong}</td>
                            <td>{l.khachHang?.SDT}</td>
                            <td>
                              <span className={`badge badge-${l.TrangThai === 'PENDING' ? 'warning' : l.TrangThai === 'COMPLETED' ? 'available' : 'secondary'}`}>
                                {l.TrangThai === 'PENDING' ? 'Chờ' : l.TrangThai === 'COMPLETED' ? 'Hoàn thành' : 'Hủy'}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )
              )}
            </div>

            {/* Chờ xử lý cọc */}
            <div className="card">
              <div className="card-header">
                <h3 className="card-title"><FiDollarSign style={{ marginRight: 8, color: '#FAAD14' }} />Chờ xác nhận cọc</h3>
                <span className="badge badge-warning">{stats?.choXuLy?.length ?? 0}</span>
              </div>
              {loading ? <div className="skeleton" style={{ height: 80 }} /> : (
                stats?.choXuLy?.length === 0 ? (
                  <div style={{ textAlign: 'center', padding: '32px 0', color: '#6C757D' }}>
                    <FiDollarSign size={32} style={{ marginBottom: 8, opacity: 0.4 }} /><br />Không có cọc chờ xác nhận
                  </div>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    {stats?.choXuLy?.map((c, i) => (
                      <div key={i} style={{ background: '#FFF9EC', border: '1px solid #FAAD14', borderRadius: 8, padding: '10px 14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                          <div style={{ fontWeight: 600, fontSize: 14 }}>{c.khachHang?.HoTen}</div>
                          <div style={{ fontSize: 12, color: '#6C757D' }}>Phòng {c.phong?.MaPhong || '—'} · {formatCurrency(c.SoTienCoc)} · <span style={{ color: '#FAAD14' }}>{c.TinhTrang === 'PENDING_APPROVAL' ? 'Chờ duyệt' : 'Chờ thanh toán'}</span></div>
                        </div>
                        <button className="btn btn-primary" style={{ padding: '4px 12px', fontSize: 12 }} onClick={() => navigate('/deposits')}>
                          Xem xét <FiArrowRight size={12} />
                        </button>
                      </div>
                    ))}
                  </div>
                )
              )}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="card" style={{ marginTop: 16 }}>
            <h3 className="card-title" style={{ marginBottom: 16 }}>⚡ Thao tác nhanh</h3>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              {['SALE', 'ADMIN'].includes(user?.chucVu) && (
                <button className="btn btn-outline" onClick={() => navigate('/booking')}>📋 Đăng ký thuê mới</button>
              )}
              {['ACCOUNTANT', 'ADMIN'].includes(user?.chucVu) && (
                <button className="btn btn-outline" onClick={() => navigate('/deposits')}>💰 Quản lý đặt cọc</button>
              )}
              {['MANAGER', 'ADMIN'].includes(user?.chucVu) && (
                <button className="btn btn-outline" onClick={() => navigate('/handover')}>🔑 Bàn giao phòng</button>
              )}
              {['ACCOUNTANT', 'ADMIN'].includes(user?.chucVu) && (
                <button className="btn btn-outline" onClick={() => navigate('/invoices/new')}>🧾 Lập hóa đơn</button>
              )}
              {['MANAGER', 'ADMIN'].includes(user?.chucVu) && (
                <button className="btn btn-outline" onClick={() => navigate('/policies')}>📜 Quy định</button>
              )}
              {/* Thêm nút mới */}
              {['SALE', 'ADMIN'].includes(user?.chucVu) && (
                <button className="btn btn-outline" onClick={() => navigate('/create-deposit')}>
                  💰 Tạo đơn cọc từ lịch xem
                </button>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
