import {
  categorySelectState,
  etcState,
  fileNameChangeState,
  fileSelectState,
  keywordListState,
  screenshotSelectState,
  subTaskSelectState,
  taskSelectState,
  workInputState,
} from 'core/atom';
import { usePostCard } from 'lib/hooks/input/usePostCard';
import { IcBtnDeletePopup } from 'public/assets/icons';
import React, { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { PostCardInfo, PostFileListInfo } from 'types/input';

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
  const selectedScreenshotList = useRecoilValue(screenshotSelectState);
  const currentEtc = useRecoilValue(etcState);
  const isFileNameChangeChecked = useRecoilValue(fileNameChangeState);

  const { createCard } = usePostCard();

  const modifiedFileList: PostFileListInfo[] = selectedFileList.map((fileInfo) => {
    const modifiedFileName = `${selectedCategory.name}_${selectedTask.name}_${selectedSubTask.name}_${fileInfo.fileOriginalName}`;
    return {
      ...fileInfo,
      fileChangedName: modifiedFileName,
    };
  });

  const handleNext = async (e: React.MouseEvent<HTMLButtonElement>) => {
    const postFileList = isFileNameChangeChecked ? modifiedFileList : selectedFileList;

    const cardData: PostCardInfo = {
      categoryId: selectedCategory.categoryId,
      taskId: selectedTask.taskId,
      subTaskId: selectedSubTask.subTaskId,
      keywordIdList: selectedKeywordList,
      screenshotList: selectedScreenshotList,
      fileList: postFileList,
      note: currentEtc,
      content: currentWorkInput,
    };

    const result = await createCard(cardData);

    if (result.status === 'SSS') {
      localStorage.setItem('toastMessage', '업무 카드가 추가되었어요.');
      window.location.reload();
    }
  };

  return (
    <>
      {isShowing && (
        <>
          <StModalWrapper>
            <StCardModal>
              <IcBtnDeletePopup onClick={handleHide} />
              <h2>업무 카드 작성</h2>
              <InputCategory />
              <InputTask />
              <InputSubTask />
              <InputKeyWord />
              <InputEtc />
              <StNextBtn
                type="button"
                disabled={selectedCategory.categoryId === 0 || selectedTask.taskId === 0}
                onClick={handleNext}>
                작성 완료
              </StNextBtn>
            </StCardModal>
          </StModalWrapper>
        </>
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
