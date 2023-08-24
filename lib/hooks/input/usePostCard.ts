import { postCard } from 'core/apis/input';

import { useMutation } from '@tanstack/react-query';

export const usePostCard = () => {
  const { mutate, isLoading, isError } = useMutation(postCard);

  return {
    createCard: mutate,
    isLoading: isLoading,
    error: isError,
  };
};
