import axiosClient from './axiosClient';

const loginRequestApi = (params) => {
  return axiosClient.post('/auth/login', params);
};

export { loginRequestApi };
