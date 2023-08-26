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
  id: string;
  originalName: string;
  changedName: string;
  size: string;
}

export interface ScreenshotInfo {
  id: number;
  stickerOrder: number;
  url: string;
}
