import { postLogout } from 'core/apis/auth';
import { removeTokens } from 'core/apis/token';
import { tokenState } from 'core/atom';
import useModal from 'lib/hooks/useModal';
import { IcBtnLogout, IcBtnProfile } from 'public/assets/icons';
import { useRecoilState } from 'recoil';
import { UserProfileInfo } from 'types/auth';

import styled from '@emotion/styled';

import { ModalTwoButton } from '../Modal';
import ProfileSettingModal from './ProfileSetting/ProfileSettingModal';

interface SettingModalProps {
  isShowing: boolean;
  profile: UserProfileInfo | null;
}

const SettingModal = ({ isShowing, profile }: SettingModalProps) => {
  const profileSetting = useModal();
  const logout = useModal();
  const [, setToken] = useRecoilState(tokenState);

  const handleLogout = async () => {
    await postLogout();
    removeTokens();
    setToken('');

    logout.toggle();
    window.location.href = '/';
  };

  return isShowing ? (
    <>
      <StSettingModal>
        <StUserProfile>
          <StProfileImg src={profile ? profile.imageUrl : ''} />
          <StUserInfo>
            <strong>{profile?.nickname}</strong>
            <p>{profile?.email}</p>
          </StUserInfo>
        </StUserProfile>
        <StHr />
        <StSettingButtons>
          <StSettingButton type="button" onClick={profileSetting.toggle}>
            <IcBtnProfile />
            프로필 설정
          </StSettingButton>
          <StSettingButton type="button" onClick={logout.toggle}>
            <IcBtnLogout />
            로그아웃
          </StSettingButton>
        </StSettingButtons>
      </StSettingModal>
      <ProfileSettingModal
        isShowing={profileSetting.isShowing}
        curNickname={profile ? profile.nickname : ''}
        profileImgSrc={profile ? profile.imageUrl : ''}
        handleCancel={profileSetting.toggle}
      />
      <ModalTwoButton
        isShowing={logout.isShowing}
        contents={['Katchup에서 로그아웃할까요?']}
        leftButtonName="돌아가기"
        rightButtonName="로그아웃"
        handleLeftButton={logout.toggle}
        handleRightButton={handleLogout}
      />
    </>
  ) : null;
};

export default SettingModal;

const StSettingModal = styled.div`
  width: 30.6rem;
  height: 22.3rem;
  padding: 2.4rem;
  box-sizing: border-box;

  border-radius: 0.8rem;
  border: 0.1rem solid var(--katchup_line_gray, #e2e2e2);
  background-color: ${({ theme }) => theme.colors.katchup_white};
  box-shadow: 0 0 2rem 0 rgba(0, 0, 0, 0.05);
`;

const StUserProfile = styled.div`
  display: flex;
  align-items: center;
  gap: 1.6rem;
`;

const StHr = styled.hr`
  height: 0.1rem;
  margin: 1.9rem 0;
  box-sizing: border-box;

  border: 0;
  background-color: ${({ theme }) => theme.colors.katchup_line_gray};
`;

const StProfileImg = styled.img`
  width: 4.5rem;
  height: 4.5rem;

  object-fit: fit;

  border: 1px solid ${({ theme }) => theme.colors.katchup_main};
  border-radius: 50%;
`;

const StUserInfo = styled.div`
  & > strong {
    ${({ theme }) => theme.fonts.h2_title};
  }
  & > p {
    color: ${({ theme }) => theme.colors.katchup_dark_gray};
    ${({ theme }) => theme.fonts.p3_text};
  }
`;

const StSettingButtons = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.4rem;

  padding-top: 0.7rem;
  box-sizing: border-box;
`;

const StSettingButton = styled.button`
  display: flex;
  justify-content: left;
  align-items: center;
  gap: 2rem;

  color: ${({ theme }) => theme.colors.katchup_dark_gray};
  ${({ theme }) => theme.fonts.h2_smalltitle};

  cursor: pointer;
`;
