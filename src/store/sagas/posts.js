import { put, call, takeLatest } from 'redux-saga/effects';
import { getPostsApi, getPostApi, addPostApi, updatePostApi, deletePostApi } from '~/api/posts';

import {
  getPostsRequest,
  reGetPostsRequest,
  getPostsSuccess,
  getPostsFail,
  getPostRequest,
  getPostSuccess,
  getPostFail,
  addPostRequest,
  addPostSuccess,
  addPostFail,
  updatePostRequest,
  updatePostSuccess,
  updatePostFail,
  deletePostRequest,
  deletePostSuccess,
  deletePostFail
} from '~/store/slices/rootAction';

function* requestPostsSaga(action) {
  try {
    const results = yield call(getPostsApi, action.payload);

    yield put(getPostsSuccess(results));
  } catch (error) {
    yield put(getPostsFail(error));
  }
}

function* requestPostSaga(action) {
  try {
    const results = yield call(getPostApi, action.payload);
    yield put(getPostSuccess(results));
  } catch (error) {
    yield put(getPostFail(error));
  }
}

function* requestAddPostSaga(action) {
  try {
    const { params } = action.payload;
    if (params) {
      delete action.payload.params;
    }

    const results = yield call(addPostApi, action.payload);
    yield put(addPostSuccess(results));
    yield put(reGetPostsRequest({ params }));
  } catch (error) {
    yield put(addPostFail(error));
  }
}

function* requestUpdatePostSaga(action) {
  try {
    const { params } = action.payload;
    if (params) {
      delete action.payload.params;
    }

    const results = yield call(updatePostApi, action.payload);
    yield put(updatePostSuccess(results));
    yield put(reGetPostsRequest({ params }));
  } catch (error) {
    yield put(updatePostFail(error));
  }
}

function* requestDeletePostSaga(action) {
  try {
    const { params } = action.payload;
    if (params) {
      delete action.payload.params;
    }

    const results = yield call(deletePostApi, action.payload);

    console.log('results', results);
    yield put(deletePostSuccess(results));
    yield put(reGetPostsRequest({ params }));
  } catch (error) {
    yield put(deletePostFail(error));
  }
}

export default function* watchPosts() {
  yield takeLatest(getPostsRequest.type, requestPostsSaga);
  yield takeLatest(getPostRequest.type, requestPostSaga);
  yield takeLatest(addPostRequest.type, requestAddPostSaga);
  yield takeLatest(updatePostRequest.type, requestUpdatePostSaga);
  yield takeLatest(deletePostRequest.type, requestDeletePostSaga);

  yield takeLatest([reGetPostsRequest.type], requestPostsSaga);
}
