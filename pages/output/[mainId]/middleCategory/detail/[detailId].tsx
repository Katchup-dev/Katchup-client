import styled from '@emotion/styled';
import DetailContent from 'components/output/DetailContent';
import ScreenshotOutput from 'components/output/ScreenshotOutput';
import { useGetDetailPage } from 'lib/hooks/useGetDetailPage';
import { useRouter } from 'next/router';

const detail = () => {
  const router = useRouter();
  const { detailId, content } = router.query;

  const { detailPageInfo, isError } = useGetDetailPage(Number(detailId));

  return (
    <>
      <StWrapper>
        <DetailContent fileList={detailPageInfo?.fileList} content={content as string} />
        {detailPageInfo?.screenshotList.length > 0 && (
          <ScreenshotOutput screenshotList={detailPageInfo?.screenshotList} />
        )}
      </StWrapper>
    </>
  );
};

const StWrapper = styled.main`
  display: flex;
  justify-content: center;
  gap: 1.8rem;

  width: 100%;
`;

export default detail;
