import { combineReducers } from 'redux';
import { default as authentication } from './authentication';
import { default as customization } from './customization';
import { default as users } from './users';
export * from './authentication';
export * from './customization';
export * from './users';

const rootReducer = combineReducers({
  authentication,
  customization,
  users
});

export default rootReducer;
