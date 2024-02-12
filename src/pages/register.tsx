import { SnackbarCloseReason } from '@mui/base';
import { Alert, Box, Button, Snackbar, TextField } from '@mui/material';
import { styled } from '@mui/system';
import { GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import React, { SyntheticEvent, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { viewerModel } from '@/entities/viewer';

export const getStaticProps: GetStaticProps = async (context) => {
  const { locale } = context;

  return {
    props: {
      ...(await serverSideTranslations(locale as string)),
    },
  };
};

interface FormValues {
  username: string;
  email: string;
  password: string;
}

export default function Register() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const onRegisterSuccess = () => {
    setOpen(true);
    setTimeout(() => {
      router.push('/login');
    }, 1500);
  };

  const { mutate: registerUser } = viewerModel.useRegister({
    onSuccess: onRegisterSuccess,
  });

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    registerUser(data);
  };

  const [open, setOpen] = useState(false);

  const handleClose = (
    event: Event | SyntheticEvent<Element, Event>,
    reason: SnackbarCloseReason,
  ) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  return (
    <Box
      sx={{
        color: 'white',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100dvh',
      }}
    >
      <Box
        sx={{
          width: '300px',
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
        }}
      >
        <Box>Регистрация</Box>
        <Form
          onSubmit={handleSubmit(onSubmit)}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
          }}
        >
          <TextField
            {...register('username', { required: true })}
            label="Username"
            error={!!errors.username}
            helperText={errors.username ? 'Username обязательна' : ''}
          />
          <TextField
            {...register('email', { required: true, pattern: /^\S+@\S+$/i })}
            label="Email"
            error={!!errors.email}
            helperText={errors.email ? 'Некорректный email' : ''}
          />
          <TextField
            {...register('password', { required: true, minLength: 6 })}
            label="Пароль"
            type="password"
            error={!!errors.password}
            helperText={
              errors.password ? 'Минимальная длина пароля 6 символов' : ''
            }
          />
          <Button type="submit" variant="contained" color="primary">
            Зарегистрироваться
          </Button>
        </Form>
      </Box>
      <Snackbar
        open={open}
        autoHideDuration={1500}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
      >
        <Alert severity="success">Успешная регистрация!</Alert>
      </Snackbar>
    </Box>
  );
}

const Form = styled('form')({});
