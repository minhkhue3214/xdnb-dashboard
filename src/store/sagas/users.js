import { put, call, takeLatest } from 'redux-saga/effects';
import { getAllUsersApi, requestDeleteUserApi, requestAddUserApi, requestGetUserApi, requestUpdateUserApi } from '~/api/users';

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
  updateUserFail
} from '~/store/slices/rootAction';

function* requestAllUsersSaga(action) {
  try {
    const data = yield call(getAllUsersApi, action.payload);

    yield put(
      getAllUserSuccess({
        page: data?.page,
        results: data?.results,
        totalPages: data?.totalPages
      })
    );
  } catch (error) {
    console.log('error', error);
    yield put(getAllUserFail(error?.message || 'Get all users failed!'));
  }
}

function* requestDeleteUserSaga(action) {
  try {
    yield call(requestDeleteUserApi, action.payload);
    yield put(deleteUserSuccess(action.payload));
  } catch (error) {
    console.log('error', error);
    yield put(deleteFail(error?.message || 'Delete user failed!'));
  }
}

function* requestAddUserSaga(action) {
  try {
    const data = yield call(requestAddUserApi, action.payload);
    yield put(addUserSuccess(data));
  } catch (error) {
    console.log('error', error);
    yield put(addUserFail(error?.message || 'Add user failed!'));
  }
}

function* requestGetUserSaga(action) {
  try {
    const data = yield call(requestGetUserApi, action.payload);
    yield put(
      getUserSuccess({
        name: data.name,
        email: data.email,
        role: data.role,
        orgIds: data.org_ids,
        username: data.username,
        password: data.password
      })
    );
  } catch (error) {
    console.log('error', error);
    yield put(getUserFail(error?.message || 'Get user info failed!'));
  }
}

function* requestUpdateUserSaga(action) {
  try {
    const data = yield call(requestUpdateUserApi, action.payload);
    yield put(updateUserSuccess(data));
  } catch (error) {
    console.log('error', error);
    yield put(updateUserFail(error?.message || 'Update user info failed!'));
  }
}

export default function* watchUsers() {
  yield takeLatest(getAllUserRequest.type, requestAllUsersSaga);
  yield takeLatest(deleteUserRequest.type, requestDeleteUserSaga);
  yield takeLatest(addUserRequest.type, requestAddUserSaga);
  yield takeLatest(getUserRequest.type, requestGetUserSaga);
  yield takeLatest(updateUserRequest.type, requestUpdateUserSaga);

  // Khi thêm user thành công hoặc xóa user thành công thì đều gọi lại requestAllUsers để cập nhật lại list user
  yield takeLatest([deleteUserSuccess.type, addUserSuccess.type, updateUserRequest.type], requestAllUsersSaga);
}
