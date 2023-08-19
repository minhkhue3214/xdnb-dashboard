import { put, call, takeLatest } from 'redux-saga/effects';
import { getCategoriesApi, getCategoryApi, addCategoryApi, updateCategoryApi, deleteCategoryApi } from '~/api/categories';

import {
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
  deleteCategoryFail,
  forceLogout
} from '~/store/slices/rootAction';

function* requestCategoriesSaga(action) {
  try {
    const results = yield call(getCategoriesApi, action.payload);
    console.log('requestCategoriesSaga', results);

    yield put(getCategoriesSuccess(results));
  } catch (error) {
    yield put(getCategoriesFail(error));
  }
}

function* requestCategorySaga(action) {
  try {
    const results = yield call(getCategoryApi, action.payload);
    console.log("requestCategorySaga", results);
    yield put(getCategorySuccess(results));
  } catch (error) {
    yield put(getCategoryFail(error));
  }
}

function* requestAddCategorySaga(action) {
  try {
    const { params } = action.payload;
    if (params) {
      delete action.payload.params;
    }

    const results = yield call(addCategoryApi, action.payload);
    yield put(addCategorySuccess(results));
    yield put(reGetCategoriesRequest({ params }));
  } catch (error) {
    if (error.code == 401) {
      yield put(forceLogout());
      return;
    }
    yield put(addCategoryFail(error));
  }
}

function* requestUpdateCategorySaga(action) {
  try {
    const { params } = action.payload;
    if (params) {
      delete action.payload.params;
    }

    const results = yield call(updateCategoryApi, action.payload);
    yield put(updateCategorySuccess(results));
    yield put(reGetCategoriesRequest({ params }));
  } catch (error) {
    yield put(updateCategoryFail(error));
  }
}

function* requestDeleteCategorySaga(action) {
  try {
    const { params } = action.payload;
    if (params) {
      delete action.payload.params;
    }

    const results = yield call(deleteCategoryApi, action.payload);

    console.log('results', results);
    yield put(deleteCategorySuccess(results));
    yield put(reGetCategoriesRequest({ params }));
  } catch (error) {
    yield put(deleteCategoryFail(error));
  }
}

export default function* watchCategories() {
  yield takeLatest(getCategoriesRequest.type, requestCategoriesSaga);
  yield takeLatest(getCategoryRequest.type, requestCategorySaga);
  yield takeLatest(addCategoryRequest.type, requestAddCategorySaga);
  yield takeLatest(updateCategoryRequest.type, requestUpdateCategorySaga);
  yield takeLatest(deleteCategoryRequest.type, requestDeleteCategorySaga);

  yield takeLatest([reGetCategoriesRequest.type], requestCategoriesSaga);
}
