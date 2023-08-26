import { IcCheck, IcLink } from 'public/assets/icons';

import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';

interface ToastProps {
  message: string;
  isCheck?: boolean;
  isLink?: boolean;
}

const Toast = (props: ToastProps) => {
  const { message, isCheck, isLink } = props;

  return (
    <>
      {message && (
        <StToast>
          <p>
            {isCheck ? <IcCheck /> : null}
            {isLink ? <IcLink /> : null}
            {message}
          </p>
        </StToast>
      )}
    </>
  );
};

export default Toast;

const slideUpAnimation = keyframes`
  0% {
    transform: translateY(100%);
  }
  100% {
    transform: translateY(0);
  }
`;

const slideDownAnimation = keyframes`
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(250%);
  }
`;

const StToast = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  position: fixed;
  bottom: 8rem;

  height: 6rem;
  box-sizing: border-box;

  border-radius: 1.8rem;
  background-color: ${({ theme }) => theme.colors.katchup_main};

  animation: ${slideUpAnimation} 0.5s ease-out, ${slideDownAnimation} 0.5s 3s ease-in;
  animation-fill-mode: forwards;
  z-index: 1000;

  & > p {
    display: flex;
    align-items: center;
    padding: 1.8rem 4rem;

    color: ${({ theme }) => theme.colors.katchup_white};
    ${({ theme }) => theme.fonts.h1_title};

    & > svg {
      margin-right: 0.8rem;
    }
  }
`;
