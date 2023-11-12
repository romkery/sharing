import { Box } from '@mui/material';
import { GetServerSideProps } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { ReactElement } from 'react';

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
  const { data } = userModel.useUsers();
  return (
    <Box sx={{ color: 'red' }}>
      {t('Hello')}
      {JSON.stringify(data)}
    </Box>
  );
};

Home.getLayout = (page: ReactElement) => (
  <AppLayoutAuthorized>{page}</AppLayoutAuthorized>
);

export default Home;
