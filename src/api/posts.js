import axiosClient from './axiosClient';

const getPostsApi = (params) => {
  return axiosClient.get('/posts', params);
};

const getPostApi = (params) => {
  return axiosClient.get('/posts', params);
};

const addPostApi = (params) => {
  return axiosClient.post('/posts', params);
};

const updatePostApi = (params) => {
  return axiosClient.put('/posts', params);
};

const deletePostApi = (params) => {
  return axiosClient.delete('/posts', params);
};

export { getPostsApi, getPostApi, addPostApi, updatePostApi, deletePostApi };
