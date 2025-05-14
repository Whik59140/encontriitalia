'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { PlayCircle, X } from 'lucide-react';
import { InfluencerSeoText } from '@/components/common/influencer-seo-text';
import { InfluencerFaqSection } from '@/components/common/influencer-faq-section';

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
  emoji: string;
  spicyText: string;
  buttonText: string;
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
  REGISTRATION_OPTIONS: RegistrationOption[];
  categoryAffiliateLinks: Record<string, string>;
  teaserImages: TeaserImage[];
}

export function InfluencerSubcategoryClientWrapper({
  influencer,
  currentSubcategory,
  subcategoryTitleCase,
  navButtons,
  REGISTRATION_OPTIONS,
  categoryAffiliateLinks,
  teaserImages,
}: InfluencerSubcategoryClientWrapperProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

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
          REGISTRATI GRATIS: Contenuti XXX Ti Aspettano! 🚀
        </h2>
        <p className="text-md sm:text-lg mb-6 max-w-2xl mx-auto">
          Vuoi vedere {influencer.name} in versione {subcategoryTitleCase} COMPLETAMENTE ESPLICITA e poter scopare GRATIS con Donne, Gay e Trans Italiani super CALDI? 🔥 Registrati ora! È veloce, gratuito e ti dà accesso a TUTTO! 🔞💦
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          {REGISTRATION_OPTIONS.map((option) => (
            <div key={option.key} className="bg-white/10 dark:bg-black/20 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col items-center text-center">
              <span className="text-3xl mb-2">{option.emoji}</span>
              <h3 className="text-lg font-semibold mb-1 text-white">{option.label}</h3>
              <p className="text-xs text-pink-200 dark:text-purple-300 mb-3 flex-grow">{option.spicyText}</p>
              <a
                href={categoryAffiliateLinks[option.key]}
                target="_blank"
                rel="noopener noreferrer sponsored"
                className="w-full mt-auto inline-block bg-white text-pink-600 font-bold text-sm px-6 py-2.5 rounded-md shadow-sm hover:bg-gray-100 transition-colors duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-pink-300 focus:ring-opacity-75"
              >
                {option.buttonText}
              </a>
            </div>
          ))}
        </div>
        <p className="text-xs text-pink-200 dark:text-purple-300">
          Cliccando ti registri al nostro portale partner. La registrazione è sempre gratuita.
        </p>
      </section>

      {/* Registration Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-[100] p-4 backdrop-blur-sm">
          <div className="bg-gradient-to-br from-pink-600 to-purple-700 p-5 sm:p-8 rounded-xl shadow-2xl text-white w-full max-w-2xl relative transform transition-all duration-300 ease-out scale-100 opacity-100">
            <button 
              onClick={() => setIsModalOpen(false)} 
              className="absolute top-3 right-3 sm:top-4 sm:right-4 text-white hover:text-gray-300 transition-colors p-1 rounded-full bg-white/10 hover:bg-white/20"
              aria-label="Chiudi modale registrazione"
            >
              <X size={24} />
            </button>
            <div className="text-center mb-5 sm:mb-6">
              <span role="img" aria-label="lock" className="text-4xl sm:text-5xl">🔑</span>
              <h2 className="text-xl sm:text-2xl font-bold mt-2 mb-1">
                ACCESSO XXX ESCLUSIVO! 😈💦
              </h2>
              <p className="text-sm sm:text-md text-pink-100 dark:text-purple-200 max-w-md mx-auto">
                Devi registrarti GRATIS per scopare con Donne, Gay e Trans Italiani 🔥 похотливые e vedere TUTTI i contenuti ESPLICITI di {influencer.name} per la categoria {subcategoryTitleCase}! 🍆🍑 Accesso Immediato e SENZA CENSURE! 🔞
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              {REGISTRATION_OPTIONS.map((option) => (
                <div key={option.key} className="bg-white/5 dark:bg-black/10 p-3 rounded-lg shadow-md hover:bg-white/10 dark:hover:bg-black/20 transition-all duration-200 flex flex-col items-center text-center">
                  <span className="text-2xl sm:text-3xl mb-1.5">{option.emoji}</span>
                  <h3 className="text-base sm:text-lg font-semibold mb-1 text-white">{option.label}</h3>
                  <p className="text-xs text-pink-200 dark:text-purple-300 mb-2.5 flex-grow px-1 leading-tight">{option.spicyText}</p>
                  <a
                    href={categoryAffiliateLinks[option.key]}
                    target="_blank"
                    rel="noopener noreferrer sponsored"
                    onClick={() => setIsModalOpen(false)} // Close modal on link click as well
                    className="w-full mt-auto inline-block bg-white text-pink-600 font-bold text-xs sm:text-sm px-4 py-2 rounded-md shadow-sm hover:bg-gray-200 transition-colors duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-pink-300 focus:ring-opacity-75"
                  >
                    {option.buttonText}
                  </a>
                </div>
              ))}
            </div>
            <p className="text-xs text-pink-200 dark:text-purple-300 mt-4 text-center">
              La registrazione è gratuita e ti dà accesso immediato.
            </p>
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