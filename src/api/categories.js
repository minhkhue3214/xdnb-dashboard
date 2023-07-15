import axiosClient from './axiosClient';

const getCategoriesApi = (params) => {
  return axiosClient.get('/category/getCategories', params);
};

const getCategoryApi = (params) => {
  return axiosClient.get('/category/getCategory', params);
};

const addCategoryApi = (params) => {
  return axiosClient.post('/category/addCategory', params);
};

const updateCategoryApi = (params) => {
  return axiosClient.put('/category/updateCategory', params);
};

const deleteCategoryApi = (params) => {
  return axiosClient.delete('/category/deleteCategory', params);
};

export { getCategoriesApi, getCategoryApi, addCategoryApi, updateCategoryApi, deleteCategoryApi };
