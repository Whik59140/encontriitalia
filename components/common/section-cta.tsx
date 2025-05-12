'use client';

import React from 'react';
import Image from 'next/image';

// Import the same button data as the main CTA
interface EncounterButton {
  id: string;
  label: string;
  imageSrc: string;
  affiliateUrl: string;
}

const encounterButtons: EncounterButton[] = [
  {
    id: 'gay',
    label: 'Incontri Gay 18+',
    imageSrc: '/buttons/gays.webp',
    affiliateUrl: 'https://t.mbdaad.link/345641/6488?bo=2753,2754,2755,2756&popUnder=true&aff_sub5=SF_006OG000004lmDN',
  },
  {
    id: 'donne',
    label: 'Incontri Donne 25+',
    imageSrc: '/buttons/donne.webp',
    affiliateUrl: 'https://t.mbdaad.link/345641/6167?bo=2753,2754,2755,2756&popUnder=true&aff_sub5=SF_006OG000004lmDN',
  },
  {
    id: 'trans',
    label: 'Incontri Trans 18+',
    imageSrc: '/buttons/trans.webp',
    affiliateUrl: 'https://t.mbdaad.link/345641/7052?bo=2753,2754,2755,2756&popUnder=true&aff_sub5=SF_006OG000004lmDN',
  },
  {
    id: 'trav',
    label: 'Incontri Trav 18+',
    imageSrc: '/buttons/trans.webp', // Reusing trans image for now
    affiliateUrl: 'https://t.mbdaad.link/345641/7052?bo=2753,2754,2755,2756&popUnder=true&aff_sub5=SF_006OG000004lmDN', // Same as trans
  },
  {
    id: 'milf',
    label: 'Incontri MILF 40+',
    imageSrc: '/buttons/milf.webp',
    affiliateUrl: 'https://t.mbdaad.link/345641/4999?bo=2753,2754,2755,2756&popUnder=true&aff_sub5=SF_006OG000004lmDN',
  },
  {
    id: 'ragazze',
    label: 'Incontri Ragazze 18+',
    imageSrc: '/buttons/ragazze.webp',
    affiliateUrl: 'https://t.mbdaad.link/345641/6167?bo=2753,2754,2755,2756&popUnder=true&aff_sub5=SF_006OG000004lmDN',
  },
  {
    id: 'studentesse',
    label: 'Incontri Studentesse 18+',
    imageSrc: '/buttons/studentessa.webp',
    affiliateUrl: 'https://t.mbdaad.link/345641/7533?bo=2753,2754,2755,2756&popUnder=true&aff_sub5=SF_006OG000004lmDN',
  },
];

// Helper for Emojis
const categoryEmojis: { [key: string]: string } = {
  gay: '🏳️‍🌈',
  donne: '💃',
  trans: '⚧️',
  trav: '👗',
  milf: '💋',
  ragazze: '✨',
  studentesse: '🎓',
};

interface SectionCTAProps {
  cityName: string;
  categorySlug?: string;
}

/**
 * SectionCTA component - A smaller CTA designed to be displayed between article sections
 */
export function SectionCTA({ cityName, categorySlug = 'gay' }: SectionCTAProps) {
  // Find the default button for the current category, or fallback to first button
  const findButtonForCategory = () => {
    const button = encounterButtons.find(b => b.id === categorySlug.toLowerCase());
    return button || encounterButtons[0];
  };
  
  const currentCategoryButton = findButtonForCategory();
  
  const handleClick = () => {
    window.open(currentCategoryButton.affiliateUrl, '_blank');
  };

  return (
    <div 
      className="my-8 py-4 px-4 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer"
      onClick={handleClick}
    >
      <div className="flex flex-col sm:flex-row items-center gap-4">
        {/* Image Container */}
        <div className="relative w-full sm:w-1/3 h-32 sm:h-36 rounded-lg overflow-hidden">
          <Image
            src={currentCategoryButton.imageSrc}
            alt={currentCategoryButton.label}
            layout="fill"
            objectFit="cover"
            className="absolute inset-0"
          />
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <span className="text-xl sm:text-2xl text-white font-bold">
              {categoryEmojis[currentCategoryButton.id.toLowerCase()] || '➡️'} {currentCategoryButton.label}
            </span>
          </div>
        </div>
        
        {/* Text & Button Container */}
        <div className="w-full sm:w-2/3 flex flex-col items-center sm:items-start gap-4">
          <h3 className="text-lg sm:text-xl font-semibold text-gray-800 dark:text-white text-center sm:text-left">
            Vorresti incontrare {currentCategoryButton.label.replace('Incontri ', '')} a {cityName} stasera?
          </h3>
          
          <p className="text-sm text-gray-600 dark:text-gray-300 text-center sm:text-left">
            Accedi gratuito a profili verificati di {currentCategoryButton.label.replace('Incontri ', '')} a {cityName} disponibili per incontri immediati
          </p>
          
          <button 
            className="px-6 py-2.5 bg-pink-600 hover:bg-pink-700 text-white font-semibold rounded-lg shadow-md 
                       hover:shadow-lg transition-all duration-200 transform hover:-translate-y-0.5 pointer-events-none"
          >
            Scopri Ora ⟶
          </button>
        </div>
      </div>
    </div>
  );
} 