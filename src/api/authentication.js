import axiosClient from './axiosClient';

const loginRequestApi = (params) => {
  console.log("params", params)
  return axiosClient.post('/auth/login', params);
};

export { loginRequestApi };
