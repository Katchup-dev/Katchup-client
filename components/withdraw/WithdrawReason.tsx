import { ModalTwoButton } from 'components/common/Modal';
import { StNextBtn } from 'components/input/InputBasic/MainInput';
import { WITHDRAW_REASON } from 'constants/withdraw';
import useModal from 'lib/hooks/useModal';
import React, { useCallback, useState } from 'react';

import styled from '@emotion/styled';

import Checkbox, { StCheckboxWrapper } from './CheckBox';

const WithdrawReason = () => {
  const [reasons, setReasons] = useState<string[]>([]);
  const [customReason, setCustomReason] = useState('');
  const [customIndex, setCustomIndex] = useState<number | null>(null);

  const widhdrawConfirm = useModal();

  const handleCustomCheckbox = useCallback(() => {
    if (customIndex) {
      setReasons((prev) => prev.filter((_, index) => index !== customIndex));
      setCustomIndex(null);
    } else {
      setReasons((prev) => [...prev, customReason]);
      setCustomIndex(reasons.length);
    }
  }, [customIndex, customReason, reasons]);

  const handleSubmit = useCallback(() => {
    if (customIndex) {
      setReasons((prev) => {
        const updatedReasons = [...prev];
        updatedReasons[customIndex] = customReason;
        return updatedReasons;
      });
    } else {
      console.log(reasons);
    }
  }, [customReason, customIndex, reasons]);

  console.log(reasons);

  return (
    <>
      <StFormWrapper>
        {WITHDRAW_REASON.map((withdrawReason) => (
          <Checkbox key={withdrawReason} reason={withdrawReason} setReason={setReasons} />
        ))}
        <StCustomReasonLabel htmlFor="직접 입력">
          <input type="checkbox" id="직접 입력" name="직접 입력" onChange={handleCustomCheckbox} />
          직접 입력
        </StCustomReasonLabel>
        <StCustomReasonTextarea
          value={customReason}
          onChange={(e) => {
            setCustomReason(e.target.value);
          }}
          placeholder="탈퇴 사유를 자세히 알려주실 수 있나요? Katchup 서비스 개선을 위해 귀담아 듣겠습니다."
        />
        <StSubmitBtn disabled={!reasons.length}>
          <button type="button" onClick={widhdrawConfirm.toggle}>
            탈퇴하기
          </button>
        </StSubmitBtn>
      </StFormWrapper>
      <ModalTwoButton
        isShowing={widhdrawConfirm.isShowing}
        contents={['Katchup 서비스를 탈퇴하시겠습니까?']}
        leftButtonName="취소하기"
        rightButtonName="탈퇴하기"
        handleLeftButton={widhdrawConfirm.toggle}
        handleRightButton={handleSubmit}
      />
    </>
  );
};

export default WithdrawReason;

const StFormWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const StCustomReasonLabel = styled(StCheckboxWrapper)``;

const StCustomReasonTextarea = styled.textarea`
  width: 70.8rem;
  height: 10rem;
  margin-left: 4.4rem;
  padding: 1.4rem 1.6rem;

  border-radius: 0.8rem;
  border: 0.1rem solid ${({ theme }) => theme.colors.katchup_line_gray};
  ${({ theme }) => theme.fonts.h2_title};

  ::placeholder {
    color: ${({ theme }) => theme.colors.katchup_gray};
    ${({ theme }) => theme.fonts.h2_title};
  }
`;

const StSubmitBtn = styled(StNextBtn)`
  & > button {
    margin-top: 3.4rem;
    margin-right: 0;
  }
`;
