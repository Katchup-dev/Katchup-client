import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';
import {
  InputCategoryInfo,
  InputKeywordInfo,
  InputSubTaskInfo,
  InputTaskInfo,
  PostFileListInfo,
  PostScreenshotListInfo,
} from 'types/input';
import { IdForUpdateType } from 'types/update';

const { persistAtom } = recoilPersist();

export const tokenState = atom<string>({
  key: `token`,
  default: '',
  effects_UNSTABLE: [persistAtom],
});

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

export const keywordSelectState = atom<InputKeywordInfo[]>({
  key: 'keywordSelect',
  default: [],
});

export const subTaskSelectState = atom<InputSubTaskInfo>({
  key: `subTaskSelect`,
  default: {
    subTaskId: 0,
    name: '',
  },
});

export const deleteWorkCard = atom<number[]>({
  key: `deleteWorkCard`,
  default: [],
});

export const workInputState = atom<string>({
  key: `workInput`,
  default: '',
});

export const keywordListState = atom<number[]>({
  key: 'keywordList',
  default: [],
});

export const etcState = atom<string>({
  key: 'etc',
  default: '',
});

export const fileSelectState = atom<PostFileListInfo[]>({
  key: 'fileSelect',
  default: [],
});

export const fileNameChangeState = atom<boolean>({
  key: 'isFileNameChangeChecked',
  default: true,
});

export const screenshotSelectState = atom<PostScreenshotListInfo[]>({
  key: 'screenshotSelect',
  default: [],
});

export const updateCardIdState = atom<number>({
  key: 'updateCardId',
  default: 0,
});

export const memberId = atom<number>({
  key: `memberId`,
  default: 0,
  effects_UNSTABLE: [persistAtom],
});

export const idForUpdate = atom<IdForUpdateType>({
  key: `IdForUpdate`,
  default: {
    mainId: '',
    middleId: '',
  },
});
