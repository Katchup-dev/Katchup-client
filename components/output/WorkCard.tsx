import styled from '@emotion/styled';
import { IcFileIcon, IcMoreDetail, IcScreenshotTag } from '../../public/assets/icons';
import { keywordColors } from '../../constants/output';

const WorkCard = () => {
  const keywordList = ['가나다라마바사아자차', 'NOTION', '아야어여', '케첩파이팅케첩이최고'];
  return (
    <StWorkCardWrapper>
      <StCardNumber>1</StCardNumber>

      <StSmallCategory>
        <IcScreenshotTag />
        <p>가나다라마바사아자차 가나다라마바사아자차</p>
      </StSmallCategory>

      <StKeywordWrapper>
        {keywordList.map((keyword, idx) => (
          <StKeyword idx={idx} key={idx}>
            {keyword}
          </StKeyword>
        ))}
      </StKeywordWrapper>

      <StContent>
        ABCDE업무를 할 땐 이케이케 하면 된다 뭐 여러기지 가능성을 열어두겠지만 아시다시피 지금 이렇게쓰는말은 졸린와중에
        쓰는 말이라 상당히 아무말이나 하는 것이란 말이지 내가 지금 무슨말을 하는지도 모르겠고 경우의수가 왤케 많냐 이거
        참 기능이 구현 가능한지도 생각해야하고 구현이 불가능하다면 어떤 식으로 대응해야할지도 미리 생각하면 좋으
        ABCDE업무를 ABCDE업무!
      </StContent>

      <IcFileIcon />

      <StMoreDetailBtn>
        <IcMoreDetail />
      </StMoreDetailBtn>
    </StWorkCardWrapper>
  );
};

const StWorkCardWrapper = styled.section`
  display: flex;
  align-items: center;

  width: 100%;
  height: auto;

  border: 0.1rem solid ${({ theme }) => theme.colors.katchup_line_gray};

  > svg {
    cursor: pointer;
  }

  > svg:nth-of-type(1) {
    margin-right: 10.4rem;
  }
`;

const StCardNumber = styled.p`
  margin-left: 5.5rem;
  margin-right: 8.3rem;
  ${({ theme }) => theme.fonts.h2_smalltitle_eng};
`;

const StSmallCategory = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  margin-right: 10.7rem;

  > p {
    margin-top: 1rem;

    width: 15.6rem;

    ${({ theme }) => theme.fonts.h2_smalltitle};

    word-break: break-all;
  }
`;

const StKeywordWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.4rem;
  margin-right: 10.7rem;

  width: 15rem;
`;

const StKeyword = styled.p<{ idx: number }>`
  padding: 0.5rem 1rem 0.5rem 1rem;

  font-family: 600;
  font-size: 1.3rem;
  line-height: 1.551rem;

  ${({ idx }) => `background-color: ${keywordColors[idx]}33;
  color :${keywordColors[idx]};`};

  border-radius: 0.8rem;
`;

const StContent = styled.div`
  padding-top: 2.4rem;
  padding-bottom: 2.4rem;
  margin-right: 8.4rem;

  width: 47.7rem;

  ${({ theme }) => theme.fonts.p1_text};
  line-height: 2.8rem;

  color: ${({ theme }) => theme.colors.katchup_dark_gray};
`;

const StMoreDetailBtn = styled.button`
  border: none;
  background-color: transparent;
`;

export default WorkCard;
