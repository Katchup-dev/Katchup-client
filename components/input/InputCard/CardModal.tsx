import { ColorKey, KEYWORDS_COLOR } from 'constants/keywords';
import { getDetailPage } from 'core/apis/output';
import {
  categorySelectState,
  keywordListState,
  keywordSelectState,
  subTaskSelectState,
  taskSelectState,
} from 'core/atom';
import { usePostCard } from 'lib/hooks/input/usePostCard';
import { IcBtnDeletePopup } from 'public/assets/icons';
import React, { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { InputKeywordInfo, PostCardInfo } from 'types/input';

import { css } from '@emotion/react';
import styled from '@emotion/styled';

import { DropdownCategory, DropdownKeyword, DropdownSubTask, DropdownTask } from '../Dropdown';

interface ModalProps {
  isShowing: boolean;
  handleHide: React.MouseEventHandler;
}

interface KeywordProps {
  name: string;
  background: string;
  color: string;
}
const CardModal = (props: ModalProps) => {
  const { isShowing, handleHide } = props;
  const [category, setCategory] = useState('');
  const [task, setTask] = useState('');
  const [subTask, setSubTask] = useState('');
  const [keyword, setKeyword] = useState('');
  const [etc, setEtc] = useState('');

  const [categoryCount, setCategoryCount] = useState(0);
  const [taskCount, setTaskCount] = useState(0);
  const [subTaskCount, setSubTaskCount] = useState(0);
  const [etcCount, setEtcCount] = useState(0);

  const [isCategoryFocused, setIsCategoryFocused] = useState(false);
  const [isTaskFocused, setIsTaskFocused] = useState(false);
  const [isSubTaskFocused, setIsSubTaskFocused] = useState(false);
  const [isKeywordFocused, setIsKeywordFocused] = useState(false);
  const [isEtcFocused, setIsEtcdFocused] = useState(false);

  const selectedCategory = useRecoilValue(categorySelectState);
  const selectedTask = useRecoilValue(taskSelectState);
  const selectedSubTask = useRecoilValue(subTaskSelectState);
  const [selectedKeywords, setSelectedKeywords] = useRecoilState<InputKeywordInfo[]>(keywordSelectState);
  const selectedKeywordsArray = selectedKeywords as InputKeywordInfo[];

  const keywordList = useRecoilValue(keywordListState);
  const [keywordColor, setKeywordColor] = useState({
    name: '',
    background: '',
    color: '',
  });

  const { createCard } = usePostCard();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    switch (name) {
      case 'category':
        setCategory(value);
        setCategoryCount(value.length);
        break;
      case 'task':
        setTask(value);
        setTaskCount(value.length);
        break;
      case 'subTask':
        setSubTask(value);
        break;
      case 'keyword':
        setKeyword(value);
        break;
      case 'etc':
        setEtc(value);
        setEtcCount(value.length);
        break;
      default:
        break;
    }
  };

  const handleNext = (e: React.MouseEvent<HTMLButtonElement>) => {
    // const cardData: PostCardInfo = {
    //   categoryId: selectedCategory.categoryId,
    //   taskId: selectedTask.taskId,
    //   subTaskId: selectedSubTask.subTaskId,
    //   keywordIdList:
    // };
    // createCard(cardData);
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
    setCategory(selectedCategory.name);
    setTask(selectedTask.name);
    setSubTask(selectedSubTask.name);
  }, [selectedCategory, selectedTask, selectedSubTask]);

  useEffect(() => {
    setCategoryCount(category.length);
    setTaskCount(task.length);
    setSubTaskCount(subTask.length);
  }, [category, task, subTask]);

  return (
    <>
      {isShowing && (
        <StModalWrapper>
          <StCardModal>
            <IcBtnDeletePopup onClick={handleHide} />
            <h2>업무 카드 작성</h2>
            <StInputIndex isFocused={isCategoryFocused}>
              카테고리
              <input
                type="text"
                name="category"
                value={category}
                onChange={handleInputChange}
                onFocus={() => setIsCategoryFocused(true)}
                onBlur={() => setIsCategoryFocused(false)}
                placeholder="카테고리를 입력해 주세요."
                maxLength={20}
                autoComplete="off"
              />
              {isCategoryFocused && <DropdownCategory inputValue={category} />}
              <p>
                <span>{categoryCount}</span>/20
              </p>
            </StInputIndex>
            <StInputIndex isFocused={isTaskFocused}>
              업무
              <input
                type="text"
                name="task"
                value={task}
                onChange={handleInputChange}
                onFocus={() => setIsTaskFocused(true)}
                onBlur={() => setIsTaskFocused(false)}
                placeholder="업무를 입력해 주세요."
                maxLength={20}
                disabled={!category.length}
                autoComplete="off"
              />
              {isTaskFocused && <DropdownTask inputValue={task} setIsTaskFocused={setIsSubTaskFocused} />}
              <p>
                <span>{taskCount}</span>/20
              </p>
            </StInputIndex>
            <StInputIndex isFocused={isSubTaskFocused}>
              세부 업무
              <input
                type="text"
                name="subTask"
                value={subTask}
                onChange={handleInputChange}
                onFocus={() => setIsSubTaskFocused(true)}
                onBlur={() => setIsSubTaskFocused(false)}
                placeholder="세부 업무를 입력해 주세요."
                maxLength={20}
                autoComplete="off"
              />
              {isSubTaskFocused && <DropdownSubTask inputValue={subTask} />}
              <p>
                <span>{subTaskCount}</span>/20
              </p>
            </StInputIndex>
            <StInputIndex isFocused={isKeywordFocused}>
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
                    autoComplete="off"></input>
                </StSelectedKeywords>
                {isKeywordFocused && (
                  <>
                    <DropdownKeyword inputValue={keyword} keywordColor={keywordColor} />
                  </>
                )}
              </StInputKeyword>
            </StInputIndex>
            <StInputEtc isFocused={isEtcFocused}>
              비고
              <textarea
                value={etc}
                name="etc"
                onChange={handleInputChange}
                placeholder="업무에 관한 꿀팁이나 특이사항을 자유롭게 작성해 주세요."
                maxLength={200}
              />
              <p>
                <span>{etcCount}</span>/200
              </p>
            </StInputEtc>
            <StNextBtn type="button" disabled={!category.length || !task.length} onClick={handleNext}>
              작성 완료
            </StNextBtn>
          </StCardModal>
        </StModalWrapper>
      )}
    </>
  );
};

