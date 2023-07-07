import { combineReducers } from 'redux';
import { default as authentication } from './authentication';
import { default as customization } from './customization';
import { default as users } from './users';
import { default as posts } from './posts';
export * from './authentication';
export * from './customization';
export * from './users';
export * from './posts';

const rootReducer = combineReducers({
  authentication,
  customization,
  users,
  posts
});

export default rootReducer;
