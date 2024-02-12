import { Box, Button, TextField } from '@mui/material';
import { styled } from '@mui/system';
import { GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { SubmitHandler, useForm } from 'react-hook-form';

import { viewerModel } from '@/entities/viewer';
import { Link } from '@/shared/ui';

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

export default function Login() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const { mutate: login } = viewerModel.useLogin({
    onSuccess: () => router.push('/'),
  });

  const onSubmit: SubmitHandler<Omit<FormValues, 'username'>> = (data) => {
    login({ identifier: data.email, password: data.password });
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
          // alignItems: 'center',
          gap: '20px',
        }}
      >
        <Box>Авторизация</Box>
        <Form
          onSubmit={handleSubmit(onSubmit)}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
          }}
        >
          <TextField
            {...register('email', { required: true })}
            label="Email"
            error={!!errors.email}
            helperText={errors.email ? 'Почта обязательна' : ''}
            sx={{ backgroundColor: 'transparent' }}
          />
          <TextField
            {...register('password')}
            label="Password"
            error={!!errors.password}
            helperText={errors.password ? 'Некорректный пароль' : ''}
            sx={{ backgroundColor: 'transparent' }}
            type="password"
          />
          <Button type="submit" variant="contained" color="primary">
            Войти
          </Button>
        </Form>
        <Link
          href="/register"
          sx={{ textDecoration: 'none', alignSelf: 'center' }}
        >
          Зарегистрироваться
        </Link>
      </Box>
    </Box>
  );
}

const Form = styled('form')({});
