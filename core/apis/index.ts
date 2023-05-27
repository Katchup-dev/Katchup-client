import axios from 'axios';
import { client } from 'lib/axios';

export const getMainCategoryList = async () => {
  const { data } = await client.get(`/api/v1/categories`);
  console.log(data);
  return data;
};

export const getMiddleCategoryList = async (categoryId: number) => {
  const { data } = await client.get(`/api/v1/folders/categories/${categoryId}`);

  return data;
};
