import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    uploadRequest,
} from '~/store/slices/upload';

const useUploadImageStore = () => {
    const dispatch = useDispatch();

    const uploadState = useSelector((state) => state.upload);

    const dispatchUploadImage = useCallback(
        (payload) => {
            console.log("dispatchUploadImage", payload)
            dispatch(uploadRequest(payload));

            return true;
        },
        [dispatch]
    );

    return {
        dispatchUploadImage,
        uploadState
    };
};

export { useUploadImageStore };
