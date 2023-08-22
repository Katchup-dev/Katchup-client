import styled from '@emotion/styled';
import LandingFooter from 'components/Landing/LandingFooter';
import LandingKatchupInfo from 'components/Landing/LandingKatchupInfo';
import LandingKatchupProcess from 'components/Landing/LandingKatchupProcess';
import LandingKatchupStart from 'components/Landing/LandingKatchupStart';
import LandingMiddle from 'components/Landing/LandingMiddle';
import LandingTop from 'components/Landing/LandingTop';

export default function Home() {
  return (
    <StLandingWrapper>
      <LandingTop />
      <LandingMiddle />
      <LandingKatchupInfo />
      <LandingKatchupProcess />
      <LandingKatchupStart />
      <LandingFooter />
    </StLandingWrapper>
  );
}

const StLandingWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 100%;
`;
