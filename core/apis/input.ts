import axios from 'axios';
import { client } from 'lib/axios';
import { InputFolderInfo, postFolderInfo } from 'types/input';

export const getCategories = async () => {
  try {
    const { data } = await client.get(`/categories`);
    console.log(data.data);
    return data.data;
  } catch (error) {
    console.error(error);
  }
};

export const getFolders = async () => {
  try {
    const { data } = await client.get(`/folders`);
    console.log(data.data);
    return data.data;
  } catch (error) {
    console.error(error);
  }
};

export const getTasks = async () => {
  try {
    const { data } = await client.get(`/tasks`);
    console.log(data.data);
    return data.data;
  } catch (error) {
    console.error(error);
  }
};

export const postCategories = async (name: string) => {
  try {
    const { data } = await client.post(`/categories`, { name });
    console.log(data);
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const postFolders = async (folderInfo: postFolderInfo) => {
  try {
    const { data } = await client.post(`/folders`, folderInfo);
    console.log(data);
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const postTasks = async (taskInfo: InputFolderInfo) => {
  try {
    const { data } = await client.post(`/tasks`, taskInfo);
    console.log(data);
    return data;
  } catch (error) {
    console.error(error);
  }
};
