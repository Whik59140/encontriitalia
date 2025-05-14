'use client';

import React, { Fragment, useCallback, useMemo, useState, useEffect } from 'react';
import { jsx, jsxs } from 'react/jsx-runtime';
import { unified } from 'unified';
import rehypeReact, { Options as RehypeReactOptions } from 'rehype-react';
import type { Root as HastRoot, ElementContent as HastElementContent } from 'hast';
import { ChevronRight, CheckCircle } from 'lucide-react';
import Image from 'next/image'; // Make sure Next Image is imported

// Shadcn UI Accordion components
/*
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'; // Ensure this path is correct
*/

// Import interfaces from the server component (if they are exported and paths are correct)
// Alternatively, redefine them here if preferred for strict separation
// Adjust the import path based on your actual file structure for page.tsx
// For example, if page.tsx is in app/(main)/[citySlug]/[categorySlug]/[articleSlug]/page.tsx
// and this component is in components/common/, the relative path might be '../../app/(main)/[citySlug]/[categorySlug]/[articleSlug]/page';
// For now, let's assume a simpler structure or that these types are moved to a shared types directory.
// If direct import from a dynamic route page doesn't work due to Next.js constraints, define types here or in a shared file.

interface ArticleFrontmatter {
  title?: string;
  description?: string;
  city?: string;
  category?: string;
  date?: string;
  categorySlug?: string;
  cityName?: string;
}

interface AccordionSectionData {
  id: string;
  title: string;
  level: number;
  contentHastNodes: HastElementContent[];
}

interface HeadingData { // Make sure this matches the definition in page.tsx
  id: string;
  text: string;
  level: number;
}

interface ArticleRenderData {
  leadingHastNodes: HastElementContent[];
  accordionSections: AccordionSectionData[];
  frontmatter: ArticleFrontmatter;
  headings: HeadingData[]; // Added to accept headings for TOC
}

// Import SectionCTA
import { SectionCTA } from './section-cta';

// For fallback processing (if markdown body is passed)
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import remarkRehype from 'remark-rehype';
import rehypeSlug from 'rehype-slug';
import rehypeStringify from 'rehype-stringify'; // For very basic fallback to HTML string

// Import the Table of Contents component
import { PostTableOfContents } from './post-table-of-contents'; // Adjust path if necessary

// Import affiliate links from the central location
import { categoryAffiliateLinks, type AffiliateCategory } from '@/lib/constants';

interface ArticleContentRendererProps extends ArticleRenderData {
  fallbackMarkdownBody?: string;
}

// Helper function (can be moved outside if needed)
const getRandomImageIndices = (): [number, number] => {
  const indices = new Set<number>();
  while (indices.size < 2) {
    indices.add(Math.floor(Math.random() * 50) + 1); // Generates 1-50
  }
  return Array.from(indices) as [number, number];
};

