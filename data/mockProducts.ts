
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
  // ---- Well-known perfumes -------------------------------------------------
  // Photos are free-licensed (Wikimedia Commons). Prices and sizes below are
  // PLACEHOLDERS for the mock catalogue, not real retail prices. Brand names
  // and bottle designs belong to their owners.
  createProduct({
    id: "paco-rabanne-1-million",
    name: "1 Million",
    brand: "Paco Rabanne",
    currency: "BDT",
    scentFamily: "Oriental",
    images: [
      "https://thumb.wikimedia.org/wikipedia/commons/thumb/6/60/2023_Woda_toaletowa_Paco_Rabanne_1_Million.jpg/960px-2023_Woda_toaletowa_Paco_Rabanne_1_Million.jpg",
    ],
    cutout: true,
    imageSize: { w: 960, h: 1320 },
    crop: { x: 0.27, y: 0.05, w: 0.5, h: 0.91 },
    lift: 1.05,
    tone: "#cbc5b8",
    credit: {
      title: "2023 Woda toaletowa Paco Rabanne 1 Million.jpg",
      author: "Jacek Halicki",
      license: "CC BY-SA 4.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
      source:
        "https://commons.wikimedia.org/wiki/File:2023_Woda_toaletowa_Paco_Rabanne_1_Million.jpg",
      changes: "Cropped to the bottle and blended into the page background.",
    },
    variants: [
      { volume: "30ml", price: 5200, inStock: true },
      { volume: "50ml", price: 7500, inStock: true },
      { volume: "100ml", price: 10500, inStock: true },
    ],
  }),

  createProduct({
    id: "chanel-no-5",
    name: "No. 5",
    brand: "Chanel",
    currency: "BDT",
    scentFamily: "Floral",
    images: [
      "https://upload.wikimedia.org/wikipedia/commons/8/85/CHANEL_No5_parfum.jpg",
    ],
    cutout: true,
    imageSize: { w: 400, h: 727 },
    crop: { x: 0.08, y: 0.03, w: 0.84, h: 0.9 },
    tone: "#c8cbc6",
    credit: {
      title: "CHANEL No5 parfum.jpg",
      author: "arz",
      license: "Public domain",
      source: "https://commons.wikimedia.org/wiki/File:CHANEL_No5_parfum.jpg",
      changes: "Cropped to the bottle and blended into the page background.",
    },
    variants: [
      { volume: "30ml", price: 7800, inStock: true },
      { volume: "50ml", price: 11500, inStock: true },
      { volume: "100ml", price: 16500, inStock: true },
    ],
  }),

  createProduct({
    id: "armani-acqua-di-gio",
    name: "Acqua di Giò",
    brand: "Giorgio Armani",
    currency: "BDT",
    scentFamily: "Fresh",
    images: [
      "https://upload.wikimedia.org/wikipedia/commons/5/54/Acqua_di_Gio.jpg",
    ],
    cutout: true,
    imageSize: { w: 500, h: 950 },
    crop: { x: 0.08, y: 0.02, w: 0.83, h: 0.95 },
    tone: "#bec6ca",
    credit: {
      title: "Acqua di Gio.jpg",
      author: "Gonna Fly Now",
      license: "CC BY-SA 2.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/2.0/",
      source: "https://commons.wikimedia.org/wiki/File:Acqua_di_Gio.jpg",
      changes: "Cropped to the bottle and blended into the page background.",
    },
    variants: [
      { volume: "30ml", price: 5500, inStock: true },
      { volume: "50ml", price: 8000, inStock: true },
      { volume: "100ml", price: 11000, inStock: true },
    ],
  }),

  createProduct({
    id: "jpg-le-male",
    name: "Le Mâle",
    brand: "Jean Paul Gaultier",
    currency: "BDT",
    scentFamily: "Oriental",
    images: [
      "https://upload.wikimedia.org/wikipedia/commons/f/fa/Gaultier_Le_M%C3%A2le.jpg",
    ],
    cutout: true,
    imageSize: { w: 818, h: 700 },
    crop: { x: 0.04, y: 0, w: 0.4, h: 1 },
    tone: "#c3c7c1",
    credit: {
      title: "Gaultier Le Mâle.jpg",
      author: "Bruce The Deus",
      license: "CC BY-SA 3.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0/",
      source: "https://commons.wikimedia.org/wiki/File:Gaultier_Le_M%C3%A2le.jpg",
      changes:
        "Cropped to the bottle (the original also shows its box) and blended into the page background.",
    },
    variants: [
      { volume: "30ml", price: 5200, inStock: true },
      { volume: "50ml", price: 7800, inStock: true },
      { volume: "100ml", price: 10800, inStock: true },
    ],
  }),

  // ---- Sample catalogue (stock photos, fictional brands) -------------------
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
