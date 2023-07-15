import { createSlice } from '@reduxjs/toolkit';
import dispatchToast from '~/handlers/toast';

const initialState = {
    products: [],
    pagination: {
        currentPage: null,
        totalPages: null
    },
    detail: null
};

export const products = createSlice({
    name: 'products',
    initialState,
    reducers: {
        getAllProductsRequest: () => {
            // request user
        },
        getAllProductsSuccess: (state, action) => {
            const { page, totalPages, results } = action.payload;

            state.pagination.currentPage = page;
            state.pagination.totalPages = totalPages;
            state.products = results;
        },
        getAllProductsFail: (_, action) => {
            const { message } = action.payload;
            dispatchToast('error', message);
        },
        getProductRequest: () => {
            // request update user
        },
        getProductSuccess: (state, action) => {
            console.log("getProductSuccess", action.payload.data);
            state.detail = action.payload.data;
        },
        getProductFail: (_, action) => {
            // state.detail = initialState.detail;
            const { message } = action.payload;
            dispatchToast('error', message);
        },
    }
});

export const {
    getAllProductsRequest,
    getAllProductsSuccess,
    getAllProductsFail,
    getProductRequest,
    getProductSuccess,
    getProductFail
} = products.actions;

export default products.reducer;
