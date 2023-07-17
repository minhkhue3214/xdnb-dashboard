import axiosClient from './axiosClient';

const getConsultationRequestsApi = (params) => {
  return axiosClient.get('/request/getRequests', params);
};

const getConsultationRequestApi = (params) => {
  return axiosClient.get('/request/getRequest', params);
};

const updateConsultationRequestApi = (params) => {
  return axiosClient.put('/request/updateConsultationRequest', params);
};

const deleteConsultationRequestApi = (params) => {
  return axiosClient.delete('/request/deleteRequest', params);
};

export { getConsultationRequestsApi, getConsultationRequestApi, updateConsultationRequestApi, deleteConsultationRequestApi };
