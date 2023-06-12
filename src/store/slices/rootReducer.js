import { combineReducers } from 'redux';
import { default as customization } from './customization';
import { default as authentication } from './authentication';
import { default as users } from './users';
import { default as shifts } from './shifts';
import { default as organizations } from './organizations';
import { default as places } from './places';
export * from './customization';
export * from './authentication';
export * from './users';
export * from './shifts';
export * from './organizations';
export * from './places';

const rootReducer = combineReducers({
  authentication,
  customization,
  users,
  shifts,
  organizations,
  places
});

export default rootReducer;
