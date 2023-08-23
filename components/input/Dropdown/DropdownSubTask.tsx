import { subTaskSelectState, taskSelectState } from 'core/atom';
import { useGetSubTasks } from 'lib/hooks/input/useGetIndex';
import { usePostSubTask } from 'lib/hooks/input/usePostIndex';
import { IcBtnAddIndex } from 'public/assets/icons';
import { useRecoilState } from 'recoil';
import { InputSubTaskInfo } from 'types/input';

import styled from '@emotion/styled';

interface dropdownIndexProps {
  inputValue: string;
}

const DropdownSubTask = ({ inputValue }: dropdownIndexProps) => {
  let isAdd = true;
  let addArr: InputSubTaskInfo[] = [];
  const [taskSelect, setTaskSelect] = useRecoilState(taskSelectState);
  const [subTaskSelect, setSubTaskSelect] = useRecoilState(subTaskSelectState);
  const { subTasks, isSubTasksLoading, isSubTasksError } = useGetSubTasks(taskSelect.taskId);
  const postSubTask = usePostSubTask();

  const handleOptionClick = (option: InputSubTaskInfo) => {
    setSubTaskSelect(option);
  };

  const handleAddIndex = (name: string) => {
    const subTaskData = { taskId: taskSelect.taskId, name: inputValue };
    postSubTask.createSubTask(subTaskData);
  };

  const displayNewOptions = () => {
    if (inputValue?.length > 0 && subTasks) {
      if (!subTasks.find((option) => option.name === inputValue)) {
        addArr = [...addArr, { subTaskId: subTasks.length, name: inputValue }];
      } else {
        isAdd = false;
      }
    }
    return addArr.map((option, idx) => (
      <li>
        {option.name}
        <IcBtnAddIndex
          onMouseDown={() => {
            handleAddIndex(option.name);
          }}
        />
      </li>
    ));
  };

  return (
    <StDropdown>
      {displayNewOptions()}
      {subTasks?.map((option, idx) => (
        <li key={idx} onMouseDown={() => handleOptionClick(option)}>
          {option.name}
        </li>
      ))}
    </StDropdown>
  );
};

export default DropdownSubTask;

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

  @media (max-height: '20rem') {
    height: 20rem;
    overflow: hidden;
  }
`;
