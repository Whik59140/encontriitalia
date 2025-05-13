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
  const [chatButtonText, setChatButtonText] = useState<string | { line1: string; line2: string }>(rootLayoutStrings.chatLiveText);
  const [chatButtonAriaLabel, setChatButtonAriaLabel] = useState(rootLayoutStrings.chatLiveText);

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
      setChatButtonText({
        line1: rootLayoutStrings.chatLiveInCategoryInCity(categoryName, cityName).split(cityName)[0].trim(),
        line2: cityName
      });
      setChatButtonAriaLabel(rootLayoutStrings.chatLiveInCategoryInCity(categoryName, cityName));
    } else if (cityName) {
      setChatButtonText(rootLayoutStrings.chatLiveInCity(cityName));
      setChatButtonAriaLabel(rootLayoutStrings.chatLiveInCity(cityName));
    } else {
      setChatButtonText(rootLayoutStrings.chatLiveText);
      setChatButtonAriaLabel(rootLayoutStrings.chatLiveText);
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
          className="fixed top-[4.75rem] sm:top-[4rem] md:top-[5.75rem] right-4 sm:right-6 group 
                     flex flex-col items-center text-center sm:flex-row sm:text-left 
                     px-3 py-2 sm:px-4 sm:py-3 
                     text-xs sm:text-base font-semibold text-white  休憩/* Mobile text-xs, sm and up text-base */
                     bg-pink-600 hover:bg-pink-700 
                     rounded-lg sm:rounded-full shadow-lg hover:shadow-xl 
                     transition-all duration-300 ease-in-out 
                     z-[100] transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-opacity-50"
          aria-label={chatButtonAriaLabel}
        >
          {/* Icon size: 14 mobile, 20 sm+ */}
          <MessagesSquare size={14} className="sm:size-5 sm:mr-2" /> 
          <span className="mt-1 sm:mt-0 min-w-[60px] flex flex-col sm:flex-row items-center"> 
            {typeof chatButtonText === 'string' ? (
              <span className="leading-tight sm:leading-normal">{chatButtonText}</span>
            ) : (
              <>
                <span className="block leading-tight sm:leading-normal">{chatButtonText.line1}</span>
                <span className="block leading-tight sm:leading-normal sm:ml-1.5">{chatButtonText.line2}</span> 
              </>
            )}
          </span>
          {/* Pulsating dot for "live" effect - kept sm:h-3 sm:w-3 */}
          <span className="absolute top-1 right-1 flex h-2 w-2 sm:h-3 sm:w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-300 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-full w-full bg-red-400"></span>
          </span>
        </Link>
      </body>
    </html>
  );
} 