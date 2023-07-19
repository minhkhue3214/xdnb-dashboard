import axiosClient from './axiosClient';
const getAllProductsApi = (params) => {
  // console.log("getAllProductsApi", params);
  return axiosClient.get('/product/getProducts', params);
};

const getProductApi = (params) => {
  // console.log("getProductApi", params);
  return axiosClient.get('/product/getProduct', params);
};

const deleteProductApi = (params) => {
  // console.log("getProductApi", params);
  return axiosClient.delete('/product/deleteProduct', params);
};

const addProductApi = (params) => {
  return axiosClient.post('/product/addProduct', params);
};

const requestUpdateProductApi = (params) => {
  const id = params['id'];
  if (!id) throw new Error('Id is required');

  // delete params['id'];
  return axiosClient.put(`/product/updateProduct/`, params);
};

export { getAllProductsApi, getProductApi, deleteProductApi, addProductApi, requestUpdateProductApi };
