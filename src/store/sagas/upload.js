import { put, call, takeLatest } from 'redux-saga/effects';
import {
    uploadImageApi,
} from '~/api/upload';

import {
    uploadRequest,
    uploadSuccess,
    uploadFail,
} from '~/store/slices/rootAction';

function* requestUploadImageSaga(action) {
    try {
        // const { params } = action.payload;
        // // console.log("requestAddUserSaga 1", action.payload.params);
        // if (params) {
        //     delete action.payload.params;
        // }

        const result = yield call(uploadImageApi, action.payload);
        yield put(uploadSuccess(result));
    } catch (error) {
        yield put(uploadFail(error));
    }
}



export default function* watchUpload() {
    yield takeLatest(uploadRequest.type, requestUploadImageSaga);
}