export default CardModal;

const StModalWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  position: fixed;
  top: 0;
  left: 0;
  z-index: 1;

  width: 100%;
  height: 100%;

  background-color: rgba(47, 52, 56, 0.4);
`;

const StCardModal = styled.section`
  display: flex;
  flex-direction: column;
  position: relative;

  width: 63.8rem;
  height: 83.8rem;
  padding: 4rem 6rem 4rem 6rem;

  border-radius: 2.6rem;
  background-color: ${({ theme }) => theme.colors.katchup_white};

  & > h2 {
    margin-bottom: 5.1rem;

    ${({ theme }) => theme.fonts.h1_smalltitle};

    text-align: center;
  }

  & > svg {
    position: absolute;
    top: 3.8rem;
    right: 4rem;

    cursor: pointer;
  }
`;

const StInputIndex = styled.label<{ isFocused: boolean }>`
  display: flex;
  flex-direction: column;
  position: relative;

  ${({ theme }) => theme.fonts.p1_text};

  & > input {
    margin-top: 0.4rem;
    margin-bottom: 2.2rem;

    padding: 1.4rem 11.1rem 1.2rem 1.4rem;
    border: 0.1rem solid ${({ theme }) => theme.colors.katchup_line_gray};
    border-radius: 0.8rem;
    ${({ theme }) => theme.fonts.h2_smalltitle};

    ${({ isFocused, theme }) =>
      isFocused
        ? css`
            background-color: ${theme.colors.katchup_light_gray};
            box-shadow: 0 0.2rem 0.4rem rgba(0, 0, 0, 0.23);
          `
        : css`
            background-color: ${theme.colors.katchup_white};
          `}

    ::placeholder {
      color: ${({ theme }) => theme.colors.katchup_gray};
    }
    outline: none;
  }

  & > p {
    position: absolute;
    top: 4rem;
    right: 1.4rem;

    ${({ theme }) => theme.fonts.p1_text};
    color: ${({ theme }) => theme.colors.katchup_dark_gray};

    & > span {
      ${({ theme }) => theme.fonts.p1_text};
      color: ${({ theme }) => theme.colors.katchup_main};
    }
  }
`;

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

const StInputEtc = styled(StInputIndex)`
  & > textarea {
    height: 19.1rem;
    padding: 1.4rem 1.4rem 4rem 1.4rem;

    border: 0.1rem solid ${({ theme }) => theme.colors.katchup_line_gray};
    border-radius: 0.8rem;
    ${({ theme }) => theme.fonts.h2_smalltitle};

    outline: none;
    resize: none;

    ::placeholder {
      color: ${({ theme }) => theme.colors.katchup_gray};
    }
  }

  & > p {
    position: absolute;
    top: 18.5rem;
  }
`;

const StNextBtn = styled.button<{ disabled: boolean }>`
  width: 13.6rem;
  height: 4rem;
  margin-top: 1.8rem;
  margin-left: 39.8rem;

  border: 0.1rem solid ${({ theme }) => theme.colors.katchup_line_gray};
  border-radius: 0.8rem;
  color: ${({ theme }) => theme.colors.katchup_white};
  background-color: ${({ theme, disabled }) => (disabled ? theme.colors.katchup_gray : theme.colors.katchup_main)};
`;
