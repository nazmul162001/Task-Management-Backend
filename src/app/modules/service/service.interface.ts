export type IServices = {
  name: string;
  price: Number;
  category: string;
  images: string;
  location: string;
  description: string;
  channel: string;
  hdChannel: string;
  connectionCost: number;
  status: string;
};

export type IServiceFilterRequest = {
  search?: string;
};

// for search
export const ServiceSearchAbleFields = ['name', 'category', 'location'];

// for filter
export const ServiceFilterAbleFields = [
  'search',
  'name',
  'category',
  'price',
  'location',
  'district',
];

export type IPriceFilters = {
  maxPrice?: number;
  minPrice?: number;
};

export const PriceSearchableFields = ['maxPrice', 'minPrice'];
