import type { Metadata } from "next";
import "./globals.css"; // Keep global styles import here
import { RootLayoutClient } from "./RootLayoutClient"; // We will create this next

export const metadata: Metadata = {
  title: "Incontri Italia - Trova annunci e articoli nella tua città",
  description: "Esplora annunci e articoli per incontri in tutte le città italiane. Trova la tua categoria: gay, milf, donne, trans, escort e altro.",
  icons: {
    icon: "data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🍑</text></svg>",
    apple: { url: '/apple-touch-icon.png', sizes: '180x180' },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <RootLayoutClient>{children}</RootLayoutClient>;
}
