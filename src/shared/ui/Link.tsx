import { Box } from '@mui/material';
import React from 'react';

export const Link = ({ href, children, ...props }) => (
  <Box
    component="a"
    href={href}
    sx={{
      textDecoration: 'none',
      color: 'text',
      '&:hover': {
        color: 'primary',
      },
    }}
    {...props}
  >
    {children}
  </Box>
);
