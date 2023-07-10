import { call, put, takeLatest } from 'redux-saga/effects';
import { loginRequestApi } from '~/api/authentication';
import { loginFail, loginRequest, loginSuccess } from '~/store/slices/rootAction';

function* loginRequestSaga(action) {
  try {
    const results = yield call(loginRequestApi, action.payload);

    yield put(loginSuccess(results));
  } catch (error) {
    yield put(loginFail(results));
  }
}

export default function* watchAuthentication() {
  yield takeLatest(loginRequest.type, loginRequestSaga);
}
