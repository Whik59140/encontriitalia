import { CitySearchAndDisplay } from '@/components/common/city-search-display';
import { getAllCities } from '@/lib/utils/geo';
// Import the category links and types
import { categoryAffiliateLinks } from '@/lib/constants';
import { CategoryCtaButtonWithModal } from '@/components/common/category-cta-button-with-modal'; // Added
import { capitalizeSlug } from '@/lib/utils/string'; // Assuming it's in string.ts
import { homePageStrings } from '@/app/translations'; // Import translations
import { getInfluencers } from '@/lib/data-loader'; // Added for influencer data
import { InfluencerSearchAndDisplay } from '@/components/common/influencer-search-display'; // Added for influencer search
import Link from 'next/link'; // Added for the new button
// Types will be implicitly handled or can be imported from @/types/geo if needed explicitly

export default async function HomePage() {
  const cities = await getAllCities();
  const influencers = await getInfluencers(); // Fetch influencers
  const categoryDisplayNames = homePageStrings.categoryDisplayNames; // Use from translations

  return (
    <div className="bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 dark:from-gray-800 dark:via-gray-900 dark:to-black min-h-screen">
      <main className="container mx-auto px-4 pt-12 sm:pt-16 md:pt-20 pb-8 sm:pb-12 md:pb-16 flex flex-col items-center">
        {/* Removed Hero and DirectEncounterCTA */}

        {/* New Category CTA Section */}
        <section className="w-full max-w-3xl mb-12 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 dark:text-gray-100 mb-6">
            {homePageStrings.mainHeading}
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
            {homePageStrings.subHeading}
          </p>
          <p className="text-md font-medium text-green-600 dark:text-green-400 mb-8">
            {homePageStrings.highlightText}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {Object.entries(categoryAffiliateLinks).map(([slug, url]) => (
              <CategoryCtaButtonWithModal
                key={slug}
                affiliateUrl={url ?? '#'}
                buttonText={`${homePageStrings.categoryButtonPrefix}${categoryDisplayNames[slug] || capitalizeSlug(slug)}${homePageStrings.categoryButtonSuffix}`}
                categoryName={categoryDisplayNames[slug] || capitalizeSlug(slug)}
                className="block w-full px-6 py-4 bg-gradient-to-r from-pink-500 to-red-500 text-white text-lg font-semibold rounded-lg shadow-md hover:shadow-lg hover:scale-105 transition-all duration-200 ease-in-out"
              />
            ))}
            {/* Added Telegram Canali Link */}
            <Link href="/telegram/canali" passHref>
              <div className="block w-full px-6 py-4 bg-gradient-to-r from-blue-500 to-sky-500 text-white text-lg font-semibold rounded-lg shadow-md hover:shadow-lg hover:scale-105 transition-all duration-200 ease-in-out cursor-pointer text-center">
                {categoryDisplayNames['telegram-canali'] || 'Canali Telegram'}
              </div>
            </Link>
            {/* Added Telegram Gruppi Link */}
            <Link href="/telegram/gruppi" passHref>
              <div className="block w-full px-6 py-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white text-lg font-semibold rounded-lg shadow-md hover:shadow-lg hover:scale-105 transition-all duration-200 ease-in-out cursor-pointer text-center">
                {categoryDisplayNames['telegram-gruppi'] || 'Gruppi Telegram'}
              </div>
            </Link>
          </div>
        </section>

        {/* City Search and Display Section */}
        <section className="w-full mt-8 flex flex-col items-center">
          <h2 className="text-2xl sm:text-3xl font-semibold text-gray-700 dark:text-gray-200 mb-6">
            {homePageStrings.exploreByCityHeading}
          </h2>
          <CitySearchAndDisplay allCities={cities} itemsPerPage={15} />
        </section>

        {/* Influencer Search and Display Section - ADDED */}
        <section className="w-full mt-12 flex flex-col items-center">
          <h2 className="text-2xl sm:text-3xl font-semibold text-gray-700 dark:text-gray-200 mb-6">
            {homePageStrings.exploreByInfluencerHeading || 'Explore by Influencer'} {/* Added a fallback text */}
          </h2>
          <InfluencerSearchAndDisplay allInfluencers={influencers} itemsPerPage={10} />
          <div className="mt-8">
            <Link href="/influencers" passHref>
              <div className="px-8 py-3 bg-pink-600 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-pink-700 hover:shadow-lg transition-all duration-200 ease-in-out cursor-pointer">
                {homePageStrings.viewAllInfluencersButton}
              </div>
            </Link>
          </div>
        </section>
        
        {/* Placeholder for other sections like 'How it Works' */}

      </main>
      {/* TODO: Create and add a proper Footer component */}
    </div>
  );
}
