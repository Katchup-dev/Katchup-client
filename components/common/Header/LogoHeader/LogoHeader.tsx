import { IcLogo } from 'public/assets/icons';

import styled from '@emotion/styled';

interface LogoHeaderProps {
  onClickLogo: () => void;
}

const LogoHeader = ({ onClickLogo }: LogoHeaderProps) => (
  <StHeaderWrapper>
    <IcLogo style={{ cursor: 'pointer' }} onClick={onClickLogo} />
  </StHeaderWrapper>
);

export default LogoHeader;

const StHeaderWrapper = styled.header`
  display: flex;
  align-items: center;

  width: 100%;
  height: 14.5rem;
  padding-left: 5.6rem;

  background-color: ${({ theme }) => theme.colors.katchup_bg_gray};
`;
