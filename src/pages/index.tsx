import { Box, CircularProgress } from '@mui/material';
import { GetServerSideProps } from 'next';
import { useTranslation } from 'next-i18next';
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

const Home = () => {
  const { t } = useTranslation();
  const user = userModel.useUser({});
  const products = productsModel.useProducts({});
  const images = productsModel.useImages({});

  if (products.isLoading || images.isLoading || user.isLoading) {
    return <CircularProgress />;
  }

  if (products.isError || images.isError) {
    console.log('error in get product');
  }

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
          justifyContent: 'center',
          alignItems: 'center',
          padding: '20px',
          flexDirection: 'row',
          gap: '20px',
          flexWrap: 'wrap',
        }}
      >
        {products.data
          ?.filter((p) => p.attributes.ownerId !== user.data?.id)
          .map((product, index) => {
            return (
              <ProductCard
                key={`product-${product.id}`}
                index={index}
                product={product}
                onPublishClick={() => console.log('publish')}
                onRentClick={() => console.log('rent')}
              />
            );
          })}
      </Box>
    </Box>
  );
};

Home.getLayout = (page: ReactElement) => (
  <AppLayoutAuthorized>{page}</AppLayoutAuthorized>
);

export default Home;
