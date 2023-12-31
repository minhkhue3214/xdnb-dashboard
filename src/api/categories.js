import axiosClient from './axiosClient';

const getCategoriesApi = (params) => {
  return axiosClient.get('/categories', params);
};

const getCategoryApi = (params) => {
  const id = params['id'];
  if (!id) throw new Error('Id is required');
  console.log("getCategoryApi", id);
  return axiosClient.get(`categories/${id}`);
};

const addCategoryApi = (params) => {
  console.log("addCategoryApi", params)
  return axiosClient.post('/categories', params);
};

const updateCategoryApi = (params) => {
  const id = params['id'];
  if (!id) throw new Error('Id is required');
  console.log("getCategoryApi", id);

  return axiosClient.put(`/categories/${id}`, params);
};

const deleteCategoryApi = (params) => {
  const id = params['id'];
  if (!id) throw new Error('Id is required');

  return axiosClient.delete(`/categories/${id}`);
};

export { getCategoriesApi, getCategoryApi, addCategoryApi, updateCategoryApi, deleteCategoryApi };
