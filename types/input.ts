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

export interface InputFolderInfo {
  folderId: number;
  name: string;
}

export interface InputTaskInfo {
  taskId: number;
  name: string;
}

export interface postFolderInfo {
  categoryId: number;
  name: string;
}

export interface postTaskInfo {
  folderId: number;
  name: string;
}
