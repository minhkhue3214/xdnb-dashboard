import axiosClient from './axiosClient';

const getAllPlacesApi = (params) => {
  return axiosClient.get('/places', params);
};

const requestGetPlaceApi = (params) => {
  return axiosClient.get(`/places/${params}`);
};

const requestAddPlaceApi = (params) => {
  return axiosClient.post('/places', params);
};

const requestDeletePlaceApi = (params) => {
  return axiosClient.delete(`/places/${params}`);
};

const requestUpdatePlaceApi = (params) => {
  const id = params['id'];
  if (!id) throw new Error('Id is required');

  delete params['id'];
  return axiosClient.put(`/places/${id}`, params);
};

export { getAllPlacesApi, requestGetPlaceApi, requestAddPlaceApi, requestDeletePlaceApi, requestUpdatePlaceApi };
