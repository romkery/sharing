import { SnackbarCloseReason } from '@mui/base';
import { AddAPhoto, Delete, Update } from '@mui/icons-material';
import {
  Alert,
  Button,
  FormControl,
  IconButton,
  Input,
  InputLabel,
  TextField,
} from '@mui/material';
import { Stack, styled } from '@mui/system';
import Image from 'next/image';
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
  const { mutate: postProduct, isPending: isPosting } =
    productsModel.useCreateProduct({});

  const [open, setOpen] = useState(false);
  const { mutate: postImage } = productsModel.useCreateImage({
    onSuccess: (data) => {
      postProduct({
        ...getValues(),
        img_url: `${process.env.NEXT_PUBLIC_BASE_URL}${data.url}`,
        ownerId: user.data?.id || 0,
        isPublished: true,
      });

      setOpen(true);
      setTimeout(onPostSuccess, 1500);
    },
  });

  const [images, setImages] = useState<ImageListType>([]);
  const maxNumber = 1;

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
      formData.append('files', images[0].file!);
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
      >
        <StyledFormControl>
          <InputLabel htmlFor="title">Название</InputLabel>
          <Input
            {...register('title', { required: 'Название обязательно' })}
            id="title"
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
            placeholder={'Описание'}
          />
          <span>{errors.description?.message}</span>
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
                        <Image
                          src={image['data_url']}
                          alt=""
                          width="100"
                          height="100"
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
