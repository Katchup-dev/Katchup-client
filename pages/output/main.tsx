import MiddleCategory from '../../components/output/MiddleCategory';

import AddMiddleCategory from '../../components/output/AddMiddleCategory';
import MainCategoryList from '../../components/output/MainCategoryList';
import styled from '@emotion/styled';
import { IcEditMain } from 'public/assets/icons';
import { useRecoilValue } from 'recoil';
import { currentMainCategoryAtom } from 'core/atom';
import { useGetMiddleCategoryList } from 'lib/hooks/useGetMiddleCategory';
import { MiddleCategoryInfo } from 'types/output';
import { useEffect, useState } from 'react';

const OutputMain = () => {
  const mainCategoryName = useRecoilValue(currentMainCategoryAtom);
  const [mainCategory, setMainCategory] = useState<string>('');

  let { categoryList, isError } = useGetMiddleCategoryList(mainCategoryName.categoryId);

  useEffect(() => {
    setMainCategory(mainCategoryName.mainCategory);
  }, [mainCategoryName]);

  if (isError) {
    console.log('error');
  }

  return (
    <>
      <StOutputMainWrapper>
        <MainCategoryList />

        <StMiddleBoard>
          <header>
            <StMainTitle isShouldWrap={true}>{mainCategory}</StMainTitle>
            <IcEditMain />
          </header>

          <div>
            {categoryList?.map((category: MiddleCategoryInfo, idx: number) => (
              <MiddleCategory categoryName={category.name} key={idx} />
            ))}
            <AddMiddleCategory />
          </div>
        </StMiddleBoard>
      </StOutputMainWrapper>
    </>
  );
};

const StOutputMainWrapper = styled.main`
  display: flex;
  margin: 0rem 5rem 5rem 5rem;
  gap: 3rem;
`;

const StMiddleBoard = styled.section`
  width: 153.8rem;
  height: 88.5rem;
  padding: 5rem;

  border: 0.1rem solid ${({ theme }) => theme.colors.katchup_line_gray};
  border-radius: 2.6rem;

  overflow-y: scroll;

  > header {
    display: flex;
    align-items: center;

    width: 100%;
    padding-bottom: 5rem;
  }

  > div {
    display: flex;
    flex-wrap: wrap;
    gap: 3rem;
  }
`;

const StMainTitle = styled.h1<{ isShouldWrap: boolean }>`
  ${({ theme }) => theme.fonts.h1_bigtitle_eng};
  margin-right: 1.6rem;
`;

export default OutputMain;
