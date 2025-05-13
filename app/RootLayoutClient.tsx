'use client';

import { Geist, Geist_Mono } from "next/font/google";
import { Logo } from '@/components/common/logo';
import Link from 'next/link';
import { MessagesSquare } from 'lucide-react';
import { SiteHeaderCtas } from '@/components/common/SiteHeaderCtas';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { getCategoryBySlug } from '@/lib/utils/category-utils';
import { rootLayoutStrings } from '@/app/translations';

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

// Helper function to capitalize city slugs for display (simple version)
function capitalizeSlug(slug: string): string {
  if (!slug) return '';
  return slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export function RootLayoutClient({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const params = useParams();

  const [cityName, setCityName] = useState<string | null>(null);
  const [categoryName, setCategoryName] = useState<string | null>(null);
  const [chatButtonText, setChatButtonText] = useState(rootLayoutStrings.chatLiveText);

  useEffect(() => {
    if (params.citySlug && typeof params.citySlug === 'string') {
      setCityName(capitalizeSlug(params.citySlug as string));
    } else {
      setCityName(null);
    }
  }, [params.citySlug]);

  useEffect(() => {
    async function fetchCategoryName() {
      if (params.categorySlug && typeof params.categorySlug === 'string') {
        const category = getCategoryBySlug(params.categorySlug as string);
        setCategoryName(category ? category.name : null);
      } else {
        setCategoryName(null);
      }
    }
    fetchCategoryName();
  }, [params.categorySlug]);

  useEffect(() => {
    if (cityName && categoryName) {
      setChatButtonText(rootLayoutStrings.chatLiveInCategoryInCity(categoryName, cityName));
    } else if (cityName) {
      setChatButtonText(rootLayoutStrings.chatLiveInCity(cityName));
    } else {
      setChatButtonText(rootLayoutStrings.chatLiveText);
    }
  }, [cityName, categoryName]);

  useEffect(() => {
    function controlHeader() {
      if (typeof window !== 'undefined') {
        if (window.scrollY > lastScrollY && window.scrollY > HEADER_HEIGHT_THRESHOLD) {
          setIsHeaderVisible(false);
        } else {
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen relative`}
      >
        <SiteHeaderCtas />
        <header 
          className={`w-full border-b border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm sticky z-50 top-[3.25rem] sm:top-[2.5rem] md:top-[4.25rem] transition-transform duration-300 ease-in-out ${isHeaderVisible ? 'translate-y-0' : '-translate-y-full'}`}
        >
          <div className="container mx-auto flex justify-between items-center h-16 px-4">
            <Logo />
            <nav>
              <ul className="flex items-center space-x-6">
                {/* CHAT LIVE BUTTON REMOVED FROM HERE */}
              </ul>
            </nav>
          </div>
        </header>
        <main className="flex-grow">
          {children}
        </main>

        {/* Floating Chat Button Added Here */}
        <Link 
          href="/chat" 
          className="fixed top-[4.75rem] sm:top-[4rem] md:top-[5.75rem] right-6 group flex items-center px-4 py-3 text-base font-semibold text-white 
                     bg-pink-600 hover:bg-pink-700 
                     rounded-full shadow-lg hover:shadow-xl 
                     transition-all duration-300 ease-in-out 
                     z-[100] transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-opacity-50"
          aria-label={chatButtonText} // For accessibility
        >
          <MessagesSquare size={22} className="mr-2 group-hover:animate-pulse" />
          <span>{chatButtonText}</span>
          {/* Pulsating dot for "live" effect - adjusted position slightly if needed */}
          <span className="absolute top-1 right-1 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-300 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-red-400"></span>
          </span>
        </Link>
      </body>
    </html>
  );
} 