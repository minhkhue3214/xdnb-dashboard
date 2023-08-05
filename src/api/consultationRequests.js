import axiosClient from './axiosClient';

const getConsultationRequestsApi = (params) => {
  return axiosClient.get('/requests', params);
};

const getConsultationRequestApi = (params) => {
  const id = params['id'];
  if (!id) throw new Error('Id is required');
  
  return axiosClient.get(`/requests/${id}`);
};

const updateConsultationRequestApi = (params) => {
  const id = params['id'];
  if (!id) throw new Error('Id is required');

  return axiosClient.put(`/requests/${id}`);
};

const deleteConsultationRequestApi = (params) => {
  const id = params['id'];
  if (!id) throw new Error('Id is required');

  return axiosClient.delete(`/requests/${id}`);
};

export { getConsultationRequestsApi, getConsultationRequestApi, updateConsultationRequestApi, deleteConsultationRequestApi };
