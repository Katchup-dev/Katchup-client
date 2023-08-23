import { useMutation } from '@tanstack/react-query';

import { postKeywords } from '../../../core/apis/input';

export const usePostKeyword = () => {
  const { mutate, isLoading, isError } = useMutation(postKeywords);

  return {
    createKeyword: mutate,
    isLoading: isLoading,
    error: isError,
  };
};
