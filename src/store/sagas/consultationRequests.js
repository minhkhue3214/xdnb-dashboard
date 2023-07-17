import { put, call, takeLatest } from 'redux-saga/effects';
import {
  getConsultationRequestsApi,
  getConsultationRequestApi,
  updateConsultationRequestApi,
  deleteConsultationRequestApi
} from '~/api/consultationRequests';

import {
  getConsultationRequestsRequest,
  reGetConsultationRequestsRequest,
  getConsultationRequestsSuccess,
  getConsultationRequestsFail,
  getConsultationRequestRequest,
  getConsultationRequestSuccess,
  getConsultationRequestFail,
  updateConsultationRequestRequest,
  updateConsultationRequestSuccess,
  updateConsultationRequestFail,
  deleteConsultationRequestRequest,
  deleteConsultationRequestSuccess,
  deleteConsultationRequestFail
} from '~/store/slices/rootAction';

function* requestConsultationRequestsSaga(action) {
  try {
    const results = yield call(getConsultationRequestsApi, action.payload);

    yield put(getConsultationRequestsSuccess(results));
  } catch (error) {
    yield put(getConsultationRequestsFail(error));
  }
}

function* requestConsultationRequestSaga(action) {
  try {
    const results = yield call(getConsultationRequestApi, action.payload);
    yield put(getConsultationRequestSuccess(results));
  } catch (error) {
    yield put(getConsultationRequestFail(error));
  }
}

function* requestUpdateConsultationRequestSaga(action) {
  try {
    const { params } = action.payload;
    if (params) {
      delete action.payload.params;
    }

    const results = yield call(updateConsultationRequestApi, action.payload);
    yield put(updateConsultationRequestSuccess(results));
    yield put(reGetConsultationRequestsRequest({ params }));
  } catch (error) {
    yield put(updateConsultationRequestFail(error));
  }
}

function* requestDeleteConsultationRequestSaga(action) {
  try {
    const { params } = action.payload;
    if (params) {
      delete action.payload.params;
    }

    const results = yield call(deleteConsultationRequestApi, action.payload);

    console.log('results', results);
    yield put(deleteConsultationRequestSuccess(results));
    yield put(reGetConsultationRequestsRequest({ params }));
  } catch (error) {
    yield put(deleteConsultationRequestFail(error));
  }
}

export default function* watchConsultationRequests() {
  yield takeLatest(getConsultationRequestsRequest.type, requestConsultationRequestsSaga);
  yield takeLatest(getConsultationRequestRequest.type, requestConsultationRequestSaga);
  yield takeLatest(updateConsultationRequestRequest.type, requestUpdateConsultationRequestSaga);
  yield takeLatest(deleteConsultationRequestRequest.type, requestDeleteConsultationRequestSaga);

  yield takeLatest([reGetConsultationRequestsRequest.type], requestConsultationRequestsSaga);
}
