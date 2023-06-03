import { put, call, takeLatest } from 'redux-saga/effects';
import { getAllUsersApi, requestDeleteUserApi } from '~/api/users';

import { getAllUserRequest, getAllUserSuccess, getAllUserFail, deleteUserRequest, deleteUserSuccess, deleteFail } from '~/store/slices/rootAction';


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
    yield put(
      deleteUserSuccess(action.payload)
    );
  } catch (error) {
    console.log('error', error);
    yield put(deleteFail(error?.message || 'Delete user Failed!'));
  }
}


export default function* getAllUsersSaga() {
  yield takeLatest(getAllUserRequest.type, requestAllUsersSaga);
  yield takeLatest(deleteUserRequest.type, requestDeleteUserSaga);
}
