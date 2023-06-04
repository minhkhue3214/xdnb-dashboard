import axiosClient from './axiosClient';
const getAllUsersApi = (params) => {
  return axiosClient.get('/users', params);
};

const requestDeleteUserApi = (params) => {
  return axiosClient.delete(`/users/${params}`);
};

const requestAddUserApi = (params) => {
  return axiosClient.post('/users', params);
};

export { getAllUsersApi, requestDeleteUserApi, requestAddUserApi };
