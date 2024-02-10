import { publicApiClient } from '@/shared/api';

import { LoginParamsType, RegisterParamsType } from '../types';

export async function login({ ...data }: LoginParamsType) {
  const response = await publicApiClient.post('api/auth/local', data, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (response.status === 200) {
    localStorage.setItem('jwtToken', response.data.jwt);
  }

  return response.status === 200;
}

export async function register({ ...data }: RegisterParamsType) {
  const response = await publicApiClient.post('api/auth/local/register', data, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (response.status === 200) {
    localStorage.setItem('jwtToken', response.data.jwt);
  }

  return response.status === 200;
}
