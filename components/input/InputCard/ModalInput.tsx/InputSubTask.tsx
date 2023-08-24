import { subTaskSelectState } from 'core/atom';
import React, { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';

import styled from '@emotion/styled';

import { DropdownSubTask } from '../../Dropdown';
import { StInputIndex } from './InputCategory';

const InputSubTask = () => {
  const [subTask, setSubTask] = useState('');
  const [subTaskCount, setSubTaskCount] = useState(0);
  const [isSubTaskFocused, setIsSubTaskFocused] = useState(false);
  const selectedSubTask = useRecoilValue(subTaskSelectState);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSubTask(e.target.value);
    setSubTaskCount(e.target.value.length);
  };

  useEffect(() => {
    setSubTask(selectedSubTask.name);
  }, [selectedSubTask]);

  return (
    <StInputSubTask isFocused={isSubTaskFocused}>
      세부 업무
      <input
        type="text"
        name="subTask"
        value={subTask}
        onChange={handleInputChange}
        onFocus={() => setIsSubTaskFocused(true)}
        onBlur={() => setIsSubTaskFocused(false)}
        placeholder="세부 업무를 입력해 주세요."
        maxLength={20}
        autoComplete="off"
      />
      {isSubTaskFocused && <DropdownSubTask inputValue={subTask} />}
      <p>
        <span>{subTaskCount}</span>/20
      </p>
    </StInputSubTask>
  );
};

export default InputSubTask;

const StInputSubTask = styled(StInputIndex)``;
