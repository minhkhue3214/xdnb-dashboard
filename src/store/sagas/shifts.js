import { put, call, takeLatest } from 'redux-saga/effects';
import { getAllShiftsApi, requestDeleteShiftApi } from '~/api/shifts';
import { getAllShiftRequest, getAllShiftSuccess, getAllShiftFail, deleteShiftRequest, deleteShiftSuccess, deleteShiftFail } from '~/store/slices/rootAction';


function* requestAllShiftsSaga(action) {
    try {
        const data = yield call(getAllShiftsApi, action.payload);

        yield put(
            getAllShiftSuccess({
                page: data?.page,
                results: data?.results,
                totalPages: data?.totalPages
            })
        );
    } catch (error) {
        console.log('error', error);
        yield put(getAllShiftFail(error?.message || 'Get all shifts failed!'));
    }
}

function* requestDeleteShiftSaga(action) {
    try {

        yield call(requestDeleteShiftApi, action.payload);
        yield put(
            deleteShiftSuccess(action.payload)
        );
    } catch (error) {
        console.log('error', error);
        yield put(deleteShiftFail(error?.message || 'Delete shift failed!'));
    }
}

export default function* getAllShiftsSaga() {
    yield takeLatest(getAllShiftRequest.type, requestAllShiftsSaga);
    yield takeLatest(deleteShiftRequest.type, requestDeleteShiftSaga);

}
