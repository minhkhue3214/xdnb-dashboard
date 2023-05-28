import { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { loginRequest, logoutSuccess } from '~/store/slices/authentication';

const useAuthenticationStore = () => {
  const dispatch = useDispatch();

  const authenticationState = useSelector((state) => state.authentication);

  const dispatchLogin = useCallback(
    (payload) => {
      dispatch(loginRequest(payload));

      return true;
    },
    [dispatch]
  );

  const dispatchLogout = useCallback(() => {
    dispatch(logoutSuccess());

    return true;
  }, [dispatch]);

  return {
    authenticationState,
    dispatchLogin,
    dispatchLogout
  };
};

export { useAuthenticationStore };
