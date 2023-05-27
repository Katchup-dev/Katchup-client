import styled from '@emotion/styled';
import MainCategoryList from 'components/output/MainCategoryList';
import WorkCard from 'components/output/WorkCard';
import { currentMainCategoryAtom } from 'core/atom';
import useGetWorkCard from 'lib/hooks/useGetWorkCard';
import { useRouter } from 'next/router';
import { IcBack, IcDeleteWorkCard, IcEditMiddleCategory, IcWorkCardFilter } from 'public/assets/icons';
import { useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { WorkCardInfo } from 'types/output';

const WorkCardPage = () => {
  const currentMainCategory = useRecoilValue(currentMainCategoryAtom);

  const router = useRouter();
  const { categoryId, middleCategory } = router.query;

  const { workCardList, isError } = useGetWorkCard(Number(categoryId));

  return (
    <>
      <StOutputMainWrapper>
        <MainCategoryList />

        <StMiddleBoard>
          <button>
            <IcBack />
            <p>{currentMainCategory.mainCategory}</p>
          </button>

          <StSettingButtonWrapper>
            <button>
              <IcDeleteWorkCard />
            </button>
            <button>
              <IcWorkCardFilter />
            </button>
          </StSettingButtonWrapper>

          <header>
            <h1>{middleCategory}</h1>
            <button>
              <IcEditMiddleCategory />
            </button>
          </header>

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
              cardId={card.cardId}
              content={card.content}
              keywordList={card.keywordList}
              cardName={card.cardName}
              existFile={card.existFile}
            />
          ))}
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
  position: relative;

  border: 0.1rem solid ${({ theme }) => theme.colors.katchup_line_gray};
  border-radius: 2.6rem;

  overflow-y: scroll;

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
