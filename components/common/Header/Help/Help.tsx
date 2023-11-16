import {
  URL_ABOUT_US,
  URL_FEEDBACK,
  URL_INSTAGRAM,
  URL_MAILTO,
  URL_MANUAL,
  URL_PRIVACY_POLICY
} from 'constants/footer';

import styled from '@emotion/styled';

interface SettingProps {
  isShowing: boolean;
  modalRef: React.RefObject<HTMLDivElement>;
}

const Help = ({ isShowing, modalRef }: SettingProps) => {
  return (
    <StHelpWrapper>
      {isShowing && (
        <StHelpModal ref={modalRef}>
          <p>Katchup에 대해 궁금한 점이 있으신가요?</p>
          <StHr />
          <StButtonWrapper>
            <StDescLink href={URL_MANUAL} target="_blank" rel="noopener noreferrer">
              Katchup 설명서
            </StDescLink>
            <StDescLink href={URL_MAILTO} target="_blank" rel="noopener noreferrer">
              문의하기
            </StDescLink>
          </StButtonWrapper>
          <StHr />
          <StButtonWrapper>
            <StInfoLink href={URL_PRIVACY_POLICY} target="_blank" rel="noopener noreferrer">
              개인정보 보호 정책
            </StInfoLink>
            <StInfoLink href={URL_ABOUT_US} target="_blank" rel="noopener noreferrer">
              ABOUT US
            </StInfoLink>
            <StInfoLink href={URL_INSTAGRAM} target="_blank" rel="noopener noreferrer">
              Katchup Instagram
            </StInfoLink>
            <StInfoLink href={URL_FEEDBACK} target="_blank" rel="noopener noreferrer">
              피드백
            </StInfoLink>
          </StButtonWrapper>
        </StHelpModal>
      )}
    </StHelpWrapper>
  );
};
export default Help;

const StHelpWrapper = styled.div`
  z-index: 1;

  position: absolute;
  top: 11rem;
  right: 13.5rem;
`;

const StHelpModal = styled.div`
  width: 30.6rem;
  min-height: 34rem;
  padding: 2.4rem 2.6rem;
  box-sizing: border-box;

  border-radius: 0.8rem;
  border: 0.1rem solid var(--katchup_line_gray, #e2e2e2);
  background-color: ${({ theme }) => theme.colors.katchup_white};
  box-shadow: 0 0 2rem 0 rgba(0, 0, 0, 0.05);

  & > p {
    color: ${({ theme }) => theme.colors.katchup_main};
    ${({ theme }) => theme.fonts.p3_text};
  }
`;

const StHr = styled.hr`
  height: 0.1rem;
  margin: 1.9rem 0;
  box-sizing: border-box;

  border: 0;
  background-color: ${({ theme }) => theme.colors.katchup_line_gray};
`;

const StButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.8rem;

  box-sizing: border-box;
`;

const StDescLink = styled.a`
  display: flex;
  justify-content: left;
  align-items: center;
  gap: 2rem;

  color: ${({ theme }) => theme.colors.katchup_black};
  ${({ theme }) => theme.fonts.h2_smalltitle};
  text-decoration: none;

  cursor: pointer;
`;

const StInfoLink = styled(StDescLink)`
  color: ${({ theme }) => theme.colors.katchup_dark_gray};
`;
