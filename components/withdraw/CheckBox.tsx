import { IcCheckAfter, IcCheckBefore } from 'public/assets/icons';
import { Dispatch, SetStateAction } from 'react';

import styled from '@emotion/styled';

interface CheckboxProps {
  reason: string;
  setReason?: Dispatch<SetStateAction<string[]>>;
  handleCustom?: () => void;
}

const Checkbox = ({ reason, setReason, handleCustom }: CheckboxProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setReason &&
      setReason((prev) => (e.target.checked ? [...prev, e.target.name] : prev.filter((r) => r !== e.target.name)));
  };

  return (
    <StCheckboxWrapper htmlFor={reason}>
      <StCheckbox type="checkbox" id={reason} name={reason} onChange={handleCustom ?? handleChange} />
      <StCheckIconWrapper>
        <IcCheckBefore className="checkBefore" />
        <IcCheckAfter className="checkAfter" />
      </StCheckIconWrapper>
      {reason}
    </StCheckboxWrapper>
  );
};

export default Checkbox;

export const StCheckboxWrapper = styled.label`
  display: flex;
  align-items: center;
  gap: 1.8rem;

  margin-bottom: 1.6rem;

  color: ${({ theme }) => theme.colors.katchup_dark_gray};
  ${({ theme }) => theme.fonts.h2_title};
`;

export const StCheckIconWrapper = styled.div`
  position: relative;

  & > .checkBefore {
    display: block;
  }

  & > .checkAfter {
    display: none;
  }
`;

export const StCheckbox = styled.input`
  display: none;

  &:checked + ${StCheckIconWrapper} > .checkBefore {
    display: none;
  }

  &:checked + ${StCheckIconWrapper} > .checkAfter {
    display: block;
  }
`;
