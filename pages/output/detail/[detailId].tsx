import styled from '@emotion/styled';
import DetailContent from 'components/output/DetailContent';
import ScreenshotOutput from 'components/output/ScreenshotOutput';
import React from 'react';

const detail = () => {
  return (
    <>
      <StWrapper>
        <DetailContent />
        <ScreenshotOutput />
      </StWrapper>
    </>
  );
};

const StWrapper = styled.main`
  display: flex;
  justify-content: center;
  gap: 1.8rem;

  width: 100%;
`;

export default detail;
