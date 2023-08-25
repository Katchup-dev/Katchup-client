import styled from '@emotion/styled';
import { useState } from 'react';
import DeleteCategoryModal from './DeleteCategoryModal';
import { IcDeleteMiddleCategory, IcEditMiddleCategory } from 'public/assets/icons';
import PatchCategoryModal from './PatchCategoryModal';

interface MiddleCategoryMoreModalProps {
  setIsMoreModalOpen?: (isMoreModalOpen: boolean) => void;
  folderIdx: number;
  isOpen: boolean;
  mainId: string;
}

export default function MiddleCategoryMoreModal(props: MiddleCategoryMoreModalProps) {
  const { mainId, setIsMoreModalOpen, folderIdx, isOpen } = props;
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  return isOpen ? (
    <StMiddleCategoryMoreModalWrapper>
      <StEditBtn onClick={() => setIsEditModalOpen(true)}>
        <IcEditMiddleCategory />
        <p>수정하기</p>
      </StEditBtn>
      <StDeleteBtn onClick={() => setIsDeleteModalOpen(true)}>
        <IcDeleteMiddleCategory />
        <p>삭제하기</p>
      </StDeleteBtn>
      {isDeleteModalOpen && (
        <DeleteCategoryModal
          setIsMoreModalOpen={setIsMoreModalOpen}
          folderIdx={folderIdx}
          categoryType="middle"
          isOpen={isDeleteModalOpen}
          setIsOpen={setIsDeleteModalOpen}
        />
      )}
      {isEditModalOpen && (
        <PatchCategoryModal
          folderIdx={folderIdx}
          mainId={mainId}
          isMainCategory={false}
          isOpen={isEditModalOpen}
          setIsOpen={setIsEditModalOpen}
          setIsMoreModalOpen={setIsMoreModalOpen}
        />
      )}
    </StMiddleCategoryMoreModalWrapper>
  ) : (
    <></>
  );
}

const StMiddleCategoryMoreModalWrapper = styled.dialog`
  display: flex;
  flex-direction: column;
  gap: 2rem;

  padding: 1.9rem 0rem 2.2rem 2.8rem;
  width: 30.6rem;
  height: 11.3rem;

  border: 1px solid ${({ theme }) => theme.colors.katchup_line_gray};
  border-radius: 0.8rem;
  background-color: ${({ theme }) => theme.colors.katchup_white};
`;

const StBtnLayout = styled.button`
  display: flex;
  align-items: center;
  gap: 1.3rem;

  width: 100%;

  border: none;
  background-color: ${({ theme }) => theme.colors.katchup_white};

  > p {
    ${({ theme }) => theme.fonts.h2_smalltitle};
  }
`;

const StEditBtn = styled(StBtnLayout)`
  border-top: 0.8rem;
`;

const StDeleteBtn = styled(StBtnLayout)`
  border-bottom: 0.8rem;
`;
