import { useRouter } from 'next/router';
import { IcGoogle } from 'public/assets/icons';

import styled from '@emotion/styled';
import { GoogleLogin } from '@react-oauth/google';

const LandingKatchupStart = () => {
  const router = useRouter();
  return (
    <LandingKatchupStartWrapper>
      <LandingKatchupStartTitle>차곡차곡 인수인계 준비,</LandingKatchupStartTitle>
      <LandingKatchupStartSubTitle>Katchup에서 시작하세요</LandingKatchupStartSubTitle>
      <GoogleLogin
        onSuccess={(credentialResponse) => {
          console.log(credentialResponse);
        }}
        onError={() => {
          console.log('Google Login Failed');
        }}
      />
      ;
      <LandingKatchupStartButton onClick={() => router.push('/input/main')}>
        <IcGoogle />
      </LandingKatchupStartButton>
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
  margin-top: 4.9rem;

  cursor: pointer;
`;
