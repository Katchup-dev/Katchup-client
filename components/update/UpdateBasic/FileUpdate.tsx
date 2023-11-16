import styled from '@emotion/styled';
import { ModalOneButton } from 'components/common/Modal';
import { MODAL_FILE_SIZE } from 'constants/modal';
import { deleteFile, getFilePresignedUrl, putFile } from 'core/apis/input';
import { fileNameChangeState, fileSelectState } from 'core/atom';
import useModal from 'lib/hooks/common/useModal';
import { IcBtnDeleteFile, IcFileCheckbox, IcFileCheckboxAfter, IcKatchupLogo } from 'public/assets/icons';
import { useEffect, useRef } from 'react';
import { useRecoilState } from 'recoil';
import { PostFileListInfo } from 'types/input';

interface FileUpdateProps {
  fileList: PostFileListInfo[];
}

const FileUpdate = (props: FileUpdateProps) => {
  const { fileList } = props;
  const [fileSelectList, setFileSelectList] = useRecoilState<PostFileListInfo[]>(fileSelectState);
  const [isChecked, setIsChecked] = useRecoilState(fileNameChangeState);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const sizeLimit = 10 * 1024 * 1024;

  const fileSizeModal = useModal();

  useEffect(() => {
    setFileSelectList([...fileList]);
  }, []);

  // 파일 업로드 시 presigned url 받아오고 put 요청으로 s3에 올리는 코드
  const handlePostFile = async (file: File) => {
    const response = await getFilePresignedUrl(file.name);

    if (response) {
      await putFile(response.filePreSignedUrl, file);

      setFileSelectList((prev) => [
        ...prev,
        {
          fileUUID: response.fileUUID,
          fileOriginalName: response.fileName,
          fileUploadDate: response.fileUploadDate,
          size: file.size,
        },
      ]);
    }
  };

  const handleFileUpload = async (file: File) => {
    if (file.size <= sizeLimit) {
      handlePostFile(file);
    } else {
      fileSizeModal.toggle();
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileUpload(file);
    }
  };

  const handleFileDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) {
      handleFileUpload(file);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleFileBtnClick = () => {
    fileInputRef.current?.click();
  };

  const handleDeleteFile = async (idx: number) => {
    const selectedFile = fileSelectList[idx];
    await deleteFile(selectedFile.fileOriginalName, selectedFile.fileUploadDate, selectedFile.fileUUID);
    setFileSelectList((prev) => prev.filter((file, index) => index !== idx));
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
            <input
              ref={fileInputRef}
              type="file"
              accept=".doc,.docx,.gdoc,.pdf,.txt,.hwp,.xls,.xlsx,.gsheet,.ppt,.pptx,.gslides,.jpeg,.jpg,.png,.gif,.bmp,.tiff,.tif,.svg,.ai,.psd,.mp3,.wav,.aiff,.flac,.zip,.rar,.7z,.py,.pyc,.pyo,.js,.jsx,.ts,.tsx,.jsp,.c,.cc,.cpp,.h,.java,.php,.asp,.html,.xml,.css,.exe"
              onChange={handleFileSelect}
            />
            <button onClick={handleFileBtnClick}>파일선택</button>
          </StFileBtnWrapper>
          <label>
            <input type="checkbox" checked={isChecked} onChange={handleCheckboxChange} />
            {isChecked ? <IcFileCheckboxAfter /> : <IcFileCheckbox />}
            파일명 자동 변경
          </label>
        </StFileSelect>
        <StFileInput onDrop={handleFileDrop} onDragOver={handleDragOver}>
          {fileSelectList.length ? (
            fileSelectList.map((file, index) => (
              <p key={index}>
                <button type="button" onClick={() => handleDeleteFile(index)}>
                  <IcBtnDeleteFile />
                </button>
                {file.fileOriginalName}
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

export default FileUpdate;

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
