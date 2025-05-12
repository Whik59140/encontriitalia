import { CitySearchAndDisplay } from '@/components/common/city-search-display';
import { getAllCities } from '@/lib/utils/geo';
import { DirectEncounterCTA } from "@/components/common/direct-encounter-cta";
// Types will be implicitly handled or can be imported from @/types/geo if needed explicitly

export default async function HomePage() {
  const cities = await getAllCities();

  return (
    <div className="bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 dark:from-gray-800 dark:via-gray-900 dark:to-black min-h-screen">
      <main className="container mx-auto px-4 pt-0 pb-8 sm:pb-12 md:pb-16 flex flex-col items-center">
        {/* Hero Section Removed */}

        {/* Direct Encounter CTA Section - New */}
        <DirectEncounterCTA />

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
