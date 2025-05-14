import { getInfluencers, getInfluencerBySlug, getArticleDataForSubcategory } from '@/lib/data-loader';
import { Metadata, ResolvingMetadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image'; // Keep for header/footer if needed, or main page structure
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import remarkRehype from 'remark-rehype';
import rehypeSlug from 'rehype-slug';
import type { Root as HastRoot, Element as HastElement, ElementContent as HastElementContent, Text as HastText } from 'hast';
import type { Root as MdastRootType } from 'mdast';

// Import the renderer - we can reuse or adapt (might not be directly used if all content in client wrapper)
// import { InfluencerArticleRenderer, InfluencerArticleRenderData, AccordionSectionData, HeadingData } from '@/components/common/influencer-article-renderer';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';
import { visit } from 'unist-util-visit';

// Constants and helpers for footer and data
import { REGISTRATION_OPTIONS, categoryAffiliateLinks } from '@/lib/constants';
import { seedRandom } from '@/lib/content-generator'; // For deterministic shuffling for footer

// Import the new client wrapper component
import { InfluencerSubcategoryClientWrapper } from '@/components/common/influencer-subcategory-client-wrapper';

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

// NavButtonProps needs to be accessible or redefined if not imported by client wrapper from a shared location
// For now, assume client wrapper defines its own or we make it global.
// If it was defined in this file and used by client wrapper, it would need to be moved or exported.
interface NavButtonProps {
  href: string;
  label: string;
  emoji?: string;
  iconSrc?: string;
  isActive: boolean;
}

export async function generateStaticParams() {
  const influencers = await getInfluencers();
  const params: { slug: string; subcategory: string }[] = [];
  for (const influencer of influencers) {
    for (const subcategory of SUB_CATEGORIES) {
      params.push({ slug: influencer.slug, subcategory: subcategory });
    }
  }
  return params;
}

export async function generateMetadata(
  { params: { slug, subcategory } }: InfluencerSubcategoryPageProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const influencer = await getInfluencerBySlug(slug);
  const articleData = await getArticleDataForSubcategory(slug, subcategory);
  if (!influencer) {
    return { title: 'Influencer Not Found', description: 'The requested influencer could not be found.' };
  }
  const subcategoryTitleCase = subcategory.charAt(0).toUpperCase() + subcategory.slice(1);
  const pageTitle = articleData?.title || `${influencer.name} - ${subcategoryTitleCase} | Influencer Details`;
  const pageDescription = articleData?.description || `Explore ${subcategoryTitleCase} related content for ${influencer.name}.`;
  const imageUrlOpenGraph = `/placeholder-og-image.webp`;
  return {
    title: pageTitle,
    description: pageDescription,
    openGraph: {
      title: pageTitle,
      description: pageDescription,
      images: [{ url: imageUrlOpenGraph, width: 1200, height: 630, alt: `${influencer.name} - ${subcategoryTitleCase}` }],
    },
  };
}

// Helper functions like getElementText and prepareSubcategoryArticleRenderData might be unused now if client wrapper handles all main content rendering
// For now, keeping them in case any part of the page (e.g. if MD was rendered here) needed them.
// If not, they can be removed for cleanliness.

export default async function InfluencerSubcategoryPage({ params }: InfluencerSubcategoryPageProps) {
  const slug = params.slug;
  const currentSubcategory = params.subcategory;
  const influencer = await getInfluencerBySlug(slug);

  if (!influencer) {
    notFound();
  }

  const subcategoryTitleCase = currentSubcategory.charAt(0).toUpperCase() + currentSubcategory.slice(1);

  const navButtons: NavButtonProps[] = [];
  navButtons.push({
    href: `/influencers/${slug}`,
    label: influencer.name,
    emoji: '👤',
    isActive: false,
  });
  SUB_CATEGORIES.forEach((subcatSlug) => {
    const iconData = SUB_CATEGORY_ICONS[subcatSlug] || { emoji: '❓' };
    navButtons.push({
      href: `/influencers/${slug}/${subcatSlug}`,
      label: subcatSlug.charAt(0).toUpperCase() + subcatSlug.slice(1),
      emoji: iconData.emoji,
      iconSrc: iconData.iconSrc,
      isActive: subcatSlug === currentSubcategory,
    });
  });

  const allInfluencers = await getInfluencers();
  const otherInfluencersRaw = allInfluencers.filter(inf => inf.slug !== slug);
  function seededShuffle<T>(array: T[], seed: string): T[] {
    let currentIndex = array.length;
    const random = seedRandom(seed);
    const newArray = [...array];
    while (currentIndex !== 0) {
      const randomIndex = Math.floor(random() * currentIndex);
      currentIndex -= 1;
      [newArray[currentIndex], newArray[randomIndex]] = [newArray[randomIndex], newArray[currentIndex]];
    }
    return newArray;
  }
  const shuffledInfluencers = seededShuffle(otherInfluencersRaw, `${slug}-${currentSubcategory}-footer-influencers`);
  const footerOtherInfluencers = shuffledInfluencers.slice(0, 10);
  const footerOtherSubcategories = SUB_CATEGORIES
    .filter(sc => sc !== currentSubcategory)
    .map(sc => ({ slug: sc, name: sc.charAt(0).toUpperCase() + sc.slice(1) }));

  // --- Teaser Images Logic ---
  // Default teaser images for all pages are /leaks/1.webp and /leaks/2.webp
  // Alt, title, and subtitle are generic, incorporating the current influencer and subcategory.
  const teaserImagesData = [
    {
      src: '/leaks/1.webp', 
      alt: `Anteprima video ${subcategoryTitleCase} di ${influencer.name} 1`,
      title: 'GUARDA ORA! 😈🔞',
      subtitle: 'Accesso VIP Immediato! 💦'
    },
    {
      src: '/leaks/2.webp', 
      alt: `Anteprima video ${subcategoryTitleCase} di ${influencer.name} 2`,
      title: 'XXX ESCLUSIVO! 🤤🔥',
      subtitle: 'Clicca e Godi! 🍑🍆'
    },
  ];

  // --- End Teaser Images Logic ---

  return (
    <div className="bg-gray-100 dark:bg-gray-900 min-h-screen flex flex-col">
      <header className="py-3 bg-white dark:bg-gray-800 shadow-md sticky top-0 z-50">
        <div className="container mx-auto px-4 flex items-center justify-between">
          <Link href={`/influencers/${slug}`} className="flex items-center text-pink-500 dark:text-pink-400 hover:underline">
            <ChevronLeft size={22} className="mr-1" />
            <span className="font-medium">{influencer.name}</span>
          </Link>
          <span className="text-lg font-semibold text-gray-700 dark:text-gray-300">{subcategoryTitleCase}</span>
        </div>
      </header>

      <main className="container mx-auto px-2 sm:px-4 pt-6 lg:pt-8 pb-16 flex-grow">
        <InfluencerSubcategoryClientWrapper
          influencer={influencer} // Pass the whole influencer object
          currentSubcategory={currentSubcategory}
          subcategoryTitleCase={subcategoryTitleCase}
          navButtons={navButtons}
          REGISTRATION_OPTIONS={REGISTRATION_OPTIONS} // These are imported from @lib/constants
          categoryAffiliateLinks={categoryAffiliateLinks} // Also from @lib/constants
          teaserImages={teaserImagesData} // Pass the dynamically set teaser images
        />
      </main>

      <footer className="bg-gray-800 text-gray-300 py-12 mt-auto">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="text-lg font-semibold text-white mb-3">Altri Profili da Scoprire</h3>
              {footerOtherInfluencers.length > 0 ? (
                <ul className="space-y-2">
                  {footerOtherInfluencers.map(inf => (
                    <li key={inf.slug}>
                      <Link href={`/influencers/${inf.slug}`} className="hover:text-pink-400 transition-colors">
                        {inf.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-gray-400">Nessun altro profilo al momento.</p>
              )}
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white mb-3">Altre Categorie di {influencer.name}</h3>
              {footerOtherSubcategories.length > 0 ? (
                <ul className="space-y-2">
                  {footerOtherSubcategories.map(subcat => (
                    <li key={subcat.slug}>
                      <Link href={`/influencers/${slug}/${subcat.slug}`} className="hover:text-pink-400 transition-colors">
                        {influencer.name} - {subcat.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-gray-400">Nessuna altra categoria per questo profilo.</p>
              )}
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white mb-3">Informazioni</h3>
              <ul className="space-y-2">
                <li><Link href="/privacy-policy" className="hover:text-pink-400 transition-colors">Privacy Policy</Link></li>
                <li><Link href="/terms-of-service" className="hover:text-pink-400 transition-colors">Termini di Servizio</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 pt-8 text-center">
            <p className="text-sm">&copy; {new Date().getFullYear()} NomeSito. Tutti i diritti riservati.</p>
            <p className="text-xs mt-1">Contenuti per adulti. Accesso riservato ai maggiori di 18 anni.</p>
          </div>
        </div>
      </footer>
    </div>
  );
} 