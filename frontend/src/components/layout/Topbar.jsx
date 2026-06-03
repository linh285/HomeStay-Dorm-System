import React, { useState, useRef, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FiBell, FiSearch, FiChevronDown, FiLogOut, FiUser, FiSettings } from 'react-icons/fi';
import { useAuth } from '../../hooks/useAuth';

/**
 * Breadcrumb map: pathname prefix -> label
 */
const breadcrumbMap = {
  '/dashboard': ['Trang chủ', 'Dashboard'],
  '/': ['Trang chủ', 'Dashboard'],
  '/rooms': ['Trang chủ', 'Quản lý phòng'],
  '/booking': ['Trang chủ', 'Đăng ký & đặt lịch'],
  '/contracts': ['Trang chủ', 'Hợp đồng'],
  '/handover': ['Trang chủ', 'Bàn giao'],
  '/checkout': ['Trang chủ', 'Trả phòng'],
  '/invoices': ['Trang chủ', 'Hóa đơn'],
  '/deposits': ['Trang chủ', 'Quản lý cọc'],
  '/policies': ['Trang chủ', 'Quy định'],
};

/**
 * Returns the breadcrumb segments for the current pathname.
 */
const getBreadcrumb = (pathname) => {
  // Exact match first
  if (breadcrumbMap[pathname]) return breadcrumbMap[pathname];
  // Prefix match (for nested routes like /rooms/123)
  const found = Object.keys(breadcrumbMap).find(
    (key) => key !== '/' && pathname.startsWith(key)
  );
  return found ? breadcrumbMap[found] : ['Trang chủ'];
};

/**
 * Returns initials from a full name string.
 */
const getInitials = (name = '') => {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
  return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
};

const Topbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const [searchValue, setSearchValue] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);

  // Simulated notification count – replace with real data from context/API
  const notificationCount = 3;

  const dropdownRef = useRef(null);
  const notifRef = useRef(null);

  const userName = user?.hoTen || user?.tenDangNhap || 'Người dùng';
  const breadcrumb = getBreadcrumb(location.pathname);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
      if (notifRef.current && !notifRef.current.contains(e.target)) {
        setNotifOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    setDropdownOpen(false);
    if (typeof logout === 'function') logout();
  };

  return (
    <header style={styles.topbar}>
      {/* Breadcrumb */}
      <div style={styles.breadcrumbArea}>
        {breadcrumb.map((crumb, idx) => (
          <React.Fragment key={idx}>
            {idx > 0 && <span style={styles.breadcrumbSep}>/</span>}
            <span
              style={{
                ...styles.breadcrumbItem,
                ...(idx === breadcrumb.length - 1 ? styles.breadcrumbActive : styles.breadcrumbLink),
              }}
            >
              {crumb}
            </span>
          </React.Fragment>
        ))}
      </div>

      {/* Right section */}
      <div style={styles.rightSection}>
        {/* Search bar */}
        <div style={styles.searchWrapper}>
          <FiSearch style={styles.searchIcon} size={16} />
          <input
            type="text"
            placeholder="Tìm kiếm..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            style={styles.searchInput}
          />
        </div>

        {/* Notification bell */}
        <div style={styles.notifWrapper} ref={notifRef}>
          <button
            style={styles.iconButton}
            onClick={() => {
              setNotifOpen((v) => !v);
              setDropdownOpen(false);
            }}
            aria-label="Thông báo"
          >
            <FiBell size={20} />
            {notificationCount > 0 && (
              <span style={styles.badge}>
                {notificationCount > 9 ? '9+' : notificationCount}
              </span>
            )}
          </button>

          {/* Notification dropdown */}
          {notifOpen && (
            <div style={styles.notifDropdown}>
              <div style={styles.dropdownHeader}>Thông báo</div>
              <div style={styles.notifItem}>
                <div style={styles.notifDot} />
                <div>
                  <div style={styles.notifTitle}>Hợp đồng sắp hết hạn</div>
                  <div style={styles.notifTime}>5 phút trước</div>
                </div>
              </div>
              <div style={styles.notifItem}>
                <div style={styles.notifDot} />
                <div>
                  <div style={styles.notifTitle}>Yêu cầu đặt phòng mới</div>
                  <div style={styles.notifTime}>30 phút trước</div>
                </div>
              </div>
              <div style={styles.notifItem}>
                <div style={styles.notifDot} />
                <div>
                  <div style={styles.notifTitle}>Hóa đơn chưa thanh toán</div>
                  <div style={styles.notifTime}>2 giờ trước</div>
                </div>
              </div>
              <div style={styles.dropdownFooter}>Xem tất cả thông báo</div>
            </div>
          )}
        </div>

        {/* User avatar + name + dropdown */}
        <div style={styles.userMenu} ref={dropdownRef}>
          <button
            style={styles.userMenuButton}
            onClick={() => {
              setDropdownOpen((v) => !v);
              setNotifOpen(false);
            }}
          >
            <div style={styles.avatarCircle}>{getInitials(userName)}</div>
            <span style={styles.userNameText}>{userName}</span>
            <FiChevronDown
              size={14}
              style={{
                ...styles.chevron,
                transform: dropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)',
              }}
            />
          </button>

          {/* User dropdown */}
          {dropdownOpen && (
            <div style={styles.userDropdown}>
              <div style={styles.dropdownHeader}>
                <div style={styles.dropdownUserName}>{userName}</div>
                <div style={styles.dropdownUserRole}>{user?.chucVu || ''}</div>
              </div>
              <div style={styles.dropdownDivider} />
              <button
                style={styles.dropdownItem}
                onClick={() => { setDropdownOpen(false); navigate('/profile'); }}
              >
                <FiUser size={15} /> Hồ sơ cá nhân
              </button>
              <button
                style={styles.dropdownItem}
                onClick={() => { setDropdownOpen(false); navigate('/settings'); }}
              >
                <FiSettings size={15} /> Cài đặt
              </button>
              <div style={styles.dropdownDivider} />
              <button
                style={{ ...styles.dropdownItem, color: '#dc3545' }}
                onClick={handleLogout}
              >
                <FiLogOut size={15} /> Đăng xuất
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

const styles = {
  topbar: {
    position: 'fixed',
    top: 0,
    left: '260px',
    right: 0,
    height: '64px',
    backgroundColor: '#ffffff',
    borderBottom: '1px solid #e9ecef',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 24px',
    zIndex: 99,
    boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
  },
  breadcrumbArea: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
  },
  breadcrumbSep: {
    color: '#adb5bd',
    fontSize: '13px',
  },
  breadcrumbItem: {
    fontSize: '14px',
  },
  breadcrumbLink: {
    color: '#6c757d',
    cursor: 'pointer',
  },
  breadcrumbActive: {
    color: '#212529',
    fontWeight: '600',
  },
  rightSection: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
  },
  searchWrapper: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
  },
  searchIcon: {
    position: 'absolute',
    left: '12px',
    color: '#adb5bd',
    pointerEvents: 'none',
  },
  searchInput: {
    height: '36px',
    width: '220px',
    borderRadius: '20px',
    border: '1px solid #dee2e6',
    padding: '0 16px 0 36px',
    fontSize: '13px',
    color: '#495057',
    outline: 'none',
    backgroundColor: '#f8f9fa',
    transition: 'border-color 0.15s ease, width 0.2s ease',
  },
  notifWrapper: {
    position: 'relative',
  },
  iconButton: {
    position: 'relative',
    width: '38px',
    height: '38px',
    borderRadius: '50%',
    border: '1px solid #dee2e6',
    backgroundColor: '#f8f9fa',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    color: '#495057',
  },
  badge: {
    position: 'absolute',
    top: '-4px',
    right: '-4px',
    minWidth: '18px',
    height: '18px',
    borderRadius: '9px',
    backgroundColor: '#dc3545',
    color: '#fff',
    fontSize: '10px',
    fontWeight: '700',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '0 4px',
    border: '2px solid #fff',
  },
  notifDropdown: {
    position: 'absolute',
    top: 'calc(100% + 8px)',
    right: 0,
    width: '300px',
    backgroundColor: '#fff',
    border: '1px solid #e9ecef',
    borderRadius: '10px',
    boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
    overflow: 'hidden',
    zIndex: 200,
  },
  dropdownHeader: {
    padding: '12px 16px',
    fontWeight: '600',
    fontSize: '14px',
    color: '#212529',
    borderBottom: '1px solid #f1f3f5',
  },
  notifItem: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '10px',
    padding: '12px 16px',
    borderBottom: '1px solid #f8f9fa',
    cursor: 'pointer',
  },
  notifDot: {
    width: '8px',
    height: '8px',
    borderRadius: '50%',
    backgroundColor: '#0A58CA',
    marginTop: '5px',
    flexShrink: 0,
  },
  notifTitle: {
    fontSize: '13px',
    color: '#212529',
    marginBottom: '2px',
  },
  notifTime: {
    fontSize: '11px',
    color: '#adb5bd',
  },
  dropdownFooter: {
    padding: '10px 16px',
    textAlign: 'center',
    fontSize: '13px',
    color: '#0A58CA',
    cursor: 'pointer',
    fontWeight: '500',
  },
  userMenu: {
    position: 'relative',
  },
  userMenuButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '4px 8px',
    border: 'none',
    backgroundColor: 'transparent',
    cursor: 'pointer',
    borderRadius: '8px',
    transition: 'background-color 0.15s ease',
  },
  avatarCircle: {
    width: '34px',
    height: '34px',
    borderRadius: '50%',
    backgroundColor: '#0A58CA',
    color: '#fff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '13px',
    fontWeight: '700',
    flexShrink: 0,
  },
  userNameText: {
    fontSize: '14px',
    fontWeight: '500',
    color: '#212529',
    maxWidth: '120px',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  chevron: {
    color: '#6c757d',
    transition: 'transform 0.2s ease',
  },
  userDropdown: {
    position: 'absolute',
    top: 'calc(100% + 8px)',
    right: 0,
    width: '220px',
    backgroundColor: '#fff',
    border: '1px solid #e9ecef',
    borderRadius: '10px',
    boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
    overflow: 'hidden',
    zIndex: 200,
  },
  dropdownUserName: {
    fontSize: '14px',
    fontWeight: '600',
    color: '#212529',
    marginBottom: '2px',
  },
  dropdownUserRole: {
    fontSize: '12px',
    color: '#6c757d',
  },
  dropdownDivider: {
    height: '1px',
    backgroundColor: '#f1f3f5',
    margin: '4px 0',
  },
  dropdownItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    width: '100%',
    padding: '10px 16px',
    border: 'none',
    backgroundColor: 'transparent',
    fontSize: '14px',
    color: '#495057',
    cursor: 'pointer',
    textAlign: 'left',
    transition: 'background-color 0.15s ease',
  },
};

export default Topbar;
