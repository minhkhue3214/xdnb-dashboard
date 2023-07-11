import axiosClient from './axiosClient';

const getProfileInfoApi = (params) => {
    return axiosClient.get('/profile/getProfileInfo', params);
};

const updateProfileInfoApi = (params) => {
    return axiosClient.put('/profile/updateProfileInfo', params);
};

const updatePasswordApi = (params) => {
    return axiosClient.put('/profile/updatePassword', params);
};

export { getProfileInfoApi, updateProfileInfoApi, updatePasswordApi };