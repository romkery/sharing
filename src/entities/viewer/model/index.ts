import { useMediaQuery } from '@mui/material';
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

export function useResolution() {
  const isXS = useMediaQuery('(max-width:767px)');
  const isSM = useMediaQuery('(min-width:768px) and (max-width:1279px)');
  const isMD = useMediaQuery('(min-width:1280px) and (max-width:1919px)');
  const isLG = useMediaQuery('(min-width:1920px)');
  return { isXS, isSM, isMD, isLG };
}
