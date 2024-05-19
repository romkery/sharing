import { Box, Typography } from '@mui/material';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import React, { ReactElement } from 'react';

import { themeConfig } from '@/app/theme';
import { productsModel } from '@/entities/products';
import { userModel } from '@/entities/user';
import { Button, FullScreenLoader, ImageCarousel } from '@/shared/ui';
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
  const { data: user } = userModel.useUser();
  if (!id || !products || !user) return <FullScreenLoader />;

  const product = products.find((p) => p.id === Number(id))!.attributes;
  const { title, images, location, description } = product;
  const descriptionParagraphs = description.split('\n');

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
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <Typography variant="h1" fontSize="36px">
            {title || ''}
          </Typography>
          <ImageCarousel
            sx={{ width: '100%', objectFit: 'cover' }}
            enableArrowNavigation
            images={images.map((i) => i.url)}
          />
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <Typography variant="h2" fontSize="28px" fontWeight={600}>
            Адрес
          </Typography>
          <Typography variant="body1">{`${location.country}, ${location.city}, ${location.street}`}</Typography>
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <Typography variant="h2" fontSize="28px" fontWeight={600}>
            Описание
          </Typography>
          <Box>
            {descriptionParagraphs.map((text, index) => {
              return (
                <Typography
                  variant="body2"
                  key={`p-${title}-desc-${index}`}
                  margin="0 0 10px 0"
                >
                  {text}
                </Typography>
              );
            })}
          </Box>
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
