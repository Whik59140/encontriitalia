import { getRegionalCities } from '@/lib/utils/geo';
import { AnnouncesGrid } from '@/components/common/announces-grid';
import { Footer } from '@/components/common/footer';
import { categoryAffiliateLinks } from '@/lib/constants';
import { capitalizeSlug } from '@/lib/utils/string';
import path from 'path';
import fs from 'fs/promises';
import { Metadata } from 'next';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';
import { FaqSection } from '@/components/common/faq-section';
import { SeoTextSection } from '@/components/common/seo-text-section';

// Define specific param and props interfaces for this page type
interface ListingsSubCategoryParams {
  citySlug: string;
  categorySlug: string;
}

interface GratisListingsPageProps {
  params: Promise<ListingsSubCategoryParams>;
}

const SUB_CATEGORY_DISPLAY_NAME = "Gratis";
const SUB_CATEGORY_SLUG = "annunci-gratis";

const CATEGORY_DISPLAY_NAMES: { [slug: string]: string } = {
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

// Comment out or remove AnnunciSubPageParams if inlining type
// interface AnnunciSubPageParams {
//   citySlug: string;
//   categorySlug: string;
// }

export async function generateStaticParams(): Promise<ListingsSubCategoryParams[]> {
  const rootArticlesDir = path.join(process.cwd(), 'content', 'articles');
  const paramsList: ListingsSubCategoryParams[] = [];
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
              const citySlugValue = cityDir.name;
              if (!paramsList.some(p => p.citySlug === citySlugValue && p.categorySlug === categorySlug)) {
                paramsList.push({ citySlug: citySlugValue, categorySlug });
              }
            }
          }
        } catch { /* ignore city dir errors */ }
      }
    }
  } catch { console.error(`[${SUB_CATEGORY_SLUG} generateStaticParams] Could not read root articles dir`); }
  if (paramsList.length === 0) {
    console.warn(`[${SUB_CATEGORY_SLUG} generateStaticParams] No params found.`);
  }
  return paramsList;
}

export async function generateMetadata({ params: paramsPromise }: GratisListingsPageProps): Promise<Metadata> {
  const { citySlug, categorySlug } = await paramsPromise;
  const cityName = capitalizeSlug(citySlug);
  const categoryName = CATEGORY_DISPLAY_NAMES[categorySlug] || capitalizeSlug(categorySlug);
  const title = `Annunci ${SUB_CATEGORY_DISPLAY_NAME} ${categoryName} a ${cityName} - Incontri Esclusivi`;
  const description = `Scopri i migliori annunci ${SUB_CATEGORY_DISPLAY_NAME} per incontri ${categoryName} a ${cityName}. Profili verificati, registrazione veloce. Trova subito!`;
  
  return {
    title,
    description,
    keywords: [`annunci ${SUB_CATEGORY_DISPLAY_NAME} ${categoryName} ${cityName}`, `incontri ${SUB_CATEGORY_DISPLAY_NAME} ${categoryName} ${cityName}`],
    openGraph: {
      title,
      description,
      url: `/${citySlug}/${categorySlug}/${SUB_CATEGORY_SLUG}`,
      siteName: 'Incontri Italia',
      type: 'website',
    },
  };
}

export default async function AnnunciGratisPage({ params: paramsPromise }: GratisListingsPageProps) {
  const { citySlug, categorySlug } = await paramsPromise;
  const { cities: regionalCities, regionName } = await getRegionalCities(citySlug);

  const cityDisplayName = capitalizeSlug(citySlug);
  const categoryDisplayName = CATEGORY_DISPLAY_NAMES[categorySlug] || capitalizeSlug(categorySlug);
  const affiliateLink = categoryAffiliateLinks[categorySlug] || categoryAffiliateLinks['default'] || '#';

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 dark:bg-gray-950">
      <header className="py-4 bg-white dark:bg-gray-900 shadow-sm">
        <div className="container mx-auto px-4 flex items-center justify-between">
          <Link href={`/${citySlug}/${categorySlug}/annunci`} className="flex items-center text-pink-600 dark:text-pink-400 hover:underline">
            <ChevronLeft size={20} className="mr-1" />
            Torna alla scelta annunci {categoryDisplayName} a {cityDisplayName}
          </Link>
        </div>
      </header>
      
      <main className="flex-grow">
        <AnnouncesGrid
          categorySlug={categorySlug}
          citySlug={citySlug}
          categoryDisplayName={categoryDisplayName}
          cityDisplayName={cityDisplayName}
          affiliateLink={affiliateLink}
          maxAnnounces={24}
          subCategoryType="gratis"
        />
        <SeoTextSection 
          categoryDisplayName={categoryDisplayName}
          cityDisplayName={cityDisplayName}
          subCategoryType="gratis"
        />
        <FaqSection 
          categoryDisplayName={categoryDisplayName}
          cityDisplayName={cityDisplayName}
          subCategoryType="gratis"
        />
      </main>

      <Footer
        currentCitySlug={citySlug}
        currentCategorySlug={categorySlug}
        regionalCities={regionalCities}
        regionName={regionName}
      />
    </div>
  );
} 