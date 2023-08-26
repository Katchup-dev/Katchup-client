import { IcConfetti1, IcConfetti2 } from 'public/assets/icons';

import styled from '@emotion/styled';

const LandingTop = () => {
  return (
    <StLandingTopWrapper>
      <StLandingTitle>
        <StLandingTitleBold>Katchup</StLandingTitleBold>으로 <StLandingTitleBold>catchup</StLandingTitleBold>을 쉽게!
      </StLandingTitle>
      <StLandingDesc>습관처럼 쌓여가는 인수인계 준비</StLandingDesc>
      <IcConfetti1 className="left-confetti" />
      <IcConfetti2 className="right-confetti" />
    </StLandingTopWrapper>
  );
};

export default LandingTop;

const StLandingTopWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 100%;
  padding: 19.5rem 0 17.5rem 0;

  background-color: ${({ theme }) => theme.colors.katchup_white};

  .left-confetti {
    position: absolute;
    top: 22.3rem;
    left: 0;
  }
  .right-confetti {
    position: absolute;
    top: 0;
    right: 0;
  }
`;

const StLandingTitle = styled.span`
  font-family: Pretendard;
  font-size: 5.6rem;
  font-style: normal;
  font-weight: 400;
  line-height: 7rem;
  color: ${({ theme }) => theme.colors.katchup_main};
`;

const StLandingTitleBold = styled(StLandingTitle)`
  font-weight: 700;
`;

const StLandingDesc = styled.span`
  font-family: Pretendard;
  font-size: 3rem;
  font-style: normal;
  font-weight: 400;
  line-height: 6.336rem;
  color: ${({ theme }) => theme.colors.katchup_dark_gray};
`;
