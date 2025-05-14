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
import { WebcamCtaButton } from '@/components/common/webcam-cta-button';
import { annunciGratisPageStrings, globalSiteStrings, annunciIncontriPageStrings } from '@/app/translations';

// Define specific param and props interfaces for this page type
interface AnnunciSubCategoryPageParams {
  citySlug: string;
  categorySlug: string;
}

interface AnnunciGratisPageProps {
  params: Promise<AnnunciSubCategoryPageParams>;
}

const SUB_CATEGORY_SLUG = "annunci-gratis";

// Comment out or remove AnnunciSubPageParams if inlining type
// interface AnnunciSubPageParams {
//   citySlug: string;
//   categorySlug: string;
// }

export async function generateStaticParams(): Promise<AnnunciSubCategoryPageParams[]> {
  const rootArticlesDir = path.join(process.cwd(), 'content', 'articles');
  const paramsList: AnnunciSubCategoryPageParams[] = [];
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

export async function generateMetadata({ params: paramsPromise }: AnnunciGratisPageProps): Promise<Metadata> {
  const { citySlug, categorySlug } = await paramsPromise;
  const cityName = capitalizeSlug(citySlug);
  const categoryName = annunciIncontriPageStrings.categoryDisplayNames[categorySlug] || capitalizeSlug(categorySlug);
  const subCategoryDisplayName = annunciGratisPageStrings.subCategoryDisplayName;

  const title = `Annunci ${subCategoryDisplayName} ${categoryName} a ${cityName} - ${annunciGratisPageStrings.metadataTitleSuffix}`;
  const description = `${annunciGratisPageStrings.metadataDescriptionPart1} ${subCategoryDisplayName} per incontri ${categoryName} a ${cityName}. ${annunciGratisPageStrings.metadataDescriptionPart2}`;
  
  return {
    title,
    description,
    keywords: [
      `${annunciGratisPageStrings.keywordsPart1} ${subCategoryDisplayName} ${categoryName} ${cityName}`,
      `${annunciGratisPageStrings.keywordsPart2} ${subCategoryDisplayName} ${categoryName} ${cityName}`
    ],
    openGraph: {
      title,
      description,
      url: `/${citySlug}/${categorySlug}/${SUB_CATEGORY_SLUG}`,
      siteName: globalSiteStrings.siteName,
      type: 'website',
    },
  };
}

export default async function AnnunciGratisPage({ params: paramsPromise }: AnnunciGratisPageProps) {
  const { citySlug, categorySlug } = await paramsPromise;
  const { cities: regionalCities, regionName } = await getRegionalCities(citySlug);

  const cityDisplayName = capitalizeSlug(citySlug);
  const categoryDisplayName = annunciIncontriPageStrings.categoryDisplayNames[categorySlug] || capitalizeSlug(categorySlug);
  const affiliateLink = categoryAffiliateLinks[categorySlug] || categoryAffiliateLinks['default'] || '#';

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 dark:bg-gray-950">
      <header className="py-4 bg-white dark:bg-gray-900 shadow-sm">
        <div className="container mx-auto px-4 flex items-center justify-between">
          <Link href={`/${citySlug}/${categorySlug}/annunci`} className="flex items-center text-pink-600 dark:text-pink-400 hover:underline">
            <ChevronLeft size={20} className="mr-1" />
            {annunciGratisPageStrings.backToChooserLinkText(categoryDisplayName, cityDisplayName)}
          </Link>
        </div>
      </header>
      
      <main className="flex-grow">
        <div className="my-6 sm:my-8 flex justify-center">
          <WebcamCtaButton 
            cityDisplayName={cityDisplayName}
            categoryDisplayName={categoryDisplayName}
            categorySlug={categorySlug}
          />
        </div>

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
        currentFeatureSlug="annunci-gratis"
        regionalCities={regionalCities}
        regionName={regionName}
      />
    </div>
  );
} 