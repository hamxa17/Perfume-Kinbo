"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { mockProducts } from "../data/mockProducts";
import { tk } from "../data/format";
import Bottle from "./Bottle";
import Dapple from "./Dapple";
import SiteNav from "./SiteNav";

// Hero shows the studio-photo perfumes only (they cut out cleanly).
const featured = mockProducts.filter((p) => p.cutout);

export default function Hero() {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const n = featured.length;
  const p = featured[i];

  useEffect(() => {
    if (paused || n < 2) return;
    const t = setInterval(() => setI((v) => (v + 1) % n), 6500);
    return () => clearInterval(t);
  }, [paused, n]);

  if (!p) return null;
  const go = (d: number) => setI((v) => (v + d + n) % n);

  return (
    <section
      className="scene scene-fog hero"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <Dapple />
      <SiteNav />
      <div className="hero-stage">
        <h1 className="hero-title" aria-label="Kinbo">Kinbo</h1>
        <div className="hero-disc" style={{ background: p.tone ?? "#cbcecc" }} />
        <div className="hero-bottle" key={p.id}>
          <Bottle product={p} eager />
        </div>
      </div>
      <div className="hero-foot">
        <div>
          <p className="caps" style={{ opacity: 0.6 }}>{p.brand} · {p.scentFamily}</p>
          <p className="swash hero-name">{p.name}</p>
          <p className="caps" style={{ marginTop: ".5rem" }}>From Tk {tk(p.minPrice)}</p>
        </div>
        <div className="hero-ctrl">
          <button className="arrow" onClick={() => go(-1)} aria-label="Previous perfume">←</button>
          <div className="dots">
            {featured.map((f, k) => (
              <button key={f.id} aria-label={`Show ${f.name}`} aria-current={k === i} onClick={() => setI(k)} />
            ))}
          </div>
          <button className="arrow" onClick={() => go(1)} aria-label="Next perfume">→</button>
        </div>
        <Link href={`/store?scent=${p.scentFamily.toLowerCase()}`} className="btn-rect">Shop {p.scentFamily}</Link>
      </div>
    </section>
  );
}
