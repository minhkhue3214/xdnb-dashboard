import { put, call, takeLatest } from 'redux-saga/effects';
import { getAllUsersApi, requestDeleteUserApi, requestAddUserApi } from '~/api/users';

import {
  getAllUserRequest,
  getAllUserSuccess,
  getAllUserFail,
  deleteUserRequest,
  deleteUserSuccess,
  deleteFail,
  addUserRequest,
  addUserSuccess,
  addUserFail
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
    yield call(requestAddUserApi, action.payload);
    yield put(addUserSuccess(action.payload));
  } catch (error) {
    console.log('error', error);
    yield put(addUserFail(error?.message || 'Add user failed!'));
  }
}

export default function* watchUsers() {
  yield takeLatest(getAllUserRequest.type, requestAllUsersSaga);
  yield takeLatest(deleteUserRequest.type, requestDeleteUserSaga);
  yield takeLatest(addUserRequest.type, requestAddUserSaga);

  // Khi thêm user thành công hoặc xóa user thành công thì đều gọi lại requestAllUsers để cập nhật lại list user
  yield takeLatest(deleteUserSuccess.type, requestAllUsersSaga);
  yield takeLatest(addUserSuccess.type, requestAllUsersSaga);
}
