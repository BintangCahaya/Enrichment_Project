import apiClient from "./apiClient";

export const roomApi = {
    getRoom: (id) => apiClient.get(`/api/kos/${id}/rooms`),
    addRoom: (id,  data) => apiClient.post(`/api/kos/${id}/rooms`, data),
    deleteRoom: (id) => apiClient.delete(`/api/rooms/${id}`)
};  