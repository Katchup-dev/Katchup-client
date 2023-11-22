import Toast from 'components/common/Toast';
import { IcBtnCopylink, IcToggleAfter, IcToggleBefore } from 'public/assets/icons';

import styled from '@emotion/styled';

interface ShareModalProps {
  isShareOn: boolean;
  toggleShare: (mainId: string) => void;
  handleCopyClick: () => void;
  mainId: string;
}

const ShareModal = ({ mainId, isShareOn, toggleShare, handleCopyClick }: ShareModalProps) => {
  return (
    <>
      <StShareModal>
        <StModalTitle>
          <p>공유 기능 활성화</p>
          <button type="button" onClick={() => toggleShare(mainId)}>
            {isShareOn ? <IcToggleAfter /> : <IcToggleBefore />}
          </button>
        </StModalTitle>
        <p>보안에 유의할 것을 권장드립니다.</p>
        <button type="button" onClick={handleCopyClick}>
          <IcBtnCopylink />
        </button>
      </StShareModal>
    </>
  );
};

export default ShareModal;

const StShareModal = styled.div`
  width: 30.6rem;
  height: 13rem;
  padding: 2.5rem 2.4rem 2.4rem 2.8rem;

  border-radius: 0.8rem;
  border: 0.1rem solid ${({ theme }) => theme.colors.katchup_line_gray};
  box-shadow: 0 0 2rem 0 rgba(0, 0, 0, 0.05);
  background-color: ${({ theme }) => theme.colors.katchup_white};

  & > p {
    margin-top: 0.5rem;
    color: ${({ theme }) => theme.colors.katchup_dark_gray};
    ${({ theme }) => theme.fonts.caption};
  }
  & > button {
    float: right;
    margin-top: 1.3rem;
  }
`;

const StModalTitle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  & > p {
    ${({ theme }) => theme.fonts.h2_title};
  }

  & > button {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;
