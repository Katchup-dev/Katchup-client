import { KEYWORDS_COLOR } from 'constants/keywords';
import { taskSelectState } from 'core/atom';
import { useGetKeywords, usePostKeyword } from 'lib/hooks/input/useKeyword';
import { IcBtnAddIndex } from 'public/assets/icons';
import { useState } from 'react';
import { useRecoilValue } from 'recoil';
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
  const postKeyword = usePostKeyword();
  const [keywordSelect, setKeywordSelect] = useState<InputKeywordInfo[]>([]);
  let addArr: InputKeywordInfo[] = [];
  let isAdd = true;

  console.log(keywordSelect);

  const handleOptionClick = (option: InputKeywordInfo) => {
    if (keywordSelect.some((selected) => selected.keywordId === option.keywordId)) {
      setKeywordSelect((prevSelected) => prevSelected.filter((selected) => selected.keywordId !== option.keywordId));
    } else {
      setKeywordSelect((prevSelected) => [...prevSelected, option]);
    }
  };

  const handleAddIndex = () => {
    const keywordData = { taskId: taskSelect.taskId, name: inputValue, color: keywordColor.name };
    postKeyword.createKeyword(keywordData);
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
  top: 7.2rem;

  z-index: 1;

  width: 100%;
  height: max-content;
  max-height: 20rem;
  overflow-y: auto;

  overflow: scroll;
  padding: 1.2rem 1.4rem;

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
