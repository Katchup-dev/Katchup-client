export interface mainCategoryInfo {
  categoryId: number;
  name: string;
  isShared: boolean;
}

export interface ctxType {
  query: {
    mainId: string;
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
  folderId: number;
  name: string;
}

export interface WorkCardInfo {
  taskId: number;
  cardId: number;
  placementOrder: number;
  cardName: string;
  keywordList: KeywordInfo[];
  content: string;
  existFile: boolean;
}

export interface KeywordInfo {
  keywordId: number;
  name: string;
}

export interface FileInfo {
  id: number;
  name: string;
  url: string;
  size: string;
}

export interface ScreenshotInfo {
  id: number;
  stickerOrder: number;
  url: string;
}
