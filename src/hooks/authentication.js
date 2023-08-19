import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeRememberMe, initApp, loginRequest, logoutRequest, recoveryPassword1Request, recoveryPassword2Request, forceLogout } from '~/store/slices/authentication';

const useAuthenticationStore = () => {
  const dispatch = useDispatch();

  const authenticationState = useSelector((state) => state.authentication);

  const dispatchInitApp = useCallback(
    (payload) => {
      dispatch(initApp(payload));
    },
    [dispatch]
  );

  const dispatchLogin = useCallback(
    (payload) => {
      dispatch(loginRequest(payload));

      return true;
    },
    [dispatch]
  );

  const dispatchLogout = useCallback(() => {
    dispatch(logoutRequest());

    return true;
  }, [dispatch]);

  const dispatchChangeRememberMe = useCallback(
    (payload) => {
      dispatch(changeRememberMe(payload));
    },
    [dispatch]
  );

  const dispatchRecoveryPassword1 = useCallback(
    (payload) => {
      console.log("dispatchRecoveryPassword1", payload)
      dispatch(recoveryPassword1Request(payload));
    },
    [dispatch]
  );

  const dispatchRecoveryPassword2 = useCallback(
    (payload) => {
      console.log("dispatchRecoveryPassword2", payload)
      dispatch(recoveryPassword2Request(payload));
    },
    [dispatch]
  );

  const dispatchForceLogout = useCallback(
    () => {
      dispatch(forceLogout());
    },
    [dispatch]
  );

  return {
    dispatchInitApp,
    authenticationState,
    dispatchLogin,
    dispatchLogout,
    dispatchChangeRememberMe,
    dispatchRecoveryPassword1,
    dispatchRecoveryPassword2,
    dispatchForceLogout
  };
};

export { useAuthenticationStore };
