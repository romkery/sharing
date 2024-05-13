import { authorizedApiClient } from '@/shared/api';

import { ProductData } from '../types';

export async function getProduct({ id }: { id: number }) {
  const { data } = await authorizedApiClient.get<{
    data: ProductData;
  }>(`products/${id}?populate=*`);
  return data.data;
}
