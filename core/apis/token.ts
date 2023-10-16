import { AxiosRequestConfig } from 'axios';
import { client } from 'lib/axios';

const getAccessToken = () => localStorage.getItem('accessToken') || '';
const getRefreshToken = () => localStorage.getItem('refreshToken') || '';

const setTokens = (accessToken: string, refreshToken: string) => {
  localStorage.setItem('accessToken', accessToken);
  localStorage.setItem('refreshToken', refreshToken);
};

const removeTokens = () => {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
};

const setAuthHeaders = (config: AxiosRequestConfig, accessToken: string, refreshToken: string): AxiosRequestConfig => {
  config.headers!.Authorization = `Bearer ${accessToken}`;
  config.headers!.Refresh = refreshToken;
  return config;
};

const renewTokens = async (config: AxiosRequestConfig): Promise<void> => {
  try {
    const { data } = await client.get('/auth/token');
    console.log(data);

    const newAccessToken = data.data.accessToken;
    const newRefreshToken = data.data.refreshToken;

    setTokens(newAccessToken, newRefreshToken);
    setAuthHeaders(config, newAccessToken, newRefreshToken);
  } catch (err) {
    console.error('Error renewing token:', err);
    window.location.href = '/';
  }
};

export { getAccessToken, getRefreshToken, setTokens, removeTokens, setAuthHeaders, renewTokens };
