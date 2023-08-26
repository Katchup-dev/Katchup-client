import styled from '@emotion/styled';
import MiddleCategoryMoreModal from 'components/Modal/MiddleCategoryMoreModal';
import { IcMore } from 'public/assets/icons';
import { useState } from 'react';

interface MiddleCategoryProps {
  categoryName: string;
  folderId: number;
  handleClick: (id: number) => void;
}

const MiddleCategory = (props: MiddleCategoryProps & { mainId: string }) => {
  const { categoryName, folderId, handleClick, mainId } = props;
  const [isMoreModalOpen, setIsMoreModalOpen] = useState(false);

  const handleMoreButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setIsMoreModalOpen(!isMoreModalOpen);
  };

  return (
    <>
      <StMiddleFolder onClick={() => handleClick(folderId)}>
        <StMoreButton onClick={(e) => handleMoreButtonClick(e)}>
          <IcMore />
        </StMoreButton>
        <div>
          <h2>{categoryName}</h2>
        </div>
        {isMoreModalOpen && (
          <StMiddleCategoryMoreModalContainer>
            <MiddleCategoryMoreModal
              mainId={mainId}
              setIsMoreModalOpen={setIsMoreModalOpen}
              folderIdx={folderId}
              isOpen={isMoreModalOpen}
            />
          </StMiddleCategoryMoreModalContainer>
        )}
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

const StMiddleCategoryMoreModalContainer = styled.section`
  position: absolute;
  top: -4rem;
  right: -2.1rem;

  z-index: 3;
`;

const StMoreButton = styled.button`
  border: none;
  background: none;

  position: absolute;
  top: 1.2rem;
  right: 2.2rem;

  cursor: pointer;
`;

export default MiddleCategory;
