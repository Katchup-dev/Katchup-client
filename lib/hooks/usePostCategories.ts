import { postCategories } from 'core/apis/input';

import { useMutation } from '@tanstack/react-query';

import { postCategoryInfo } from '../../types/input';

export const usePostCategory = () => {
  const { mutate, isLoading, isError } = useMutation(postCategories);

  return {
    createCategory: mutate,
    isLoading: isLoading,
    error: error,
  };
};
