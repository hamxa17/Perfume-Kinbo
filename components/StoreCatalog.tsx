"use client";

import { useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { mockProducts } from "../data/mockProducts";
import type { Product } from "../types/product";
import { tk, ml } from "../data/format";
import SiteNav from "./SiteNav";
import Footer from "./Footer";
import Bottle from "./Bottle";
import Dapple from "./Dapple";

const filterKeys = ["availability", "price", "scent", "volume", "sort"] as const;

export default function StoreCatalog() {
  const router = useRouter();
  const [picked, setPicked] = useState<Record<string, string>>({});
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const availability = searchParams.get("availability") ?? "all";
  const price = searchParams.get("price") ?? "all";
  const scent = searchParams.get("scent") ?? "all";
  const volume = searchParams.get("volume") ?? "all";
  const sort = searchParams.get("sort") ?? "featured";

  function updateFilter(key: string, value: string) {
    const params = new URLSearchParams(searchParams.toString());

    if (value === "all" || value === "featured") {
      params.delete(key);
    } else {
      params.set(key, value);
    }

    const query = params.toString();
    router.replace(query ? `${pathname}?${query}` : pathname, {
      scroll: false,
    });
  }

  function clearFilters() {
    const params = new URLSearchParams(searchParams.toString());

    filterKeys.forEach((key) => params.delete(key));

    const query = params.toString();
    router.replace(query ? `${pathname}?${query}` : pathname, {
      scroll: false,
    });
  }

  const filteredProducts = mockProducts
    .filter((product) => {
      if (
        availability === "in-stock" &&
        !product.variants.some((variant) => variant.inStock)
      ) {
        return false;
      }

      if (
        availability === "sold-out" &&
        product.variants.some((variant) => variant.inStock)
      ) {
        return false;
      }

      if (
        scent !== "all" &&
        product.scentFamily.toLowerCase() !== scent
      ) {
        return false;
      }

      if (
        volume !== "all" &&
        !product.variants.some((variant) => variant.volume === volume)
      ) {
        return false;
      }

      // Price filters match products whose price range overlaps the band.
      if (
        price === "under-5000" &&
        product.minPrice >= 5000
      ) {
        return false;
      }

      if (
        price === "5000-7000" &&
        (product.maxPrice < 5000 || product.minPrice > 7000)
      ) {
        return false;
      }

      if (
        price === "over-7000" &&
        product.maxPrice <= 7000
      ) {
        return false;
      }

      return true;
    })
    .sort((a, b) => {
      switch (sort) {
        case "price-low":
          return a.minPrice - b.minPrice;
        case "price-high":
          return b.minPrice - a.minPrice;
        case "name":
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });

  const hasActiveFilters = filterKeys.some((key) => {
    const value = searchParams.get(key);
    return value !== null && value !== "all" && value !== "featured";
  });

  // Temporary integration point for your cart logic.
  const onAdd = (p: Product, volume: string) => console.log("Add to bag:", p.id, volume);

  const filters = [
    { key: "availability", label: "Availability", value: availability, opts: [["all", "All"], ["in-stock", "In stock"], ["sold-out", "Sold out"]] },
    { key: "price", label: "Price", value: price, opts: [["all", "All prices"], ["under-5000", "Under Tk 5,000"], ["5000-7000", "Tk 5,000 – 7,000"], ["over-7000", "Above Tk 7,000"]] },
    { key: "scent", label: "Scent family", value: scent, opts: [["all", "All scents"], ["floral", "Floral"], ["woody", "Woody"], ["oriental", "Oriental"], ["fresh", "Fresh"], ["citrus", "Citrus"]] },
    { key: "volume", label: "Volume", value: volume, opts: [["all", "All sizes"], ["30ml", "30 ml"], ["50ml", "50 ml"], ["100ml", "100 ml"]] },
    { key: "sort", label: "Sort by", value: sort, opts: [["featured", "Featured"], ["price-low", "Price: low to high"], ["price-high", "Price: high to low"], ["name", "Name: A–Z"]] },
  ];

  return (
    <main>
      <section className="scene scene-fog store-hero">
        <Dapple />
        <SiteNav />
        <p className="caps" style={{ opacity: 0.6, position: "relative", zIndex: 1 }}>Kinbo / Index</p>
        <h1 style={{ position: "relative", zIndex: 1 }}>Fragrances</h1>
      </section>

      <section className="store-body">
        <div className="filters">
          {filters.map((f) => (
            <div key={f.key}>
              <label htmlFor={`${f.key}-filter`} className="caps">{f.label}</label>
              <select id={`${f.key}-filter`} value={f.value} onChange={(e) => updateFilter(f.key, e.target.value)}>
                {f.opts.map(([v, t]) => <option key={v} value={v}>{t}</option>)}
              </select>
            </div>
          ))}
        </div>
        <div className="count caps" aria-live="polite">
          <span>Showing {filteredProducts.length} of {mockProducts.length}</span>
          {hasActiveFilters && <button type="button" onClick={clearFilters}>Clear filters</button>}
        </div>

        {filteredProducts.length > 0 ? (
          <ul className="grid">
            {filteredProducts.map((p) => {
              const vol = picked[p.id] ?? p.variants.find((v) => v.inStock)?.volume ?? p.variants[0].volume;
              const variant = p.variants.find((v) => v.volume === vol) ?? p.variants[0];
              return (
                <li key={p.id} className="tile">
                  <div className="shelf-tile" style={{ ["--tone" as string]: p.cutout ? (p.tone ?? "#cfd2d0") : "#cfd2d0" }}>
                    <Bottle product={p} />
                  </div>
                  <div className="meta">
                    <p className="caps" style={{ opacity: 0.6 }}>{p.brand} · {p.scentFamily}</p>
                    <span className="swash">{p.name}</span>
                    <div className="sizes">
                      {p.variants.map((v) => (
                        <button
                          key={v.volume}
                          type="button"
                          aria-pressed={v.volume === vol}
                          disabled={!v.inStock}
                          onClick={() => setPicked((m) => ({ ...m, [p.id]: v.volume }))}
                        >
                          {ml(v.volume)}
                        </button>
                      ))}
                    </div>
                    <button type="button" className="add caps" disabled={!variant.inStock} onClick={() => onAdd(p, variant.volume)}>
                      {variant.inStock ? `Add to bag · Tk ${tk(variant.price)}` : "Sold out"}
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        ) : (
          <div className="empty">
            <h2>No fragrances found</h2>
            <p style={{ color: "var(--mute)", margin: ".6rem 0 1rem" }}>Try changing your filters.</p>
            <button type="button" onClick={clearFilters} className="caps" style={{ textDecoration: "underline" }}>Reset filters</button>
          </div>
        )}
      </section>
      <Footer />
    </main>
  );
}
