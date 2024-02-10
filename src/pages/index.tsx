import { Box } from '@mui/material';
import { GetServerSideProps } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import React, { ReactElement } from 'react';

import { userModel } from '@/entities/user';
import { AppLayoutAuthorized } from '@/widgets/layout';

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { locale } = context;

  return {
    props: {
      ...(await serverSideTranslations(locale as string)),
    },
  };
};

const Home = () => {
  const { t } = useTranslation();

  const user = userModel.useUser({});

  return (
    <Box
      sx={{
        maxWidth: '100dvw',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        textWrap: 'wrap',
        wordBreak: 'break-word',
        fontSize: '16px',
        textTransform: 'none',
        textDecoration: 'none',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          height: '100%',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px',
        }}
      >
        <Box sx={{ width: '100%' }}>
          {t('Hello')}
          {JSON.stringify(user.data)}
        </Box>
      </Box>
    </Box>
  );
};

Home.getLayout = (page: ReactElement) => (
  <AppLayoutAuthorized>{page}</AppLayoutAuthorized>
);

export default Home;
