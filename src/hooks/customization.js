import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeMenuOpen, setBorderRadius, setFontFamily, setMenu } from '~/store/slices/customization';

const useCustomizationStore = () => {
  const dispatch = useDispatch();

  const customizationState = useSelector((state) => state.customization);

  const dispatchMenuOpen = useCallback(
    (payload) => {
      dispatch(changeMenuOpen(payload));
    },
    [dispatch]
  );

  const dispatchSetMenu = useCallback(
    (payload) => {
      dispatch(setMenu(payload));
    },
    [dispatch]
  );

  const dispatchSetFontFamily = useCallback(
    (payload) => {
      dispatch(setFontFamily(payload));
    },
    [dispatch]
  );

  const dispatchSetBorderRadius = useCallback(
    (payload) => {
      dispatch(setBorderRadius(payload));
    },
    [dispatch]
  );

  return {
    customizationState,
    dispatchMenuOpen,
    dispatchSetMenu,
    dispatchSetFontFamily,
    dispatchSetBorderRadius
  };
};

export { useCustomizationStore };
