import styled from '@emotion/styled';
import { IcFileIcon, IcMoreDetail, IcScreenshotTag } from '../../public/assets/icons';
import { keywordColors } from '../../constants/output';
import { KeywordInfo } from 'types/output';

export interface WorkCardProps {
  cardId: number;
  keywordList: KeywordInfo[];
  cardName: string;
  content: string;
  existFile: boolean;
}

const WorkCard = (props: WorkCardProps) => {
  const { cardId, keywordList, cardName, content, existFile } = props;
  return (
    <StWorkCardWrapper>
      <StCardNumber>{cardId}</StCardNumber>

      <StSmallCategory>
        <IcScreenshotTag />
        <p>{cardName}</p>
      </StSmallCategory>

      <StKeywordWrapper>
        {keywordList?.map((keyword: KeywordInfo, idx: number) => (
          <StKeyword idx={idx} key={idx}>
            {keyword.name}
          </StKeyword>
        ))}
      </StKeywordWrapper>

      <StContent>{content}</StContent>

      <StFileBtn isFileExists={existFile}>
        <IcFileIcon />
      </StFileBtn>

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

  border: 1px solid ${({ theme }) => theme.colors.katchup_line_gray};

  > svg {
    cursor: pointer;
  }

  > svg:nth-of-type(1) {
    margin-right: 10.4rem;
  }
`;

const StCardNumber = styled.p`
  margin-left: 3.824%;
  margin-right: 5.772%;
  ${({ theme }) => theme.fonts.h2_smalltitle_eng};
`;

const StSmallCategory = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  margin-right: 7.44%;

  > p {
    display: flex;
    justify-content: center;

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
  margin-right: 7.44%;

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
  margin-right: 5%;

  width: 33.171%;

  ${({ theme }) => theme.fonts.p1_text};
  line-height: 2.8rem;

  color: ${({ theme }) => theme.colors.katchup_dark_gray};
`;

const StFileBtn = styled.button<{ isFileExists: boolean }>`
  margin-right: 6%;
  border: none;

  background-color: transparent;

  > svg {
    ${({ isFileExists }) =>
      isFileExists &&
      `filter: invert(46%) sepia(13%) saturate(3880%) hue-rotate(318deg) brightness(92%) contrast(117%);`}
  }
`;

const StMoreDetailBtn = styled.button`
  border: none;
  background-color: transparent;
`;

export default WorkCard;
