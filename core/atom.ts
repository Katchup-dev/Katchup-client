import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';
import { InputCategoryInfo, InputFolderInfo, InputTaskInfo } from 'types/input';

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

export const folderSelectState = atom<InputFolderInfo>({
  key: `folderSelect`,
  default: {
    folderId: 0,
    name: '',
  },
});

export const taskSelectState = atom<InputTaskInfo>({
  key: `taskSelect`,
  default: {
    taskId: 0,
    name: '',
  },
});

export const deleteWorkCard = atom<number[]>({
  key: `deleteWorkCard`,
  default: [],
});
