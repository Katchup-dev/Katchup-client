import styled from '@emotion/styled';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { postNewMainCategory, postNewMiddleCategory } from 'core/apis/output';
import { useRouter } from 'next/router';

import { IcDeleteModal } from 'public/assets/icons';
import { useRef } from 'react';

export interface AddCategoryModalProps {
  isMainCategory: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const AddCategoryModal = (props: AddCategoryModalProps) => {
  const { isMainCategory, setIsOpen } = props;

  const inputRef = useRef<HTMLInputElement>(null);

  const router = useRouter();
  const { mainId } = router.query;

  //넣자마자 바로 반영되게 하는 로직
  const queryClient = useQueryClient();

  const { mutate: mutateMainCategory } = useMutation(postNewMainCategory, {
    onSuccess: () => {
      setIsOpen(false);
      queryClient.invalidateQueries(['main-category']);
    },
  });

  const postNewMiddleCategoryMutation = (params: { categoryId: number; name: string }) => {
    const { categoryId, name } = params;
    return postNewMiddleCategory(categoryId, name);
  };

  const { mutate: mutateMiddleCategory } = useMutation(postNewMiddleCategoryMutation, {
    onSuccess: () => {
      setIsOpen(false);
      queryClient.invalidateQueries(['middle-category']);
    },
  });

  const handleAddCategory = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (inputRef.current) {
      if (isMainCategory) {
        mutateMainCategory(inputRef.current.value);
      } else {
        mutateMiddleCategory({ categoryId: Number(mainId), name: inputRef.current.value });
      }
    }
  };

  return (
    <StWrapper>
      <StModal>
        <IcDeleteModal onClick={() => setIsOpen(false)} />
        <h1>업무 대분류 추가</h1>

        <h2>{isMainCategory ? '대분류명' : '중분류명'}</h2>

        <input type="text" ref={inputRef} />

        <button onClick={(e) => handleAddCategory(e)}>추가하기</button>
      </StModal>
    </StWrapper>
  );
};

const StWrapper = styled.div`
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

const StModal = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;

  padding: 4rem 5rem 4.4rem 4rem;

  width: 58.9rem;
  height: 31.7rem;

  background-color: ${({ theme }) => theme.colors.katchup_white};

  border-radius: 2.6rem;

  > h1 {
    margin-bottom: 5rem;

    ${({ theme }) => theme.fonts.h1_smalltitle};
  }

  > svg {
    position: absolute;
    right: 4rem;
    top: 4rem;

    cursor: pointer;
  }

  > h2 {
    align-self: flex-start;
    margin-bottom: 0.4rem;

    ${({ theme }) => theme.fonts.p1_text};
  }

  > input {
    padding-left: 1.4rem;

    width: 100%;
    height: 4.5rem;

    border: 1px solid ${({ theme }) => theme.colors.katchup_line_gray};
    border-radius: 0.8rem;
  }

  > button {
    margin-top: 4rem;

    width: 11rem;
    height: 4rem;

    display: flex;
    justify-content: center;
    align-items: center;
    align-self: flex-end;

    background-color: ${({ theme }) => theme.colors.katchup_main};

    ${({ theme }) => theme.fonts.h3_title};

    color: ${({ theme }) => theme.colors.katchup_white};

    border: none;
    border-radius: 0.8rem;
  }
`;

export default AddCategoryModal;
