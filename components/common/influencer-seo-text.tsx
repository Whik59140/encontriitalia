'use client';

import React from 'react';
import { influencerSeoTextStrings } from '@/app/translations';
import { generateInfluencerSubcategoryContent } from '@/lib/content-generator';

interface InfluencerSeoTextProps {
  influencerSlug: string;
  subcategorySlug: string;
  influencerName: string;
  subcategoryDisplayName: string;
  customContent?: string; // Optional custom content prop
}

export function InfluencerSeoText({
  influencerSlug,
  subcategorySlug,
  influencerName,
  subcategoryDisplayName,
  customContent,
}: InfluencerSeoTextProps) {
  // Use content generator to create unique content for this combination
  const generatedContent = React.useMemo(() => {
    return generateInfluencerSubcategoryContent(
      influencerSlug,
      influencerName,
      subcategorySlug,
      subcategoryDisplayName
    );
  }, [influencerSlug, influencerName, subcategorySlug, subcategoryDisplayName]);

  // Use custom content if provided, then generated content, then fallback to translations
  let finalContent = customContent;
  
  if (!finalContent) {
    finalContent = generatedContent;
    
    // Fallback to the old method if generator fails for some reason
    if (!finalContent) {
      const seoTemplates = influencerSeoTextStrings as { [key: string]: string };
      const textTemplate = seoTemplates[subcategorySlug] || seoTemplates.default;
      
      if (textTemplate) {
        finalContent = textTemplate
          .replace(/{influencerName}/g, influencerName)
          .replace(/{subcategoryName}/g, subcategoryDisplayName);
      }
    }
  }

  if (!finalContent) {
    console.warn(`No SEO text content could be generated for ${influencerSlug}/${subcategorySlug}`);
    return (
      <div className="py-8 text-center">
        <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">
          Descrizione non disponibile
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Al momento non è disponibile una descrizione per {subcategoryDisplayName} di {influencerName}.
        </p>
      </div>
    );
  }

  return (
    <div className="prose prose-lg lg:prose-xl dark:prose-invert max-w-none my-6">
      <p dangerouslySetInnerHTML={{ __html: finalContent }} />
    </div>
  );
} 