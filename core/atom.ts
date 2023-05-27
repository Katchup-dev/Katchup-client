import { SelectMainCategoryInfo } from 'types/output';

import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

export const currentMainCategoryAtom = atom<SelectMainCategoryInfo>({
  key: `currentMainCategory`,
  default: {
    mainCategory: '',
    categoryId: 0,
  },
  effects_UNSTABLE: [persistAtom],
});
