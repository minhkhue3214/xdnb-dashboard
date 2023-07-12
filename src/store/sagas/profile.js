import { call, put, takeLatest } from 'redux-saga/effects';
import {
    getProfileInfoApi,
    updatePasswordApi,
    updateProfileInfoApi
} from '~/api/profile';

import {
    getProfileFail,
    getProfileRequest,
    getProfileSuccess,
    updatePasswordProfileRequest,
    updatePasswordProfileSuccess,
    updatePasswordProfileFail,
    updateProfileRequest,
    updateProfileSuccess,
    updateProfileFail
} from '~/store/slices/rootAction';

function* requestProfileSaga(action) {
    try {
        const result = yield call(getProfileInfoApi, action.payload);
        const { data } = result;
        console.log("requestProfileSaga", data);
        yield put(
            getProfileSuccess({
                fullname: data.fullname,
                username: data.username,
                avatar: data.avatar,
                phone: data.phone,
                email: data.email,
                address: data.address,
                role: data.role,
                id: data.id
            })
        );
    } catch (error) {
        yield put(getProfileFail(error));
    }
}

function* requestUpdatePasswordSaga(action) {
    try {
        console.log("requestUpdatePasswordSaga", action.payload)
        const data = yield call(updatePasswordApi, action.payload);
        yield put(updatePasswordProfileSuccess(data));
    } catch (error) {
        yield put(updatePasswordProfileFail(error));
    }
}

function* requestUpdateProfileSaga(action) {
    try {
        const { params } = action.payload;
        if (params) {
            delete action.payload.params;
        }

        const results = yield call(updateProfileInfoApi, action.payload);
        yield put(updateProfileSuccess(results));
    } catch (error) {
        yield put(updateProfileFail(error));
    }
}

export default function* watchProfile() {
    yield takeLatest(updatePasswordProfileRequest.type, requestUpdatePasswordSaga);
    yield takeLatest(getProfileRequest.type, requestProfileSaga);
    yield takeLatest(updateProfileRequest.type, requestUpdateProfileSaga);
}

