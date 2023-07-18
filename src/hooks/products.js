import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    getAllProductsRequest,
    getProductRequest,
    deleteProductRequest
} from '~/store/slices/products';

const useProductsStore = () => {
    const dispatch = useDispatch();

    const productsState = useSelector((state) => state.products);

    const dispatchGetAllProducts = useCallback(
        (payload) => {
            dispatch(getAllProductsRequest(payload));

            return true;
        },
        [dispatch]
    );

    const dispatchDeleteProduct = useCallback(
        (payload) => {
            dispatch(deleteProductRequest(payload));

            return true;
        },
        [dispatch]
    );

    const dispatchGetProductById = useCallback(
        (payload) => {
            dispatch(getProductRequest(payload));

            return true;
        },
        [dispatch]
    );

    const dispatchAddProduct = useCallback(
        (payload) => {
            console.log("dispatchAddProduct", payload)
            dispatch(getProductRequest(payload));

            return true;
        },
        [dispatch]
    );


    return {
        dispatchGetAllProducts,
        dispatchGetProductById,
        dispatchDeleteProduct,
        dispatchAddProduct,
        productsState
    };
};

export { useProductsStore };