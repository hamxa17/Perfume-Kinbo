
import type { Product } from "../types/product";

type ProductInput = Omit<Product, "minPrice" | "maxPrice">;

function createProduct(product: ProductInput): Product {
  const prices = product.variants.map((variant) => variant.price);

  if (prices.length === 0) {
    throw new Error(
      `Product "${product.name}" must have at least one variant.`,
    );
  }

  return {
    ...product,
    minPrice: Math.min(...prices),
    maxPrice: Math.max(...prices),
  };
}

export const mockProducts: Product[] = [
  createProduct({
    id: "amber-veil",
    name: "Amber Veil",
    brand: "Maison Élan",
    currency: "BDT",
    scentFamily: "Woody",
    images: [
      "https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=900&q=85",
      "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=900&q=85",
    ],
    variants: [
      { volume: "30ml", price: 3500, inStock: true },
      { volume: "50ml", price: 5500, inStock: true },
      { volume: "100ml", price: 8000, inStock: true },
    ],
  }),

  createProduct({
    id: "rose-saffron",
    name: "Rose Saffron",
    brand: "Atelier Noire",
    currency: "BDT",
    scentFamily: "Oriental",
    images: [
      "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=900&q=85",
      "https://images.unsplash.com/photo-1590736969955-71cc94901144?auto=format&fit=crop&w=900&q=85",
    ],
    variants: [
      { volume: "30ml", price: 3900, inStock: true },
      { volume: "50ml", price: 5900, inStock: true },
      { volume: "100ml", price: 7900, inStock: true },
    ],
  }),

  createProduct({
    id: "neroli-coast",
    name: "Neroli Coast",
    brand: "Serein Parfums",
    currency: "BDT",
    scentFamily: "Citrus",
    images: [
      "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=900&q=85",
      "https://images.unsplash.com/photo-1595425970377-c9703cf48b6d?auto=format&fit=crop&w=900&q=85",
    ],
    variants: [
      { volume: "30ml", price: 3200, inStock: true },
      { volume: "50ml", price: 4800, inStock: true },
      { volume: "100ml", price: 7200, inStock: true },
    ],
  }),

  createProduct({
    id: "velvet-bloom",
    name: "Velvet Bloom",
    brand: "Maison Élan",
    currency: "BDT",
    scentFamily: "Floral",
    images: [
      "https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=900&q=85",
      "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=900&q=85",
    ],
    variants: [
      { volume: "30ml", price: 3500, inStock: true },
      { volume: "50ml", price: 5200, inStock: true },
      { volume: "100ml", price: 7600, inStock: true },
    ],
  }),

  createProduct({
    id: "cedar-smoke",
    name: "Cedar Smoke",
    brand: "Bois & Brume",
    currency: "BDT",
    scentFamily: "Woody",
    images: [
      "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=900&q=85",
      "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=900&q=85",
    ],
    variants: [
      { volume: "30ml", price: 4200, inStock: true },
      { volume: "50ml", price: 6300, inStock: true },
      { volume: "100ml", price: 8000, inStock: true },
    ],
  }),

  createProduct({
    id: "white-musk-04",
    name: "White Musk No. 04",
    brand: "Lueur",
    currency: "BDT",
    scentFamily: "Fresh",
    images: [
      "https://images.unsplash.com/photo-1590736969955-71cc94901144?auto=format&fit=crop&w=900&q=85",
      "https://images.unsplash.com/photo-1595425970377-c9703cf48b6d?auto=format&fit=crop&w=900&q=85",
    ],
    variants: [
      { volume: "30ml", price: 2800, inStock: true },
      { volume: "50ml", price: 4300, inStock: true },
      { volume: "100ml", price: 6800, inStock: true },
    ],
  }),

  createProduct({
    id: "golden-hour",
    name: "Golden Hour",
    brand: "Aurum Atelier",
    currency: "BDT",
    scentFamily: "Oriental",
    images: [
      "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=900&q=85",
      "https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=900&q=85",
    ],
    variants: [
      { volume: "30ml", price: 3700, inStock: true },
      { volume: "50ml", price: 5700, inStock: true },
      { volume: "100ml", price: 7800, inStock: true },
    ],
  }),

  
  createProduct({
    id: "santal-dusk",
    name: "Santal Dusk",
    brand: "Bois & Brume",
    currency: "BDT",
    scentFamily: "Woody",
    images: [
      "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=900&q=85",
      "https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=900&q=85",
    ],
    variants: [
      { volume: "30ml", price: 4500, inStock: true },
      { volume: "50ml", price: 6200, inStock: true },
      { volume: "100ml", price: 8500, inStock: true },
    ],
  }),

  createProduct({
    id: "fig-vetiver",
    name: "Fig & Vetiver",
    brand: "Serein Parfums",
    currency: "BDT",
    scentFamily: "Fresh",
    images: [
      "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=900&q=85",
      "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=900&q=85",
    ],
    variants: [
      { volume: "30ml", price: 3000, inStock: true },
      { volume: "50ml", price: 4600, inStock: true },
      { volume: "100ml", price: 6900, inStock: true },
    ],
  }),

  createProduct({
    id: "iris-silk",
    name: "Iris Silk",
    brand: "Atelier Noire",
    currency: "BDT",
    scentFamily: "Floral",
    images: [
      "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=900&q=85",
      "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=900&q=85",
    ],
    variants: [
      { volume: "30ml", price: 3800, inStock: false },
      { volume: "50ml", price: 5600, inStock: false },
      { volume: "100ml", price: 7400, inStock: false },
    ],
  }),

  createProduct({
    id: "bergamot-noir",
    name: "Bergamot Noir",
    brand: "Aurum Atelier",
    currency: "BDT",
    scentFamily: "Citrus",
    images: [
      "https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=900&q=85",
      "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=900&q=85",
    ],
    variants: [
      { volume: "30ml", price: 3400, inStock: true },
      { volume: "50ml", price: 5100, inStock: false },
      { volume: "100ml", price: 7600, inStock: true },
    ],
  }),

  createProduct({
    id: "oud-nocturne",
    name: "Oud Nocturne",
    brand: "Maison Élan",
    currency: "BDT",
    scentFamily: "Oriental",
    images: [
      "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=900&q=85",
      "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=900&q=85",
    ],
    variants: [
      { volume: "30ml", price: 4900, inStock: true },
      { volume: "50ml", price: 6800, inStock: true },
      { volume: "100ml", price: 9500, inStock: true },
    ],
  }),

  createProduct({
    id: "aqua-mineral",
    name: "Aqua Mineral",
    brand: "Lueur",
    currency: "BDT",
    scentFamily: "Fresh",
    images: [
      "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=900&q=85",
      "https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=900&q=85",
    ],
    variants: [
      { volume: "30ml", price: 2600, inStock: false },
      { volume: "50ml", price: 4100, inStock: true },
      { volume: "100ml", price: 6400, inStock: true },
    ],
  }),

];
