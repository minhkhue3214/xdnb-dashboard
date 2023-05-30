// import { useCallback } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { getAllUserRequest } from '~/store/slices/authentication';

// const getAllUsers = () => {
//     const dispatch = useDispatch();

//     const listUserState = useSelector((state) => state.users);

//     const dispatchGetAllUsers = useCallback(
//         (payload) => {
//             dispatch(getAllUserRequest(payload));

//             return true;
//         },
//         [dispatch]
//     );

//     return {
//         dispatchGetAllUsers,
//         listUserState
//     };
// }