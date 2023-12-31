import { put, call, takeLatest } from 'redux-saga/effects';
import {
    getAllProductsApi,
    getProductApi,
    deleteProductApi,
    addProductApi,
    requestUpdateProductApi
} from '~/api/products';

import {
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
    reGetAllProductsRequest,
    forceLogout
} from '~/store/slices/rootAction';

function* requestAllProductsSaga(action) {
    try {
        const result = yield call(getAllProductsApi, action.payload);
        // console.log("requestAllProductsSaga", result);
        // const { meta, data } = result;

        yield put(
            getAllProductsSuccess(result)
        );
    } catch (error) {
        yield put(getAllProductsFail(error));
    }
}

function* requestGetProductSaga(action) {
    try {
        const result = yield call(getProductApi, action.payload);
        yield put(getProductSuccess(result));
    } catch (error) {
        yield put(getProductFail(error));
    }
}

function* requestDeleteProductSaga(action) {
    try {
        const { params } = action.payload;
        if (params) {
            delete action.payload.params;
        }

        const result = yield call(deleteProductApi, action.payload);
        yield put(deleteProductSuccess(result));
        yield put(reGetAllProductsRequest({ params }));
    } catch (error) {
        yield put(deleteProductFail(error));
    }
}

function* requestAddProductSaga(action) {
    try {
        const { params } = action.payload;
        // console.log("requestAddProductSaga 1", action.payload.params);
        if (params) {
            delete action.payload.params;
        }


        const result = yield call(addProductApi, action.payload);
        yield put(addProductSuccess(result));
        yield put(reGetAllProductsRequest({ params }));
    } catch (error) {
        if (error.code == 401) {
            yield put(forceLogout());
            return;
        }
        yield put(addProductFail(error));
    }
}

function* requestUpdateProductSaga(action) {
    try {

        const { params } = action.payload;
        if (params) {
            delete action.payload.params;
        }

        const data = yield call(requestUpdateProductApi, action.payload);
        yield put(updateProductSuccess(data));
        yield put(reGetAllProductsRequest({ params }));
    } catch (error) {
        yield put(updateProductFail(error));
    }
}

export default function* watchProducts() {
    yield takeLatest(getAllProductsRequest.type, requestAllProductsSaga);
    yield takeLatest(getProductRequest.type, requestGetProductSaga);
    yield takeLatest(deleteProductRequest.type, requestDeleteProductSaga);
    yield takeLatest(addProductRequest.type, requestAddProductSaga);
    yield takeLatest(updateProductRequest.type, requestUpdateProductSaga);

    yield takeLatest([reGetAllProductsRequest.type], requestAllProductsSaga);
}