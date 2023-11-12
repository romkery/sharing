import { publicApiClient } from '@/shared/api';

export async function refresh() {
  const response = await publicApiClient.post('v2.1/refresh');
  return response.status === 204 ? true : false;
}
