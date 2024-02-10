import { publicApiClient } from '@/shared/api';

import { LoginParamsType, RegisterParamsType } from '../types';

export async function login({ ...data }: LoginParamsType) {
  const response = await publicApiClient.post('api/auth/local', data, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return response.status === 200
    ? localStorage.setItem('jwtToken', response.data.jwt)
    : null;
}

export async function register({ ...data }: RegisterParamsType) {
  const response = await publicApiClient.post('api/auth/local/register', data, {
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return response.status === 200
    ? localStorage.setItem('jwtToken', response.data.jwt)
    : null;
}

// export async function logout() {
//   const response = await publicApiClient.post('v2.1/logout');
//   return response.status === 204 ? true : false;
// }
