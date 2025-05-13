import type { Metadata } from "next";
import "./globals.css"; // Keep global styles import here
import { RootLayoutClient } from "./RootLayoutClient"; // We will create this next

export const metadata: Metadata = {
  title: "Incontri Italia - Trova annunci e articoli nella tua città",
  description: "Esplora annunci e articoli per incontri in tutte le città italiane. Trova la tua categoria: gay, milf, donne, trans, escort e altro.",
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icon.svg', type: 'image/svg+xml' },
      { url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: { url: '/apple-touch-icon.png', sizes: '180x180' },
    shortcut: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <RootLayoutClient>{children}</RootLayoutClient>;
}
