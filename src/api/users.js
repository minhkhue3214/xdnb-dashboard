import axiosClient from './axiosClient';
const getAllUsersApi = (params) => {
  return axiosClient.get('/users', params);
};

const requestDeleteUserApi = (params) => {
  // const id = params?.id || '';
  return axiosClient.delete(`/users`, params);
};

const requestAddUserApi = (params) => {
  return axiosClient.post('/users', params);
};

const requestGetUserApi = (params) => {
  // const id = params?.id || '';
  return axiosClient.get(`/users`, params);
};

const requestUpdateUserApi = (params) => {
  const id = params['id'];
  if (!id) throw new Error('Id is required');

  // delete params['id'];
  return axiosClient.put(`/users`, params);
};

const requestUpdatePasswordApi = (params) => {
  const id = params['id'];
  if (!id) throw new Error('Id is required');

  // delete params['id'];
  return axiosClient.put(`/update-password/`, params);
};

export { getAllUsersApi, requestDeleteUserApi, requestAddUserApi, requestGetUserApi, requestUpdateUserApi, requestUpdatePasswordApi };
