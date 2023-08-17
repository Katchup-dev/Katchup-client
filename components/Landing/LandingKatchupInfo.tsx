import styled from '@emotion/styled';
import { IcFolder, IcMemo, IcPencil } from 'public/assets/icons';

const LandingKatchupInfo = () => {
  return (
    <StLandingKatchupInfoWrapper>
      <StLandingKatchupInfoTitleBox>
        <StLandingKatcupInfoTitle>
          <StLandingKatcupInfoSubTitle>
            쉬운 인수인계<StLandingKatcupInfoTitle>는</StLandingKatcupInfoTitle>
          </StLandingKatcupInfoSubTitle>
        </StLandingKatcupInfoTitle>
        <StLandingKatcupInfoTitle>Katchup에서</StLandingKatcupInfoTitle>
      </StLandingKatchupInfoTitleBox>
      <StLandingKatchupInfoRight>
        <StLandingKatcupInfoRightItem>
          <IcMemo />
          <StLandingKatcupInfoRightItemBox>
            <StLandingKatcupInfoRightItemText>언제든 메모처럼 쉽게</StLandingKatcupInfoRightItemText>
            <div>
              <StLandingKatcupInfoRightItemDesc>그때그때 katchup을 열어</StLandingKatcupInfoRightItemDesc>
              <StLandingKatcupInfoRightItemDesc>메모하듯 쉽고 빠르게 작성하세요.</StLandingKatcupInfoRightItemDesc>
            </div>
          </StLandingKatcupInfoRightItemBox>
        </StLandingKatcupInfoRightItem>
        <StLandingKatcupInfoRightItem>
          <IcPencil />
          <StLandingKatcupInfoRightItemBox>
            <StLandingKatcupInfoRightItemText>생생한 업무 경험 기록</StLandingKatcupInfoRightItemText>
            <div>
              <StLandingKatcupInfoRightItemDesc>
                오래된 내용을 애써 기억하지 않아도 돼요.
              </StLandingKatcupInfoRightItemDesc>
              <StLandingKatcupInfoRightItemDesc>
                기억이 선명할 때 업무 내용을 바로 기록해요
              </StLandingKatcupInfoRightItemDesc>
            </div>
          </StLandingKatcupInfoRightItemBox>
        </StLandingKatcupInfoRightItem>
        <StLandingKatcupInfoRightItem>
          <IcFolder />
          <StLandingKatcupInfoRightItemBox>
            <StLandingKatcupInfoRightItemText>자동분류하여 가독성있게</StLandingKatcupInfoRightItemText>
            <div>
              <StLandingKatcupInfoRightItemDesc>
                작성한 내용을 katchup이 분류해드릴게요.
              </StLandingKatcupInfoRightItemDesc>
              <StLandingKatcupInfoRightItemDesc>내용을 쉽게 찾고 공유해보세요.</StLandingKatcupInfoRightItemDesc>
            </div>
          </StLandingKatcupInfoRightItemBox>
        </StLandingKatcupInfoRightItem>
      </StLandingKatchupInfoRight>
    </StLandingKatchupInfoWrapper>
  );
};

export default LandingKatchupInfo;

const StLandingKatchupInfoWrapper = styled.div`
  display: flex;
  justify-content: space-between;

  width: 100%;
  padding: 15.3rem 32.5rem 23.3rem 20rem;

  background-color: ${({ theme }) => theme.colors.katchup_white};
`;

const StLandingKatchupInfoTitleBox = styled.div`
  display: flex;
  flex-direction: column;
`;

const StLandingKatcupInfoTitle = styled.span`
  color: ${({ theme }) => theme.colors.katchup_dark_gray};
  font-family: Pretendard;
  font-size: 4.5rem;
  font-style: normal;
  font-weight: 400;
  line-height: 7rem;
`;
const StLandingKatcupInfoSubTitle = styled(StLandingKatcupInfoTitle)`
  color: ${({ theme }) => theme.colors.katchup_main};
  font-weight: 800;
`;

const StLandingKatchupInfoRight = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12.5rem;
`;

const StLandingKatcupInfoRightItem = styled.div`
  display: flex;
  align-items: center;
  gap: 5.6rem;
`;

const StLandingKatcupInfoRightItemBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  gap: 1rem;
`;
const StLandingKatcupInfoRightItemText = styled.p`
  color: ${({ theme }) => theme.colors.katchup_black};
  font-family: Pretendard;
  font-size: 2.5rem;
  font-style: normal;
  font-weight: 700;
  line-height: 7.92rem;
`;

const StLandingKatcupInfoRightItemDesc = styled.p`
  color: ${({ theme }) => theme.colors.katchup_dark_gray};
  font-family: Pretendard;
  font-size: 2.2rem;
  font-style: normal;
  font-weight: 500;
  line-height: 3.5rem;
`;
