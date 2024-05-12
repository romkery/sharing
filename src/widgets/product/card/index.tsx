import { SnackbarCloseReason } from '@mui/base';
import { Alert, Box, Typography } from '@mui/material';
import React, { SyntheticEvent, useState } from 'react';
import { animated, useSpring } from 'react-spring';

import { themeConfig } from '@/app/theme';
import { productsModel } from '@/entities/products';
import { ProductData } from '@/entities/products/types';
import { userModel } from '@/entities/user';
import {
  Card as CardComponent,
  FullScreenLoader,
  Snackbar,
  XSLink,
} from '@/shared/ui';

interface ProductCardProps {
  product: ProductData;
  onRentClick?: () => void;
  onPublishClick?: () => void;
  index: number;
}

export const Card: React.FC<ProductCardProps> = ({
  product,
  onPublishClick,
  index,
}) => {
  const { title, img_url, description, ownerId, isRent, isPublished } =
    product.attributes;
  const users = userModel.useUsers({});
  const user = userModel.useUser({});

  const { mutate: rentProduct } = productsModel.useUpdateProduct();
  const { mutate: deleteProduct } = productsModel.useDeleteProduct();

  const [isCardVisible, setIsCardVisible] = useState(true);

  const getProductLocation = () => {
    return `${product.attributes.location.city ?? ''}${
      product.attributes.location.city ? ',' : ''
    } ${product.attributes.location.street ?? ''}`;
  };

  // Создаем пружину для анимации
  const springProps = useSpring({
    opacity: isCardVisible ? 1 : 0,
    transform: isCardVisible ? 'translateY(0)' : 'translateY(0px)',
    from: { opacity: 0, transform: 'translateY(0px)' },
    onRest: () => setIsCardVisible(true),
    delay: index * 100, // Увеличивающаяся задержка
    config: {
      duration: 200,
    },
  });

  const handleRent = () => {
    if (!user.data || !product) return;
    rentProduct({
      id: product.id,
      attributes: {
        ...product.attributes,
        isRent: true,
        customerId: user.data.id,
      },
    });
    setOpen(true);
    setText('Успешно забронированно');
  };
  const handleDelete = () => {
    deleteProduct({ id: product.id });
    setOpen(true);
    setText('Успешно удалено');
  };

  const [open, setOpen] = useState(false);
  const [text, setText] = useState('');

  const handleClose = (
    event: Event | SyntheticEvent<Element, Event>,
    reason: SnackbarCloseReason,
  ) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

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
          width: '200px',
          height: '100%',
          minHeight: '270px',
          padding: '10px',
          display: 'flex',
          flexDirection: 'column',
          gap: '4px',
          color: 'white',
          '[glow] &': {
            border: `1px solid ${themeConfig.palette.blue.default}`,
          },
          border: `1px solid ${themeConfig.palette.gray.semiDark}`,
          position: 'relative',
          boxSizing: 'content-box',
        }}
      >
        <XSLink href={`/product/${product.id}`} sx={{ alignItems: 'start' }}>
          <Box
            component="img"
            sx={{
              height: '150px',
              width: '100%',
              objectFit: 'cover',
            }}
            src={
              img_url ||
              'https://storage.googleapis.com/proudcity/mebanenc/uploads/2021/03/placeholder-image.png'
            }
            alt={title}
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
      <Snackbar
        open={open}
        autoHideDuration={1500}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        sx={{ position: 'absolute' }}
      >
        <Alert severity="success">{text}</Alert>
      </Snackbar>
    </animated.div>
  );
};
