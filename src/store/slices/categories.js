import { createSlice } from '@reduxjs/toolkit';
import dispatchToast from '~/handlers/toast';

const initialState = {
  categories: [],
  pagination: {
    currentPage: 1,
    totalPages: 1
  },
  detail: null
};

export const categories = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    getCategoriesRequest: () => {
      //
    },
    reGetCategoriesRequest: () => {
      //
    },
    getCategoriesSuccess: (state, action) => {
      const { meta, data } = action.payload;
      console.log('getCategoriesSuccess', action.payload);

      state.categories = data;
      state.pagination.currentPage = meta.current_page;
      state.pagination.totalPages = meta.total;
    },
    getCategoriesFail: (_, action) => {
      dispatchToast('error', action.payload);
    },
    getCategoryRequest: () => {
      //
    },
    getCategorySuccess: (state, action) => {
      const { data } = action.payload;
      state.detail = data;
    },
    getCategoryFail: () => {
      const { message } = action.payload;

      dispatchToast('error', message);
    },
    addCategoryRequest: () => {
      //
    },
    addCategorySuccess: (_, action) => {
      const { message } = action.payload;

      dispatchToast('success', message);
    },
    addCategoryFail: (_, action) => {
      const { message } = action.payload;

      dispatchToast('error', message);
    },
    updateCategoryRequest: () => {
      //
    },
    updateCategorySuccess: (_, action) => {
      const { message } = action.payload;

      dispatchToast('success', message);
    },
    updateCategoryFail: (_, action) => {
      const { message } = action.payload;

      dispatchToast('error', message);
    },
    deleteCategoryRequest: () => {
      //
    },
    deleteCategorySuccess: (_, action) => {
      const { message } = action.payload;

      dispatchToast('success', message);
    },
    deleteCategoryFail: (_, action) => {
      const { message } = action.payload;

      dispatchToast('error', message);
    }
  }
});

export const {
  getCategoriesRequest,
  reGetCategoriesRequest,
  getCategoriesSuccess,
  getCategoriesFail,
  getCategoryRequest,
  getCategorySuccess,
  getCategoryFail,
  addCategoryRequest,
  addCategorySuccess,
  addCategoryFail,
  updateCategoryRequest,
  updateCategorySuccess,
  updateCategoryFail,
  deleteCategoryRequest,
  deleteCategorySuccess,
  deleteCategoryFail
} = categories.actions;

export default categories.reducer;
