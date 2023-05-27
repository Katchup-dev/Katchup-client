import styled from '@emotion/styled';
import Link from 'next/link';
import { IcLogoBig } from 'public/assets/icons';
import React from 'react';

const NoMiddleCategory = () => {
  return (
    <StWrapper>
      <IcLogoBig />
      <p>
        추가된 업무카드가 없어요
        <br /> 아래를 클릭하여 추가해보세요!
      </p>

      <Link href="/input/main">
        <button>업무카드 작성하기</button>
      </Link>
    </StWrapper>
  );
};

const StWrapper = styled.article`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  > svg {
    margin-bottom: 3rem;
  }

  > p {
    margin-bottom: 5rem;

    ${({ theme }) => theme.fonts.h1_bigtitle};

    text-align: center;
  }

  > a {
    text-decoration: none;

    > button {
      display: flex;
      justify-content: center;
      align-items: center;

      width: 23.8rem;
      height: 5.4rem;

      border: none;
      border-radius: 0.8rem;

      background-color: ${({ theme }) => theme.colors.katchup_main};

      color: ${({ theme }) => theme.colors.katchup_white};

      ${({ theme }) => theme.fonts.h1_smalltitle};
    }
  }
`;

export default NoMiddleCategory;
