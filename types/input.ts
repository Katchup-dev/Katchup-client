export interface KatchupResponse<T> {
  status: number;
  success: boolean;
  message: string;
  data: T;
}

export interface InputCategoryInfo {
  categoryId: number;
  name: string;
  isShared: boolean;
}
