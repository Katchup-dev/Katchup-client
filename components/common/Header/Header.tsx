import useModal from 'lib/hooks/useModal';
import { useRouter } from 'next/router';
import { IcHelp, IcLogo } from 'public/assets/icons';
import { useEffect, useRef, useState } from 'react';

import { css } from '@emotion/react';
import styled from '@emotion/styled';

import SearchBox from '../SearchBox';
import SettingModal from './SettingModal';

const Header = () => {
  const profileImgSrc = 'ddd';
  const [isShowNav, setIsShowNav] = useState(false);

  const userSetting = useModal();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  const router = useRouter();
  const { asPath } = router;

  const handleNavigate = (e: React.MouseEvent) => {
    const target = e.target as HTMLLIElement;

    if (target.innerText === '작성하기') router.push('/input/main');
    if (target.innerText === '모아보기') router.push('/output/0');
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (buttonRef.current && buttonRef.current.contains(event.target as Node)) {
      return;
    }
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      userSetting.setShowing(false);
    }
  };

  useEffect(() => {
    if (router.pathname.includes('share')) {
      setIsShowNav((prev) => !prev);
    }
  }, []);

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <>
      <StHeaderWrapper path={asPath}>
        <div>
          <IcLogo style={{ cursor: 'pointer' }} onClick={() => router.push('/')} />

          {!router.pathname.includes('share') && (
            <StMenuNav>
              <ul>
                <StMenuItem isSelected={router.pathname.includes('input')} onClick={(e) => handleNavigate(e)}>
                  작성하기
                </StMenuItem>
                <StMenuItem isSelected={router.pathname.includes('output')} onClick={(e) => handleNavigate(e)}>
                  모아보기
                </StMenuItem>
              </ul>
            </StMenuNav>
          )}
        </div>

        <div>
          <SearchBox />
          <StHelpButton type="button">
            <IcHelp />
          </StHelpButton>

          <StSettingButton type="button" onClick={userSetting.toggle} ref={buttonRef}>
            <StProfileImg src={profileImgSrc} />
          </StSettingButton>
        </div>

        <StHeaderModalWrapper ref={modalRef}>
          <SettingModal isShowing={userSetting.isShowing} />
        </StHeaderModalWrapper>
      </StHeaderWrapper>
    </>
  );
};

const StHeaderWrapper = styled.header<{ path: string }>`
  display: flex;
  align-items: center;
  justify-content: space-between;

  width: 100%;
  height: 14.5rem;

  background-color: ${({ theme }) => theme.colors.katchup_bg_gray};

  > div:nth-child(1) {
    display: flex;

    > svg {
      margin-left: 5.6rem;
      margin-right: 5.7rem;
    }
  }

  > div:nth-child(2) {
    display: flex;
    gap: 2rem;

    margin-right: 5rem;
  }

  ${({ path }) =>
    path === '/' &&
    css`
      display: none;
    `}
`;

const StMenuNav = styled.nav`
  > ul {
    display: flex;
    gap: 4.7rem;

    margin-bottom: 0.5rem;
  }
`;

const StMenuItem = styled.li<{ isSelected: boolean }>`
  align-self: center;

  width: 7rem;

  ${({ theme }) => theme.fonts.h1_title};
  padding-bottom: 0.8rem;

  cursor: pointer;

  ${({ isSelected }) =>
    isSelected
      ? css`
          color: #ff4646;
          border-bottom: 0.2rem solid #ff4646;
        `
      : css`
          color: #c2c2c2;
        `}
`;

const StHelpButton = styled.button`
  object-fit: fit;
  background-color: transparent;
  border: none;
`;

const StSettingButton = styled.button``;

const StProfileImg = styled.img`
  width: 4.5rem;
  height: 4.5rem;

  object-fit: fit;

  border: 1px solid ${({ theme }) => theme.colors.katchup_main};
  border-radius: 50%;
`;

const StHeaderModalWrapper = styled.div`
  z-index: 1;

  position: absolute;
  top: 11rem;
  right: 5rem;
`;

export default Header;
