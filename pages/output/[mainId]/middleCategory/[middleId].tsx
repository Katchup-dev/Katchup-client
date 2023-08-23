import styled from '@emotion/styled';
import MainCategoryList from 'components/output/MainCategoryList';
import NoMiddleCategory from 'components/output/NoMiddleCategory';
import WorkCard from 'components/output/WorkCard';
import { useGetMainCategoryList } from 'lib/hooks/useGetMainCategoryList';
import { useGetMiddleCategoryList } from 'lib/hooks/useGetMiddleCategory';
import useGetWorkCard from 'lib/hooks/useGetWorkCard';
import Link from 'next/link';
import { IcBack, IcDeleteWorkCard, IcEditMiddleCategory, IcWorkCardFilter } from 'public/assets/icons';
import { WorkCardInfo, middleCtxType } from 'types/output';

const WorkCardPage = ({ mainId, middleId }: { mainId: string; middleId: string }) => {
  const { mainCategoryList } = useGetMainCategoryList();
  const { middleCategoryList } = useGetMiddleCategoryList(Number(mainId));

  const { workCardList, isError } = useGetWorkCard(Number(middleId));

  return (
    <>
      <StOutputMainWrapper>
        <MainCategoryList mainId={mainId} />

        <StMiddleBoard>
          <Link href={`/output/${mainId}`}>
            <button>
              <IcBack />
              <p>{mainCategoryList && mainCategoryList[Number(mainId)].name}</p>
            </button>
          </Link>

          <StSettingButtonWrapper>
            <button>
              <IcDeleteWorkCard />
            </button>
            <button>
              <IcWorkCardFilter />
            </button>
          </StSettingButtonWrapper>

          <header>
            <h1>{middleCategoryList && middleCategoryList.find((item) => item.folderId === Number(middleId)).name}</h1>
            <button>
              <IcEditMiddleCategory />
            </button>
          </header>

          {workCardList?.length ? (
            <>
              <StMiddleBoardNav>
                <p>#</p>
                <p>소분류</p>
                <p>키워드</p>
                <p>내용</p>
                <p>파일</p>
                <p>더보기</p>
              </StMiddleBoardNav>

              {workCardList?.map((card: WorkCardInfo) => (
                <WorkCard
                  mainId={mainId}
                  key={card.cardId}
                  cardId={card.cardId}
                  content={card.content}
                  keywordList={card.keywordList}
                  cardName={card.cardName}
                  existFile={card.existFile}
                />
              ))}
            </>
          ) : (
            <NoMiddleCategory />
          )}
        </StMiddleBoard>
      </StOutputMainWrapper>
    </>
  );
};

export const getServerSideProps = async (ctx: middleCtxType) => {
  const mainId = ctx.query.mainId;
  const middleId = ctx.query.middleId;

  return { props: { mainId, middleId } };
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
  position: relative;

  border: 0.1rem solid ${({ theme }) => theme.colors.katchup_line_gray};
  border-radius: 2.6rem;

  overflow-y: scroll;

  > a {
    text-decoration: none;

    > button {
      display: flex;
      align-items: center;
      gap: 0.2rem;

      position: absolute;
      top: 2.8rem;
      left: 4.1rem;

      border: none;

      background-color: transparent;

      cursor: pointer;

      > p {
        ${({ theme }) => theme.fonts.h3_title_eng};

        color: ${({ theme }) => theme.colors.katchup_gray};
      }
    }
  }

  > header {
    display: flex;
    gap: 1.6rem;
    margin-top: 3.3rem;
    border-left: 0.6rem solid ${({ theme }) => theme.colors.katchup_main};

    > h1 {
      margin-left: 2rem;

      ${({ theme }) => theme.fonts.h1_bigtitle};
    }

    > button {
      border: none;
      background-color: transparent;
    }
  }
`;

const StSettingButtonWrapper = styled.div`
  display: flex;
  gap: 1.6rem;

  position: absolute;
  top: 8.6rem;
  right: 5rem;

  > button {
    border: none;
    background-color: transparent;
  }
`;

const StMiddleBoardNav = styled.nav`
  display: flex;
  align-items: center;

  margin-top: 4.7rem;
  margin-bottom: 1.4rem;
  padding-top: 1.4rem;
  padding-bottom: 1.4rem;

  width: 100%;

  background-color: ${({ theme }) => theme.colors.katchup_light_gray};

  border-radius: 0.8rem;

  > p {
    ${({ theme }) => theme.fonts.h2_smalltitle};
    color: ${({ theme }) => theme.colors.katchup_dark_gray};
  }

  p:nth-of-type(1) {
    margin-left: 3.477%;
    margin-right: 9.318%;
  }

  p:nth-of-type(2) {
    margin-right: 14.882%;
  }

  p:nth-of-type(3) {
    margin-right: 26.495%;
  }

  p:nth-of-type(4) {
    margin-right: 21.07%;
  }

  p:nth-of-type(5) {
    margin-right: 6.12%;
  }
`;

export default WorkCardPage;
