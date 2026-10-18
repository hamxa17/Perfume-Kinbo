
"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { mockProducts } from "../data/mockProducts";
import ProductCard from "./ProductCard";

const filterKeys = [
  "availability",
  "price",
  "scent",
  "volume",
  "sort",
] as const;

const controlClass =
  "w-full appearance-none rounded-full border border-[#E5DFD5] bg-[#FFFEFC] px-4 py-3 text-xs text-[#39352F] outline-none transition-colors hover:border-[#B9A98F] focus:border-[#8F7957] sm:text-sm";

export default function StoreCatalog() {
  const router = useRouter();
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

  return (
    <main className="min-h-screen w-full overflow-x-clip bg-[#FFFEFC] text-[#292722]">
      {/* Editorial heading */}
      <header className="w-full px-4 pb-10 pt-14 text-center sm:px-8 sm:pb-14 sm:pt-16 lg:px-12 lg:pb-16 lg:pt-20">
        <p className="mb-5 text-[10px] font-medium uppercase tracking-[0.32em] text-[#8A8071] sm:mb-6 sm:text-xs">
          Discover Your Signature Scent
        </p>

        <h1 className="mb-4 font-serif text-5xl font-normal leading-[1.08] tracking-[-0.04em] sm:mb-5 sm:text-6xl lg:text-7xl">
          Fragrances
        </h1>

        <p className="mx-auto max-w-md text-sm leading-7 text-[#81796F] sm:text-base">
          Explore our curated fragrance collection.
        </p>
      </header>

      {/* Full-width catalogue */}
      <section className="w-full px-4 pb-16 sm:px-8 lg:px-10 xl:px-12 2xl:px-16">
        {/* Catalogue toolbar */}
        <div className="mb-7 border-y border-[#EAE5DC] py-5 sm:mb-9 sm:py-6">
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
            <p
              className="text-xs tracking-wide text-[#756D62] sm:text-sm"
              aria-live="polite"
            >
              Showing {filteredProducts.length} of {mockProducts.length}{" "}
              products
            </p>

            {hasActiveFilters && (
              <button
                type="button"
                onClick={clearFilters}
                className="text-xs text-[#756D62] underline underline-offset-4 transition-colors hover:text-[#292722]"
              >
                Clear filters
              </button>
            )}
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5 lg:gap-4">
            <div className="min-w-0">
              <label
                htmlFor="availability-filter"
                className="mb-2 block text-[10px] uppercase tracking-[0.14em] text-[#81796F]"
              >
                Availability
              </label>
              <select
                id="availability-filter"
                value={availability}
                onChange={(event) =>
                  updateFilter("availability", event.target.value)
                }
                className={controlClass}
              >
                <option value="all">All products</option>
                <option value="in-stock">In stock</option>
                <option value="sold-out">Sold out</option>
              </select>
            </div>

            <div className="min-w-0">
              <label
                htmlFor="price-filter"
                className="mb-2 block text-[10px] uppercase tracking-[0.14em] text-[#81796F]"
              >
                Price range
              </label>
              <select
                id="price-filter"
                value={price}
                onChange={(event) =>
                  updateFilter("price", event.target.value)
                }
                className={controlClass}
              >
                <option value="all">All prices</option>
                <option value="under-5000">Under Tk 5,000</option>
                <option value="5000-7000">Tk 5,000 – 7,000</option>
                <option value="over-7000">Above Tk 7,000</option>
              </select>
            </div>

            <div className="min-w-0">
              <label
                htmlFor="scent-filter"
                className="mb-2 block text-[10px] uppercase tracking-[0.14em] text-[#81796F]"
              >
                Scent family
              </label>
              <select
                id="scent-filter"
                value={scent}
                onChange={(event) =>
                  updateFilter("scent", event.target.value)
                }
                className={controlClass}
              >
                <option value="all">All scents</option>
                <option value="floral">Floral</option>
                <option value="woody">Woody</option>
                <option value="oriental">Oriental</option>
                <option value="fresh">Fresh</option>
                <option value="citrus">Citrus</option>
              </select>
            </div>

            <div className="min-w-0">
              <label
                htmlFor="volume-filter"
                className="mb-2 block text-[10px] uppercase tracking-[0.14em] text-[#81796F]"
              >
                Volume
              </label>
              <select
                id="volume-filter"
                value={volume}
                onChange={(event) =>
                  updateFilter("volume", event.target.value)
                }
                className={controlClass}
              >
                <option value="all">All sizes</option>
                <option value="30ml">30 ml</option>
                <option value="50ml">50 ml</option>
                <option value="100ml">100 ml</option>
              </select>
            </div>

            <div className="col-span-2 min-w-0 sm:col-span-1">
              <label
                htmlFor="sort-filter"
                className="mb-2 block text-[10px] uppercase tracking-[0.14em] text-[#81796F]"
              >
                Sort by
              </label>
              <select
                id="sort-filter"
                value={sort}
                onChange={(event) =>
                  updateFilter("sort", event.target.value)
                }
                className={controlClass}
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: low to high</option>
                <option value="price-high">Price: high to low</option>
                <option value="name">Name: A–Z</option>
              </select>
            </div>
          </div>
        </div>

        {/* Responsive product grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 gap-x-3 gap-y-9 sm:grid-cols-3 sm:gap-x-5 sm:gap-y-12 lg:grid-cols-4 lg:gap-x-6 lg:gap-y-14 2xl:grid-cols-5 2xl:gap-x-7">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAdd={(item) => {
                  console.log("Add to bag:", item.id);
                }}
              />
            ))}
          </div>
        ) : (
          <div className="flex min-h-64 flex-col items-center justify-center py-16 text-center">
            <h2 className="font-serif text-2xl">No fragrances found</h2>
            <p className="mt-3 text-sm leading-6 text-[#81796F]">
              Try changing your filters to discover more scents.
            </p>
            <button
              type="button"
              onClick={clearFilters}
              className="mt-5 rounded-full border border-[#D9D0C3] px-5 py-2.5 text-sm transition-colors hover:bg-[#F5F1EA]"
            >
              Reset filters
            </button>
          </div>
        )}
      </section>
    </main>
  );
}
