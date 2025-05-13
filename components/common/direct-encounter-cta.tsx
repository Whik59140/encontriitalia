'use client';

import { useState } from 'react';
import Image from 'next/image';
import { InterstitialModal } from './interstitial-modal';
// useRouter is not needed as we are using window.location.href for external links

interface EncounterButton {
  id: string;
  label: string;
  imageSrc: string;
  affiliateUrl: string; // Added affiliateUrl
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
    affiliateUrl: 'https://t.mbdaad.link/345641/6497?bo=2753,2754,2755,2756&popUnder=true&aff_sub5=SF_006OG000004lmDN',
  },
  {
    id: 'trav',
    label: 'Incontri Trav 18+',
    imageSrc: '/buttons/trans.webp', // Reusing trans image for now
    affiliateUrl: 'https://t.mbdaad.link/345641/6497?bo=2753,2754,2755,2756&popUnder=true&aff_sub5=SF_006OG000004lmDN', // Updated Trav link (same as Trans for now)
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

// Map for category display names in confirmation
const categoryDisplayNames: { [key: string]: string } = {
  gay: 'Gay',
  donne: 'Donne',
  trans: 'Trans',
  trav: 'Trav',
  milf: 'MILF',
  ragazze: 'Ragazze',
  studentesse: 'Studentesse',
};

// SVG Icon Component
function ClickIcon({ className }: { className?: string }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      enable-background="new 0 0 100 100" 
      viewBox="0 0 100 100" 
      className={className}
      fill="currentColor" // Added fill currentColor to inherit text color
    >
      <path d="M91.41,78.68L77.26,64.54l8.49-8.49c0.48-0.48,0.68-1.17,0.54-1.84c-0.15-0.66-0.62-1.21-1.26-1.45L37.66,35.08c-0.74-0.27-1.56-0.09-2.12,0.46c-0.55,0.56-0.73,1.38-0.46,2.12l17.68,47.37c0.24,0.64,0.79,1.11,1.45,1.26c0.66,0.15,1.36-0.06,1.84-0.54l8.49-8.49l14.14,14.15c0.39,0.39,0.9,0.58,1.41,0.58c0.51,0,1.03-0.19,1.42-0.58l9.9-9.9C92.19,80.72,92.19,79.46,91.41,78.68z M80.09,87.16L65.95,73.02c-0.38-0.37-0.88-0.59-1.41-0.59c-0.54,0-1.04,0.22-1.42,0.59l-7.7,7.7L40.36,40.36l40.36,15.06l-7.7,7.7c-0.37,0.38-0.59,0.88-0.59,1.42c0,0.53,0.22,1.03,0.59,1.41l14.14,14.14L80.09,87.16z M36,24V10c0-1.1,0.9-2,2-2s2,0.9,2,2v14c0,1.1-0.9,2-2,2S36,25.1,36,24z M24,40H10c-1.1,0-2-0.9-2-2s0.9-2,2-2h14c1.1,0,2,0.9,2,2S25.1,40,24,40z M46.49,29.51c-0.78-0.78-0.78-2.05,0-2.83l9.9-9.9c0.78-0.78,2.05-0.78,2.83,0c0.78,0.78,0.78,2.05,0,2.83l-9.9,9.9c-0.39,0.39-0.9,0.59-1.41,0.59S46.88,29.91,46.49,29.51z M29.51,46.49c0.78,0.78,0.78,2.05,0,2.83l-9.9,9.9c-0.39,0.39-0.9,0.59-1.41,0.59s-1.02-0.2-1.41-0.59c-0.78-0.78-0.78-2.05,0-2.83l9.9-9.9C27.47,45.7,28.73,45.7,29.51,46.49z M29.51,26.69c0.78,0.78,0.78,2.05,0,2.83c-0.39,0.39-0.9,0.59-1.41,0.59s-1.02-0.2-1.41-0.59l-9.9-9.9c-0.78-0.78-0.78-2.05,0-2.83c0.78-0.78,2.05-0.78,2.83,0L29.51,26.69z"/>
    </svg>
  );
}

interface DirectEncounterCTAProps {
  cityName?: string;
}

