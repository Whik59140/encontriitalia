'use client';

import React from 'react';
import { Heart, Flame } from 'lucide-react'; // Using icons for visual appeal

interface TopArticleCTAProps {
  categoryName: string;
  cityName: string;
  affiliateUrl: string;
}

export function TopArticleCTA({ categoryName, cityName, affiliateUrl }: TopArticleCTAProps) {
  if (!affiliateUrl) return null; // Don't render if no link

  return (
    <div className="bg-gradient-to-r from-pink-50 to-rose-100 dark:from-gray-800 dark:to-gray-900 border-t border-b border-pink-200 dark:border-gray-700 p-4 sm:p-6 mb-6 sm:mb-8 shadow-sm">
      <div className="container mx-auto text-center">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-gray-100 mb-2">
          Cerchi Incontri {categoryName} a {cityName}? 🤔
        </h2>
        <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 mb-4 max-w-xl mx-auto">
          Registrazione <span className="font-semibold text-green-600 dark:text-green-400">Gratuita</span> ✅ con <span className="font-semibold">Profili Veri</span> ✅. <br className="hidden sm:inline"/>Conferma la tua email per iniziare subito!
        </p>

        <p className="text-base sm:text-lg font-semibold text-gray-700 dark:text-gray-200 mb-3">Cosa cerchi?</p>

        <div className="flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-4">
          {/* Serious Relationship Button */}
          <a
            href={affiliateUrl}
            target="_blank"
            rel="noopener noreferrer sponsored"
            className="flex items-center justify-center gap-2 w-full sm:w-auto bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-5 rounded-lg shadow-md transition-colors duration-200 ease-in-out"
          >
            <Heart size={20} />
            💍 Qualcosa di Serio
          </a>

          {/* Just Sex Button */}
          <a
            href={affiliateUrl}
            target="_blank"
            rel="noopener noreferrer sponsored"
            className="flex items-center justify-center gap-2 w-full sm:w-auto bg-rose-500 hover:bg-rose-600 text-white font-bold py-2 px-5 rounded-lg shadow-md transition-colors duration-200 ease-in-out"
          >
            <Flame size={20} />
            🔥 Solo Sesso
          </a>
        </div>
      </div>
    </div>
  );
} 