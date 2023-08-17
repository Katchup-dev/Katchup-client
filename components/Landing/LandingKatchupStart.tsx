import styled from '@emotion/styled';

const LandingKatchupStart = () => {
  return (
    <LandingKatchupStartWrapper>
      <LandingKatchupStartTitle>차곡차곡 인수인계 준비,</LandingKatchupStartTitle>
      <LandingKatchupStartSubTitle>Katchup에서 시작하세요</LandingKatchupStartSubTitle>
    </LandingKatchupStartWrapper>
  );
};

export default LandingKatchupStart;

const LandingKatchupStartWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 65.4rem;

  background: linear-gradient(
    180deg,
    rgba(255, 70, 70, 0) 0%,
    rgba(255, 70, 70, 0.2) 23.96%,
    rgba(255, 70, 70, 0.49) 52.08%,
    #ff4646 100%
  );
`;

const LandingKatchupStartTitle = styled.span`
  color: ${({ theme }) => theme.colors.katchup_white};
  font-family: Pretendard;
  font-size: 4rem;
  font-style: normal;
  font-weight: 400;
  line-height: 6rem; /* 150% */
  letter-spacing: 0.04rem;
`;
const LandingKatchupStartSubTitle = styled(LandingKatchupStartTitle)`
  font-weight: 800;
`;
