import { client } from 'lib/axios';
import { PostKeywordInfo, PostSubTaskInfo, PostTaskInfo } from 'types/input';

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
    const { data } = await client.post(`/categories`, name);
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const postTasks = async (taskInfo: PostTaskInfo) => {
  try {
    const { data } = await client.post(`/tasks`, taskInfo);
    console.log(data);
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const postSubTasks = async (subTaskInfo: PostSubTaskInfo) => {
  try {
    const { data } = await client.post(`/subTasks`, subTaskInfo);
    return data;
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
    const { data } = await client.post(`/cards/keywords`, keywordInfo);
    return data;
  } catch (error) {
    console.error(error);
  }
};
