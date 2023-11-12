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

export { client };
