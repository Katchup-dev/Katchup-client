import { Dispatch, SetStateAction } from 'react';

import styled from '@emotion/styled';

interface CheckboxProps {
  reason: string;
  setReason: Dispatch<SetStateAction<string[]>>;
}

const Checkbox = ({ reason, setReason }: CheckboxProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setReason((prev) => (e.target.checked ? [...prev, e.target.name] : prev.filter((r) => r !== e.target.name)));
  };

  return (
    <StCheckboxWrapper htmlFor={reason}>
      <input type="checkbox" id={reason} name={reason} onChange={handleChange} />
      {reason}
    </StCheckboxWrapper>
  );
};

export default Checkbox;

export const StCheckboxWrapper = styled.label`
  display: flex;
  gap: 2.4rem;

  margin-bottom: 1.6rem;

  color: ${({ theme }) => theme.colors.katchup_dark_gray};
  ${({ theme }) => theme.fonts.h2_title};
`;
