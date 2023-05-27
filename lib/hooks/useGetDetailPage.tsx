import { useQuery } from '@tanstack/react-query';
import { getDetailPage } from 'core/apis/output';

export const useGetDetailPage = (detailId: number) => {
  const { data, error } = useQuery(['detail-page'], () => getDetailPage(detailId), {
    retry: 3,
    enabled: !Number.isNaN(detailId),
  });

  return {
    detailPageInfo: data?.data,
    isError: error,
  };
};
