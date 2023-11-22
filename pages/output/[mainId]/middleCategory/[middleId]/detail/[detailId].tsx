import styled from '@emotion/styled';
import DetailContent from 'components/output/DetailContent';
import ScreenshotOutput from 'components/output/ScreenshotOutput';
import { useGetDetailPage } from 'lib/hooks/useGetDetailPage';
import { useRouter } from 'next/router';
import { middleCtxType } from 'types/output';

const detail = ({ mainId, middleId }: { mainId: string; middleId: string }) => {
  const router = useRouter();
  console.log(mainId);
  const { detailId, content } = router.query;

  const { detailPageInfo } = useGetDetailPage(Number(detailId));

  return (
    <>
      <StWrapper>
        <DetailContent
          cardId={detailPageInfo?.cardId}
          fileList={detailPageInfo?.fileList}
          content={detailPageInfo?.content}
          middleId={middleId}
          mainId={mainId}
        />
        {detailPageInfo?.screenshotList.length > 0 && (
          <ScreenshotOutput screenshotList={detailPageInfo?.screenshotList} />
        )}
      </StWrapper>
    </>
  );
};

export const getServerSideProps = async (ctx: middleCtxType) => {
  const mainId = ctx.query.mainId;
  const middleId = ctx.query.middleId;

  return { props: { mainId, middleId } };
};

const StWrapper = styled.main`
  display: flex;
  justify-content: center;
  gap: 1.8rem;

  width: 100%;
`;

export default detail;
