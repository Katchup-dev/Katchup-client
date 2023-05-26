import { useQuery } from '@tanstack/react-query';
import { getMainCategoryList } from 'core/apis';

export const useGetMainCategoryList = () => {
  const { data, error } = useQuery(['main-category'], () => getMainCategoryList(), {
    retry: 3,
  });

  console.log(data);

  return {
    categoryList: data?.data,
    isError: error,
  };
};
