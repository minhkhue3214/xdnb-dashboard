import { createSlice } from '@reduxjs/toolkit';
import dispatchToast from '~/handlers/toast';

const initialState = {
    users: [],
}

export const users = createSlice({
    name: 'users',
    initialState,
    reducers: {
        getAllUserRequest: () => {
            // request user
        },
        getAllUserSuccess: (state, action) => {
            const users = action.payload;
            console.log('users', users);

            state.users = users;
        },
        getAllUserFail: (_, action) => {
            dispatchToast('error', action.payload);
        },
    }
});

export const { getAllUserRequest, getAllUserSuccess, getAllUserFail } = users.actions;

export default users.reducer;