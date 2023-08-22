import styled from '@emotion/styled';
import { IcEditMain } from 'public/assets/icons';
import { useGetMiddleCategoryList } from 'lib/hooks/useGetMiddleCategory';
import { MiddleCategoryInfo, mainCtxType } from 'types/output';
import { useRouter } from 'next/router';
import { useGetMainCategoryList } from 'lib/hooks/useGetMainCategoryList';
import MainCategoryList from 'components/output/MainCategoryList';
import MiddleCategory from 'components/output/MiddleCategory';
import AddMiddleCategory from 'components/output/AddMiddleCategory';
import { useEffect } from 'react';

const OutputMain = ({ mainId }: { mainId: string }) => {
  const router = useRouter();
  const { mainCategoryList } = useGetMainCategoryList();
  const { middleCategoryList } = useGetMiddleCategoryList(Number(mainId));

  const handleGoToWorkCard = (middleId: number) => {
    router.push({ pathname: `/output/${mainId}/middleCategory/${middleId}` });
  };

  return (
    <>
      <StOutputMainWrapper>
        <MainCategoryList mainId={mainId} />

        <StMiddleBoard>
          <header>
            <StMainTitle isShouldWrap={true}>{mainCategoryList && mainCategoryList[Number(mainId)].name}</StMainTitle>
            <IcEditMain />
          </header>

          <div>
            {middleCategoryList?.map((category: MiddleCategoryInfo, idx: number) => (
              <MiddleCategory
                categoryName={category.name}
                key={idx}
                folderId={category.folderId}
                handleClick={() => {
                  handleGoToWorkCard(category.folderId);
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

export const getServerSideProps = async (ctx: mainCtxType) => {
  const mainId = ctx.query.mainId;

  return { props: { mainId } };
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
