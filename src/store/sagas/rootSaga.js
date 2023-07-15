import { all } from 'redux-saga/effects';
import watchAuthentication from './authentication';
import watchUsers from './users';
import watchPosts from './posts';
import watchCategories from './categories';

export default function* rootSaga() {
  yield all([watchAuthentication(), watchUsers(), watchPosts(), watchCategories()]);
}
