import styled from '@emotion/styled';

interface SettingModalProps {
  isShowing: boolean;
}
const SettingModal = ({ isShowing }: SettingModalProps) => {
  return isShowing ? <StSettingModal>SettingModal</StSettingModal> : null;
};

export default SettingModal;

const StSettingModal = styled.div`
  width: 30.6rem;
  height: 22.3rem;

  border-radius: 0.8rem;
  background-color: ${({ theme }) => theme.colors.katchup_white};
`;
