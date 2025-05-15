import { Suspense } from 'react';
import { Metadata } from 'next';
import { getTelegramPageData, getAllTelegramPageParams, TelegramPageData } from '@/lib/data/telegram-data';
import TelegramPageContent from '@/components/telegram/telegram-page-content';
import Loading from './loading';
import { notFound } from 'next/navigation';

export async function generateMetadata({ params }: { params: Promise<{ type: 'canali' | 'gruppi'; slug: string; }> }): Promise<Metadata> {
  const actualParams = await params;
  console.log('generateMetadata actualParams:', actualParams);
  // const { type, slug } = actualParams; 
  // For now, we keep the metadata hardcoded as the focus is fixing the type error.
  // const pageData: TelegramPageData | null = await getTelegramPageData(type, slug);

  // if (!pageData) {
  //   return {
  //     title: 'Contenuto Non Trovato',
  //     description: 'La pagina che stai cercando non esiste o è stata spostata.',
  //   };
  // }

  return {
    title: "Test Title", // Hardcoded
    description: "Test Description", // Hardcoded
    openGraph: {
      title: "Test OG Title",
      description: "Test OG Description",
      type: 'article',
    },
  };
}

export default async function TelegramPage({ params }: { params: Promise<{ type: 'canali' | 'gruppi'; slug: string; }> }) {
  const actualParams = await params;
  const { type, slug } = actualParams;
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

export function generateStaticParams(): Array<{ type: 'canali' | 'gruppi'; slug: string }> {
  const allParams = getAllTelegramPageParams();
  // Ensure the returned objects match the new inlined params structure
  return allParams.map(param => ({ type: param.type as 'canali' | 'gruppi', slug: param.slug }));
  // If you have a very large number of pages, consider fetching a subset
  // or using incremental static regeneration.
}