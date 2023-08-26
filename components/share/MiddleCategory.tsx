import styled from '@emotion/styled';

interface MiddleCategoryProps {
  categoryName: string;
  folderId: number;
  handleClick: (id: number) => void;
}

const MiddleCategory = (props: MiddleCategoryProps & { mainId: string }) => {
  const { categoryName, folderId, handleClick, mainId } = props;

  return (
    <>
      <StMiddleFolder onClick={() => handleClick(folderId)}>
        <div>
          <h2>{categoryName}</h2>
        </div>
      </StMiddleFolder>
    </>
  );
};

export const StMiddleFolder = styled.article`
  width: 31rem;
  height: 18rem;
  position: relative;

  border: 0.1rem solid ${({ theme }) => theme.colors.katchup_line_gray};
  border-radius: 2.6rem;

  cursor: pointer;

  > div {
    position: absolute;
    left: 3rem;
    bottom: 2.6rem;

    border-left: 0.4rem solid ${({ theme }) => theme.colors.katchup_main};

    > h2 {
      margin-left: 1.6rem;

      ${({ theme }) => theme.fonts.h2_bigtitle_eng};
    }
  }
`;

export default MiddleCategory;
