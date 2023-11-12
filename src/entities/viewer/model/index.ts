import { useMutation, UseMutationOptions } from '@tanstack/react-query';

import { login } from '@/entities/viewer/api';

type LoginParamsType = {
  identifier: string;
  password: string;
};

export function useLogin(
  options: Omit<
    UseMutationOptions<boolean, Error, LoginParamsType>,
    'mutationFn'
  > = {},
) {
  return useMutation<boolean, Error, LoginParamsType>({
    mutationFn: (params: LoginParamsType) => login(params),
    ...options,
  });
}
