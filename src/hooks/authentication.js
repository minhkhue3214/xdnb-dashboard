import { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { login, logout } from '~/store/authentication';

const useAuthenticationStore = () => {
  const dispatch = useDispatch();

  const authenticationState = useSelector((state) => state.authentication);

  const dispatchLogin = useCallback(
    (payload) => {
      dispatch(login(payload));

      return true;
    },
    [dispatch]
  );

  const dispatchLogout = useCallback(() => {
    dispatch(logout());

    return true;
  }, [dispatch]);

  return {
    authenticationState,
    dispatchLogin,
    dispatchLogout
  };
};

export { useAuthenticationStore };
