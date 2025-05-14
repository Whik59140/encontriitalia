'use client';

import React, { Fragment, useCallback, useMemo } from 'react';
import { jsx, jsxs } from 'react/jsx-runtime';
import { unified } from 'unified';
import rehypeReact, { Options as RehypeReactOptions } from 'rehype-react';
import type { Root as HastRoot, ElementContent as HastElementContent } from 'hast';
import Image from 'next/image';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

// TODO: Consolidate these type definitions into a central file (e.g., types/content.ts)
// These are currently duplicated from app/influencers/[slug]/page.tsx or similar
export interface HeadingData {
  id: string;
  text: string;
  level: number;
}

export interface AccordionSectionData {
  id: string;
  title: string;
  level: number; // 2 for H2, 3 for H3
  contentHastNodes: HastElementContent[];
}

export interface InfluencerArticleRenderData {
  leadingHastNodes: HastElementContent[];
  accordionSections: AccordionSectionData[];
  frontmatter: {
    title?: string;
    description?: string;
    date?: string;
  };
  headings: HeadingData[]; // Though TOC might be handled outside this component
  influencerName: string;
  // Optional: Add influencer image details if they are to be rendered here
  // influencerImageUrl?: string;
  // influencerImageAlt?: string;
}

interface InfluencerArticleRendererProps {
  renderData: InfluencerArticleRenderData;
  // Explicitly pass image details for clarity, if this component handles it
  influencerImageUrl: string;
  influencerImageAlt: string;
  influencerImageWidth: number;
  influencerImageHeight: number;
}

// Moved createContentProcessor and renderHastToReact before the main component
// so they can be referenced if needed, though processor is created inside with useMemo.

const renderHastToReact = (nodes: HastElementContent[] | undefined, processor: ReturnType<typeof createContentProcessorInternal>): React.ReactNode => {
  if (!nodes || nodes.length === 0) return null;
  const root: HastRoot = { type: 'root', children: nodes };
  try {
    const reactContent = processor.stringify(root);
    return reactContent as React.ReactNode;
  } catch (error) {
    console.error("Error processing HAST to React:", error);
    return <p className="text-red-500 dark:text-red-400">Error rendering content section.</p>;
  }
};

// Renamed to avoid conflict if we decide to export later, and to be clear it's internal for now
const createContentProcessorInternal = (customComponents: RehypeReactOptions['components']) => {
  const rehypeReactOpts: RehypeReactOptions = {
    Fragment: Fragment,
    jsx: jsx,
    jsxs: jsxs,
    components: customComponents, // Use the passed customComponents directly
  };
  return unified().use(rehypeReact, rehypeReactOpts);
};

export function InfluencerArticleRenderer({ 
  renderData, 
  influencerImageUrl, 
  influencerImageAlt,
  influencerImageWidth,
  influencerImageHeight 
}: InfluencerArticleRendererProps) {

  // Define custom components for HAST elements INSIDE the function component body
  const MarkdownImage = useCallback((props: React.ImgHTMLAttributes<HTMLImageElement>) => {
    // Assuming props.src from markdown will be a string URL or path
    if (props.src && typeof props.src === 'string') {
      return (
        <span className="block my-4 relative w-full h-auto max-w-2xl mx-auto aspect-video"> 
          <Image 
            src={props.src} // Now explicitly a string
            alt={props.alt || 'Embedded image from article'} 
            layout="fill" 
            objectFit="contain" 
            className="rounded-md shadow-md"
          />
        </span>
      );
    }
    return null;
  }, []);

  const CustomP = useCallback((props: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p {...props} className="my-4 leading-relaxed dark:text-gray-300">
      {props.children}
    </p>
  ), []);

  const CustomA = useCallback((props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a {...props} className="text-pink-600 hover:underline dark:text-pink-400">
      {props.children}
    </a>
  ), []);

  const contentProcessor = useMemo(() => createContentProcessorInternal({
    img: MarkdownImage,
    p: CustomP,
    a: CustomA,
    // Add more custom components here as needed
    // h2: (h2Props) => <h2 className="text-2xl font-semibold mt-6 mb-3 dark:text-gray-100" {...h2Props} />,
    // ul: (ulProps) => <ul className="list-disc pl-6 mb-4 space-y-1 dark:text-gray-300" {...ulProps} />,
    // li: (liProps) => <li className="dark:text-gray-300" {...liProps} />,
  }), [MarkdownImage, CustomP, CustomA]); // Add dependencies for useMemo

  const { leadingHastNodes, accordionSections } = renderData;
  const defaultAccordionValue = accordionSections.length > 0 ? accordionSections[0].id : undefined;

  return (
    <div className="prose prose-lg lg:prose-xl dark:prose-invert max-w-none">
      {/* Render leading HAST content if any */}
      {leadingHastNodes && leadingHastNodes.length > 0 && (
        <div className="mb-6">
          {renderHastToReact(leadingHastNodes, contentProcessor)}
        </div>
      )}

      {/* Main Influencer Image - integrated before accordion */}
      <div className="my-8 flex justify-center">
        <Image
          src={influencerImageUrl}
          alt={influencerImageAlt}
          width={influencerImageWidth}
          height={influencerImageHeight}
          priority
          className="rounded-lg shadow-lg object-cover"
        />
      </div>
      
      {/* Render accordion sections */}
      {accordionSections && accordionSections.length > 0 ? (
        <Accordion type="single" collapsible defaultValue={defaultAccordionValue} className="w-full mt-8">
          {accordionSections.map((section) => (
            <AccordionItem value={section.id} key={section.id} className="border-b dark:border-gray-700">
              <AccordionTrigger className="py-4 text-left text-xl lg:text-2xl font-semibold hover:no-underline text-gray-800 dark:text-gray-200">
                {/* Add level check for H2/H3 styling if needed, or rely on parent prose styles */}
                {section.title}
              </AccordionTrigger>
              <AccordionContent className="pt-2 pb-4 text-base"> {/* prose styles should apply here */}
                {renderHastToReact(section.contentHastNodes, contentProcessor)}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      ) : (
        // If no accordion sections, but there was leading content, that's already rendered.
        // If no content at all (and no leading content), this message might be shown.
        // The page component should ideally handle "no articleData" scenarios.
        leadingHastNodes.length === 0 && <p className="dark:text-gray-300">No detailed sections available for this influencer.</p>
      )}
    </div>
  );
} 