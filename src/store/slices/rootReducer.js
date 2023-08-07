import { combineReducers } from 'redux';
import { default as authentication } from './authentication';
import { default as customization } from './customization';
import { default as users } from './users';
import { default as posts } from './posts';
import { default as categories } from './categories';
import { default as profile } from './profile';
import { default as products } from './products';
import { default as consultationRequests } from './consultationRequests';
export * from './authentication';
export * from './customization';
export * from './users';
export * from './posts';
export * from './categories';
export * from './profile';
export * from './products';
export * from './consultationRequests';

const rootReducer = combineReducers({
  authentication,
  customization,
  users,
  posts,
  categories,
  profile,
  products,
  consultationRequests,
});

export default rootReducer;
