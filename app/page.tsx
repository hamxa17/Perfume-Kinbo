import Hero from "@/components/Hero";
import Shelf from "@/components/Shelf";
import Collections from "@/components/Collections";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Hero />
      <section className="scene scene-paper statement">
        <span className="caps">The idea</span>
        <p>
          Perfumes worth wearing, <span className="swash">chosen slowly</span> and
          delivered to your door.
        </p>
      </section>
      <Shelf />
      <Collections />
      <Footer />
    </main>
  );
}
