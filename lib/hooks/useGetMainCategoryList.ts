import { useQuery } from '@tanstack/react-query';
import { getMainCategoryList } from 'core/apis/output';

export const useGetMainCategoryList = () => {
  const { data, error } = useQuery(['main-category'], () => getMainCategoryList(), {
    retry: 3,
  });

  return {
    categoryList: data?.data,
    isError: error,
  };
};
