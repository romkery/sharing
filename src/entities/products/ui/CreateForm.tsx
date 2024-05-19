import { SnackbarCloseReason } from '@mui/base';
import { AddAPhoto, Delete, Update } from '@mui/icons-material';
import {
  Alert,
  Button,
  FormControl,
  IconButton,
  TextField,
} from '@mui/material';
import { Box, Stack, styled } from '@mui/system';
import React, { SyntheticEvent, useState } from 'react';
import { useForm } from 'react-hook-form';
import ImageUploading, { ImageListType } from 'react-images-uploading';

import { productsModel } from '@/entities/products';
import { Product } from '@/entities/products/types';
import { userModel } from '@/entities/user';
import { Snackbar } from '@/shared/ui';

export const CreateForm = ({
  onPostSuccess,
}: {
  onPostSuccess: () => void;
}) => {
  const user = userModel.useUser();
  const [open, setOpen] = useState(false);
  const { mutate: postProduct } = productsModel.useCreateProduct({});
  const { mutate: postImage } = productsModel.useCreateImage({
    onSuccess: (data) => {
      postProduct({
        ...getValues(),
        images: data.map((i) => ({
          id: i.id,
          url: `${process.env.NEXT_PUBLIC_BASE_URL}${i.url}`,
        })),
        ownerId: user.data?.id || 0,
        isPublished: true,
      });

      setOpen(true);
      setTimeout(onPostSuccess, 1500);
    },
  });

  const [images, setImages] = useState<ImageListType>([]);
  const maxNumber = 5;

  const {
    getValues,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Product>();

  const handleClose = (
    event: Event | SyntheticEvent,
    reason: SnackbarCloseReason,
  ) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const onChangeImage = (imageList: ImageListType) => {
    setImages(imageList);
  };

  const onSubmit = async () => {
    if (images.length) {
      const formData = new FormData();
      images.forEach((i) => {
        formData.append('files', i.file!);
      });
      postImage(formData);
    }
  };

  return (
    <>
      <StyledForm
        onSubmit={handleSubmit(onSubmit)}
        sx={{
          gap: '20px',
          display: 'flex',
          flexDirection: 'column',
        }}
        autoComplete="off"
      >
        <StyledFormControl>
          <TextField
            {...register('title', {
              required: 'Название обязательно',
            })}
            id="title"
            variant="filled"
            label="Название"
          />
          <span>{errors.title?.message}</span>
        </StyledFormControl>
        <StyledFormControl>
          <TextField
            {...register('description', {
              required: 'Описание обязательно',
            })}
            id="description"
            multiline
            rows={4}
            variant="filled"
            label="Описание"
          />
          <span>{errors.description?.message}</span>
        </StyledFormControl>
        <StyledFormControl>
          <TextField
            {...register('location.city', {
              required: 'Город обязательна',
            })}
            id="description"
            variant="filled"
            label="Город"
          />
          <span>{errors.location?.city?.message}</span>
        </StyledFormControl>
        <StyledFormControl>
          <TextField
            {...register('location.street', {
              required: 'Адрес обязателен',
            })}
            id="description"
            variant="filled"
            label="Адрес"
          />
          <span>{errors.location?.street?.message}</span>
        </StyledFormControl>
        <ImageUploading
          multiple
          value={images}
          onChange={onChangeImage}
          maxNumber={maxNumber}
          dataURLKey="data_url"
        >
          {({
            imageList,
            onImageUpload,
            onImageRemoveAll,
            onImageUpdate,
            onImageRemove,
            isDragging,
            dragProps,
          }) => (
            <Stack spacing={2} alignItems="center" width={'100%'}>
              <Button
                variant="contained"
                color="primary"
                startIcon={<AddAPhoto />}
                style={isDragging ? { color: 'red' } : undefined}
                onClick={onImageUpload}
                {...dragProps}
                sx={{ width: '100%' }}
              >
                {isDragging ? 'Вставить' : 'Загрузить фото'}
              </Button>

              {imageList.length > 0 && (
                <>
                  <Button
                    variant="outlined"
                    color="secondary"
                    startIcon={<Delete />}
                    onClick={onImageRemoveAll}
                    sx={{ width: '100%' }}
                  >
                    Очистить все фото
                  </Button>

                  <Stack spacing={2} direction="row">
                    {imageList.map((image, index) => (
                      <Stack key={index} direction="column" alignItems="center">
                        <Box
                          component="img"
                          src={image['data_url']}
                          alt={`upload image-${index}`}
                          sx={{
                            width: '100px',
                            height: '100px',
                            objectFit: 'cover',
                          }}
                        />
                        <Stack direction="row" spacing={1} mt={1}>
                          <IconButton onClick={() => onImageUpdate(index)}>
                            <Update />
                          </IconButton>
                          <IconButton onClick={() => onImageRemove(index)}>
                            <Delete />
                          </IconButton>
                        </Stack>
                      </Stack>
                    ))}
                  </Stack>
                </>
              )}
            </Stack>
          )}
        </ImageUploading>
        <StyledButton type="submit" variant="contained" color="primary">
          Опубликовать
        </StyledButton>
      </StyledForm>
      <Snackbar
        open={open}
        autoHideDuration={1500}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
      >
        <Alert severity="success">Успешно опубликовано</Alert>
      </Snackbar>
    </>
  );
};

const StyledForm = styled('form')({
  display: 'flex',
  flexDirection: 'column',
  maxWidth: '400px',
  margin: 'auto',
  padding: '20px',
});

const StyledFormControl = styled(FormControl)({
  margin: '10px 0',
});

const StyledButton = styled(Button)({
  marginTop: '20px',
});
