"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import type { Product } from "../types/product";
import { ml, tk } from "../data/format";
import Bottle from "./Bottle";
import { mockProducts } from "../data/mockProducts";

type Line = { id: string; volume: string; price: number; qty: number };

type CartCtx = {
  count: number;
  open: boolean;
  setOpen: (v: boolean) => void;
  add: (p: Product, volume: string) => void;
};

const Ctx = createContext<CartCtx | null>(null);
const KEY = "kinbo-cart";

export function useCart() {
  const c = useContext(Ctx);
  if (!c) throw new Error("useCart must be used inside CartProvider");
  return c;
}

export default function CartProvider({ children }: { children: React.ReactNode }) {
  const [lines, setLines] = useState<Line[]>([]);
  const [open, setOpen] = useState(false);
  const [ready, setReady] = useState(false);

  // Load the saved bag once, in the browser.
  useEffect(() => {
    queueMicrotask(() => {
      try {
        const raw = localStorage.getItem(KEY);
        if (raw) setLines(JSON.parse(raw));
      } catch {}
      setReady(true);
    });
  }, []);

  useEffect(() => {
    if (!ready) return;
    try { localStorage.setItem(KEY, JSON.stringify(lines)); } catch {}
  }, [lines, ready]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const add = useCallback((p: Product, volume: string) => {
    const v = p.variants.find((x) => x.volume === volume);
    if (!v || !v.inStock) return;
    setLines((ls) => {
      const found = ls.find((l) => l.id === p.id && l.volume === volume);
      if (found) return ls.map((l) => (l === found ? { ...l, qty: l.qty + 1 } : l));
      return [...ls, { id: p.id, volume, price: v.price, qty: 1 }];
    });
    setOpen(true);
  }, []);

  const change = (l: Line, d: number) =>
    setLines((ls) =>
      ls.flatMap((x) => (x === l ? (x.qty + d > 0 ? [{ ...x, qty: x.qty + d }] : []) : [x])),
    );

  const count = lines.reduce((n, l) => n + l.qty, 0);
  const total = lines.reduce((n, l) => n + l.qty * l.price, 0);
  const value = useMemo(() => ({ count, open, setOpen, add }), [count, open, add]);

  return (
    <Ctx.Provider value={value}>
      {children}
      <div className={`cart-veil${open ? " on" : ""}`} onClick={() => setOpen(false)} />
      <aside className={`cart${open ? " on" : ""}`} aria-hidden={!open} aria-label="Your bag">
        <div className="cart-head">
          <h2 className="swash">Your bag</h2>
          <button type="button" className="caps" onClick={() => setOpen(false)}>Close</button>
        </div>
        {lines.length === 0 ? (
          <p className="cart-empty">Your bag is empty.</p>
        ) : (
          <ul className="cart-lines">
            {lines.map((l) => {
              const p = mockProducts.find((x) => x.id === l.id);
              if (!p) return null;
              return (
                <li key={l.id + l.volume}>
                  <div className="cart-thumb" style={{ background: p.cutout ? (p.tone ?? "#cfd2d0") : "#cfd2d0" }}>
                    <Bottle product={p} />
                  </div>
                  <div className="cart-info">
                    <p className="caps" style={{ opacity: 0.6 }}>{p.brand}</p>
                    <p className="swash" style={{ fontSize: "1.25rem", lineHeight: 1.1 }}>{p.name}</p>
                    <p className="caps">{ml(l.volume)} · Tk {tk(l.price)}</p>
                    <div className="qty">
                      <button type="button" aria-label="Remove one" onClick={() => change(l, -1)}>−</button>
                      <span>{l.qty}</span>
                      <button type="button" aria-label="Add one" onClick={() => change(l, 1)}>+</button>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
        {lines.length > 0 && (
          <div className="cart-foot">
            <p className="caps" style={{ display: "flex", justifyContent: "space-between" }}>
              <span>Total</span><span>Tk {tk(total)}</span>
            </p>
            <button type="button" className="btn-rect" style={{ width: "100%", marginTop: "1rem" }} disabled title="Checkout is not built yet">
              Checkout (coming soon)
            </button>
          </div>
        )}
      </aside>
    </Ctx.Provider>
  );
}
