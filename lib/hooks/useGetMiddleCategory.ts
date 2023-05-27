import { useQuery } from '@tanstack/react-query';
import { getMiddleCategoryList } from 'core/apis/output';
import { useEffect } from 'react';

export const useGetMiddleCategoryList = (categoryId: number) => {
  const { data, error } = useQuery(['middle-category', categoryId], () => getMiddleCategoryList(categoryId));

  return {
    categoryList: data?.data,
    isError: error,
  };
};
