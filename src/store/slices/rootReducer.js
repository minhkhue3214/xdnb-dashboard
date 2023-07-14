import { combineReducers } from 'redux';
import { default as authentication } from './authentication';
import { default as customization } from './customization';
import { default as users } from './users';
import { default as posts } from './posts';
import { default as profile } from './profile';
import { default as products } from './products';
export * from './authentication';
export * from './customization';
export * from './users';
export * from './posts';
export * from './profile';
export * from './products';

const rootReducer = combineReducers({
  authentication,
  customization,
  users,
  posts,
  profile,
  products
});

export default rootReducer;
