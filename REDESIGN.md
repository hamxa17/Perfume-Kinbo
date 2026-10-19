# Glass redesign: landing page and store

This change gives the landing page and the store page one shared look and joins them together.

## The idea

**Scent as an archive.** Each perfume is a file in a folder. One frosted glass folder (tabs on top, matte grey body) is the only glass object on a page. Everything else is a white page with large serif type, small monospace labels and thin rules.

Design rules followed throughout:
- White page background.
- Glass is used only for the folder (hero and store product panel). Nav, footer, rows and links are plain text.
- Typography and hairline rules provide the structure, not cards or boxes.
- The hero animation is kept: the background color fades per scent, the big word slides in behind the bottle, and the bottle pops in.

## What changed

### Landing page (`/`)
- **Hero** now uses real products from `data/mockProducts.ts`: one scene per scent family (the first four families).
- The bottle sits on the right and the glass folder on the left, so the folder never covers the bottle. On phones the bottle moves to the top and the folder spans the bottom.
- The folder has two working tabs: **Scent** (brand, family, name, starting price, "Shop now") and **Sizes** (volumes and prices). The old Notes and Story tabs were removed because the product data has no content for them.
- **Bestsellers** are numbered archive rows (first six products). Hovering a row shows a round product photo.
- **Collections** are large type links, one per scent family.
- A single promo line and a footer close the page.

### Store page (`/store`)
- The product grid is replaced by archive rows. Hovering, focusing or tapping a row loads that product into a panel.
- On desktop the panel sits in a sticky column on the right. On phones it opens under the tapped row.
- The panel is the second glass folder, laid over the product photo, with **Sizes** (pick a size, then add to bag) and **Details** (brand, family, currency, stock status).
- Filters are unchanged in logic and URL parameters (`availability`, `price`, `scent`, `volume`, `sort`). Only the look changed: quiet underlined selects.

### Joining the two pages
- Shared `SiteNav` and `Footer` components appear on both pages.
- Every landing link goes to `/store`. Collection links are filtered, for example `/store?scent=woody`.
- Hero "Shop now" goes to the matching scent family, for example `/store?scent=oriental`.
- Both pages read the same `mockProducts` data.

## Files

| File | Status | Purpose |
| --- | --- | --- |
| `app/globals.css` | Modified | Tailwind import, fonts, all shared styles (glass, rows, store layout) |
| `app/layout.tsx` | Modified | Loads Bodoni Moda, Jost and DM Mono; removed a duplicate CSS import |
| `app/page.tsx` | Modified | Landing page |
| `app/store/page.tsx` | Modified | Store page wrapper |
| `components/Hero.tsx`, `components/hero.css` | Modified | Scent carousel hero |
| `components/StoreCatalog.tsx` | Modified | Store UI (filter logic kept) |
| `components/Folder.tsx` | New | Reusable glass folder with tabs |
| `components/ProductStage.tsx` | New | Store product panel (photo plus folder) |
| `components/SiteNav.tsx` | New | Shared navigation |
| `components/Footer.tsx` | New | Shared footer |
| `data/format.ts` | New | `tk()` and `ml()` formatting helpers |

## Things worth knowing

- **CSS layers.** The old `globals.css` contained `*{margin:0}` outside any layer, which overrode Tailwind spacing classes. All custom CSS now lives in `@layer base` and `@layer components`, so Tailwind utilities win again.
- **Fonts.** The serif is mapped to Tailwind's `font-serif`, so Tailwind classes and the custom CSS share one display font.
- **Hero colors.** Each scent family's colors are in the `look` object at the top of `Hero.tsx`.
- **Add to bag** still only logs to the console (`onAdd` in `StoreCatalog.tsx`). Connect your cart logic there.
- **Unused files.** `ProductCard.tsx` and `ProductGrid.tsx` are no longer used by the store. They were left in place.
- **Placeholders to replace.** The Instagram link and promo line on the landing page, and the WhatsApp link in the footer (`https://wa.me/`).
- **First run needs internet**, because the three Google fonts are downloaded on first start.

## Run it

```
npm install
npm run dev
```

Then open http://localhost:3000 and http://localhost:3000/store.
