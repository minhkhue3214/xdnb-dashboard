import axiosClient from './axiosClient';
const getAllUsersApi = () => {
    return axiosClient.get('/users');
};

const requestDeleteUserApi = (params) => {
    return axiosClient.delete(`/users/${params}`);
};

export { getAllUsersApi, requestDeleteUserApi };
