import { useQuery } from '@tanstack/react-query';
import { getWorkCard } from 'core/apis/output';

const useGetWorkCard = (folderId: number) => {
  const { data, error } = useQuery(['work-card', folderId], () => getWorkCard(folderId), {
    retry: 3,
  });

  console.log(data);

  return {
    workCardList: data?.data,
    isError: error,
  };
};

export default useGetWorkCard;
