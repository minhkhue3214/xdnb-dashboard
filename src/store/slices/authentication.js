import { createSlice } from '@reduxjs/toolkit';
import dispatchToast from '~/handlers/toast';

const initialState = {
  token: '',
  loginInfo: null,
  rememberMe: true,
  recoveryPassword1Status: false,
  recoveryPasswordS2tatus: false,
};

export const authentication = createSlice({
  name: 'authentication',
  initialState,
  reducers: {
    initApp: () => {
      //
    },
    forceLogout: (state, ) => {
      state.token = "";
      state.loginInfo = null;
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
      console.log("loginSuccess", token, user)

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
    logoutSuccess: (state, action) => {
      const { message } = action.payload;

      state.token = "";
      state.loginInfo = null;
      dispatchToast('success', message);
    },
    logoutFail: (_, action) => {
      const { message } = action.payload;

      dispatchToast('error', message);
    },
    recoveryPassword1Request: () => {
      // request recoveryPassword1
    },
    recoveryPassword1Success: (state, action) => {
      const { message, success } = action.payload;
      state.recoveryPassword1Status = success;
      dispatchToast('success', message);
    },
    recoveryPassword1Fail: (_, action) => {
      const { message } = action.payload;
      state.recoveryPassword1Status = false;
      dispatchToast('error', message);
    },
    recoveryPassword2Request: () => {
      // request recoveryPassword1
    },
    recoveryPassword2Success: (state, action) => {
      const { message, success } = action.payload;
      state.recoveryPasswordS2tatus = success;
      dispatchToast('success', message);
    },
    recoveryPassword2Fail: (_, action) => {
      const { message } = action.payload;
      state.recoveryPasswordS2tatus = false;
      dispatchToast('error', message);
    },
  }
});

export const { initApp, changeRememberMe, loginRequest, loginSuccess, logoutRequest, logoutSuccess, loginFail, logoutFail, recoveryPassword1Request, recoveryPassword1Success, recoveryPassword1Fail, recoveryPassword2Request, recoveryPassword2Success, recoveryPassword2Fail, forceLogout } =
  authentication.actions;

export default authentication.reducer;
