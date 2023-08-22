import { css } from '@emotion/react';
import styled from '@emotion/styled';

const LandingKatchupProcess = () => {
  return (
    <StLandingKatchupProcessWrapper>
      <StLandingKatchupProcessTitle>
        간편하고 효율적인 <StLandingKatchupProcessSubTitle>인수인계 맞춤 기능</StLandingKatchupProcessSubTitle>
      </StLandingKatchupProcessTitle>
      <StLandingKatchupProcessBottom>
        <StLandingKatchupProcessBottomItem>
          <StLandingKatchupProcessBottomItemTitle>01</StLandingKatchupProcessBottomItemTitle>
          <StLandingKatchupProcessBottomItemBox>
            <StLandingKatchupProcessBottomItemSubTitle>업무 세분화</StLandingKatchupProcessBottomItemSubTitle>
            <div>
              <StLandingKatchupProcessBottomItemSubDesc>
                세 단계로 업무를 나누어
              </StLandingKatchupProcessBottomItemSubDesc>
              <StLandingKatchupProcessBottomItemSubDesc>체계적으로 정리해요.</StLandingKatchupProcessBottomItemSubDesc>
            </div>
          </StLandingKatchupProcessBottomItemBox>
        </StLandingKatchupProcessBottomItem>
        <StLandingKatchupProcessBottomItem>
          <StLandingKatchupProcessBottomItemTitle>02</StLandingKatchupProcessBottomItemTitle>
          <StLandingKatchupProcessBottomItemBox>
            <StLandingKatchupProcessBottomItemSubTitle>간편한 작성</StLandingKatchupProcessBottomItemSubTitle>
            <div>
              <StLandingKatchupProcessBottomItemSubDesc>
                katchup의 템플릿에 따라
              </StLandingKatchupProcessBottomItemSubDesc>
              <StLandingKatchupProcessBottomItemSubDesc>
                업무 내용을 편하게 작성해요.
              </StLandingKatchupProcessBottomItemSubDesc>
            </div>
          </StLandingKatchupProcessBottomItemBox>
        </StLandingKatchupProcessBottomItem>
        <StLandingKatchupProcessBottomItem>
          <StLandingKatchupProcessBottomItemTitle>03</StLandingKatchupProcessBottomItemTitle>
          <StLandingKatchupProcessBottomItemBox>
            <StLandingKatchupProcessBottomItemSubTitle>자동 분류</StLandingKatchupProcessBottomItemSubTitle>
            <div>
              <StLandingKatchupProcessBottomItemSubDesc>편하게 작성만 하세요.</StLandingKatchupProcessBottomItemSubDesc>
              <StLandingKatchupProcessBottomItemSubDesc>
                정리는 katchup이 할게요.
              </StLandingKatchupProcessBottomItemSubDesc>
            </div>
          </StLandingKatchupProcessBottomItemBox>
        </StLandingKatchupProcessBottomItem>
        <StLandingKatchupProcessBottomItem last>
          <StLandingKatchupProcessBottomItemTitle>04</StLandingKatchupProcessBottomItemTitle>
          <StLandingKatchupProcessBottomItemBox>
            <StLandingKatchupProcessBottomItemSubTitle>인수인계 맞춤 템플릿</StLandingKatchupProcessBottomItemSubTitle>
            <div>
              <StLandingKatchupProcessBottomItemSubDesc>
                쉽지만 체계적인 템플릿에
              </StLandingKatchupProcessBottomItemSubDesc>
              <StLandingKatchupProcessBottomItemSubDesc>
                파일이나 이미지 설명을 더해
              </StLandingKatchupProcessBottomItemSubDesc>
              <StLandingKatchupProcessBottomItemSubDesc>
                인수인계 완성도를 높여요.
              </StLandingKatchupProcessBottomItemSubDesc>
            </div>
          </StLandingKatchupProcessBottomItemBox>
        </StLandingKatchupProcessBottomItem>
      </StLandingKatchupProcessBottom>
    </StLandingKatchupProcessWrapper>
  );
};

export default LandingKatchupProcess;

const StLandingKatchupProcessWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 100%;
  padding: 0 20rem 12.9rem 20rem;

  background-color: ${({ theme }) => theme.colors.katchup_white};
`;

const StLandingKatchupProcessTitle = styled.span`
  margin-bottom: 11.8rem;

  color: ${({ theme }) => theme.colors.katchup_dark_gray};
  font-family: Pretendard;
  font-size: 4.5rem;
  font-style: normal;
  font-weight: 400;
  line-height: 7.92rem;
`;

const StLandingKatchupProcessSubTitle = styled(StLandingKatchupProcessTitle)`
  color: ${({ theme }) => theme.colors.katchup_main};
  font-weight: 800;
`;

const StLandingKatchupProcessBottom = styled.div`
  display: flex;

  width: 100%;
`;

const StLandingKatchupProcessBottomItem = styled.div<{ last?: boolean }>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 2.5rem;

  width: 25%;
  padding-left: 9.5rem;

  border-right: 0.1rem dashed ${({ theme }) => theme.colors.katchup_dark_gray};
  ${({ last }) =>
    last &&
    css`
      border: none;
    `}
`;

const StLandingKatchupProcessBottomItemTitle = styled.div`
  height: 7rem;

  color: ${({ theme }) => theme.colors.katchup_main};
  font-family: Montserrat;
  font-size: 3rem;
  font-style: normal;
  font-weight: 700;
  line-height: 7.92rem;

  border-bottom: 0.4rem solid ${({ theme }) => theme.colors.katchup_main};
`;

const StLandingKatchupProcessBottomItemBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 1rem;
`;

const StLandingKatchupProcessBottomItemSubTitle = styled.span`
  color: ${({ theme }) => theme.colors.katchup_black};
  font-family: Pretendard;
  font-size: 2.5rem;
  font-style: normal;
  font-weight: 700;
  line-height: 7.92rem;
`;
const StLandingKatchupProcessBottomItemSubDesc = styled.p`
  color: ${({ theme }) => theme.colors.katchup_dark_gray};
  font-family: Pretendard;
  font-size: 2.2rem;
  font-style: normal;
  font-weight: 500;
  line-height: 3.5rem;
`;
