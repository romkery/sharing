import { Typography } from '@mui/material';
import React, { useState } from 'react';
import { animated, useSpring } from 'react-spring';

import { themeConfig } from '@/app/theme';
import { ProductData } from '@/entities/products/types';
import { userModel } from '@/entities/user';
import {
  Card as CardComponent,
  FullScreenLoader,
  ImageCarousel,
  XSLink,
} from '@/shared/ui';

interface ProductCardProps {
  product: ProductData;
  index: number;
}

export const Card: React.FC<ProductCardProps> = ({ product, index }) => {
  const { title, images } = product.attributes;
  const users = userModel.useUsers({});
  const user = userModel.useUser({});

  const [isCardVisible, setIsCardVisible] = useState(true);

  const getProductLocation = () => {
    return `${product.attributes.location.city ?? ''}${
      product.attributes.location.city ? ',' : ''
    } ${product.attributes.location.street ?? ''}`;
  };

  const springProps = useSpring({
    opacity: isCardVisible ? 1 : 0,
    transform: isCardVisible ? 'translateY(0)' : 'translateY(0px)',
    from: { opacity: 0, transform: 'translateY(0px)' },
    delay: index * 100, // Увеличивающаяся задержка
    config: {
      duration: 200,
    },
  });

  function formatTimestamp(timestamp: string) {
    const date = new Date(timestamp);

    return date.toLocaleDateString('ru-RU', {
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
    });
  }

  if (users.isLoading || user.isLoading) {
    // TODO should be placeholder
    return <FullScreenLoader />;
  }

  return (
    <animated.div style={springProps}>
      <CardComponent
        sx={{
          height: '100%',
          width: '220px',
          padding: '10px',
          display: 'flex',
          flexDirection: 'column',
          gap: '4px',
          color: 'white',
          border: `1px solid ${themeConfig.palette.gray.semiDark}`,
          position: 'relative',
        }}
      >
        <XSLink href={`/product/${product.id}`} sx={{ alignItems: 'start' }}>
          <ImageCarousel
            enableMouseNavigation
            images={images.map((i) => i.url)}
            sx={{ width: '200px', height: '150px' }}
          />
          {title}
        </XSLink>
        <Typography variant="body2" color={themeConfig.palette.gray.medium}>
          {getProductLocation()}
        </Typography>
        <Typography variant="body2" color={themeConfig.palette.gray.medium}>
          {product.attributes.createdAt &&
            formatTimestamp(product.attributes.createdAt)}
        </Typography>
      </CardComponent>
    </animated.div>
  );
};
