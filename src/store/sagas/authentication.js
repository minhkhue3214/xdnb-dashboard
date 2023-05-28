import { put, call, takeLatest } from 'redux-saga/effects';
import { loginRequestApi } from '~/api/authentication';
import { loginRequest, loginSuccess, loginFail } from '~/store/slices/rootAction';

function* loginRequestSaga(action) {
  try {
    const data = yield call(loginRequestApi, action.payload);

    yield put(
      loginSuccess({
        accessToken: data.tokens?.access,
        refreshToken: data.tokens?.refresh,
        loginInfo: data.user
      })
    );
  } catch (error) {
    console.log('error', error);
    yield put(loginFail(error?.message || 'Login Failed!'));
  }
}

export default function* authenticationSaga() {
  yield takeLatest(loginRequest.type, loginRequestSaga);
}
