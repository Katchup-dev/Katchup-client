import { IcBtnDeleteScreenshot, IcKatchupLogo, IcScreenshotEmpty } from 'public/assets/icons';
import React, { useEffect, useRef, useState } from 'react';

import styled from '@emotion/styled';

const ScreenshotInput = () => {
  const [screenshotInput, setScreenshotInput] = useState<File[]>([]);
  const [URLThumbnails, setURLThumbnails] = useState<string[]>([]);
  const screenshotInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const newFiles = Array.from(files);
      setScreenshotInput((prev) => [...prev, ...newFiles]);
    }
  };

  const handleFileBtnClick = () => {
    screenshotInputRef.current?.click();
  };

  const handleDeleteFile = (file: File) => {
    setScreenshotInput((prev) => prev.filter((selectedFile) => selectedFile !== file));
  };

  const createImageURL = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        resolve(event.target?.result as string);
      };
      reader.onerror = (event) => {
        reject(event.target?.error);
      };
      reader.readAsDataURL(file);
    });
  };

  useEffect(() => {
    const fetchURLThumbnails = async () => {
      const urls = await Promise.all(screenshotInput.map((file) => createImageURL(file)));
      setURLThumbnails(urls);
    };

    fetchURLThumbnails();
  }, [screenshotInput]);

  return (
    <StScreenshotInput>
      <StFileSelect>
        <StFileBtnWrapper>
          <h2>
            <IcKatchupLogo /> 스크린샷
          </h2>
          <input
            ref={screenshotInputRef}
            type="file"
            onChange={handleFileSelect}
            accept=".jpg,.png,.jpeg,.gif,.tiff,.tif"
          />
          <button onClick={handleFileBtnClick}>파일선택</button>
        </StFileBtnWrapper>
      </StFileSelect>
      <StFileInput>
        {screenshotInput.length ? (
          screenshotInput.map((file, index) => (
            <StScreenshotWrapper>
              <StScreenshotImg key={index} src={URLThumbnails[index]} alt={`스크린샷 ${index + 1}`} />
              <button onClick={() => handleDeleteFile(file)}>
                <IcBtnDeleteScreenshot />
              </button>
            </StScreenshotWrapper>
          ))
        ) : (
          <StEmpty>
            <IcScreenshotEmpty />
          </StEmpty>
        )}
      </StFileInput>
    </StScreenshotInput>
  );
};

export default ScreenshotInput;

const StScreenshotInput = styled.section`
  width: 90rem;
  height: 85rem;

  border-radius: 2.6rem;
  background-color: ${({ theme }) => theme.colors.katchup_white};
`;

const StFileSelect = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  margin: 6.5rem 5rem;

  input {
    display: none;
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
  height: 64rem;

  ::-webkit-scrollbar {
    width: 0.5rem;
  }

  ::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) => theme.colors.katchup_gray};
    border-radius: 3rem;
  }
`;

const StScreenshotWrapper = styled.div`
  position: relative;
  width: 100%;
  padding: 0rem 5rem;
  margin-bottom: 1.2rem;

  & > button {
    position: absolute;
    top: 1rem;
    right: 5.5rem;

    border: none;
    background: transparent;
  }
`;

const StScreenshotImg = styled.img`
  width: 100%;

  border: 0.1rem solid ${({ theme }) => theme.colors.katchup_line_gray};
  border-radius: 0.8rem;
`;

const StEmpty = styled.div`
  display: flex;
  justify-content: center;

  margin-top: 22.4rem;
`;
