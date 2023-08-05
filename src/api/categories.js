import axiosClient from './axiosClient';

const getCategoriesApi = (params) => {
  return axiosClient.get('/categories', params);
};

const getCategoryApi = (params) => {
  return axiosClient.get('/categories', params);
};

const addCategoryApi = (params) => {
  return axiosClient.post('/categories', params);
};

const updateCategoryApi = (params) => {
  return axiosClient.put('/categories', params);
};

const deleteCategoryApi = (params) => {
  return axiosClient.delete('/categories', params);
};

export { getCategoriesApi, getCategoryApi, addCategoryApi, updateCategoryApi, deleteCategoryApi };
