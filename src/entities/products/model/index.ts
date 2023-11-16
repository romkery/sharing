import {
  useMutation,
  UseMutationOptions,
  useQuery,
  useQueryClient,
  UseQueryOptions,
} from '@tanstack/react-query';

import {
  deleteProduct,
  getImage,
  getProduct,
  postProduct,
  putProduct,
} from '@/entities/products/api';

import { ImageData, Product, ProductData } from '../types';

interface ProductOptionsType
  extends Omit<UseQueryOptions<ProductData[], Error>, 'queryKey' | 'queryFn'> {}

interface ImagesOptionsType
  extends Omit<UseQueryOptions<ImageData[], Error>, 'queryKey' | 'queryFn'> {}

export function useProducts(options: ProductOptionsType) {
  return useQuery<ProductData[], Error>({
    queryKey: ['products'],
    queryFn: getProduct,
    ...options,
  });
}

export function useCreateProduct(
  options: Omit<UseMutationOptions<boolean, Error, Product>, 'mutationFn'>,
) {
  const queryClient = useQueryClient();
  return useMutation<boolean, Error, Product>({
    mutationKey: ['products'],
    mutationFn: (data: Product) => postProduct(data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['products'] }),
    ...options,
  });
}

export function useUpdateProduct(
  options: Omit<UseMutationOptions<boolean, Error, Product>, 'mutationFn'> & {
    id: number;
  },
) {
  const queryClient = useQueryClient();
  return useMutation<boolean, Error, Product>({
    mutationKey: ['products'],
    mutationFn: (data: Product) => putProduct(data, options.id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['products'] }),
    ...options,
  });
}

export function useDeleteProduct(
  options: Omit<UseMutationOptions<boolean, Error, Product>, 'mutationFn'> & {
    id: number;
  },
) {
  const queryClient = useQueryClient();
  return useMutation<boolean, Error, Product>({
    mutationKey: ['products'],
    mutationFn: () => deleteProduct(options.id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['products'] }),
    ...options,
  });
}

export function useImages(options: ImagesOptionsType) {
  return useQuery<ImageData[], Error>({
    queryKey: ['images'],
    queryFn: getImage,
    ...options,
  });
}
