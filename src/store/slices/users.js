import { createSlice } from '@reduxjs/toolkit';
import dispatchToast from '~/handlers/toast';

const initialState = {
  users: [],
  pagination: {
    currentPage: null,
    totalPages: null
  },
  detail: null
};

export const users = createSlice({
  name: 'users',
  initialState,
  reducers: {
    getAllUserRequest: () => {
      // request user
    },
    getAllUserSuccess: (state, action) => {
      const { page, totalPages, results } = action.payload;

      state.pagination.currentPage = page;
      state.pagination.totalPages = totalPages;
      state.users = results;
    },
    getAllUserFail: (_, action) => {
      const { message } = action.payload;
      dispatchToast('error', message);
    },
    deleteUserRequest: () => {
      // request user
    },
    deleteUserSuccess: () => {
      // const { message } = action.payload;

      dispatchToast('success', "delete user success");
    },
    deleteFail: (_, action) => {
      const { message } = action.payload;
      dispatchToast('error', message);
    },
    addUserRequest: () => {
      // request add user
    },
    addUserSuccess: (_, action) => {
      const { message } = action.payload;

      dispatchToast('success', message);
    },
    addUserFail: (_, action) => {
      const { message } = action.payload;
      dispatchToast('error', message);
    },
    getUserRequest: () => {
      // request update user
    },
    getUserSuccess: (state, action) => {
      state.detail = action.payload;
    },
    getUserFail: (_, action) => {
      // state.detail = initialState.detail;
      const { message } = action.payload;
      dispatchToast('error', message);
    },
    updateUserRequest: () => {
      // request update user
    },
    updateUserSuccess: (_, action) => {
      const { message } = action.payload;
      dispatchToast('success', message);
    },
    updateUserFail: (_, action) => {
      const { message } = action.payload;
      dispatchToast('error', message);
    },
    updatePasswordRequest: () => {
      // request update user
    },
    updatePasswordSuccess: (_, action) => {
      const { message } = action.payload;
      dispatchToast('success', message);
    },
    updatePasswordFail: (_, action) => {
      const { message } = action.payload;
      dispatchToast('error', message);
    },
    reGetAllUserRequest: () => {
      // request all user
    }
  }
});

export const {
  getAllUserRequest,
  getAllUserSuccess,
  getAllUserFail,
  deleteUserRequest,
  deleteUserSuccess,
  deleteFail,
  addUserRequest,
  addUserSuccess,
  addUserFail,
  getUserRequest,
  getUserSuccess,
  getUserFail,
  updateUserRequest,
  updateUserSuccess,
  updateUserFail,
  updatePasswordRequest,
  updatePasswordSuccess,
  updatePasswordFail,
  reGetAllUserRequest
} = users.actions;

export default users.reducer;
