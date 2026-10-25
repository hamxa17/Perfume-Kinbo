"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { mockProducts } from "../data/mockProducts";
import { tk } from "../data/format";
import Bottle from "./Bottle";
import Dapple from "./Dapple";

export default function Shelf() {
  const ref = useRef<HTMLDivElement>(null);
  const cur = useRef<HTMLDivElement>(null);
  const drag = useRef({ down: false, x: 0, left: 0, moved: false });
  const [dragging, setDragging] = useState(false);
  const [over, setOver] = useState(false);

  return (
    <section id="shelf" className="scene scene-graphite arc shelf-scene">
      <Dapple soft />
      <div className="shelf-head" style={{ position: "relative", zIndex: 1 }}>
        <h2 className="swash">The shelf</h2>
        <span className="caps" style={{ opacity: 0.6 }}>{mockProducts.length} scents</span>
      </div>
      <div
        ref={ref}
        className={`shelf${dragging ? " dragging" : ""}`}
        style={{ position: "relative", zIndex: 1 }}
        onPointerDown={(e) => {
          if (e.pointerType !== "mouse") return;
          drag.current = { down: true, x: e.clientX, left: ref.current!.scrollLeft, moved: false };
        }}
        onPointerMove={(e) => {
          if (cur.current) cur.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
          const d = drag.current;
          if (!d.down) return;
          const dx = e.clientX - d.x;
          if (Math.abs(dx) > 4) { d.moved = true; setDragging(true); }
          ref.current!.scrollLeft = d.left - dx;
        }}
        onPointerUp={() => { drag.current.down = false; setDragging(false); }}
        onPointerLeave={() => { drag.current.down = false; setDragging(false); setOver(false); }}
        onPointerEnter={() => setOver(true)}
        onClickCapture={(e) => { if (drag.current.moved) { e.preventDefault(); e.stopPropagation(); drag.current.moved = false; } }}
      >
        {mockProducts.map((p) => (
          <Link key={p.id} href="/store" className="shelf-item" draggable={false}>
            <div className="shelf-tile" style={{ ["--tone" as string]: p.cutout ? (p.tone ?? "#cfd2d0") : "#cfd2d0" }}>
              <Bottle product={p} />
            </div>
            <div className="shelf-meta">
              <div>
                <p className="caps" style={{ opacity: 0.6 }}>{p.brand}</p>
                <p className="swash">{p.name}</p>
              </div>
              <p className="caps">Tk {tk(p.minPrice)}</p>
            </div>
          </Link>
        ))}
      </div>
      <div ref={cur} className={`drag-cursor caps${over ? " on" : ""}`} aria-hidden="true">Drag</div>
    </section>
  );
}
