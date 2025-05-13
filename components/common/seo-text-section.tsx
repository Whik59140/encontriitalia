import React from 'react';
import { seoTextSectionStrings } from '@/app/translations';

interface SeoTextSectionProps {
  categoryDisplayName: string;
  cityDisplayName: string;
  subCategoryType: 'gratis' | 'sesso' | 'seri' | 'incontri' | 'chat';
}

export function SeoTextSection({ categoryDisplayName, cityDisplayName, subCategoryType }: SeoTextSectionProps) {
  // Helper function to escape regex special characters
  function escapeRegExp(string: string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  const categoryRegex = new RegExp(escapeRegExp('{category}'), 'g');
  const cityRegex = new RegExp(escapeRegExp('{city}'), 'g');

  // Select the correct set of strings based on subCategoryType
  // The 'incontri' key in seoTextSectionStrings serves as the default
  const strings = seoTextSectionStrings[subCategoryType] || seoTextSectionStrings.incontri;

  return (
    <section className="py-8 sm:py-12 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto prose prose-sm sm:prose dark:prose-invert">
          <h2 className="text-xl sm:text-2xl font-semibold text-center mb-4">
            {strings.title.replace(categoryRegex, categoryDisplayName).replace(cityRegex, cityDisplayName)}
          </h2>
          <p>
            {strings.p1.replace(categoryRegex, categoryDisplayName).replace(cityRegex, cityDisplayName)}
          </p>
          <p>
            {strings.p2.replace(categoryRegex, categoryDisplayName).replace(cityRegex, cityDisplayName)}
          </p>
          <h3 className="text-lg sm:text-xl font-semibold mt-6 mb-2">
            {strings.h3.replace(categoryRegex, categoryDisplayName).replace(cityRegex, cityDisplayName)}
          </h3>
          <ul>
            <li dangerouslySetInnerHTML={{ __html: strings.li1.replace(categoryRegex, categoryDisplayName).replace(cityRegex, cityDisplayName) }} />
            <li dangerouslySetInnerHTML={{ __html: strings.li2.replace(categoryRegex, categoryDisplayName).replace(cityRegex, cityDisplayName) }} />
            <li dangerouslySetInnerHTML={{ __html: strings.li3.replace(categoryRegex, categoryDisplayName).replace(cityRegex, cityDisplayName) }} />
            <li dangerouslySetInnerHTML={{ __html: strings.li4.replace(categoryRegex, categoryDisplayName).replace(cityRegex, cityDisplayName) }} />
            <li dangerouslySetInnerHTML={{ __html: strings.li5.replace(categoryRegex, categoryDisplayName).replace(cityRegex, cityDisplayName) }} />
          </ul>
          <p>
            {strings.p3.replace(categoryRegex, categoryDisplayName).replace(cityRegex, cityDisplayName)}
          </p>
        </div>
      </div>
    </section>
  );
} 