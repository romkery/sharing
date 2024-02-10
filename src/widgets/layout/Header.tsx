import LogoutIcon from '@mui/icons-material/Logout';
import { Box, Button, IconButton, Tab, Tabs } from '@mui/material';
import { useRouter } from 'next/router';
import React from 'react';

import { viewerModel } from '@/entities/viewer';
import { Assets } from '@/shared/ui';

export const Header = () => {
  const router = useRouter();
  const { isXS } = viewerModel.useResolution();

  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    router.push(newValue);
  };

  const handleLogout = () => {
    localStorage.removeItem('jwtToken');
    router.push('/login');
  };

  return (
    <Box
      sx={{
        width: '100%',
        height: '50px',
        boxShadow: '0px 4px 8px -4px rgba(34, 60, 80, 0.2)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 20px',
        gap: '20px',
        backgroundColor: '#2d2d30',
      }}
    >
      <IconButton disableRipple onClick={() => router.push('/')}>
        <Assets.Logo />
      </IconButton>
      <Tabs
        value={router.pathname}
        onChange={handleTabChange}
        textColor="primary"
        sx={{
          minWidth: 'auto',
        }}
      >
        <Tab label="Объявления" value="/" />
        <Tab label="Профиль" value="/profile" />
      </Tabs>

      <Button
        variant="outlined"
        sx={{
          height: '40px',
          minWidth: isXS ? '50px' : '140px',
          fontSize: isXS ? '8px' : '12px',
          textTransform: 'none',
          borderRadius: '6px',
          color: 'black',
          backgroundColor: 'primary.main',
          '&:hover': {
            backgroundColor: '#59ffd8',
          },
        }}
        onClick={() => router.push('/create_product')}
      >
        Создать объявление
      </Button>

      <IconButton onClick={handleLogout}>
        <LogoutIcon />
      </IconButton>
    </Box>
  );
};
