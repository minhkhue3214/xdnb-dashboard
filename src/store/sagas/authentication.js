import { call, put, takeLatest } from 'redux-saga/effects';
import { loginRequestApi, logoutRequestApi, recoveryPasswordStep1Api, recoveryPasswordStep2Api } from '~/api/authentication';
import { loginFail, loginRequest, loginSuccess, logoutRequest, logoutSuccess, logoutFail, recoveryPassword1Request, recoveryPassword1Success, recoveryPassword1Fail, recoveryPassword2Request, recoveryPassword2Success, recoveryPassword2Fail, forceLogout } from '~/store/slices/rootAction';

function* loginRequestSaga(action) {
  try {
    const results = yield call(loginRequestApi, action.payload);

    yield put(loginSuccess(results));
  } catch (error) {
    yield put(loginFail(error));
  }
}
function* logoutRequestSaga(action) {
  try {
    const results = yield call(logoutRequestApi, action.payload);
    console.log("logoutRequestSaga", results);
    yield put(logoutSuccess(results));
  } catch (error) {
    if (error.code == 401) {
      yield put(forceLogout());
      return;
    }
    yield put(logoutFail(error));
  }
}
function* recoveryPassword1Saga(action) {
  try {
    const results = yield call(recoveryPasswordStep1Api, action.payload);
    console.log("logoutRequestSaga", results);
    yield put(recoveryPassword1Success(results));
  } catch (error) {
    yield put(recoveryPassword1Fail(error));
  }
}
function* recoveryPassword2Saga(action) {
  try {
    const results = yield call(recoveryPasswordStep2Api, action.payload);
    yield put(recoveryPassword2Success(results));
  } catch (error) {
    yield put(recoveryPassword2Fail(error));
  }
}

export default function* watchAuthentication() {
  yield takeLatest(loginRequest.type, loginRequestSaga);
  yield takeLatest(logoutRequest.type, logoutRequestSaga);
  yield takeLatest(recoveryPassword1Request.type, recoveryPassword1Saga);
  yield takeLatest(recoveryPassword2Request.type, recoveryPassword2Saga);
}
