import { all } from 'redux-saga/effects';
import authenticationSaga from './authentication';
import getAllUsersSaga from './users';

export default function* rootSaga() {
  yield all([authenticationSaga(), getAllUsersSaga()]);
}
