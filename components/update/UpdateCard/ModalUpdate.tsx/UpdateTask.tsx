import { categorySelectState, taskSelectState } from 'core/atom';
import React, { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';

import styled from '@emotion/styled';

import { DropdownTask } from '../../Dropdown';
import { StInputIndex } from './UpdateCategory';

interface UpdateTaskProps {
  prevTaskId: number;
  prevTaskName: string;
}

const UpdateTask = (props: UpdateTaskProps) => {
  const { prevTaskId, prevTaskName } = props;
  const [task, setTask] = useState('');
  const [taskCount, setTaskCount] = useState(0);
  const [isTaskFocused, setIsTaskFocused] = useState(false);
  const selectedCategory = useRecoilValue(categorySelectState);
  const [selectedTask, setSelectedTask] = useRecoilState(taskSelectState);

  useEffect(() => {
    setSelectedTask({
      taskId: prevTaskId,
      name: prevTaskName,
    });
    setTask(prevTaskName);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTask(e.target.value);
    setTaskCount(e.target.value.length);
  };

  useEffect(() => {
    setTask(selectedTask.name);
  }, [selectedTask]);

  return (
    <StInputTask isFocused={isTaskFocused}>
      업무
      <input
        type="text"
        name="task"
        value={task}
        onChange={handleInputChange}
        onFocus={() => setIsTaskFocused(true)}
        onBlur={() => setIsTaskFocused(false)}
        placeholder="업무를 입력해 주세요."
        maxLength={20}
        disabled={selectedCategory.categoryId === 0 ? true : false}
        autoComplete="off"
      />
      {isTaskFocused && <DropdownTask inputValue={task} />}
      <p>
        <span>{taskCount}</span>/20
      </p>
    </StInputTask>
  );
};

export default UpdateTask;

const StInputTask = styled(StInputIndex)``;
