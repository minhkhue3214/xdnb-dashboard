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
    updateProductFail
} from '~/store/slices/rootAction';

function* requestAllProductsSaga(action) {
    try {
        const result = yield call(getAllProductsApi, action.payload);
        // console.log("requestAllProductsSaga", result);
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

function* requestDeleteProductSaga(action) {
    try {
        const result = yield call(deleteProductApi, action.payload);
        yield put(deleteProductSuccess(result));
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
        // yield put(reGetAllUserRequest({ params }));
        //   yield put(reGetAllUserRequest());
    } catch (error) {
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
    //   yield put(reGetAllUserRequest({ params }));
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
}