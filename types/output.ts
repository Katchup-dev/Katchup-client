export interface mainCategoryInfo {
  categoryId: number;
  name: string;
  isShared: boolean;
}

export interface mainCtxType {
  query: {
    mainId: string;
  };
}
export interface middleCtxType {
  query: {
    mainId: string;
    middleId: string;
  };
}

export interface cardCtxType {
  query: {
    cardId: string;
  };
}

export interface SelectMainCategoryInfo {
  mainCategory: string;
  categoryId: number;
}

export interface SelectMiddleCategoryInfo {
  middleCategory: string;
  folderId: number;
}

export interface MiddleCategoryInfo {
  taskId: number;
  name: string;
}

export interface WorkCardInfo {
  taskId: number;
  cardId: number;
  placementOrder: number;
  subTaskName: string;
  keywordList: KeywordInfo[];
  existScreenshot: boolean;
  content: string;
  existFile: boolean;
}

export interface KeywordInfo {
  keywordId: number;
  name: string;
}

export interface FileInfo {
  fileUUID: string;
  fileOriginalName: string;
  fileChangedName: string;
  fileUploadDate: string;
  size: 189277;
}

export interface FileListInfo {
  fileUUID: string;
  fileOriginalName: string;
  fileChangedName: string;
  fileUploadDate: string;
  size: number;
}

export interface ScreenshotInfo {
   screenshotUUID: string;
  screenshotName: string;
  screenshotUrl: string;
  screenshotUploadDate: string;
  stickerList: [];
}

export interface DetailInfo {
  cardId: number;
  categoryId: number;
  categoryName: string;
  taskId: number;
  taskName: string;
  subTaskId: number;
  subTaskName: string;
  content: string;
  note: string;
  keywordList: [
    {
      keywordId: number;
      name: string;
      color: string;
    },
  ];
  screenshotList: ScreenshotInfo[];
  fileList: FileListInfo[];
}
