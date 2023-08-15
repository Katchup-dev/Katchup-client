import { categorySelectState } from 'core/atom';
import { IcBtnAddIndex } from 'public/assets/icons';
import { useRecoilState } from 'recoil';
import { InputCategoryInfo } from 'types/input';

import styled from '@emotion/styled';

import { usePostCategory } from '../../lib/hooks/usePostIndex';
import { useGetCategories } from 'lib/hooks/useGetIndex';

interface dropdownIndexProps {
  inputValue: string;
}

const DropdownCategory = ({ inputValue }: dropdownIndexProps) => {
  let isAdd = true;
  let addArr: InputCategoryInfo[] = [];

  const { categories, isCategoriesLoading, isCategoriesError } = useGetCategories();
  const [, setCategorySelect] = useRecoilState(categorySelectState);
  const postCategory = usePostCategory();

  const handleOptionClick = (option: InputCategoryInfo) => {
    setCategorySelect(option);
  };

  const handleAddIndex = (name: string) => {
    const categoryData = inputValue;
    postCategory.createCategory(categoryData);
  };

  const displayOptions = () => {
    if (inputValue?.length > 0 && categories) {
      if (!categories.find((option) => option.name === inputValue)) {
        addArr = [...addArr, { categoryId: categories.length, name: inputValue, isShared: false }];
      } else {
        isAdd = false;
      }
    }
    return categories?.map((option, idx) => (
      <li key={idx} onMouseDown={() => handleOptionClick(option)}>
        {option.name}
      </li>
    ));
  };

  return (
    <StDropdown>
      {displayOptions()}
      {addArr.map((option, idx) => (
        <li>
          {option.name}
          {isAdd && inputValue && (
            <IcBtnAddIndex
              onMouseDown={() => {
                handleAddIndex(option.name);
              }}
            />
          )}
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

  width: 53.4rem;
  height: 28rem;

  overflow: scroll;
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
      display: none;

      margin-bottom: -1rem;
    }
    :last-child > svg {
      display: block;
    }
  }
`;
