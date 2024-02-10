import { useMediaQuery } from '@mui/material';
import { useMutation, UseMutationOptions } from '@tanstack/react-query';

import { login, register } from '../api';
import { LoginParamsType, RegisterParamsType } from '../types';

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

export function useRegister(
  options: Omit<
    UseMutationOptions<boolean, Error, RegisterParamsType>,
    'mutationFn'
  > = {},
) {
  return useMutation<boolean, Error, RegisterParamsType>({
    mutationFn: (params: RegisterParamsType) => register(params),
    ...options,
  });
}

// export function useLogout(
//   options: Omit<UseMutationOptions<boolean, Error>, 'mutationFn'> = {},
// ) {
//   return useMutation<boolean, Error>(logout, options);
// }

export function useResolution() {
  const isXS = useMediaQuery('(max-width:767px)');
  const isSM = useMediaQuery('(min-width:768px) and (max-width:1279px)');
  const isMD = useMediaQuery('(min-width:1280px) and (max-width:1919px)');
  const isLG = useMediaQuery('(min-width:1920px)');
  return { isXS, isSM, isMD, isLG };
}
