import React from 'react';

import styled from '@emotion/styled';

interface ModalProps {
  isShowing: boolean;
  handleHide: React.MouseEventHandler;
}

const ModalIndex = (props: ModalProps) => {
  const { isShowing, handleHide } = props;

  return (
    <>
      {isShowing && (
        <StModalWrapper>
          <StModalIndex></StModalIndex>
        </StModalWrapper>
      )}
    </>
  );
};

export default ModalIndex;

const StModalWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  position: fixed;
  top: 0;
  left: 0;

  width: 100%;
  height: 100%;

  background-color: rgba(47, 52, 56, 0.4);
`;

const StModalIndex = styled.section`
  width: 63.8rem;
  height: 83.8rem;

  background-color: ${({ theme }) => theme.colors.katchup_white};
`;
