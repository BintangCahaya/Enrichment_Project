import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

const url = process.env.EXPO_PUBLIC_API_URL;

const apiClient = axios.create({
  baseURL: url,
  headers: { 'Content-Type': 'application/json' },
});

apiClient.interceptors.request.use(async (config) => {
  const token = await SecureStore.getItemAsync('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

apiClient.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      console.log('Token invalid / expired, user harus login ulang');
    }
    return Promise.reject(err);
  }
);

export default apiClient;
