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
  location: Location;
}

type Location = {
  country?: string;
  city: string;
  street: string;
  postal_code?: number;
};

export interface ProductData {
  id: number;
  attributes: Product;
}
