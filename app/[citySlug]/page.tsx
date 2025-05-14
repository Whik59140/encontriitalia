import { notFound } from 'next/navigation';
import Link from 'next/link';
// Image and Card, CardTitle will be removed or unused if we replace the old category display
import { getCityBySlug, getAllCities, getRegionalCities } from '@/lib/utils/geo';
import { getAllCategories } from '@/lib/utils/category-utils';
// import type { City } from '@/types/geo'; // Removed unused import
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import { ChevronRightCircle } from 'lucide-react'; // Import the icon
import { DirectEncounterCTA } from '@/components/common/direct-encounter-cta';
import { Footer } from '@/components/common/footer';
import { citySlugPageStrings } from '@/app/translations'; // Import translations
import { Button } from '@/components/ui/button'; // Import Button for categories
import { FaqSection } from '@/components/common/faq-section'; // Added import
import { SeoTextSection } from '@/components/common/seo-text-section'; // Added import

interface CityPageProps {
  params: Promise<{ citySlug: string }>;
  searchParams?: Promise<{ [key: string]: string | string[] | undefined; }>;
}

// Pre-render paths at build time
export async function generateStaticParams() {
  const cities = await getAllCities();
  return cities.map((city) => ({
    citySlug: city.slug,
  }));
}

// Generate metadata for each city page
export async function generateMetadata(props: CityPageProps) {
  const resolvedParams = await props.params;
  const citySlug = resolvedParams.citySlug;
  const city = await getCityBySlug(citySlug);
  if (!city) {
    return {
      title: citySlugPageStrings.notFoundTitle,
      description: citySlugPageStrings.notFoundDescription,
    };
  }
  return {
    title: citySlugPageStrings.generateMetadataTitle(city.name),
    description: citySlugPageStrings.generateMetadataDescription(city.name),
  };
}

export default async function CityPage(props: CityPageProps) {
  const resolvedParams = await props.params;
  const citySlug = resolvedParams.citySlug;
  const city = await getCityBySlug(citySlug);
  const categories = await getAllCategories();
  const { cities: regionalCities, regionName } = await getRegionalCities(citySlug);

  // categoryImageMap will be removed as images are no longer used for categories

  if (!city) {
    notFound(); // Triggers the 404 page
  }

  return (
    <div className="bg-gradient-to-br from-slate-50 via-gray-100 to-stone-200 dark:from-gray-800 dark:via-gray-900 dark:to-black min-h-screen flex flex-col">
      <main className="container mx-auto px-4 py-8 sm:py-12 flex-grow">
        <Breadcrumb className="mb-8">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">{citySlugPageStrings.breadcrumbHome}</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{city.name}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <header className="mb-8 text-center"> {/* Reduced bottom margin from mb-12 to mb-8 */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold 
                         bg-clip-text text-transparent 
                         bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 
                         dark:from-pink-400 dark:via-purple-400 dark:to-blue-400 mb-4">
            {citySlugPageStrings.headerTitle(city.name)}
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-6"> {/* Added bottom margin to separate from new buttons */}
            {citySlugPageStrings.headerDescription(city.name)}
          </p>
        </header>

        {/* New section for category buttons */}
        <div className="flex flex-row flex-wrap justify-center items-center gap-4 mb-12">
          {categories.map((category) => (
            <Link href={`/${city.slug}/${category.slug}`} key={category.slug} passHref>
              <Button 
                variant="outline" 
                className="px-6 py-4 text-lg font-semibold rounded-lg // Adjusted padding slightly for icon
                           flex items-center justify-center space-x-3 // Added flex for alignment and space
                           bg-white/80 dark:bg-gray-800/80 backdrop-blur-md
                           border-2 border-pink-500/70 dark:border-pink-400/70
                           text-pink-600 dark:text-pink-300 
                           hover:bg-pink-100 dark:hover:bg-pink-900/50
                           hover:text-pink-700 dark:hover:text-pink-200
                           hover:border-pink-600 dark:hover:border-pink-500
                           shadow-md hover:shadow-lg
                           transition-all duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105">
                <span className="text-2xl">{citySlugPageStrings.categoryEmojis[category.slug] || '✨'}</span> {/* Emoji with fallback */}
                <span>{category.name}</span>
                <ChevronRightCircle className="h-6 w-6 opacity-70 group-hover:opacity-100 transition-opacity" /> {/* Icon */}
              </Button>
            </Link>
          ))}
        </div>

        {/* MOVED DirectEncounterCTA HERE, below category buttons and above the removed popular categories comment */}
        <DirectEncounterCTA cityName={city.name} />

        {/* Removed old popular categories section with images */}

        {/* Added FAQ and SEO Text Sections for City Page */}
        <div className="mt-12 sm:mt-16">
          <FaqSection 
            cityDisplayName={city.name} 
            categoryDisplayName="Incontri" // Generic placeholder, not used by 'cityGeneral' strings
            subCategoryType="cityGeneral"
          />
                      </div>

        <div className="mt-12 sm:mt-16">
          <SeoTextSection 
            cityDisplayName={city.name} 
            categoryDisplayName="Incontri" // Generic placeholder, not used by 'cityGeneral' strings
            subCategoryType="cityGeneral"
          />
                    </div>

      </main>
      <Footer 
        currentCitySlug={citySlug} 
        regionalCities={regionalCities}
        regionName={regionName}
      />
    </div>
  );
} 