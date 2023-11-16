import { ModalTwoButton } from 'components/common/Modal';
import { MODAL_DELETE_ALL } from 'constants/modal';
import { workInputState } from 'core/atom';
import { IcKatchupLogo } from 'public/assets/icons';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';

import styled from '@emotion/styled';
import useModal from 'lib/hooks/common/useModal';

interface WorkUpdate {
  content: string;
}

const WorkUpdate = (props: WorkUpdate) => {
  const { content } = props;
  const deleteAllModal = useModal();
  const [workInput, setWorkInput] = useRecoilState(workInputState);

  useEffect(() => {
    setWorkInput(content);
  }, []);

  const [letterCount, setLetterCount] = useState(0);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const inputText = e.target.value;
    const inputCount = inputText.length;

    setWorkInput(inputText);
    setLetterCount(inputCount);
  };

  const handleDeleteAll = (e: React.MouseEvent<HTMLButtonElement>) => {
    setWorkInput('');
    setLetterCount(0);
    deleteAllModal.toggle();
  };

  return (
    <>
      <StDeleteAllBtn type="button" onClick={deleteAllModal.toggle}>
        모든 내용 지우기
      </StDeleteAllBtn>
      <StInputWrapper>
        <h2>
          <IcKatchupLogo /> 업무 내용
        </h2>
        <StWorkInput>
          <textarea
            maxLength={2000}
            value={workInput}
            onChange={handleInputChange}
            placeholder="업무 내용을 입력해주세요"
          />
          <p>
            <span>{letterCount}</span>/2000자
          </p>
        </StWorkInput>
      </StInputWrapper>
      <ModalTwoButton
        isShowing={deleteAllModal.isShowing}
        contents={MODAL_DELETE_ALL}
        leftButtonName={'취소하기'}
        rightButtonName={'내용 지우기'}
        handleLeftButton={deleteAllModal.toggle}
        handleRightButton={handleDeleteAll}
      />
    </>
  );
};

export default WorkUpdate;

const StDeleteAllBtn = styled.button`
  position: absolute;
  top: 5rem;
  right: 7.5rem;

  border: none;
  background: transparent;
  color: ${({ theme }) => theme.colors.katchup_gray};
  ${({ theme }) => theme.fonts.p2_text};
  text-decoration: underline;
`;

const StInputWrapper = styled.div`
  padding: 6.4rem 7.4rem 3.4rem 7.4rem;

  & > h2 {
    display: flex;
    align-items: center;
    gap: 0.8rem;

    margin-bottom: 1.4rem;

    ${({ theme }) => theme.fonts.h1_title};
  }
`;

const StWorkInput = styled.div`
  position: relative;

  width: 100%;
  height: 45.8rem;
  padding: 4rem;

  border: 0.1rem solid ${({ theme }) => theme.colors.katchup_line_gray};
  border-radius: 0.8rem;

  & > textarea {
    width: 100%;
    height: 32.7rem;

    border: none;
    outline: none;
    resize: none;
    ${({ theme }) => theme.fonts.p1_text};

    scrollbar-width: 0.5rem;
    scrollbar-color: ${({ theme }) => theme.colors.katchup_gray};

    ::placeholder {
      color: ${({ theme }) => theme.colors.katchup_gray};
    }

    ::-webkit-scrollbar {
      width: 0.5rem;
    }

    ::-webkit-scrollbar-thumb {
      background-color: ${({ theme }) => theme.colors.katchup_gray};
      border-radius: 3rem;
    }
  }

  & > p {
    position: absolute;
    bottom: 2rem;
    right: 4rem;

    color: ${({ theme }) => theme.colors.katchup_dark_gray};
    ${({ theme }) => theme.fonts.caption};

    & > span {
      color: ${({ theme }) => theme.colors.katchup_main};
      ${({ theme }) => theme.fonts.caption};
    }
  }
`;
