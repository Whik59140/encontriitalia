import type { Metadata } from "next";
import "./globals.css"; // Keep global styles import here
import { RootLayoutClient } from "./RootLayoutClient"; // We will create this next

export const metadata: Metadata = {
  title: "Incontri Italia - Trova annunci e articoli nella tua città",
  description: "Esplora annunci e articoli per incontri in tutte le città italiane. Trova la tua categoria: gay, milf, donne, trans, escort e altro.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <RootLayoutClient>{children}</RootLayoutClient>;
}
