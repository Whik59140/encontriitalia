import Link from 'next/link';
import { Metadata } from 'next';
import path from 'path';
import fs from 'fs/promises';
import { ChevronLeft } from 'lucide-react';

import { getRegionalCities } from '@/lib/utils/geo';
import { capitalizeSlug } from '@/lib/utils/string';
import { Footer } from '@/components/common/footer';
import { ChooserPageCtaButtonWithModal } from '@/components/common/chooser-page-cta-button-with-modal';
import { WebcamCtaButton } from '@/components/common/webcam-cta-button';

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

const AFFILIATE_LINK_TEMPLATE = 'https://affiliate.example.com/register?campaign={categorySlug}&location={citySlug}&tracking_id=your_id';

interface AnnunciChooserPageParams {
  citySlug: string;
  categorySlug: string;
}

// Define specific props interface for this page type expecting a Promise for params
interface AnnunciChooserPagePropsWithPromise {
  params: Promise<AnnunciChooserPageParams>;
}

export async function generateStaticParams(): Promise<AnnunciChooserPageParams[]> {
  const rootArticlesDir = path.join(process.cwd(), 'content', 'articles');
  const paramsList: AnnunciChooserPageParams[] = [];
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
  } catch { console.error('[AnnunciChooserPage generateStaticParams] Could not read root articles dir'); }
  if (paramsList.length === 0) {
    console.warn('[AnnunciChooserPage generateStaticParams] No params found.');
  }
  return paramsList;
}

export async function generateMetadata({ params: paramsPromise }: AnnunciChooserPagePropsWithPromise): Promise<Metadata> {
  const { citySlug, categorySlug } = await paramsPromise; // Await the params
  const cityName = capitalizeSlug(citySlug);
  const categoryName = CATEGORY_DISPLAY_NAMES[categorySlug] || capitalizeSlug(categorySlug);
  const title = `Annunci ${categoryName} a ${cityName}: Scegli la Tipologia`;
  const description = `Scegli tra annunci gratuiti, annunci per sesso, o annunci per incontri seri ${categoryName} a ${cityName}. Trova subito quello che cerchi!`;
  
  return {
    title,
    description,
    keywords: [`annunci ${categoryName} ${cityName}`, `scegli annunci ${categoryName} ${cityName}`],
    openGraph: {
      title,
      description,
      url: `/${citySlug}/${categorySlug}/annunci`,
      siteName: 'Incontri Italia',
      type: 'website',
    },
  };
}

export default async function AnnunciChooserPage({ params: paramsPromise }: AnnunciChooserPagePropsWithPromise) {
  const { citySlug, categorySlug } = await paramsPromise; // Await the params
  const { cities: regionalCities, regionName } = await getRegionalCities(citySlug);

  const cityDisplayName = capitalizeSlug(citySlug);
  const categoryDisplayName = CATEGORY_DISPLAY_NAMES[categorySlug] || capitalizeSlug(categorySlug);
  
  const dynamicAffiliateLink = AFFILIATE_LINK_TEMPLATE
    .replace('{citySlug}', citySlug)
    .replace('{categorySlug}', categorySlug);

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 dark:bg-gray-950">
      <header className="py-4 bg-white dark:bg-gray-900 shadow-sm">
        <div className="container mx-auto px-4 flex items-center justify-between">
          <Link href={`/${citySlug}/${categorySlug}`} className="flex items-center text-pink-600 dark:text-pink-400 hover:underline">
            <ChevronLeft size={20} className="mr-1" />
            Torna a {categoryDisplayName} a {cityDisplayName}
          </Link>
        </div>
      </header>
      
      <main className="flex-grow container mx-auto p-4">
        <h1 className="text-2xl sm:text-3xl font-bold text-center my-6 sm:my-10 text-gray-800 dark:text-gray-100">
          Annunci {categoryDisplayName} a {cityDisplayName}: Scegli la Categoria Giusta per Te
        </h1>

        <div className="my-6 sm:my-8 flex justify-center">
          <WebcamCtaButton 
            cityDisplayName={cityDisplayName}
            categoryDisplayName={categoryDisplayName}
            categorySlug={categorySlug}
          />
        </div>

        <section className="mb-10 py-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-xl sm:text-2xl font-semibold mb-6 text-gray-700 dark:text-gray-200">
              Che tipo di annunci {categoryDisplayName} stai cercando a {cityDisplayName}?
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 max-w-5xl mx-auto">
              <Link 
                href={`/${citySlug}/${categorySlug}/annunci-gratis`}
                className="block bg-green-500 hover:bg-green-600 text-white font-semibold py-4 px-5 rounded-lg shadow hover:shadow-md transition-all duration-300 transform hover:scale-105 text-base"
              >
                Gratis 🆓
                <span className="block text-xs font-normal mt-1">Senza impegno, per curiosare</span>
              </Link>
              <Link 
                href={`/${citySlug}/${categorySlug}/annunci-sesso`}
                className="block bg-red-500 hover:bg-red-600 text-white font-semibold py-4 px-5 rounded-lg shadow hover:shadow-md transition-all duration-300 transform hover:scale-105 text-base"
              >
                Sesso 🔥
                <span className="block text-xs font-normal mt-1">Avventure piccanti e senza tabù</span>
              </Link>
              <Link 
                href={`/${citySlug}/${categorySlug}/annunci-seri`}
                className="block bg-blue-500 hover:bg-blue-600 text-white font-semibold py-4 px-5 rounded-lg shadow hover:shadow-md transition-all duration-300 transform hover:scale-105 text-base"
              >
                Seri ❤️
                <span className="block text-xs font-normal mt-1">Per chi cerca l&apos;anima gemella</span>
              </Link>
              <Link 
                href={`/${citySlug}/${categorySlug}/annunci-incontri`}
                className="block bg-purple-500 hover:bg-purple-600 text-white font-semibold py-4 px-5 rounded-lg shadow hover:shadow-md transition-all duration-300 transform hover:scale-105 text-base"
              >
                Incontri 🤝
                <span className="block text-xs font-normal mt-1">Connessioni generiche, amicizie</span>
              </Link>
            </div>
          </div>
        </section>

        <ChooserPageCtaButtonWithModal 
          cityDisplayName={cityDisplayName}
          categoryDisplayName={categoryDisplayName}
          affiliateLink={dynamicAffiliateLink}
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