'use client';

import React from 'react';
import { categoryAffiliateLinks } from '@/lib/constants'; // Import affiliate links

interface SectionCTAProps {
  cityName: string;
  categoryName: string; // Added categoryName
  categorySlug: string;
}

export function SectionCTA({ cityName, categoryName, categorySlug }: SectionCTAProps) {
  const affiliateUrl = categorySlug ? categoryAffiliateLinks[categorySlug] : undefined;

  if (!affiliateUrl) {
    return null; // Don't render if no link for the category
  }

  // Optimized Text for Conversion
  const mainText = `🔥 Incontri ${categoryName} a ${cityName}? Profili Verificati 18+`;
  const buttonText = "VEDI ORA! 👀";

  return (
    <a 
      href={affiliateUrl}
      target="_blank"
      rel="noopener noreferrer sponsored"
      className="not-prose fixed bottom-0 left-0 right-0 z-50 p-4 text-center bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white shadow-[0_-4px_15px_-5px_rgba(0,0,0,0.2)] transition-colors duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-pink-300"
    >
      <p className="text-base sm:text-lg md:text-xl font-bold mb-2 drop-shadow-sm">
        {mainText}
      </p>
      <span 
        className="inline-block bg-yellow-300 hover:bg-yellow-400 text-gray-900 font-extrabold text-lg sm:text-xl py-2 px-6 rounded-md shadow-md pointer-events-none transition-colors duration-200"
      >
        {buttonText}
      </span>
    </a>
  );
} 