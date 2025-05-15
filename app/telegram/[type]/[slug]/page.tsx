import { Suspense } from 'react';
import { Metadata } from 'next';
import { getTelegramPageData, getAllTelegramPageParams, TelegramPageData } from '@/lib/data/telegram-data';
import TelegramPageContent from '@/components/telegram/telegram-page-content';
import Loading from './loading';
import { notFound } from 'next/navigation';

interface TelegramPageParams {
  type: 'canali' | 'gruppi';
  slug: string;
}

interface TelegramPageProps {
  params: TelegramPageParams;
}

export async function generateMetadata({ params }: TelegramPageProps): Promise<Metadata> {
  const { type, slug } = params;
  const pageData: TelegramPageData | null = await getTelegramPageData(type, slug);

  if (!pageData) {
    return {
      title: 'Contenuto Non Trovato',
      description: 'La pagina che stai cercando non esiste o è stata spostata.',
    };
  }

  return {
    title: pageData.title,
    description: pageData.description,
    // alternates: { // Example for canonical URLs if needed
    //   canonical: `/telegram/${type}/${slug}`,
    // },
    openGraph: {
      title: pageData.title,
      description: pageData.description,
      type: 'article', // or 'website'
      // images: [ // Add image URLs if available in pageData
      //   {
      //     url: 'https://example.com/og-image.jpg',
      //     width: 800,
      //     height: 600,
      //     alt: 'Og Image Alt',
      //   },
      // ],
    },
  };
}

export default async function TelegramPage({ params }: TelegramPageProps) {
  const { type, slug } = params;
  const pageData: TelegramPageData | null = await getTelegramPageData(type, slug);

  console.log(`Page data for [${type}/${slug}]:`, JSON.stringify(pageData, null, 2));

  if (!pageData) {
    notFound(); // Triggers the not-found UI
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Suspense fallback={<Loading />}>
        <TelegramPageContent data={pageData} />
      </Suspense>
    </div>
  );
}

export async function generateStaticParams() {
  const allParams = getAllTelegramPageParams();
  return allParams;
  // If you have a very large number of pages, consider fetching a subset
  // or using incremental static regeneration.
} 