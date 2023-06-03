import { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllShiftRequest, deleteShiftRequest } from '~/store/slices/shifts';

const GetAllShifts = () => {
    const dispatch = useDispatch();

    const listShiftsState = useSelector((state) => state.shifts);

    const dispatchGetAllShifts = useCallback((payload) => {
        dispatch(getAllShiftRequest(payload));

        return true;
    },
        [dispatch]
    );


    const dispatchDeleteShift = useCallback((payload) => {
        dispatch(deleteShiftRequest(payload));

        return true;
    }, [dispatch]);

    return {
        dispatchGetAllShifts,
        dispatchDeleteShift,
        listShiftsState
    };
}

export { GetAllShifts };