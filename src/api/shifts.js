import axiosClient from './axiosClient';
const getAllShiftsApi = (params) => {
  return axiosClient.get('/shift', params);
};
const requestDeleteShiftApi = (id) => {
  return axiosClient.delete(`/shift/${id}`);
};

export { getAllShiftsApi, requestDeleteShiftApi };
