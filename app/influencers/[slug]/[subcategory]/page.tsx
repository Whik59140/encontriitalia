import { getInfluencers, getInfluencerBySlug, getArticleDataForSubcategory } from '@/lib/data-loader';
import { Metadata, ResolvingMetadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image'; // Keep for consistency, though might not be used directly here
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import remarkRehype from 'remark-rehype';
import rehypeSlug from 'rehype-slug';
import type { Root as HastRoot, Element as HastElement, ElementContent as HastElementContent, Text as HastText } from 'hast';
import type { Root as MdastRootType } from 'mdast';

// Import the renderer - we can reuse or adapt
import { InfluencerArticleRenderer, InfluencerArticleRenderData, AccordionSectionData, HeadingData } from '@/components/common/influencer-article-renderer';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';
import { visit } from 'unist-util-visit';

// Import the new content components
import { InfluencerSeoText } from '@/components/common/influencer-seo-text';
import { InfluencerFaqSection } from '@/components/common/influencer-faq-section';

const SUB_CATEGORIES = ['nudes', 'leaks', 'onlyfans', 'porno', 'xxx', 'video', 'telegram', 'sesso'];

// Define a mapping for subcategories to emojis or SVG paths
const SUB_CATEGORY_ICONS: Record<string, { emoji?: string; iconSrc?: string }> = {
  nudes: { emoji: '📸' },
  leaks: { emoji: '🤫' },
  onlyfans: { iconSrc: '/icons/onlyfans-2.svg' },
  porno: { emoji: '🎬' },
  xxx: { emoji: '🔥' },
  video: { emoji: '📹' },
  telegram: { iconSrc: '/icons/telegram-1.svg' },
  sesso: { emoji: '💬' }, // Placeholder, can be more specific
};

interface InfluencerSubcategoryPageProps {
  params: {
    slug: string;
    subcategory: string;
  };
}

export async function generateStaticParams() {
  const influencers = await getInfluencers();
  const params: { slug: string; subcategory: string }[] = [];

  for (const influencer of influencers) {
    for (const subcategory of SUB_CATEGORIES) {
      params.push({
        slug: influencer.slug,
        subcategory: subcategory,
      });
    }
  }
  return params;
}

export async function generateMetadata(
  { params }: InfluencerSubcategoryPageProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // Extract the params values to avoid using them directly
  const slug = params.slug;
  const subcategory = params.subcategory;
  
  const influencer = await getInfluencerBySlug(slug);
  // Attempt to get article data for subcategory to see if specific title/desc exists in frontmatter
  const articleData = await getArticleDataForSubcategory(slug, subcategory);

  if (!influencer) {
    return {
      title: 'Influencer Not Found',
      description: 'The requested influencer could not be found.',
    };
  }

  const subcategoryTitleCase = subcategory.charAt(0).toUpperCase() + subcategory.slice(1);
  const pageTitle = articleData?.title || `${influencer.name} - ${subcategoryTitleCase} | Influencer Details`;
  const pageDescription = articleData?.description || `Explore ${subcategoryTitleCase} related content for ${influencer.name}.`;
  // Consider a different OG image or a generic one for subcategories
  const imageUrlOpenGraph = `/placeholder-og-image.webp`; 

  return {
    title: pageTitle,
    description: pageDescription,
    openGraph: {
      title: pageTitle,
      description: pageDescription,
      images: [
        {
          url: imageUrlOpenGraph,
          width: 1200,
          height: 630,
          alt: `${influencer.name} - ${subcategoryTitleCase}`,
        },
      ],
    },
  };
}

// Helper to extract text from HAST element (can be moved to a util)
function getElementText(node: HastElement): string {
  let text = '';
  visit(node, 'text', (textNode: HastText) => {
    text += textNode.value;
  });
  return text.trim();
}

// Define new structure for navigation buttons
interface NavButtonProps {
  href: string;
  label: string; // For key and accessibility
  emoji?: string;
  iconSrc?: string;
  isActive: boolean;
}

// Simplified HAST preparation for subcategory pages.
// We might not need the complex accordion structure here, or can reuse if MD format is same.
// For now, let's assume it's simpler, rendering all content directly.
// If subcategory markdown also uses H2s for accordions, we'll use prepareInfluencerArticleRenderData
function prepareSubcategoryArticleRenderData(
  hast: HastRoot,
  articleData: { title?: string; description?: string; date?: string; content: string } | null,
  influencerName: string,
  subcategory: string
): InfluencerArticleRenderData { // Reusing the type for now
  const contentNodes: HastElementContent[] = [];
  const headings: HeadingData[] = []; // Keep for potential future ToC on subpages
  
  hast.children.forEach((node) => {
    if (node.type === 'element' || node.type === 'text' || node.type === 'comment') {
      contentNodes.push(node);
    }
    if (node.type === 'element' && (node.tagName === 'h2' || node.tagName === 'h3')) {
        const title = getElementText(node);
        const id = node.properties?.id?.toString() || title.toLowerCase().replace(/\\s+/g, '-').replace(/[^\\w-]+/g, '') || `sub-section-${headings.length + 1}`;
        headings.push({ id, text: title, level: node.tagName === 'h2' ? 2 : 3 });
    }
  });

  return {
    // For now, put all content into leadingHastNodes, no accordion.
    leadingHastNodes: contentNodes, 
    accordionSections: [], // No accordion sections for this simplified version
    frontmatter: {
      title: articleData?.title || `${influencerName} - ${subcategory}`,
      description: articleData?.description,
      date: articleData?.date,
    },
    headings,
    influencerName,
  };
}

export default async function InfluencerSubcategoryPage({ params }: InfluencerSubcategoryPageProps) {
  // Get the slug and subcategory values from params
  const slug = params.slug;
  const currentSubcategory = params.subcategory;
  
  // Get influencer data
  const influencer = await getInfluencerBySlug(slug);

  if (!influencer) {
    notFound();
  }
  
  const subcategoryTitleCase = currentSubcategory.charAt(0).toUpperCase() + currentSubcategory.slice(1);

  // Dynamically generate navigation buttons
  const navButtons: NavButtonProps[] = [];

  // 1. Add button for the main influencer profile
  navButtons.push({
    href: `/influencers/${slug}`,
    label: influencer.name,
    emoji: '👤', // Profile icon
    isActive: false, // Main profile is never 'active' in subcategory context like this
  });

  // 2. Add buttons for all subcategories
  SUB_CATEGORIES.forEach((subcatSlug) => {
    const iconData = SUB_CATEGORY_ICONS[subcatSlug] || { emoji: '❓' }; // Fallback emoji
    navButtons.push({
      href: `/influencers/${slug}/${subcatSlug}`,
      label: subcatSlug.charAt(0).toUpperCase() + subcatSlug.slice(1),
      emoji: iconData.emoji,
      iconSrc: iconData.iconSrc,
      isActive: subcatSlug === currentSubcategory,
    });
  });
  
  const affiliateLink = "https://t.mbdaad.link/345641/7346?bo=2753,2754,2755,2756&popUnder=true&aff_sub5=SF_006OG000004lmDN";

  return (
    <div className="bg-gray-100 dark:bg-gray-900 min-h-screen">
      <header className="py-3 bg-white dark:bg-gray-800 shadow-md sticky top-0 z-50">
        <div className="container mx-auto px-4 flex items-center justify-between">
          <Link href={`/influencers/${slug}`} className="flex items-center text-pink-500 dark:text-pink-400 hover:underline">
            <ChevronLeft size={22} className="mr-1" />
            <span className="font-medium">{influencer.name}</span>
          </Link>
          <span className="text-lg font-semibold text-gray-700 dark:text-gray-300">{subcategoryTitleCase}</span>
        </div>
      </header>

      <main className="container mx-auto px-2 sm:px-4 pt-6 lg:pt-8 pb-16">
        
        {/* New Navigation Buttons Section */}
        <section className="mb-8">
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 md:gap-4">
            {navButtons.map((button) => (
              <Link
                key={button.label}
                href={button.href}
                className={`
                  flex flex-col items-center justify-center /* Ensure vertical alignment and centering */
                  p-2 sm:p-3 
                  w-20 h-20 sm:w-24 sm:h-24 /* Fixed size for consistency */
                  rounded-lg sm:rounded-xl 
                  shadow-md hover:shadow-lg 
                  transition-all duration-200 ease-in-out 
                  transform hover:scale-105 focus:outline-none 
                  focus:ring-2 focus:ring-pink-500 focus:ring-opacity-75
                  text-center /* Center text if it wraps */
                  ${button.isActive 
                    ? 'bg-pink-500 dark:bg-pink-600 ring-2 ring-pink-700 dark:ring-pink-400 scale-105 text-white' 
                    : 'bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200'}
                `}
                aria-label={button.label}
              >
                {/* Icon/Emoji container */}
                <div className="flex-shrink-0 mb-1 sm:mb-1.5">
                  {button.iconSrc && (
                    <Image
                      src={button.iconSrc}
                      alt={`${button.label} icon`}
                      width={24} // Adjust size as needed
                      height={24} // Adjust size as needed
                      className={`
                        ${button.isActive ? 'filter brightness-0 invert' : ''}
                      `}
                    />
                  )}
                  {button.emoji && (
                    <span 
                      className={`
                        text-xl sm:text-2xl
                        /* Emoji color is handled by parent link active/inactive state text color */
                      `}
                    >
                      {button.emoji}
                    </span>
                  )}
                </div>
                {/* Label Text */}
                <span className="text-xs sm:text-sm font-medium leading-tight">
                  {button.label === influencer.name ? "Profilo" : button.label}
                </span>
              </Link>
            ))}
          </div>
        </section>

        {/* Registration CTA / Paywall Section */}
        <section className="my-10 p-6 bg-gradient-to-br from-pink-500 to-purple-600 dark:from-pink-600 dark:to-purple-700 rounded-xl shadow-2xl text-white text-center">
          <div className="mb-4">
            <span role="img" aria-label="lock" className="text-5xl">🔑</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold mb-3">
            Accesso Riservato al Contenuto Completo!
          </h2>
          <p className="text-md sm:text-lg mb-1 max-w-xl mx-auto">
            Per sbloccare tutti i contenuti di <strong className="font-semibold">{subcategoryTitleCase}</strong> di <strong className="font-semibold">{influencer.name}</strong> e avere la possibilità di incontrare ragazze hot in Italia, registrati ora!
          </p>
          <p className="text-xs text-pink-200 dark:text-purple-300 mb-5">Cliccando ti registri al nostro portale partner.</p>
          <a 
            href={affiliateLink}
            target="_blank" 
            rel="noopener noreferrer sponsored"
            className="inline-block bg-white text-pink-600 font-bold text-lg px-10 py-3 rounded-lg shadow-md hover:bg-gray-100 transition-colors duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
          >
            Registrati Ora per Vedere Tutto!
          </a>
        </section>

        {/* Main Content Area (Description & FAQ) */}
        <div className="mt-10 p-4 sm:p-6 bg-white dark:bg-gray-800 rounded-lg shadow-xl">
          {/* Use the new Generic SEO Text component */}
          <InfluencerSeoText 
            influencerSlug={slug}
            influencerName={influencer.name}
            subcategorySlug={currentSubcategory}
            subcategoryDisplayName={subcategoryTitleCase}
          />

          {/* Add the FAQ Section Here */}
          <InfluencerFaqSection 
            influencerSlug={slug}
            influencerName={influencer.name}
            subcategorySlug={currentSubcategory}
            subcategoryDisplayName={subcategoryTitleCase}
          />
        </div>
      </main>
    </div>
  );
} 