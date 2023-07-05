import axiosClient from './axiosClient';

const loginRequestApi = (params) => {
  return axiosClient.post('/auth/login', params);
};

const refreshTokenRequestApi = (params) => {
  return axiosClient.post('/auth/refresh-tokens', params);
};

export { loginRequestApi, refreshTokenRequestApi };
