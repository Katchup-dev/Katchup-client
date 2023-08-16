import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';
import { InputCategoryInfo, InputFolderInfo, InputTaskInfo } from 'types/input';
import { SelectMainCategoryInfo, SelectMiddleCategoryInfo } from 'types/output';

const { persistAtom } = recoilPersist();

export const currentMiddleCategoryAtom = atom<SelectMiddleCategoryInfo>({
  key: `currentMiddleCategory`,
  default: {
    middleCategory: '',
    folderId: 0,
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
