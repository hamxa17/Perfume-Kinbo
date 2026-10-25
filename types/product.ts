
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

/** Where a photo comes from and under what licence it may be used. */
export interface ImageCredit {
  title: string;
  author: string;
  license: string;
  licenseUrl?: string;
  source: string; // page the photo was taken from
  changes?: string; // e.g. "Cropped to the bottle"
}

/** The part of the photo to show, as fractions (0-1) of its width and height. */
export interface ImageCrop {
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface Product {
  id: string;
  name: string;
  brand: string;
  currency: string;
  scentFamily: ScentFamily;
  images: string[]; // [primary image, optional second image]

  // Studio photo on a white background. It is blended into the page so the
  // bottle reads as a cut-out. Needs crop + imageSize to place it exactly.
  cutout?: boolean;
  crop?: ImageCrop;
  imageSize?: { w: number; h: number }; // natural pixel size of images[0]
  lift?: number; // brightness boost for photos whose "white" is slightly grey
  tone?: string; // colour of the disc behind this bottle in the hero
  credit?: ImageCredit;
  variants: VolumeVariant[];

  // Derived from the product's volume variants.
  minPrice: number;
  maxPrice: number;
}
