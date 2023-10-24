import { client } from 'lib/axios';
import { WithdrawsReasonInfo } from 'types/auth';

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

export const postWithdraws = async (reason: WithdrawsReasonInfo) => {
  try {
    const { data } = await client.delete('/withdraws', { data: reason });
    return data;
  } catch (error) {
    console.error(error);
  }
};
