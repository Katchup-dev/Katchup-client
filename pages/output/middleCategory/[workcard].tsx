import styled from '@emotion/styled';
import MainCategoryList from 'components/output/MainCategoryList';
import WorkCard from 'components/output/WorkCard';
import { IcBack, IcDeleteWorkCard, IcEditMiddleCategory, IcWorkCardFilter } from 'public/assets/icons';

const WorkCardPage = () => {
  return (
    <>
      <StOutputMainWrapper>
        <MainCategoryList />

        <StMiddleBoard>
          <button>
            <IcBack />
            <p>대분류 제목</p>
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
            <h1>중분류 제목</h1>
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

          <WorkCard />
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
    ${({ theme }) => theme.fonts.h2_smalltitle_eng};
  }

  p:nth-of-type(1) {
    margin-left: 5rem;
    margin-right: 13.4rem;
  }

  p:nth-of-type(2) {
    margin-right: 21.4rem;
  }

  p:nth-of-type(3) {
    margin-right: 38.1rem;
  }

  p:nth-of-type(4) {
    margin-right: 30.3rem;
  }

  p:nth-of-type(5) {
    margin-right: 8.8rem;
  }
`;

export default WorkCardPage;
