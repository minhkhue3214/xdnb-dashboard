import axiosClient from './axiosClient';
const getAllProductsApi = (params) => {
  // console.log("getAllProductsApi", params);
  return axiosClient.get('/products', params);
};

const getProductApi = (params) => {
  // console.log("getProductApi", params);
  return axiosClient.get('/products', params);
};

const deleteProductApi = (params) => {
  // console.log("getProductApi", params);
  return axiosClient.delete('/products', params);
};

const addProductApi = (params) => {
  return axiosClient.post('/products', params);
};

const requestUpdateProductApi = (params) => {
  const id = params['id'];
  if (!id) throw new Error('Id is required');

  // delete params['id'];
  return axiosClient.put(`/products`, params);
};

export { getAllProductsApi, getProductApi, deleteProductApi, addProductApi, requestUpdateProductApi };
