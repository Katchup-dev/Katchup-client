import styled from '@emotion/styled';
import { IcMore } from 'public/assets/icons';

interface MiddleCategoryProps {
  categoryName: string;
}

const MiddleCategory = (props: MiddleCategoryProps) => {
  const { categoryName } = props;
  return (
    <StMiddleFolder>
      <IcMore />
      <div>
        <h2>{categoryName}</h2>
      </div>
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

  > div {
    position: absolute;
    left: 3rem;
    bottom: 2.6rem;

    ${({ theme }) => theme.fonts.h2_bigtitle_eng};
    border-left: 0.4rem solid ${({ theme }) => theme.colors.katchup_main};

    > h2 {
      margin-left: 1.6rem;
    }
  }
`;

export default MiddleCategory;
