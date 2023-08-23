import { getWorkCard } from 'core/apis/output';

import { useQuery } from '@tanstack/react-query';

const useGetWorkCard = (taskId: number) => {
  const { data, error } = useQuery(['work-card', taskId], () => getWorkCard(taskId), {
    retry: 3,
  });

  return {
    workCardList: data?.data,
    isError: error,
  };
};

export default useGetWorkCard;
