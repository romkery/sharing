import { publicApiClient } from '@/shared/api';

type LoginParamsType = {
  identifier: string;
  password: string;
};

export async function login({ ...data }: LoginParamsType) {
  const response = await publicApiClient.post('auth/local', data);
  return response.status === 200 ? true : false;
}

// export async function logout() {
//   const response = await publicApiClient.post('v2.1/logout');
//   return response.status === 204 ? true : false;
// }
