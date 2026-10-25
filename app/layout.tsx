import type { Metadata } from "next";
import { Bodoni_Moda, Instrument_Sans } from "next/font/google";
import "./globals.css";

const display = Bodoni_Moda({
  subsets: ["latin"],
  variable: "--font-display",
  style: ["normal", "italic"],
  weight: ["500", "700"],
});
const sans = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-sans-k",
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "Kinbo — Perfume",
  description: "Perfumes worth wearing, delivered across Bangladesh.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable}`}>
      <body>{children}</body>
    </html>
  );
}
