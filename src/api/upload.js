import axiosClient from './axiosClient';

const uploadImageApi = (params) => {
    return axiosClient.post('/upload-image', params);
};

const deleteImageApi = (params) => {
    return axiosClient.delete('/delete-images', params);
};

export { uploadImageApi, deleteImageApi };