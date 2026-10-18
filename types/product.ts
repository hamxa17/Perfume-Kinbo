
export type ScentFamily =
  | "Floral"
  | "Woody"
  | "Oriental"
  | "Fresh"
  | "Citrus";

export interface VolumeVariant {
  volume: string;
  price: number;
  inStock: boolean;
}

export interface Product {
  id: string;
  name: string;
  brand: string;
  currency: string;
  scentFamily: ScentFamily;
  images: string[]; // [primary image, hover image]
  variants: VolumeVariant[];

  // Derived from the product's volume variants.
  minPrice: number;
  maxPrice: number;
}
