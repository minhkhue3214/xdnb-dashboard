import { createSlice } from '@reduxjs/toolkit';
import dispatchToast from '~/handlers/toast';

const initialState = {
  accessToken: {
    value: '',
    expires: ''
  },
  refreshToken: {
    value: '',
    expires: ''
  },
  loginInfo: null
};

export const authentication = createSlice({
  name: 'authentication',
  initialState,
  reducers: {
    loginRequest: () => {
      // request login
    },
    loginSuccess: (state, action) => {
      const { accessToken, refreshToken, loginInfo } = action.payload;
      state.accessToken = accessToken;
      state.refreshToken = refreshToken;
      state.loginInfo = loginInfo;

      dispatchToast('success', 'Welcome back!');
    },
    loginFail: (_, action) => {
      dispatchToast('error', action.payload);
    },
    logoutRequest: () => {
      // request logout
    },
    logoutSuccess: (state) => {
      state.accessToken = initialState.accessToken;
      state.refreshToken = initialState.refreshToken;
      state.loginInfo = initialState.loginInfo;
      dispatchToast('success', 'Good bye!');
    },
    logoutFail: (_, action) => {
      dispatchToast('error', action.payload);
    }
  }
});

export const { loginRequest, loginSuccess, logoutRequest, logoutSuccess, loginFail, logoutFail } = authentication.actions;

export default authentication.reducer;