import axiosClient from './axiosClient';

const getPostsApi = (params) => {
  return axiosClient.get('/posts', params);
};

const getPostApi = (params) => {
  const id = params['id'];
  if (!id) throw new Error('Id is required');

  console.log("getPostApi")
  // return axiosClient.get('/posts', params);
  return axiosClient.get(`/posts/${id}`);
};

const addPostApi = (params) => {
  console.log("addPostApi", params)
  return axiosClient.post('/posts', params);
};

const updatePostApi = (params) => {

  const id = params['id'];
  if (!id) throw new Error('Id is required');
  console.log("updatePostApi", params);
  // return axiosClient.put('/posts', params);
  return axiosClient.put(`/posts/${id}`, params);
};

const deletePostApi = (params) => {
  const id = params['id'];
  if (!id) throw new Error('Id is required');

  return axiosClient.delete(`/posts/${id}`);
};

export { getPostsApi, getPostApi, addPostApi, updatePostApi, deletePostApi };
