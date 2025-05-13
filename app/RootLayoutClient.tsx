'use client';

import { Geist, Geist_Mono } from "next/font/google";
import { Logo } from '@/components/common/logo';
import Link from 'next/link';
import { MessagesSquare } from 'lucide-react';
import { SiteHeaderCtas } from '@/components/common/SiteHeaderCtas';
import { useState, useEffect } from 'react';

// Font definitions moved here
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const HEADER_HEIGHT_THRESHOLD = 64; // Approx height of the header (h-16 = 4rem = 64px)

export function RootLayoutClient({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    function controlHeader() {
      if (typeof window !== 'undefined') {
        if (window.scrollY > lastScrollY && window.scrollY > HEADER_HEIGHT_THRESHOLD) {
          // Scrolling Down
          setIsHeaderVisible(false);
        } else {
          // Scrolling Up or at the top
          setIsHeaderVisible(true);
        }
        setLastScrollY(window.scrollY);
      }
    }

    window.addEventListener('scroll', controlHeader);
    return () => {
      window.removeEventListener('scroll', controlHeader);
    };
  }, [lastScrollY]);

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen`}
      >
        <SiteHeaderCtas />
        <header 
          className={`w-full border-b border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm sticky z-50 top-[3.25rem] sm:top-[2.5rem] md:top-[4.25rem] transition-transform duration-300 ease-in-out ${isHeaderVisible ? 'translate-y-0' : '-translate-y-full'}`}
        >
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