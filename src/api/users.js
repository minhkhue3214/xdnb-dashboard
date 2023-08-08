import axiosClient from './axiosClient';
const getAllUsersApi = (params) => {
  return axiosClient.get('/users', params);
};

const requestDeleteUserApi = (params) => {

  const id = params['id'];
  if (!id) throw new Error('Id is required');
  // return axiosClient.delete(`/users`, params);
  return axiosClient.delete(`/users/${id}`);
};

const requestAddUserApi = (params) => {
  console.log("requestAddUserApi", params);
  return axiosClient.post('/users', params);
};

const requestGetUserApi = (params) => {
  const id = params['id'];
  if (!id) throw new Error('Id is required');
  // return axiosClient.get(`/users`, params);
  return axiosClient.get(`/users/${id}`);
};

const requestUpdateUserApi = (params) => {
  const id = params['id'];
  if (!id) throw new Error('Id is required');

  // delete params['id'];
  return axiosClient.put(`/users/${id}`, params);
};

const requestUpdatePasswordApi = (params) => {
  const id = params['id'];
  if (!id) throw new Error('Id is required');

  // delete params['id'];
  return axiosClient.put(`/update-password/${id}`, params);
};

export { getAllUsersApi, requestDeleteUserApi, requestAddUserApi, requestGetUserApi, requestUpdateUserApi, requestUpdatePasswordApi };
