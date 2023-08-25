import axios from 'axios';
import { client } from 'lib/axios';
import { PostCardInfo, PostKeywordInfo, PostSubTaskInfo, PostTaskInfo } from 'types/input';

// ----- 대, 중, 소분류 조회 -----

export const getCategories = async () => {
  try {
    const { data } = await client.get(`/categories`);
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

    console.log('response', response);
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

      console.log(location);
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

    console.log(location);
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
    console.log(keywordInfo);
    const response = await client.post(`/keywords`, keywordInfo);
    const location = response.headers['location'];

    console.log(location);
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

// ---- 스크린샷 presigned url 생성 ----
export const getPresignedUrl = async (screenshotName: string) => {
  try {
    const { data } = await client.get(`/screenshots/presigned?screenshotName=${screenshotName}`);
    return data;
  } catch (error) {
    console.error(error);
  }
};

// ---- 스크린샷 업로드 ----
export const putScreenshot = async (presignedUrl: string, file: File) => {
  try {
    const { data } = await axios.put(`${presignedUrl}`, file);
    return data;
  } catch (error) {
    console.error(error);
  }
};

// ---- 파일 presigned url 생성 ----
export const getFilePresignedUrl = async (fileName: string) => {
  try {
    const { data } = await client.get(`/files/presigned?fileName=${fileName}`);
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
