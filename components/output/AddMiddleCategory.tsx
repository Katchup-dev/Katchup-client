import styled from '@emotion/styled';
import { StMiddleFolder } from './MiddleCategory';
import { IcAddMiddle } from 'public/assets/icons';

const AddMiddleCategory = () => {
  return (
    <StAddMiddleCategory>
      <IcAddMiddle />
    </StAddMiddleCategory>
  );
};

const StAddMiddleCategory = styled(StMiddleFolder)`
  background-color: ${({ theme }) => theme.colors.katchup_bg_gray};

  svg {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;

export default AddMiddleCategory;
