import axios from 'axios';
import queryString from 'query-string';
import { store } from '~/store';

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: { 'content-type': 'application/json', 'Access-Control-Allow-Origin': '*' },
  paramsSerializer: (params) => queryString.stringify(params)
});

axiosClient.interceptors.request.use((config) => {
  const token = store.getState()?.authentication?.token;

  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});

axiosClient.interceptors.response.use(
  (response) => {
    if (!response.data.success) throw response.data;
    else return response?.data;
  },
  (error) => {
    throw error?.response?.data;
  }
);

export default axiosClient;
