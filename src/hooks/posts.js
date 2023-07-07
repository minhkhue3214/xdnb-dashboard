import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPostsRequest, getPostRequest, addPostRequest, updatePostRequest, deletePostRequest } from '~/store/slices/posts';

const usePostsStore = () => {
  const dispatch = useDispatch();

  const postsState = useSelector((state) => state.posts);

  const dispatchGetPosts = useCallback(
    (payload) => {
      dispatch(getPostsRequest(payload));

      return true;
    },
    [dispatch]
  );
  const dispatchGetPost = useCallback(
    (payload) => {
      dispatch(getPostRequest(payload));

      return true;
    },
    [dispatch]
  );

  const dispatchAddPost = useCallback(
    (payload) => {
      dispatch(addPostRequest(payload));

      return true;
    },
    [dispatch]
  );

  const dispatchUpdatePost = useCallback(
    (payload) => {
      dispatch(updatePostRequest(payload));

      return true;
    },
    [dispatch]
  );

  const dispatchDeletePost = useCallback(
    (payload) => {
      dispatch(deletePostRequest(payload));

      return true;
    },
    [dispatch]
  );

  return {
    dispatchGetPosts,
    dispatchGetPost,
    dispatchAddPost,
    dispatchUpdatePost,
    dispatchDeletePost,
    postsState
  };
};

export { usePostsStore };
