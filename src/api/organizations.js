import axiosClient from './axiosClient';
const getAllOrganizationsApi = (params) => {
    return axiosClient.get('/organizations', params);
};

const requestDeleteOrganizationsApi = (params) => {
    return axiosClient.delete(`/organizations/${params}`);
};

export { getAllOrganizationsApi, requestDeleteOrganizationsApi };