import LogoutIcon from '@mui/icons-material/Logout';
import { Box, Button, IconButton, Tab, Tabs } from '@mui/material';
import { useRouter } from 'next/router';
import React, { useState } from 'react';

import { CreateProductForm } from '@/entities/products';
import { viewerModel } from '@/entities/viewer';
import { Assets, Modal } from '@/shared/ui';

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

  const [showModal, setShowModal] = useState(false);
  const handleCloseModal = () => {
    setShowModal(false);
  };
  const handleOpenModal = () => {
    setShowModal(true);
  };

  return (
    <Box
      sx={{
        width: '100%',
        height: '64px',
        boxShadow: '0px 2px 8px #FFFFFF10',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 20px',
        gap: '20px',
        backgroundColor: '#2d2d30',
        ...(!isXS && { position: 'sticky', top: 0, zIndex: 1000 }),
      }}
    >
      <IconButton disableRipple onClick={() => router.push('/')}>
        <Assets.Logo />
      </IconButton>
      {!isXS && (
        <Tabs
          value={router.pathname}
          onChange={handleTabChange}
          textColor="primary"
          sx={{
            minWidth: 'auto',
          }}
        >
          <Tab label="Объявления" value="/" disableRipple />
          <Tab label="Профиль" value="/profile" disableRipple />
        </Tabs>
      )}

      <Box
        sx={{
          display: 'flex',
          gap: '20px',
          alignItems: 'center',
        }}
      >
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
          onClick={handleOpenModal}
        >
          Создать объявление
        </Button>

        <IconButton onClick={handleLogout}>
          <LogoutIcon sx={{ color: '#fff' }} />
        </IconButton>
      </Box>

      <Modal
        open={showModal}
        onClose={handleCloseModal}
        title="Создать объявление"
        sx={{
          maxHeight: '100%',
          maxWidth: 'max-content',
          overflowY: 'auto',
          backgroundColor: '#2d2d30',
          color: 'white',
        }}
      >
        <CreateProductForm />
      </Modal>
    </Box>
  );
};
