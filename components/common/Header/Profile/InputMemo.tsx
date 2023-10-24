import { StInputIndex } from 'components/input/InputCard/ModalInput.tsx/InputCategory';
import { useState } from 'react';

import styled from '@emotion/styled';

const InputMemo = () => {
  const [memo, setMemo] = useState('');
  const [memoCount, setMemoCount] = useState(0);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMemo(e.target.value);
    setMemoCount(e.target.value.length);
  };

  return (
    <StInputMemo>
      한 줄 메모
      <textarea
        value={memo}
        name="memo"
        onChange={handleInputChange}
        placeholder="한 줄 메모를 입력해주세요."
        maxLength={100}
      />
      <p>{memoCount}/100</p>
    </StInputMemo>
  );
};

export default InputMemo;

const StInputMemo = styled(StInputIndex)`
  & > textarea {
    height: 12.8rem;
    padding: 1.4rem 1.4rem 4rem 1.4rem;

    border: 0.1rem solid ${({ theme }) => theme.colors.katchup_line_gray};
    border-radius: 0.8rem;
    ${({ theme }) => theme.fonts.h2_smalltitle};

    outline: none;
    resize: none;

    ::placeholder {
      color: ${({ theme }) => theme.colors.katchup_gray};
    }
  }

  & > p {
    position: absolute;
    top: 12.2rem;
  }
`;
