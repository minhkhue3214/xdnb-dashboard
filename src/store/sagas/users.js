import { put, call, takeLatest } from 'redux-saga/effects';
import {
  getAllUsersApi,
  requestDeleteUserApi,
  requestAddUserApi,
  requestGetUserApi,
  requestUpdateUserApi,
  requestUpdatePasswordApi
} from '~/api/users';

import {
  getAllUserRequest,
  getAllUserSuccess,
  getAllUserFail,
  deleteUserRequest,
  deleteUserSuccess,
  deleteFail,
  addUserRequest,
  addUserSuccess,
  addUserFail,
  getUserRequest,
  getUserSuccess,
  getUserFail,
  updateUserRequest,
  updateUserSuccess,
  updateUserFail,
  updatePasswordRequest,
  updatePasswordSuccess,
  updatePasswordFail,
  reGetAllUserRequest
} from '~/store/slices/rootAction';

function* requestAllUsersSaga(action) {
  try {
    const result = yield call(getAllUsersApi, action.payload);
    const { meta, data } = result;

    yield put(
      getAllUserSuccess({
        results: data,
        totalPages: meta?.total,
        page: meta?.current_page
      })
    );
  } catch (error) {
    yield put(getAllUserFail(error));
  }
}

function* requestDeleteUserSaga(action) {
  try {
    const params = action.payload?.params;
    if (params) {
      delete action.payload.params;
    }

    yield call(requestDeleteUserApi, action.payload);
    yield put(deleteUserSuccess(action.payload));
    yield put(reGetAllUserRequest({ params }));
  } catch (error) {
    yield put(deleteFail(error));
  }
}

function* requestAddUserSaga(action) {
  try {
    // const params = action.payload?.params;
    // console.log("requestAddUserSaga 1", action.payload.params);
    // if (params) {
    //   delete action.payload.params;
    // }

    const result = yield call(requestAddUserApi, action.payload);
    yield put(addUserSuccess(result));
    // yield put(reGetAllUserRequest({ params }));
    yield put(reGetAllUserRequest());
  } catch (error) {
    yield put(addUserFail(error));
  }
}

function* requestGetUserSaga(action) {
  try {
    const result = yield call(requestGetUserApi, action.payload);
    const { data } = result;

    yield put(
      getUserSuccess({
        fullname: data.fullname,
        username: data.username,
        avatar: data.avatar,
        phone: data.phone,
        email: data.email,
        address: data.address,
        role: data.role,
        password: data.password
      })
    );
  } catch (error) {
    yield put(getUserFail(error));
  }
}

function* requestUpdateUserSaga(action) {
  try {
    const params = action.payload?.params;
    if (params) {
      delete action.payload.params;
    }

    const data = yield call(requestUpdateUserApi, action.payload);
    yield put(updateUserSuccess(data));
    yield put(reGetAllUserRequest({ params }));
  } catch (error) {
    yield put(updateUserFail(error));
  }
}

function* requestUpdatePasswordSaga(action) {
  try {
    const data = yield call(requestUpdatePasswordApi, action.payload);
    yield put(updatePasswordSuccess(data));
  } catch (error) {
    yield put(updatePasswordFail(error));
  }
}

export default function* watchUsers() {
  yield takeLatest(getAllUserRequest.type, requestAllUsersSaga);
  yield takeLatest(deleteUserRequest.type, requestDeleteUserSaga);
  yield takeLatest(addUserRequest.type, requestAddUserSaga);
  yield takeLatest(getUserRequest.type, requestGetUserSaga);
  yield takeLatest(updateUserRequest.type, requestUpdateUserSaga);
  yield takeLatest(updatePasswordRequest.type, requestUpdatePasswordSaga);

  yield takeLatest([reGetAllUserRequest.type], requestAllUsersSaga);
}
