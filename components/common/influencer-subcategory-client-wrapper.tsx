'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { PlayCircle, X, MousePointerClick } from 'lucide-react';
import { InfluencerSeoText } from '@/components/common/influencer-seo-text';
import { InfluencerFaqSection } from '@/components/common/influencer-faq-section';
import { REGISTRATION_OPTIONS, categoryAffiliateLinks, type AffiliateCategory } from '@/lib/constants';

// Type definitions (can be moved to a central types file later)
interface NavButtonProps {
  href: string;
  label: string;
  emoji?: string;
  iconSrc?: string;
  isActive: boolean;
}

interface Influencer {
  slug: string;
  name: string;
  // Add other influencer properties if used directly in this component
}

interface RegistrationOption {
  key: string; // Corresponds to AffiliateCategory which is keyof typeof categoryAffiliateLinks
  label: string;
  imageSrc: string;
  spicyText: string;
  buttonText: string;
  onlineMembersMin: number; // Added for online count
  onlineMembersMax: number; // Added for online count
}

interface TeaserImage {
  src: string;
  alt: string;
  title: string;
  subtitle: string;
}

interface InfluencerSubcategoryClientWrapperProps {
  influencer: Influencer;
  currentSubcategory: string;
  subcategoryTitleCase: string;
  navButtons: NavButtonProps[];
  teaserImages: TeaserImage[];
}

