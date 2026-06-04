import api from './api';

export const createGroup = (data) => api.post('/groups', data);
export const getGroupById = (maNhom) => api.get(`/groups/${maNhom}`);