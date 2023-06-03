import axiosClient from './axiosClient';
const getAllShiftsApi = (params) => {
    return axiosClient.get('/shift', params);
};
const requestDeleteShiftApi = (params) => {
    return axiosClient.delete(`/shift/${params}`);
};

export { getAllShiftsApi, requestDeleteShiftApi };
