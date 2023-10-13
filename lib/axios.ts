import axios from 'axios';
import { ACCESS_TOKEN_EXPIRED, GOOGLE_TOKEN_EXPIRED, REFRESH_TOKEN_EXPIRED, USER_UNAUTHORIZED } from 'constants/error';
import { getAccessToken, getRefreshToken, removeTokens, renewTokens, setAuthHeaders } from 'core/apis/token';

const client = axios.create({
  baseURL: process.env.NEXT_PUBLIC_APP_IP,
  headers: {
    'Content-type': 'application/json',
    'Access-Control-Allow-Origin': process.env.NEXT_PUBLIC_APP_IP,
  },
});

client.interceptors.request.use((config) => {
  const accessToken = getAccessToken();
  const refreshToken = getRefreshToken();

  if (accessToken && refreshToken) {
    setAuthHeaders(config, accessToken, refreshToken);
  }
  return config;
});

client.interceptors.response.use(
  function (response) {
    return response;
  },
  async (error) => {
    const { config, response } = error;
    const code = response?.data?.status;

    if (code === ACCESS_TOKEN_EXPIRED) {
      renewTokens(config);
      return axios(config);
    }
    if (code === (USER_UNAUTHORIZED || GOOGLE_TOKEN_EXPIRED || REFRESH_TOKEN_EXPIRED)) {
      removeTokens();
      window.location.href = '/';
      return;
    }
  },
);

export const katchupGetFetcher = (url: string) => client.get(url).then((res) => res.data);
export { client };
