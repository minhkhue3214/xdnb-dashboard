import axiosClient from './axiosClient';

const loginRequestApi = (params) => {
  console.log("params", params)
  return axiosClient.post('/auth/login', params);
};

const logoutRequestApi = (params) => {
  console.log("params", params)
  return axiosClient.post('/auth/logout', params);
};

const refreshAccessTokenApi = (params) => {
  console.log("params", params)
  return axiosClient.post('/auth/refreshAccessToken', params);
};

const recoveryPasswordStep1Api = (params) => {
  console.log("params", params)
  return axiosClient.post('/auth/recovery-password-step1', params);
};

const recoveryPasswordStep2Api = (params) => {
  console.log("params", params)
  return axiosClient.put('/auth/recovery-password-step2', params);
};

export { loginRequestApi, logoutRequestApi, refreshAccessTokenApi, recoveryPasswordStep1Api, recoveryPasswordStep2Api };
