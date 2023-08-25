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

export interface PostCardInfo {
  categoryId: number;
  taskId: number;
  subTaskId: number;
  keywordIdList: number[];
  screenshotList: PostScreenshotListInfo[];
  fileList: PostFileListInfo[];
  note: string;
  content: string;
}

export interface PostScreenshotListInfo {
  screenshotUUID: string;
  screenshotUrl: string;
  stickerList: PostStickerListInfo[];
}

export interface PostStickerListInfo {
  order: string;
  x: string;
  y: string;
}

export interface PostFileListInfo {
  fileUUID: string;
  fileName: string;
  fileUploadDate: string;
  size: number;
}
