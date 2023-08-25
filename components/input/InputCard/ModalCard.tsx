import {
  categorySelectState,
  etcState,
  fileSelectState,
  keywordListState,
  subTaskSelectState,
  taskSelectState,
  workInputState,
} from 'core/atom';
import { usePostCard } from 'lib/hooks/input/usePostCard';
import { IcBtnDeletePopup } from 'public/assets/icons';
import React from 'react';
import { useRecoilValue } from 'recoil';
import { PostCardInfo, PostFileListInfo, PostScreenshotListInfo, PostStickerListInfo } from 'types/input';

import { css } from '@emotion/react';
import styled from '@emotion/styled';

import { InputCategory, InputEtc, InputKeyWord, InputSubTask, InputTask } from './ModalInput.tsx';

interface ModalProps {
  isShowing: boolean;
  handleHide: React.MouseEventHandler;
}

const ModalCard = (props: ModalProps) => {
  const { isShowing, handleHide } = props;

  const currentWorkInput = useRecoilValue(workInputState);
  const selectedCategory = useRecoilValue(categorySelectState);
  const selectedTask = useRecoilValue(taskSelectState);
  const selectedSubTask = useRecoilValue(subTaskSelectState);
  const selectedKeywordList = useRecoilValue(keywordListState);
  const selectedFileList = useRecoilValue(fileSelectState);
  const currentEtc = useRecoilValue(etcState);

  // 임시 스크린샷, 스티커
  const currentStickerList: PostStickerListInfo[] = [
    {
      order: '',
      x: '',
      y: '',
    },
  ];
  const currentScreenshotList: PostScreenshotListInfo[] = [
    {
      screenshotUUID: '',
      screenshotUrl: '',
      stickerList: currentStickerList,
    },
  ];

  const { createCard } = usePostCard();

  const handleNext = (e: React.MouseEvent<HTMLButtonElement>) => {
    const cardData: PostCardInfo = {
      categoryId: selectedCategory.categoryId,
      taskId: selectedTask.taskId,
      subTaskId: selectedSubTask.subTaskId,
      keywordIdList: selectedKeywordList,
      screenshotList: currentScreenshotList,
      fiseList: selectedFileList,
      note: currentEtc,
      content: currentWorkInput,
    };

    console.log(cardData);
    createCard(cardData);
  };

  return (
    <>
      {isShowing && (
        <StModalWrapper>
          <StCardModal>
            <IcBtnDeletePopup onClick={handleHide} />
            <h2>업무 카드 작성</h2>
            <InputCategory />
            <InputTask />
            <InputSubTask />
            <InputKeyWord />
            <InputEtc />
            <StNextBtn type="button" disabled={!selectedCategory || !selectedTask} onClick={handleNext}>
              작성 완료
            </StNextBtn>
          </StCardModal>
        </StModalWrapper>
      )}
    </>
  );
};

export default ModalCard;

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
  height: fit-content;
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
const StNextBtn = styled.button<{ disabled: boolean }>`
  width: 13.6rem;
  height: 4rem;
  margin-top: 1.8rem;
  margin-left: 39.8rem;

  border: 0.1rem solid ${({ theme }) => theme.colors.katchup_line_gray};
  border-radius: 0.8rem;
  color: ${({ theme }) => theme.colors.katchup_white};
  background-color: ${({ theme, disabled }) => (disabled ? theme.colors.katchup_gray : theme.colors.katchup_main)};
  ${({ theme }) => theme.fonts.h3_title};
`;
