import { useQuery } from '@tanstack/react-query';
import { getMiddleCategoryList } from 'core/apis';

export const useGetMainCategoryList = (categoryId: number) => {
  const { data, error } = useQuery(['main-category'], () => getMiddleCategoryList(categoryId));

  return {
    categoryList: data?.data,
    isError: error,
  };
};
