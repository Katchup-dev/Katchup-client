import { IcKatchupLogo } from 'public/assets/icons';
import { useState } from 'react';

import styled from '@emotion/styled';

const MainInput = () => {
  const [workInput, setWorkInput] = useState('');
  const [letterCount, setLetterCount] = useState(0);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const inputText = e.target.value;
    const inputCount = inputText.length;

    setWorkInput(inputText);
    setLetterCount(inputCount);
  };

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

export default MainInput;
