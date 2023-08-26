import { useQuery } from '@tanstack/react-query';
import { getMiddleCategoryList } from 'core/apis/output';

export const useGetMiddleCategoryList = (categoryId: number) => {
  const { data, error } = useQuery(['middle-category', categoryId], () => getMiddleCategoryList(categoryId));

  return {
    middleCategoryList: data?.data,
    isError: error,
  };
};
