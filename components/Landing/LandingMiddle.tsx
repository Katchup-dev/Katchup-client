import { css } from '@emotion/react';
import styled from '@emotion/styled';

const LandingMiddle = () => {
  return (
    <>
      <StLandingMiddleWrapper>
        <StLandingMiddleTopText>인수인계,</StLandingMiddleTopText>
        <StLandingMiddleTopDesc>어떻게 하고 계신가요?</StLandingMiddleTopDesc>
        <StLandingMiddleWhiteWrapper type="rightTop">
          <StLandingWhiteBox>
            <LandingWhiteBoxText>
              <LandingWhiteBoxTextBold>히스토리 관리가 안 되어 힘든적</LandingWhiteBoxTextBold>이 있었죠.
            </LandingWhiteBoxText>
            <LandingWhiteBoxText>
              제가 하고 있는 일도 많다보니 <LandingWhiteBoxTextBold>제대로 정리하기</LandingWhiteBoxTextBold>
            </LandingWhiteBoxText>
            <LandingWhiteBoxText>
              <LandingWhiteBoxTextBold>힘들다</LandingWhiteBoxTextBold>고 느낄 때가 있고요.
            </LandingWhiteBoxText>
            <StLandingMiddleAuthorWrapper>
              <StLandingMiddleAuthor>스타트업 개발자 | A씨</StLandingMiddleAuthor>
            </StLandingMiddleAuthorWrapper>
          </StLandingWhiteBox>
        </StLandingMiddleWhiteWrapper>
        <StLandingMiddleWhiteWrapper type="leftTop">
          <StLandingWhiteBox>
            <LandingWhiteBoxText>
              인수인계가 <LandingWhiteBoxTextBold>조직마다 방식이 너무 달라요.</LandingWhiteBoxTextBold>
            </LandingWhiteBoxText>
            <LandingWhiteBoxText>
              체계적으로 정리하고 있다는 <LandingWhiteBoxTextBold>확신도 없고요.</LandingWhiteBoxTextBold>
            </LandingWhiteBoxText>
            <LandingWhiteBoxText>
              <LandingWhiteBoxTextBold>카테고리화해서 넘겨줄 수 있는 서비스</LandingWhiteBoxTextBold>가 있으면 좋겠어요.
            </LandingWhiteBoxText>
            <StLandingMiddleAuthorWrapper>
              <StLandingMiddleAuthor>마케팅 인턴 | J씨</StLandingMiddleAuthor>
            </StLandingMiddleAuthorWrapper>
          </StLandingWhiteBox>
        </StLandingMiddleWhiteWrapper>
        <StLandingMiddleWhiteWrapper type="rightBottom">
          <StLandingWhiteBox>
            <LandingWhiteBoxText>
              <LandingWhiteBoxTextBold>생생한 경험</LandingWhiteBoxTextBold>을 담아 전달하고 싶은데,
            </LandingWhiteBoxText>
            <LandingWhiteBoxText>다 지나고 인수인계를 준비하면 그렇지 못해 아쉬워요.</LandingWhiteBoxText>
            <LandingWhiteBoxText>
              그때마다 <LandingWhiteBoxTextBold>사고과정과 경험을 메모</LandingWhiteBoxTextBold>해두면 좋을 것 같아요.
            </LandingWhiteBoxText>
            <StLandingMiddleAuthorWrapper>
              <StLandingMiddleAuthor>방송국학회 부장 | H씨</StLandingMiddleAuthor>
            </StLandingMiddleAuthorWrapper>
          </StLandingWhiteBox>
        </StLandingMiddleWhiteWrapper>
        <StLandingMiddleWhiteWrapper type="leftBottom">
          <StLandingWhiteBox>
            <LandingWhiteBoxText>
              처음에는 <LandingWhiteBoxTextBold>인수인계를 소홀</LandingWhiteBoxTextBold>하게 했어요
            </LandingWhiteBoxText>
            <LandingWhiteBoxText>그런데 퇴사하고나서 전화가 많이 오더라고요</LandingWhiteBoxText>
            <LandingWhiteBoxText>
              이후에는 <LandingWhiteBoxTextBold>인수인계를 제대로 해야겠다고 느끼고 꼼꼼히</LandingWhiteBoxTextBold>하게
              되었습니다.
            </LandingWhiteBoxText>
            <StLandingMiddleAuthorWrapper>
              <StLandingMiddleAuthor>스타트업 기획자 | K씨</StLandingMiddleAuthor>
            </StLandingMiddleAuthorWrapper>
          </StLandingWhiteBox>
        </StLandingMiddleWhiteWrapper>
      </StLandingMiddleWrapper>
    </>
  );
};

export default LandingMiddle;

const StLandingMiddleWrapper = styled.div`
  position: relative;

  width: 100%;
  height: 143rem;

  padding: 13rem 0 14.1rem 20rem;

  background-color: ${({ theme }) => theme.colors.katchup_bg_gray};
`;

const StLandingMiddleTopText = styled.h1`
  color: ${({ theme }) => theme.colors.katchup_main};
  font-family: Pretendard;
  font-size: 4.5rem;
  font-style: normal;
  font-weight: 800;
  line-height: 7rem;
`;

const StLandingMiddleTopDesc = styled(StLandingMiddleTopText)`
  color: ${({ theme }) => theme.colors.katchup_dark_gray};
  font-weight: 400;
`;

const StLandingMiddleWhiteWrapper = styled.div<{ type: string }>`
  position: absolute;

  ${({ type }) =>
    type === 'rightTop' &&
    css`
      top: 23.2rem;
      right: 23.7rem;
    `}
  ${({ type }) =>
    type === 'leftTop' &&
    css`
      top: 38.4rem;
    `}
    ${({ type }) =>
    type === 'rightBottom' &&
    css`
      top: 70.4rem;
      right: 45.865rem;
    `}
    ${({ type }) =>
    type === 'leftBottom' &&
    css`
      bottom: 14.1rem;
    `}
`;
const StLandingWhiteBox = styled.div`
  padding: 5.5rem 7rem 0 5.5rem;

  border-radius: 4rem;
  background-color: ${({ theme }) => theme.colors.katchup_white};
`;

const LandingWhiteBoxText = styled.p`
  color: ${({ theme }) => theme.colors.katchup_black};
  font-family: Pretendard;
  font-size: 2.5rem;
  font-style: normal;
  font-weight: 400;
  line-height: 3.5rem;
`;

const LandingWhiteBoxTextBold = styled.span`
  color: ${({ theme }) => theme.colors.katchup_black};
  font-family: Pretendard;
  font-size: 2.5rem;
  font-style: normal;
  font-weight: 800;
  line-height: 3.5rem;
`;

const StLandingMiddleAuthorWrapper = styled.div`
  width: 100%;
  padding-top: 3rem;
  padding-bottom: 3.2rem;

  text-align: right;
`;

const StLandingMiddleAuthor = styled.span`
  color: ${({ theme }) => theme.colors.katchup_dark_gray};
  font-family: Pretendard;
  font-size: 2.5622rem;
  font-style: normal;
  font-weight: 500;
  line-height: 4.2703rem;
`;
