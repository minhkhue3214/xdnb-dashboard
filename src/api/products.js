import axiosClient from './axiosClient';
const getAllProductsApi = (params) => {
  console.log("getAllProductsApi", params);
  return axiosClient.get('/product/getProducts', params);
};

const getProductApi = (params) => {
  console.log("getProductApi", params);
  return axiosClient.get('/product/getProduct', params);
};

export { getAllProductsApi, getProductApi };
