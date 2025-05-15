import Link from 'next/link';
import { Metadata } from 'next';
import { telegramChooserPageStrings, globalSiteStrings } from '@/app/translations'; 
// Assuming Breadcrumb and Footer components exist and can be imported
import Breadcrumb from '@/components/common/breadcrumb'; // Placeholder import
import { Footer } from '@/components/common/footer'; // Corrected import

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: `${telegramChooserPageStrings.metadataTitle} - ${globalSiteStrings.siteName}`,
    description: telegramChooserPageStrings.metadataDescription,
    keywords: telegramChooserPageStrings.metadataKeywords.join(', '),
    openGraph: {
      title: `${telegramChooserPageStrings.metadataTitle} - ${globalSiteStrings.siteName}`,
      description: telegramChooserPageStrings.metadataDescription,
      url: '/telegram',
      siteName: globalSiteStrings.siteName,
      images: [
        {
          url: '/images/og-image-telegram.webp', // Replace with actual OG image path
          width: 1200,
          height: 630,
          alt: telegramChooserPageStrings.metadataTitle,
        },
      ],
      locale: 'it_IT',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${telegramChooserPageStrings.metadataTitle} - ${globalSiteStrings.siteName}`,
      description: telegramChooserPageStrings.metadataDescription,
      // images: ['/images/twitter-image-telegram.webp'], // Replace with actual Twitter image path
    },
  };
}

export default function TelegramChooserPage() {
  const breadcrumbItems = [
    { label: telegramChooserPageStrings.breadcrumbHome, href: '/' },
    { label: telegramChooserPageStrings.pageTitle, href: '/telegram' },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-neutral-900">
      <main className="flex-grow container mx-auto px-4 py-8">
        <Breadcrumb items={breadcrumbItems} />

        <header className="my-8 text-center">
          <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-2">
            {telegramChooserPageStrings.mainHeading}
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            {telegramChooserPageStrings.subHeading}
          </p>
        </header>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <Link href="/telegram/canali" className="block p-8 bg-white dark:bg-neutral-800 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 transform hover:scale-105">
            <h2 className="text-3xl font-semibold text-blue-600 dark:text-blue-400 mb-3">
              {telegramChooserPageStrings.canaliLinkText}
            </h2>
            <p className="text-gray-700 dark:text-gray-300">
              {telegramChooserPageStrings.canaliLinkSubtext}
            </p>
          </Link>

          <Link href="/telegram/gruppi" className="block p-8 bg-white dark:bg-neutral-800 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 transform hover:scale-105">
            <h2 className="text-3xl font-semibold text-green-600 dark:text-green-400 mb-3">
              {telegramChooserPageStrings.gruppiLinkText}
            </h2>
            <p className="text-gray-700 dark:text-gray-300">
              {telegramChooserPageStrings.gruppiLinkSubtext}
            </p>
          </Link>
        </section>

        {/* Optional: Add some descriptive text about Telegram in general or safety tips */}
        <section className="max-w-4xl mx-auto mt-12 p-6 bg-white dark:bg-neutral-800 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-3">Consigli per Telegram</h3>
          <p className="text-gray-700 dark:text-gray-300">
            Quando esplori canali e gruppi Telegram, ricorda sempre di prestare attenzione alla tua privacy e sicurezza. Non condividere informazioni personali con sconosciuti e fai attenzione ai link sospetti. Goditi la vasta gamma di contenuti e community che Telegram ha da offrire in modo responsabile!
          </p>
        </section>
      </main>

      <Footer 
        // Assuming Footer can handle missing props or has defaults
        currentCitySlug={undefined} 
        currentCategorySlug={undefined} 
        currentArticleSlug={undefined}
        // regionalCities={[]} // Pass empty or omit if not relevant
        // regionName={undefined} // Pass empty or omit if not relevant
      />
    </div>
  );
} 