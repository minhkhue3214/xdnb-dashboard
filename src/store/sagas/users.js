import { put, call, takeLatest } from 'redux-saga/effects';
import { getAllUsersApi } from '~/api/authentication';

import { getAllUserRequest, getAllUserFail } from '~/store/slices/rootAction';

function* requestAllUsersSaga(action) {
    try {
        const data = yield call(getAllUsersApi, action.payload);
        console.log("requestAllUsersSaga", data);

        // yield put(
        //     getAllUserSuccess()
        // );
    } catch (error) {
        console.log('error', error);
        yield put(getAllUserFail(error?.message || 'Login Failed!'));
    }
}


export default function* getAllUsersSaga() {
    yield takeLatest(getAllUserRequest.type, requestAllUsersSaga);
}
