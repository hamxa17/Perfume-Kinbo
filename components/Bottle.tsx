"use client";

import { useState } from "react";
import type { Product } from "../types/product";

/**
 * Shows a product photo.
 *
 * Studio photos (product.cutout) are cropped to the bottle and blended into
 * whatever is behind them, so the white backdrop disappears. Other photos are
 * shown as a normal cover image.
 */
export default function Bottle({
  product,
  eager = false,
  className = "",
}: {
  product: Product;
  eager?: boolean;
  className?: string;
}) {
  const [failed, setFailed] = useState(false);
  const src = product.images[0];
  const alt = `${product.brand} ${product.name}`;

  if (!src || failed) {
    return <span className={`bottle bottle-missing ${className}`} role="img" aria-label={alt} />;
  }

  if (product.cutout && product.crop && product.imageSize) {
    const { x, y, w, h } = product.crop;
    const { w: W, h: H } = product.imageSize;
    const ratio = (w * W) / (h * H);
    return (
      <span
        className={`bottle ${className}`}
        style={{ ["--ar" as string]: ratio.toFixed(4) }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={alt}
          draggable={false}
          decoding="async"
          loading={eager ? "eager" : "lazy"}
          onError={() => setFailed(true)}
          style={{
            width: `${(100 / w).toFixed(3)}%`,
            left: `${((-x / w) * 100).toFixed(3)}%`,
            top: `${((-y / h) * 100).toFixed(3)}%`,
            filter: product.lift ? `brightness(${product.lift})` : undefined,
          }}
        />
      </span>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      className={`photo ${className}`}
      src={src}
      alt={alt}
      draggable={false}
      decoding="async"
      loading={eager ? "eager" : "lazy"}
      onError={() => setFailed(true)}
    />
  );
}
