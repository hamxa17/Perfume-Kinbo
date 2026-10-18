"use client";
import { useEffect, useRef, useState } from "react";
import "./hero.css";

// One entry per scent. Swapping a scent changes the background color, the giant
// word behind the bottle, the bottle itself and the ingredient circle.
const scents = [
  { name: "Amber Noor", word: "AMBER", bg: "#d98e32", fg: "#2a0f1f", liquid: ["#f6d18b", "#a8560f"], note: "Amber, oud and saffron. Warm, slow, and hard to forget.", dot: "radial-gradient(circle at 35% 30%,#ffe9b8,#b8651a)" },
  { name: "Velvet Hour", word: "VELVET", bg: "#7a2e4d", fg: "#f9dfe6", liquid: ["#e48aa8", "#4a1230"], note: "Plum, vanilla and soft leather for late evenings.", dot: "radial-gradient(circle at 35% 30%,#f2a0bd,#4a1230)" },
  { name: "Monsoon", word: "MONSOON", bg: "#2f5d57", fg: "#e6f4ef", liquid: ["#bfe3d6", "#1f3f3b"], note: "Wet earth, vetiver and jasmine, just after the rain.", dot: "radial-gradient(circle at 35% 30%,#cdeee0,#1f3f3b)" },
  { name: "Rajanigandha", word: "TUBEROSE", bg: "#ecc4d8", fg: "#3a1230", liquid: ["#fff1f7", "#c77aa5"], note: "Tuberose, white musk and cedar. Clean and bright.", dot: "radial-gradient(circle at 35% 30%,#fff,#d98fb5)" },
];

export default function Hero() {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const touchX = useRef<number | null>(null);
  const go = (n: number) => setI((n + scents.length) % scents.length);

  useEffect(() => {
    if (paused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setInterval(() => setI((p) => (p + 1) % scents.length), 4500);
    return () => clearInterval(t);
  }, [paused]);

  const s = scents[i];
  return (
    <section
      className="hero"
      style={{ "--bg": s.bg, "--fg": s.fg, "--l1": s.liquid[0], "--l2": s.liquid[1] } as React.CSSProperties}
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
      {/* key={i} remounts these on every change, which replays their entrance animation */}
      <h1 className="word" key={`w${i}`}>{s.word}</h1>
      <div className="orb" key={`o${i}`} style={{ background: s.dot }} aria-hidden />
      <div className="bottle" key={`b${i}`} aria-hidden>
        <div className="cap" /><div className="neck" />
        <div className="glass"><div className="liquid" /></div>
      </div>

      <div className="copy" key={`c${i}`}>
        <h2>{s.name}</h2>
        <p>{s.note}</p>
        <a className="btn" href="#bestsellers">Shop now</a>
      </div>

      <div className="controls">
        <button onClick={() => go(i - 1)} aria-label="Previous scent">‹</button>
        {scents.map((x, n) => (
          <button key={x.name} className={n === i ? "dot on" : "dot"} onClick={() => go(n)} aria-label={x.name} />
        ))}
        <button onClick={() => go(i + 1)} aria-label="Next scent">›</button>
      </div>
    </section>
  );
}
