import { all } from 'redux-saga/effects';
import watchAuthentication from './authentication';
import watchUsers from './users';
import watchPosts from './posts';
import watchProfile from './profile';

export default function* rootSaga() {
  yield all([watchAuthentication(), watchUsers(), watchPosts(), watchProfile()]);
}
