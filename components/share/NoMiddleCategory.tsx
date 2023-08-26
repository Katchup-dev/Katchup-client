import { IcLogoBig } from 'public/assets/icons';

import styled from '@emotion/styled';

const NoMiddleCategory = () => {
  return (
    <StWrapper>
      <IcLogoBig />
      <p>추가된 업무카드가 없어요</p>
    </StWrapper>
  );
};

const StWrapper = styled.article`
  margin-top: 13.7rem;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, 0%);

  > svg {
    margin-bottom: 3rem;
  }

  > p {
    margin-bottom: 5rem;

    ${({ theme }) => theme.fonts.h1_bigtitle};

    text-align: center;
  }
`;

export default NoMiddleCategory;
