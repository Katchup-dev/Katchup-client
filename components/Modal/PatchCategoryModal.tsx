import styled from '@emotion/styled';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { NEW_CATEGORY_REGEX } from 'constants/output';
import { patchMainCategory, patchMiddleCategory, postNewMiddleCategory } from 'core/apis/output';
import { memberId } from 'core/atom';
import { useGetMainCategoryList } from 'lib/hooks/useGetMainCategoryList';
import { useGetMiddleCategoryList } from 'lib/hooks/useGetMiddleCategory';

import { IcDeleteModal } from 'public/assets/icons';
import { useEffect, useRef, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { MiddleCategoryInfo, mainCategoryInfo } from 'types/output';

export interface PatchCategoryModalProps {
  folderIdx?: number;
  isMainCategory: boolean;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  setIsMoreModalOpen?: (isMoreModalOpen: boolean) => void;
}

const PatchCategoryModal = (props: PatchCategoryModalProps & { mainId: string }) => {
  const { folderIdx, isMainCategory, isOpen, setIsOpen, setIsMoreModalOpen, mainId } = props;
  const [warningMsg, setWarningMsg] = useState('');
  const [isCategoryAvailable, setIsCategoryAvailable] = useState(true);
  const [initialValue, setInitialValue] = useState('');

  useEffect(() => {
    if (inputRef.current) setInitialValue(inputRef.current.value);
  }, []);

  const userMemberId = useRecoilValue(memberId);
  const { mainCategoryList } = useGetMainCategoryList(userMemberId);
  const { middleCategoryList } = useGetMiddleCategoryList(
    mainCategoryList && mainCategoryList[Number(mainId)]?.categoryId,
  );

  const inputRef = useRef<HTMLInputElement>(null);

  //넣자마자 바로 반영되게 하는 로직
  const queryClient = useQueryClient();

  const patchNewMainCategory = (params: { categoryId: number; name: string }) => {
    const { categoryId, name } = params;
    return patchMainCategory(categoryId, name);
  };

  const { mutate: mutateMainCategory } = useMutation(patchNewMainCategory, {
    onSuccess: () => {
      setIsOpen(false);
      queryClient.invalidateQueries(['main-category']);
    },
  });

  const patchNewMiddleCategory = (params: { taskId: number; name: string }) => {
    const { taskId, name } = params;
    return patchMiddleCategory(taskId, name);
  };

  const { mutate: mutateMiddleCategory } = useMutation(patchNewMiddleCategory, {
    onSuccess: () => {
      setIsOpen(false);
      if (setIsMoreModalOpen) setIsMoreModalOpen(false);
      queryClient.invalidateQueries(['middle-category']);
    },
  });

  const handlePatchCategory = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (inputRef.current) {
      if (isMainCategory) {
        mutateMainCategory({
          categoryId: mainCategoryList && mainCategoryList[Number(mainId)].categoryId,
          name: inputRef.current.value,
        });
      } else {
        mutateMiddleCategory({
          taskId: folderIdx as number,
          name: inputRef.current.value,
        });
      }
    }
  };

  const handleCheckMainCategory = (e: React.ChangeEvent<HTMLInputElement>) => {
    const currentInputValue = e.target.value;

    if (NEW_CATEGORY_REGEX.test(currentInputValue)) {
      const duplicateValue =
        mainCategoryList && isMainCategory
          ? mainCategoryList?.find(
              (item: mainCategoryInfo) => item.name === currentInputValue && item.name !== initialValue,
            )
          : middleCategoryList && !isMainCategory
          ? middleCategoryList?.find(
              (item: mainCategoryInfo) => item.name === currentInputValue && item.name !== initialValue,
            )
          : undefined;
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

  return isOpen ? (
    <StWrapper>
      <StModal>
        <StModalHeader>
          <h1>{isMainCategory ? '카테고리명 설정' : '업무명 설정'}</h1>

          <button onClick={() => setIsOpen(false)}>
            <IcDeleteModal />
          </button>
        </StModalHeader>

        <StModalForm>
          <h2>{isMainCategory ? '카테고리명' : '업무명'}</h2>
          <input
            defaultValue={
              isMainCategory && mainCategoryList
                ? mainCategoryList[Number(mainId)].name
                : !isMainCategory && middleCategoryList
                ? middleCategoryList.find((item: MiddleCategoryInfo) => item.taskId === folderIdx).name
                : undefined
            }
            type="text"
            ref={inputRef}
            onChange={(e) => {
              handleSpace(e);
              handleCheckMainCategory(e);
            }}
          />

          <p>{warningMsg}</p>
        </StModalForm>

        <StSubmitCategoryBtn onClick={(e) => handlePatchCategory(e)} disabled={!isCategoryAvailable}>
          저장하기
        </StSubmitCategoryBtn>
      </StModal>
    </StWrapper>
  ) : (
    <div></div>
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

export default PatchCategoryModal;
