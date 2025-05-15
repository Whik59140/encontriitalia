import Link from 'next/link';
import { Metadata } from 'next';
import { globalSiteStrings } from '@/app/translations';
import Breadcrumb from '@/components/common/breadcrumb';
import { Footer } from '@/components/common/footer';
import { getAllTelegramSubcategorySlugs, getTelegramSubcategoryBySlug, TelegramSubcategory } from '@/lib/telegram-categories';
import { notFound } from 'next/navigation';
import { capitalizeFirstLetter } from '@/lib/utils/string'; // Assuming this utility exists

interface TelegramSubcategoryPageProps {
  params: {
    subcategorySlug: string;
  };
}

export async function generateStaticParams() {
  const allSubcategorySlugs = getAllTelegramSubcategorySlugs();
  // Filter for 'canali' type and map to the expected structure
  return allSubcategorySlugs
    .filter(param => param.type === 'canali')
    .map(param => ({ subcategorySlug: param.slug }));
}

export async function generateMetadata({ params }: TelegramSubcategoryPageProps): Promise<Metadata> {
  const subcategory = getTelegramSubcategoryBySlug(params.subcategorySlug);
  const subcategoryName = subcategory ? capitalizeFirstLetter(subcategory.name) : 'Sconosciuta';
  const title = `Canali Telegram: ${subcategoryName} - ${globalSiteStrings.siteName}`;
  const description = `Scopri i migliori canali Telegram per ${subcategoryName}. Contenuti aggiornati e link diretti.`;

  return {
    title,
    description,
    keywords: ["canali telegram", params.subcategorySlug, subcategoryName, "telegram italia"].join(', '),
    openGraph: {
      title,
      description,
      url: `/telegram/canali/${params.subcategorySlug}`,
      siteName: globalSiteStrings.siteName,
      // Add OG image if available
      locale: 'it_IT',
      type: 'website',
    },
  };
}

export default function TelegramCanaliSubcategoryPage({ params }: TelegramSubcategoryPageProps) {
  const { subcategorySlug } = params;
  const subcategory = getTelegramSubcategoryBySlug(subcategorySlug);

  if (!subcategory) {
    notFound();
  }

  const subcategoryName = capitalizeFirstLetter(subcategory.name);

  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Telegram', href: '/telegram' },
    { label: 'Canali', href: '/telegram/canali' },
    { label: subcategoryName, href: `/telegram/canali/${subcategorySlug}` },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-neutral-900">
      <main className="flex-grow container mx-auto px-4 py-8">
        <Breadcrumb items={breadcrumbItems} />

        <header className="my-8 text-center">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 dark:text-white mb-2">
            Canali Telegram: {subcategoryName}
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Elenco dei canali Telegram per la categoria "{subcategoryName}" in aggiornamento...
          </p>
        </header>

        <section className="max-w-4xl mx-auto my-12 p-8 bg-white dark:bg-neutral-800 rounded-lg shadow-md text-center">
          <p className="text-xl text-gray-700 dark:text-gray-300">
            🚧 Contenuti per {subcategoryName} in arrivo! Torna presto. 🚧
          </p>
          <Link href="/telegram/canali" className="mt-6 inline-block bg-pink-600 hover:bg-pink-700 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition-colors duration-300">
            Torna a Tutte le Categorie di Canali
          </Link>
        </section>
        
      </main>

      <Footer 
        currentCitySlug={undefined} 
        currentCategorySlug={undefined} 
        currentArticleSlug={undefined}
      />
    </div>
  );
} 