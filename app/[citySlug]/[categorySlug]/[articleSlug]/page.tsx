import fs from 'fs/promises';
import path from 'path';
import { notFound } from 'next/navigation';
import matter from 'gray-matter'; // For parsing frontmatter
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import remarkRehype from 'remark-rehype';
import rehypeSlug from 'rehype-slug';
import { visit } from 'unist-util-visit'; // To traverse HAST
import type { Root as HastRoot, Element as HastElement, ElementContent as HastElementContent, Text as HastText } from 'hast';
import type { Root as MdastRootType } from 'mdast';
import { getRegionalCities } from '@/lib/utils/geo'; // Added
import { Footer } from '@/components/common/footer'; // Added
import { RelatedContent } from '@/components/common/related-content'; // Import RelatedContent
import { TopArticleCTA } from '@/components/common/top-article-cta';
import { WebcamCtaButton } from '@/components/common/webcam-cta-button'; // Import the Webcam CTA Button
import Link from 'next/link'; // Corrected import for Link
import { CtaSection } from '@/components/common/cta-section'; // <<< ADD THIS IMPORT
import { categoryAffiliateLinks } from '@/lib/constants'; // <<< IMPORT THE CENTRALIZED MAP
import { capitalizeSlug } from '@/lib/utils/string';
import { Metadata } from 'next';

// Shadcn UI Accordion components - will be used by the client component
// We still define the structure here, but rendering moves to client component

// Import the new client component that will handle actual rendering
import ArticleContentRenderer from '@/components/common/article-content-renderer'; // Adjust path as needed

// Force dynamic rendering for this page to allow for per-request randomness

interface ArticleFrontmatter {
  title?: string;
  description?: string;
  city?: string;
  category?: string;
  date?: string;
  articleSlug: string;
  cityName?: string; // Added to ensure we have it
  image?: string; // Added from previous integration
}

interface ResolvedPageParams {
  citySlug: string;
  categorySlug: string;
  articleSlug: string;
}

// Interface for individual heading, to be used by Table of Contents
export interface HeadingData {
  id: string;
  text: string;
  level: number;
}

// This interface will be passed to the client component
export interface AccordionSectionData {
  id: string;
  title: string;
  level: number;
  contentHastNodes: HastElementContent[]; // Raw HAST nodes
}

export interface ArticleRenderData {
  leadingHastNodes: HastElementContent[]; // Raw HAST nodes
  accordionSections: AccordionSectionData[];
  frontmatter: ArticleFrontmatter;
  headings: HeadingData[]; // Return headings
}

// Helper function to extract text from a HAST element
function getElementText(node: HastElement): string {
  let text = '';
  visit(node, 'text', (textNode: HastText) => {
    text += textNode.value;
  });
  return text.trim();
}

// Function to transform HAST into leading content and accordion sections with HAST nodes
function prepareArticleRenderData(hast: HastRoot, frontmatter: ArticleFrontmatter): ArticleRenderData {
  const leadingHastNodes: HastElementContent[] = [];
  const accordionSections: AccordionSectionData[] = [];
  const headings: HeadingData[] = []; // Initialize headings array
  
  let currentAccordionSectionData: AccordionSectionData | null = null;
  let sectionCounter = 0;
  let inLeadingContent = true;

  hast.children.forEach((node) => {
    if (node.type === 'element' && (node.tagName === 'h2' || node.tagName === 'h3')) {
      inLeadingContent = false;
      sectionCounter++;
      const title = getElementText(node);
      let id = node.properties?.id?.toString() || title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '') || `section-${sectionCounter}`;
      id = id.replace(/^-+|-+$/g, '');
      id = id || `section-${sectionCounter}`; 

      const headingLevel = node.tagName === 'h2' ? 2 : 3;
      headings.push({ id, text: title, level: headingLevel }); // Populate headings

      currentAccordionSectionData = {
        id: id,
        title: title || 'Untitled Section',
        level: headingLevel,
        contentHastNodes: [],
      };
      accordionSections.push(currentAccordionSectionData);
    } else if (currentAccordionSectionData && !inLeadingContent) {
      if (node.type === 'element' || node.type === 'text' || node.type === 'comment') {
        currentAccordionSectionData.contentHastNodes.push(node);
      }
    } else if (inLeadingContent) {
       if (node.type === 'element' || node.type === 'text' || node.type === 'comment') {
        leadingHastNodes.push(node);
      }
    }
  });

  const filteredAccordionSections = accordionSections.filter(section => section.contentHastNodes.length > 0);
  const filteredLeadingHastNodes = leadingHastNodes.filter(node => node.type === 'text' ? node.value.trim() !== '' : true);
  
  return {
    leadingHastNodes: filteredLeadingHastNodes,
    accordionSections: filteredAccordionSections,
    frontmatter,
    headings, // Return headings
  };
}

