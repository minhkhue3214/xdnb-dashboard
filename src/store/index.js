import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import customization from './customization';
import authentication from './authentication';

const rootReducer = combineReducers({
  authentication,
  customization
});

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['authentication'] // Danh sách các reducer muốn lưu trữ
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer
});

export const persistor = persistStore(store);
