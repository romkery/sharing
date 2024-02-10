import { useQuery, UseQueryOptions } from '@tanstack/react-query';

import { getUser, getUsers } from '@/entities/user/api';

export function useUser(
  options: Omit<UseQueryOptions<UserType, Error>, 'queryKey' | 'queryFn'> = {},
) {
  return useQuery<UserType, Error>({
    queryKey: ['user'],
    queryFn: () => getUser(),
    ...options,
  });
}

export function useUsers(
  options: Omit<
    UseQueryOptions<UserType[], Error>,
    'queryKey' | 'queryFn'
  > = {},
) {
  return useQuery<UserType[], Error>({
    queryKey: ['users'],
    queryFn: () => getUsers(),
    ...options,
  });
}
