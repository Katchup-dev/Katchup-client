import { getProfile } from 'core/apis/auth';
import { UserProfileInfo } from 'types/auth';
import { KatchupResponse } from 'types/input';

import { useQuery } from '@tanstack/react-query';

export const useGetProfile = () => {
  const { data, isLoading, error } = useQuery<KatchupResponse<UserProfileInfo>>(['profile'], getProfile);

  return {
    email: data?.data.email,
    imageUrl: data?.data.imageUrl,
    nickname: data?.data.nickname,
    isProfileLoading: isLoading,
    isProfileError: error,
  };
};
