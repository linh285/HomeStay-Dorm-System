import api from './api';

export const getRooms = (params) => api.get('/rooms', { params });
export const getRoomById = (maPhong) => api.get(`/rooms/${maPhong}`);
export const getAvailableRooms = (params) => api.get('/rooms/available', { params });
export const createRoom = (data) => api.post('/rooms', data);
export const updateRoom = (maPhong, data) => api.put(`/rooms/${maPhong}`, data);
export const deleteRoom = (maPhong) => api.delete(`/rooms/${maPhong}`);
export const getRoomBeds = (maPhong) => api.get(`/rooms/${maPhong}/beds`);
