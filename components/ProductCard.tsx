
"use client";

import type { Product } from "../types/product";

interface ProductCardProps {
  product: Product;
  onAdd: (product: Product) => void;
}

function formatAmount(amount: number): string {
  return new Intl.NumberFormat("en-BD", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

function formatPriceRange(product: Product): string {
  const min = formatAmount(product.minPrice);
  const max = formatAmount(product.maxPrice);

  if (product.minPrice === product.maxPrice) {
    return `From Tk ${min} BDT`;
  }

  return `Tk ${min} – Tk ${max} BDT`;
}

export default function ProductCard({
  product,
  onAdd,
}: ProductCardProps) {
  const primaryImage = product.images[0] ?? "";
  const hoverImage = product.images[1] ?? primaryImage;

  return (
    <article className="group min-w-0">
      {/* Product image */}
      <div className="relative isolate aspect-[4/5] overflow-hidden bg-[#F8F6F1]">
        {/* Primary image */}
        <div
          aria-hidden="true"
          className="absolute inset-0 scale-100 bg-contain bg-center bg-no-repeat opacity-100 transition-[transform,opacity] duration-700 ease-out group-hover:scale-[1.04] group-hover:opacity-0 motion-reduce:transition-none"
          style={{
            backgroundImage: `url("${primaryImage}")`,
          }}
        />

        {/* Secondary image */}
        <div
          aria-hidden="true"
          className="absolute inset-0 scale-100 bg-contain bg-center bg-no-repeat opacity-0 transition-[transform,opacity] duration-700 ease-out group-hover:scale-[1.04] group-hover:opacity-100 motion-reduce:transition-none"
          style={{
            backgroundImage: `url("${hoverImage}")`,
          }}
        />

        {/* Add button */}
        <button
          type="button"
          onClick={() => onAdd(product)}
          aria-label={`Add ${product.name} to your bag`}
          className="absolute bottom-4 right-4 z-10 inline-flex items-center justify-center rounded-full border border-[#292722]/10 bg-[#FFFEFC] px-5 py-2.5 text-sm font-medium text-[#292722] shadow-sm transition-all duration-300 hover:border-[#292722] hover:bg-[#292722] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B49A70] focus-visible:ring-offset-2 focus-visible:ring-offset-[#F8F6F1] sm:translate-y-2 sm:opacity-0 sm:group-hover:translate-y-0 sm:group-hover:opacity-100 sm:group-focus-within:translate-y-0 sm:group-focus-within:opacity-100 motion-reduce:transition-none"
        >
          <span aria-hidden="true" className="mr-1">
            +
          </span>
          Add
        </button>
      </div>

      {/* Product details */}
      <div className="pt-4 text-left">
        <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-[#827B70] sm:text-[11px]">
          {product.brand}
        </p>

        <h3 className="mt-1.5 text-sm font-medium tracking-[0.01em] text-[#292722] sm:text-base">
          {product.name}
        </h3>

        <p className="mt-2 text-xs tracking-[0.01em] text-[#5E594F] sm:text-sm">
          {formatPriceRange(product)}
        </p>
      </div>
    </article>
  );
}
