import Link from 'next/link';
import { Metadata } from 'next';
import { globalSiteStrings } from '@/app/translations';
import Breadcrumb from '@/components/common/breadcrumb';
import { Footer } from '@/components/common/footer';
import { getAllTelegramSubcategorySlugs, getTelegramSubcategoryBySlug, TelegramSubcategory } from '@/lib/telegram-categories';
import { notFound } from 'next/navigation';
import { capitalizeFirstLetter } from '@/lib/utils/string'; // Assuming this utility exists
import { getTelegramPageData, getAllTelegramPageParams, TelegramPageData } from '@/lib/data/telegram-data'; // Assuming this path is correct for your project
import TelegramPageContent from '@/components/telegram/telegram-page-content'; // Assuming this path

interface PageParams {
  subcategorySlug: string;
  // If this page is ONLY for 'gruppi', 'type' might be implicit or handled differently.
  // For now, I'll assume getTelegramPageData needs a 'type'. We may need to adjust this.
}

interface PageProps {
  params: PageParams;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { subcategorySlug } = params; // Correctly destructured
  const type = 'gruppi'; // Assuming this page is always for 'gruppi'

  // console.log(`[generateMetadata] Params: type=${type}, subcategorySlug=${subcategorySlug}`);
  const pageData: TelegramPageData | null = await getTelegramPageData(type, subcategorySlug);

  if (!pageData) {
    return {
      title: 'Contenuto Non Trovato',
      description: 'La pagina che stai cercando non esiste o è stata spostata.',
    };
  }

  return {
    title: pageData.title,
    description: pageData.description,
    openGraph: {
      title: pageData.title,
      description: pageData.description,
      type: 'article',
    },
    // keywords: ["gruppi telegram", subcategorySlug, pageData.name].join(', '), // Using pageData.name for more accuracy
    // url: `/telegram/gruppi/${subcategorySlug}`,
  };
}

export default async function TelegramSubcategoryPage({ params }: PageProps) {
  const { subcategorySlug } = params; // Correctly destructured
  const type = 'gruppi'; // Assuming this page is always for 'gruppi'
  
  // console.log(`[Page] Params: type=${type}, subcategorySlug=${subcategorySlug}`);
  const pageData: TelegramPageData | null = await getTelegramPageData(type, subcategorySlug);

  // This console.log is still useful if the above doesn't log or data is unexpected
  console.log(`Page data for [${type}/${subcategorySlug}]:`, JSON.stringify(pageData, null, 2));

  if (!pageData) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* TelegramPageContent will be rendered once pageData is resolved */}
      {/* Next.js automatically uses a sibling loading.tsx for Suspense */}
      <TelegramPageContent data={pageData} /> 
    </div>
  );
}

// Assuming getAllTelegramPageParams is adapted to return { subcategorySlug: string }[] for this path
// or we modify it to fit the { type, slug } structure if these pages are unified.
// For now, this assumes it's for this specific path structure.
// export async function generateStaticParams() {
//   const allParams = await getAllTelegramPageParams(); // Ensure this function is async if it does async work
  
//   // If getAllTelegramPageParams returns [{ type: 'canali' | 'gruppi'; slug: string }]
//   // we need to filter for 'gruppi' and map to the { subcategorySlug: string } structure
//   return allParams
//     .filter(param => param.type === 'gruppi')
//     .map(param => ({ subcategorySlug: param.slug }));
  
//   // If getAllTelegramPageParams is already specific, e.g., getAllGruppiSubcategorySlugs() 
//   // returning { subcategorySlug: string }[], then it's simpler:
//   // return await getAllGruppiSubcategorySlugs(); 
// }

// Re-enable generateStaticParams once the data fetching and param structure is stable for this page.
// For now, keeping it commented to focus on fixing the runtime error.

export async function generateStaticParams() {
  const allSubcategorySlugs = getAllTelegramSubcategorySlugs();
  // Filter for 'gruppi' type and map to the expected structure
  return allSubcategorySlugs
    .filter(param => param.type === 'gruppi')
    .map(param => ({ subcategorySlug: param.slug }));
} 