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

export interface postTaskInfo {
  categoryId: number;
  name: string;
}

export interface postSubTaskInfo {
  taskId: number;
  name: string;
}

export interface InputKeywordInfo {
  taskId: number;
  name: string;
  color: string;
}
