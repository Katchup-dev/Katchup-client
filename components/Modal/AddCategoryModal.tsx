import styled from '@emotion/styled';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { NEW_CATEGORY_REGEX } from 'constants/output';
import { postNewMainCategory, postNewMiddleCategory } from 'core/apis/output';
import { useGetMainCategoryList } from 'lib/hooks/useGetMainCategoryList';
import { useRouter } from 'next/router';

import { IcDeleteModal } from 'public/assets/icons';
import { useRef, useState } from 'react';

export interface AddCategoryModalProps {
  isMainCategory: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const AddCategoryModal = (props: AddCategoryModalProps) => {
  const { isMainCategory, setIsOpen } = props;
  const [warningMsg, setWarningMsg] = useState('');
  const [isCategoryAvailable, setIsCategoryAvailable] = useState(false);

  const { mainCategoryList } = useGetMainCategoryList();

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

  const handleCheckNewCategory = (e: React.ChangeEvent<HTMLInputElement>) => {
    const currentInputValue = e.target.value;

    if (NEW_CATEGORY_REGEX.test(currentInputValue)) {
      const duplicateValue = mainCategoryList && mainCategoryList.find((item) => item.name === currentInputValue);
      if (duplicateValue === undefined) {
        setIsCategoryAvailable(true);
        setWarningMsg('');
      } else {
        setIsCategoryAvailable(false);
        setWarningMsg('해당 카테고리명은 이미 존재합니다. 다른 카테고리명을 입력해 주세요.');
      }
    } else {
      setIsCategoryAvailable(false);
      if (e.target.value.length === 0) {
        setWarningMsg('');
      } else {
        setWarningMsg('이모지 및 특수기호 입력은 불가능합니다. 제외하여 입력해 주세요.');
      }
    }
  };

  const handleSpace = (e: React.ChangeEvent<HTMLInputElement>) => {
    const currentInput = e.target;
    const currentInputValue = e.target.value;

    if (currentInputValue.includes(' ')) {
      const position = currentInput.selectionStart && currentInput.selectionStart - 1;
      e.target.value = currentInputValue.replace(' ', '');
      currentInput.setSelectionRange(position, position);
    }
  };

  return (
    <StWrapper>
      <StModal>
        <StModalHeader>
          <h1>{isMainCategory ? '카테고리 추가' : '업무 추가'}</h1>

          <button onClick={() => setIsOpen(false)}>
            <IcDeleteModal />
          </button>
        </StModalHeader>

        <StModalForm>
          <h2>{isMainCategory ? '카테고리명' : '업무명'}</h2>
          <input
            type="text"
            ref={inputRef}
            onChange={(e) => {
              handleSpace(e);
              handleCheckNewCategory(e);
            }}
          />
          <p>{warningMsg}</p>
        </StModalForm>

        <StSubmitCategoryBtn onClick={(e) => handleAddCategory(e)} disabled={!isCategoryAvailable}>
          추가하기
        </StSubmitCategoryBtn>
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
  position: absolute;

  padding: 4rem 5rem 4.4rem 4rem;

  width: 58.9rem;
  height: 31.7rem;

  background-color: ${({ theme }) => theme.colors.katchup_white};

  border-radius: 2.6rem;

  > svg {
    position: absolute;
    right: 4rem;
    top: 4rem;

    cursor: pointer;
  }
`;

const StModalHeader = styled.header`
  display: flex;
  margin-bottom: 5rem;
  align-self: flex-end;

  > h1 {
    width: 100%;
    margin-right: 17.8rem;
    ${({ theme }) => theme.fonts.h1_smalltitle};
  }

  > button {
    background: none;
    border: none;
    cursor: pointer;
  }
`;

const StModalForm = styled.form`
  width: 100%;

  > h2 {
    ${({ theme }) => theme.fonts.p1_text};
  }

  > input {
    padding-left: 1.4rem;

    width: 100%;
    height: 4.5rem;

    border: 1px solid ${({ theme }) => theme.colors.katchup_line_gray};
    border-radius: 0.8rem;
  }

  > p {
    margin-top: 0.6rem;
    ${({ theme }) => theme.fonts.caption};
    color: ${({ theme }) => theme.colors.katchup_main};
  }
`;

const StSubmitCategoryBtn = styled.button<{ disabled: boolean }>`
  align-self: flex-end;
  position: relative;
  width: 11rem;
  height: 4rem;

  top: 2rem;

  background-color: ${({ disabled, theme }) => (disabled ? theme.colors.katchup_gray : theme.colors.katchup_main)};

  ${({ theme }) => theme.fonts.h3_title};

  color: ${({ theme }) => theme.colors.katchup_white};

  border: none;
  border-radius: 0.8rem;
`;

export default AddCategoryModal;