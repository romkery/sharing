import { Box } from '@mui/material';
import { GetServerSideProps } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { ReactElement } from 'react';

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
  return <Box sx={{ color: 'red' }}>{t('Hello')} world</Box>;
};

Home.getLayout = (page: ReactElement) => <Box>{page}</Box>;

export default Home;
