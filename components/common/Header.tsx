import styled from '@emotion/styled';
import { IcHelp, IcLogo } from 'public/assets/icons';
import SearchBox from './SearchBox';
import { css } from '@emotion/react';

export interface HeaderProps {
  isInput: boolean;
  profileImgSrc: string;
}

const Header = (props: HeaderProps) => {
  const { isInput, profileImgSrc } = props;

  return (
    <>
      <StHeaderWrapper>
        <div>
          <IcLogo />

          <StMenuNav>
            <ul>
              <StMenuItem isSelected={true}>작성하기</StMenuItem>
              <StMenuItem isSelected={false}>모아보기</StMenuItem>
            </ul>
          </StMenuNav>
        </div>

        <div>
          <SearchBox />
          <StHelpButton>
            <IcHelp />
          </StHelpButton>

          <StProfileImg src={profileImgSrc} />
        </div>
      </StHeaderWrapper>
    </>
  );
};

const StHeaderWrapper = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;

  width: 100%;
  height: 14.5rem;

  border: 1px solid black;

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

const StProfileImg = styled.img`
  width: 4.5rem;
  height: 4.5rem;

  object-fit: fit;

  border: 1px solid ${({ theme }) => theme.colors.katchup_main};
  border-radius: 50%;
`;

export default Header;
