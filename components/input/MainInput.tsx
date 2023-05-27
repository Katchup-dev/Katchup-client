import { IcBtnDeleteFile, IcKatchupLogo } from 'public/assets/icons';
import { useRef, useState } from 'react';

import styled from '@emotion/styled';

const MainInput = () => {
  const [workInput, setWorkInput] = useState('');
  const [letterCount, setLetterCount] = useState(0);
  const [fileInput, setFileInput] = useState<File>();
  const fileInputRef = useRef(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const inputText = e.target.value;
    const inputCount = inputText.length;

    setWorkInput(inputText);
    setLetterCount(inputCount);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      setFileInput(file);
    }
  };

  const handleFileBtnClick = () => {
    fileInputRef.current?.click();
  };

  const handleDeleteFile = () => {};

  return (
    <StMainInput>
      <StInputWrapper>
        <h2>
          <IcKatchupLogo /> 업무 내용
        </h2>
        <div>
          <textarea maxLength={2000} value={workInput} onChange={handleInputChange} />
          <p>
            <span>{letterCount}</span>/2000자
          </p>
        </div>
      </StInputWrapper>
      <StFileWrapper>
        <h2>
          <IcKatchupLogo /> 파일 첨부
          <input ref={fileInputRef} type="file" onChange={handleFileSelect} />
          <button onClick={handleFileBtnClick}>파일선택</button>
        </h2>
        <div>
          {fileInput && (
            <>
              <p>
                <button onClick={handleDeleteFile}>
                  <IcBtnDeleteFile />
                </button>
                {fileInput.name}
                <span>{`${(fileInput.size / (1024 * 1024)).toFixed(2)}MB`}</span>
              </p>
            </>
          )}
        </div>
      </StFileWrapper>
    </StMainInput>
  );
};

const StMainInput = styled.section`
  width: 90rem;
  height: 85rem;

  border-radius: 2.6rem;
  background-color: ${({ theme }) => theme.colors.katchup_white};
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

  & > div {
    position: relative;

    width: 75.2rem;
    height: 45.8rem;
    padding: 4rem;

    border: 0.1rem solid ${({ theme }) => theme.colors.katchup_line_gray};
    border-radius: 0.8rem;
  }

  & > div > textarea {
    width: 67.2rem;
    height: 32.7rem;

    border: none;
    outline: none;
    resize: none;
    ${({ theme }) => theme.fonts.p1_text};

    scrollbar-width: 0.5rem;
    scrollbar-color: ${({ theme }) => theme.colors.katchup_gray};

    ::-webkit-scrollbar {
      width: 0.5rem;
    }

    ::-webkit-scrollbar-thumb {
      background-color: ${({ theme }) => theme.colors.katchup_gray};
      border-radius: 3rem;
    }
  }

  & > div > p {
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

  & > h2 {
    display: flex;
    align-items: center;
    gap: 0.8rem;

    margin-bottom: 1.4rem;

    ${({ theme }) => theme.fonts.h1_title};
  }

  & > h2 > input {
    display: none;
  }

  & > h2 > button {
    padding: 0.5rem 1.5rem;
    margin-left: 0.6rem;

    border: 0.1rem solid ${({ theme }) => theme.colors.katchup_line_gray};
    border-radius: 0.8rem;
    background-color: ${({ theme }) => theme.colors.katchup_white};
    ${({ theme }) => theme.fonts.p3_text};
  }

  & > div {
    position: relative;

    width: 75.2rem;
    height: 11.4rem;
    padding: 1.2rem 2.2rem;

    border: 0.1rem solid ${({ theme }) => theme.colors.katchup_line_gray};
    border-radius: 0.8rem;
  }

  & > div > p {
    display: flex;
    align-items: center;
    gap: 1.6rem;

    ${({ theme }) => theme.fonts.p1_text};
  }

  & > div > p > button {
    padding: 0;

    border: none;
    background: transparent;
  }

  & > div > p > span {
    color: ${({ theme }) => theme.colors.katchup_dark_gray};
    ${({ theme }) => theme.fonts.caption};
  }
`;
export default MainInput;
