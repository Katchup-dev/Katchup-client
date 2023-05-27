import React from 'react';

import styled from '@emotion/styled';

const ScreenshotInput = () => {
  return <StScreenshotInput></StScreenshotInput>;
};

export default ScreenshotInput;

const StScreenshotInput = styled.section`
  width: 90rem;
  height: 85rem;

  border-radius: 2.6rem;
  background-color: ${({ theme }) => theme.colors.katchup_white};
`;
