import { CitySearchAndDisplay } from '@/components/common/city-search-display';
import { getGeoData } from '@/lib/utils/geo';
// Types will be implicitly handled or can be imported from @/types/geo if needed explicitly

export default async function HomePage() {
  const geoData = await getGeoData();
  const cities = geoData.cities || [];

  return (
    <div className="bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 dark:from-gray-800 dark:via-gray-900 dark:to-black min-h-screen">
      <main className="container mx-auto px-4 py-8 sm:py-12 md:py-16 flex flex-col items-center">
        {/* Hero Section */}
        <section className="w-full max-w-3xl text-center py-12 md:py-16">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold \
                         bg-clip-text text-transparent \
                         bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 \
                         dark:from-pink-400 dark:via-purple-400 dark:to-blue-400 mb-6">
            Incontri Italia
          </h1>
          <p className="text-lg sm:text-xl text-gray-700 dark:text-gray-300 mb-10">
            Trova annunci e articoli per incontri nella tua città. Esplora, scopri, connettiti.
          </p>
          {/* Search input is now inside CitySearchAndDisplay */}
        </section>

        {/* City Search and Display Section */}
        <section className="w-full mt-0 md:mt-[-2rem] flex flex-col items-center">
          {/* The h2 title for "Esplora le Città" can be inside CitySearchAndDisplay or here */}
          {/* For now, let CitySearchAndDisplay handle its internal structure including titles if needed */}
          <CitySearchAndDisplay allCities={cities} itemsPerPage={15} />
        </section>
        
        {/* Placeholder for other sections like 'Featured Categories' or 'How it Works' */}

      </main>
      {/* TODO: Create and add a proper Footer component */}
    </div>
  );
}
