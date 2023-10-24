import styled from '@emotion/styled';

interface InputImageProps {
  profileImgSrc: string;
}

const InputImage = ({ profileImgSrc }: InputImageProps) => {
  return (
    <StInputImage>
      <StProfileImg src={profileImgSrc} />
      <StChangeBtn type="button" onClick={() => {}}>
        사진 변경
      </StChangeBtn>
    </StInputImage>
  );
};

export default InputImage;

const StInputImage = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  padding-bottom: 2.8rem;
`;

const StProfileImg = styled.img`
  width: 9.5rem;
  height: 9.5rem;

  object-fit: fit;

  border: 1px solid ${({ theme }) => theme.colors.katchup_line_gray};
  border-radius: 50%;
`;

const StChangeBtn = styled.button`
  padding-top: 0.9rem;

  color: ${({ theme }) => theme.colors.katchup_dark_gray};
  ${({ theme }) => theme.fonts.h3_title};
`;
