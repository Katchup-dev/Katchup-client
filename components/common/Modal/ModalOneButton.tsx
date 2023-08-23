import { IcSurprise } from 'public/assets/icons';

import styled from '@emotion/styled';

interface ModalOneButtonProps {
  isShowing: boolean;
  contents: string[];
  buttonName: string;
  handleButton: React.MouseEventHandler;
}

const ModalOneButton = (props: ModalOneButtonProps) => {
  const { isShowing, contents, buttonName, handleButton } = props;

  return (
    <>
      {isShowing && (
        <StModalWrapper>
          <StModal>
            <IcSurprise />
            <StContentWrapper>
              {contents.map((content, index) => (
                <p key={index}>{content}</p>
              ))}
            </StContentWrapper>
            <StBtnWrapper>
              <button type="button" onClick={handleButton}>
                {buttonName}
              </button>
            </StBtnWrapper>
          </StModal>
        </StModalWrapper>
      )}
    </>
  );
};

export default ModalOneButton;

const StModalWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;

  width: 100%;
  height: 100%;

  background-color: rgba(47, 52, 56, 0.4);
`;

const StModal = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  gap: 2.8rem;

  width: 53.6rem;
  height: fit-content;
  padding: 4rem 6rem;

  border-radius: 2rem;
  background-color: ${({ theme }) => theme.colors.katchup_white};
`;

const StContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  & > p {
    ${({ theme }) => theme.fonts.h1_smalltitle};
  }
`;

const StBtnWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 1.6rem;

  width: 100%;

  & > button {
    width: 100%;

    padding: 1.4rem 0;

    border: none;
    border-radius: 0.8rem;
    color: ${({ theme }) => theme.colors.katchup_white};
    background-color: ${({ theme }) => theme.colors.katchup_main};
    ${({ theme }) => theme.fonts.h2_title};
  }
`;
