import api from './api';

export const getSettlement = (maTra) => api.get(`/settlement/${maTra}`);
export const calculateSettlement = (maTra) => api.post(`/settlement/${maTra}/calculate`);
export const confirmSettlement = (maTra, data) => api.put(`/settlement/${maTra}/confirm`, data);
