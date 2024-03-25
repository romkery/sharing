import { SnackbarCloseReason } from '@mui/base';
import {
  Alert,
  Button,
  Card as MuiCard,
  CardContent,
  CardMedia,
  Snackbar,
  Typography,
} from '@mui/material';
import React, { SyntheticEvent, useState } from 'react';
import { animated, useSpring } from 'react-spring';

import { themeConfig } from '@/app/theme';
import { productsModel } from '@/entities/products';
import { ProductData } from '@/entities/products/types';
import { userModel } from '@/entities/user';
import { FullScreenLoader } from '@/shared/ui';

interface ProductCardProps {
  product: ProductData;
  onRentClick?: () => void;
  onPublishClick?: () => void;
  index: number;
}

export const Card: React.FC<ProductCardProps> = ({
  product,
  onRentClick,
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
      year: 'numeric',
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
      <MuiCard
        sx={{
          width: 345,
          padding: '10px',
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
          backgroundColor: '#2d2d30',
          color: 'white',
          '[glow] &': {
            border: `1px solid ${themeConfig.palette.blue.default}`,
          },
          border: `1px solid ${themeConfig.palette.gray.semiDark}`,
          position: 'relative',
        }}
      >
        <Typography variant={'caption'}>
          {formatTimestamp(product.attributes.createdAt)}
        </Typography>
        <CardMedia
          component="img"
          height="140"
          sx={{
            width: '100%',
            objectFit: 'contain',
          }}
          src={
            img_url ||
            'https://storage.googleapis.com/proudcity/mebanenc/uploads/2021/03/placeholder-image.png'
          }
          alt={title}
        />
        <CardContent
          sx={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            gap: '2px',
            color: 'white',
          }}
        >
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Описание: {description}
          </Typography>
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{ marginTop: 1 }}
          >
            Владелец: {users.data?.find((u) => u.id === ownerId)?.username}
          </Typography>
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{ marginTop: 1 }}
          >
            Статус: {isRent ? 'забронировано' : 'доступно'}
            {users.data?.find((u) => u.id === product?.attributes.customerId)
              ?.username &&
              ` пользователем ${users.data?.find(
                (u) => u.id === product?.attributes.customerId,
              )?.username}`}
          </Typography>
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{ marginTop: 1 }}
          >
            {isPublished ? 'Опубликовано' : 'Снято с публикации'}
          </Typography>
        </CardContent>
        {product.attributes.ownerId !== user.data?.id ? (
          <CardContent
            sx={{ display: 'flex', justifyContent: 'space-between' }}
          >
            <Button variant="contained" onClick={handleRent} disabled={isRent}>
              Арендовать
            </Button>
          </CardContent>
        ) : (
          <CardContent
            sx={{ display: 'flex', justifyContent: 'space-between' }}
          >
            <Button variant="contained" onClick={handleDelete}>
              {isPublished ? 'Снять' : 'Снято'}
            </Button>
          </CardContent>
        )}
      </MuiCard>
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
