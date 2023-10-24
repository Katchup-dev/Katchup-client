import { getProfile } from 'core/apis/auth';
import { tokenState } from 'core/atom';
import useModal from 'lib/hooks/useModal';
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
  const userSetting = useModal();
  const help = useModal();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  const [profile, setProfile] = useState<UserProfileInfo | null>();

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

  const handleClickOutside = (event: MouseEvent) => {
    console.log(event.target);
    if (buttonRef.current && buttonRef.current.contains(event.target as Node)) return;
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      userSetting.setShowing(false);
    }
  };

  useEffect(() => {
    getUserProfile();
  }, [token]);

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

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
          buttonRef={buttonRef}
          handleHelp={help.toggle}
          handleSetting={userSetting.toggle}
        />
        <Help isShowing={help.isShowing} />
        <Setting modalRef={modalRef} isShowing={userSetting.isShowing} profile={profile ? profile : null} />
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
