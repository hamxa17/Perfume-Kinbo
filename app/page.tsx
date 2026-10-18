import Hero from "@/components/Hero";

const bestsellers = [
  { name: "Amber Noor", notes: "Amber, oud, saffron", price: "4,999", tone: "#d98e32" },
  { name: "Monsoon", notes: "Petrichor, vetiver, jasmine", price: "4,499", tone: "#7fa39a" },
  { name: "Rajanigandha", notes: "Tuberose, musk, cedar", price: "4,999", tone: "#e9d9e6" },
  { name: "Velvet Hour", notes: "Plum, vanilla, leather", price: "5,499", tone: "#7a2e4d" },
  { name: "Kashful", notes: "Pampas grass, white tea", price: "3,999", tone: "#cfc3a6" },
  { name: "Dhaka Nights", notes: "Incense, rose, patchouli", price: "4,499", tone: "#3a2340" },
];

const collections = [
  { name: "Eau de Parfum", tone: "linear-gradient(160deg,#f2c9c0,#d98e32)" },
  { name: "Travel Minis", tone: "linear-gradient(160deg,#cdbfe0,#7a2e4d)" },
];

export default function Home() {
  return (
    <main>
      <header className="nav">
        <a href="/" className="logo">KINBO</a>
        <nav><a href="#bestsellers">Shop</a><a href="#collections">Collections</a><a href="#cart">Cart (0)</a></nav>
      </header>

      <Hero />

      <section id="bestsellers" className="section">
        <h2>Bestsellers</h2>
        <div className="rail">
          {bestsellers.map((p) => (
            <article key={p.name} className="card">
              <div className="card-img" style={{ background: p.tone }}>
                <div className="mini-bottle" />
              </div>
              <h3>{p.name}</h3>
              <p className="notes">{p.notes}</p>
              <p className="price">Tk {p.price} BDT</p>
              <button>Add to cart</button>
            </article>
          ))}
        </div>
      </section>

      <section id="collections" className="section">
        <h2>All collections</h2>
        <div className="collections">
          {collections.map((c) => (
            <a key={c.name} href="#" className="collection" style={{ background: c.tone }}>
              <span>{c.name}</span>
            </a>
          ))}
        </div>
      </section>

      <section className="promo">
        <h2>5% off your first order</h2>
        <p>For our Instagram community. Follow the page and DM us for the code.</p>
        <a className="btn" href="https://www.instagram.com/">Join the community</a>
      </section>

      <footer className="footer">
        <span className="logo">KINBO</span>
        <a href="https://wa.me/">Order on WhatsApp</a>
        <small>© 2026 KINBO</small>
      </footer>
    </main>
  );
}
