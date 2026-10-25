"use client";

import Link from "next/link";
import { useCart } from "./CartProvider";

// A floating glass pill, 90% wide, pinned to the top of every page.
export default function SiteNav() {
  const { count, setOpen } = useCart();
  return (
    <header className="nav caps">
      <Link href="/" className="nav-brand swash" aria-label="Kinbo home">Kinbo</Link>
      <nav className="nav-links">
        <Link href="/store">Shop</Link>
        <Link href="/#shelf">Scents</Link>
        <Link href="/#collections">Collections</Link>
      </nav>
      <button type="button" className="nav-bag" onClick={() => setOpen(true)} aria-label={`Open bag, ${count} items`}>
        Bag ({count})
      </button>
    </header>
  );
}
