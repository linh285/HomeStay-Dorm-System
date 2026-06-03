import api from './api';

export const getCheckoutRequests = (params) => api.get('/checkout', { params });
export const getCheckoutById = (maTra) => api.get(`/checkout/${maTra}`);
export const createCheckout = (data) => api.post('/checkout', data);
export const startInspection = (maTra) => api.put(`/checkout/${maTra}/inspect`);
export const completeInspection = (maTra, data) => api.put(`/checkout/${maTra}/complete`, data);
export const addDamage = (maTra, data) => api.post(`/checkout/${maTra}/damages`, data);
