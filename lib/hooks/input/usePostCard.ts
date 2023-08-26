import { postCard } from 'core/apis/input';

import { useMutation } from '@tanstack/react-query';

export const usePostCard = () => {
  const { mutateAsync, isLoading, isError } = useMutation(postCard);

  return {
    createCard: mutateAsync,
    isLoading: isLoading,
    error: isError,
  };
};
