import { authorizedApiClient } from '@/shared/api';

export async function getUser() {
  const { data } = await authorizedApiClient.get<any[]>('users');
  return data;
}
