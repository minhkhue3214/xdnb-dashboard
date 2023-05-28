import { combineReducers } from 'redux';
import { default as customization } from './customization';
import { default as authentication } from './authentication';
export * from './customization';
export * from './authentication';

const rootReducer = combineReducers({
  authentication,
  customization
});

export default rootReducer;
