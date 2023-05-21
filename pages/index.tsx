import UserProfile from 'components/UserProfile';
import { userInfoState } from 'core/atom';

import styled from '@emotion/styled';
import { useRecoilState } from 'recoil';
import OutputMain from './outputMain';

export default function Home() {
  const [nameInfo, setNameInfo] = useRecoilState(userInfoState);

  return (
    <>
      <OutputMain />
      {nameInfo.name}
    </>
  );
}

const StMain = styled.main`
  font-size: 100px;
  font-weight: 700;

  color: red;
`;
