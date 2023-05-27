import { postCategories } from 'core/apis/input';

import { useMutation, useQueryClient } from '@tanstack/react-query';

export const usePostCategory = () => {
  const queryClient = useQueryClient();

  const createCategory = async (name: string) => {
    try {
      const data = await postCategories(name);
      queryClient.invalidateQueries(['categorires']);
      return data.data;
    } catch (error) {
      console.error(error);
    }
  };

  const mutation = useMutation(createCategory);

  return {
    createCategory: mutation.mutate,
    isLoading: mutation.isLoading,
    error: mutation.error,
  };
};
