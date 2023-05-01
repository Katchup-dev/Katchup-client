import { userInfoState } from 'core/atom';
import { useGetUserProfile } from 'lib/hooks/useGetUserProfile';

import { useRecoilState } from 'recoil';

interface profileProps {
  username: string;
}

function UserProfile(props: profileProps) {
  const { username } = props;
  const { userName } = useGetUserProfile(username);

  return <h1>{userName}</h1>;
}

export default UserProfile;
