import Link from "next/link";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";
import { mockProducts } from "@/data/mockProducts";
import { tk } from "@/data/format";

const picks = mockProducts.slice(0, 6);
const families = Array.from(new Set(mockProducts.map((p) => p.scentFamily)));

export default function Home() {
  return (
    <main>
      <Hero />

      <section id="bestsellers" className="sec">
        <div className="rule-head mono"><span>Bestsellers</span><span>{picks.length} items</span></div>
        {picks.map((p, n) => (
          <Link key={p.id} href="/store" className="row">
            <span className="mono idx">{String(n + 1).padStart(2, "0")}</span>
            <span className="rname">{p.name}</span>
            <span className="mono fam">{p.scentFamily} · {p.brand}</span>
            <span className="mono price">From Tk {tk(p.minPrice)}</span>
            <span className="peek" style={{ backgroundImage: `url("${p.images[0]}")` }} />
          </Link>
        ))}
        <p className="mono" style={{ paddingTop: ".8rem", color: "var(--mute)" }}>
          <Link href="/store">View all in the store →</Link>
        </p>
      </section>

      <section id="collections" className="sec">
        <div className="rule-head mono"><span>Collections</span><span>{families.length}</span></div>
        {families.map((f) => (
          <Link key={f} href={`/store?scent=${f.toLowerCase()}`} className="coll">
            <span className="big">{f}</span>
            <span className="mono">{mockProducts.filter((p) => p.scentFamily === f).length} scents ↗</span>
          </Link>
        ))}
      </section>

      <section className="sec">
        <p className="line">New scents, first. <a className="btn-link" href="https://www.instagram.com/">Follow us on Instagram.</a></p>
      </section>

      <Footer />
    </main>
  );
}
