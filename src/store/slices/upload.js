import { createSlice } from '@reduxjs/toolkit';
import dispatchToast from '~/handlers/toast';

const initialState = {
    imageName: "",
    imagePath: "",
    imageUrl: "",
};

export const upload = createSlice({
    name: 'upload',
    initialState,
    reducers: {
        uploadRequest: () => {
            // request upload
        },
        uploadSuccess: (state, action) => {
            console.log("uploadSuccess", action.payload)
        },
        uploadFail: (_, action) => {
            const { message } = action.payload;
            dispatchToast('error', message);
        },
    }
});

export const {
    uploadRequest,
    uploadSuccess,
    uploadFail
} = upload.actions;

export default upload.reducer;
