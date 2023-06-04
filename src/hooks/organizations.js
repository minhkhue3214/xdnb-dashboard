import { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllOrganizationRequest, deleteOrganizationRequest } from '~/store/slices/organizations';

const useOrganizationsStore = () => {
  const dispatch = useDispatch();

  const organizationsState = useSelector((state) => state.organizations);

  const dispatchGetAllOrganizations = useCallback(
    (payload) => {
      dispatch(getAllOrganizationRequest(payload));

      return true;
    },
    [dispatch]
  );

  const dispatchDeleteOrganizations = useCallback(
    (payload) => {
      dispatch(deleteOrganizationRequest(payload));

      return true;
    },
    [dispatch]
  );

  return {
    dispatchGetAllOrganizations,
    dispatchDeleteOrganizations,
    organizationsState
  };
};

export { useOrganizationsStore };
