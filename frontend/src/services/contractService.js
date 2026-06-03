import api from './api';

export const getContracts = (params) => api.get('/contracts', { params });
export const getContractById = (maHopDong) => api.get(`/contracts/${maHopDong}`);
export const createContract = (data) => api.post('/contracts', data);
export const activateContract = (maHopDong) => api.put(`/contracts/${maHopDong}/activate`);
export const screenMembers = (maHopDong, data) => api.put(`/contracts/${maHopDong}/screen`, data);
