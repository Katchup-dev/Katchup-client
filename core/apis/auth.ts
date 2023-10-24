import { client } from 'lib/axios';

export const signup = async (accessToken: string) => {
  try {
    const { data } = await client.post('/auth', { accessToken });
    console.log(data.data);
    return data.data;
  } catch (error) {
    console.error(error);
  }
};

export const postLogout = async () => {
  try {
    const { data } = await client.post('/auth/logout');
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const getProfile = async () => {
  try {
    const { data } = await client.get(`/members/profile`);
    return data.data;
  } catch (error) {
    console.error(error);
  }
};
