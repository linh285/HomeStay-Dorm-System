import api from './api';

export const getDeposits = (params) => api.get('/deposits', { params });
export const getDepositById = (maCoc) => api.get(`/deposits/${maCoc}`);
export const createDeposit = (data) => api.post('/deposits', data);
export const confirmDeposit = (maCoc, data) => api.put(`/deposits/${maCoc}/confirm`, data);
export const calculateDeposit = (params) => api.get(`/deposits/calculate`, { params });
