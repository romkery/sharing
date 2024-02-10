import { authorizedApiClient } from '@/shared/api';

export async function getUser() {
  const { data } = await authorizedApiClient.get<any[]>(`/users/me`);
  console.log(data, 'me');
  return data;
}

export async function getUsers() {
  const { data } = await authorizedApiClient.get<any[]>(`users`);
  return data;
}
