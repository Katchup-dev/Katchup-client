import { IcSurprise } from 'public/assets/icons';

import styled from '@emotion/styled';

interface ModalTwoButtonProps {
  contents: string[];
}

const ModalTwoButton = (props: ModalTwoButtonProps) => {
  const { contents } = props;

  return (
    <StModalWrapper>
      <StModal>
        <IcSurprise />
        <StContentWrapper>
          {contents.map((content, index) => (
            <p key={index}>{content}</p>
          ))}
        </StContentWrapper>
        <StBtnWrapper>
          <button type="button" className="leftBtn">
            돌아가기
          </button>
          <button type="button" className="rightBtn">
            벗어나기
          </button>
        </StBtnWrapper>
      </StModal>
    </StModalWrapper>
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
    ${({ theme }) => theme.fonts.h2_title};
  }
  .leftBtn {
    background-color: ${({ theme }) => theme.colors.katchup_gray};
  }
  .rightBtn {
    background-color: ${({ theme }) => theme.colors.katchup_main};
  }
`;
