import styled from '@emotion/styled';
import { currentMainCategoryAtom } from 'core/atom';
import { useGetMainCategoryList } from 'lib/hooks/useGetMainCategoryList';
import { IcAddMain, IcTrash } from 'public/assets/icons';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { css } from '@emotion/react';
import { mainCategoryInfo } from 'types/output';

const MainCategoryList = () => {
  const { categoryList, isError } = useGetMainCategoryList();
  console.log(categoryList);
  const [currentMainCategory, setCurrentMainCategory] = useRecoilState(currentMainCategoryAtom);

  useEffect(() => {
    if (categoryList?.length > 0) {
      setCurrentMainCategory(categoryList[0]?.name);
    }
  }, []);

  return (
    <>
      <StWrapper>
        <header>
          <h1>워크 스페이스</h1>
          <IcAddMain />
        </header>
        <StMainCategoryWrapper>
          {categoryList?.map((category: mainCategoryInfo, idx: number) => (
            <StMainCategory isCurrentCategory={category.name === currentMainCategory.mainCategory} key={idx}>
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

  color: ${({ theme }) => theme.colors.katchup_dark_gray};

  ${({ theme }) => theme.fonts.h2_smalltitle};

  cursor: pointer;

  ${({ theme, isCurrentCategory }) =>
    isCurrentCategory &&
    `
      background-color: ${theme.colors.katchup_main};
      opacity: 0.1;
    `}
`;

export default MainCategoryList;
