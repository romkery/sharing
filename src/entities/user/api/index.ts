import { authorizedApiClient } from '@/shared/api';

export async function getUser() {
  const { data } = await authorizedApiClient.get<UserType>(`/users/me`);
  return data;
}

export async function getUsers() {
  const { data } = await authorizedApiClient.get<UserType[]>(`users`);
  return data;
}
