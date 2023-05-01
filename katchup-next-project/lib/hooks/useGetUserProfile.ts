import { getUsername } from 'core/apis';

import { useQuery } from '@tanstack/react-query';

export const useGetUserProfile = (username: string) => {
  const { data, error } = useQuery(['user-profile'], () => getUsername(username));

  return {
    userName: data?.name,
    isError: error,
  };
};
