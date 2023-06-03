import { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllUserRequest, deleteUserRequest } from '~/store/slices/users';

const GetAllUsers = () => {
  const dispatch = useDispatch();

  const listUserState = useSelector((state) => state.users);

  const dispatchGetAllUsers = useCallback(
    (payload) => {
      dispatch(getAllUserRequest(payload));

      return true;
    },
    [dispatch]
  );

  const dispatchDeleteUser = useCallback(
    (payload) => {
      console.log('testing dispatchDeleteUser', payload);
      dispatch(deleteUserRequest(payload));

      return true;
    },
    [dispatch]
  );

  return {
    dispatchGetAllUsers,
    dispatchDeleteUser,
    listUserState
  };
};

export { GetAllUsers };
