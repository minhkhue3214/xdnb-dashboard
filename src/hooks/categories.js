import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getCategoriesRequest,
  getCategoryRequest,
  addCategoryRequest,
  updateCategoryRequest,
  deleteCategoryRequest
} from '~/store/slices/categories';

const useCategoriesStore = () => {
  const dispatch = useDispatch();

  const categoriesState = useSelector((state) => state.categories);

  const dispatchGetCategories = useCallback(
    (payload) => {
      dispatch(getCategoriesRequest(payload));

      return true;
    },
    [dispatch]
  );
  const dispatchGetCategory = useCallback(
    (payload) => {
      console.log("dispatchGetCategory", payload);
      dispatch(getCategoryRequest(payload));

      return true;
    },
    [dispatch]
  );

  const dispatchAddCategory = useCallback(
    (payload) => {
      console.log("dispatchAddCategory", payload);
      dispatch(addCategoryRequest(payload));

      return true;
    },
    [dispatch]
  );

  const dispatchUpdateCategory = useCallback(
    (payload) => {
      dispatch(updateCategoryRequest(payload));

      return true;
    },
    [dispatch]
  );

  const dispatchDeleteCategory = useCallback(
    (payload) => {
      dispatch(deleteCategoryRequest(payload));

      return true;
    },
    [dispatch]
  );

  return {
    dispatchGetCategories,
    dispatchGetCategory,
    dispatchAddCategory,
    dispatchUpdateCategory,
    dispatchDeleteCategory,
    categoriesState
  };
};

export { useCategoriesStore };
