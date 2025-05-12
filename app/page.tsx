import { CitySearchAndDisplay } from '@/components/common/city-search-display';
import { getAllCities } from '@/lib/utils/geo';
// Import the category links and types
import { categoryAffiliateLinks } from '@/lib/constants';
import Link from 'next/link'; // Import Link for navigation
// Types will be implicitly handled or can be imported from @/types/geo if needed explicitly

// Simple mapping for category slugs to display names (adjust as needed)
const categoryDisplayNames: { [key: string]: string } = {
  'incontri': 'Incontri',
  'trans': 'Trans',
  'bakeca': 'Bakeca',
  'milf': 'Milf',
  'massaggi': 'Massaggi',
  // Add other categories as defined in categoryAffiliateLinks
};

export default async function HomePage() {
  const cities = await getAllCities();

  return (
    <div className="bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 dark:from-gray-800 dark:via-gray-900 dark:to-black min-h-screen">
      <main className="container mx-auto px-4 pt-12 sm:pt-16 md:pt-20 pb-8 sm:pb-12 md:pb-16 flex flex-col items-center">
        {/* Removed Hero and DirectEncounterCTA */}

        {/* New Category CTA Section */}
        <section className="w-full max-w-3xl mb-12 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 dark:text-gray-100 mb-6">
            Trova quello che cerchi nella tua città!
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
            Seleziona la categoria di tuo interesse per iniziare.
          </p>
          <p className="text-md font-medium text-green-600 dark:text-green-400 mb-8">
            ✨ È Gratis, Senza Numero di Telefono, Registrazione in 30 Secondi! ✨
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {Object.entries(categoryAffiliateLinks).map(([slug, url]) => (
              <Link
                key={slug}
                href={url ?? '#'} // Use '#' as fallback if URL is somehow undefined
                target="_blank"
                rel="noopener noreferrer sponsored"
                className="block w-full px-6 py-4 bg-gradient-to-r from-pink-500 to-red-500 text-white text-lg font-semibold rounded-lg shadow-md hover:shadow-lg hover:scale-105 transition-all duration-200 ease-in-out"
              >
                Sto cercando {categoryDisplayNames[slug] || slug} 👉
              </Link>
            ))}
          </div>
        </section>

        {/* City Search and Display Section */}
        <section className="w-full mt-8 flex flex-col items-center">
          <h2 className="text-2xl sm:text-3xl font-semibold text-gray-700 dark:text-gray-200 mb-6">
            Oppure, esplora per città:
          </h2>
          <CitySearchAndDisplay allCities={cities} itemsPerPage={15} />
        </section>
        
        {/* Placeholder for other sections like 'How it Works' */}

      </main>
      {/* TODO: Create and add a proper Footer component */}
    </div>
  );
}
