import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    getAllProductsRequest,
    getProductRequest,
    deleteProductRequest,
    updateProductRequest,
    addProductRequest
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
            dispatch(addProductRequest(payload));

            return true;
        },
        [dispatch]
    );

    const dispatchUpdateProduct = useCallback(
        (payload) => {
            console.log("dispatchUpdateProduct", payload)
            dispatch(updateProductRequest(payload));

            return true;
        },
        [dispatch]
    );


    return {
        dispatchGetAllProducts,
        dispatchGetProductById,
        dispatchDeleteProduct,
        dispatchAddProduct,
        dispatchUpdateProduct,
        productsState
    };
};

export { useProductsStore };