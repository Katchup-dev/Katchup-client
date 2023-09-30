import { etcState } from 'core/atom';
import React, { useState } from 'react';
import { useRecoilState } from 'recoil';

import styled from '@emotion/styled';

import { StInputIndex } from './InputCategory';

const InputEtc = () => {
  const [etc, setEtc] = useRecoilState(etcState);
  const [etcCount, setEtcCount] = useState(0);
  const [isEtcFocused, setIsEtcdFocused] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEtc(e.target.value);
    setEtcCount(e.target.value.length);
  };

  return (
    <StInputEtc isFocused={isEtcFocused}>
      비고
      <textarea
        value={etc}
        name="etc"
        onChange={handleInputChange}
        placeholder="업무에 관한 꿀팁이나 특이사항을 자유롭게 작성해 주세요."
        maxLength={200}
      />
      <p>
        <span>{etcCount}</span>/200
      </p>
    </StInputEtc>
  );
};

export default InputEtc;

const StInputEtc = styled(StInputIndex)`
  & > textarea {
    height: 19.1rem;
    padding: 1.4rem 1.4rem 4rem 1.4rem;

    border: 0.1rem solid ${({ theme }) => theme.colors.katchup_line_gray};
    border-radius: 0.8rem;
    ${({ theme }) => theme.fonts.h2_smalltitle};

    outline: none;
    resize: none;

    ::placeholder {
      color: ${({ theme }) => theme.colors.katchup_gray};
    }
  }

  & > p {
    position: absolute;
    top: 18.5rem;
  }
`;
