import { createSlice } from '@reduxjs/toolkit';
import dispatchToast from '~/handlers/toast';

const initialState = {
  consultationRequests: [],
  pagination: {
    currentPage: 1,
    totalPages: 1
  },
  detail: null
};

export const consultationRequests = createSlice({
  name: 'consultationRequests',
  initialState,
  reducers: {
    getConsultationRequestsRequest: () => {
      //
    },
    reGetConsultationRequestsRequest: () => {
      //
    },
    getConsultationRequestsSuccess: (state, action) => {
      const { meta, data } = action.payload;

      state.consultationRequests = data;
      state.pagination.currentPage = meta.current_page;
      state.pagination.totalPages = meta.total;
    },
    getConsultationRequestsFail: (_, action) => {
      dispatchToast('error', action.payload);
    },
    getConsultationRequestRequest: () => {
      //
    },
    getConsultationRequestSuccess: (state, action) => {
      const { data } = action.payload;
      state.detail = data;
    },
    getConsultationRequestFail: () => {
      const { message } = action.payload;

      dispatchToast('error', message);
    },
    updateConsultationRequestRequest: () => {
      //
    },
    updateConsultationRequestSuccess: (_, action) => {
      const { message } = action.payload;

      dispatchToast('success', message);
    },
    updateConsultationRequestFail: (_, action) => {
      const { message } = action.payload;

      dispatchToast('error', message);
    },
    deleteConsultationRequestRequest: () => {
      //
    },
    deleteConsultationRequestSuccess: (_, action) => {
      const { message } = action.payload;

      dispatchToast('success', message);
    },
    deleteConsultationRequestFail: (_, action) => {
      const { message } = action.payload;

      dispatchToast('error', message);
    }
  }
});

export const {
  getConsultationRequestsRequest,
  reGetConsultationRequestsRequest,
  getConsultationRequestsSuccess,
  getConsultationRequestsFail,
  getConsultationRequestRequest,
  getConsultationRequestSuccess,
  getConsultationRequestFail,
  updateConsultationRequestRequest,
  updateConsultationRequestSuccess,
  updateConsultationRequestFail,
  deleteConsultationRequestRequest,
  deleteConsultationRequestSuccess,
  deleteConsultationRequestFail
} = consultationRequests.actions;

export default consultationRequests.reducer;
