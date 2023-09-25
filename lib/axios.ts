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

client.interceptors.response.use(
  function (response) {
    return response;
  },
  async (error) => {
    const { config, response } = error;
    const originalRequest = config;
    console.log(config, response);

    //token 만료
    if (response.status === 401) {
      console.log(response);

      const res = await client.get('/auth/token'); // token 재발급 api
      console.log(res.data);

      if (res.data.status === 400) {
        window.location.href = '/';
        return;
      }
      const newAccessToken = res.data.data.accessToken;
      const newRefreshToken = res.data.data.refreshToken;
      localStorage.setItem('accessToken', newAccessToken);
      localStorage.setItem('refreshToken', newRefreshToken);

      originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
      originalRequest.headers.Refresh = newRefreshToken;
      return axios(originalRequest);
    }
    return error.response;
  },
);

export const katchupGetFetcher = (url: string) => client.get(url).then((res) => res.data);
export { client };
