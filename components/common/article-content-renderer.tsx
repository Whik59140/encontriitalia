'use client';

import React, { Fragment } from 'react';
import { jsx, jsxs } from 'react/jsx-runtime';
import { unified } from 'unified';
import rehypeReact, { Options as RehypeReactOptions } from 'rehype-react';
import type { Root as HastRoot, ElementContent as HastElementContent } from 'hast';
import { ChevronRight, CheckCircle } from 'lucide-react';

// Shadcn UI Accordion components
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'; // Ensure this path is correct

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

interface ArticleContentRendererProps extends ArticleRenderData {
  fallbackMarkdownBody?: string;
}

const ArticleContentRenderer: React.FC<ArticleContentRendererProps> = ({
  leadingHastNodes,
  accordionSections,
  frontmatter,
  headings, // Destructure headings
  fallbackMarkdownBody,
}) => {

  // --- Custom Components for Markdown Elements ---
  const CustomH3 = ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3 {...props} className="flex items-center mt-6 mb-3 text-xl font-semibold">
      <ChevronRight className="mr-2 h-5 w-5 text-primary flex-shrink-0" />
      {children}
    </h3>
  );

  const CustomUl = ({ children, ...props }: React.HTMLAttributes<HTMLUListElement>) => (
    <ul {...props} className="list-none pl-0 mb-4 space-y-2">
      {children}
    </ul>
  );

  const CustomLi = ({ children, ...props }: React.HTMLAttributes<HTMLLIElement>) => (
    <li {...props} className="flex items-start">
      <CheckCircle className="mr-3 h-5 w-5 text-green-500 mt-1 flex-shrink-0" />
      <span className="flex-1">{children}</span>
    </li>
  );

  const CustomBlockquote = ({ children, ...props }: React.HTMLAttributes<HTMLQuoteElement>) => (
    <blockquote
      {...props}
      className="my-6 rounded-md border-l-4 border-primary bg-primary/10 p-4 italic"
    >
      {/* <QuoteIcon className="inline-block h-4 w-4 mr-2 opacity-50"/> */}
      {children}
    </blockquote>
  );

  const CustomInlineCode = ({ children, ...props }: React.HTMLAttributes<HTMLElement>) => (
    <code
      {...props}
      className="relative rounded bg-muted px-[0.4rem] py-[0.2rem] font-mono text-sm font-semibold text-foreground/80"
    >
      {children}
    </code>
  );
  
  const CustomP = ({ children, ...props }: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p {...props} className="my-4 leading-relaxed">
      {children}
    </p>
  );


  // Configure rehypeReact options - now memoized
  const rehypeReactOpts: RehypeReactOptions = React.useMemo(() => ({
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
  const contentProcessor = React.useMemo(() => unified().use(rehypeReact, rehypeReactOpts), [rehypeReactOpts]);

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
  const fallbackHtml = React.useMemo(() => {
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
  
  // Get the city name from frontmatter for the CTA
  const cityName = frontmatter.cityName || frontmatter.city || '';
  const categorySlug = frontmatter.categorySlug || '';

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
          <h1 className="text-4xl font-bold mb-2 text-gray-800 dark:text-gray-100">{frontmatter.title || 'Article Title'}</h1>
          {frontmatter.city && frontmatter.category && (
            <p className="text-md text-gray-600 dark:text-gray-400">
              In {frontmatter.city} / {frontmatter.category}
            </p>
          )}
          {frontmatter.date && (
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Published on: {new Date(frontmatter.date).toLocaleDateString()}
            </p>
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
              
              {/* Render CTA after the first section and then after every 2 sections */}
              {cityName && (
                (index === 0 || (index > 0 && (index + 1) % 2 === 0)) && (
                  <SectionCTA cityName={cityName} categorySlug={categorySlug} />
                )
              )}
            </React.Fragment>
          ))}
        </div>
      </article>
    </div>
  );
};

export default ArticleContentRenderer; 