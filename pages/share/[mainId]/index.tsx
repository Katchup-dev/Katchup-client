import MainCategoryList from 'components/share/MainCategoryList';
import MiddleCategory from 'components/share/MiddleCategory';
import NoMiddleCategory from 'components/share/NoMiddleCategory';
import { useGetMainCategoryList } from 'lib/hooks/useGetMainCategoryList';
import { useGetMiddleCategoryList } from 'lib/hooks/useGetMiddleCategory';
import useModal from 'lib/hooks/useModal';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { mainCtxType, MiddleCategoryInfo } from 'types/output';

import styled from '@emotion/styled';
import { useRecoilValue } from 'recoil';
import { memberId } from 'core/atom';

const OutputMain = ({ mainId }: { mainId: string }) => {
  const router = useRouter();
  const userMemberId = useRecoilValue(memberId);
  const { mainCategoryList } = useGetMainCategoryList(userMemberId);
  const [middleCategoryId, setMiddleCategoryId] = useState<number>(0);
  const { middleCategoryList } = useGetMiddleCategoryList(middleCategoryId);

  const [isShareOn, setIsShareOn] = useState(false);

  const toggleShare = () => {
    setIsShareOn(!isShareOn);
  };

  const handleGoToWorkCard = (middleId: number) => {
    router.push({ pathname: `/share/${mainId}/middleCategory/${middleId}` });
  };

  useEffect(() => {
    mainCategoryList && setMiddleCategoryId(mainCategoryList && mainCategoryList[Number(mainId)]?.categoryId);
  }, [mainCategoryList, mainId]);

  return (
    <>
      <StOutputMainWrapper>
        <MainCategoryList mainId={mainId} />

        <StMiddleBoard>
          <header>
            <StMainTitle isShouldWrap={true}>{mainCategoryList && mainCategoryList[Number(mainId)]?.name}</StMainTitle>
          </header>
          <div>
            {mainCategoryList && middleCategoryList && middleCategoryList.length > 0 ? (
              <>
                {middleCategoryList?.map((category: MiddleCategoryInfo, idx: number) => (
                  <MiddleCategory
                    mainId={mainId}
                    categoryName={category.name}
                    key={idx}
                    folderId={category?.taskId}
                    handleClick={() => {
                      handleGoToWorkCard(category.taskId);
                    }}
                  />
                ))}
              </>
            ) : (
              <NoMiddleCategory />
            )}
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
  gap: 3rem;

  padding: 0rem 5rem 5rem 5rem;
  height: fit-content;

  background-color: ${({ theme }) => theme.colors.katchup_bg_gray};
`;

const StMiddleBoard = styled.section`
  width: 153.8rem;
  height: 88.5rem;
  padding: 5rem;

  border: 0.1rem solid ${({ theme }) => theme.colors.katchup_line_gray};
  border-radius: 2.6rem;
  background-color: ${({ theme }) => theme.colors.katchup_white};

  overflow-y: scroll;

  > header {
    display: flex;
    justify-content: space-between;
    align-items: center;

    width: 100%;
    padding-bottom: 5rem;
  }

  > div {
    display: flex;
    flex-wrap: wrap;
    gap: 3rem;

    position: relative;
  }

  -ms-overflow-style: none;
  ::-webkit-scrollbar {
    display: none;
  }
`;

const StMainTitle = styled.h1<{ isShouldWrap: boolean }>`
  display: flex;
  align-items: center;

  ${({ theme }) => theme.fonts.h1_bigtitle_eng};
  margin-right: 1.6rem;

  > button {
    margin-left: 1.6rem;
  }
`;

export default OutputMain;
