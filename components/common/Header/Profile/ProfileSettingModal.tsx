import {
  StCardModal,
  StModalWrapper,
  StNextBtn
} from 'components/input/InputCard/ModalCard';
import { IcBtnDeletePopup } from 'public/assets/icons';

import styled from '@emotion/styled';

import InputImage from './InputImage';
import InputMemo from './InputMemo';
import InputNickname from './InputNickname';

interface ProfileSettingModalProps {
  isShowing: boolean;
  curNickname: string;
  profileImgSrc: string;
  handleCancel: () => void;
}

const ProfileSettingModal = ({ isShowing, curNickname, profileImgSrc, handleCancel }: ProfileSettingModalProps) => {
  return isShowing ? (
    <StProfileSettingModalWrapper>
      <StProfileSettingModal>
        <IcBtnDeletePopup onClick={handleCancel} />
        <h2>프로필 설정</h2>
        <InputImage profileImgSrc={profileImgSrc} />
        <InputNickname curNickname={curNickname} />
        <InputMemo />
        <StBottomButtons>
          <StWithdrawalBtn
            type="button"
            onClick={() => {
              window.location.href = '/withdraw';
            }}>
            계정 탈퇴하기
          </StWithdrawalBtn>
          <StSaveBtn type="button" disabled={true} onClick={() => {}}>
            저장하기
          </StSaveBtn>
        </StBottomButtons>
      </StProfileSettingModal>
    </StProfileSettingModalWrapper>
  ) : null;
};

export default ProfileSettingModal;

const StProfileSettingModalWrapper = styled(StModalWrapper)``;

const StProfileSettingModal = styled(StCardModal)`
  width: 58.9rem;
  height: 64.4rem;
`;

const StBottomButtons = styled.div`
  display: flex;
  justify-content: space-between;

  padding-top: 4.4rem;
`;

const StWithdrawalBtn = styled.button`
  color: ${({ theme }) => theme.colors.katchup_gray};
  ${({ theme }) => theme.fonts.p2_text};
  text-decoration: underline;
`;

const StSaveBtn = styled(StNextBtn)`
  margin: 0;

  border: none;
`;
