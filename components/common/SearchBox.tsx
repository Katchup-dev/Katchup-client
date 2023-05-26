import styled from '@emotion/styled';
import { IcFilter, IcSearch } from 'public/assets/icons';

const SearchBox = () => {
  return (
    <>
      <StSearchForm>
        <label>
          <IcSearch />
          <IcFilter />
          <input placeholder="search" />
        </label>
      </StSearchForm>
    </>
  );
};

const StSearchForm = styled.form`
  width: 33rem;
  height: 4.5rem;

  > label {
    display: flex;
    align-items: center;
    position: relative;

    > svg:nth-child(1) {
      position: absolute;
      top: 1.2rem;
      left: 2.2rem;
    }
    > svg:nth-child(2) {
      position: absolute;
      top: 1.2rem;
      right: 2.2rem;

      cursor: pointer;
    }

    > input {
      width: 33rem;
      height: 4.5rem;

      padding-left: 6.2rem;
      padding-right: 5rem;

      border-radius: 2.5rem;
      font-size: 1.8rem;
      color: ${({ theme }) => theme.colors.katchup_gray};
    }
  }
`;

export default SearchBox;
