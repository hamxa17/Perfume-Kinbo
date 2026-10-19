"use client";
import { useState } from "react";
import Folder from "./Folder";
import type { Product, VolumeVariant } from "../types/product";
import { tk, ml } from "../data/format";

// The product photo is the backdrop; the glass folder holds sizes and details.
export default function ProductStage({ product, onAdd }: { product: Product; onAdd: (p: Product, v: VolumeVariant) => void }) {
  const first = product.variants.find((v) => v.inStock) ?? product.variants[0];
  const [vol, setVol] = useState(first.volume);
  const sel = product.variants.find((v) => v.volume === vol) ?? first;
  const inStock = product.variants.some((v) => v.inStock);

  return (
    <div className="stage" style={{ backgroundImage: `url("${product.images[0] ?? ""}")` }}>
      <Folder
        className="fold"
        tabs={[
          { label: "Sizes", body: (
            <>
              {product.variants.map((v) => (
                <button key={v.volume} type="button" className="sz" aria-pressed={v.volume === sel.volume} disabled={!v.inStock} onClick={() => setVol(v.volume)}>
                  <span>{ml(v.volume)}</span><span>{v.inStock ? `Tk ${tk(v.price)}` : "Sold out"}</span>
                </button>
              ))}
              <button type="button" className="add" disabled={!sel.inStock} onClick={() => onAdd(product, sel)}>
                Add to bag · {ml(sel.volume)}
              </button>
            </>
          ) },
          { label: "Details", body: (
            <>
              <p className="mono">{product.brand}</p>
              <p style={{ margin: ".4rem 0" }}>{product.scentFamily} · {product.currency}</p>
              <p className="mono">{inStock ? "In stock" : "Sold out"}</p>
            </>
          ) },
        ]}
      />
    </div>
  );
}
