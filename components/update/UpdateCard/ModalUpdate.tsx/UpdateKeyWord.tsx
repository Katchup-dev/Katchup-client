import { ColorKey, KEYWORDS_COLOR } from 'constants/keywords';
import { keywordSelectState, taskSelectState } from 'core/atom';
import React, { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { InputKeywordInfo } from 'types/input';

import { css } from '@emotion/react';
import styled from '@emotion/styled';

import { DropdownKeyword } from '../../Dropdown';
import { StInputIndex } from './UpdateCategory';
import { KeywordInfo } from 'types/output';

interface KeywordProps {
  name: string;
  background: string;
  color: string;
}

interface UpdateKeyWordProps {
  prevKeyword: InputKeywordInfo[];
}

const UpdateKeyWord = (props: UpdateKeyWordProps) => {
  const { prevKeyword } = props;
  const [keyword, setKeyword] = useState('');
  const [isKeywordFocused, setIsKeywordFocused] = useState(false);
  const [keywordColor, setKeywordColor] = useState<KeywordProps>({
    name: '',
    background: '',
    color: '',
  });
  const [selectedKeywords, setSelectedKeywords] = useRecoilState<InputKeywordInfo[]>(keywordSelectState);

  useEffect(() => {
    setSelectedKeywords([...prevKeyword]);
  }, []);

  const selectedKeywordsArray = selectedKeywords as InputKeywordInfo[];
  const selectedTask = useRecoilValue(taskSelectState);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  };

  const getColorByName = (name: ColorKey) => {
    const keywordColor = KEYWORDS_COLOR[name];
    return {
      color: keywordColor?.color,
      background: keywordColor?.background,
    };
  };

  const handleSettingColor = () => {
    const colorKeys: ColorKey[] = Object.keys(KEYWORDS_COLOR) as ColorKey[];
    const randomIndex = Math.floor(Math.random() * colorKeys.length);
    const randomColorKey = colorKeys[randomIndex];

    setKeywordColor({
      name: KEYWORDS_COLOR[randomColorKey].name,
      background: KEYWORDS_COLOR[randomColorKey].background,
      color: KEYWORDS_COLOR[randomColorKey].color,
    });
  };

  useEffect(() => {
    setKeyword('');
  }, [selectedKeywords]);

  return (
    <StInputKeyWordWrapper isFocused={isKeywordFocused}>
      키워드
      <StInputKeyword isFocused={isKeywordFocused}>
        <StSelectedKeywords>
          {selectedKeywordsArray.map((selectedKeyword, index) => (
            <StDropdownKeyworkText
              key={index}
              keywordColor={{
                name: selectedKeyword.color,
                background: getColorByName(selectedKeyword.color as ColorKey).background,
                color: getColorByName(selectedKeyword.color as ColorKey).color,
              }}>
              {selectedKeyword.name}
            </StDropdownKeyworkText>
          ))}
          <input
            type="text"
            name="keyword"
            value={keyword}
            onChange={handleInputChange}
            onClick={handleSettingColor}
            onFocus={() => setIsKeywordFocused(true)}
            onBlur={() => setIsKeywordFocused(false)}
            placeholder="업무 내용을 잘 나타내는 키워드를 입력해 주세요."
            disabled={selectedTask.taskId === 0 ? true : false}
            autoComplete="off"
          />
        </StSelectedKeywords>
        {isKeywordFocused && (
          <>
            <DropdownKeyword inputValue={keyword} keywordColor={keywordColor} />
          </>
        )}
      </StInputKeyword>
    </StInputKeyWordWrapper>
  );
};

export default UpdateKeyWord;

const StInputKeyWordWrapper = styled(StInputIndex)``;

const StSelectedKeywords = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;

  width: 100%;
`;

const StDropdownKeyworkText = styled.li<{ keywordColor: KeywordProps }>`
  width: fit-content;
  padding: 0.5rem 1rem;

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

const StInputKeyword = styled.div<{ isFocused: boolean }>`
  position: relative;
  margin-top: 0.4rem;
  margin-bottom: 2.2rem;

  width: 100%;
  padding: 1.2rem 1.4rem;

  border: 0.1rem solid ${({ theme }) => theme.colors.katchup_line_gray};
  border-radius: 0.8rem;

  ${({ isFocused, theme }) =>
    isFocused
      ? css`
          background-color: ${theme.colors.katchup_light_gray};
          box-shadow: 0 0.2rem 0.4rem rgba(0, 0, 0, 0.23);
        `
      : css`
          background-color: ${theme.colors.katchup_white};
        `}

  & > ul > input {
    width: 100%;

    margin-top: 0.6rem;

    border: none;
    ${({ theme }) => theme.fonts.h2_smalltitle};
    ${({ isFocused, theme }) =>
      isFocused
        ? css`
            background-color: ${theme.colors.katchup_light_gray};
          `
        : css`
            background-color: ${theme.colors.katchup_white};
          `}

    ::placeholder {
      color: ${({ theme }) => theme.colors.katchup_gray};
    }

    outline: none;
  }
`;
