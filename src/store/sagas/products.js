import { put, call, takeLatest } from 'redux-saga/effects';
import {
    getAllProductsApi,
    getProductApi
} from '~/api/products';

import {
    getAllProductsRequest,
    getAllProductsSuccess,
    getAllProductsFail,
    getProductRequest,
    getProductSuccess,
    getProductFail
} from '~/store/slices/rootAction';

function* requestAllProductsSaga(action) {
    try {
        const result = yield call(getAllProductsApi, action.payload);
        console.log("requestAllProductsSaga", result);
        const { meta, data } = result;

        yield put(
            getAllProductsSuccess({
                results: data,
                totalPages: meta?.total,
                page: meta?.current_page
            })
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

export default function* watchProducts() {
    yield takeLatest(getAllProductsRequest.type, requestAllProductsSaga);
    yield takeLatest(getProductRequest.type, requestGetProductSaga);
}