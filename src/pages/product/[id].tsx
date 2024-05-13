import { Box, Typography } from '@mui/material';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import React, { ReactElement } from 'react';

import { themeConfig } from '@/app/theme';
import { productsModel } from '@/entities/products';
import { userModel } from '@/entities/user';
import { Button, FullScreenLoader } from '@/shared/ui';
import { AppLayoutAuthorized } from '@/widgets/layout';

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { locale } = context;

  return {
    props: {
      ...(await serverSideTranslations(locale as string)),
    },
  };
};

export default function Product() {
  const router = useRouter();
  const { id } = router.query;
  const { data: products } = productsModel.useProducts();
  const { mutate: rentProduct } = productsModel.useUpdateProduct();
  const { data: user } = userModel.useUser();
  if (!id || !products || !user) return <FullScreenLoader />;

  const product = products.find((p) => p.id === Number(id))!.attributes;

  const { title, img_url, location, description, isRent } = product;

  return (
    <Box
      component="main"
      sx={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <Box
        sx={{
          maxWidth: '550px',
          display: 'flex',
          flexDirection: 'column',
          margin: 'auto',
          gap: '40px',
          color: themeConfig.palette.white.default,
        }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <Typography variant="h4">{title || ''}</Typography>
          <Box
            component="img"
            alt="product"
            src={
              img_url ||
              'https://storage.googleapis.com/proudcity/mebanenc/uploads/2021/03/placeholder-image.png'
            }
            sx={{ width: '100%', objectFit: 'cover' }}
          />
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <Typography variant="h5" fontWeight={600}>
            Адрес
          </Typography>
          <Typography variant="body1">{`${location.country}, ${location.city}, ${location.street}`}</Typography>
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <Typography variant="h5" fontWeight={600}>
            Описание
          </Typography>
          <Typography variant="body1">{description}</Typography>
        </Box>
        <Button
          onClick={() => console.log('Нажата кнопка написать продавцу')}
          sx={{ mb: '20px', color: 'black' }}
        >
          Написать продавцу
        </Button>
      </Box>
    </Box>
  );
}

Product.getLayout = (page: ReactElement) => (
  <AppLayoutAuthorized>{page}</AppLayoutAuthorized>
);
