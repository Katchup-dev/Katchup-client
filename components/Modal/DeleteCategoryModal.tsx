import styled from '@emotion/styled';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { deleteMainCategory, getMainCategoryList } from 'core/apis/output';
import { useGetMainCategoryList } from 'lib/hooks/useGetMainCategoryList';
import { useRouter } from 'next/router';
import { IcDeleteCategoryLogo } from 'public/assets/icons';
import { useEffect } from 'react';

interface DeleteCategoryModalProps {
  categoryType: string;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export default function DeleteCategoryModal(props: DeleteCategoryModalProps & { mainId: string }) {
  const { categoryType, isOpen, setIsOpen, mainId } = props;
  const { mainCategoryList } = useGetMainCategoryList();

  const queryClient = useQueryClient();
  const router = useRouter();

  const handleDeleteMainCategory = async () => {
    const nextPageIndex = Number(mainId) > 0 ? Number(mainId) - 1 : 0;
    deleteMainCategoryMutation(mainCategoryList[Number(mainId)].categoryId);
    router.replace(`/output/${nextPageIndex}`);
  };

  const { mutate: deleteMainCategoryMutation, isSuccess } = useMutation(deleteMainCategory, {
    onSuccess: () => {
      setIsOpen(false);
    },
  });

  useEffect(() => {
    if (isSuccess) {
      queryClient.invalidateQueries(['main-category']);
      console.log('mutate');
    }
  }, [isSuccess, queryClient]);

  return isOpen ? (
    <StBackgroundWrapper>
      <StDeleteCategoryModalWrapper>
        <IcDeleteCategoryLogo />

        <h1>
          {categoryType === 'main'
            ? '카테고리 내 모든 업무 파일을 삭제할까요?'
            : categoryType === 'middle'
            ? '해당 업무 내 모든 업무 카드를 삭제할까요?'
            : '선택된 업무 카드를 모두 삭제할까요?'}
        </h1>

        <h2>해당 내용은 영구 삭제되며 복구가 불가능합니다.</h2>

        <StButtonWrapper>
          <StCancelBtn onClick={() => setIsOpen(false)}>취소하기</StCancelBtn>
          <StDeleteBtn onClick={() => handleDeleteMainCategory()}>삭제하기</StDeleteBtn>
        </StButtonWrapper>
      </StDeleteCategoryModalWrapper>
    </StBackgroundWrapper>
  ) : (
    <></>
  );
}

const StBackgroundWrapper = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  width: 100%;
  height: 100%;

  background-color: rgba(36, 36, 36, 0.4);
  z-index: 3;
`;

const StDeleteCategoryModalWrapper = styled.dialog`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;

  padding: 4rem 6rem;

  width: 53.6rem;
  height: 37.8rem;
  background-color: ${({ theme }) => theme.colors.katchup_white};

  border: none;
  border-radius: 2.6rem;

  > h1 {
    margin-top: 2.8rem;
    ${({ theme }) => theme.fonts.h1_smalltitle};
  }

  > h2 {
    margin-top: 1rem;
    ${({ theme }) => theme.fonts.h2_smalltitle};

    color: ${({ theme }) => theme.colors.katchup_dark_gray};
  }
`;

const StButtonWrapper = styled.div`
  display: flex;
  gap: 1rem;
`;

const StBtnLayout = styled.button`
  margin-top: 2.8rem;

  width: 20rem;
  height: 4.5rem;

  border: none;
  border-radius: 0.8rem;

  ${({ theme }) => theme.fonts.h2_title};
  color: ${({ theme }) => theme.colors.katchup_white};
`;

const StCancelBtn = styled(StBtnLayout)`
  background-color: ${({ theme }) => theme.colors.katchup_gray};
`;

const StDeleteBtn = styled(StBtnLayout)`
  background-color: ${({ theme }) => theme.colors.katchup_main};
`;
