import axios from 'axios';
import queryString from 'query-string';
import { store } from '~/store';

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: { 'content-type': 'application/json' },
  paramsSerializer: (params) => queryString.stringify(params)
});

axiosClient.interceptors.request.use((config) => {
  const token = store.getState()?.authentication?.accessToken?.token;

  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});

axiosClient.interceptors.response.use(
  (response) => {
    console.log("response", response);
    if (response.status == 200 && response.data.success == true) {
      return response.data.data;
    } else {
      throw new Error({
        message: response?.data.message,
      });
    }
  },
  (error) => {
    throw error?.response?.data;
  }
);

export default axiosClient;
