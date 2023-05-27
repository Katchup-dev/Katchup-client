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
