import { useQuery } from '@tanstack/react-query';
import { getMainCategoryList } from 'core/apis/output';
import { mainCategoryInfo } from 'types/output';

export const useGetMainCategoryList = (memberId: number, isSharePage?: boolean) => {
  const { data, error } = useQuery(['main-category'], () => getMainCategoryList(memberId), {
    retry: 3,
  });

  return {
    mainCategoryList: isSharePage
      ? data?.data.map((categoryInfo: mainCategoryInfo) => categoryInfo.isShared)
      : data?.data,
    isError: error,
  };
};
