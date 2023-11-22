import DetailContent from 'components/share/DetailContent';
import ScreenshotOutput from 'components/share/ScreenshotOutput';
import { useGetDetailPage } from 'lib/hooks/useGetDetailPage';
import { useRouter } from 'next/router';

import styled from '@emotion/styled';

const detail = () => {
  const router = useRouter();
  const { detailId } = router.query;

  const { detailPageInfo } = useGetDetailPage(Number(detailId));

  return (
    <>
      <StWrapper>
        <DetailContent fileList={detailPageInfo?.fileList} content={detailPageInfo?.content} />
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
