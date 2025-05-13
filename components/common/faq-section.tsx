import React from 'react';
import { faqSectionStrings } from '@/app/translations';

interface FaqSectionProps {
  categoryDisplayName: string;
  cityDisplayName: string;
  subCategoryType: 'gratis' | 'sesso' | 'seri' | 'incontri' | 'chat' | 'cityGeneral';
}

interface FaqItem {
  question: string;
  answer: string;
}

export function FaqSection({ categoryDisplayName, cityDisplayName, subCategoryType }: FaqSectionProps) {
  let faqItems: FaqItem[];

  if (subCategoryType === 'gratis') {
    faqItems = faqSectionStrings.gratisFaqItems;
  } else if (subCategoryType === 'sesso') {
    faqItems = faqSectionStrings.sessoFaqItems;
  } else if (subCategoryType === 'seri') {
    faqItems = faqSectionStrings.seriFaqItems;
  } else if (subCategoryType === 'chat') {
    faqItems = faqSectionStrings.chatFaqItems;
  } else if (subCategoryType === 'cityGeneral') {
    faqItems = faqSectionStrings.cityGeneralFaqItems;
  } else { // Default to 'incontri'
    faqItems = faqSectionStrings.incontriFaqItems;
  }

  // Generate JSON-LD for FAQPage schema
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map(item => ({
      '@type': 'Question',
      name: item.question.replace('{category}', categoryDisplayName).replace('{city}', cityDisplayName),
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer.replace('{category}', categoryDisplayName).replace('{city}', cityDisplayName),
      },
    })),
  };
  
  const sectionTitle = faqSectionStrings.sectionTitle(categoryDisplayName, cityDisplayName, subCategoryType);

  return (
    <section className="py-8 sm:py-12 bg-white dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-800 dark:text-gray-100 mb-6 sm:mb-10">
          {sectionTitle}
        </h2>
        <div className="space-y-4 max-w-3xl mx-auto">
          {faqItems.map((item, index) => (
            <details key={index} className="group rounded-lg bg-gray-50 dark:bg-gray-700 p-4 shadow-sm hover:shadow-md transition-shadow">
              <summary className="flex cursor-pointer items-center justify-between text-lg font-medium text-gray-900 dark:text-white group-hover:text-pink-600 dark:group-hover:text-pink-400">
                {item.question.replace('{category}', categoryDisplayName).replace('{city}', cityDisplayName)}
                <span className="ml-4 flex-shrink-0 transform transition-transform duration-200 group-open:rotate-180">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
                </span>
              </summary>
              <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-600">
                <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                  {item.answer.replace('{category}', categoryDisplayName).replace('{city}', cityDisplayName)}
                </p>
              </div>
            </details>
          ))}
        </div>
      </div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </section>
  );
} 