export function DirectEncounterCTA({ cityName }: DirectEncounterCTAProps) {
  const [selectedButtonInfo, setSelectedButtonInfo] = useState<EncounterButton | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  function handleCategoryClick(buttonInfo: EncounterButton) {
    setSelectedButtonInfo(buttonInfo);
    setIsModalOpen(true);
  }

  function handleModalConfirm() {
    if (selectedButtonInfo?.affiliateUrl) {
      window.open(selectedButtonInfo.affiliateUrl, '_blank', 'noopener,noreferrer');
      setIsModalOpen(false);
    } else {
      console.error('No affiliate URL selected or button info missing');
      setIsModalOpen(false);
    }
  }

  function handleModalClose() {
    setIsModalOpen(false);
  }

  const headingText = cityName 
    ? `Incontri gratuiti in tutta ${cityName}.` 
    : 'Incontri gratuiti in tutta Italia.';

  return (
    <>
      <section className="pt-0 pb-12 md:pb-16 bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 dark:from-pink-900/30 dark:via-purple-900/30 dark:to-blue-900/30">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 text-gray-800 dark:text-white">
            {headingText}
          </h2>
          <div className="flex flex-wrap justify-center items-center gap-x-4 gap-y-2 sm:gap-x-6 mb-8 text-sm sm:text-base text-gray-700 dark:text-gray-300">
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 mr-1.5 text-green-500">
                <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z" clipRule="evenodd" />
              </svg>
              <span>Profili Verificati</span>
            </div>
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 mr-1.5 text-purple-500">
                <path d="M10 2a.75.75 0 0 1 .75.75v1.5h3.75a.75.75 0 0 1 0 1.5H10.75V15a.75.75 0 0 1-1.5 0V5.75H5.5a.75.75 0 0 1 0-1.5h3.75V2.75A.75.75 0 0 1 10 2Z" />
                <path fillRule="evenodd" d="M6.685 2.101A6.25 6.25 0 0 1 10 1.5c1.047 0 2.032.261 2.89.717a.75.75 0 0 1-.503 1.393 4.753 4.753 0 0 0-4.774 0 .75.75 0 0 1-.503-1.393ZM10 5.225c2.843 0 5.225 2.076 5.225 4.665 0 2.087-1.46 3.84-3.445 4.449a.75.75 0 0 1-.616-1.377A3.253 3.253 0 0 0 13.5 9.89c0-1.9-1.44-3.415-3.5-3.415s-3.5 1.515-3.5 3.415a3.253 3.253 0 0 0 2.336 3.126.75.75 0 0 1-.617 1.377C6.235 13.734 4.775 11.977 4.775 9.89 4.775 7.301 7.157 5.225 10 5.225Z" clipRule="evenodd" /> 
              </svg>
               {/* Using a simple gift-like icon; a better one might be specific 'free' badge icon */}
              <span>Accesso Gratuito</span>
            </div>
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 mr-1.5 text-blue-500">
                <path d="M3 4a2 2 0 0 0-2 2v1.161l8.441 4.221a1.25 1.25 0 0 0 1.118 0L19 7.162V6a2 2 0 0 0-2-2H3Z" />
                <path d="M19 8.839 10.772 13.1a2.75 2.75 0 0 1-2.544 0L1 8.839V14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V8.839Z" />
              </svg>
              <span>Solo la tua Email</span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 md:gap-5 max-w-2xl md:max-w-4xl lg:max-w-6xl xl:max-w-screen-xl mx-auto">
            {encounterButtons.map((buttonInfo) => (
              <div
                key={buttonInfo.id}
                onClick={() => handleCategoryClick(buttonInfo)}
                className="relative overflow-hidden rounded-xl shadow-lg border-2 border-purple-400 dark:border-purple-500 
                           hover:shadow-2xl hover:border-purple-300 dark:hover:border-purple-400 
                           transition-all duration-300 ease-in-out cursor-pointer group transform hover:-translate-y-1.5 
                           bg-gray-700 h-36 sm:h-40 md:h-44" // Adjusted height and rounded-xl
              >
                <Image
                  src={buttonInfo.imageSrc}
                  alt={buttonInfo.label}
                  layout="fill"
                  objectFit="cover"
                  className="absolute inset-0 transition-transform duration-300 ease-in-out group-hover:scale-105" // slightly less scale
                />
                <div // Overlay for all content
                  className="absolute inset-0 bg-black/50 group-hover:bg-black/40 transition-colors duration-300 
                             flex flex-col justify-around items-center text-center p-2 sm:p-2.5 z-10" // justify-around, reduced padding slightly
                >
                  {/* Top content: Category name + Emoji */}
                  <div className="text-white text-base sm:text-lg md:text-xl font-bold group-hover:text-yellow-300 transition-colors duration-300 leading-tight px-1">
                    {categoryEmojis[buttonInfo.id] || '➡️'} {buttonInfo.label}
                  </div>

                  {/* Middle content: "Clicca" button with SVG icon */}
                  <div className="inline-flex items-center justify-center bg-yellow-400 hover:bg-yellow-500 text-gray-900 
                                 py-2 px-3 sm:py-2 sm:px-4 rounded-lg shadow-lg 
                                 group-hover:scale-110 transform transition-all duration-200 ease-in-out" // more prominent scale
                  >
                    <span className="text-sm sm:text-base font-semibold">Clicca</span>
                    <ClickIcon className="w-4 h-4 sm:w-5 sm:h-5 ml-1.5 sm:ml-2 text-gray-900 group-hover:animate-ping" />
                  </div>

                  {/* Bottom content: Sub-text */}
                  <div className="text-xs sm:text-sm text-gray-100 group-hover:text-yellow-200 transition-colors duration-300 font-medium px-1">
                    {cityName ? `Profili Verificati da ${cityName} ✅` : 'Profili Verificati ✅'}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {selectedButtonInfo && (
        <InterstitialModal
          isOpen={isModalOpen}
          onClose={handleModalClose}
          onConfirm={handleModalConfirm}
          categoryName={categoryDisplayNames[selectedButtonInfo.id] || selectedButtonInfo.label} 
          cityName={cityName || 'Italia'}
        />
      )}
    </>
  );
} 