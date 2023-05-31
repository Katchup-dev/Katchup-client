import { getCategories } from 'core/apis/input';
import { InputCategoryInfo, KatchupResponse } from 'types/input';

import { useQuery } from '@tanstack/react-query';

export const useGetCategories = () => {
  const { data, isLoading, error } = useQuery<KatchupResponse<InputCategoryInfo[]>>(['categories'], getCategories);

  return {
    categories: data?.data,
    isLoading: isLoading,
    isError: error,
  };
};
