import { categorySelectState } from 'core/atom';
import React, { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';

import { css } from '@emotion/react';
import styled from '@emotion/styled';

import { DropdownCategory } from '../../Dropdown';

interface UpdateCategoryProps {
  prevCategoryId: number;
  prevCategoryName: string;
}

const UpdateCategory = (props: UpdateCategoryProps) => {
  const { prevCategoryId, prevCategoryName } = props;
  const [category, setCategory] = useState('');
  const [categoryCount, setCategoryCount] = useState(0);
  const [isCategoryFocused, setIsCategoryFocused] = useState(false);
  const [selectedCategory, setSelectedCategory] = useRecoilState(categorySelectState);

  useEffect(() => {
    setSelectedCategory({
      categoryId: prevCategoryId,
      name: prevCategoryName,
      isShared: true,
    });
    setCategory(prevCategoryName);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCategory(e.target.value);
    setCategoryCount(e.target.value.length);
  };

  useEffect(() => {
    setCategory(selectedCategory.name);
  }, [selectedCategory]);

  return (
    <StInputIndex isFocused={isCategoryFocused}>
      카테고리
      <input
        type="text"
        name="category"
        value={category}
        onChange={handleInputChange}
        onFocus={() => setIsCategoryFocused(true)}
        onBlur={() => setIsCategoryFocused(false)}
        placeholder="카테고리를 입력해 주세요."
        maxLength={20}
        autoComplete="off"
      />
      {isCategoryFocused && <DropdownCategory inputValue={category} />}
      <p>
        <span>{categoryCount}</span>/20
      </p>
    </StInputIndex>
  );
};

export default UpdateCategory;

export const StInputIndex = styled.label<{ isFocused: boolean }>`
  display: flex;
  flex-direction: column;
  position: relative;

  ${({ theme }) => theme.fonts.p1_text};

  & > input {
    margin-top: 0.4rem;
    margin-bottom: 2.2rem;

    padding: 1.4rem 11.1rem 1.2rem 1.4rem;
    border: 0.1rem solid ${({ theme }) => theme.colors.katchup_line_gray};
    border-radius: 0.8rem;
    ${({ theme }) => theme.fonts.h2_smalltitle};

    ${({ isFocused, theme }) =>
      isFocused
        ? css`
            background-color: ${theme.colors.katchup_light_gray};
            box-shadow: 0 0.2rem 0.4rem rgba(0, 0, 0, 0.23);
          `
        : css`
            background-color: ${theme.colors.katchup_white};
          `}

    ::placeholder {
      color: ${({ theme }) => theme.colors.katchup_gray};
    }
    outline: none;
  }

  & > p {
    position: absolute;
    top: 4rem;
    right: 1.4rem;

    ${({ theme }) => theme.fonts.p1_text};
    color: ${({ theme }) => theme.colors.katchup_dark_gray};

    & > span {
      ${({ theme }) => theme.fonts.p1_text};
      color: ${({ theme }) => theme.colors.katchup_main};
    }
  }
`;
