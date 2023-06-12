import { put, call, takeLatest } from 'redux-saga/effects';
import { getAllOrganizationsApi, requestDeleteOrganizationsApi } from '~/api/organizations';
import {
  getAllOrganizationRequest,
  getAllOrganizationSuccess,
  getAllOrganizationFail,
  deleteOrganizationRequest,
  deleteOrganizationSuccess,
  deleteOrganizationFail
} from '~/store/slices/rootAction';

function* requestAllOrganizationsSaga(action) {
  try {
    const data = yield call(getAllOrganizationsApi, action.payload);
    console.log('requestAllOrganizationsSaga', data);

    yield put(
      getAllOrganizationSuccess({
        page: data?.page,
        results: data?.results,
        totalPages: data?.totalPages
      })
    );
  } catch (error) {
    console.log('error', error);
    yield put(getAllOrganizationFail(error?.message || 'Get all organizations failed!'));
  }
}

function* requestDeleteOrganizationSaga(action) {
  try {
    yield call(requestDeleteOrganizationsApi, action.payload);
    yield put(deleteOrganizationSuccess(action.payload));
  } catch (error) {
    console.log('error', error);
    yield put(deleteOrganizationFail(error?.message || 'Delete organizations failed!'));
  }
}

export default function* watchOrganizations() {
  yield takeLatest(getAllOrganizationRequest.type, requestAllOrganizationsSaga);
  yield takeLatest(deleteOrganizationRequest.type, requestDeleteOrganizationSaga);
}
