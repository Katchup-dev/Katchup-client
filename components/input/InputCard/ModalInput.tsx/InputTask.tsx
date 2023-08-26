import { categorySelectState, taskSelectState } from 'core/atom';
import React, { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';

import styled from '@emotion/styled';

import { DropdownTask } from '../../Dropdown';
import { StInputIndex } from './InputCategory';

const InputTask = () => {
  const [task, setTask] = useState('');
  const [taskCount, setTaskCount] = useState(0);
  const [isTaskFocused, setIsTaskFocused] = useState(false);
  const selectedCategory = useRecoilValue(categorySelectState);
  const selectedTask = useRecoilValue(taskSelectState);

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

export default InputTask;

const StInputTask = styled(StInputIndex)``;
