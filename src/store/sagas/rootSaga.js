import { all } from 'redux-saga/effects';
import watchAuthentication from './authentication';
import watchUsers from './users';
import watchShifts from './shifts';
import watchOrganizations from './organizations';
import watchPlaces from './places';

export default function* rootSaga() {
  yield all([watchAuthentication(), watchUsers(), watchShifts(), watchOrganizations(), watchPlaces()]);
}
