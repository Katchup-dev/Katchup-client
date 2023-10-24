import { StInputIndex } from 'components/input/InputCard/ModalInput.tsx/InputCategory';
import { useState } from 'react';

import styled from '@emotion/styled';

interface InputNicknameProps {
  curNickname: string;
}

const InputNickname = ({ curNickname }: InputNicknameProps) => {
  const [nickname, setNickname] = useState(curNickname);
  const [nicknameCount, setNicknameCount] = useState(0);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value);
    setNicknameCount(e.target.value.length);
  };

  return (
    <StInputNickname>
      닉네임
      <input
        type="text"
        name="category"
        value={nickname}
        onChange={handleInputChange}
        placeholder="닉네임을 입력해주세요."
        maxLength={20}
        autoComplete="off"
      />
      <p>{nicknameCount}/20</p>
    </StInputNickname>
  );
};

export default InputNickname;

const StInputNickname = styled(StInputIndex)``;
