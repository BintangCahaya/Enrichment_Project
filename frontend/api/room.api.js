import apiClient from "./apiClient";

export const roomApi = {
    getRoom: (id) => apiClient.get(`/api/kos/${id}/rooms`),
    addRoom: (data) => apiClient.post(`/api/kos/${id}/rooms`, data)
};  