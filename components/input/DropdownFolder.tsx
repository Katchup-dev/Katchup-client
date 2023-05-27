import { folderSelectState } from 'core/atom';
import { useRecoilState } from 'recoil';
import { InputFolderInfo } from 'types/input';

import styled from '@emotion/styled';

interface dropdownIndexProps {
  options: InputFolderInfo[];
}

const DropdownFolder = ({ options }: dropdownIndexProps) => {
  const [folderSelect, setFolderSelect] = useRecoilState(folderSelectState);

  const handleOptionClick = (option: InputFolderInfo) => {
    setFolderSelect(option);
  };

  const displayOptions = () => {
    return options.map((option) => (
      <li key={option.folderId} onClick={() => handleOptionClick(option)}>
        {option.name}
      </li>
    ));
  };

  return <StDropdown>{displayOptions()}</StDropdown>;
};

export default DropdownFolder;

const StDropdown = styled.ul`
  position: absolute;
  top: 7.2rem;

  z-index: 1;

  width: 53.4rem;
  padding: 1.2rem 1.4rem;

  border: 0.1rem solid #e2e2e2;
  border-radius: 0 0 0.8rem 0.8rem;
  box-shadow: 0 0.2rem 0.4rem rgba(0, 0, 0, 0.23);
  background-color: ${({ theme }) => theme.colors.katchup_white};

  & > li {
    margin-bottom: 1rem;

    ${({ theme }) => theme.fonts.h2_smalltitle};
  }
`;
