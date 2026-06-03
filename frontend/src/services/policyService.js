import api from './api';

export const getPolicies = (params) => api.get('/policies', { params });
export const getPolicyById = (maQuyDinh) => api.get(`/policies/${maQuyDinh}`);
export const createPolicy = (data) => api.post('/policies', data);
export const updatePolicy = (maQuyDinh, data) => api.put(`/policies/${maQuyDinh}`, data);
export const deletePolicy = (maQuyDinh) => api.delete(`/policies/${maQuyDinh}`);
