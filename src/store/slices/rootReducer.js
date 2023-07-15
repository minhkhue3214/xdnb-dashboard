import { combineReducers } from 'redux';
import { default as authentication } from './authentication';
import { default as customization } from './customization';
import { default as users } from './users';
import { default as posts } from './posts';
import { default as categories } from './categories';
export * from './authentication';
export * from './customization';
export * from './users';
export * from './posts';
export * from './categories';

const rootReducer = combineReducers({
  authentication,
  customization,
  users,
  posts,
  categories
});

export default rootReducer;
