import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    getProfileRequest,
    updatePasswordProfileRequest
} from '~/store/slices/profile';

const useProfileStore = () => {
    const dispatch = useDispatch();

    const profileState = useSelector((state) => state.profile);

    const dispatchGetProfile = useCallback(
        (payload) => {
            dispatch(getProfileRequest(payload));

            return true;
        },
        [dispatch]
    );

    const dispatchUpdateProfilePassword = useCallback(
        (payload) => {
            dispatch(updatePasswordProfileRequest(payload));

            return true;
        },
        [dispatch]
    );

    return {
        dispatchGetProfile,
        dispatchUpdateProfilePassword,
        profileState
    };
};

export { useProfileStore };

