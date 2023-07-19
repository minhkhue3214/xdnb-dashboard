import { createSlice } from '@reduxjs/toolkit';
import dispatchToast from '~/handlers/toast';

const initialState = {
    profile: null,
};

export const profile = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        getProfileRequest: () => {
            // request profile
        },
        getProfileSuccess: (state, action) => {
            // console.log("getProfileSuccess", action.payload)
            state.profile = action.payload;
        },
        getProfileFail: (_, action) => {
            const { message } = action.payload;
            dispatchToast('error', message);
        },
        updatePasswordProfileRequest: () => {
            // request update user
        },
        updatePasswordProfileSuccess: () => {
            dispatchToast('success', 'Updated password!');
        },
        updatePasswordProfileFail: (_, action) => {
            const { message } = action.payload;
            dispatchToast('error', message);
        },
        updateProfileRequest: () => {
            //
        },
        updateProfileSuccess: (_, action) => {
            const { message } = action.payload;

            dispatchToast('success', message);
        },
        updateProfileFail: (_, action) => {
            const { message } = action.payload;

            dispatchToast('error', message);
        },
    }
});

export const {
    getProfileRequest,
    getProfileSuccess,
    getProfileFail,
    updatePasswordProfileRequest,
    updatePasswordProfileSuccess,
    updatePasswordProfileFail,
    updateProfileRequest,
    updateProfileSuccess,
    updateProfileFail
} = profile.actions;

export default profile.reducer;