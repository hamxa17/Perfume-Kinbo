import Link from "next/link";
import { mockProducts } from "@/data/mockProducts";

export const metadata = { title: "Image credits — Kinbo" };

export default function Credits() {
  const items = mockProducts.filter((p) => p.credit);
  return (
    <main className="credits">
      <Link href="/" className="caps">← Kinbo</Link>
      <h1 style={{ marginTop: "1.5rem" }}>Image credits</h1>
      <p style={{ marginBottom: "2rem", opacity: 0.7 }}>
        Photos are from Wikimedia Commons and used under their licences. Brand
        names and bottle designs belong to their owners.
      </p>
      <ul>
        {items.map((p) => (
          <li key={p.id}>
            <p className="swash" style={{ fontSize: "1.4rem" }}>{p.brand} {p.name}</p>
            <p>
              “{p.credit!.title}” by {p.credit!.author},{" "}
              {p.credit!.licenseUrl ? <a href={p.credit!.licenseUrl}>{p.credit!.license}</a> : p.credit!.license}.{" "}
              <a href={p.credit!.source}>Source</a>
              {p.credit!.changes ? `. Changes: ${p.credit!.changes}` : ""}
            </p>
          </li>
        ))}
      </ul>
    </main>
  );
}
