import { Box } from '@mui/material';
import React, { PropsWithChildren } from 'react';

export const Authorized = ({ children }: PropsWithChildren) => {
  return <Box>{children}</Box>;
};
