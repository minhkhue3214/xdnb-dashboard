import { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllOrganizationRequest, deleteOrganizationRequest } from '~/store/slices/organizations';

const GetAllOrganizations = () => {
    const dispatch = useDispatch();

    const listOrganizationsState = useSelector((state) => state.organizations);

    const dispatchGetAllOrganizations = useCallback((payload) => {
        dispatch(getAllOrganizationRequest(payload));

        return true;
    },
        [dispatch]
    );


    const dispatchDeleteOrganizations = useCallback((payload) => {
        dispatch(deleteOrganizationRequest(payload));

        return true;
    }, [dispatch]);

    return {
        dispatchGetAllOrganizations,
        dispatchDeleteOrganizations,
        listOrganizationsState
    };
}

export { GetAllOrganizations };