import { useQuery, UseQueryOptions } from '@tanstack/react-query';

import { getUser, getUsers } from '@/entities/user/api';

interface OptionsType
  extends Omit<UseQueryOptions<any[], Error>, 'queryKey' | 'queryFn'> {}

export function useUser(options: OptionsType) {
  return useQuery<any[], Error>({
    queryKey: ['users'],
    queryFn: () => getUser(),
    ...options,
  });
}

export function useUsers(options: Omit<OptionsType, 'username'>) {
  return useQuery<any[], Error>({
    queryKey: ['users'],
    queryFn: () => getUsers(),
    ...options,
  });
}
