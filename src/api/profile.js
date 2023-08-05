import axiosClient from './axiosClient';

const getProfileInfoApi = (params) => {
    return axiosClient.get('/profile/info', params);
};

const updateProfileInfoApi = (params) => {
    return axiosClient.put('/profile/update', params);
};

const updatePasswordApi = (params) => {
    return axiosClient.put('/profile/update-password', params);
};

export { getProfileInfoApi, updateProfileInfoApi, updatePasswordApi };