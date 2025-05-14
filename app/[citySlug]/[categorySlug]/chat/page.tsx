import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import React from 'react';
import { getAllCities, getCityBySlug } from '@/lib/utils/geo';
import { getAllCategories, getCategoryBySlug } from '@/lib/utils/category-utils';
import { FakeChatInterface } from '@/components/common/fake-chat-interface';
import { categoryAffiliateLinks, type AffiliateCategory } from '@/lib/constants';
import { capitalizeCityName } from '@/lib/utils/string';
import { FaqSection } from '@/components/common/faq-section';
import { SeoTextSection } from '@/components/common/seo-text-section';
import { categoryChatPageStrings } from '@/app/translations';

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
      title: categoryChatPageStrings.metadataNotFoundTitle,
      description: categoryChatPageStrings.metadataNotFoundDescription,
    };
  }

  const cityDisplayName = capitalizeCityName(city.name);
  const categoryDisplayName = category.name;

  return {
    title: categoryChatPageStrings.generateMetadataTitle(categoryDisplayName, cityDisplayName),
    description: categoryChatPageStrings.generateMetadataDescription(categoryDisplayName, cityDisplayName),
    keywords: [`chat ${categoryDisplayName} ${cityDisplayName}`, `incontri ${categoryDisplayName} ${cityDisplayName}`, `live chat ${city.name}`],
    alternates: {
      canonical: `/italia/${resolvedParams.citySlug}/${resolvedParams.categorySlug}/chat`,
    },
  };
}

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

  const finalAffiliateLink = categoryAffiliateLinks[category.slug as AffiliateCategory] || 'https://www.incontri-italia.it/';
  
  const messagesForChat = categoryChatPageStrings.defaultMessagesConfig;

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="text-center mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 dark:text-gray-100">
          {categoryChatPageStrings.headerTitle(categoryDisplayName, cityDisplayName)}
        </h1>
        <p className="text-md text-gray-600 dark:text-gray-300 mt-2">
          {categoryChatPageStrings.headerDescription}
        </p>
      </header>

      <FakeChatInterface
        cityDisplayName={cityDisplayName}
        categoryDisplayName={categoryDisplayName}
        affiliateLink={finalAffiliateLink}
        initialMessagesConfig={messagesForChat}
        chatCtaButtonText={categoryChatPageStrings.chatCtaButtonTextTemplate}
      />

      <section className="mt-12 text-center">
        <h2 className="text-xl font-semibold mb-2">{categoryChatPageStrings.whyJoinTitle}</h2>
        <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          {categoryChatPageStrings.whyJoinDescription(categoryDisplayName, cityDisplayName)}
        </p>
      </section>

      <div className="mt-12 sm:mt-16">
        <FaqSection 
          cityDisplayName={cityDisplayName} 
          categoryDisplayName={categoryDisplayName} 
          subCategoryType="chat"
        />
      </div>

      <div className="mt-12 sm:mt-16">
        <SeoTextSection 
          cityDisplayName={cityDisplayName} 
          categoryDisplayName={categoryDisplayName} 
          subCategoryType="chat"
        />
      </div>

    </div>
  );
} 