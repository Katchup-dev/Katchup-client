import UserProfile from 'components/UserProfile';
import { userInfoState } from 'core/atom';

import styled from '@emotion/styled';
import { useRecoilState } from 'recoil';

export default function Home() {
  const [nameInfo, setNameInfo] = useRecoilState(userInfoState);

  return (
    <>
      <StMain>안녕</StMain>
      <UserProfile username={'pinktopaz'}></UserProfile>
      {nameInfo.name}
    </>
  );
}

const StMain = styled.main`
  font-size: 100px;
  font-weight: 700;

  color: red;
`;
