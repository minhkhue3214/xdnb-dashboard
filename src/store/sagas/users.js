import { put, call, takeLatest } from 'redux-saga/effects';
import { getAllUsersApi } from '~/api/users';

import { getAllUserRequest, getAllUserSuccess, getAllUserFail } from '~/store/slices/rootAction';

function* requestAllUsersSaga() {
    try {
        const data = yield call(getAllUsersApi);
        console.log("requestAllUsersSaga", data);

        yield put(
            getAllUserSuccess({
                page: data?.page,
                results: data?.results,
                totalPages: data?.totalPages,
            })
        );
    } catch (error) {
        console.log('error', error);
        yield put(getAllUserFail(error?.message || 'Login Failed!'));
    }
}


export default function* getAllUsersSaga() {
    yield takeLatest(getAllUserRequest.type, requestAllUsersSaga);
}
