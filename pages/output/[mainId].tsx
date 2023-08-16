import MiddleCategory from '../../components/output/MiddleCategory';
import AddMiddleCategory from '../../components/output/AddMiddleCategory';
import MainCategoryList from '../../components/output/MainCategoryList';
import styled from '@emotion/styled';
import { IcEditMain } from 'public/assets/icons';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { currentMainCategoryAtom, currentMiddleCategoryAtom } from 'core/atom';
import { useGetMiddleCategoryList } from 'lib/hooks/useGetMiddleCategory';
import { MiddleCategoryInfo } from 'types/output';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useGetMainCategoryList } from 'lib/hooks/useGetMainCategoryList';

const OutputMain = () => {
  const router = useRouter();
  const [currentMainCategoryId, setCurrentMainCategoryId] = useState(Number(router.query.mainId));

  useEffect(() => {
    setCurrentMainCategoryId(Number(router.query.mainId));
  }, [router.query.mainId]);

  const setMiddleCategoryName = useSetRecoilState(currentMiddleCategoryAtom);

  //쿼리 키를 바꿔주는 방식으로 mainCategoryName이 바뀔 때마다 커스텀훅 재호출
  const { middleCategoryList, isError } = useGetMiddleCategoryList(currentMainCategoryId);
  const { mainCategoryList } = useGetMainCategoryList();

  const handleGoToWorkCard = (folderId: number, categoryName: string) => {
    setMiddleCategoryName({ middleCategory: categoryName, folderId: folderId });
    router.push({ pathname: `/output/middleCategory/${folderId}` });
  };

  return (
    <>
      <StOutputMainWrapper>
        <MainCategoryList />

        <StMiddleBoard>
          <header>
            <StMainTitle isShouldWrap={true}>
              {mainCategoryList && mainCategoryList[currentMainCategoryId]?.name}
            </StMainTitle>
            <IcEditMain />
          </header>

          <div>
            {middleCategoryList?.map((category: MiddleCategoryInfo, idx: number) => (
              <MiddleCategory
                categoryName={category.name}
                key={idx}
                folderId={category.folderId}
                handleClick={() => {
                  handleGoToWorkCard(category.folderId, category.name);
                }}
              />
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

    > svg {
      cursor: pointer;
    }
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
