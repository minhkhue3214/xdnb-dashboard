import axiosClient from './axiosClient';
const getAllUsersApi = (params) => {
  console.log('params', params);
  return axiosClient.get('/users', params);
};

const requestDeleteUserApi = (params) => {
  return axiosClient.delete(`/users/${params}`);
};

const requestAddUserApi = (params) => {
  return axiosClient.post('/users', params);
};

const requestGetUserApi = (params) => {
  return axiosClient.get(`/users/${params}`);
};

const requestUpdateUserApi = (params) => {
  const id = params['id'];
  if (!id) throw new Error('Id is required');

  delete params['id'];
  return axiosClient.put(`/users/${id}`, params);
};

const requestUpdatePasswordApi = (params) => {
  const id = params['id'];
  if (!id) throw new Error('Id is required');

  delete params['id'];
  return axiosClient.put(`/users/change-password/${id}`, params);
};

export { getAllUsersApi, requestDeleteUserApi, requestAddUserApi, requestGetUserApi, requestUpdateUserApi, requestUpdatePasswordApi };
