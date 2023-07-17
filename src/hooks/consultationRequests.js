import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getConsultationRequestsRequest,
  getConsultationRequestRequest,
  updateConsultationRequestRequest,
  deleteConsultationRequestRequest
} from '~/store/slices/consultationRequests';

const useConsultationRequestsStore = () => {
  const dispatch = useDispatch();

  const consultationRequestsState = useSelector((state) => state.consultationRequests);

  const dispatchGetConsultationRequests = useCallback(
    (payload) => {
      dispatch(getConsultationRequestsRequest(payload));

      return true;
    },
    [dispatch]
  );
  const dispatchGetConsultationRequest = useCallback(
    (payload) => {
      dispatch(getConsultationRequestRequest(payload));

      return true;
    },
    [dispatch]
  );

  const dispatchUpdateConsultationRequest = useCallback(
    (payload) => {
      dispatch(updateConsultationRequestRequest(payload));

      return true;
    },
    [dispatch]
  );

  const dispatchDeleteConsultationRequest = useCallback(
    (payload) => {
      dispatch(deleteConsultationRequestRequest(payload));

      return true;
    },
    [dispatch]
  );

  return {
    dispatchGetConsultationRequests,
    dispatchGetConsultationRequest,
    dispatchUpdateConsultationRequest,
    dispatchDeleteConsultationRequest,
    consultationRequestsState
  };
};

export { useConsultationRequestsStore };
