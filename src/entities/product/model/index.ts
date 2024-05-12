import { useQuery, UseQueryOptions } from '@tanstack/react-query';

import { getProduct } from '../api';
import { ProductData } from '../types';

type QueryKey = [string, { id: number }];
type ProductParams = {
  id: number;
};
interface useProductParams
  extends Omit<
      UseQueryOptions<ProductData, Error, ProductData, QueryKey>,
      'queryKey' | 'queryFn'
    >,
    ProductParams {}

export function useProduct({ id, ...options }: useProductParams) {
  const params = {
    id: id,
  };
  return useQuery<ProductData, Error, ProductData, QueryKey>({
    queryKey: ['product', params],
    queryFn: ({ queryKey }) => getProduct(queryKey[1]),
    ...options,
  });
}
