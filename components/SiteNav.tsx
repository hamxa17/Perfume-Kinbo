import Link from "next/link";

// Small, evenly spaced links across the top of a scene. They take their colour
// from the scene they sit on.
export default function SiteNav() {
  return (
    <header className="nav caps">
      <Link href="/store">Shop</Link>
      <Link href="/#shelf">Scents</Link>
      <Link href="/#collections">Collections</Link>
      <Link href="/credits">Credits</Link>
      <span aria-label="Cart, 0 items">Cart (0)</span>
    </header>
  );
}
