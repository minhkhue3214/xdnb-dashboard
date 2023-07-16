import axiosClient from './axiosClient';
const getAllProductsApi = (params) => {
  console.log("getAllProductsApi", params);
  return axiosClient.get('/product/getProducts', params);
};

const getProductApi = (params) => {
  console.log("getProductApi", params);
  return axiosClient.get('/product/getProduct', params);
};

const deleteProductApi = (params) => {
  // console.log("getProductApi", params);
  return axiosClient.delete('/product/deleteProduct', params);
};

export { getAllProductsApi, getProductApi, deleteProductApi };
