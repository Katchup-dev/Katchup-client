import MainInput from 'components/input/InputBasic/MainInput';

import styled from '@emotion/styled';
import MainUpdate from 'components/update/UpdateBasic/MainUpdate';

const UpdateMain = () => {
  return (
    <StUpdateMainWrapper>
      <MainUpdate />
    </StUpdateMainWrapper>
  );
};

export default UpdateMain;

const StUpdateMainWrapper = styled.main`
  display: flex;
  justify-content: center;
  align-items: center;

  padding-bottom: 6.7rem;

  background-color: ${({ theme }) => theme.colors.katchup_bg_gray};
`;
