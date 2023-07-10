import axiosClient from './axiosClient';

const getPostsApi = (params) => {
  return axiosClient.get('/post/getPosts', params);
};

const getPostApi = (params) => {
  return axiosClient.get('/post/getPosts', params);
};

const addPostApi = (params) => {
  return axiosClient.post('/post/addPost', params);
};

const updatePostApi = (params) => {
  return axiosClient.put('/post/updatePost', params);
};

const deletePostApi = (params) => {
  return axiosClient.delete('/product/deletePost', params);
};

export { getPostsApi, getPostApi, addPostApi, updatePostApi, deletePostApi };
