export interface Product {
  title: string;
  img_url: string;
  description: string;
  ownerId: number;
  isRent: boolean;
  isPublished: boolean;
  createdAt: string;
  customerId: number | null;
  locale: 'en' | 'ru';
  publishedAt: string;
  updatedAt: string;
}

export interface ProductData {
  id: number;
  attributes: Product;
}

export interface ImageData {
  id: number;
  name: string;
  alternativeText: null | string;
  caption: null | string;
  createdAt: string;
  ext: string;
  formats: {
    large: ImageFormat;
    medium: ImageFormat;
    small: ImageFormat;
    thumbnail: ImageFormat;
  };
  hash: string;
  height: number;
  mime: string;
  previewUrl: null | string;
  provider: string;
  provider_metadata: null | string;
  size: number;
  updatedAt: string;
  url: string;
  width: number;
}

interface ImageFormat {
  name: string;
  hash: string;
  ext: string;
  mime: string;
  path: null | string;
  size: number;
  url: string;
  width: number;
  height: number;
}
