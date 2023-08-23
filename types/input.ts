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

export interface InputTaskInfo {
  taskId: number;
  name: string;
}

export interface InputSubTaskInfo {
  subTaskId: number;
  name: string;
}

export interface InputKeywordInfo {
  keywordId: number;
  name: string;
  color: string;
}

export interface PostTaskInfo {
  categoryId: number;
  name: string;
}

export interface PostSubTaskInfo {
  taskId: number;
  name: string;
}

export interface PostKeywordInfo {
  taskId: number;
  name: string;
  color: string;
}
