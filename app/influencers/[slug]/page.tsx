import { getInfluencers, getInfluencerBySlug, getArticleDataBySlug } from '@/lib/data-loader';
import { Metadata, ResolvingMetadata } from 'next';
import { notFound } from 'next/navigation';
// import Image from 'next/image'; // Removed unused import
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import remarkRehype from 'remark-rehype';
import rehypeSlug from 'rehype-slug';
import { visit } from 'unist-util-visit';
import type { Root as HastRoot, Element as HastElement, ElementContent as HastElementContent, Text as HastText } from 'hast';
import type { Root as MdastRootType } from 'mdast';

// Import the new renderer and the ToC component
import { InfluencerArticleRenderer } from '@/components/common/influencer-article-renderer';
import { PostTableOfContents } from '@/components/common/post-table-of-contents';
import Link from 'next/link'; // For breadcrumbs/back links
import { ChevronLeft } from 'lucide-react'; // For back arrow icon

// TODO: Move these to a central types file (e.g., types/content.ts)
export interface HeadingData {
  id: string;
  text: string;
  level: number;
}

export interface AccordionSectionData {
  id: string;
  title: string;
  level: number;
  contentHastNodes: HastElementContent[];
}

export interface InfluencerArticleRenderData {
  leadingHastNodes: HastElementContent[];
  accordionSections: AccordionSectionData[];
  frontmatter: { // Assuming articleData contains frontmatter-like info
    title?: string;
    description?: string;
    date?: string;
    // Add other relevant fields from articleData if needed
  };
  headings: HeadingData[];
  influencerName: string; // To pass influencer name for context
}

// Define the shape of the resolved parameters
type ResolvedPageParams = {
  slug: string;
};

// This interface defines the props for the Page component itself
interface InfluencerPageProps {
  params: Promise<ResolvedPageParams>; // params is a Promise
}

// Generate static paths for all influencers at build time
export async function generateStaticParams() {
  const influencers = await getInfluencers();
  return influencers.map(influencer => ({
    slug: influencer.slug,
  }));
}

// Generate dynamic metadata for each influencer page
export async function generateMetadata(
  props: InfluencerPageProps, // Use InfluencerPageProps for the first arg
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _parent: ResolvingMetadata // Add _parent, even if unused, for correct signature
): Promise<Metadata> {
  const { slug } = await props.params; // Await params here
  const influencer = await getInfluencerBySlug(slug);
  const articleData = await getArticleDataBySlug(slug);

  if (!influencer) {
    return {
      title: 'Influencer Not Found',
      description: 'The requested influencer could not be found.',
    };
  }

  const pageTitle = articleData?.title || `${influencer.name} | Influencer Profile`;
  const pageDescription = articleData?.description || `Learn more about ${influencer.name} and their work.`;
  const imageUrlOpenGraph = `/placeholder-og-image.webp`; // Replace with actual dynamic image later

  return {
    title: pageTitle,
    description: pageDescription,
    openGraph: {
      title: pageTitle,
      description: pageDescription,
      images: [
        {
          url: imageUrlOpenGraph, // Use a placeholder or a more relevant default
          width: 1200,
          height: 630,
          alt: `${influencer.name} - Profile`,
        },
      ],
    },
  };
}

// Helper function to extract text from a HAST element (same as in SpecificArticlePage)
function getElementText(node: HastElement): string {
  let text = '';
  visit(node, 'text', (textNode: HastText) => {
    text += textNode.value;
  });
  return text.trim();
}

