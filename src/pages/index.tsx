import { Box } from '@mui/material';
import { GetServerSideProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import React, { ReactElement } from 'react';

import { productsModel } from '@/entities/products';
import { ProductData } from '@/entities/products/types';
import { userModel } from '@/entities/user';
import { FullScreenLoader } from '@/shared/ui';
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
  const user = userModel.useUser({});
  const products = productsModel.useProducts({});
  const images = productsModel.useImages({});

  const filterByOwner = (p: ProductData) =>
    p.attributes.ownerId !== user.data?.id;

  if (products.isLoading || images.isLoading || user.isLoading) {
    return <FullScreenLoader />;
  }

  if (products.isError || images.isError) {
    console.log('error in get product');
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
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
        {products.data?.filter(filterByOwner).map((product, index) => {
          return (
            <ProductCard
              key={`product-${product.id}`}
              index={index}
              product={product}
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
