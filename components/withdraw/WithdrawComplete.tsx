import { IcLogoBig } from 'public/assets/icons';

import styled from '@emotion/styled';

import { StWithdraw, StWithdrawWrapper } from './Withdraw';

const WithdrawComplete = () => {
  return (
    <StWithdrawCompleteWrapper>
      <StWithdrawComplete>
        <IcLogoBig />
        <p>Katchup 서비스 회원 탈퇴가 완료되었습니다.</p>
        <p>그동안 Katchup과 함께해 주셔서 감사합니다.</p>
        <p>더욱 좋은 서비스로 거듭나겠습니다.</p>
        <StConfirmBtn
          type="button"
          onClick={() => {
            window.location.href = '/';
          }}>
          확인
        </StConfirmBtn>
      </StWithdrawComplete>
    </StWithdrawCompleteWrapper>
  );
};

export default WithdrawComplete;

const StWithdrawCompleteWrapper = styled(StWithdrawWrapper)``;

const StWithdrawComplete = styled(StWithdraw)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  height: 85rem;

  & > svg {
    margin-bottom: 9rem;
  }
  & > p {
    ${({ theme }) => theme.fonts.h1_smalltitle};
    line-height: 3.2rem;
  }
`;

const StConfirmBtn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 23rem;
  height: 4.2rem;
  padding: 0.8rem;
  margin-top: 7.15rem;

  border-radius: 0.8rem;
  background: ${({ theme }) => theme.colors.katchup_main};
  color: ${({ theme }) => theme.colors.katchup_white};
  ${({ theme }) => theme.fonts.h3_title};
`;
