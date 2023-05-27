export interface mainCategoryInfo {
  categoryId: number;
  name: string;
  isShared: boolean;
}

export interface SelectMainCategoryInfo {
  mainCategory: string;
  categoryId: number;
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
