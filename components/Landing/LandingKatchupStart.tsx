import styled from '@emotion/styled';
import { useRouter } from 'next/router';

const LandingKatchupStart = () => {
  const router = useRouter();
  return (
    <LandingKatchupStartWrapper>
      <LandingKatchupStartTitle>차곡차곡 인수인계 준비,</LandingKatchupStartTitle>
      <LandingKatchupStartSubTitle>Katchup에서 시작하세요</LandingKatchupStartSubTitle>
      <LandingKatchupStartButton onClick={() => router.push('/input/main')}>Katchup 시작하기</LandingKatchupStartButton>
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

const LandingKatchupStartButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 52.6rem;
  padding: 2.117rem 0;
  margin-top: 4.9rem;

  border: none;
  border-radius: 1.4114rem;
  background-color: ${({ theme }) => theme.colors.katchup_white};
  box-shadow: 0px 2.822887897491455px 4.2343316078186035px 0px rgba(0, 0, 0, 0.17),
    0px 0px 4.2343316078186035px 0px rgba(0, 0, 0, 0.08);
  color: ${({ theme }) => theme.colors.katchup_black};
  font-family: Pretendard;
  font-size: 2.5rem;
  font-style: normal;
  font-weight: 500;
  line-height: normal;

  &:hover {
    background-color: ${({ theme }) => theme.colors.katchup_main};
    color: ${({ theme }) => theme.colors.katchup_white};
  }

  transition: all 0.2s ease-in-out;

  cursor: pointer;
`;
