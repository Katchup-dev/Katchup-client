import { ModalTwoButton } from 'components/common/Modal';
import Toast from 'components/common/Toast';
import { MODAL_DELETE_SCREENSHOT, MODAL_LEAVE_PAGE } from 'constants/modal';
import { workInputState } from 'core/atom';
import useRouteChangeBlocking from 'lib/hooks/input/useRouteChangeBlocking';
import useModal from 'lib/hooks/useModal';
import { IcBtnScreenshot, IcBtnScreenshotHide } from 'public/assets/icons';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';

import styled from '@emotion/styled';

import CardModal from '../InputCard/ModalCard';
import { ScreenshotInput } from '../InputScreenshot';
import FileInput from './FileInput';
import WorkInput from './WorkInput';

const MainInput = () => {
  const workInput = useRecoilValue(workInputState);
  const [isScreenshotShowing, setIsScreenshotShowing] = useState(false);

  const cardModal = useModal();
  const leavePageModal = useModal();
  const screenshotCancelModal = useModal();

  const { offRouteChangeBlocking } = useRouteChangeBlocking(leavePageModal.toggle, workInput);

  const handleScreenshotShowing = (e: React.MouseEvent<HTMLButtonElement>) => {
    setIsScreenshotShowing((prev) => !prev);
    screenshotCancelModal.toggle();
  };

  const [toastMessage, setToastMessage] = useState('');
  const [toastKey, setToastKey] = useState<number>();

  useEffect(() => {
    const storedMessage = localStorage.getItem('toastMessage');
    if (storedMessage) {
      setToastMessage(storedMessage);
      setToastKey(Date.now());
      localStorage.removeItem('toastMessage');
    }
  }, []);

  return (
    <>
      <StMainInputWrapper>
        <StMainInput>
          <WorkInput />
          <FileInput />
          <StNextBtn disabled={!workInput.length}>
            <button type="button" onClick={cardModal.toggle}>
              다음 단계
            </button>
          </StNextBtn>
          <CardModal isShowing={cardModal.isShowing} handleHide={cardModal.toggle} />
          <StToastWrapper>
            <Toast key={toastKey} message={toastMessage} isCheck />
          </StToastWrapper>
        </StMainInput>
        {isScreenshotShowing ? (
          <>
            <ScreenshotInput />
            <IcBtnScreenshotHide onClick={screenshotCancelModal.toggle} />
          </>
        ) : (
          <IcBtnScreenshot
            onClick={() => {
              setIsScreenshotShowing((prev) => !prev);
            }}
          />
        )}
        <ModalTwoButton
          isShowing={leavePageModal.isShowing}
          contents={MODAL_LEAVE_PAGE}
          leftButtonName={'돌아가기'}
          rightButtonName={'벗어나기'}
          handleLeftButton={leavePageModal.toggle}
          handleRightButton={() => offRouteChangeBlocking()}
        />
        <ModalTwoButton
          isShowing={screenshotCancelModal.isShowing}
          contents={MODAL_DELETE_SCREENSHOT}
          leftButtonName={'취소하기'}
          rightButtonName={'그만두기'}
          handleLeftButton={screenshotCancelModal.toggle}
          handleRightButton={handleScreenshotShowing}
          isSubContent={true}
        />
      </StMainInputWrapper>
    </>
  );
};

const StMainInputWrapper = styled.section`
  display: flex;
  justify-content: center;
  gap: 1.8rem;
  position: relative;

  width: 100%;
  padding: 0 5.2rem 0 6.2rem;

  & > svg {
    margin: 1.1rem -1.8rem -1.8rem -2.3rem;

    cursor: pointer;
  }
`;

const StMainInput = styled.section`
  position: relative;

  width: 100%;
  max-width: 90rem;
  height: 85rem;

  border: 0.1rem solid ${({ theme }) => theme.colors.katchup_line_gray};
  border-radius: 2.6rem;
  background-color: ${({ theme }) => theme.colors.katchup_white};

  box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.05);
`;

const StNextBtn = styled.div<{ disabled: boolean }>`
  display: flex;
  justify-content: flex-end;

  & > button {
    width: 11.8rem;
    height: 4.2rem;

    margin-top: 1.6rem;
    margin-right: 7.4rem;

    border: none;
    border-radius: 0.8rem;
    color: ${({ theme }) => theme.colors.katchup_white};
    background-color: ${({ theme, disabled }) => (disabled ? theme.colors.katchup_gray : theme.colors.katchup_main)};
    ${({ theme }) => theme.fonts.h3_title};
  }
`;

const StToastWrapper = styled.div`
  display: flex;
  justify-content: center;

  width: 100%;
`;

export default MainInput;
