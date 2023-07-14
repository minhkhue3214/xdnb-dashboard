import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    getAllProductsRequest,
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


    return {
        dispatchGetAllProducts,
        productsState
    };
};

export { useProductsStore };