import { createSlice } from '@reduxjs/toolkit';
import dispatchToast from '~/handlers/toast';

const initialState = {
  users: [],
  pagination: {
    currentPage: 1,
    lastPage: 1,
    totalPages: 1,
    perPage:1,
    total:1,
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
      const { data, meta } = action.payload.result;
      console.log("getAllUserSuccess", meta)
      state.users = data;
      state.pagination.currentPage = meta.current_page;
      state.pagination.lastPage = meta.last_page;
      state.pagination.perPage = meta.per_page;
      state.pagination.total = meta.total;
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
      console.log("getUserSuccess", action.payload);
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
