import { client } from "lib/axios";

export const signup = async (accessToken: string) => {
  try {
    const { data } = await client.post('/auth', { accessToken });
    console.log(data.data);
    return data.data;
  } catch (error) {
    console.error(error);
  }
};

export const getRefreshToken = async () => {
  try {
    const { data } = await client.post('/auth/token');
    console.log(data.data);
    return data.data;
  } catch (error) {
    console.error(error);
  }
};
