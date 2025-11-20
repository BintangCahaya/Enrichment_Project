import apiClient from './apiClient'

export const tenantApi = {
    createTenant: (data) => apiClient.post('/api/tenants', data),
    getTenant: () => apiClient.get('/api/tenants')
};