import { all } from 'redux-saga/effects';
import watchAuthentication from './authentication';
import watchUsers from './users';

export default function* rootSaga() {
  yield all([watchAuthentication(), watchUsers()]);
}
