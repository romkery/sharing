import { Box } from '@mui/material';
import React, { PropsWithChildren } from 'react';

import { Header } from './Header';

const Content = ({ children }: PropsWithChildren) => {
  return (
    <Box
      sx={{
        backgroundColor: '#1e1e1e',
        width: '100%',
        height: '100vh',
      }}
    >
      <Box sx={{ zIndex: '20000' }}>
        <Header />
      </Box>
      {children}
    </Box>
  );
};

export const Authorized = ({ children }: PropsWithChildren) => {
  return <Content>{children}</Content>;
};
