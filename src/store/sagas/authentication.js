import { put, call, delay, takeLatest } from 'redux-saga/effects';
import { loginRequestApi, refreshTokenRequestApi } from '~/api/authentication';
import { initApp, loginRequest, loginSuccess, loginFail, refreshTokenSuccess, refreshTokenFail } from '~/store/slices/rootAction';
import dayjs from 'dayjs';

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
    yield put(loginFail(error?.message || 'Login Failed!'));
  }
}

function* refreshTokenRequestSaga(action) {
  try {
    let { accessToken, refreshToken } = action.payload;

    const refreshTokenExpirationTime = dayjs(refreshToken?.expires);
    const accessTokenExpirationTime = dayjs(accessToken?.expires);
    const currentTime = dayjs();

    // Trong trường hợp refresh token hết hạn. throws luôn ra error:
    if (refreshTokenExpirationTime.isBefore(currentTime)) {
      console.log('refreshTokenRequestSaga', accessToken, refreshToken);
      throw new Error('Refresh token expired');
    }

    console.log(accessToken?.expires, currentTime, accessTokenExpirationTime.isAfter(currentTime), accessTokenExpirationTime, currentTime);

    if (accessTokenExpirationTime.isAfter(currentTime)) {
      console.log('refreshTokenRequestSaga 2', accessToken, refreshToken, currentTime);
      const diffInMillis = accessTokenExpirationTime.diff(currentTime);
      console.log('refreshTokenRequestSaga 4', diffInMillis);
      yield delay(diffInMillis);
    }

    console.log('refreshTokenRequestSaga3', accessToken, refreshToken);

    const data = yield call(refreshTokenRequestApi, {
      refreshToken: refreshToken.token
    });

    yield put(
      refreshTokenSuccess({
        accessToken: data.access,
        refreshToken: data.refresh
      })
    );
  } catch (error) {
    yield put(refreshTokenFail(error?.message || 'Refresh Token Failed!'));
  }
}

export default function* authenticationSaga() {
  yield takeLatest(loginRequest.type, loginRequestSaga);
  yield takeLatest([initApp.type, loginSuccess.type, refreshTokenSuccess.type], refreshTokenRequestSaga);
}
