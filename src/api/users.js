import axiosClient from './axiosClient';
const getAllUsersApi = (params) => {
  return axiosClient.get('/user/getUsers', params);
};

const requestDeleteUserApi = (params) => {
  // const id = params?.id || '';
  return axiosClient.delete(`/users/deleteUser`, params);
};

const requestAddUserApi = (params) => {
  return axiosClient.post('/users/addUser', params);
};

const requestGetUserApi = (params) => {
  // const id = params?.id || '';
  return axiosClient.get(`/user/getUser`, params);
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
