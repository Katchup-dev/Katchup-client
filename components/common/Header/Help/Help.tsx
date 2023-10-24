import useModal from 'lib/hooks/common/useModal';

import styled from '@emotion/styled';

interface SettingProps {
  isShowing: boolean;
  modalRef: React.RefObject<HTMLDivElement>;
}

const Help = ({ isShowing, modalRef }: SettingProps) => {
  const help = useModal();

  return <StHelpWrapper>{isShowing && <StHelpModal ref={modalRef}>ddd</StHelpModal>}</StHelpWrapper>;
};
export default Help;

const StHelpWrapper = styled.div`
  z-index: 1;

  position: absolute;
  top: 11rem;
  right: 5rem;
`;

const StHelpModal = styled.div`
  width: 30.6rem;
  height: 22.3rem;
  padding: 2.4rem;
  box-sizing: border-box;

  border-radius: 0.8rem;
  border: 0.1rem solid var(--katchup_line_gray, #e2e2e2);
  background-color: ${({ theme }) => theme.colors.katchup_white};
  box-shadow: 0 0 2rem 0 rgba(0, 0, 0, 0.05);
`;
