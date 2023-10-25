import styled from '@emotion/styled';

import WithdrawReason from './WithdrawReason';

const Withdraw = () => {
  return (
    <StWithdrawWrapper>
      <StWithdraw>
        <StTitle>Katchup 서비스 탈퇴 전에 안내드립니다.</StTitle>
        <StContent>첫째, 탈퇴 시 작성하신 내용은 영구적으로 소멸되어 재가입하여도 복구 불가능합니다.</StContent>
        <StContent>둘째, 공유 링크는 더 이상 유효하지 않습니다.</StContent>
        <StContent>셋째, 개인정보는 탈퇴 후 영업일 기준 1일 내에 전부 폐기 처리됩니다.</StContent>
        <StContent>넷째, 동일 이메일 계정으로 언제든 재가입 가능합니다.</StContent>

        <StTitle>서비스 탈퇴 사유가 무엇일까요? (복수 응답 가능)</StTitle>
        <WithdrawReason />
      </StWithdraw>
    </StWithdrawWrapper>
  );
};

export default Withdraw;

export const StWithdrawWrapper = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: fit-content;

  background-color: ${({ theme }) => theme.colors.katchup_bg_gray};
`;

export const StWithdraw = styled.div`
  width: 90rem;
  min-height: 92.3rem;
  margin-bottom: 6rem;
  padding: 7rem 7.4rem 4rem 7.4rem;

  border-radius: 2.6rem;
  border: 0.1rem solid ${({ theme }) => theme.colors.katchup_line_gray};
  box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.05);
  background-color: ${({ theme }) => theme.colors.katchup_white};
`;

const StTitle = styled.h2`
  margin-bottom: 2.4rem;

  color: ${({ theme }) => theme.colors.katchup_black};
  ${({ theme }) => theme.fonts.h1_smalltitle};
`;

const StContent = styled.p`
  margin-bottom: 1.1rem;

  color: ${({ theme }) => theme.colors.katchup_dark_gray};
  ${({ theme }) => theme.fonts.h2_smalltitle};

  &:nth-child(5) {
    margin-bottom: 5rem;
  }
`;
