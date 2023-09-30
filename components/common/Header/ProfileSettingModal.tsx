import { StInputIndex } from 'components/input/InputCard/ModalInput.tsx/InputCategory';
import { IcBtnDeletePopup } from 'public/assets/icons';
import { useState } from 'react';

import styled from '@emotion/styled';

interface ProfileSettingModalProps {
  isShowing: boolean;
  curNickname: string;
  profileImgSrc: string;
  handleCancel: () => void;
}

const ProfileSettingModal = ({ isShowing, curNickname, profileImgSrc, handleCancel }: ProfileSettingModalProps) => {
  const [nickname, setNickname] = useState(curNickname);
  const [nicknameCount, setNicknameCount] = useState(0);

  const [memo, setMemo] = useState('');
  const [memoCount, setMemoCount] = useState(0);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, type: string) => {
    if (type === 'nickname') {
      setNickname(e.target.value);
      setNicknameCount(e.target.value.length);
    } else if (type === 'memo') {
      setMemo(e.target.value);
      setMemoCount(e.target.value.length);
    }
  };

  return isShowing ? (
    <StProfileSettingModalWrapper>
      <StProfileSettingModal>
        <IcBtnDeletePopup onClick={handleCancel} />
        <h2>프로필 설정</h2>
        <StInputNickname>
          닉네임
          <input
            type="text"
            name="category"
            value={nickname}
            onChange={(e) => {
              handleInputChange(e, 'nickname');
            }}
            placeholder="닉네임을 입력해주세요."
            maxLength={20}
            autoComplete="off"
          />
          <p>{nicknameCount}/20</p>
        </StInputNickname>
        <StInputMemo>
          한 줄 메모
          <textarea
            value={memo}
            name="memo"
            onChange={(e) => {
              handleInputChange(e, 'memo');
            }}
            placeholder="한 줄 메모를 입력해주세요."
            maxLength={100}
          />
          <p>{memoCount}/100</p>
        </StInputMemo>
        <StBottomButtons>
          <StWithdrawalBtn type="button" onClick={() => {}}>
            계정 탈퇴하기
          </StWithdrawalBtn>
          <StNextBtn type="button" disabled={true} onClick={() => {}}>
            저장하기
          </StNextBtn>
        </StBottomButtons>
      </StProfileSettingModal>
    </StProfileSettingModalWrapper>
  ) : null;
};

export default ProfileSettingModal;

const StProfileSettingModalWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  position: fixed;
  top: 0;
  left: 0;
  z-index: 1;

  width: 100%;
  height: 100%;

  background-color: rgba(47, 52, 56, 0.4);
`;

const StProfileSettingModal = styled.section`
  display: flex;
  flex-direction: column;
  position: relative;

  width: 58.9rem;
  height: 64.4rem;
  padding: 4rem 6rem;

  border-radius: 2.6rem;
  background-color: ${({ theme }) => theme.colors.katchup_white};

  & > h2 {
    margin-bottom: 5.1rem;

    ${({ theme }) => theme.fonts.h1_smalltitle};
    text-align: center;
  }

  & > svg {
    position: absolute;
    top: 3.8rem;
    right: 4rem;

    cursor: pointer;
  }

  border-radius: 2.6rem;
  background-color: ${({ theme }) => theme.colors.katchup_white};
`;

const StInputNickname = styled(StInputIndex)``;

const StInputMemo = styled(StInputIndex)`
  & > textarea {
    height: 12.8rem;
    padding: 1.4rem 1.4rem 4rem 1.4rem;

    border: 0.1rem solid ${({ theme }) => theme.colors.katchup_line_gray};
    border-radius: 0.8rem;
    ${({ theme }) => theme.fonts.h2_smalltitle};

    outline: none;
    resize: none;

    ::placeholder {
      color: ${({ theme }) => theme.colors.katchup_gray};
    }
  }

  & > p {
    position: absolute;
    top: 12.2rem;
  }
`;

const StBottomButtons = styled.div`
  display: flex;
  justify-content: space-between;

  padding-top: 4.4rem;
`;

const StWithdrawalBtn = styled.button`
  color: ${({ theme }) => theme.colors.katchup_gray};
  ${({ theme }) => theme.fonts.p2_text};
  text-decoration: underline;
`;

const StNextBtn = styled.button<{ disabled: boolean }>`
  width: 13.6rem;
  height: 4rem;

  border: 0.1rem solid ${({ theme }) => theme.colors.katchup_line_gray};
  border-radius: 0.8rem;
  color: ${({ theme }) => theme.colors.katchup_white};
  background-color: ${({ theme, disabled }) => (disabled ? theme.colors.katchup_gray : theme.colors.katchup_main)};
  ${({ theme }) => theme.fonts.h3_title};
`;
