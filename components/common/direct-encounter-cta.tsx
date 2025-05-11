'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
    affiliateUrl: 'https://t.mbdaad.link/345641/7052?bo=2753,2754,2755,2756&popUnder=true&aff_sub5=SF_006OG000004lmDN',
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

interface DirectEncounterCTAProps {
  cityName?: string;
}

export function DirectEncounterCTA({ cityName }: DirectEncounterCTAProps) {
  const [step, setStep] = useState<'selection' | 'confirmation'>('selection');
  const [selectedAffiliateUrl, setSelectedAffiliateUrl] = useState<string | null>(null);

  function handleCategoryClick(url: string) {
    setSelectedAffiliateUrl(url);
    setStep('confirmation');
  }

  function handleConfirmation() {
    if (selectedAffiliateUrl) {
      window.location.href = selectedAffiliateUrl;
    } else {
      // Fallback or error, though this case should ideally not be reached if UI is correct
      console.error('No affiliate URL selected');
      // Optionally redirect to a generic page or show an error message
    }
  }

  const headingText = cityName 
    ? `Incontri gratuiti in tutta ${cityName}.` 
    : 'Incontri gratuiti in tutta Italia.';

  return (
    <section className="pt-0 pb-12 md:pb-16 bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 dark:from-pink-900/30 dark:via-purple-900/30 dark:to-blue-900/30">
      <div className="container mx-auto px-4 text-center">
        {step === 'selection' && (
          <>
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
            <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 md:gap-6 max-w-2xl md:max-w-3xl lg:max-w-4xl xl:max-w-6xl mx-auto">
              {encounterButtons.map((buttonInfo) => (
                <div
                  key={buttonInfo.id}
                  onClick={() => handleCategoryClick(buttonInfo.affiliateUrl)}
                  className="p-3 h-24 sm:p-4 sm:h-28 flex flex-col items-center justify-center rounded-lg 
                             border-2 border-purple-400 dark:border-purple-500 
                             hover:shadow-xl hover:border-purple-600 dark:hover:border-purple-400
                             transition-all duration-200 ease-in-out cursor-pointer group transform hover:-translate-y-1 
                             bg-purple-500 hover:bg-purple-600 dark:bg-purple-600 dark:hover:bg-purple-700 text-center"
                >
                  <span className="block text-sm sm:text-base md:text-lg font-bold text-white group-hover:text-purple-100 transition-colors duration-300">
                    {buttonInfo.label}
                  </span>
                  <span className="block text-[0.7rem] sm:text-xs text-purple-100 group-hover:text-white transition-colors duration-300 mt-0.5 sm:mt-1 ">
                    Accesso Gratuito in 1 Min!
                  </span>
                </div>
              ))}
            </div>
          </>
        )}

        {step === 'confirmation' && (
          <Card className="max-w-md mx-auto shadow-xl bg-white dark:bg-gray-800">
            <CardHeader>
              <CardTitle className="text-3xl font-bold text-purple-600 dark:text-purple-300">Accesso Gratuito!</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
                È gratuito e devi solo inserire la tua email!
              </p>
              <Button
                onClick={handleConfirmation}
                size="lg"
                className="w-full py-4 text-xl bg-green-500 hover:bg-green-600 text-white dark:bg-green-600 dark:hover:bg-green-700 transition-all duration-300 ease-in-out transform hover:scale-105"
              >
                Sì, Continua!
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </section>
  );
} 