import axios, { HeadersDefaults } from 'axios';

const client = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_BASE_URL}/api/`,
  withCredentials: true,
});

type headers = {
  [key: string]: string;
  'Content-Type': string;
  Accept: string;
} & HeadersDefaults;

client.defaults.headers = {
  'Content-Type': 'application/x-www-form-urlencoded',
  Accept: 'application/json',
} as headers;

client.interceptors.response.use(
  (res) => res,
  async (err) => {
    const originalConfig = err.config;
    if (
      err?.response.status === 403 ||
      (err?.response.status === 403 && !originalConfig._retry)
    ) {
      originalConfig._retry = true;
      try {
        return client(originalConfig);
      } catch (error) {}
    }
    return Promise.reject(err);
  },
);

export { client };
