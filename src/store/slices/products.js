import { createSlice } from '@reduxjs/toolkit';
import dispatchToast from '~/handlers/toast';

const initialState = {
    products: [],
    pagination: {
        currentPage: 1,
        lastPage: 1,
        totalPages: 1,
        perPage:1,
        total:1,
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
            const { meta, data } = action.payload;
            state.products = data;
            state.pagination.currentPage = meta.current_page;
            state.pagination.lastPage = meta.last_page;
            state.pagination.perPage = meta.per_page;
            state.pagination.total = meta.total;
        },
        getAllProductsFail: (_, action) => {
            const { message } = action.payload;
            dispatchToast('error', message);
        },
        deleteProductRequest: () => {
            // request product
        },
        deleteProductSuccess: () => {
            // const { message } = action.payload;

            dispatchToast('success', "delete product success");
        },
        deleteProductFail: (_, action) => {
            const { message } = action.payload;
            dispatchToast('error', message);
        },
        addProductRequest: () => {
            // request add Product
        },
        addProductSuccess: (_, action) => {
            const { message } = action.payload;

            dispatchToast('success', message);
        },
        addProductFail: (_, action) => {
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
        updateProductRequest: () => {
            // request update product
        },
        updateProductSuccess: (_, action) => {
            const { message } = action.payload;
            dispatchToast('success', message);
        },
        updateProductFail: (_, action) => {
            const { message } = action.payload;
            dispatchToast('error', message);
        },
        reGetAllProductsRequest: () => {
            // request all products
        }
    }
});

export const {
    getAllProductsRequest,
    getAllProductsSuccess,
    getAllProductsFail,
    getProductRequest,
    getProductSuccess,
    getProductFail,
    deleteProductRequest,
    deleteProductSuccess,
    deleteProductFail,
    addProductRequest,
    addProductSuccess,
    addProductFail,
    updateProductRequest,
    updateProductSuccess,
    updateProductFail,
    reGetAllProductsRequest
} = products.actions;

export default products.reducer;
