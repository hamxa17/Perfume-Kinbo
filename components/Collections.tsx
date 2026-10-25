"use client";

import Link from "next/link";
import { useState } from "react";
import { mockProducts } from "../data/mockProducts";
import Bottle from "./Bottle";
import Dapple from "./Dapple";

const families = Array.from(new Set(mockProducts.map((p) => p.scentFamily)));
const pick = (f: string) =>
  mockProducts.find((p) => p.scentFamily === f && p.cutout) ?? mockProducts.find((p) => p.scentFamily === f)!;

export default function Collections() {
  const [active, setActive] = useState(families[0]);
  const show = pick(active);

  return (
    <section id="collections" className="scene scene-stone arc coll-scene">
      <Dapple soft />
      <div className="coll" style={{ position: "relative" }}>
        <ul className="coll-list">
          {families.map((f) => (
            <li key={f}>
              <Link
                href={`/store?scent=${f.toLowerCase()}`}
                className={f === active ? "on" : ""}
                onMouseEnter={() => setActive(f)}
                onFocus={() => setActive(f)}
              >
                <span>{f}</span>
                <span className="caps">{mockProducts.filter((p) => p.scentFamily === f).length} →</span>
              </Link>
            </li>
          ))}
        </ul>
        <div className="coll-show" key={show.id}>
          <div className="hero-disc" style={{ background: show.tone ?? "#d4d7d5" }} />
          <Bottle product={show} />
        </div>
      </div>
    </section>
  );
}
