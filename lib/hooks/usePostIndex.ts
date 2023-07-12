import { postCategories, postFolders, postTasks } from 'core/apis/input';

import { useMutation } from '@tanstack/react-query';

export const usePostCategory = () => {
  const { mutate, isLoading, isError } = useMutation(postCategories);

  return {
    createCategory: mutate,
    isLoading: isLoading,
    error: isError,
  };
};

export const usePostFolder = () => {
  const { mutate, isLoading, isError } = useMutation(postFolders);

  return {
    createFolder: mutate,
    isLoading: isLoading,
    error: isError,
  };
};

export const usePostTask = () => {
  const { mutate, isLoading, isError } = useMutation(postTasks);

  return {
    createTask: mutate,
    isLoading: isLoading,
    error: isError,
  };
};
