// src/contexts/AuthProvider.jsx
import React, { useState, useEffect, useCallback } from 'react';
import { AuthContext } from './AuthContext'; // Import context object

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedToken = localStorage.getItem('homestay_token');
    const storedUser = localStorage.getItem('homestay_user');
    
    // Chỉ parse dữ liệu khi tồn tại và không phải chuỗi 'undefined'
    if (storedToken && storedUser && storedUser !== 'undefined') {
      setToken(storedToken);
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
      } catch (error) {
        console.error('Failed to parse user from localStorage:', error);
        localStorage.removeItem('homestay_user');
        localStorage.removeItem('homestay_token');
      }
    }
    setLoading(false);
  }, []);

  const login = useCallback((data) => {
    setToken(data.token);
    setUser(data.user);
    localStorage.setItem('homestay_token', data.token);
    localStorage.setItem('homestay_user', JSON.stringify(data.user));
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('homestay_token');
    localStorage.removeItem('homestay_user');
  }, []);

  const isAuthenticated = !!token;
  const hasRole = (...roles) => {
    const userRole = user?.chucVu?.toUpperCase();
    return !!userRole && roles.map(role => role.toUpperCase()).includes(userRole);
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, logout, isAuthenticated, hasRole }}>
      {children}
    </AuthContext.Provider>
  );
};
