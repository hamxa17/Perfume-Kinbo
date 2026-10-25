import { Suspense } from "react";
import StoreCatalog from "../../components/StoreCatalog";

export default function StorePage() {
  return (
    <Suspense fallback={<main className="store-hero"><h1>Fragrances</h1></main>}>
      <StoreCatalog />
    </Suspense>
  );
}
