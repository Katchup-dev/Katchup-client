import styled from '@emotion/styled';
import { IcScreenshot } from 'public/assets/icons';
import { ScreenshotInfo } from 'types/output';

export interface ScreenshotOutputProps {
  screenshotList: ScreenshotInfo[];
}

const ScreenshotOutput = (props: ScreenshotOutputProps) => {
  const { screenshotList } = props;
  return (
    <StScreenshotWrapper>
      <div>
        <IcScreenshot />
        <h2>스크린샷</h2>
      </div>

      <StScreenshotGuide>
        <p>이미지를 클릭하여 번호를 매겨주세요.</p>
      </StScreenshotGuide>

      <StScreenshot>
        {screenshotList?.map((screenshot: ScreenshotInfo) => (
          <img src={screenshot.url} key={screenshot.id} />
        ))}
      </StScreenshot>
    </StScreenshotWrapper>
  );
};

const StScreenshotWrapper = styled.article`
  padding: 6.5rem 5rem 4.8rem 5rem;

  width: 81.8rem;
  height: 85rem;

  border: 0.1rem solid ${({ theme }) => theme.colors.katchup_line_gray};
  border-radius: 2.6rem;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.05);

  > div:nth-of-type(1) {
    display: flex;
    gap: 0.8rem;
    margin-bottom: 1.4rem;

    > h2 {
      ${({ theme }) => theme.fonts.h1_title};
    }
  }
`;

const StScreenshotGuide = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1.8rem;
  padding-left: 3.1rem;

  width: 71.8rem;
  height: 4.1rem;

  border-radius: 0.8rem;
  background-color: ${({ theme }) => theme.colors.katchup_light_gray};

  > p {
    ${({ theme }) => theme.fonts.p2_text};
    color: ${({ theme }) => theme.colors.katchup_dark_gray};
  }
`;

const StScreenshot = styled.section`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;

  height: 64.3rem;

  overflow-y: scroll;

  > img {
    border-radius: 0.8rem;

    cursor: pointer;
  }
`;
export default ScreenshotOutput;
