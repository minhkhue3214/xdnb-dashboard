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
  console.log("addProductApi", params)

  return axiosClient.post('/products', params);
};

const requestUpdateProductApi = (params) => {
  const id = params['id'];
  if (!id) throw new Error('Id is required');

  console.log("requestUpdateProductApi", params);
  // delete params['id'];
  return axiosClient.put(`/products/${id}`, params);
};

export { getAllProductsApi, getProductApi, deleteProductApi, addProductApi, requestUpdateProductApi };
