import styled from '@emotion/styled';
import { useGetMainCategoryList } from 'lib/hooks/useGetMainCategoryList';
import { IcAddMain, IcTrash } from 'public/assets/icons';
import React, { useCallback, useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { ctxType, mainCategoryInfo } from 'types/output';
import { useRouter } from 'next/router';
import { currentMainCategoryIdxAtom } from 'core/atom';

const MainCategoryList = ({ mainId }: { mainId: string }) => {
  console.log(mainId);
  const router = useRouter();
  const [currentMainCategoryIdx, setCurrentMainCategoryIdx] = useRecoilState(currentMainCategoryIdxAtom);

  const { mainCategoryList } = useGetMainCategoryList();

  function initializeArray(arrSize: number) {
    const arr = new Array(arrSize).fill(false);
    if (arrSize > 0) {
      arr[currentMainCategoryIdx] = true;
    }
    return arr;
  }

  const [isCurrentCategoryArray, setIsCurrentCategoryArray] = useState(initializeArray(mainCategoryList?.length));

  // useEffect(() => {
  //   setCurrentMainCategoryIdx(mainId);
  // }, []);

  const handleChangeMainCategory = (e: React.MouseEvent<HTMLLIElement>, idx: number) => {
    e.preventDefault();

    setCurrentMainCategoryIdx(Number(mainId));

    const tempIsCurrentCategoryArray = Array(mainCategoryList?.length).fill(false);
    tempIsCurrentCategoryArray[idx] = true;

    setIsCurrentCategoryArray(tempIsCurrentCategoryArray);

    router.push(`/output/${idx}`);
  };

  return (
    <>
      <StWrapper>
        <header>
          <h1>워크 스페이스</h1>
          <IcAddMain />
        </header>
        <StMainCategoryWrapper>
          {mainCategoryList?.map((category: mainCategoryInfo, idx: number) => (
            <StMainCategory
              isCurrentCategory={isCurrentCategoryArray[idx]}
              key={idx}
              onClick={(e) => handleChangeMainCategory(e, idx)}>
              {category.name}
            </StMainCategory>
          ))}
        </StMainCategoryWrapper>

        <button type="button">
          <IcTrash />
          <span>휴지통</span>
        </button>
      </StWrapper>
    </>
  );
};

const StWrapper = styled.aside`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2.9rem;

  position: relative;
  width: 25.2rem;
  height: 88.5rem;

  border: 0.1rem solid ${({ theme }) => theme.colors.katchup_line_gray};
  border-radius: 2.6rem;

  > header {
    display: flex;
    justify-content: space-between;

    width: 21.2rem;
    height: 4.1rem;

    border-bottom: 0.1rem solid ${({ theme }) => theme.colors.katchup_line_gray};

    > h1 {
      ${({ theme }) => theme.fonts.h1_title};
    }

    > svg {
      cursor: pointer;
    }
  }

  > button {
    display: flex;
    align-items: center;

    position: absolute;
    left: 3rem;
    bottom: 3.4rem;

    background: none;
    border: none;

    > span {
      margin-left: 0.4rem;

      ${({ theme }) => theme.fonts.h2_smalltitle};
      color: ${({ theme }) => theme.colors.katchup_dark_gray};
    }
  }
`;

const StMainCategoryWrapper = styled.ul`
  padding-top: 1.6rem;

  list-style: none;
`;

const StMainCategory = styled.li<{ isCurrentCategory: boolean }>`
  display: flex;
  align-items: center;
  padding-left: 1.4rem;
  margin-bottom: 1.2rem;

  width: 21.2rem;
  height: 5rem;

  ${({ theme }) => theme.fonts.h2_smalltitle};

  color: ${({ isCurrentCategory, theme }) =>
    isCurrentCategory ? theme.colors.katchup_main : theme.colors.katchup_dark_gray};
  background-color: ${({ isCurrentCategory, theme }) => isCurrentCategory && `${theme.colors.katchup_main}33`};

  border-radius: 0.8rem;

  cursor: pointer;
`;

export default MainCategoryList;
