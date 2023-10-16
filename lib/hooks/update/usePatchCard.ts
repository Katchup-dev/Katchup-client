import { patchCard, postCard } from 'core/apis/input';

import { useMutation } from '@tanstack/react-query';

export const usePatchCard = () => {
  const { mutateAsync, isLoading, isError } = useMutation(patchCard);

  return {
    patchCard: mutateAsync,
    isLoading: isLoading,
    error: isError,
  };
};
