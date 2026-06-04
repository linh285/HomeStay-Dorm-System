import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const PrivateRoute = ({ roles }) => {
  const { isAuthenticated, user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', background: '#f8f9fa' }}>
        <div style={{ width: 40, height: 40, border: '4px solid #e9ecef', borderTopColor: '#0A58CA', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
        <p style={{ marginTop: 12, color: '#6c757d', fontSize: 14 }}>Đang tải...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Kiểm tra role (chuyển user.chucVu về chữ hoa để so sánh an toàn)
  const userRole = user?.chucVu?.toUpperCase();
  if (roles && userRole && !roles.includes(userRole)) {
    console.warn(`⚠️ Truy cập bị từ chối: user role = "${userRole}", yêu cầu roles =`, roles);
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
};

export default PrivateRoute;