export function InfluencerSubcategoryClientWrapper({
  influencer,
  currentSubcategory,
  subcategoryTitleCase,
  navButtons,
  teaserImages,
}: InfluencerSubcategoryClientWrapperProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [onlineCounts, setOnlineCounts] = useState<Record<string, number>>({});

  // Helper function for deterministic random number
  function getDeterministicRandomNumber(min: number, max: number, seed: string): number {
    let hash = 0;
    for (let i = 0; i < seed.length; i++) {
      const char = seed.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash |= 0; // Convert to 32bit integer
    }
    const random = Math.abs(hash);
    return min + (random % (max - min + 1));
  }

  useEffect(() => {
    const initialCounts: Record<string, number> = {};
    REGISTRATION_OPTIONS.forEach(option => {
      initialCounts[option.key] = getDeterministicRandomNumber(
        option.onlineMembersMin,
        option.onlineMembersMax,
        option.key + "-initial"
      );
    });
    setOnlineCounts(initialCounts);
  }, []); // Runs once on mount

  useEffect(() => {
    const intervalId = setInterval(() => {
      setOnlineCounts(prevCounts => {
        const newCounts = { ...prevCounts };
        REGISTRATION_OPTIONS.forEach(option => {
          const currentCount = prevCounts[option.key] || getDeterministicRandomNumber(option.onlineMembersMin, option.onlineMembersMax, option.key + "-fallback");
          // Fluctuate by ~2% of range, skew towards positive during peak conceptual times if desired, or just random walk
          const range = option.onlineMembersMax - option.onlineMembersMin;
          let fluctuation = Math.floor(Math.random() * (range * 0.05)) - Math.floor(range * 0.025); // Max 5% change, can decrease
          fluctuation = Math.random() < 0.6 ? Math.abs(fluctuation) : -Math.abs(fluctuation); // 60% chance to increase

          let newCount = currentCount + fluctuation;
          
          const absoluteMin = Math.max(20, Math.floor(option.onlineMembersMin * 0.75));
          const absoluteMax = Math.floor(option.onlineMembersMax * 1.25);
          
          newCount = Math.max(absoluteMin, Math.min(newCount, absoluteMax));
          newCounts[option.key] = Math.floor(newCount);
        });
        return newCounts;
      });
    }, 3500); // Update every 3.5 seconds

    return () => clearInterval(intervalId); // Cleanup on unmount
  }, []); // Runs once on mount to set up interval

  const renderRegistrationButton = (option: RegistrationOption, sectionSeedSuffix: string) => {
    const count = onlineCounts[option.key] || getDeterministicRandomNumber(option.onlineMembersMin, option.onlineMembersMax, option.key + sectionSeedSuffix + "-render");
    return (
      <div key={option.key + sectionSeedSuffix} className="group bg-white/10 dark:bg-black/20 p-1 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
        <a href={categoryAffiliateLinks[option.key as AffiliateCategory]} target="_blank" rel="noopener noreferrer sponsored" className="relative block w-full aspect-square rounded-md overflow-hidden shadow-sm transition-transform duration-300 group-hover:scale-105 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:ring-opacity-75">
          <Image src={option.imageSrc} alt={option.label} layout="fill" className="object-cover z-0" priority={sectionSeedSuffix.includes('onpage')} />
          
          {/* Online Users Pill (Top Right) */}
          <div className="absolute top-1.5 right-1.5 sm:top-2 sm:right-2 flex items-center bg-green-600/90 text-white text-[10px] sm:text-xs font-bold px-2 py-1 rounded-full shadow-lg z-20 backdrop-blur-sm">
            <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-lime-300 rounded-full mr-1 sm:mr-1.5 animate-pulse"></div>
            <span>{count}</span>
            <span className="ml-1 opacity-90">Online</span>
          </div>

          {/* Central "ENTRA 🔞" Button - Now with responsive sizing for desktop */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
            <div className="px-3 py-1.5 text-xs sm:px-5 sm:py-2.5 sm:text-base md:px-6 md:py-3 md:text-lg rounded-full bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold shadow-md group-hover:scale-110 group-hover:shadow-lg transition-all duration-300 whitespace-nowrap">
              ENTRA 🔞
            </div>
          </div>

          {/* Bottom Text Overlay - Refined icon sizing and alignment */}
          <div className="absolute inset-x-0 bottom-0 p-1.5 xs:p-2 bg-black/70 group-hover:bg-pink-600/80 z-10 transition-all duration-300 group-hover:-translate-y-1">
            <span className="block text-center text-[10px] xs:text-xs sm:text-sm md:text-base font-bold text-white transition-colors">
              <MousePointerClick size={14} className="inline-block align-middle mr-1 mb-px opacity-80 group-hover:opacity-100 group-hover:-translate-y-0.5 transition-transform duration-300" /> 
              {option.buttonText}
            </span>
          </div>
        </a>
      </div>
    );
  };

  return (
    <>
      {/* New Navigation Buttons Section */}
      <section className="mb-8">
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 md:gap-4">
          {navButtons.map((button) => (
            <Link
              key={button.label}
              href={button.href}
              className={`
                flex flex-col items-center justify-center
                p-2 sm:p-3 
                w-20 h-20 sm:w-24 sm:h-24
                rounded-lg sm:rounded-xl 
                shadow-md hover:shadow-lg 
                transition-all duration-200 ease-in-out 
                transform hover:scale-105 focus:outline-none 
                focus:ring-2 focus:ring-pink-500 focus:ring-opacity-75
                text-center
                ${button.isActive 
                  ? 'bg-pink-500 dark:bg-pink-600 ring-2 ring-pink-700 dark:ring-pink-400 scale-105 text-white' 
                  : 'bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200'}
              `}
              aria-label={button.label}
            >
              <div className="flex-shrink-0 mb-1 sm:mb-1.5">
                {button.iconSrc && (
                  <Image
                    src={button.iconSrc}
                    alt={`${button.label} icon`}
                    width={24}
                    height={24}
                    className={`${button.isActive ? 'filter brightness-0 invert' : ''}`}
                  />
                )}
                {button.emoji && (
                  <span className={`text-xl sm:text-2xl`}>{button.emoji}</span>
                )}
              </div>
              <span className="text-xs sm:text-sm font-medium leading-tight">
                {button.label === influencer.name ? "Profilo" : button.label}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Teaser Image Buttons */}
      <section id="teaser-videos" className="my-10 container mx-auto px-4">
        <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-800 dark:text-white mb-2">
          Anteprime Esclusive di {influencer.name}
        </h2>
        <p className="text-center text-gray-600 dark:text-gray-300 mb-6">
          Clicca su un video per sbloccare il contenuto {subcategoryTitleCase}! 🤫🌶️🔞
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          {teaserImages.map((teaser, index) => (
            <div 
              key={index} 
              onClick={() => setIsModalOpen(true)} 
              className="relative group rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 cursor-pointer aspect-video"
            >
              <Image
                src={teaser.src}
                alt={teaser.alt}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-110"
                sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                priority={index < 2}
              />
              <div className="absolute inset-0 bg-[rgba(0,0,0,0.3)] group-hover:bg-[rgba(0,0,0,0.5)] transition-all duration-300 flex flex-col items-center justify-center p-4">
                <PlayCircle size={64} className="text-white opacity-80 group-hover:opacity-100 mb-2 drop-shadow-lg" />
                <h3 className="text-white text-lg sm:text-xl font-bold text-center drop-shadow-md">{teaser.title}</h3>
                <p className="text-white text-sm sm:text-md text-center opacity-90 drop-shadow-sm">{teaser.subtitle}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* New Multi-Option Registration CTA / Paywall Section */}
      <section id="registration-cta" className="my-10 p-6 bg-gradient-to-br from-pink-500 to-purple-600 dark:from-pink-600 dark:to-purple-700 rounded-xl shadow-2xl text-white text-center scroll-mt-20">
        <div className="mb-4">
          <span role="img" aria-label="lock" className="text-5xl">🔑</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold mb-3">
          ACCESSO GRATIS IN 30 SEC! 🇮🇹
        </h2>
        <p className="text-md sm:text-lg mb-6 max-w-2xl mx-auto">
          Solo la tua email e sei dentro! 😉 Convalida rapida per sbloccare TUTTO. Contenuti XXX ti aspettano! 😈🔞
        </p>
        
        {/* Restored single grid for all 4 options */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-2 sm:gap-2.5 md:gap-3 mb-6">
          {REGISTRATION_OPTIONS.map(option => renderRegistrationButton(option, "-onpage"))}
        </div>
        
        <p className="text-xs text-pink-200 dark:text-purple-300 mt-6">
          Cliccando ti registri al nostro portale partner. La registrazione è sempre gratuita.
        </p>
      </section>

      {/* Registration Modal (layout for buttons remains as a single grid) */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-[100] p-4 backdrop-blur-sm">
          <div className="bg-gradient-to-br from-pink-600 to-purple-700 p-5 sm:p-8 rounded-xl shadow-2xl text-white w-full max-w-lg relative transform transition-all duration-300 ease-out scale-100 opacity-100">
            <button onClick={() => setIsModalOpen(false)} className="absolute top-3 right-3 sm:top-4 sm:right-4 text-white hover:text-gray-300 transition-colors p-1.5 rounded-full bg-black/30 hover:bg-black/50 z-[110]" aria-label="Chiudi modale registrazione"><X size={24} /></button>
            <div className="text-center mb-5 sm:mb-6">
                <span role="img" aria-label="lock" className="text-4xl sm:text-5xl">🔑</span>
                <h2 className="text-xl sm:text-2xl font-bold mt-2 mb-1">ACCESSO GRATIS IN 30 SEC! 🇮🇹</h2>
                <p className="text-sm sm:text-md text-pink-100 dark:text-purple-200 max-w-md mx-auto">Solo la tua email e sei dentro! 😉 Convalida rapida per sbloccare TUTTO. Contenuti XXX ti aspettano! 😈🔞</p>
            </div>
            <div className="grid grid-cols-2 gap-2 sm:gap-2.5">
              {REGISTRATION_OPTIONS.map(option => renderRegistrationButton(option, "-modal"))}
            </div>
            <p className="text-xs text-pink-200 dark:text-purple-300 mt-4 text-center">La registrazione è gratuita e ti dà accesso immediato.</p>
          </div>
        </div>
      )}

      {/* Main Content Area (Description & FAQ) */}
      <div className="mt-10 p-4 sm:p-6 bg-white dark:bg-gray-800 rounded-lg shadow-xl">
        <InfluencerSeoText 
          influencerSlug={influencer.slug}
          influencerName={influencer.name}
          subcategorySlug={currentSubcategory}
          subcategoryDisplayName={subcategoryTitleCase}
        />
        <InfluencerFaqSection 
          influencerSlug={influencer.slug}
          influencerName={influencer.name}
          subcategorySlug={currentSubcategory}
          subcategoryDisplayName={subcategoryTitleCase}
        />
      </div>
    </>
  );
} 