import Toast from 'components/common/Toast';
import { deleteScreenshot, getPresignedUrl, putScreenshot } from 'core/apis/input';
import { screenshotSelectState } from 'core/atom';
import { IcBtnDeleteScreenshot, IcKatchupLogo, IcScreenshotEmpty } from 'public/assets/icons';
import React, { useEffect, useRef, useState } from 'react';
import { useRecoilState } from 'recoil';

import styled from '@emotion/styled';
import { PostScreenshotListInfo } from 'types/input';

interface ScreenshotUpdateProps {
  screenshotList: PostScreenshotListInfo[];
}

const ScreenshotUpdate = (props: ScreenshotUpdateProps) => {
  const { screenshotList } = props;
  const [inputScreenshot, setInputScreenshot] = useState<string>('');
  const screenshotInputRef = useRef<HTMLInputElement>(null);
  const [screenshotSelect, setScreenshotSelect] = useRecoilState(screenshotSelectState);

  useEffect(() => {
    setScreenshotSelect(screenshotList);
  }, []);

  const [toastMessage, setToastMessage] = useState('');
  const [toastKey, setToastKey] = useState<number>();

  // 스크린 샷 업로드 시 presigned url 받아오고 put 요청으로 s3에 올리는 코드
  const handlePostScreenShot = async (file: File) => {
    const response = await getPresignedUrl(file.name);
    if (response) {
      await putScreenshot(response.screenshotPreSignedUrl, file);
      const url = await createImageURL(file);
      setScreenshotSelect((prev) => [
        ...prev,
        {
          screenshotUUID: response.screenshotUUID,
          screenshotName: response.screenshotName,
          screenshotUploadDate: response.screenshotUploadDate,
          stickerList: [],
          screenshotUrl: url,
        },
      ]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handlePostScreenShot(file);
      setInputScreenshot('');
    }
  };

  const handleFileBtnClick = () => {
    if (screenshotSelect.length >= 5) {
      setToastMessage('스크린샷은 5개까지만 추가 가능해요!');
      setToastKey(Date.now());
      return;
    }
    screenshotInputRef.current?.click();
  };

  const handleDeleteFile = async (idx: number) => {
    await deleteScreenshot(
      screenshotSelect[idx].screenshotName,
      screenshotSelect[idx].screenshotUUID,
      screenshotSelect[idx].screenshotUploadDate,
    );
    setScreenshotSelect((prev) => prev.filter((_, index) => index !== idx));
    setInputScreenshot('');
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
            value={inputScreenshot}
          />
          <button onClick={handleFileBtnClick}>이미지 선택</button>
        </StFileBtnWrapper>
      </StFileSelect>
      <StFileInput>
        {screenshotSelect.length ? (
          screenshotSelect.map((screenshot, index) => (
            <StScreenshotWrapper key={index}>
              <StScreenshotImg key={index} src={screenshot?.screenshotUrl} alt={`스크린샷 ${index + 1}`} />
              <button onClick={() => handleDeleteFile(index)}>
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
      <StToastWrapper>
        <Toast key={toastKey} message={toastMessage} />
      </StToastWrapper>
    </StScreenshotInput>
  );
};

export default ScreenshotUpdate;

const StToastWrapper = styled.div`
  display: flex;
  justify-content: center;

  width: 100%;
`;

const StScreenshotInput = styled.section`
  width: 100%;
  max-width: 81.8rem;
  height: 85rem;

  border: 0.1rem solid ${({ theme }) => theme.colors.katchup_line_gray};
  border-radius: 2.6rem;
  background-color: ${({ theme }) => theme.colors.katchup_white};

  box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.05);
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
