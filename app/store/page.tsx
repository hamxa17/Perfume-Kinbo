
import { Suspense } from "react";
import StoreCatalog from "../../components/StoreCatalog";

export default function StorePage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen w-full bg-[#FFFEFC] px-6 py-16 text-center">
          <p className="font-serif text-3xl">Fragrances</p>
          <p className="mt-4 text-sm text-[#81796F]">
            Preparing your collection...
          </p>
        </main>
      }
    >
      <StoreCatalog />
    </Suspense>
  );
}
