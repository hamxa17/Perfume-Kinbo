import Link from "next/link";

// Plain text on purpose: it takes its colour from whatever it sits on.
export default function SiteNav() {
  return (
    <header className="nav">
      <Link href="/" className="logo">Kinbo</Link>
      <nav>
        <Link href="/store">Shop</Link>
        <Link href="/#collections">Collections</Link>
        <span>Cart (0)</span>
      </nav>
    </header>
  );
}
