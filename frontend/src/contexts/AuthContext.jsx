import React, { createContext, useState, useEffect, useCallback } from 'react';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Restore session from localStorage
    const storedToken = localStorage.getItem('homestay_token');
    const storedUser = localStorage.getItem('homestay_user');
    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
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
  const hasRole = (...roles) => user && roles.includes(user.chucVu);

  return (
    <AuthContext.Provider value={{ user, token, loading, login, logout, isAuthenticated, hasRole }}>
      {children}
    </AuthContext.Provider>
  );
};
