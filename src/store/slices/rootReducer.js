import { combineReducers } from 'redux';
import { default as customization } from './customization';
import { default as authentication } from './authentication';
import { default as users } from './users';
import { default as shifts } from './shifts';
import { default as organizations } from './organizations';
export * from './customization';
export * from './authentication';
export * from './users';
export * from './shifts';
export * from './organizations';

const rootReducer = combineReducers({
  authentication,
  customization,
  users,
  shifts,
  organizations
});

export default rootReducer;
