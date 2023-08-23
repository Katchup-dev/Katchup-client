import { InputKeywordInfo, KatchupResponse } from 'types/input';

import { useMutation, useQuery } from '@tanstack/react-query';

import { getKeywords, postKeywords } from '../../../core/apis/input';

export const useGetKeywords = (taskId: number) => {
  const { data, isLoading, error } = useQuery<KatchupResponse<InputKeywordInfo[]>>(['keywords', taskId], () =>
    getKeywords(taskId),
  );

  return {
    keywords: data?.data,
    isCategoriesLoading: isLoading,
    isCategoriesError: error,
  };
};

export const usePostKeyword = () => {
  const { mutate, isLoading, isError } = useMutation(postKeywords);

  return {
    createKeyword: mutate,
    isLoading: isLoading,
    error: isError,
  };
};
