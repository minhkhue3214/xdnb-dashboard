import { createSlice } from '@reduxjs/toolkit';
import dispatchToast from '~/handlers/toast';

const initialState = {
    users: [],
    pagination: {
        currentPage: null,
        totalPages: null,
    }
}

export const users = createSlice({
    name: 'users',
    initialState,
    reducers: {
        getAllUserRequest: () => {
            // request user
        },
        getAllUserSuccess: (state, action) => {
            const { page, totalPages, results } = action.payload;
            console.log('users', users);

            state.users = results;
            state.pagination.currentPage = page;
            state.pagination.totalPages = totalPages;
        },
        getAllUserFail: (_, action) => {
            dispatchToast('error', action.payload);
        },
    }
});

export const { getAllUserRequest, getAllUserSuccess, getAllUserFail } = users.actions;

export default users.reducer;