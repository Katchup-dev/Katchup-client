import useModal from 'lib/hooks/useModal';
import {
  IcBtnDeleteFile,
  IcBtnScreenshot,
  IcBtnScreenshotHide,
  IcFileCheckbox,
  IcFileCheckboxAfter,
  IcKatchupLogo,
} from 'public/assets/icons';
import { useRef, useState } from 'react';

import styled from '@emotion/styled';

import CardModal from './CardModal';
import ScreenshotInput from './ScreenshotInput';

const MainInput = () => {
  const [workInput, setWorkInput] = useState('');
  const [letterCount, setLetterCount] = useState(0);
  const [isChecked, setIsChecked] = useState(false);
  const [fileInput, setFileInput] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { isShowing, toggle } = useModal();
  const [isScreenshotShowing, setIsScreenshotShowing] = useState(false);

  const handleScreenshotShowing = (e: React.MouseEvent<HTMLButtonElement>) => {
    setIsScreenshotShowing((prev) => !prev);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const inputText = e.target.value;
    const inputCount = inputText.length;

    setWorkInput(inputText);
    setLetterCount(inputCount);
  };

  const handleCheckboxChange = () => {
    setIsChecked((prev) => !prev);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      setFileInput((prev) => [...prev, file]);
    }
  };

  const handleFileBtnClick = () => {
    fileInputRef.current?.click();
  };

  const handleDeleteFile = (file: File) => {
    setFileInput((prev) => prev.filter((selectedFile) => selectedFile !== file));
  };

  const handleDeleteAll = (e: React.MouseEvent<HTMLButtonElement>) => {
    console.log('모두 지우기');
  };

  const handleNext = (e: React.MouseEvent<HTMLButtonElement>) => {
    console.log('다음');
  };

  return (
    <StMainInputWrapper>
      <StMainInput>
        <StDeleteAllBtn type="button" onClick={handleDeleteAll}>
          모든 내용 지우기
        </StDeleteAllBtn>
        <StInputWrapper>
          <h2>
            <IcKatchupLogo /> 업무 내용
          </h2>
          <StWorkInput>
            <textarea
              maxLength={2000}
              value={workInput}
              onChange={handleInputChange}
              placeholder="업무 내용을 입력해주세요"
            />
            <p>
              <span>{letterCount}</span>/2000자
            </p>
          </StWorkInput>
        </StInputWrapper>
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
          <StFileInput>
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
        <StNextBtn disabled={!workInput.length}>
          <button type="button" onClick={toggle}>
            다음 단계
          </button>
        </StNextBtn>
        <CardModal isShowing={isShowing} handleHide={toggle} />
      </StMainInput>
      {isScreenshotShowing ? (
        <>
          <ScreenshotInput />
          <IcBtnScreenshotHide onClick={handleScreenshotShowing} />
        </>
      ) : (
        <IcBtnScreenshot onClick={handleScreenshotShowing} />
      )}
    </StMainInputWrapper>
  );
};

const StMainInputWrapper = styled.section`
  display: flex;
  gap: 1.8rem;
  position: relative;

  & > svg {
    margin: 1.1rem -1.8rem -1.8rem -1.8rem;

    cursor: pointer;
  }
`;

const StMainInput = styled.section`
  position: relative;

  width: 90rem;
  height: 85rem;

  border: 0.1rem solid ${({ theme }) => theme.colors.katchup_line_gray};
  border-radius: 2.6rem;
  background-color: ${({ theme }) => theme.colors.katchup_white};

  box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.05);
`;

const StDeleteAllBtn = styled.button`
  position: absolute;
  top: 5rem;
  right: 7.5rem;

  border: none;
  background: transparent;
  color: ${({ theme }) => theme.colors.katchup_gray};
  ${({ theme }) => theme.fonts.p2_text};
  text-decoration: underline;
`;

const StInputWrapper = styled.div`
  padding: 6.4rem 7.4rem 3.4rem 7.4rem;

  & > h2 {
    display: flex;
    align-items: center;
    gap: 0.8rem;

    margin-bottom: 1.4rem;

    ${({ theme }) => theme.fonts.h1_title};
  }
`;

const StWorkInput = styled.div`
  position: relative;

  width: 100%;
  height: 45.8rem;
  padding: 4rem;

  border: 0.1rem solid ${({ theme }) => theme.colors.katchup_line_gray};
  border-radius: 0.8rem;

  & > textarea {
    width: 100%;
    height: 32.7rem;

    border: none;
    outline: none;
    resize: none;
    ${({ theme }) => theme.fonts.p1_text};

    scrollbar-width: 0.5rem;
    scrollbar-color: ${({ theme }) => theme.colors.katchup_gray};

    ::placeholder {
      color: ${({ theme }) => theme.colors.katchup_gray};
    }

    ::-webkit-scrollbar {
      width: 0.5rem;
    }

    ::-webkit-scrollbar-thumb {
      background-color: ${({ theme }) => theme.colors.katchup_gray};
      border-radius: 3rem;
    }
  }

  & > p {
    position: absolute;
    bottom: 2rem;
    right: 4rem;

    color: ${({ theme }) => theme.colors.katchup_dark_gray};
    ${({ theme }) => theme.fonts.caption};

    & > span {
      color: ${({ theme }) => theme.colors.katchup_main};
      ${({ theme }) => theme.fonts.caption};
    }
  }
`;

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

const StNextBtn = styled.div<{ disabled: boolean }>`
  display: flex;
  justify-content: flex-end;

  & > button {
    width: 11.8rem;
    height: 4.2rem;

    margin-top: 1.6rem;
    margin-right: 7.4rem;

    border: none;
    border-radius: 0.8rem;
    color: ${({ theme }) => theme.colors.katchup_white};
    background-color: ${({ theme, disabled }) => (disabled ? theme.colors.katchup_gray : theme.colors.katchup_main)};
    ${({ theme }) => theme.fonts.h3_title};
  }
`;

export default MainInput;
