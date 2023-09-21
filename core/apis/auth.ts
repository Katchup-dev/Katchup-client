import { client } from 'lib/axios';

export const signup = async (accessToken: string) => {
  try {
    const { data } = await client.post('/auth', { accessToken });
    return data.data.accessToken;
  } catch (error) {
    console.error(error);
  }
};
