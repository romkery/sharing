import { Box } from '@mui/material';
import React, { PropsWithChildren } from 'react';

import { viewerModel } from '@/entities/viewer';
import { MobileMenu } from '@/widgets/layout/MobileMenu';

import { Header } from './Header';

const Content = ({ children }: PropsWithChildren) => {
  const { isXS, isSM, isMD, isLG } = viewerModel.useResolution();

  const margin = () => {
    if (isXS) {
      return {
        marginTop: '24px',
        marginBottom: '64px',
      };
    }
    if (isSM) {
      return {
        marginTop: '24px',
        marginBottom: '24px',
      };
    }
    if (isMD) {
      return {
        margin: '24px 16px',
      };
    }
    return {
      margin: '24px',
    };
  };

  return (
    <Box
      sx={{
        backgroundColor: '#1e1e1e',
        width: '100%',
        height: '100vh',
        overflow: 'auto',
      }}
    >
      <Header />
      <Box
        sx={{
          margin,
        }}
      >
        {children}
      </Box>
      {isXS && <MobileMenu />}
    </Box>
  );
};

export const Authorized = ({ children }: PropsWithChildren) => {
  return <Content>{children}</Content>;
};
