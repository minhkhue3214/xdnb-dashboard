import { put, call, takeLatest } from 'redux-saga/effects';
import {
    getAllProductsApi,
} from '~/api/products';

import {
    getAllProductsRequest,
    getAllProductsSuccess,
    getAllProductsFail,
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

export default function* watchProducts() {
    yield takeLatest(getAllProductsRequest.type, requestAllProductsSaga);
}