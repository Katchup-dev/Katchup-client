import AddCategoryModal from 'components/Modal/AddCategoryModal';
import { useRouter } from 'next/router';
import { IcAddMiddle } from 'public/assets/icons';
import { useState } from 'react';

import styled from '@emotion/styled';

import { StMiddleFolder } from './MiddleCategory';

export interface AddMiddleCategoryProps {
  mainId: string;
}

const AddMiddleCategory = (props: AddMiddleCategoryProps) => {
  const { mainId } = props;
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  return (
    <>
      {/* {isModalOpen && (
        <AddCategoryModal mainId={mainId} isMainCategory={false} isOpen={isModalOpen} setIsOpen={setIsModalOpen} />
      )} */}
      <StAddMiddleCategory onClick={() => setIsModalOpen(true)}>
        <IcAddMiddle />
      </StAddMiddleCategory>
    </>
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
