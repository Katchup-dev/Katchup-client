import { ModalOneButton } from 'components/common/Modal';
import { MODAL_FILE_SIZE } from 'constants/modal';
import { categorySelectState, subTaskSelectState, taskSelectState } from 'core/atom';
import useModal from 'lib/hooks/useModal';
import { IcBtnDeleteFile, IcFileCheckbox, IcFileCheckboxAfter, IcKatchupLogo } from 'public/assets/icons';
import { useEffect, useRef, useState } from 'react';
import { useRecoilValue } from 'recoil';

import styled from '@emotion/styled';

const FileInput = () => {
  const [fileInput, setFileInput] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isChecked, setIsChecked] = useState(true);
  const sizeLimit = 10 * 1024 * 1024;

  const fileSizeModal = useModal();

  const selectedCatecory = useRecoilValue(categorySelectState);
  const selectedTask = useRecoilValue(subTaskSelectState);
  const selectedSubTask = useRecoilValue(taskSelectState);

  const handleFileModification = (file: File) => {
    // FIX : '업무 카드 생성' 시 파일명 변경되게 변경해야함
    let modifiedName = file.name;

    if (isChecked) {
      const originalName = file.name.substring(0, file.name.lastIndexOf('.'));
      const extension = file.name.substring(file.name.lastIndexOf('.'));
      modifiedName = `${selectedCatecory.name}_${selectedTask.name}_${selectedSubTask.name}_${originalName}${extension}`;
      console.log(modifiedName);
    }

    if (file.size > sizeLimit) {
      fileSizeModal.toggle();
    } else {
      // const modifiedFile = new File([file], modifiedName);
      setFileInput((prev) => [...prev, file]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      handleFileModification(file);
    }
  };

  const handleFileDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      const file = files[0];
      handleFileModification(file);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleFileBtnClick = () => {
    fileInputRef.current?.click();
  };

  const handleDeleteFile = (file: File) => {
    setFileInput((prev) => prev.filter((selectedFile) => selectedFile !== file));
  };

  const handleCheckboxChange = () => {
    setIsChecked((prev) => !prev);
  };

  return (
    <>
      <StFileWrapper>
        <StFileSelect>
          <StFileBtnWrapper>
            <h2>
              <IcKatchupLogo /> 파일 첨부
            </h2>
            <input ref={fileInputRef} type="file" onChange={handleFileSelect} />
            <button onClick={handleFileBtnClick}>파일선택</button>
          </StFileBtnWrapper>
          <label>
            <input type="checkbox" checked={isChecked} onChange={handleCheckboxChange} />
            {isChecked ? <IcFileCheckboxAfter /> : <IcFileCheckbox />}
            파일명 자동 변경
          </label>
        </StFileSelect>
        <StFileInput onDrop={handleFileDrop} onDragOver={handleDragOver}>
          {fileInput.length ? (
            fileInput.map((file, index) => (
              <p key={index}>
                <button onClick={() => handleDeleteFile(file)}>
                  <IcBtnDeleteFile />
                </button>
                {file.name}
                <span>{`${(file.size / (1024 * 1024)).toFixed(2)}MB`}</span>
              </p>
            ))
          ) : (
            <StEmpty>
              <p>파일을 선택하거나 드래그하세요</p>
              <p>파일당 최대 크기: 10MB</p>
            </StEmpty>
          )}
        </StFileInput>
      </StFileWrapper>
      <ModalOneButton
        isShowing={fileSizeModal.isShowing}
        contents={MODAL_FILE_SIZE}
        buttonName={'확인'}
        handleButton={fileSizeModal.toggle}
      />
    </>
  );
};

export default FileInput;

const StFileWrapper = styled.div`
  padding: 0rem 7.4rem;
`;

const StEmpty = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  height: 100%;

  color: ${({ theme }) => theme.colors.katchup_gray};

  & > p {
    ${({ theme }) => theme.fonts.p1_text};
  }

  & > p:last-child {
    ${({ theme }) => theme.fonts.p3_text};
  }
`;

const StFileSelect = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  margin-bottom: 1.4rem;

  input {
    display: none;
  }

  & > label {
    display: flex;
    align-items: center;

    color: ${({ theme }) => theme.colors.katchup_black};
    ${({ theme }) => theme.fonts.p3_text};
  }
`;

const StFileBtnWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  & > h2 {
    display: flex;
    align-items: center;
    gap: 0.8rem;

    margin-right: 1.4rem;

    ${({ theme }) => theme.fonts.h1_title};
  }
  & > button {
    padding: 0.5rem 1.5rem;

    border: 0.1rem solid ${({ theme }) => theme.colors.katchup_line_gray};
    border-radius: 0.8rem;
    background-color: ${({ theme }) => theme.colors.katchup_white};
    ${({ theme }) => theme.fonts.p3_text};
  }
`;

const StFileInput = styled.div`
  position: relative;
  overflow-y: scroll;

  width: 100%;
  height: 11.4rem;
  padding: 1.2rem 2.2rem;

  border: 0.1rem solid ${({ theme }) => theme.colors.katchup_line_gray};
  border-radius: 0.8rem;

  & > p {
    display: flex;
    align-items: center;
    gap: 1.6rem;

    ${({ theme }) => theme.fonts.p1_text};
  }

  & > p > button {
    padding: 0;

    border: none;
    background: transparent;
  }

  & > p > span {
    color: ${({ theme }) => theme.colors.katchup_dark_gray};
    ${({ theme }) => theme.fonts.caption};
  }

  ::-webkit-scrollbar {
    width: 0.5rem;
  }

  ::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) => theme.colors.katchup_gray};
    border-radius: 3rem;
  }
`;

const StToastWrapper = styled.div`
  display: flex;
  justify-content: center;

  width: 100%;
`;
