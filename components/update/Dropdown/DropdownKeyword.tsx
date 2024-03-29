import { KEYWORDS_COLOR } from 'constants/keywords';
import { keywordListState, keywordSelectState, taskSelectState } from 'core/atom';
import { useGetKeywords, usePostKeyword } from 'lib/hooks/input/useKeyword';
import { IcBtnAddIndex } from 'public/assets/icons';
import { useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { InputKeywordInfo, PostKeywordInfo } from 'types/input';

import styled from '@emotion/styled';

interface KeywordProps {
  name: string;
  background: string;
  color: string;
}

interface DropdownKeywordProps {
  inputValue: string;
  keywordColor: KeywordProps;
}

const DropdownKeyword = ({ inputValue, keywordColor }: DropdownKeywordProps) => {
  const taskSelect = useRecoilValue(taskSelectState);
  const { keywords } = useGetKeywords(taskSelect.taskId);
  const { createKeyword } = usePostKeyword();
  const [keywordSelect, setKeywordSelect] = useRecoilState<InputKeywordInfo[]>(keywordSelectState);
  const [keywordList, setKeywordList] = useRecoilState<number[]>(keywordListState);
  let addArr: InputKeywordInfo[] = [];
  let isAdd = true;

  const handleOptionClick = (option: InputKeywordInfo) => {
    if (keywordSelect.some((selected) => selected.keywordId === option.keywordId)) {
      return;
    } else {
      setKeywordSelect((prevSelected) => [...prevSelected, option]);
      setKeywordList((prevKeywordList) => [...prevKeywordList, option.keywordId]);
    }
  };

  const handleAddIndex = async () => {
    const keywordData = { taskId: taskSelect.taskId, name: inputValue, color: keywordColor.name };
    const location = await createKeyword(keywordData);
    if (location) {
      setKeywordList((prevKeywordList) => [...prevKeywordList, parseInt(location)]);
      setKeywordSelect((prevSelected) => [
        ...prevSelected,
        {
          keywordId: parseInt(location),
          name: inputValue,
          color: keywordColor.name,
        },
      ]);
    }
  };

  const displayNewOptions = () => {
    if (inputValue?.length > 0 && keywords) {
      if (!keywords.find((option) => option.name === inputValue)) {
        addArr = [...addArr, { keywordId: keywords.length, name: inputValue, color: keywordColor.name }];
      } else {
        isAdd = false;
      }
    }
    return addArr.map((option, idx) => (
      <li key={idx}>
        <StDropdownKeyworkText keywordColor={keywordColor}>{option.name}</StDropdownKeyworkText>
        <IcBtnAddIndex
          onMouseDown={() => {
            handleAddIndex();
          }}
        />
      </li>
    ));
  };

  return (
    <StDropdown>
      {displayNewOptions()}
      {keywords?.map((option, idx) => (
        <StDropdownKeyworkText
          keywordColor={KEYWORDS_COLOR[option.color as keyof typeof KEYWORDS_COLOR]}
          key={idx}
          onMouseDown={() => handleOptionClick(option)}>
          {option.name}
        </StDropdownKeyworkText>
      ))}
    </StDropdown>
  );
};

export default DropdownKeyword;

const StDropdown = styled.ul`
  position: absolute;
  z-index: 1;

  width: 100%;
  height: max-content;
  max-height: 20rem;
  overflow-y: auto;
  box-sizing: border-box;

  padding: 1.2rem 1.4rem;
  margin-left: -1.4rem;
  margin-top: 1rem;

  border: 0.1rem solid #e2e2e2;
  border-radius: 0 0 0.8rem 0.8rem;
  box-shadow: 0 0.2rem 0.4rem rgba(0, 0, 0, 0.23);
  background-color: ${({ theme }) => theme.colors.katchup_white};

  & > li {
    display: flex;
    justify-content: space-between;

    ${({ theme }) => theme.fonts.h2_smalltitle};

    cursor: pointer;

    & > svg {
      display: block;

      margin-bottom: -1rem;

      cursor: pointer;
    }
  }
`;

const StDropdownKeyworkText = styled.div<{ keywordColor: KeywordProps }>`
  width: fit-content;
  padding: 0.5rem 1rem;
  margin-bottom: 0.8rem;

  border-radius: 0.8rem;
  background-color: ${({ keywordColor }) => keywordColor.background};
  color: ${({ keywordColor }) => keywordColor.color};

  font-family: Pretendard;
  font-size: 1.3rem;
  font-style: normal;
  font-weight: 600;
  line-height: normal;

  cursor: pointer;
`;
