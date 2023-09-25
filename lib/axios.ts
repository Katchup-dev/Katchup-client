import axios from "axios";

const client = axios.create({
  baseURL: process.env.NEXT_PUBLIC_APP_IP,
  headers: {
    'Content-type': 'application/json',
    'Access-Control-Allow-Origin': process.env.NEXT_PUBLIC_APP_IP,
  },
});

client.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem('accessToken');
  const refreshToken = localStorage.getItem('refreshToken');

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
    config.headers.Refresh = refreshToken;
  }
  return config;
});

export const katchupGetFetcher = (url: string) => client.get(url).then((res) => res.data);
export { client };
