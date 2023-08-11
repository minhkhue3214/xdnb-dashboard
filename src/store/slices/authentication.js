import { createSlice } from '@reduxjs/toolkit';
import dispatchToast from '~/handlers/toast';

const initialState = {
  token: '',
  loginInfo: null,
  rememberMe: true
};

export const authentication = createSlice({
  name: 'authentication',
  initialState,
  reducers: {
    initApp: () => {
      //
    },
    changeRememberMe: (state, action) => {
      state.rememberMe = action.payload;
    },
    loginRequest: () => {
      // request login
    },
    loginSuccess: (state, action) => {
      const { data, message } = action.payload;

      const { token, user } = data;
      console.log("loginSuccess",token,user)

      state.token = token;
      state.loginInfo = user;

      dispatchToast('success', message);
    },
    loginFail: (_, action) => {
      const { message } = action.payload;

      dispatchToast('error', message);
    },
    logoutRequest: () => {
      // request logout
    },
    logoutSuccess: (state) => {
      const { message } = action.payload;

      state.token = initialState.token;
      state.loginInfo = initialState.loginInfo;
      dispatchToast('success', message);
    },
    logoutFail: (_, action) => {
      const { message } = action.payload;

      dispatchToast('error', message);
    }
  }
});

export const { initApp, changeRememberMe, loginRequest, loginSuccess, logoutRequest, logoutSuccess, loginFail, logoutFail } =
  authentication.actions;

export default authentication.reducer;
