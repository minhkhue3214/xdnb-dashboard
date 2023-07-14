import axiosClient from './axiosClient';
const getAllProductsApi = (params) => {
  console.log("getAllProductsApi", params);
  return axiosClient.get('/product/getProducts', params);
};

export { getAllProductsApi };
