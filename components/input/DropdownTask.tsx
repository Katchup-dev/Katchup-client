import { postTasks } from 'core/apis/input';
import { folderSelectState, taskSelectState } from 'core/atom';
import { IcBtnAddIndex } from 'public/assets/icons';
import { useRecoilState } from 'recoil';
import { InputTaskInfo } from 'types/input';

import styled from '@emotion/styled';

interface dropdownIndexProps {
  options: InputTaskInfo[];
  inputValue: string;
}

const DropdownTask = ({ options, inputValue }: dropdownIndexProps) => {
  const [folderSelect, setFolderSelect] = useRecoilState(folderSelectState);
  const [taskSelect, setTaskSelect] = useRecoilState(taskSelectState);

  const handleOptionClick = (option: InputTaskInfo) => {
    setTaskSelect(option);
  };

  const handleAddIndex = (name: string) => {
    postTasks({ folderId: folderSelect.folderId, name: inputValue }); // id 바꿔야함
  };

  const displayOptions = () => {
    const allOptions = [...options];

    if (inputValue?.length > 0) {
      allOptions.push({ taskId: allOptions.length, name: inputValue });
    }

    return allOptions.map((option) => (
      <li key={option.taskId} onMouseDown={() => handleOptionClick(option)}>
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

export default DropdownTask;

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
