import axios from 'axios';
import queryString from 'query-string';

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: { 'content-type': 'application/json' },
  paramsSerializer: (params) => queryString.stringify(params)
});

axiosClient.interceptors.request.use((config) => {
  if (localStorage.getItem('access_token')) {
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${localStorage.getItem('access_token')}`;
    }
  }
  // Handle token here ...
  return config;
});

axiosClient.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    throw error?.response?.data;
  }
);

export default axiosClient;
