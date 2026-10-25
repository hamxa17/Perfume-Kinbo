// Soft leaf shadows that drift slowly across a scene, like light through a tree.
// Pure SVG + CSS, no JavaScript. The shapes are generated from a fixed seed so
// the server and the browser always agree on them.

function rng(seed: number) {
  return () => {
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// x, y, radius of each cluster of leaves, in a 100 x 100 space
const clusters: [number, number, number][] = [
  [9, 8, 17], [27, -3, 12], [46, 3, 8], [79, 2, 15], [97, 18, 13],
  [3, 46, 11], [93, 64, 10], [62, 104, 12], [13, 99, 12],
];

function makeLeaves(seed: number) {
  const r = rng(seed);
  const out: { d: string; o: number }[] = [];
  for (const [cx, cy, rad] of clusters) {
    const n = Math.round(7 + rad / 1.6);
    for (let i = 0; i < n; i++) {
      const a = r() * Math.PI * 2;
      const dist = Math.sqrt(r()) * rad;
      const x = cx + Math.cos(a) * dist;
      const y = cy + Math.sin(a) * dist;
      const rot = r() * 360;
      const s = 0.7 + r() * 1.0;
      out.push({
        d: `translate(${x.toFixed(2)} ${y.toFixed(2)}) rotate(${rot.toFixed(0)}) scale(${s.toFixed(2)})`,
        o: 0.45 + r() * 0.55,
      });
    }
  }
  return out;
}

const layerA = makeLeaves(7);
const layerB = makeLeaves(31);
const LEAF = "M0 0C3 -3.8 8 -3.8 11 0C8 3.8 3 3.8 0 0Z";

function Layer({ leaves, className }: { leaves: { d: string; o: number }[]; className: string }) {
  return (
    <div className={`dapple-layer ${className}`}>
      <svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        <g fill="#2a2f2c">
          {leaves.map((l, i) => (
            <path key={i} d={LEAF} transform={l.d} opacity={l.o} />
          ))}
        </g>
      </svg>
    </div>
  );
}

export default function Dapple({ soft = false }: { soft?: boolean }) {
  return (
    <div className={`dapple${soft ? " dapple-soft" : ""}`} aria-hidden="true">
      <Layer leaves={layerA} className="a" />
      <Layer leaves={layerB} className="b" />
    </div>
  );
}
