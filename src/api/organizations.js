import axiosClient from './axiosClient';
const getAllOrganizationsApi = (params) => {
  return axiosClient.get('/organizations', params);
};

const requestDeleteOrganizationsApi = (id) => {
  return axiosClient.delete(`/organizations/${id}`);
};

export { getAllOrganizationsApi, requestDeleteOrganizationsApi };
