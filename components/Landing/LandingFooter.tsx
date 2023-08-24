import { URL_ABOUT_US, URL_FEEDBACK, URL_INSTAGRAM, URL_PRIVACY_POLICY } from 'constants/footer';
import { IcInsta, IcLogo } from 'public/assets/icons';

import { css } from '@emotion/react';
import styled from '@emotion/styled';

const LandingFooter = () => {
  return (
    <LandingFooterWrapper>
      <LandingFooterBox>
        <IcLogo />
        <LandingFooterRightTop>
          <a href={URL_ABOUT_US} target="_blank" rel="noopener noreferrer">
            개인정보 보호 정책
          </a>
          <a href={URL_PRIVACY_POLICY} target="_blank" rel="noopener noreferrer">
            ABOUT US
          </a>
          <a href={URL_FEEDBACK} target="_blank" rel="noopener noreferrer">
            피드백
          </a>
        </LandingFooterRightTop>
      </LandingFooterBox>
      <LandingFooterBox bottom>
        <LandingFooterEmail>katchup.is.everywhere@gmail.com</LandingFooterEmail>
        <a href={URL_INSTAGRAM} target="_blank" rel="noopener noreferrer">
          <IcInsta />
        </a>
      </LandingFooterBox>
    </LandingFooterWrapper>
  );
};

export default LandingFooter;

const LandingFooterWrapper = styled.div`
  width: 100%;
  padding: 0 10.7rem;

  background-color: ${({ theme }) => theme.colors.katchup_white};
`;

const LandingFooterBox = styled.div<{ bottom?: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 100%;
  padding: 6.1rem 0 3.1rem 0;

  border-bottom: 0.1rem solid ${({ theme }) => theme.colors.katchup_line_gray};

  ${({ bottom }) =>
    bottom &&
    css`
      border: none;
      padding-top: 3.8rem;
    `}
`;

const LandingFooterRightTop = styled.div`
  display: flex;
  align-items: center;
  gap: 8.7rem;

  color: ${({ theme }) => theme.colors.katchup_dark_gray};
  text-align: center;
  font-family: Pretendard;
  font-size: 2.1rem;
  font-style: normal;
  font-weight: 600;
  line-height: normal;

  a {
    color: inherit;
    text-decoration: none;

    cursor: pointer;
  }
`;

const LandingFooterEmail = styled.span`
  color: ${({ theme }) => theme.colors.katchup_black};
  font-family: Pretendard;
  font-size: 1.8rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;
