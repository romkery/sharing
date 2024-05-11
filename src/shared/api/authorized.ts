import axios from 'axios';

const client = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_BASE_URL}/api/`,
  withCredentials: true,
});

type headers = {
  [key: string]: string;
  'Content-Type': string;
  Accept: string;
};

// @ts-ignore
client.defaults.headers = {
  'Content-Type': 'application/x-www-form-urlencoded',
  Accept: 'application/json',
} as headers;

client.interceptors.request.use((config) => {
  // Set token before request
  const token = localStorage.getItem('jwtToken');
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});

client.interceptors.response.use(
  (res) => res,
  async (err) => {
    const originalRequest = err.config;

    // Redirect on login
    if (err.response.status === 401 && !originalRequest._retry) {
      window.location.replace('/login');
    }

    return Promise.reject(err);
  },
);

export { client };
