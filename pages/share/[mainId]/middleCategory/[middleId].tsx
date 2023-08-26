import MainCategoryList from 'components/share/MainCategoryList';
import NoMiddleCategory from 'components/share/NoMiddleCategory';
import WorkCard from 'components/share/WorkCard';
import { useGetMainCategoryList } from 'lib/hooks/useGetMainCategoryList';
import { useGetMiddleCategoryList } from 'lib/hooks/useGetMiddleCategory';
import useGetWorkCard from 'lib/hooks/useGetWorkCard';
import Link from 'next/link';
import {
  IcBack,
  IcCancelDeleteMiddleCategory,
  IcDeleteChosenWorkCards,
  IcDeleteWorkCard,
  IcMiddleCategoryMeatball,
  IcWorkCardFilter,
} from 'public/assets/icons';
import { useState } from 'react';
import { MiddleCategoryInfo, middleCtxType, WorkCardInfo } from 'types/output';

import styled from '@emotion/styled';

const WorkCardPage = ({ mainId, middleId }: { mainId: string; middleId: string }) => {
  const { mainCategoryList } = useGetMainCategoryList();
  const { middleCategoryList } = useGetMiddleCategoryList(
    mainCategoryList && mainCategoryList[Number(mainId)]?.categoryId,
  );

  const [isDeleteMode, setIsDeleteMode] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const { workCardList } = useGetWorkCard(Number(middleId));

  return (
    <>
      <StOutputMainWrapper>
        <MainCategoryList mainId={mainId} />

        <StMiddleBoard>
          <Link href={`/share/${mainId}`}>
            <button>
              <IcBack />
              <p>{mainCategoryList && mainCategoryList[Number(mainId)]?.name}</p>
            </button>
          </Link>

          <StSettingButtonWrapper>
            <button>
              <IcWorkCardFilter />
            </button>
          </StSettingButtonWrapper>

          <header>
            <h1>
              {middleCategoryList &&
                middleCategoryList?.find((item: MiddleCategoryInfo) => item.taskId === Number(middleId)).name}
            </h1>
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
                  isDeleteWorkCard={isDeleteMode}
                  mainId={mainId}
                  key={card.cardId}
                  cardId={card.cardId}
                  content={card.content}
                  keywordList={card.keywordList}
                  cardName={card.subTaskName}
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
    width: 3.4rem;
    margin-left: 3.9rem;
    margin-right: 11.4rem;
  }

  p:nth-of-type(2) {
    width: 6.7rem;
    margin-right: 20.4rem;
  }

  p:nth-of-type(3) {
    width: 5.3rem;
    margin-right: 38.1rem;
  }

  p:nth-of-type(4) {
    width: 3.5rem;
    margin-right: 28.7rem;
  }

  p:nth-of-type(5) {
    width: 3.5rem;
    margin-right: 7rem;
  }

  p:nth-of-type(6) {
    width: 6.3rem;
  }
`;

export default WorkCardPage;
