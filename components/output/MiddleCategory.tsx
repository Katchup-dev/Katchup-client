import styled from '@emotion/styled';
import { IcMore } from 'public/assets/icons';

const MiddleCategory = () => {
  return (
    <StMiddleFolder>
      <IcMore />
    </StMiddleFolder>
  );
};

export const StMiddleFolder = styled.article`
  width: 31rem;
  height: 18rem;
  position: relative;

  border: 0.1rem solid ${({ theme }) => theme.colors.katchup_line_gray};
  border-radius: 2.6rem;

  > svg {
    position: absolute;
    top: 1.2rem;
    right: 2.2rem;

    cursor: pointer;
  }
`;

export default MiddleCategory;