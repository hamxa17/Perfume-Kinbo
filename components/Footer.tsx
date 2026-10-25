import Link from "next/link";
import Dapple from "./Dapple";

export default function Footer() {
  return (
    <footer className="scene scene-stone arc foot">
      <Dapple soft />
      <div className="foot-links caps">
        <div>
          <p className="foot-h">Shop</p>
          <Link href="/store">All fragrances</Link>
          <Link href="/#collections">Collections</Link>
        </div>
        <div>
          <p className="foot-h">Talk to us</p>
          <a href="https://wa.me/">WhatsApp</a>
          <a href="https://www.instagram.com/">Instagram</a>
        </div>
      </div>
      <p className="foot-mark" aria-hidden="true">Kinbo</p>
      <p className="fine">
        © 2026 Kinbo. Brand names and bottle designs belong to their owners and
        appear here for illustration.
      </p>
    </footer>
  );
}