const CATEGORY_DISPLAY_NAMES_FOR_RELATED: { [slug: string]: string } = {
  gay: 'Gay',
  milf: 'MILF',
  donne: 'Donne',
  ragazze: 'Ragazze',
  trans: 'Trans',
  trav: 'Trav',
  escort: 'Escort',
  studentessa: 'Studentesse',
  adulti: 'Adulti',
};

export async function generateStaticParams(): Promise<{ citySlug: string; categorySlug: string; articleSlug: string; }[]> {
  const rootArticlesDir = path.join(process.cwd(), 'content', 'articles');
  const paramsList: { citySlug: string; categorySlug: string; articleSlug: string; }[] = [];
  try {
    const categoryDirs = await fs.readdir(rootArticlesDir, { withFileTypes: true });
    for (const categoryDir of categoryDirs) {
      if (categoryDir.isDirectory()) {
        const categorySlug = categoryDir.name;
        const cityDirsPath = path.join(rootArticlesDir, categorySlug);
        try {
          const cityDirs = await fs.readdir(cityDirsPath, { withFileTypes: true });
          for (const cityDir of cityDirs) {
            if (cityDir.isDirectory()) {
              const citySlug = cityDir.name;
              const articleFilesPath = path.join(cityDirsPath, citySlug);
              try {
                const articleFiles = await fs.readdir(articleFilesPath, { withFileTypes: true });
                for (const articleFile of articleFiles) {
                  if (articleFile.isFile() && articleFile.name.endsWith('.md')) {
                    const articleSlugFromFile = articleFile.name.replace('.md', '');
                    if (!paramsList.some(p => p.citySlug === citySlug && p.categorySlug === categorySlug && p.articleSlug === articleSlugFromFile)) {
                        paramsList.push({ citySlug, categorySlug, articleSlug: articleSlugFromFile });
                    }
                  }
                }
              } catch { console.warn(`Could not read files in ${articleFilesPath}`); }
            }
          }
        } catch { console.warn(`Could not read city dirs in ${cityDirsPath}`); }
      }
    }
  } catch { console.error(`Could not read root articles dir ${rootArticlesDir}`); }
  if (paramsList.length === 0) {
    console.warn("[generateStaticParams SpecificArticlePage] No params found.");
  }
  return paramsList; 
}

