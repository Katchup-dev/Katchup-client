import { categorySelectState, folderSelectState } from 'core/atom';
import { useGetFolders } from 'lib/hooks/useGetIndex';
import { usePostFolder } from 'lib/hooks/usePostIndex';
import { IcBtnAddIndex } from 'public/assets/icons';
import { useRecoilState } from 'recoil';
import { InputFolderInfo } from 'types/input';

import styled from '@emotion/styled';

interface dropdownIndexProps {
  inputValue: string;
  setIsTaskFocused: React.Dispatch<React.SetStateAction<boolean>>;
}

const DropdownFolder = ({ inputValue, setIsTaskFocused }: dropdownIndexProps) => {
  let isAdd = true;
  let addArr: InputFolderInfo[] = [];
  const { folders, isFoldersLoading, isFoldersError } = useGetFolders();
  const [folderSelect, setFolderSelect] = useRecoilState(folderSelectState);
  const [categorySelect, setCategorySelect] = useRecoilState(categorySelectState);
  const postFolder = usePostFolder();

  const handleOptionClick = (option: InputFolderInfo) => {
    setFolderSelect(option);
  };

  const handleAddIndex = (name: string) => {
    const folderData = { categoryId: categorySelect.categoryId, name: inputValue };
    postFolder.createFolder(folderData);
    setIsTaskFocused(false);
  };

  const displayNewOptions = () => {
    if (inputValue?.length > 0 && folders) {
      if (!folders?.find((option) => option.name === inputValue)) {
        addArr = [...addArr, { folderId: folders.length, name: inputValue }];
      } else {
        isAdd = false;
      }
    }

    return addArr.map((option, idx) => (
      <li>
        {option.name}
        {isAdd && inputValue && (
          <IcBtnAddIndex
            onMouseDown={() => {
              handleAddIndex(option.name);
            }}
          />
        )}
      </li>
    ));
  };

  return (
    <StDropdown>
      {displayNewOptions()}
      {folders?.map((option, idx) => (
        <li key={idx} onMouseDown={() => handleOptionClick(option)}>
          {option.name}
        </li>
      ))}
    </StDropdown>
  );
};

export default DropdownFolder;

const StDropdown = styled.ul`
  position: absolute;
  top: 7.2rem;

  height: max-content;
  max-height: 20rem;
  overflow-y: auto;

  z-index: 1;

  width: 100%;
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
