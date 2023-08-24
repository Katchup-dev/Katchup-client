import { postCategories, postSubTasks, postTasks } from 'core/apis/input';

import { useMutation } from '@tanstack/react-query';

export const usePostCategory = () => {
  const { mutateAsync, isLoading, isError } = useMutation(postCategories);

  return {
    createCategory: mutateAsync,
    isLoading: isLoading,
    error: isError,
  };
};

export const usePostTask = () => {
  const { mutateAsync, isLoading, isError } = useMutation(postTasks);

  return {
    createTask: mutateAsync,
    isLoading: isLoading,
    error: isError,
  };
};

export const usePostSubTask = () => {
  const { mutateAsync, isLoading, isError } = useMutation(postSubTasks);

  return {
    createSubTask: mutateAsync,
    isLoading: isLoading,
    error: isError,
  };
};
