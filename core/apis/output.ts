import { client } from 'lib/axios';

export const getMainCategoryList = async () => {
  const { data } = await client.get(`/categories`);
  console.log(data);
  return data;
};

export const getMiddleCategoryList = async (categoryId: number) => {
  const { data } = await client.get(`/folders/categories/${categoryId}`);

  return data;
};

export const getWorkCard = async (folderId: number) => {
  const { data } = await client.get(`/folders/${folderId}/cards`);

  return data;
};

export const getDetailPage = async (cardId: number) => {
  const { data } = await client.get(`/cards/${cardId}`);

  return data;
};
