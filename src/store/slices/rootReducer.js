import { combineReducers } from 'redux';
import { default as customization } from './customization';
import { default as authentication } from './authentication';
import { default as users } from './users';
import { default as shifts } from './shifts';
export * from './customization';
export * from './authentication';
export * from './users';
export * from './shifts';

const rootReducer = combineReducers({
  authentication,
  customization,
  users,
  shifts
});

export default rootReducer;
