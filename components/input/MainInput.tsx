import styled from '@emotion/styled';

const MainInput = () => {
  return <StMainInput>메인 인풋</StMainInput>;
};

const StMainInput = styled.section`
  width: 90rem;
  height: 85rem;

  border-radius: 2.6rem;
  background-color: ${({ theme }) => theme.colors.katchup_white};
`;

export default MainInput;