// Function to transform HAST into leading content and accordion sections
// Adapted from prepareArticleRenderData in SpecificArticlePage
function prepareInfluencerArticleRenderData(
  hast: HastRoot,
  articleData: { title?: string; description?: string; date?: string; content: string } | null,
  influencerName: string
): InfluencerArticleRenderData {
  const leadingHastNodes: HastElementContent[] = [];
  const accordionSections: AccordionSectionData[] = [];
  const headings: HeadingData[] = [];
  
  let currentAccordionSectionData: AccordionSectionData | null = null;
  let sectionCounter = 0;
  // For influencer articles, we might treat everything before the first H2 as "leading content"
  // or decide that there's no separate leading HAST content, and all content goes into sections.
  // Let's assume for now a similar logic to SpecificArticlePage: content before first H2 is leading.
  let inLeadingContent = true;

  hast.children.forEach((node) => {
    if (node.type === 'element' && (node.tagName === 'h2' || node.tagName === 'h3')) {
      inLeadingContent = false; // First H2 or H3 marks the end of leading content
      sectionCounter++;
      const title = getElementText(node);
      let id = node.properties?.id?.toString() || title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '') || `section-${sectionCounter}`;
      id = id.replace(/^-+|-+$/g, ''); // Clean up leading/trailing hyphens
      id = id || `section-${sectionCounter}`; // Fallback if ID is empty after cleaning

      const headingLevel = node.tagName === 'h2' ? 2 : 3;
      headings.push({ id, text: title, level: headingLevel });

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
  
  // Filter out sections that might have ended up empty if, for example, there are multiple H2s without content in between.
  const filteredAccordionSections = accordionSections.filter(section => section.contentHastNodes.length > 0 || (section.contentHastNodes.length === 1 && section.contentHastNodes[0].type === 'element'));
  const filteredLeadingHastNodes = leadingHastNodes.filter(node => node.type === 'text' ? node.value.trim() !== '' : true);

  return {
    leadingHastNodes: filteredLeadingHastNodes,
    accordionSections: filteredAccordionSections,
    frontmatter: { // Construct a frontmatter-like object
      title: articleData?.title,
      description: articleData?.description,
      date: articleData?.date,
    },
    headings,
    influencerName,
  };
}

export default async function InfluencerPage({ params: paramsPromise }: InfluencerPageProps) {
  const { slug } = await paramsPromise; // Await and destructure params
  const influencer = await getInfluencerBySlug(slug);
  const articleData = await getArticleDataBySlug(slug);

  if (!influencer || !articleData) { // Also check articleData
    notFound();
  }

  // Process markdown to HAST
  const processor = unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype, { allowDangerousHtml: true }) // Allow raw HTML if present in markdown
    .use(rehypeSlug);

  const mdastNode = processor.parse(articleData.content) as MdastRootType;
  const hastNode = await processor.run(mdastNode) as HastRoot;

  const renderData = prepareInfluencerArticleRenderData(hastNode, articleData, influencer.name);

  // Define image properties (can be part of leading content or managed by the renderer)
  const imageUrl = '/influencer/4.webp'; // Keep placeholder for now
  const imageAlt = `${influencer.name} - Illustration`;
  const imageWidth = 700;
  const imageHeight = 500;

  // Filter headings for ToC (e.g., only H2s, or H2s and H3s based on PostTableOfContents logic)
  // PostTableOfContents currently filters for H2s. If we want H3s, that component needs adjustment or we pass all.
  const tocHeadings = renderData.headings.filter(h => h.level === 2); // Match PostTableOfContents default

  const SUB_CATEGORIES_FOR_LINKS = ['nudes', 'leaks', 'onlyfans', 'porno', 'xxx', 'video', 'telegram', 'sesso'];

  return (
    <div className="bg-gray-50 dark:bg-gray-950 min-h-screen">
      <header className="py-4 bg-white dark:bg-gray-900 shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 flex items-center justify-between">
          <Link href="/influencers" className="flex items-center text-pink-600 dark:text-pink-400 hover:underline">
            <ChevronLeft size={20} className="mr-1" />
            Back to Influencers
          </Link>
          {/* Optional: Add more header content here if needed */}
        </div>
      </header>

      <main className="container mx-auto px-4 pt-8 lg:pt-12 pb-24">
        <div className="lg:flex lg:flex-row lg:gap-x-12">
          {/* Table of Contents Column - appears on the left for lg screens */}
          {tocHeadings.length > 0 && (
            <aside className="lg:w-1/4 py-6 lg:sticky lg:top-28 self-start hidden lg:block">
              {/* Adjusted lg:top-28 to account for sticky header height (approx 60px + some padding) */}
              <PostTableOfContents headings={tocHeadings} />
            </aside>
          )}

          {/* Main Content Column */}
          <div className="lg:flex-1 min-w-0"> {/* Use flex-1 and min-w-0 for proper flex sizing */}
            {/* Page Header (Title, Date, Variations) */}
            <header className="mb-8 border-b pb-4 dark:border-gray-700">
              <h1 className="text-3xl lg:text-4xl font-bold text-gray-800 dark:text-gray-100 mb-2">
                {articleData?.title || influencer.name}
              </h1>
              {articleData?.date && (
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Published on: {new Date(articleData.date).toLocaleDateString()}
                </p>
              )}
              <p className="text-md text-gray-600 dark:text-gray-300 mt-1">Featuring: {influencer.name}</p>
              {influencer.variations && influencer.variations.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-2">
                  <span className="text-sm text-gray-500 dark:text-gray-400 self-center">Also known as: </span>
                  {influencer.variations.map((variation, index) => (
                    <span key={index} className="text-sm text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-full">
                      {variation}
                    </span>
                  ))}
                </div>
              )}
            </header>

            {/* Influencer Article Renderer */}
            <InfluencerArticleRenderer 
              renderData={renderData} 
              influencerImageUrl={imageUrl}
              influencerImageAlt={imageAlt}
              influencerImageWidth={imageWidth}
              influencerImageHeight={imageHeight}
            />

            {/* Subcategory Links Section */}
            <section className="mt-12 pt-8 border-t dark:border-gray-700">
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-6">
                Explore More About {influencer.name}:
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {SUB_CATEGORIES_FOR_LINKS.map((subcategory) => (
                  <Link 
                    key={subcategory}
                    href={`/influencers/${slug}/${subcategory}`}
                    className="block p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow text-center hover:no-underline"
                  >
                    <h3 className="text-md font-semibold text-pink-600 dark:text-pink-400">
                      {subcategory.charAt(0).toUpperCase() + subcategory.slice(1)}
                    </h3>
                    {/* Optional: Add a small icon or descriptive text if desired */}
                  </Link>
                ))}
              </div>
            </section>

            {/* Mobile/Small Screen Table of Contents - Placed after content */}
            {tocHeadings.length > 0 && (
                <aside className="mt-12 py-6 border-t dark:border-gray-700 lg:hidden">
                    <PostTableOfContents headings={tocHeadings} />
                </aside>
            )}
          </div>
        </div>
      </main>
      {/* Consider adding a Footer component similar to other pages if desired */}
      {/* <Footer /> */}
    </div>
  );
} 