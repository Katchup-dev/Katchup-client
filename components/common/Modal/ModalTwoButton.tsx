import { IcSurprise } from 'public/assets/icons';

import styled from '@emotion/styled';

interface ModalTwoButtonProps {
  isShowing: boolean;
  contents: string[];
  leftButtonName: string;
  rightButtonName: string;
  handleLeftButton: React.MouseEventHandler;
  handleRightButton: React.MouseEventHandler;
  isSubContent?: boolean;
}

const ModalTwoButton = (props: ModalTwoButtonProps) => {
  const { isShowing, contents, leftButtonName, rightButtonName, handleLeftButton, handleRightButton, isSubContent } =
    props;

  return (
    <>
      {isShowing && (
        <StModalWrapper>
          <StModal>
            <IcSurprise />
            <StContentWrapper isSubContent={isSubContent}>
              {contents.map((content, index) => (
                <p key={index} className={isSubContent && index === contents.length - 1 ? 'subContent' : ''}>
                  {content}
                </p>
              ))}
            </StContentWrapper>
            <StBtnWrapper>
              <button type="button" className="leftBtn" onClick={handleLeftButton}>
                {leftButtonName}
              </button>
              <button type="button" className="righttBtn" onClick={handleRightButton}>
                {rightButtonName}
              </button>
            </StBtnWrapper>
          </StModal>
        </StModalWrapper>
      )}
    </>
  );
};

export default ModalTwoButton;

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

const StContentWrapper = styled.div<{ isSubContent?: boolean }>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  & > p {
    ${({ theme }) => theme.fonts.h1_smalltitle};

    &.subContent {
      margin-top: 1rem;

      ${({ theme }) => theme.fonts.h2_smalltitle};
      color: ${({ theme }) => theme.colors.katchup_dark_gray};
    }
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

  .leftBtn {
    background-color: ${({ theme }) => theme.colors.katchup_gray};
  }
`;
