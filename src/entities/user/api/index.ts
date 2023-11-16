import { authorizedApiClient } from '@/shared/api';

export async function getUser({ username }: { username: string }) {
  const { data } = await authorizedApiClient.get<any[]>(
    `users?filters[$and][0][username][$eq]=${username}`,
  );
  return data;
}

export async function getUsers() {
  const { data } = await authorizedApiClient.get<any[]>(`users`);
  return data;
}
