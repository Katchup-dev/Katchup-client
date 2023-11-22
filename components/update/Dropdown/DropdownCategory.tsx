import { categorySelectState, memberId } from 'core/atom';
import { useGetCategories } from 'lib/hooks/input/useGetIndex';
import { IcBtnAddIndex } from 'public/assets/icons';
import { useRecoilState, useRecoilValue } from 'recoil';
import { InputCategoryInfo } from 'types/input';

import styled from '@emotion/styled';

import { usePostCategory } from '../../../lib/hooks/input/usePostIndex';

interface dropdownIndexProps {
  inputValue: string;
}

const DropdownCategory = ({ inputValue }: dropdownIndexProps) => {
  let isAdd = true;
  let addArr: InputCategoryInfo[] = [];

  const userMemberId = useRecoilValue(memberId);
  const { categories } = useGetCategories(userMemberId);
  const [, setCategorySelect] = useRecoilState(categorySelectState);
  const { createCategory } = usePostCategory();

  const handleOptionClick = (option: InputCategoryInfo) => {
    setCategorySelect(option);
  };

  const handleAddIndex = async () => {
    const location = await createCategory(inputValue);
    if (location) setCategorySelect({ categoryId: location, name: inputValue, isShared: false });
  };

  const displayNewOptions = () => {
    if (inputValue?.length > 0 && categories) {
      if (!categories.find((option) => option.name === inputValue)) {
        addArr = [...addArr, { categoryId: categories.length, name: inputValue, isShared: false }];
      } else {
        isAdd = false;
      }
    }
    return addArr.map((option, idx) => (
      <li key={idx}>
        {option.name}
        {isAdd && inputValue && (
          <IcBtnAddIndex
            onMouseDown={() => {
              handleAddIndex();
            }}
          />
        )}
      </li>
    ));
  };

  return (
    <StDropdown>
      {displayNewOptions()}
      {categories?.map((option, idx) => (
        <li key={idx} onMouseDown={() => handleOptionClick(option)}>
          {option.name}
        </li>
      ))}
    </StDropdown>
  );
};

export default DropdownCategory;

const StDropdown = styled.ul`
  position: absolute;
  top: 7.2rem;

  z-index: 1;

  width: 100%;
  height: 20rem;

  overflow: auto;
  padding: 1.2rem 1.4rem;

  border: 0.1rem solid #e2e2e2;
  border-radius: 0 0 0.8rem 0.8rem;
  box-shadow: 0 0.2rem 0.4rem rgba(0, 0, 0, 0.23);
  background-color: ${({ theme }) => theme.colors.katchup_white};

  & > li {
    display: flex;
    justify-content: space-between;

    margin-bottom: 1rem;

    ${({ theme }) => theme.fonts.h2_smalltitle};

    cursor: pointer;

    & > svg {
      display: block;

      margin-bottom: -1rem;
    }
  }
`;
