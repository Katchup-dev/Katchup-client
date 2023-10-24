import styled from '@emotion/styled';

import { StWithdraw, StWithdrawWrapper } from './Withdraw';

const WithdrawComplete = () => {
  return (
    <StWithdrawCompleteWrapper>
      <StWithdrawComplete></StWithdrawComplete>
    </StWithdrawCompleteWrapper>
  );
};

export default WithdrawComplete;

const StWithdrawCompleteWrapper = styled(StWithdrawWrapper)``;

const StWithdrawComplete = styled(StWithdraw)`
  height: 85rem;
`;
