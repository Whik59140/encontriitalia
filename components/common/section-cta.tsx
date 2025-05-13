'use client';

import React from 'react';
import { categoryAffiliateLinks } from '@/lib/constants'; // Import affiliate links
import { sectionCtaStrings } from '@/app/translations'; // Import translations

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

  const mainText = sectionCtaStrings.mainTextTemplate(categoryName, cityName);
  const buttonText = sectionCtaStrings.buttonText;

  return (
    <a 
      href={affiliateUrl}
      target="_blank"
      rel="noopener noreferrer sponsored"
      className="not-prose fixed bottom-0 left-0 right-0 z-50 p-2 sm:p-3 md:p-4 flex items-center justify-center bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white shadow-[0_-4px_15px_-5px_rgba(0,0,0,0.2)] transition-colors duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-pink-300"
    >
      <div className="flex items-center w-full max-w-screen-md">
        <p className="text-sm sm:text-base md:text-lg font-bold drop-shadow-sm text-center flex-grow mr-2 sm:mr-3 md:mr-4">
        {mainText}
      </p>
      <span 
          className="inline-block flex-shrink-0 bg-yellow-300 hover:bg-yellow-400 text-gray-900 font-extrabold text-sm sm:text-base md:text-lg py-1 px-3 sm:py-2 sm:px-4 md:py-2 md:px-6 rounded-md shadow-md pointer-events-none transition-colors duration-200"
      >
        {buttonText}
      </span>
      </div>
    </a>
  );
} 