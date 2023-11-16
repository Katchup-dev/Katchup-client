import { useQuery } from '@tanstack/react-query';
import { getMainCategoryList } from 'core/apis/output';

export const useGetMainCategoryList = (memberId: number) => {
  const { data, error } = useQuery(['main-category'], () => getMainCategoryList(memberId), {
    retry: 3,
  });

  return {
    mainCategoryList: data?.data,
    isError: error,
  };
};
