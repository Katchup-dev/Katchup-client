import { getProfile } from 'core/apis/auth';
import { tokenState } from 'core/atom';
import useClickOutside from 'lib/hooks/common/useClickOutside';
import useModal from 'lib/hooks/common/useModal';
import { useRouter } from 'next/router';
import { IcLogo } from 'public/assets/icons';
import { useEffect, useRef, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { UserProfileInfo } from 'types/auth';

import styled from '@emotion/styled';

import { Help } from './Help';
import { LogoHeader } from './LogoHeader';
import { Nav } from './Nav';
import { Setting } from './Setting';
import { Utility } from './Utility';

const Header = () => {
  const token = useRecoilValue(tokenState);
  const router = useRouter();
  const { pathname, push } = router;

  const [profile, setProfile] = useState<UserProfileInfo | null>();

  const help = useModal();
  const helpModalRef = useRef<HTMLDivElement>(null);
  const helpButtonRef = useRef<HTMLButtonElement>(null);

  const userSetting = useModal();
  const settingModalRef = useRef<HTMLDivElement>(null);
  const settingButtonRef = useRef<HTMLButtonElement>(null);

  const handleHelp = () => {
    if (help.isShowing) {
      help.toggle();
    }
  };

  const handleSetting = (event: MouseEvent) => {
    if (userSetting.isShowing) {
      userSetting.toggle();
    }
  };

  useClickOutside(helpModalRef, handleHelp, [helpButtonRef]);

  useClickOutside(settingModalRef, handleSetting, [settingButtonRef]);

  const getUserProfile = async () => {
    if (token) {
      const profileData = await getProfile();
      setProfile(profileData);
    }
  };

  const handleNavigate = (e: React.MouseEvent) => {
    const target = e.target as HTMLLIElement;
    if (target.innerText === '작성하기') router.push('/input/main');
    if (target.innerText === '모아보기') router.push('/output/0');
  };

  useEffect(() => {
    getUserProfile();
  }, [token]);

  if (pathname === '/') {
    return null;
  }
  if (pathname === '/withdraw/complete') {
    return <LogoHeader onClickLogo={() => push('/')} />;
  }

  return (
    <StHeaderWrapper>
      <StLeftSection>
        <IcLogo style={{ cursor: 'pointer' }} onClick={() => push('/')} />
        <Nav pathname={pathname} onNavigate={handleNavigate} />
      </StLeftSection>
      <StRightSection>
        <Utility
          profile={profile || null}
          helpButtonRef={helpButtonRef}
          settingButtonRef={settingButtonRef}
          handleHelp={help.toggle}
          handleSetting={userSetting.toggle}
        />
        <Help modalRef={helpModalRef} isShowing={help.isShowing} />
        <Setting modalRef={settingModalRef} isShowing={userSetting.isShowing} profile={profile ? profile : null} />
      </StRightSection>
    </StHeaderWrapper>
  );
};

const StHeaderWrapper = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;

  width: 100%;
  height: 14.5rem;
  padding: 5rem;

  background-color: ${({ theme }) => theme.colors.katchup_bg_gray};
`;

const StLeftSection = styled.div`
  display: flex;
  align-items: center;
  gap: 5.7rem;
`;

const StRightSection = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
`;

export default Header;
