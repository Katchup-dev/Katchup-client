import MainInput from 'components/input/MainInput';
import React from 'react';

import styled from '@emotion/styled';

const InputMain = () => {
  return (
    <StInputMainWrapper>
      <MainInput />
    </StInputMainWrapper>
  );
};

export default InputMain;

const StInputMainWrapper = styled.main`
  display: flex;
  justify-content: center;
  align-items: center;

  padding-bottom: 6.7rem;

  background-color: ${({ theme }) => theme.colors.katchup_bg_gray};
`;
