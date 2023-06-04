import { all } from 'redux-saga/effects';
import authenticationSaga from './authentication';
import getAllUsersSaga from './users';
import getAllShiftsSaga from './shifts';
import getAllOrganizationsSaga from './organizations';

export default function* rootSaga() {
  yield all([authenticationSaga(), getAllUsersSaga(), getAllShiftsSaga(), getAllOrganizationsSaga()]);
}
