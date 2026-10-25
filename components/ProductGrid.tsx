
"use client";

import { mockProducts } from "../data/mockProducts";
import ProductCard from "./ProductCard";

export default function ProductGrid() {
  function handleAdd(product: (typeof mockProducts)[number]) {
    // Temporary integration point for your cart logic.
    console.log("Add to bag:", product.id);
  }

  return (
    <div className="grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-3 md:gap-x-6 md:gap-y-10 lg:grid-cols-4">
      {mockProducts.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onAdd={handleAdd}
        />
      ))}
    </div>
  );
}
