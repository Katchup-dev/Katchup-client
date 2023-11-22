import { deleteWorkCard } from 'core/atom';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { KeywordInfo } from 'types/output';

import styled from '@emotion/styled';

import { keywordColors } from '../../constants/output';
import {
  IcDeleteWorkCardChosen,
  IcDeleteWorkCardUnchosen,
  IcFileIcon,
  IcMoreDetail,
  IcScreenshotTag,
} from '../../public/assets/icons';

export interface WorkCardProps {
  mainId: string;
  cardId: number;
  keywordList: KeywordInfo[];
  cardName: string;
  content: string;
  existFile: boolean;
  isDeleteWorkCard: boolean;
  existScreenshot: boolean;
}

const WorkCard = (props: WorkCardProps, { mainId }: { mainId: string }) => {
  const { cardId, keywordList, cardName, content, existFile, isDeleteWorkCard, existScreenshot } = props;
  const [isWorkCardChosen, setIsWorkCardChosen] = useState(false);
  const [deleteWorkCardIdxArr, setDeleteWorkCardIdxArr] = useRecoilState(deleteWorkCard);

  useEffect(() => {
    if (!isDeleteWorkCard) setIsWorkCardChosen(false);
  }, [isDeleteWorkCard]);

  useEffect(() => {
    isWorkCardChosen
      ? setDeleteWorkCardIdxArr((prev) => [...prev, cardId])
      : setDeleteWorkCardIdxArr((prev) => prev.filter((item) => item !== cardId));
  }, [isWorkCardChosen]);

  return (
    <StWorkCardWrapper>
      <StCardNumber>
        {isDeleteWorkCard ? (
          <button
            onClick={() => {
              setIsWorkCardChosen(!isWorkCardChosen);
            }}>
            {isWorkCardChosen ? <IcDeleteWorkCardChosen /> : <IcDeleteWorkCardUnchosen />}
          </button>
        ) : (
          cardId
        )}
      </StCardNumber>

      <StSmallCategory>
        {existScreenshot && <IcScreenshotTag />}
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

      <Link
        href={{
          pathname: `/share/${mainId}/middleCategory/detail/${cardId}`,
        }}>
        <StMoreDetailBtn>
          <IcMoreDetail />
        </StMoreDetailBtn>
      </Link>
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
  width: 3.4rem;
  margin-left: 3rem;
  margin-right: 11.5rem;
  ${({ theme }) => theme.fonts.h2_smalltitle_eng};

  > button {
    background: none;
    border: none;
  }
`;

const StSmallCategory = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 6.7rem;
  margin-right: 17rem;

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

  width: 16rem;
  margin-right: 10rem;

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

  width: 48rem;

  ${({ theme }) => theme.fonts.p1_text};
  line-height: 2.8rem;

  color: ${({ theme }) => theme.colors.katchup_dark_gray};
`;

const StFileBtn = styled.button<{ isFileExists: boolean }>`
  width: 2.6rem;
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
  width: 2.6rem;
  border: none;
  background-color: transparent;
`;

export default WorkCard;
