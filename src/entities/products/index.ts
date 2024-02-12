import {
  useCreateImage,
  useCreateProduct,
  useDeleteProduct,
  useImages,
  useProducts,
  useUpdateProduct,
} from './model';

export { CreateForm as CreateProductForm } from './ui';

export const productsModel = {
  useProducts,
  useImages,
  useCreateImage,
  useCreateProduct,
  useUpdateProduct,
  useDeleteProduct,
};
