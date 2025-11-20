import apiClient from './apiClient';

export const kosApi = {
  createKos: (data) => apiClient.post('/api/kos', data),
  updateKos: (data, id) => apiClient.put(`/api/kos/${id}`, data),
  getKos: () => apiClient.get("/api/kos"),
  getKosById: (id) => apiClient.get(`/api/kos/${id}`),
};