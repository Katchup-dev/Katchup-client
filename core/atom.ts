import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';
import { InputCategoryInfo, InputSubTaskInfo, InputTaskInfo } from 'types/input';
import { SelectMainCategoryInfo, SelectMiddleCategoryInfo } from 'types/output';

const { persistAtom } = recoilPersist();

export const currentMainCategoryIdxAtom = atom<number>({
  key: `currentMainCategory`,
  default: 0,
});

export const currentMiddleCategoryIdAtom = atom<number>({
  key: `currentMiddleCategory`,
  default: 0,
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

export const taskSelectState = atom<InputTaskInfo>({
  key: `taskSelect`,
  default: {
    taskId: 0,
    name: '',
  },
});

export const subTaskSelectState = atom<InputSubTaskInfo>({
  key: `subTaskSelect`,
  default: {
    subTaskId: 0,
    name: '',
  },
});

export const workInputState = atom<string>({
  key: `workInput`,
  default: '',
});
