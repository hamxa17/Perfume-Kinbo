"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import SiteNav from "./SiteNav";
import Folder from "./Folder";
import { mockProducts } from "../data/mockProducts";
import type { ScentFamily } from "../types/product";
import { tk, ml } from "../data/format";
import "./hero.css";

const look: Record<ScentFamily, { bg: string; fg: string; l1: string; l2: string }> = {
  Woody: { bg: "#d98e32", fg: "#2a0f1f", l1: "#f6d18b", l2: "#a8560f" },
  Oriental: { bg: "#7a2e4d", fg: "#f9dfe6", l1: "#e48aa8", l2: "#4a1230" },
  Citrus: { bg: "#e8c24a", fg: "#2b2208", l1: "#fff3b0", l2: "#c98f10" },
  Floral: { bg: "#ecc4d8", fg: "#3a1230", l1: "#fff1f7", l2: "#c77aa5" },
  Fresh: { bg: "#2f5d57", fg: "#e6f4ef", l1: "#bfe3d6", l2: "#1f3f3b" },
};

// One scene per scent family, taken from the real product data.
const scenes = Array.from(new Map(mockProducts.map((p) => [p.scentFamily, p] as const)).values()).slice(0, 4);

export default function Hero() {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const touchX = useRef<number | null>(null);
  const go = (n: number) => setI((n + scenes.length) % scenes.length);

  useEffect(() => {
    if (paused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setInterval(() => setI((p) => (p + 1) % scenes.length), 4500);
    return () => clearInterval(t);
  }, [paused]);

  const p = scenes[i];
  const c = look[p.scentFamily];
  const fam = p.scentFamily.toLowerCase();

  return (
    <section
      className="hero"
      style={{ "--bg": c.bg, "--fg": c.fg, "--l1": c.l1, "--l2": c.l2 } as React.CSSProperties}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={(e) => { touchX.current = e.touches[0].clientX; }}
      onTouchEnd={(e) => {
        if (touchX.current === null) return;
        const dx = e.changedTouches[0].clientX - touchX.current;
        if (Math.abs(dx) > 40) go(i + (dx < 0 ? 1 : -1));
        touchX.current = null;
      }}
    >
      <SiteNav />
      <h1 className="word" key={`w${p.id}`}>{p.name.split(" ")[0]}</h1>
      <div className="bottle-pos" aria-hidden>
        <div className="bottle" key={`b${p.id}`}>
          <div className="cap" /><div className="neck" />
          <div className="glass-bottle"><div className="liquid" /></div>
        </div>
      </div>

      <Folder
        key={`f${p.id}`}
        className="hero-folder"
        tabs={[
          { label: "Scent", body: (
            <>
              <p className="mono">{p.brand} · {p.scentFamily}</p>
              <h2 className="hname">{p.name}</h2>
              <p className="hfrom">From Tk {tk(p.minPrice)}</p>
              <Link className="btn-link" href={`/store?scent=${fam}`}>Shop now</Link>
            </>
          ) },
          { label: "Sizes", body: (
            <ul>{p.variants.map((v) => (
              <li key={v.volume} className="hsz"><span>{ml(v.volume)}</span><span>Tk {tk(v.price)}</span></li>
            ))}</ul>
          ) },
        ]}
      />

      <div className="controls">
        <button type="button" onClick={() => go(i - 1)} aria-label="Previous scent">‹</button>
        {scenes.map((s, n) => (
          <button key={s.id} type="button" className={n === i ? "dot on" : "dot"} onClick={() => go(n)} aria-label={s.name} />
        ))}
        <button type="button" onClick={() => go(i + 1)} aria-label="Next scent">›</button>
      </div>
    </section>
  );
}
