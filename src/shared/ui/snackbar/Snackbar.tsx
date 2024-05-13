import { Snackbar as MuiSnackbar } from '@mui/material';
import { SnackbarProps } from '@mui/material/Snackbar/Snackbar';
import React from 'react';
import { createPortal } from 'react-dom';

export const Snackbar = ({
  children,
  disablePortal,
  ...props
}: SnackbarProps & { disablePortal?: boolean }) => {
  const snackbar = <MuiSnackbar {...props}>{children}</MuiSnackbar>;
  return disablePortal
    ? snackbar
    : typeof window !== 'undefined' &&
        createPortal(snackbar, window.document.body);
};
