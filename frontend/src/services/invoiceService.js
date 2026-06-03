import api from './api';

export const getInvoices = (params) => api.get('/invoices', { params });
export const getInvoiceById = (maThanhToan) => api.get(`/invoices/${maThanhToan}`);
export const createInvoice = (data) => api.post('/invoices', data);
