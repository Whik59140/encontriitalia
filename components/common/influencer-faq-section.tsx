'use client';

import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { influencerFaqStrings, FaqItem as TranslationFaqItem } from '@/app/translations';
import { generateInfluencerSubcategoryFAQs } from '@/lib/content-generator';

interface InfluencerFaqSectionProps {
  influencerSlug: string;
  subcategorySlug: string;
  influencerName: string;
  subcategoryDisplayName: string;
}

export function InfluencerFaqSection({
  influencerSlug,
  subcategorySlug,
  influencerName,
  subcategoryDisplayName,
}: InfluencerFaqSectionProps) {
  const faqTitle = `Domande Frequenti su ${subcategoryDisplayName} di ${influencerName}`;

  // Generate dynamic FAQ items using the content generator
  const generatedFaqItems = React.useMemo(() => {
    return generateInfluencerSubcategoryFAQs(
      influencerSlug,
      influencerName,
      subcategorySlug
    );
  }, [influencerSlug, influencerName, subcategorySlug]);

  // Fallback to translations if needed
  let faqItems = generatedFaqItems;
  if (!faqItems || faqItems.length === 0) {
    const faqTemplates = influencerFaqStrings as { [key: string]: TranslationFaqItem[] };
    const templateItems = faqTemplates[subcategorySlug] || faqTemplates.default || [];
    
    if (templateItems.length > 0) {
      faqItems = templateItems.map(item => ({
        question: item.question
          .replace(/{influencerName}/g, influencerName)
          .replace(/{subcategoryName}/g, subcategoryDisplayName)
          .replace(/{subcategorySlug}/g, subcategorySlug),
        answer: item.answer
          .replace(/{influencerName}/g, influencerName)
          .replace(/{subcategoryName}/g, subcategoryDisplayName)
          .replace(/{subcategorySlug}/g, subcategorySlug),
      }));
    }
  }

  if (!faqItems || faqItems.length === 0) {
    console.warn(
      `No FAQ items could be generated for ${influencerSlug}/${subcategorySlug}`
    );
    return (
      <div className="py-8 text-center">
        <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">
          FAQ non disponibili
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Al momento non ci sono domande frequenti per {subcategoryDisplayName} di {influencerName}.
        </p>
      </div>
    );
  }

  // Add unique IDs for each FAQ item
  const processedFaqItems = faqItems.map((item, index) => ({
    id: `faq-${subcategorySlug}-${index}`,
    question: item.question,
    answer: item.answer,
  }));

  return (
    <div className="mt-10 pt-6 border-t border-gray-200 dark:border-gray-700">
      <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-8 text-center tracking-tight">
        {faqTitle}
      </h2>
      <Accordion type="single" collapsible className="w-full space-y-4 max-w-3xl mx-auto">
        {processedFaqItems.map((item) => (
          <AccordionItem 
            value={item.id} 
            key={item.id} 
            className="bg-white dark:bg-slate-800 shadow-lg rounded-xl transition-all hover:shadow-xl border border-slate-200 dark:border-slate-700"
          >
            <AccordionTrigger className="px-6 py-4 text-left text-lg font-semibold text-slate-700 dark:text-slate-100 hover:no-underline focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-500 focus-visible:ring-opacity-75 rounded-xl">
              {item.question}
            </AccordionTrigger>
            <AccordionContent className="px-6 pt-0 pb-5 text-slate-600 dark:text-slate-300 text-base leading-relaxed">
              <p dangerouslySetInnerHTML={{ __html: item.answer.replace(/\n/g, '<br />') }} />
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
} 