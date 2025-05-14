'use client';

import React from 'react';
// Assuming your translations are in a central file, adjust path if necessary
import { influencerSeoTextStrings } from '@/app/translations'; 

interface InfluencerGenericSeoTextProps {
  influencerName: string;
  subcategorySlug: string; // Use slug to fetch the correct template
  subcategoryDisplayName: string; // For fallback if specific template not found
}

export function InfluencerGenericSeoText({ 
  influencerName,
  subcategorySlug,
  subcategoryDisplayName
}: InfluencerGenericSeoTextProps) {

  function escapeRegExp(string: string) {
    return string.replace(/[.*+?^${}()|[\\]\\]/g, '\\$&'); // Escaping regex special chars
  }

  const influencerRegex = new RegExp(escapeRegExp('{influencerName}'), 'g');
  const subcategoryRegex = new RegExp(escapeRegExp('{subcategoryDisplayName}'), 'g');

  // Select the correct set of strings based on subcategorySlug
  // Fallback to a 'default' template if a specific one for the subcategory isn't found
  const strings = (influencerSeoTextStrings as any)[subcategorySlug] || influencerSeoTextStrings.default;

  if (!strings) {
    // This case should ideally not be reached if 'default' template is always present
    return <p className="text-center text-gray-500 dark:text-gray-400 py-4">Testo SEO non disponibile.</p>;
  }

  // Helper to replace placeholders and set HTML
  const renderHTML = (template: string) => {
    const replacedText = template
      .replace(influencerRegex, influencerName)
      .replace(subcategoryRegex, subcategoryDisplayName);
    return { __html: replacedText };
  };

  return (
    <section className="py-6">
      <div className="prose prose-md sm:prose-lg dark:prose-invert max-w-none">
        {strings.title && (
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-4">
            {strings.title.replace(influencerRegex, influencerName).replace(subcategoryRegex, subcategoryDisplayName)}
          </h2>
        )}
        {strings.p1 && (
          <p dangerouslySetInnerHTML={renderHTML(strings.p1)} />
        )}
        {strings.p2 && (
          <p dangerouslySetInnerHTML={renderHTML(strings.p2)} />
        )}
        {strings.h3 && (
          <h3 className="text-lg sm:text-xl font-semibold text-gray-700 dark:text-gray-200 mt-5 mb-2">
            {strings.h3.replace(influencerRegex, influencerName).replace(subcategoryRegex, subcategoryDisplayName)}
          </h3>
        )}
        {(strings.li1 || strings.li2 || strings.li3 || strings.li4 || strings.li5) && (
          <ul className="list-disc pl-5 space-y-1">
            {strings.li1 && <li dangerouslySetInnerHTML={renderHTML(strings.li1)} />} 
            {strings.li2 && <li dangerouslySetInnerHTML={renderHTML(strings.li2)} />} 
            {strings.li3 && <li dangerouslySetInnerHTML={renderHTML(strings.li3)} />} 
            {strings.li4 && <li dangerouslySetInnerHTML={renderHTML(strings.li4)} />} 
            {strings.li5 && <li dangerouslySetInnerHTML={renderHTML(strings.li5)} />} 
          </ul>
        )}
        {strings.p3 && (
          <p className="mt-4" dangerouslySetInnerHTML={renderHTML(strings.p3)} />
        )}
      </div>
    </section>
  );
} 