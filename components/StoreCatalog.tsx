"use client";

import { useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { mockProducts } from "../data/mockProducts";
import type { Product } from "../types/product";
import { tk } from "../data/format";
import SiteNav from "./SiteNav";
import Footer from "./Footer";
import ProductStage from "./ProductStage";

const filterKeys = ["availability", "price", "scent", "volume", "sort"] as const;

const priceText = (p: Product) =>
  p.minPrice === p.maxPrice ? `Tk ${tk(p.minPrice)}` : `Tk ${tk(p.minPrice)} – ${tk(p.maxPrice)}`;

export default function StoreCatalog() {
  const router = useRouter();
  const [activeId, setActiveId] = useState<string | null>(null);
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

  const active = filteredProducts.find((p) => p.id === activeId) ?? filteredProducts[0];
  // Temporary integration point for your cart logic.
  const onAdd = (p: Product, v: { volume: string }) => console.log("Add to bag:", p.id, v.volume);

  const filters = [
    { key: "availability", label: "Availability", value: availability, opts: [["all", "All"], ["in-stock", "In stock"], ["sold-out", "Sold out"]] },
    { key: "price", label: "Price", value: price, opts: [["all", "All prices"], ["under-5000", "Under Tk 5,000"], ["5000-7000", "Tk 5,000 – 7,000"], ["over-7000", "Above Tk 7,000"]] },
    { key: "scent", label: "Scent family", value: scent, opts: [["all", "All scents"], ["floral", "Floral"], ["woody", "Woody"], ["oriental", "Oriental"], ["fresh", "Fresh"], ["citrus", "Citrus"]] },
    { key: "volume", label: "Volume", value: volume, opts: [["all", "All sizes"], ["30ml", "30 ml"], ["50ml", "50 ml"], ["100ml", "100 ml"]] },
    { key: "sort", label: "Sort by", value: sort, opts: [["featured", "Featured"], ["price-low", "Price: low to high"], ["price-high", "Price: high to low"], ["name", "Name: A–Z"]] },
  ];

  return (
    <main style={{ position: "relative" }}>
      <SiteNav />
      <header className="store-head">
        <p className="mono" style={{ color: "var(--mute)" }}>Kinbo / Index</p>
        <h1>Fragrances</h1>
      </header>

      <section className="sec" style={{ paddingTop: "1.5rem" }}>
        <div className="rule-head mono" aria-live="polite">
          <span>Showing {filteredProducts.length} of {mockProducts.length}</span>
          {hasActiveFilters && <button type="button" onClick={clearFilters} className="btn-link mono">Clear filters</button>}
        </div>
        <div className="filters">
          {filters.map((f) => (
            <div key={f.key}>
              <label htmlFor={`${f.key}-filter`} className="mono">{f.label}</label>
              <select id={`${f.key}-filter`} value={f.value} onChange={(e) => updateFilter(f.key, e.target.value)}>
                {f.opts.map(([v, t]) => <option key={v} value={v}>{t}</option>)}
              </select>
            </div>
          ))}
        </div>

        {active ? (
          <div className="store-grid">
            <ol>
              {filteredProducts.map((p, n) => (
                <li key={p.id}>
                  <button type="button" className={`row${p.id === active.id ? " on" : ""}`} onMouseEnter={() => setActiveId(p.id)} onFocus={() => setActiveId(p.id)} onClick={() => setActiveId(p.id)}>
                    <span className="mono idx">{String(n + 1).padStart(2, "0")}</span>
                    <span className="rname">{p.name}</span>
                    <span className="mono fam">{p.scentFamily} · {p.brand}</span>
                    <span className="mono price">{priceText(p)}</span>
                  </button>
                  {p.id === active.id && <div className="inline-stage"><ProductStage key={p.id} product={p} onAdd={onAdd} /></div>}
                </li>
              ))}
            </ol>
            <aside className="stage-col"><ProductStage key={active.id} product={active} onAdd={onAdd} /></aside>
          </div>
        ) : (
          <div style={{ padding: "4rem 0" }}>
            <h2 style={{ fontSize: "2rem" }}>No fragrances found</h2>
            <p style={{ color: "var(--mute)", margin: ".6rem 0 1rem" }}>Try changing your filters.</p>
            <button type="button" onClick={clearFilters} className="btn-link">Reset filters</button>
          </div>
        )}
      </section>
      <div style={{ height: "4rem" }} />
      <Footer />
    </main>
  );
}
