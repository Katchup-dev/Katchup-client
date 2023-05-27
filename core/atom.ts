import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';
import { UserProfileInfo } from 'types/auth';
import { InputCategoryInfo } from 'types/input';

const { persistAtom } = recoilPersist();

export const currentMainCategoryAtom = atom<SelectMainCategoryInfo>({
  key: `currentMainCategory`,
  default: {
    mainCategory: '',
    categoryId: 0,
  },
  effects_UNSTABLE: [persistAtom],
});

export const categorySelectState = atom<InputCategoryInfo>({
  key: `categorySelect`,
  default: {
    categoryId: 0,
    name: '',
    isShared: false,
  },
});
