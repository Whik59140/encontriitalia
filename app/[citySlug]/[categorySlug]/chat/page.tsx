import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import React from 'react';
import { getAllCities, getCategoryBySlug, getCityBySlug, getAllCategories } from '@/lib/utils/geo';
import { FakeChatInterface } from '@/components/common/fake-chat-interface';
import { categoryAffiliateLinks } from '@/lib/constants';
import { capitalizeCityName } from '@/lib/utils/string';

interface ChatPageResolvedParams {
  citySlug: string;
  categorySlug: string;
}

export async function generateStaticParams(): Promise<ChatPageResolvedParams[]> {
  const cities = await getAllCities();
  const categories = await getAllCategories();
  const params: ChatPageResolvedParams[] = [];

  if (!cities.length || !categories.length) return params;

  for (const city of cities) {
    for (const category of categories) {
      params.push({ citySlug: city.slug, categorySlug: category.slug });
    }
  }
  return params;
}

export async function generateMetadata({
  params,
}: { params: Promise<ChatPageResolvedParams> }): Promise<Metadata> {
  const resolvedParams = await params;
  const city = await getCityBySlug(resolvedParams.citySlug);
  const category = await getCategoryBySlug(resolvedParams.categorySlug);

  if (!city || !category) {
    return {
      title: 'Chat non trovata',
      description: 'Pagina chat non disponibile.',
    };
  }

  const cityDisplayName = capitalizeCityName(city.name);
  const categoryDisplayName = category.name;

  return {
    title: `Chat ${categoryDisplayName} a ${cityDisplayName} - Entra Subito!`,
    description: `Partecipa alla chat live per incontri ${categoryDisplayName} a ${cityDisplayName}. Iscrizione gratuita e veloce. Profili reali ti aspettano.`,
    keywords: [`chat ${categoryDisplayName} ${cityDisplayName}`, `incontri ${categoryDisplayName} ${cityDisplayName}`, `live chat ${city.name}`],
    alternates: {
      canonical: `/italia/${resolvedParams.citySlug}/${resolvedParams.categorySlug}/chat`,
    },
  };
}

// Define some message configurations
const defaultMessagesConfig = [
  { sender: 'bot' as const, textTemplate: 'Ciao! Benvenuto/a nella chat {categoryName} di {cityName}. Pronto/a per iniziare? 😉', avatar: '👋', delay: 1000 },
  { sender: 'bot' as const, textTemplate: 'Qui troverai tanti profili interessanti di {categoryName} proprio da {cityName}!', avatar: '✨', delay: 2000 },
  { sender: 'bot' as const, textTemplate: 'L&apos;iscrizione è gratuita e veloce. Bastano pochi istanti.', avatar: '🚀', delay: 1500 },
  { sender: 'bot' as const, textTemplate: 'Cosa aspetti? Clicca qui sotto per unirti alla conversazione! 👇', avatar: '💬', delay: 2000 },
];

export default async function ChatPage({ 
  params 
}: { params: Promise<ChatPageResolvedParams> }): Promise<React.ReactNode> {
  const resolvedParams = await params;
  const city = await getCityBySlug(resolvedParams.citySlug);
  const category = await getCategoryBySlug(resolvedParams.categorySlug);

  if (!city || !category) {
    notFound();
  }

  const cityDisplayName = capitalizeCityName(city.name);
  const categoryDisplayName = category.name;

  // Construct the affiliate link using categoryAffiliateLinks map
  const finalAffiliateLink = categoryAffiliateLinks[category.slug] || categoryAffiliateLinks.default || 'https://www.incontri-italia.it/';
  
  const messagesForChat = defaultMessagesConfig;

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="text-center mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 dark:text-gray-100">
          Chat <span className="text-pink-500">{categoryDisplayName}</span> a {cityDisplayName}
        </h1>
        <p className="text-md text-gray-600 dark:text-gray-300 mt-2">
          Entra nella nostra chat room esclusiva e inizia a conoscere persone fantastiche ora!
        </p>
      </header>

      <FakeChatInterface
        cityDisplayName={cityDisplayName}
        categoryDisplayName={categoryDisplayName}
        affiliateLink={finalAffiliateLink}
        initialMessagesConfig={messagesForChat}
        chatCtaButtonText={`Entra nella Chat {categoryName}!`}
      />

      <section className="mt-12 text-center">
        <h2 className="text-xl font-semibold mb-2">Perché unirti alla nostra chat?</h2>
        <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          La nostra piattaforma di chat {categoryDisplayName} a {cityDisplayName} è sicura, discreta e piena di profili verificati.
          Trova esattamente ciò che cerchi, che sia un&apos;amicizia, una relazione seria o puro divertimento.
        </p>
      </section>
    </div>
  );
} 