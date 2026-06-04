import api from './api';

export const getHandover = (maHopDong) => api.get(`/handovers/contract/${maHopDong}`);
export const createHandover = (maHopDong) => api.post(`/handovers/contract/${maHopDong}`);
export const confirmHandover = (maBanGiao) => api.put(`/handovers/${maBanGiao}/confirm`);
export const getDefaultAssets = () => api.get('/handovers/assets/default');
export const updateAssetCheck = (maBanGiao, maTaiSan, data) =>
  api.put(`/handovers/${maBanGiao}/assets/${maTaiSan}`, data);
export const addAsset = (maBanGiao, data) => api.post(`/handovers/${maBanGiao}/assets`, data);
export const getHandovers = (params) => api.get('/handovers', { params });