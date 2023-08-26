import styled from '@emotion/styled';
import axios from 'axios';
import { getFileDownload } from 'core/apis/output';
import { useRouter } from 'next/router';

import { IcBack, IcDeleteFile, IcSubLogo } from 'public/assets/icons';

import { FileInfo } from 'types/output';

export interface DetailContentProps {
  fileList: FileInfo[];
  content: string;
}

const DetailContent = (props: DetailContentProps) => {
  const { fileList, content } = props;
  const router = useRouter();

  const handleFileDownload = async (id: string, name: string) => {
    try {
      const { filePreSignedUrl } = await getFileDownload(id, name);

      // 파일 다운로드를 위한 링크 생성
      const downloadLink = document.createElement('a');
      downloadLink.href = filePreSignedUrl;
      downloadLink.click();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <StDetailWrapper>
      <button onClick={() => router.back()}>
        <IcBack />
        돌아가기
      </button>

      <StSectionDetail>
        <div>
          <IcSubLogo />
          <h2>업무 내용</h2>
        </div>

        <StDetailContent>
          <p>{content}</p>

          <span>
            <p>343</p>/2000자
          </span>
        </StDetailContent>

        {fileList?.length > 0 && (
          <>
            <div>
              <IcSubLogo />
              <h2>파일 첨부</h2>
            </div>
            <StFileWrapper>
              {fileList?.map((file) => (
                <a download key={file.id} onClick={() => handleFileDownload(file.id, file.changedName)}>
                  <li>
                    {file.changedName} <p>{file.size}MB</p>
                  </li>
                </a>
              ))}
            </StFileWrapper>
          </>
        )}
      </StSectionDetail>
      <StButtonWrapper>
        <button type="button">삭제하기</button>
        <button type="button">수정하기</button>
      </StButtonWrapper>
    </StDetailWrapper>
  );
};

const StDetailWrapper = styled.article`
  padding: 6.2rem 7.4rem 3.3rem 7.4rem;

  position: relative;

  width: 90rem;
  height: 85rem;

  border: 0.1rem solid ${({ theme }) => theme.colors.katchup_line_gray};
  border-radius: 2.6rem;
  box-shadow: 0px 0px 2rem rgba(0, 0, 0, 0.05);

  > button {
    display: flex;
    gap: 0.6rem;
    position: absolute;
    top: 5.1rem;
    right: 7.4rem;

    color: ${({ theme }) => theme.colors.katchup_gray};
    ${({ theme }) => theme.fonts.h3_title};

    background-color: transparent;
    border: none;

    cursor: pointer;
  }
`;

const StSectionDetail = styled.div`
  position: relative;

  > div:nth-of-type(1),
  div:nth-of-type(2) {
    display: flex;
    gap: 0.8rem;
    margin-bottom: 1.4rem;

    > h2 {
      ${({ theme }) => theme.fonts.h1_title};
    }
  }

  > div:nth-of-type(2) {
    margin-top: 3.4rem;
  }
`;

const StDetailContent = styled.section`
  height: 45.8rem;
  padding: 4rem 4rem 2rem 4rem;

  position: relative;

  border: 0.1rem solid ${({ theme }) => theme.colors.katchup_line_gray};
  border-radius: 0.8rem;

  > p {
    height: 36.4rem;

    ${({ theme }) => theme.fonts.p1_text};
    line-height: 2.8rem;

    color: ${({ theme }) => theme.colors.katchup_black};
  }

  > span {
    display: flex;

    position: absolute;
    bottom: 2rem;
    right: 4rem;

    ${({ theme }) => theme.fonts.caption};
    > p {
      ${({ theme }) => theme.fonts.caption};

      color: ${({ theme }) => theme.colors.katchup_main};
    }
  }

  overflow-y: scroll;
`;

const StFileWrapper = styled.ul`
  padding: 1.3rem 2.2rem 1.2rem 2.2rem;
  width: 75.2rem;

  border: 0.1rem solid ${({ theme }) => theme.colors.katchup_line_gray};
  border-radius: 0.8rem;

  > a {
    text-decoration: none;
    > li {
      display: flex;
      align-items: center;
      gap: 0.4rem;

      ${({ theme }) => theme.fonts.p1_text};

      color: ${({ theme }) => theme.colors.katchup_black};
      text-decoration: none;

      cursor: pointer;

      svg {
        margin-right: 1.6rem;
      }

      > p {
        margin-left: 1.4rem;

        ${({ theme }) => theme.fonts.caption};

        color: ${({ theme }) => theme.colors.katchup_dark_gray};
      }
    }
  }
`;

const StButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1.6rem;

  margin-top: 3.2rem;

  > button {
    padding: 0;

    width: 11.8rem;
    height: 4.2rem;

    border-radius: 0.8rem;

    ${({ theme }) => theme.fonts.h3_title};
  }

  > button:nth-of-type(1) {
    border: 0.1rem solid ${({ theme }) => theme.colors.katchup_main};

    background-color: ${({ theme }) => theme.colors.katchup_white};

    color: ${({ theme }) => theme.colors.katchup_main};
  }

  > button:nth-of-type(2) {
    border: none;

    background-color: ${({ theme }) => theme.colors.katchup_main};

    color: ${({ theme }) => theme.colors.katchup_white};
  }
`;

export default DetailContent;
