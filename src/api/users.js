import axiosClient from './axiosClient';
const getAllUsersApi = (params) => {
    return axiosClient.get('/users', params);
};

export { getAllUsersApi };
