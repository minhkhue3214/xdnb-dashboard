import { all } from 'redux-saga/effects';
import authenticationSaga from './authentication';

export default function* rootSaga() {
  yield all([authenticationSaga()]);
}
