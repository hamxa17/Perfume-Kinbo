import type { Metadata } from "next";
import { Bodoni_Moda, Jost, DM_Mono } from "next/font/google";
import "./globals.css";

const display = Bodoni_Moda({ subsets: ["latin"], variable: "--font-display", style: ["normal", "italic"] });
const body = Jost({ subsets: ["latin"], variable: "--font-body" });
const mono = DM_Mono({ subsets: ["latin"], weight: "400", variable: "--font-mono-k" });

export const metadata: Metadata = {
  title: "Kinbo — Perfume",
  description: "Small-batch perfumes, delivered across Bangladesh.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${mono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
