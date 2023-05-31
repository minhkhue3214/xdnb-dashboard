import axiosClient from './axiosClient';
const getAllUsersApi = () => {
    return axiosClient.get('/users');
};

export { getAllUsersApi };
