import { useQuery, UseQueryOptions } from '@tanstack/react-query';

import { getUser } from '@/entities/user/api';

export function useUsers(
  options: Omit<UseQueryOptions<any[], Error>, 'queryKey' | 'queryFn'> = {},
) {
  return useQuery<any[], Error>({ queryKey: ['users'], queryFn: getUser });
}
