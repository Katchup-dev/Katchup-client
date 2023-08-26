import Toast from 'components/common/Toast';
import PatchCategoryModal from 'components/Modal/PatchCategoryModal';
import AddMiddleCategory from 'components/output/AddMiddleCategory';
import MainCategoryList from 'components/output/MainCategoryList';
import MiddleCategory from 'components/output/MiddleCategory';

import { useEffect, useState } from 'react';
import { ShareModal } from 'components/share/ShareModal';
import { useGetMainCategoryList } from 'lib/hooks/useGetMainCategoryList';
import { useGetMiddleCategoryList } from 'lib/hooks/useGetMiddleCategory';
import useModal from 'lib/hooks/useModal';
import { useRouter } from 'next/router';
import { IcEditMain, IcShare } from 'public/assets/icons';
import { mainCtxType, MiddleCategoryInfo } from 'types/output';

import styled from '@emotion/styled';

const OutputMain = ({ mainId }: { mainId: string }) => {
  const router = useRouter();
  const { mainCategoryList } = useGetMainCategoryList();
  const [middleCategoryId, setMiddleCategoryId] = useState<number>(0);
  const { middleCategoryList } = useGetMiddleCategoryList(middleCategoryId);
  const [isEditMainCategoryOpen, setIsEditMainCategoryOpen] = useState(false);

  const { isShowing, toggle } = useModal();
  const [isShareOn, setIsShareOn] = useState(true);
  const [toastMessage, setToastMessage] = useState('');
  const [toastKey, setToastKey] = useState<number>();

  const toggleShare = () => {
    setIsShareOn(!isShareOn);
  };

  const handleGoToWorkCard = (middleId: number) => {
    router.push({ pathname: `/output/${mainId}/middleCategory/${middleId}` });
  };

  const handleCopyClick = () => {
    if (!isShareOn) return;
    const linkToCopy = `https://katchup.kr/share/${mainId}`;
    navigator.clipboard.writeText(linkToCopy).then(() => {
      setToastMessage('공유 링크를 클립보드에 복사했어요');
      setToastKey(Date.now());
    });
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
            <StMainTitle isShouldWrap={true}>
              {mainCategoryList && mainCategoryList[Number(mainId)]?.name}
              <button type="button" onClick={() => setIsEditMainCategoryOpen(!isEditMainCategoryOpen)}>
                <IcEditMain />
              </button>
            </StMainTitle>
            <StShrareBtn type="button" onClick={toggle}>
              <IcShare />
            </StShrareBtn>
            <StShareModalWrapper>
              {isShowing && (
                <ShareModal isShareOn={isShareOn} handleCopyClick={handleCopyClick} toggleShare={toggleShare} />
              )}
            </StShareModalWrapper>
          </header>
          <div>
            {mainCategoryList && middleCategoryList && middleCategoryList.length > 0 && (
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
            )}
            {<AddMiddleCategory mainId={mainId} />}
          </div>
        </StMiddleBoard>
        {isEditMainCategoryOpen && (
          <PatchCategoryModal
            isMainCategory={true}
            isOpen={isEditMainCategoryOpen}
            setIsOpen={setIsEditMainCategoryOpen}
            mainId={mainId}
          />
        )}
        <StToastWrapper>
          <Toast key={toastKey} message={toastMessage} isLink />
        </StToastWrapper>
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

const StShrareBtn = styled.button``;

const StShareModalWrapper = styled.div`
  position: fixed;
  top: 25.5rem;
  right: 10.2rem;

  z-index: 1;
`;

const StToastWrapper = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;

  width: 100%;
`;

export default OutputMain;
