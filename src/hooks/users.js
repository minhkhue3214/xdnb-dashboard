import { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllUserRequest } from '~/store/slices/users';

const GetAllUsers = () => {
    const dispatch = useDispatch();

    const listUserState = useSelector((state) => state.users);

    const dispatchGetAllUsers = useCallback(() => {
        dispatch(getAllUserRequest());

        return true;
    },
        [dispatch]
    );

    return {
        dispatchGetAllUsers,
        listUserState
    };
}

export { GetAllUsers };