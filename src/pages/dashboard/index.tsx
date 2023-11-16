import { Box, CircularProgress } from '@mui/material';
import { GetServerSideProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import React, { ReactElement } from 'react';

import { productsModel } from '@/entities/products';
import { AppLayoutAuthorized } from '@/widgets/layout';
import { useUser } from '@/widgets/layout/Authorized';
import { ProductCard } from '@/widgets/product';

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { locale } = context;

  return {
    props: {
      ...(await serverSideTranslations(locale as string)),
    },
  };
};

export default function Dashboard() {
  const products = productsModel.useProducts({});
  const images = productsModel.useImages({});
  console.log(images, 'imgg');
  const { user, setUser } = useUser();
  if (products.isLoading || images.isLoading) {
    return <CircularProgress />;
  }

  if (products.isError || images.isError) {
    console.log('error in get product');
  }

  return (
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
        ?.filter((p) => p.attributes.ownerId !== user.id)
        .map((product, index) => {
          return (
            <ProductCard
              index={index}
              key={`product-${product.id}`}
              product={product}
              images={product.img_url}
              onPublishClick={() => console.log('punlish')}
              onRentClick={() => console.log('rent')}
            />
          );
        })}
    </Box>
  );
}

Dashboard.getLayout = (page: ReactElement) => (
  <AppLayoutAuthorized>{page}</AppLayoutAuthorized>
);
