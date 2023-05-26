import styled from '@emotion/styled';
import { IcBack, IcDeleteFile, IcSubLogo } from 'public/assets/icons';
import { useState } from 'react';

const DetailContent = () => {
  const [textLength, setTextLength] = useState<number>(0);

  const fileList = [
    {
      id: 1,
      name: '기획 파일.pdf',
      url: '파일 URL',
      size: 2.1,
    },
    {
      id: 2,
      name: '웹 파일.pdf',
      url: '파일2 URL',
      size: 2.4,
    },
    {
      id: 3,
      name: '서버 파일.pdf',
      url: '파일3 URL',
      size: 2.5,
    },
  ];
  const handleTextLength = () => {
    // setTextLength(e.target.value.replace(/[\0-\x7f]|([0-\u07ff]|(.))/g, '$&$1$2').length);
  };

  return (
    <StDetailWrapper>
      <button>
        <IcBack />
        중분류로 돌아가기
      </button>

      <StSectionDetail>
        <div>
          <IcSubLogo />
          <h2>업무 내용</h2>
        </div>

        <StDetailContent onChange={() => handleTextLength()}>
          <p>
            ABCDE업무를 할 땐 이케이케 하면 된다 뭐 여러기지 가능성을 열어두겠지만 아시다시피 지금 이렇게쓰는말은
            졸린와중에 쓰는 말이라 상당히 아무말이나 하는 것이란 말이지 내가 지금 무슨말을 하는지도 모르겠고 경우의수가
            왤케 많냐 이거 참 기능이 구현 가능한지도 생각해야하고 ABCDE업무를 할 땐 이케이케 하면 된다 뭐 여러기지
            가능성을 열어두겠지만 아시다시피 지금 이렇게쓰는말은 졸린와중에 쓰는 말이라 상당히 아무말이나 하는 것이란
            말이지 내가 지금 무슨말을 하는지도 모르겠고 경우의수가 왤케 많냐 이거 ABCDE업무를 지 가능성을 열어두겠지만
            아시다시피 지금 이렇게쓰는말은 졸린와중에 쓰는 말이라 상당히 아무말이나 하는 것이란 말이지 내가 지금
            무슨말을 하는지도 모르겠고 경우의수가 왤케 많냐 이거 참 기능이 구현 가능한지도 생각해야하고 ABCDE업무를 할
            땐 이케이케 하면 된다 뭐 여러기지 가능성을 열어두겠지만 아시다시피 지금 이렇게쓰는말은 졸린와중에 쓰는
            말이라 상당히 아무말이나 하는 것이란 말이지 내가 지금 무슨말을 하는지도 모르겠고 경우의수가 왤케 많냐 이거
            참 기능이 구현 가능한지도 생각해야하고 ABCDE업무를 할 땐 이케이케 하면 된다 뭐 여러기지 가능성을
            열어두겠지만 아시다시피 지금 이렇게쓰는말은 졸린와중에 쓰는 말이라 상당히 아무말이나 하는지 라 상당히
            아무말이나 하는지 라 상당히 아무말이나 하는지 라 상당히 아무말이나 하는 ABCDE업무를 할 땐 이케이케 하면 된다
            뭐 여러기지 가능성을 열어두겠지만 아시다시피 지금 이렇게쓰는말은 졸린와중에 쓰는 말이라 상당히 아무말이나
            하는 것이란 말이지 내가 지금 무슨말을 하는지도 모르겠고 경우의수가 왤케 많냐 이거 참 기능이 구현 가능한지도
            생각해야하고 ABCDE업무를 할 땐 이케이케 하면 된다 뭐 여러기지 가능성을 열어두겠지만 아시다시피 지금
            이렇게쓰는말은 졸린와중에 쓰는 말이라 상당히 아무말이나 하는 것이란 말이지 내가 지금 무슨말을 하는지도
            모르겠고 경우의수가 왤케 많냐 이거 ABCDE업무를 지 가능성을 열어두겠지만 아시다시피 지금 이렇게쓰는말은
            졸린와중에 쓰는 말이라 상당히 아무말이나 하는 것이란 말이지 내가 지금 무슨말을 하는지도 모르겠고 경우의수가
            왤케 많냐 이거 참 기능이 구현 가능한지도 생각해야하고 ABCDE업무를 할 땐 이케이케 하면 된다 뭐 여러기지
            가능성을 열어두겠지만 아시다시피 지금 이렇게쓰는말은 졸린와중에 쓰는 말이라 상당히 아무말이나 하는 것이란
            말이지 내가 지금 무슨말을 하는지도 모르겠고 경우의수가 왤케 많냐 이거 참 기능이 구현 가능한지도 생각해야하고
            ABCDE업무를 할 땐 이케이케 하면 된다 뭐 여러기지 가능성을 열어두겠지만 아시다시피 지금 이렇게쓰는말은
            졸린와중에 쓰는 말이라 상당히 아무말이나 하는지 라 상당히 아무말이나 하는지 라 상당히 아무말이나 하는지 라
            상당히 아무말이나 하는 ABCDE업무를 할 땐 이케이케 하면 된다 뭐 여러기지 가능성을 열어두겠지만 아시다시피
            지금 이렇게쓰는말은 졸린와중에 쓰는 말이라 상당히 아무말이나 하는 것이란 말이지 내가 지금 무슨말을 하는지도
            모르겠고 경우의수가 왤케 많냐 이거 참 기능이 구현 가능한지도 생각해야하고 ABCDE업무를 할 땐 이케이케 하면
            된다 뭐 여러기지 가능성을 열어두겠지만 아시다시피 지금 이렇게쓰는말은 졸린와중에 쓰는 말이라 상당히
            아무말이나 하는 것이란 말이지 내가 지금 무슨말을 하는지도 모르겠고 경우의수가 왤케 많냐 이거 ABCDE업무를 지
            가능성을 열어두겠지만 아시다시피 지금 이렇게쓰는말은 졸린와중에 쓰는 말이라 상당히 아무말이나 하는 것이란
            말이지 내가 지금 무슨말을 하는지도 모르겠고 경우의수가 왤케 많냐 이거 참 기능이 구현 가능한지도 생각해야하고
            ABCDE업무를 할 땐 이케이케 하면 된다 뭐 여러기지 가능성을 열어두겠지만 아시다시피 지금 이렇게쓰는말은
            졸린와중에 쓰는 말이라 상당히 아무말이나 하는 것이란 말이지 내가 지금 무슨말을 하는지도 모르겠고 경우의수가
            왤케 많냐 이거 참 기능이 구현 가능한지도 생각해야하고 ABCDE업무를 할 땐 이케이케 하면 된다 뭐 여러기지
            가능성을 열어두겠지만 아시다시피 지금 이렇게쓰는말은 졸린와중에 쓰는 말이라 상당히 아무말이나 하는지 라
            상당히 아무말이나 하는지 라 상당히 아무말이나 하는지 라 상당히 아무말이나 하는
          </p>

          <span>
            <p>343</p>/2000자
          </span>
        </StDetailContent>

        <div>
          <IcSubLogo />
          <h2>파일 첨부</h2>
        </div>
        <StFileWrapper>
          {fileList.map((file) => (
            <li>
              <IcDeleteFile /> {file.name} <p>{file.size}MB</p>
            </li>
          ))}
        </StFileWrapper>

        <StButtonWrapper>
          <button type="button">삭제하기</button>
          <button type="button">수정하기</button>
        </StButtonWrapper>
      </StSectionDetail>
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

    overflow-y: scroll;
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
`;

const StFileWrapper = styled.ul`
  padding: 1.3rem 2.2rem 0rem 2.2rem;
  width: 75.2rem;
  height: 11.4rem;

  border: 0.1rem solid ${({ theme }) => theme.colors.katchup_line_gray};
  border-radius: 0.8rem;

  > li {
    display: flex;
    align-items: center;
    gap: 0.4rem;

    ${({ theme }) => theme.fonts.p1_text};

    color: ${({ theme }) => theme.colors.katchup_black};
    text-decoration: none;

    svg {
      margin-right: 1.6rem;
    }

    > p {
      margin-left: 1.4rem;

      ${({ theme }) => theme.fonts.caption};

      color: ${({ theme }) => theme.colors.katchup_dark_gray};
    }
  }
`;

const StButtonWrapper = styled.div`
  display: flex;
  gap: 1.6rem;

  position: absolute;
  bottom: 3.2rem;
  right: 7.4rem;

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
