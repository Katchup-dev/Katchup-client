import { client } from 'lib/axios';

export const getMainCategoryList = async (memberId: number) => {
  const { data } = await client.get(`/categories/${memberId}`);
  return data;
};

export const getMiddleCategoryList = async (categoryId: number) => {
  const { data } = await client.get(`/tasks/categories/${categoryId}`);

  return data;
};

export const getWorkCard = async (taskId: number) => {
  const { data } = await client.get(`/tasks/${taskId}/cards`);

  return data;
};

export const getDetailPage = async (cardId: number) => {
  const { data } = await client.get(`/cards/${cardId}`);

  return data;
};

export const postNewMainCategory = async (name: string) => {
  const { data } = await client.post(`/categories`, {
    name,
  });

  return data;
};

export const postNewMiddleCategory = async (categoryId: number, name: string) => {
  const { data } = await client.post(`/tasks`, {
    categoryId,
    name,
  });
  console.log('hi', data);

  return data;
};

export const deleteMainCategory = async (mainId: number) => {
  try {
    const res = await client.delete(`/categories/${mainId}`);
    return res;
  } catch (error) {
    console.error(error);
  }
};

export const deleteMiddleCategory = async (taskId: number) => {
  try {
    const res = await client.delete(`/tasks/${taskId}`);
    return res;
  } catch (error) {
    console.error(error);
  }
};

export const deleteWorkCards = async (cardIdList: number[]) => {
  try {
    const res = await client.delete(`/cards`, {
      data: {
        cardIdList: cardIdList,
      },
    });

    return res;
  } catch (error) {
    console.error(error);
  }
};

export const patchMainCategory = async (categoryId: number, name: string) => {
  try {
    const res = await client.patch(`/categories/${categoryId}`, {
      name,
    });

    return res;
  } catch (error) {
    console.error(error);
  }
};

export const patchMiddleCategory = async (taskId: number, name: string) => {
  try {
    const res = await client.patch(`/tasks/${taskId}`, {
      name,
    });

    console.log(res);
    return res;
  } catch (error) {
    console.error(error);
  }
};

export const getFileDownload = async (fileUUID: string, fileName: string) => {
  try {
    const res = await client.get(`files/presigned/download?fileUUID=${fileUUID}&fileName=${fileName}`);
    return res.data.data;
  } catch (error) {
    console.error(error);
  }
};
