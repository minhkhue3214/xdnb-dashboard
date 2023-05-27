import { createSlice } from '@reduxjs/toolkit';

export const authentication = createSlice({
  name: 'authentication',
  initialState: {
    isLogin: false
  },
  reducers: {
    login: (state) => {
      state.isLogin = true;
    },
    logout: (state) => {
      state.isLogin = false;
    }
  }
});

export const { login, logout } = authentication.actions;

export default authentication.reducer;
