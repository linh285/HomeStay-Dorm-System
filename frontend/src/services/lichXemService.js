import api from './api';

export const createLichXem = (data) => api.post('/lich-xem', data);
export const getLichXem = (params) => api.get('/lich-xem', { params });
export const getLichXemById = (id) => api.get(`/lich-xem/${id}`);
export const updateLichXem = (id, data) => api.put(`/lich-xem/${id}`, data);
export const deleteLichXem = (id) => api.delete(`/lich-xem/${id}`);