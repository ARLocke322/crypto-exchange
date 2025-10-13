import axios from 'axios';
import useAuthStore from '../hooks/useAuthStore';
import { apiBaseUrl } from '../constants';

const api = axios.create({ baseURL: apiBaseUrl });

api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().currentToken;
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;