export default async function SpecificArticlePage({ params }: { params: Promise<ResolvedPageParams> }) {
  const resolvedParams = await params;
  const { citySlug, categorySlug, articleSlug } = resolvedParams;
  const { cities: regionalCities, regionName } = await getRegionalCities(citySlug);
  
  const expectedFilename = `${articleSlug}.md`;
  const filePath = path.join(process.cwd(), 'content', 'articles', categorySlug, citySlug, expectedFilename);

  let fileContent;
  try {
    fileContent = await fs.readFile(filePath, 'utf8');
  } catch (error) {
    console.error(`Article file not found: ${filePath}`, error);
    notFound(); 
  }

  const { data: frontmatterData, content: markdownBody } = matter(fileContent);
  const frontmatter = frontmatterData as ArticleFrontmatter;

  const processor = unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeSlug);

  const mdastNode = processor.parse(markdownBody) as MdastRootType;
  const hastNode = await processor.run(mdastNode) as HastRoot;

  const articleRenderData = prepareArticleRenderData(hastNode, frontmatter);

  // --- Fetch related articles --- 
  const relatedArticlesDir = path.join(process.cwd(), 'content', 'articles', categorySlug, citySlug);
  const relatedArticleLinks: Array<{ title: string; url: string; }> = [];
  try {
    const allArticleFiles = await fs.readdir(relatedArticlesDir);
    const mdFiles = allArticleFiles.filter(file => file.endsWith('.md') && file !== expectedFilename);

    for (const mdFile of mdFiles.slice(0, 3)) { // Limit to 3 related articles
      const relatedArticleFilePath = path.join(relatedArticlesDir, mdFile);
      const relatedFileContent = await fs.readFile(relatedArticleFilePath, 'utf8');
      const { data: relatedFrontmatter } = matter(relatedFileContent);
      const relatedArticleActualSlug = mdFile.replace('.md', '');
      relatedArticleLinks.push({
        title: relatedFrontmatter.title || capitalizeSlug(relatedArticleActualSlug),
        url: `/${citySlug}/${categorySlug}/${relatedArticleActualSlug}`,
      });
    }
  } catch (e) {
    console.warn(`Could not fetch related articles for ${citySlug}/${categorySlug}:`, e);
  }
  // --- End fetch related articles ---

  const displayCityName = frontmatter.cityName || capitalizeSlug(citySlug);
  const displayCategoryName = CATEGORY_DISPLAY_NAMES_FOR_RELATED[categorySlug] || capitalizeSlug(categorySlug);

  const dynamicAffiliateLink = categoryAffiliateLinks[categorySlug] || 'https://defaultfallback.link';

  const ctaTitle = `Cerchi Incontri ${displayCategoryName} a ${displayCityName}? 🤔`;
  const ctaSubtitle = `Registrazione Gratuita ✅ con Profili Veri ✅.\nConferma la tua email per iniziare subito!`;
  const ctaDescription = "Trova profili verificati e inizia la tua avventura. La registrazione è veloce e richiede solo la tua email.";

  const categoryPageData = {
    name: displayCategoryName,
    url: `/${citySlug}/${categorySlug}`,
  };
  const cityPageData = {
    name: displayCityName,
    url: `/${citySlug}`,
  };

  // Fallback if no content could be structured
  if (articleRenderData.leadingHastNodes.length === 0 && articleRenderData.accordionSections.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <p className="text-xl text-red-500">Errore nella preparazione del contenuto dell&apos;articolo.</p>
        <Link href={`/${citySlug}/${categorySlug}`} className="mt-4 inline-block bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600">
          Torna alla categoria
        </Link>
      </div>
    );
  }
  
  // const randomImageUrl = await getRandomImageUrl(categorySlug); // Assuming this function exists if needed elsewhere, but not using for this CTA directly

  return (
    <div className="bg-gray-50 dark:bg-gray-950 min-h-screen">
      {/* Sticky Table of Contents for larger screens - Commented out for now */}
      {/* {articleRenderData.headings && articleRenderData.headings.length > 3 && (
        <div className="hidden lg:block fixed top-1/4 left-8 z-40">
          <TableOfContents headings={articleRenderData.headings} />
        </div>
      )} */}
      <main className="container mx-auto px-4 pt-20 lg:px-24 xl:px-32 2xl:px-40 pb-24"> {/* Adjusted padding: pt-20 (for sticky header) and kept pb-24 (for sticky footer) */}
        <div className="flex-grow">
          {/* Top Article CTA (Serious/Sex) */}
          <TopArticleCTA 
            cityName={displayCityName} 
            categoryName={displayCategoryName}
            affiliateUrl={dynamicAffiliateLink}
          />

          {/* Main Article Content - Renders H1, leading paragraphs, and accordion */}
          <ArticleContentRenderer {...articleRenderData} />

          {/* NEW CTA SECTION FOR CATEGORY AFFILIATE LINK */}
          <CtaSection 
            title={ctaTitle}
            subtitle={ctaSubtitle}
            description={ctaDescription}
            buttonText="💕 Inizia Subito!"
            buttonLink={dynamicAffiliateLink}
            isExternalLink={true}
            linkTarget="_blank"
          />

          {/* Webcam CTA Button - moved slightly lower, after article content but before related */}
          <div className="my-8 flex justify-center">
            <WebcamCtaButton 
              cityDisplayName={displayCityName}
              categoryDisplayName={displayCategoryName}
              categorySlug={categorySlug}
            />
          </div>

          {relatedArticleLinks.length > 0 && (
            <RelatedContent 
              relatedArticles={relatedArticleLinks} 
              categoryPage={categoryPageData}
              cityPage={cityPageData}
            />
          )}
        </div>
      </main>
      <Footer 
        currentCitySlug={citySlug}
        currentCategorySlug={categorySlug}
        currentArticleSlug={articleSlug}
        regionalCities={regionalCities}
        regionName={regionName}
      />
    </div>
  );
}

// Optional: Metadata generation (can remain largely the same, using frontmatter)
export async function generateMetadata({ params }: { params: ResolvedPageParams }): Promise<Metadata> {
  const { citySlug, categorySlug, articleSlug } = params;
  const expectedFilename = `${articleSlug}.md`;
  const filePath = path.join(process.cwd(), 'content', 'articles', categorySlug, citySlug, expectedFilename);

  try {
    const fileContent = await fs.readFile(filePath, 'utf8');
    const { data: frontmatter } = matter(fileContent);
    
    // Use the article title from frontmatter if available, otherwise generate one
    const title = frontmatter.title || `${capitalizeSlug(categorySlug)} a ${capitalizeSlug(citySlug)}`;
    const description = frontmatter.description || `Scopri tutto su ${categorySlug} a ${citySlug}.`;
    
    return { 
      title, 
      description 
    };
  } catch (error) {
    // Fallback metadata if article file can't be read
    return { 
      title: `${capitalizeSlug(categorySlug)} a ${capitalizeSlug(citySlug)}`,
      description: `Informazioni su ${categorySlug} a ${citySlug}.`
    };
  }
} 