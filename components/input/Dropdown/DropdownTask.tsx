import { categorySelectState, taskSelectState } from 'core/atom';
import { useGetTasks } from 'lib/hooks/input/useGetIndex';
import { usePostTask } from 'lib/hooks/input/usePostIndex';
import { IcBtnAddIndex } from 'public/assets/icons';
import { useRecoilState, useRecoilValue } from 'recoil';
import { InputTaskInfo } from 'types/input';

import styled from '@emotion/styled';

interface dropdownIndexProps {
  inputValue: string;
  setIsTaskFocused: React.Dispatch<React.SetStateAction<boolean>>;
}

const DropdownTask = ({ inputValue, setIsTaskFocused }: dropdownIndexProps) => {
  let isAdd = true;
  let addArr: InputTaskInfo[] = [];
  const [, setTaskSelect] = useRecoilState(taskSelectState);
  const categorySelect = useRecoilValue(categorySelectState);
  const { tasks } = useGetTasks(categorySelect.categoryId);
  const postTask = usePostTask();

  const handleOptionClick = (option: InputTaskInfo) => {
    setTaskSelect(option);
  };

  const handleAddIndex = (name: string) => {
    const taskData = { categoryId: categorySelect.categoryId, name: inputValue };
    postTask.createTask(taskData);
    setIsTaskFocused(false);
  };

  const displayNewOptions = () => {
    if (inputValue?.length > 0 && tasks) {
      if (!tasks?.find((option) => option.name === inputValue)) {
        addArr = [...addArr, { taskId: tasks.length, name: inputValue }];
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
      {tasks?.map((option, idx) => (
        <li key={idx} onMouseDown={() => handleOptionClick(option)}>
          {option.name}
        </li>
      ))}
    </StDropdown>
  );
};

export default DropdownTask;

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
