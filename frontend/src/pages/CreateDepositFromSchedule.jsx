import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { FiCalendar, FiDollarSign, FiSearch, FiRefreshCw, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import Sidebar from '../components/layout/Sidebar';
import Topbar from '../components/layout/Topbar';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Badge from '../components/ui/Badge';
import DataTable from '../components/ui/DataTable';
import * as lichXemService from '../services/lichXemService';
import * as depositService from '../services/depositService';
import * as roomService from '../services/roomService';
import { formatDate, formatCurrency } from '../utils/formatters';

const toDateStr = (d) => {
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

export default function CreateDepositFromSchedule() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [schedules, setSchedules] = useState([]);
  const [selectedSchedule, setSelectedSchedule] = useState(null);
  const [creating, setCreating] = useState(false);

  const today = new Date();
  const [filterMode, setFilterMode] = useState('day');
  const [filterDate, setFilterDate] = useState(toDateStr(today));
  const [filterMonth, setFilterMonth] = useState(today.getMonth() + 1);
  const [filterYear, setFilterYear] = useState(today.getFullYear());
  const [searchKeyword, setSearchKeyword] = useState('');

  const fetchSchedules = async () => {
    setLoading(true);
    try {
      let params = {};
      if (filterMode === 'day') {
        params.ngay = filterDate;
      } else if (filterMode === 'month') {
        params.thang = filterMonth;
        params.nam = filterYear;
      }
      const res = await lichXemService.getLichXem(params);
      console.log('📅 Lich xem response:', res);
      
      let list = [];
      if (Array.isArray(res)) list = res;
      else if (res?.data?.schedules) list = res.data.schedules;
      else if (res?.schedules) list = res.schedules;
      else if (Array.isArray(res?.data)) list = res.data;
      
      if (searchKeyword) {
        const kw = searchKeyword.toLowerCase();
        list = list.filter(s => 
          (s.khachHang?.HoTen?.toLowerCase().includes(kw)) ||
          (s.phong?.MaPhong?.toLowerCase().includes(kw))
        );
      }

      // Lọc bỏ các lịch có phòng không còn AVAILABLE
      const roomStatusMap = new Map();
      const filteredList = [];
      for (const schedule of list) {
        const maPhong = schedule.phong?.MaPhong;
        if (!maPhong) continue;
        if (!roomStatusMap.has(maPhong)) {
          try {
            const roomRes = await roomService.getRoomById(maPhong);
            const status = roomRes?.data?.TinhTrang;
            roomStatusMap.set(maPhong, status === 'AVAILABLE');
          } catch {
            roomStatusMap.set(maPhong, false);
          }
        }
        if (roomStatusMap.get(maPhong) && schedule.TrangThai !== 'COMPLETED') {
          filteredList.push(schedule);
        }
      }
      setSchedules(filteredList);
      if (filteredList.length === 0) toast('Không có lịch xem hợp lệ (phòng trống hoặc đã hoàn thành)', { icon: '🔍' });
    } catch (err) {
      console.error(err);
      toast.error('Không thể tải danh sách lịch xem');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSchedules();
  }, [filterMode, filterDate, filterMonth, filterYear]);

  const handleSelectSchedule = (schedule) => {
    setSelectedSchedule(schedule);
  };

  const handleCreateDeposit = async () => {
    if (!selectedSchedule) return;
    setCreating(true);
    try {
      // Kiểm tra lại trạng thái phòng trước khi tạo (phòng ngừa)
      const maPhong = selectedSchedule.phong?.MaPhong;
      if (maPhong) {
        const roomRes = await roomService.getRoomById(maPhong);
        if (roomRes?.data?.TinhTrang !== 'AVAILABLE') {
          toast.error(`Phòng ${maPhong} hiện không còn trống (${roomRes?.data?.TinhTrang}). Không thể tạo cọc.`);
          setCreating(false);
          return;
        }
      }
      const giaThue = selectedSchedule.phong?.GiaThue || 0;
      const tienCoc = giaThue * 2; // thuê nguyên phòng: cọc = 2 tháng tiền phòng
      await depositService.createDeposit({
        maPhong: selectedSchedule.phong?.MaPhong,
        MaKH: selectedSchedule.khachHang?.MaKH,
        soTienCoc: tienCoc,
        phuongThucThanhToan: 'TIEN_MAT',
        ghiChu: `Tạo từ lịch xem ${selectedSchedule.MaLich}`,
        maLich: selectedSchedule.MaLich,
      });
      toast.success('✅ Tạo đơn đặt cọc thành công!');
      setSelectedSchedule(null);
      fetchSchedules();
    } catch (err) {
      toast.error(err?.message || 'Tạo đơn thất bại');
    } finally {
      setCreating(false);
    }
  };

  const columns = [
    { key: 'MaLich', title: 'Mã lịch', width: 100 },
    { key: 'NgayXem', title: 'Ngày xem', render: (val) => formatDate(val) },
    { key: 'GioXem', title: 'Giờ' },
    { key: 'khachHang', title: 'Khách hàng', render: (val) => val?.HoTen || '—' },
    { key: 'phong', title: 'Phòng', render: (val) => val?.MaPhong || '—' },
    { key: 'TrangThai', title: 'Trạng thái', render: (val) => <Badge variant={val === 'COMPLETED' ? 'available' : 'warning'}>{val}</Badge> },
  ];

  const tienCoc = selectedSchedule ? (selectedSchedule.phong?.GiaThue || 0) * 2 : 0;

  return (
    <div className="app-layout">
      <Sidebar />
      <div className="app-content">
        <Topbar title="Tạo đơn đặt cọc từ lịch xem" />
        <main className="main-content">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
            <div className="card">
              <div className="card-header">
                <h3 className="card-title">📅 Lịch xem phòng</h3>
                <button onClick={fetchSchedules} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                  <FiRefreshCw size={16} />
                </button>
              </div>
              <div className="card-body">
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 16 }}>
                  <select className="form-control" style={{ width: 110 }} value={filterMode} onChange={e => setFilterMode(e.target.value)}>
                    <option value="day">Theo ngày</option>
                    <option value="month">Theo tháng</option>
                  </select>
                  {filterMode === 'day' && (
                    <>
                      <button className="btn btn-outline" onClick={() => {
                        const d = new Date(filterDate);
                        d.setDate(d.getDate() - 1);
                        setFilterDate(toDateStr(d));
                      }}><FiChevronLeft /></button>
                      <input type="date" className="form-control" style={{ width: 145 }} value={filterDate} onChange={e => setFilterDate(e.target.value)} />
                      <button className="btn btn-outline" onClick={() => {
                        const d = new Date(filterDate);
                        d.setDate(d.getDate() + 1);
                        setFilterDate(toDateStr(d));
                      }}><FiChevronRight /></button>
                    </>
                  )}
                  {filterMode === 'month' && (
                    <>
                      <select className="form-control" style={{ width: 100 }} value={filterMonth} onChange={e => setFilterMonth(Number(e.target.value))}>
                        {Array.from({ length: 12 }, (_, i) => <option key={i+1} value={i+1}>Tháng {i+1}</option>)}
                      </select>
                      <select className="form-control" style={{ width: 90 }} value={filterYear} onChange={e => setFilterYear(Number(e.target.value))}>
                        {[2024,2025,2026].map(y => <option key={y} value={y}>{y}</option>)}
                      </select>
                    </>
                  )}
                  <Input placeholder="Tìm theo tên khách, phòng..." value={searchKeyword} onChange={e => setSearchKeyword(e.target.value)} style={{ flex: 1 }} />
                  <Button variant="primary" onClick={fetchSchedules}><FiSearch size={14} /> Tìm</Button>
                </div>
                <DataTable columns={columns} data={schedules} loading={loading} emptyText="Không có lịch xem hợp lệ" onRowClick={handleSelectSchedule} />
              </div>
            </div>
            <div className="card">
              <div className="card-header">
                <h3 className="card-title">💰 Tạo đơn đặt cọc</h3>
              </div>
              <div className="card-body">
                {!selectedSchedule ? (
                  <div style={{ textAlign: 'center', padding: 40, color: '#6c757d' }}>
                    <FiCalendar size={40} style={{ opacity: 0.4 }} />
                    <p>Chọn một lịch xem từ danh sách bên trái</p>
                  </div>
                ) : (
                  <>
                    <div style={{ background: '#F8F9FA', borderRadius: 8, padding: 16, marginBottom: 16 }}>
                      <div style={{ fontWeight: 600, marginBottom: 8 }}>Thông tin lịch xem</div>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, fontSize: 13 }}>
                        <div><span style={{ color: '#6C757D' }}>Mã lịch:</span> {selectedSchedule.MaLich}</div>
                        <div><span style={{ color: '#6C757D' }}>Ngày xem:</span> {formatDate(selectedSchedule.NgayXem)} {selectedSchedule.GioXem}</div>
                        <div><span style={{ color: '#6C757D' }}>Khách hàng:</span> {selectedSchedule.khachHang?.HoTen} ({selectedSchedule.khachHang?.SDT})</div>
                        <div><span style={{ color: '#6C757D' }}>Phòng:</span> {selectedSchedule.phong?.MaPhong}</div>
                        <div><span style={{ color: '#6C757D' }}>Giá thuê:</span> {formatCurrency(selectedSchedule.phong?.GiaThue)}</div>
                        <div><span style={{ color: '#6C757D' }}>Số giường (sức chứa):</span> {selectedSchedule.phong?.SucChua}</div>
                      </div>
                    </div>
                    <div style={{ background: '#F0F7FF', borderRadius: 8, padding: 16, textAlign: 'center', marginBottom: 16 }}>
                      <div style={{ fontSize: 14, color: '#6C757D' }}>Tiền cọc cần thanh toán</div>
                      <div style={{ fontSize: 28, fontWeight: 700, color: '#0A58CA' }}>{formatCurrency(tienCoc)}</div>
                      <div style={{ fontSize: 12, color: '#6C757D' }}>(= giá thuê × 2 × số giường)</div>
                    </div>
                    <Button variant="primary" fullWidth loading={creating} onClick={handleCreateDeposit}>
                      <FiDollarSign size={16} style={{ marginRight: 6 }} /> Tạo đơn đặt cọc
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}