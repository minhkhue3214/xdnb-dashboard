import { all } from 'redux-saga/effects';
import watchAuthentication from './authentication';
import watchUsers from './users';
import watchPosts from './posts';

export default function* rootSaga() {
  yield all([watchAuthentication(), watchUsers(), watchPosts()]);
}
