import { client } from 'lib/axios';
import { InputSubTaskInfo, postTaskInfo } from 'types/input';

export const getCategories = async () => {
  try {
    const { data } = await client.get(`/categories`);
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const getTasks = async () => {
  try {
    const { data } = await client.get(`/tasks`);
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const getSubTasks = async () => {
  try {
    const { data } = await client.get(`/subTasks`);
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const postCategories = async (name: string) => {
  try {
    const { data } = await client.post(`/categories`, name);
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const postTasks = async (taskInfo: postTaskInfo) => {
  try {
    const { data } = await client.post(`/tasks`, taskInfo);
    console.log(data);
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const postSubTasks = async (subTaskInfo: InputSubTaskInfo) => {
  try {
    const { data } = await client.post(`/subTasks`, subTaskInfo);
    return data;
  } catch (error) {
    console.error(error);
  }
};
