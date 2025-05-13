import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Logo } from '@/components/common/logo';
import Link from 'next/link';
import { MessagesSquare } from 'lucide-react';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Incontri Italia - Trova annunci e articoli nella tua città",
  description: "Esplora annunci e articoli per incontri in tutte le città italiane. Trova la tua categoria: gay, milf, donne, trans, escort e altro.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen`}
      >
        <header className="w-full border-b border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm sticky top-0 z-50">
          <div className="container mx-auto flex justify-between items-center h-16 px-4">
            <Logo />
            <nav>
              <ul className="flex items-center space-x-6">
                <li>
                  <Link 
                    href="/chat" 
                    className="relative group flex items-center px-3 py-2 text-sm font-semibold text-pink-600 hover:text-pink-700 dark:text-pink-400 dark:hover:text-pink-500 bg-pink-50 dark:bg-pink-900/30 hover:bg-pink-100 dark:hover:bg-pink-800/50 rounded-md transition-all duration-200 ease-in-out shadow-sm hover:shadow-md"
                  >
                    <MessagesSquare size={20} className="mr-2 group-hover:scale-110 transition-transform" />
                    <span className="group-hover:tracking-wide transition-all">Chat Live</span>
                    {/* Pulsating dot for "live" effect */}
                    <span className="absolute top-1.5 right-1.5 flex h-2.5 w-2.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500"></span>
                    </span>
                  </Link>
                </li>
                {/* Other navigation items can be added here */}
              </ul>
            </nav>
          </div>
        </header>
        <main className="flex-grow">
          {children}
        </main>
      </body>
    </html>
  );
}
