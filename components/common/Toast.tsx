import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';

interface ToastProps {
  message: string;
}

const Toast = (props: ToastProps) => {
  const { message } = props;

  return (
    <>
      {message && (
        <StToast>
          <p>{message}</p>
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
    padding: 1.8rem 4rem;

    color: ${({ theme }) => theme.colors.katchup_white};
    ${({ theme }) => theme.fonts.h1_title};
  }
`;
