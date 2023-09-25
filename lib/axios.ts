import axios from "axios";
import {
  getAccessToken,
  getRefreshToken,
  renewTokens,
  setAuthHeaders
} from "core/apis/token";

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

    // 리프레시 토큰도 만료된 경우 재로그인
    if (response.status === 401) {
      if (response.data.status === 'KC-204') {
        window.location.href = '/';
        return;
      }
    }
    renewTokens(config);

    return axios(config);
  },
);

export const katchupGetFetcher = (url: string) => client.get(url).then((res) => res.data);
export { client };
