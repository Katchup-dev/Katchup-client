import { getCategories, getFolders, getTasks } from 'core/apis/input';
import { categorySelectState, folderSelectState, taskSelectState } from 'core/atom';
import { IcBtnDeletePopup } from 'public/assets/icons';
import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';

import styled from '@emotion/styled';

import DropdownCategory from './DropdownCategory';
import DropdownFolder from './DropdownFolder';
import DropdownTask from './DropdownTask';

interface ModalProps {
  isShowing: boolean;
  handleHide: React.MouseEventHandler;
}

const ModalIndex = (props: ModalProps) => {
  const { isShowing, handleHide } = props;
  const [category, setCategory] = useState('');
  const [folder, setFolder] = useState('');
  const [task, setTask] = useState('');
  const [keyword, setKeyword] = useState('');
  const [etc, setEtc] = useState('');

  const [categoryCount, setCategoryCount] = useState(0);
  const [folderCount, setFolderCount] = useState(0);
  const [taskCount, setTaskCount] = useState(0);
  const [etcCount, setEtcCount] = useState(0);

  const [isCategoryFocused, setIsCategoryFocused] = useState(false);
  const [isFolderFocused, setIsFolderFocused] = useState(false);
  const [isTaskFocused, setIsTaskFocused] = useState(false);
  const [isKeywordFocused, setIsKeywordFocused] = useState(false);
  const [isEtcFocused, setIsEtcdFocused] = useState(false);

  const [categoryOptions, setCategoryOptions] = useState([]);
  const [selectedCategory, setSelectedCategory] = useRecoilState(categorySelectState);
  const [folderOptions, setFolderOptions] = useState([]);
  const [selectedFolder, setSelectedFolder] = useRecoilState(folderSelectState);
  const [taskOptions, setTaskOptions] = useState([]);
  const [selectedTask, setSelectedTask] = useRecoilState(taskSelectState);

  const handleCategoryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCategory(e.target.value);
    setCategoryCount(e.target.value.length);
  };
  const handleFolderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFolder(e.target.value);
    setFolderCount(e.target.value.length);
  };
  const handleTaskChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTask(e.target.value);
    setTaskCount(e.target.value.length);
  };
  const handleKeywordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  };
  const handleEtcChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEtc(e.target.value);
    setEtcCount(e.target.value.length);
  };

  const handleNext = (e: React.MouseEvent<HTMLButtonElement>) => {};

  useEffect(() => {
    if (isCategoryFocused) {
      getCategories().then((response) => {
        setCategoryOptions(response);
      });
    }
    if (isFolderFocused) {
      getFolders().then((response) => {
        setFolderOptions(response);
      });
    }
    if (isTaskFocused) {
      getTasks().then((response) => {
        setTaskOptions(response);
      });
    }
  }, [isCategoryFocused, isFolderFocused, isTaskFocused]);

  useEffect(() => {
    setCategory(selectedCategory.name);
  }, [selectedCategory]);

  useEffect(() => {
    setFolder(selectedFolder.name);
  }, [selectedFolder]);

  useEffect(() => {
    setTask(selectedTask.name);
  }, [selectedTask]);

  return (
    <>
      {isShowing && (
        <StModalWrapper>
          <StModalIndex>
            <IcBtnDeletePopup onClick={handleHide} />
            <h2>업무 카드 만들기</h2>
            <StInputIndex isFocused={isCategoryFocused}>
              업무 대분류
              <input
                type="text"
                value={category}
                onChange={handleCategoryChange}
                onFocus={() => setIsCategoryFocused(true)}
                onBlur={() => setIsCategoryFocused(false)}
                placeholder="업무 대분류를 입력해주세요"
                maxLength={20}
              />
              {isCategoryFocused && <DropdownCategory options={categoryOptions} />}
              <p>
                <span>{categoryCount}</span>/20
              </p>
            </StInputIndex>
            <StInputIndex isFocused={isFolderFocused}>
              업무 중분류
              <input
                type="text"
                value={folder}
                onChange={handleFolderChange}
                onFocus={() => setIsFolderFocused(true)}
                onBlur={() => setIsFolderFocused(false)}
                placeholder="업무 중분류를 입력해주세요"
                maxLength={20}
              />
              {isFolderFocused && <DropdownFolder options={folderOptions} />}
              <p>
                <span>{folderCount}</span>/20
              </p>
            </StInputIndex>
            <StInputIndex isFocused={isTaskFocused}>
              업무 소분류
              <input
                type="text"
                value={task}
                onChange={handleTaskChange}
                onFocus={() => setIsTaskFocused(true)}
                onBlur={() => setIsTaskFocused(false)}
                placeholder="업무 소분류를 입력해주세요"
                maxLength={20}
              />
              {isTaskFocused && <DropdownTask options={taskOptions} />}
              <p>
                <span>{taskCount}</span>/20
              </p>
            </StInputIndex>
            <StInputIndex isFocused={isKeywordFocused}>
              키워드
              <input
                type="text"
                value={keyword}
                onChange={handleKeywordChange}
                onFocus={() => setIsKeywordFocused(true)}
                onBlur={() => setIsKeywordFocused(false)}
                placeholder="키워드를 입력해주세요"
              />
            </StInputIndex>
            <StInputEtc isFocused={isEtcFocused}>
              비고
              <textarea
                value={etc}
                onChange={handleEtcChange}
                placeholder="업무에 관한 꿀팁이나 특이사항을 자유롭게 입력해 주세요"
                maxLength={200}
              />
              <p>
                <span>{etcCount}</span>/200
              </p>
            </StInputEtc>
            <StNextBtn type="button" disabled={!category.length || !folder.length} onClick={handleNext}>
              다음 단계
            </StNextBtn>
          </StModalIndex>
        </StModalWrapper>
      )}
    </>
  );
};

export default ModalIndex;

const StModalWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  position: fixed;
  top: 0;
  left: 0;

  width: 100%;
  height: 100%;

  background-color: rgba(47, 52, 56, 0.4);
`;

const StModalIndex = styled.section`
  display: flex;
  flex-direction: column;
  position: relative;

  width: 63.8rem;
  height: 83.8rem;
  padding: 4rem 6rem 4rem 4.4rem;

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
        ? `
      background-color: ${theme.colors.katchup_light_gray};
  `
        : `
      background-color: ${theme.colors.katchup_white};
      
    `}

    ::placeholder {
      color: ${({ theme }) => theme.colors.katchup_gray};
    }
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
function useGetCategories(): { data: any; isLoading: any } {
  throw new Error('Function not implemented.');
}
