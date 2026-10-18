# PRD: Perfume Store Page

## Overview
A minimalist, high-end editorial e-commerce catalog page inspired by luxury boutique layouts.

## Key Visual & UI Features
1. **Header & Title Section:**
   * Centered page title ("Perfumes" or "Fragrances") in elegant typography.
   * Clean top navigation bar with centered logo and subtle utility icons (Search, Cart).

2. **Catalog Toolbar:**
   * **Filter Dropdowns:** Minimal inline filter triggers (`Availability`, `Price`, `Scent Family`, `Volume`).
   * **Right Actions:** Total product count indicator, `Sort` dropdown, and a 2-column vs 4-column Grid Layout Switcher.

3. **Product Card Specifications:**
   * **Background:** Soft cream / off-white full-bleed image container (`#F8F8F8` or `#F5F5F5`).
   * **Pricing Structure:** Display price as a dynamic **price range** based on available bottle sizes (e.g., `Tk 3,500.00 – Tk 7,500.00 BDT` or `From Tk 3,500.00 BDT`).
   * **Typography:** Clean left-aligned title followed by formatted BDT pricing underneath.
   * **Hover Interaction:** Subtle zoom effect on product image with a pill-shaped floating `+ Add` button appearing on bottom-right hover.

4. **Filter & Sort Logic:**
   * URL-driven state sync via Next.js `useSearchParams`.
   * Dynamic filtering updates product count and grid smoothly without full page reloads.
