import { useGetMainCategoryList } from 'lib/hooks/useGetMainCategoryList';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { mainCategoryInfo } from 'types/output';

import styled from '@emotion/styled';

export interface MainCategoryListProps {
  currentMain: string;
  currentMainId: number;
}

const MainCategoryList = ({ mainId }: { mainId: string }) => {
  const router = useRouter();
  const { mainCategoryList } = useGetMainCategoryList();

  function initializeArray(arrSize: number) {
    const arr = new Array(arrSize).fill(false);
    if (arrSize > 0) {
      arr[Number(mainId)] = true;
    }
    return arr;
  }
  const [isCurrentCategoryArray, setIsCurrentCategoryArray] = useState(initializeArray(mainCategoryList?.length));

  useEffect(() => {
    setIsCurrentCategoryArray(initializeArray(mainCategoryList?.length));
  }, [mainCategoryList, mainId]);

  const handleChangeMainCategory = (e: React.MouseEvent<HTMLLIElement>, idx: number) => {
    e.preventDefault();
    const tempIsCurrentCategoryArray = Array(mainCategoryList?.length).fill(false);
    tempIsCurrentCategoryArray[idx] = true;
    setIsCurrentCategoryArray(tempIsCurrentCategoryArray);
    router.push(`/share/${idx}`);
  };

  return (
    <StWrapper>
      <header>
        <h1>워크 스페이스</h1>
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
    </StWrapper>
  );
};

const StWrapper = styled.aside`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2.9rem 2.9rem 0rem 2.9rem;

  position: relative;
  width: 25.2rem;
  height: 88.5rem;

  border: 0.1rem solid ${({ theme }) => theme.colors.katchup_line_gray};
  border-radius: 2.6rem;
  background-color: ${({ theme }) => theme.colors.katchup_white};

  > header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 1.6rem;

    width: 21.2rem;
    height: 4.1rem;

    border-bottom: 0.1rem solid ${({ theme }) => theme.colors.katchup_line_gray};

    > h1 {
      ${({ theme }) => theme.fonts.h1_title};
    }

    > button {
      border: none;
      background: none;

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

  position: relative;

  overflow-y: scroll;

  ::-webkit-scrollbar {
    display: none;
  }
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
