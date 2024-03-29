import axios from 'axios';
import { client } from 'lib/axios';
import { PostCardInfo, PostKeywordInfo, PostSubTaskInfo, PostTaskInfo } from 'types/input';

// ----- 대, 중, 소분류 조회 -----

export const getCategories = async (memberId: number) => {
  try {
    const { data } = await client.get(`/categories/${memberId}`);
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const getTasks = async (categoryId: number) => {
  try {
    const { data } = await client.get(`/tasks/categories/${categoryId}`);
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const getSubTasks = async (taskId: number) => {
  try {
    const { data } = await client.get(`/subTasks/${taskId}`);
    return data;
  } catch (error) {
    console.error(error);
  }
};

// ----- 대, 중, 소분류 생성 -----

export const postCategories = async (name: string) => {
  try {
    const response = await client.post(`/categories`, name);
    const location = response.headers['location'];
    return location;
  } catch (error) {
    console.error(error);
  }
};

export const postTasks = async (taskInfo: PostTaskInfo) => {
  {
    try {
      const response = await client.post(`/tasks`, taskInfo);
      const location = response.headers['location'];
      return location;
    } catch (error) {
      console.error(error);
    }
  }
};

export const postSubTasks = async (subTaskInfo: PostSubTaskInfo) => {
  try {
    const response = await client.post(`/subTasks`, subTaskInfo);
    const location = response.headers['location'];
    return location;
  } catch (error) {
    console.error(error);
  }
};

// ----- 키워드 조회, 생성 -----

export const getKeywords = async (taskId: number) => {
  try {
    const { data } = await client.get(`/keywords/${taskId}`);
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const postKeywords = async (keywordInfo: PostKeywordInfo) => {
  try {
    const response = await client.post(`/keywords`, keywordInfo);
    const location = response.headers['location'];
    return location;
  } catch (error) {
    console.error(error);
  }
};

// ----- 업무 카드 생성 -----

export const postCard = async (cardInfo: PostCardInfo) => {
  try {
    const { data } = await client.post(`/cards`, cardInfo);
    console.log(data);
    return data;
  } catch (error) {
    console.error(error);
  }
};

// ----- 업무 카드 수정 -----

export const patchCard = async ({ cardInfo, cardId }: { cardInfo: PostCardInfo; cardId: number }) => {
  try {
    console.log('안녕', cardInfo, cardId);
    const { data } = await client.patch(`/cards/${cardId}`, cardInfo);
    console.log('들어가니?', data);
    return data;
  } catch (error) {
    console.log('에러');
    console.error(error);
  }
};

// ---- 스크린샷 presigned url 생성 ----
export const getPresignedUrl = async (screenshotName: string) => {
  try {
    const { data } = await client.get(`/screenshots/presigned?screenshotName=${screenshotName}`);
    return data.data;
  } catch (error) {
    console.error(error);
  }
};

// ---- 스크린샷 삭제 ----
export const deleteScreenshot = async (
  screenshotName: string,
  screenshotUUID: string,
  screenshotUploadDate: string,
) => {
  try {
    const { data } = await client.delete(
      `/screenshots?screenshotName=${screenshotName}&screenshotUploadDate=${screenshotUploadDate}&screenshotUUID=${screenshotUUID}`,
    );
    return data.data;
  } catch (error) {
    console.error(error);
  }
};

// ---- 스크린샷 업로드 ----
export const putScreenshot = async (presignedUrl: string, file: File) => {
  try {
    const data = await axios.put(`${presignedUrl}`, file);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
};

// ---- 파일 presigned url 생성 ----
export const getFilePresignedUrl = async (fileName: string) => {
  try {
    const { data } = await client.get(`/files/presigned/upload?fileName=${fileName}`);
    return data.data;
  } catch (error) {
    console.error(error);
  }
};

// ---- 파일 업로드 ----
export const putFile = async (presignedUrl: string, file: File) => {
  try {
    const data = await axios.put(`${presignedUrl}`, file);
    return data;
  } catch (error) {
    console.error(error);
  }
};

// ---- 파일 삭제 ----
export const deleteFile = async (fileOriginalName: string, fileUploadDate: string, fileUUID: string) => {
  try {
    const { data } = await client.delete(
      `/files?fileOriginalName=${fileOriginalName}&fileUploadDate=${fileUploadDate}&fileUUID=${fileUUID}`,
    );
    return data.data;
  } catch (error) {
    console.log(error);
  }
};
