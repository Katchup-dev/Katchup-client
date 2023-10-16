import React, { useEffect } from 'react';
import MainInput from 'components/input/InputBasic/MainInput';

import styled from '@emotion/styled';
import MainUpdate from 'components/update/UpdateBasic/MainUpdate';
import { cardCtxType } from 'types/output';
import { useRecoilState } from 'recoil';
import { updateCardIdState } from 'core/atom';

const UpdateMain = ({ cardId }: { cardId: string }) => {
  return (
    <StUpdateMainWrapper>
      <MainUpdate cardId={Number(cardId)} />
    </StUpdateMainWrapper>
  );
};

export const getServerSideProps = async (ctx: cardCtxType) => {
  const cardId = ctx.query.cardId;

  return {
    props: { cardId },
  };
};

export default UpdateMain;

const StUpdateMainWrapper = styled.main`
  display: flex;
  justify-content: center;
  align-items: center;

  padding-bottom: 6.7rem;

  background-color: ${({ theme }) => theme.colors.katchup_bg_gray};
`;
