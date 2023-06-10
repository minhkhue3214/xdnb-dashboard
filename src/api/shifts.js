import axiosClient from './axiosClient';
const getAllShiftsApi = (params) => {
  return axiosClient.get('/shift', params);
};
const requestDeleteShiftApi = (params) => {
  return axiosClient.delete(`/shift/${params}`);
};

const requestAddShiftApi = (params) => {
  console.log("params", params);
  return axiosClient.post('/shift', params);
};

export { getAllShiftsApi, requestDeleteShiftApi, requestAddShiftApi };
