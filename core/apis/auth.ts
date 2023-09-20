import axios from 'axios';

const auth = axios.create({
  baseURL: process.env.NEXT_PUBLIC_APP_IP,
  headers: {
    'Content-type': 'application/json',
    'Access-Control-Allow-Origin': process.env.NEXT_PUBLIC_APP_IP,
  },
});

export const signup = async (accessToken: string) => {
  try {
    const { data } = await auth.post('/auth', { accessToken });
    console.log(data);
    return data;
  } catch (error) {
    console.error(error);
  }
};
