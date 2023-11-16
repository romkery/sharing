import { authorizedApiClient } from '@/shared/api';

import { ImageData, Product, ProductData } from '../types';

export async function getProduct() {
  const { data } = await authorizedApiClient.get<{
    data: ProductData[];
  }>(`products`);
  return data.data;
}

export async function postProduct(data: Product) {
  const response = await authorizedApiClient.post<Product>(
    `products`,
    { data: data },
    {
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );
  return response.status === 204;
}

export async function putProduct(data: Product, id: number) {
  const response = await authorizedApiClient.put<Product>(
    `products/${id}`,
    { data: data },
    {
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );
  return response.status === 204;
}

export async function deleteProduct(id: number) {
  const response = await authorizedApiClient.delete<Product>(`products/${id}`);
  return response.status === 204;
}

export async function getImage() {
  const { data } = await authorizedApiClient.get<ImageData[]>(`upload/files`);
  return data;
}
