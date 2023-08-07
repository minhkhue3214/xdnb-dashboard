import { createSlice } from '@reduxjs/toolkit';
import dispatchToast from '~/handlers/toast';

const initialState = {
  posts: [],
  pagination: {
    currentPage: 1,
    totalPages: 1
  },
  detail: null
};

export const posts = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    getPostsRequest: () => {
      //
    },
    reGetPostsRequest: () => {
      //
    },
    getPostsSuccess: (state, action) => {
      const { meta, data } = action.payload;

      state.posts = data;
      state.pagination.currentPage = meta.current_page;
      state.pagination.totalPages = meta.total;
    },
    getPostsFail: (_, action) => {
      dispatchToast('error', action.payload);
    },
    getPostRequest: () => {
      //
    },
    getPostSuccess: (state, action) => {
      console.log("getPostSuccess", action.payload);
      const { data } = action.payload;
      state.detail = data;
    },
    getPostFail: () => {
      const { message } = action.payload;

      dispatchToast('error', message);
    },
    addPostRequest: () => {
      //
    },
    addPostSuccess: (_, action) => {
      const { message } = action.payload;

      dispatchToast('success', message);
    },
    addPostFail: (_, action) => {
      const { message } = action.payload;

      dispatchToast('error', message);
    },
    updatePostRequest: () => {
      //
    },
    updatePostSuccess: (_, action) => {
      const { message } = action.payload;

      dispatchToast('success', message);
    },
    updatePostFail: (_, action) => {
      const { message } = action.payload;

      dispatchToast('error', message);
    },
    deletePostRequest: () => {
      //
    },
    deletePostSuccess: (_, action) => {
      const { message } = action.payload;

      dispatchToast('success', message);
    },
    deletePostFail: (_, action) => {
      const { message } = action.payload;

      dispatchToast('error', message);
    }
  }
});

export const {
  getPostsRequest,
  reGetPostsRequest,
  getPostsSuccess,
  getPostsFail,
  getPostRequest,
  getPostSuccess,
  getPostFail,
  addPostRequest,
  addPostSuccess,
  addPostFail,
  updatePostRequest,
  updatePostSuccess,
  updatePostFail,
  deletePostRequest,
  deletePostSuccess,
  deletePostFail
} = posts.actions;

export default posts.reducer;
