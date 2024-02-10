import { Box, CircularProgress, Typography } from '@mui/material';
import { GetServerSideProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import React, { ReactElement } from 'react';

import { productsModel } from '@/entities/products';
import { userModel } from '@/entities/user';
import { AppLayoutAuthorized } from '@/widgets/layout';
import { ProductCard } from '@/widgets/product';

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { locale } = context;

  return {
    props: {
      ...(await serverSideTranslations(locale as string)),
    },
  };
};

export default function Profile() {
  const products = productsModel.useProducts({});
  const user = userModel.useUser();

  if (user.isLoading) {
    return <CircularProgress />;
  }

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        padding: '20px',
        gap: '30px',
      }}
    >
      <Typography variant="h5" color="primary" gutterBottom>
        Мои обьявления
      </Typography>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'row',
          gap: '20px',
          flexWrap: 'wrap',
        }}
      >
        {products.data
          ?.filter((p) => p.attributes.ownerId == user.data?.id)
          .map((product, index) => {
            return (
              <ProductCard
                index={index}
                key={`product-${product.id}`}
                product={product}
                onPublishClick={() => console.log('publish')}
                onRentClick={() => console.log('rent')}
              />
            );
          })}
      </Box>
      <Typography variant="h5" color="primary" gutterBottom>
        Забронированные
      </Typography>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'row',
          gap: '20px',
          flexWrap: 'wrap',
        }}
      >
        {products.data
          ?.filter((p) => p.attributes.customerId == user.data?.id)
          .map((product, index) => {
            return (
              <ProductCard
                index={index}
                key={`product-${product.id}`}
                product={product}
                onPublishClick={() => console.log('publish')}
                onRentClick={() => console.log('rent')}
              />
            );
          })}
      </Box>
    </Box>
  );
}

Profile.getLayout = (page: ReactElement) => (
  <AppLayoutAuthorized>{page}</AppLayoutAuthorized>
);
