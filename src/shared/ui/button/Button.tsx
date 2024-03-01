import { CircularProgress } from '@mui/material';
import { styled, SxProps } from '@mui/system';
import { ButtonHTMLAttributes, PropsWithChildren } from 'react';

import { themeConfig } from '@/app/theme';

import { createRipple } from './lib';

interface PropsType
  extends PropsWithChildren,
    ButtonHTMLAttributes<HTMLButtonElement> {
  sx?: SxProps;
  disableRipple?: boolean;
  disabled?: boolean;
  loading?: boolean;
}

export const Button = ({
  sx,
  disableRipple,
  disabled,
  loading,
  children,
  ...props
}: PropsType) => {
  return (
    <CustomButton
      disabled={disabled || loading}
      onMouseDown={(e) => !disableRipple && createRipple(e)}
      sx={{
        width: '100%',
        minHeight: '40px',
        backgroundColor: themeConfig.palette.blue.default,
        color: themeConfig.palette.white.default,
        transition: '200ms linear',
        cursor: 'pointer',
        border: 'none',
        position: 'relative',
        overflow: 'hidden',
        borderRadius: '8px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px',
        userSelect: 'none',

        '&:disabled': {
          cursor: 'not-allowed',
          backgroundColor: themeConfig.palette.blue.light,
        },

        '&:hover:not([disabled])': {
          backgroundColor: themeConfig.palette.blue.semiLight,
        },
        ...sx,
      }}
      {...props}
    >
      {children}
      {loading && <CircularProgress size={20} sx={{ color: '#fff' }} />}
    </CustomButton>
  );
};

const CustomButton = styled('button')({});
