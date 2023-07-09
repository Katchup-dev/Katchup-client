import { postFolders } from 'core/apis/input';
import { categorySelectState, folderSelectState } from 'core/atom';
import { IcBtnAddIndex } from 'public/assets/icons';
import { useRecoilState } from 'recoil';
import { InputFolderInfo } from 'types/input';

import styled from '@emotion/styled';

interface dropdownIndexProps {
  options: InputFolderInfo[];
  inputValue: string;
}

const DropdownFolder = ({ options, inputValue }: dropdownIndexProps) => {
  const [folderSelect, setFolderSelect] = useRecoilState(folderSelectState);
  const [categorySelect, setCategorySelect] = useRecoilState(categorySelectState);

  const handleOptionClick = (option: InputFolderInfo) => {
    setFolderSelect(option);
  };

  const handleAddIndex = (name: string) => {
    postFolders({ categoryId: categorySelect.categoryId, name: inputValue });
  };

  const displayOptions = () => {
    let allOptions = Array.isArray(options) ? options : [];

    if (inputValue?.length > 0) {
      allOptions.push({ folderId: allOptions.length, name: inputValue });
    }

    return allOptions.map((option) => (
      <li key={option.folderId} onMouseDown={() => handleOptionClick(option)}>
        {option.name}
        {inputValue && (
          <IcBtnAddIndex
            onMouseDown={() => {
              handleAddIndex(option.name);
            }}
          />
        )}
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
    display: flex;
    justify-content: space-between;

    margin-bottom: 1rem;

    ${({ theme }) => theme.fonts.h2_smalltitle};

    cursor: pointer;

    & > svg {
      display: none;

      margin-bottom: -1rem;
    }
    :last-child > svg {
      display: block;
    }
  }
`;
