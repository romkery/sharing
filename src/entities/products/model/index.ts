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
  getProducts,
  postImage,
  postProduct,
  putProduct,
} from '@/entities/products/api';

import { ImageData, Product, ProductData } from '../types';

export function useProducts(
  options: Omit<
    UseQueryOptions<ProductData[], Error>,
    'queryKey' | 'queryFn'
  > = {},
) {
  return useQuery<ProductData[], Error>({
    queryKey: ['products'],
    queryFn: getProducts,
    refetchOnMount: false,
    ...options,
  });
}

export function useCreateProduct(
  options: Omit<UseMutationOptions<boolean, Error, Product>, 'mutationFn'> = {},
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
  options: Omit<
    UseMutationOptions<boolean, Error, ProductData>,
    'mutationFn'
  > = {},
) {
  const queryClient = useQueryClient();
  return useMutation<boolean, Error, ProductData>({
    mutationKey: ['products'],
    mutationFn: ({ attributes, id }) => putProduct(attributes, id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['products'] }),
    ...options,
  });
}

export function useDeleteProduct(
  options: Omit<
    UseMutationOptions<boolean, Error, { id: number }>,
    'mutationFn'
  > = {},
) {
  const queryClient = useQueryClient();
  return useMutation<boolean, Error, { id: number }>({
    mutationKey: ['products'],
    mutationFn: ({ id }) => deleteProduct(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['products'] }),
    ...options,
  });
}

export function useImages(
  options: Omit<
    UseQueryOptions<ImageData[], Error>,
    'queryKey' | 'queryFn'
  > = {},
) {
  return useQuery<ImageData[], Error>({
    queryKey: ['images'],
    queryFn: getImage,
    ...options,
  });
}

export function useCreateImage(
  options: Omit<
    UseMutationOptions<ImageData[], Error, FormData>,
    'mutationFn'
  > = {},
) {
  return useMutation<ImageData[], Error, FormData>({
    mutationKey: ['images'],
    mutationFn: (data: FormData) => postImage(data),
    ...options,
  });
}
