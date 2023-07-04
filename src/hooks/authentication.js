import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeRememberMe, initApp, loginRequest, logoutSuccess } from '~/store/slices/authentication';

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
      // console.log("dispatchLogin", payload)
      dispatch(loginRequest(payload));

      return true;
    },
    [dispatch]
  );

  const dispatchLogout = useCallback(() => {
    dispatch(logoutSuccess());

    return true;
  }, [dispatch]);

  const dispatchChangeRememberMe = useCallback(
    (payload) => {
      dispatch(changeRememberMe(payload));
    },
    [dispatch]
  );

  return {
    dispatchInitApp,
    authenticationState,
    dispatchLogin,
    dispatchLogout,
    dispatchChangeRememberMe
  };
};

export { useAuthenticationStore };
