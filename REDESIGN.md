# Rework: soft grey scenes (Le Passant-style)

Replaces the glass look. Every section is a full-width **scene** in a grey tone, stacked with curved edges, with slow dappled-leaf shadows drifting across.

## Pages
- **/** Hero (giant "Kinbo" title writes on, bottle on a tinted disc, arrows/dots, 4 perfumes) → statement → **Shelf** (drag to scroll, "Drag" cursor) → **Collections** (hover a scent family, bottle swaps) → footer.
- **/store** Same scenes. Tiles keep all filters (URL params unchanged), size pills and Add to bag (still `console.log` in `onAdd`).
- **/credits** Photo licences (required for CC BY-SA photos).

## Data
`types/product.ts` gained optional `cutout, crop, imageSize, lift, tone, credit`. Four real perfumes were added at the top of `data/mockProducts.ts` (1 Million, Chanel No. 5, Acqua di Giò, Le Mâle). **Prices and sizes are placeholders.** If a bottle looks cropped wrong, tune that product's `crop` (fractions of the photo) or `lift`.

## Images
Photos are free-licensed from Wikimedia Commons and hotlinked. White backgrounds are removed with a blend mode, not a true transparent PNG. Before launch: download the photos into `public/`, point `images` at them, and use official/licensed product images for brands you actually sell.

## Apply
```
git rm components/Folder.tsx components/ProductStage.tsx components/hero.css app/page.module.css
```
Then copy the zip contents over the project, run `npm run dev`.

## Colours
Palette is at the top of `app/globals.css` (`--fog`, `--stone`, `--graphite`, `--paper`).
