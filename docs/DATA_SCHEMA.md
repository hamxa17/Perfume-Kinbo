# Data Schema & TypeScript Types

## Product Interface (`types/product.ts`)

```typescript
export type ScentFamily = 'Floral' | 'Woody' | 'Oriental' | 'Fresh' | 'Citrus';

export interface VolumeVariant {
  volume: string;      // e.g., "3ml", "5ml", "10ml"
  price: number;       // e.g., 3500, 5500, 7500
  inStock: boolean;
}

export interface Product {
  id: string;
  name: string;
  brand: string;
  currency: string;    // e.g., "BDT"
  scentFamily: ScentFamily;
  images: string[];    // [primary, hover]
  variants: VolumeVariant[];
  // Dynamic helper properties for display
  minPrice: number;    // Calculated minimum price across variants
  maxPrice: number;    // Calculated maximum price across variants
}
