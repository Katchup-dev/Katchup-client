import styled from '@emotion/styled';
import { IcBtnAddIndex } from 'public/assets/icons';

interface KeyworkProps {
  background: string;
  color: string;
}

interface DropdownKeywordProps {
  inputValue: string;
  keywordColor: KeyworkProps;
}

const DropdownKeyword = ({ inputValue, keywordColor }: DropdownKeywordProps) => {
  return (
    <StDropdown>
      <li>{inputValue && <DropdownKeyworkText keywordColor={keywordColor}>{inputValue}</DropdownKeyworkText>}</li>
    </StDropdown>
  );
};

export default DropdownKeyword;

const StDropdown = styled.ul`
  position: absolute;
  top: 7.2rem;

  z-index: 1;

  width: 100%;
  height: max-content;
  max-height: 20rem;
  overflow-y: auto;

  overflow: scroll;
  padding: 1.2rem 1.4rem;

  border: 0.1rem solid #e2e2e2;
  border-radius: 0 0 0.8rem 0.8rem;
  box-shadow: 0 0.2rem 0.4rem rgba(0, 0, 0, 0.23);
  background-color: ${({ theme }) => theme.colors.katchup_white};

  & > li {
    display: flex;
    justify-content: space-between;

    margin-bottom: 1rem;

    ${({ theme }) => theme.fonts.h2_smalltitle};

    cursor: pointer;

    & > svg {
      display: block;

      margin-bottom: -1rem;
    }
  }
`;

const DropdownKeyworkText = styled.div<{ keywordColor: KeyworkProps }>`
  padding: 0.5rem 1rem;

  border-radius: 0.8rem;
  background-color: ${({ keywordColor }) => keywordColor.background};
  color: ${({ keywordColor }) => keywordColor.color};

  font-family: Pretendard;
  font-size: 1.3rem;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`;
