import React from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import {
  FiGrid, FiHome, FiCalendar, FiFileText, FiKey,
  FiRotateCcw, FiCreditCard, FiDollarSign, FiShield, FiLogOut,
  FiCheckCircle, FiRefreshCw
} from 'react-icons/fi';
import { useAuth } from '../../hooks/useAuth';

const menuItems = [
  { label: 'Dashboard', path: '/dashboard', icon: FiGrid, roles: ['MANAGER', 'ADMIN', 'SALE', 'ACCOUNTANT'], matchPaths: ['/', '/dashboard'] },
  { label: 'Quản lý phòng', path: '/rooms', icon: FiHome, roles: ['MANAGER', 'ADMIN'], matchPaths: ['/rooms'] },
  { label: 'Đăng ký & đặt lịch', path: '/booking', icon: FiCalendar, roles: ['SALE', 'ADMIN'], matchPaths: ['/booking'] },
  { label: 'Hợp đồng', path: '/contracts', icon: FiFileText, roles: ['SALE', 'ADMIN'], matchPaths: ['/contracts'] },
  { label: 'Bàn giao', path: '/handover', icon: FiKey, roles: ['MANAGER', 'ADMIN'], matchPaths: ['/handover'] },
  { label: 'Đăng ký trả phòng', path: '/checkout', icon: FiRotateCcw, roles: ['SALE', 'ADMIN'], matchPaths: ['/checkout'] },
  { label: 'Kiểm tra trả phòng', path: '/checkout/inspect', icon: FiCheckCircle, roles: ['MANAGER', 'ADMIN'], matchPaths: ['/checkout/inspect'] },
  { label: 'Quyết toán & Hoàn cọc', path: '/settlement', icon: FiRefreshCw, roles: ['ACCOUNTANT', 'ADMIN'], matchPaths: ['/settlement'] },
  { label: 'Tạo đơn cọc từ lịch xem', path: '/create-deposit', icon: FiCreditCard, roles: ['ACCOUNTANT', 'ADMIN'], matchPaths: ['/create-deposit'] },
  { label: 'Quản lý cọc', path: '/deposits', icon: FiDollarSign, roles: ['ACCOUNTANT', 'ADMIN'], matchPaths: ['/deposits'] },
  { label: 'Quy định', path: '/policies', icon: FiShield, roles: ['MANAGER', 'ADMIN'], matchPaths: ['/policies'] },
  { label: 'Xác nhận thanh toán kỳ đầu', path: '/first-payment', icon: FiDollarSign, roles: ['ACCOUNTANT', 'ADMIN'], matchPaths: ['/first-payment'] },
];

const getInitials = (name = '') => {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
  return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
};

const roleLabels = { ADMIN: 'Quản trị viên', MANAGER: 'Quản lý', SALE: 'Kinh doanh', ACCOUNTANT: 'Kế toán' };

const Sidebar = ({ onLogout }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout: contextLogout } = useAuth();

  const userRole = user?.chucVu || '';
  const userName = user?.hoTen || user?.tenDangNhap || 'Người dùng';
  const roleLabel = roleLabels[userRole] || userRole;

  const isActive = (item) => item.matchPaths.some(p => p === location.pathname || location.pathname.startsWith(p + '/'));
  const visibleMenuItems = menuItems.filter(item => item.roles.includes(userRole));

  const handleLogout = () => {
    contextLogout();
    if (typeof onLogout === 'function') onLogout();
    navigate('/login');
  };

  return (
    <aside style={styles.sidebar}>
      <div style={styles.logoArea}><span style={styles.logoIcon}>🏠</span><span style={styles.logoText}>HomeStay Dorm</span></div>
      <div style={styles.userArea}>
        <div style={styles.avatarCircle}>{getInitials(userName)}</div>
        <div style={styles.userInfo}><div style={styles.userName}>{userName}</div><div style={styles.userRole}>{roleLabel}</div></div>
      </div>
      <div style={styles.divider} />
      <nav style={styles.nav}>
        {visibleMenuItems.map(item => {
          const Icon = item.icon;
          const active = isActive(item);
          return (
            <Link key={item.path} to={item.path} style={{ ...styles.menuItem, ...(active ? styles.menuItemActive : {}) }}>
              <Icon size={18} style={{ color: active ? '#0A58CA' : '#6c757d' }} />
              <span style={styles.menuLabel}>{item.label}</span>
              {active && <div style={styles.activeBar} />}
            </Link>
          );
        })}
      </nav>
      <div style={styles.logoutArea}>
        <div style={styles.divider} />
        <button style={styles.logoutButton} onClick={handleLogout}><FiLogOut size={18} /> Đăng xuất</button>
      </div>
    </aside>
  );
};

const styles = {
  sidebar: { position: 'fixed', top: 0, left: 0, height: '100vh', width: '260px', backgroundColor: '#fff', borderRight: '1px solid #e9ecef', display: 'flex', flexDirection: 'column', zIndex: 100, overflowY: 'auto', boxShadow: '2px 0 8px rgba(0,0,0,0.04)' },
  logoArea: { display: 'flex', alignItems: 'center', gap: '10px', padding: '24px 20px 20px' },
  logoIcon: { fontSize: '22px' },
  logoText: { fontSize: '18px', fontWeight: '700', color: '#0A58CA' },
  userArea: { display: 'flex', alignItems: 'center', gap: '12px', padding: '8px 20px 16px' },
  avatarCircle: { width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#0A58CA', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', fontWeight: '700', flexShrink: 0 },
  userInfo: { display: 'flex', flexDirection: 'column', gap: '2px', overflow: 'hidden' },
  userName: { fontSize: '14px', fontWeight: '600', color: '#212529', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' },
  userRole: { fontSize: '12px', color: '#6c757d' },
  divider: { height: '1px', backgroundColor: '#e9ecef', margin: '0 16px 8px' },
  nav: { flex: 1, padding: '4px 12px', display: 'flex', flexDirection: 'column', gap: '2px' },
  menuItem: { display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 12px', borderRadius: '8px', textDecoration: 'none', color: '#495057', fontSize: '14px', fontWeight: '500', position: 'relative', transition: 'background-color 0.15s ease', cursor: 'pointer' },
  menuItemActive: { backgroundColor: '#e8f0fe', color: '#0A58CA', fontWeight: '600' },
  menuLabel: { flex: 1 },
  activeBar: { position: 'absolute', right: 0, top: '50%', transform: 'translateY(-50%)', width: '3px', height: '60%', backgroundColor: '#0A58CA', borderRadius: '3px 0 0 3px' },
  logoutArea: { padding: '0 12px 16px' },
  logoutButton: { display: 'flex', alignItems: 'center', gap: '10px', width: '100%', padding: '10px 12px', border: 'none', backgroundColor: 'transparent', borderRadius: '8px', color: '#dc3545', fontSize: '14px', fontWeight: '500', cursor: 'pointer' },
};

export default Sidebar;