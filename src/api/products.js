import axiosClient from './axiosClient';
const getAllProductsApi = (params) => {
  // console.log("getAllProductsApi", params);
  return axiosClient.get('/products', params);
};

const getProductApi = (params) => {
  // console.log("getProductApi", params);

  const id = params['id'];
  if (!id) throw new Error('Id is required');

  return axiosClient.get(`/products/${id}`);
};

const deleteProductApi = (params) => {
  // console.log("getProductApi", params);

  const id = params['id'];
  if (!id) throw new Error('Id is required');

  return axiosClient.delete(`/products/${id}`);
};

const addProductApi = (params) => {
  return axiosClient.post('/products', params);
};

const requestUpdateProductApi = (params) => {
  const id = params['id'];
  if (!id) throw new Error('Id is required');

  // delete params['id'];
  return axiosClient.put(`/products/${id}`);
};

export { getAllProductsApi, getProductApi, deleteProductApi, addProductApi, requestUpdateProductApi };