const ArticleContentRenderer: React.FC<ArticleContentRendererProps> = ({
  leadingHastNodes,
  accordionSections,
  frontmatter,
  headings, // Destructure headings
  fallbackMarkdownBody,
}) => {
  // State to hold random indices for each CTA instance { sectionIndex: [num1, num2] }
  // Initialize to null to handle server render vs client render
  const [ctaImageIndices, setCtaImageIndices] = useState<{ [key: number]: [number, number] } | null>(null);

  // Calculate and set random indices on client mount
  useEffect(() => {
    const neededIndices: { [key: number]: [number, number] } = {};
    accordionSections.forEach((_, index) => {
      if (index === 0 || (index > 0 && (index + 1) % 2 === 0)) {
        neededIndices[index] = getRandomImageIndices();
      }
    });
    setCtaImageIndices(neededIndices);
  }, [accordionSections]); // Re-run if sections change (though unlikely)

  // --- Custom Components for Markdown Elements (Wrapped in useCallback) ---
  const CustomH3 = useCallback(({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3 {...props} className="flex items-center mt-6 mb-3 text-xl font-semibold">
      <ChevronRight className="mr-2 h-5 w-5 text-primary flex-shrink-0" />
      {children}
    </h3>
  ), []);

  const CustomUl = useCallback(({ children, ...props }: React.HTMLAttributes<HTMLUListElement>) => (
    <ul {...props} className="list-none pl-0 mb-4 space-y-2">
      {children}
    </ul>
  ), []);

  const CustomLi = useCallback(({ children, ...props }: React.HTMLAttributes<HTMLLIElement>) => (
    <li {...props} className="flex items-start">
      <CheckCircle className="mr-3 h-5 w-5 text-green-500 mt-1 flex-shrink-0" />
      <span className="flex-1">{children}</span>
    </li>
  ), []);

  const CustomBlockquote = useCallback(({ children, ...props }: React.HTMLAttributes<HTMLQuoteElement>) => (
    <blockquote
      {...props}
      className="my-6 rounded-md border-l-4 border-primary bg-primary/10 p-4 italic"
    >
      {/* <QuoteIcon className="inline-block h-4 w-4 mr-2 opacity-50"/> */}
      {children}
    </blockquote>
  ), []);

  const CustomInlineCode = useCallback(({ children, ...props }: React.HTMLAttributes<HTMLElement>) => (
    <code
      {...props}
      className="relative rounded bg-muted px-[0.4rem] py-[0.2rem] font-mono text-sm font-semibold text-foreground/80"
    >
      {children}
    </code>
  ), []);
  
  const CustomP = useCallback(({ children, ...props }: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p {...props} className="my-4 leading-relaxed">
      {children}
    </p>
  ), []);


  // Configure rehypeReact options - now memoized
  const rehypeReactOpts: RehypeReactOptions = useMemo(() => ({
    Fragment: Fragment,
    jsx: jsx,
    jsxs: jsxs,
    components: {
      h3: CustomH3,
      ul: CustomUl,
      li: CustomLi,
      blockquote: CustomBlockquote,
      code: CustomInlineCode, // Handles inline ``code``
      p: CustomP,
      // Add any custom component mappings here if needed in the future
      // e.g., for custom styling of p, a, li, etc.
      // p: (props) => <p className="my-2" {...props} />,
    },
  }), [CustomH3, CustomUl, CustomLi, CustomBlockquote, CustomInlineCode, CustomP]); // Dependencies are the custom components themselves

  // Memoize the processor to avoid re-creating it on every render,
  // unless rehypeReactOpts changes.
  const contentProcessor = useMemo(() => unified().use(rehypeReact, rehypeReactOpts), [rehypeReactOpts]);

  const renderHastToReact = (nodes: HastElementContent[] | undefined): React.ReactNode => {
    if (!nodes || nodes.length === 0) return null;
    const root: HastRoot = { type: 'root', children: nodes };
    try {
      // processSync should be okay here as HAST is already generated
      const reactContent = contentProcessor.stringify(root) as React.ReactNode;
      return reactContent;
    } catch (error) {
      console.error("Error processing HAST to React:", error);
      return <p className="text-red-500">Error rendering content section.</p>;
    }
  };

  // Moved useMemo for fallbackHtml to top level
  const fallbackHtml = useMemo(() => {
    if (!(leadingHastNodes.length === 0 && accordionSections.length === 0 && fallbackMarkdownBody)) {
      return null; // Don't compute if not in fallback mode
    }
    try {
      return unified()
        .use(remarkParse)
        .use(remarkGfm)
        .use(remarkRehype, { allowDangerousHtml: true })
        .use(rehypeSlug)
        .use(rehypeStringify)
        .processSync(fallbackMarkdownBody)
        .toString();
    } catch (error) {
      console.error("Error processing fallback markdown to HTML:", error);
      return "<p class=\"text-red-500\">Error rendering fallback content.</p>";
    }
  }, [leadingHastNodes, accordionSections, fallbackMarkdownBody]);

  // Fallback rendering if primary content is empty and fallbackMarkdownBody is provided
  if (leadingHastNodes.length === 0 && accordionSections.length === 0 && fallbackMarkdownBody) {
    // Now we use the pre-computed fallbackHtml (if available)
    if (fallbackHtml) {
      return (
        <article className="mx-auto p-4">
          <header className="mb-8">
            <h1 className="text-3xl font-bold mb-2">{frontmatter.title || 'Article Title'}</h1>
            {frontmatter.date && (
              <p className="text-sm text-gray-500">
                Published on: {new Date(frontmatter.date).toLocaleDateString()}
              </p>
            )}
          </header>
          <div className="prose lg:prose-xl" dangerouslySetInnerHTML={{ __html: fallbackHtml }} />
        </article>
      );
    }
    // Optional: Handle case where fallbackHtml is null due to not meeting initial criteria but still in this block
    // (though logically this shouldn't happen if conditions are consistent)
    return <p>Loading fallback or error...</p>; 
  }

  const tocHeadings = headings.filter(h => h.level === 2);
  
  // Get the city name and category from frontmatter for the CTA
  const cityName = frontmatter.cityName || frontmatter.city || '';
  const categorySlug = frontmatter.categorySlug || '';
  const categoryName = frontmatter.category || categorySlug; // Use category name if available, else slug
  // Get the affiliate link for the current category
  const affiliateUrl = categorySlug ? categoryAffiliateLinks[categorySlug as AffiliateCategory] : undefined;

  return (
    <div className="container mx-auto px-4 py-8 flex flex-col lg:flex-row lg:space-x-8">
      {/* Table of Contents Column (Sticky) */} 
      {tocHeadings.length > 0 && (
        <aside className="w-full lg:w-1/4 lg:sticky lg:top-24 self-start mb-8 lg:mb-0">
          <PostTableOfContents headings={tocHeadings} />
        </aside>
      )}

      {/* Article Content Column */} 
      <article className={`w-full ${tocHeadings.length > 0 ? 'lg:w-3/4' : 'lg:w-full'} max-w-3xl mx-auto lg:mx-0`}>
        <header className="mb-8">
          {/* Title and Subtitles Block */} 
          <div> 
            <h1 className="inline-block text-4xl font-bold mb-1 pb-2 text-gray-800 dark:text-gray-100 border-b-4 border-yellow-400">
              ✨ {frontmatter.title || 'Article Title'} ✨
            </h1>
            {/* Subtitle information */} 
            <div> 
          {frontmatter.city && frontmatter.category && (
                <p className="text-md text-gray-600 dark:text-gray-400 mt-1">
              In {frontmatter.city} / {frontmatter.category}
            </p>
          )}
          {frontmatter.date && (
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Published on: {new Date(frontmatter.date).toLocaleDateString()}
            </p>
              )}
            </div>
          </div>

          {/* Category Image Block (Moved Below Title) */} 
          {frontmatter.categorySlug && (
            <div className="mt-4"> {/* Add margin-top to space it from title/subtitles */} 
              <Image 
                src={`/titles/${frontmatter.categorySlug}.webp`}
                alt={`${frontmatter.title || 'Article'} - ${frontmatter.category || frontmatter.categorySlug} category image`}
                width={600} // Adjusted width for below-title display
                height={400} // Adjusted height (maintain aspect ratio of your source image!)
                className="rounded-md object-cover shadow-md" // Added shadow
              />
            </div>
          )}

          {/* Render Section CTA once, below the main image */}
          {cityName && categorySlug && categoryName && (
            <div className="mt-6"> { /* Add some margin above the CTA */}
              <SectionCTA cityName={cityName} categoryName={categoryName} categorySlug={categorySlug} />
            </div>
          )}
        </header>
        
        {leadingHastNodes.length > 0 && (
          <div className="prose prose-lg lg:prose-xl dark:prose-invert max-w-none mb-6">
            {renderHastToReact(leadingHastNodes)}
          </div>
        )}

        {/* Display sections as normal content with CTAs between sections */}
        <div className="prose prose-lg lg:prose-xl dark:prose-invert max-w-none">
          {accordionSections.map((section, index) => (
            <React.Fragment key={section.id}>
              <div id={section.id} className="mb-8">
                <h2 className={`${section.level === 2 ? 'text-2xl font-semibold mb-4' : 'text-xl font-medium mb-3'}`}>
                    {section.title}
                </h2>
                <div className="mt-2">
                    {renderHastToReact(section.contentHastNodes)}
                </div>
              </div>
              
              {/* Render CTA component AND CTA images after the first section and then after every 2 sections */}
              {(index === 0 || (index > 0 && (index + 1) % 2 === 0)) && (
                <>
                  {/* Restored and Updated CTA Images Section with new naming convention */}
                  {categorySlug && affiliateUrl && ctaImageIndices && ctaImageIndices[index] && (
                    <div className="not-prose my-8 flex flex-wrap justify-center gap-4 sm:gap-6"> 
                      {(() => {
                        const [imgNum1, imgNum2] = ctaImageIndices[index]; 
                        return (
                          <>
                            {/* Image 1 Wrapper */}
                            <a href={affiliateUrl} target="_blank" rel="noopener noreferrer sponsored" className="group relative block w-[45%] max-w-[300px] sm:w-auto hover:opacity-90 transition-opacity overflow-hidden rounded-lg shadow-md">
                              <Image
                                src={`/blog/${categorySlug}/${categorySlug} (${imgNum1}).webp`} // New path
                                alt={`CTA Image 1 for ${categoryName} in ${cityName}`}
                                width={300}
                                height={150} 
                                className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                                priority={index < 2}
                              />
                              <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/90 via-black/70 to-transparent p-3 text-center">
                                <div className="flex justify-center items-center gap-1.5 mb-1.5">
                                  <span className="inline-block bg-red-500 text-white text-[9px] sm:text-xs font-semibold px-2 py-0.5 rounded-full">Gratis</span>
                                  <span className="inline-block bg-yellow-400 text-black text-[9px] sm:text-xs font-semibold px-2 py-0.5 rounded-full">18+</span>
                                  <span className="inline-block bg-green-500 text-white text-[9px] sm:text-xs font-semibold px-2 py-0.5 rounded-full">Profili Veri</span>
                                </div>
                                <span className="text-white text-sm sm:text-base font-bold leading-tight drop-shadow-md">
                                  Incontri {categoryName} a {cityName} 🔥👀
                                  <br/>
                                  <span className="inline-block mt-1 px-2 py-0.5 sm:px-3 sm:py-1 bg-pink-500 hover:bg-pink-600 transition-colors rounded-md text-sm sm:text-lg font-extrabold shadow-sm">
                                    Clicca Qui! 👉
                                  </span>
                                </span>
                              </div>
                            </a>
                            {/* Image 2 Wrapper */}
                            <a href={affiliateUrl} target="_blank" rel="noopener noreferrer sponsored" className="group relative block w-[45%] max-w-[300px] sm:w-auto hover:opacity-90 transition-opacity overflow-hidden rounded-lg shadow-md">
                              <Image
                                src={`/blog/${categorySlug}/${categorySlug} (${imgNum2}).webp`} // New path
                                alt={`CTA Image 2 for ${categoryName} in ${cityName}`}
                                width={300} 
                                height={150}
                                className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                                priority={index < 2} 
                              />
                               <div className="absolute inset-0 flex flex-col justify-center items-center p-3 text-center bg-gradient-to-t from-black/80 via-black/60 to-transparent">
                                 <span className="text-white text-base sm:text-lg font-bold mb-2 drop-shadow-md">
                                   Incontri {categoryName} a {cityName}
                                 </span>
                                 <div className="flex flex-col sm:flex-row gap-2 mt-1">
                                   <span className="inline-block px-3 py-1 bg-blue-500 text-white rounded-md text-xs sm:text-sm font-semibold shadow-sm cursor-pointer transition-transform duration-200 ease-in-out hover:scale-105">
                                     Qualcosa di Serio? 👉
                                   </span>
                                   <span className="inline-block px-3 py-1 bg-red-500 text-white rounded-md text-xs sm:text-sm font-semibold shadow-sm cursor-pointer transition-transform duration-200 ease-in-out hover:scale-105">
                                     Solo Sesso? 👉
                                   </span>
                                 </div>
                               </div>
                            </a>
                          </>
              );
                      })()}
                    </div>
                  )}
                  {/* End New CTA Images Section */}

                  {/* Separator Line - This can be kept or removed based on your preference */}
                  <hr className="my-8 border-gray-300 dark:border-gray-600" />

                  {/* Existing SectionCTA component (if you still want it here) */}
                  {/* You might want to remove this if the image CTAs are sufficient */}
                  {/* Or keep it if it serves a different purpose */}
                  {/* 
                  {cityName && categorySlug && categoryName && affiliateUrl && (
                    <SectionCTA 
                      cityName={cityName} 
                      categoryName={categoryName} 
                      categorySlug={categorySlug} 
                      affiliateLink={affiliateUrl} 
                    />
        )}
                  */}
                </>
              )}
            </React.Fragment>
          ))}
        </div>
      </article>
    </div>
  );
};

export default ArticleContentRenderer; 