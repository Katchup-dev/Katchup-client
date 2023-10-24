import { css } from '@emotion/react';
import styled from '@emotion/styled';

interface Nav {
  pathname: string;
  onNavigate: (e: React.MouseEvent) => void;
}

const Nav = ({ pathname, onNavigate }: Nav) => (
  <>
    {!pathname.includes('share') && (
      <StMenuNav>
        <ul>
          {['작성하기', '모아보기'].map((item, index) => (
            <StMenuItem
              key={index}
              isSelected={pathname.includes(item === '작성하기' ? 'input' : 'output')}
              onClick={onNavigate}>
              {item}
            </StMenuItem>
          ))}
        </ul>
      </StMenuNav>
    )}
  </>
);

export default Nav;

const StMenuNav = styled.nav`
  & > ul {
    display: flex;
    gap: 4.8rem;
  }
`;

const StMenuItem = styled.li<{ isSelected: boolean }>`
  align-self: flex-end;

  width: 7rem;
  margin: 0;
  padding-bottom: 0.8rem;

  ${({ theme }) => theme.fonts.h1_title};
  cursor: pointer;

  ${({ isSelected }) =>
    isSelected
      ? css`
          color: #ff4646;
          border-bottom: 0.2rem solid #ff4646;
        `
      : css`
          color: #c2c2c2;
          border-bottom: 0.2rem solid transparent;
        `}
`;
