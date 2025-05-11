import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getGeoData, getCityBySlug, getAllCategories, getAllCities } from '@/lib/utils/geo';
import type { City, Category } from '@/types/geo';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb"

interface CityPageProps {
  params: {
    citySlug: string;
  };
}

// Pre-render paths at build time
export async function generateStaticParams() {
  const cities = await getAllCities();
  return cities.map((city) => ({
    citySlug: city.slug,
  }));
}

// Generate metadata for each city page
export async function generateMetadata({ params }: CityPageProps) {
  const city = await getCityBySlug(params.citySlug);
  if (!city) {
    return {
      title: 'Città Non Trovata',
      description: 'La città che stai cercando non esiste.',
    };
  }
  return {
    title: `Incontri a ${city.name} - Annunci e Articoli per Adulti`,
    description: `Esplora categorie come gay, milf, donne, trans, escort a ${city.name}. Trova i migliori annunci e articoli. `,
    // Consider adding keywords or OpenGraph data here
  };
}

export default async function CityPage({ params }: CityPageProps) {
  const city = await getCityBySlug(params.citySlug);
  const categories = await getAllCategories();

  if (!city) {
    notFound(); // Triggers the 404 page
  }

  return (
    <div className="bg-gradient-to-br from-slate-50 via-gray-100 to-stone-200 dark:from-gray-800 dark:via-gray-900 dark:to-black min-h-screen">
      <main className="container mx-auto px-4 py-8 sm:py-12">
        <Breadcrumb className="mb-8">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{city.name}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <header className="mb-12 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold 
                         bg-clip-text text-transparent 
                         bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 
                         dark:from-pink-400 dark:via-purple-400 dark:to-blue-400 mb-4">
            Incontri a {city.name}
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Esplora le categorie disponibili per {city.name} e trova quello che cerchi.
          </p>
        </header>

        <section>
          <h2 className="text-2xl sm:text-3xl font-semibold text-center mb-8 text-gray-800 dark:text-white">
            Categorie Popolari a {city.name}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {categories.map((category) => (
              <Link 
                href={`/${city.slug}/${category.slug}`} 
                key={category.slug} 
                className="block hover:no-underline focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 rounded-lg group"
              >
                <Card className="h-full overflow-hidden transition-all duration-300 ease-in-out group-hover:shadow-xl group-hover:border-purple-500 dark:group-hover:border-purple-400 bg-white dark:bg-gray-800 border-transparent hover:border-gray-300 dark:hover:border-gray-700">
                  <CardHeader className="p-5 bg-gradient-to-tr from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 group-hover:from-pink-50 group-hover:to-purple-100 dark:group-hover:from-pink-700 dark:group-hover:to-purple-800 transition-colors duration-300">
                    <CardTitle className="text-xl text-center font-bold text-gray-700 dark:text-gray-200 group-hover:text-purple-600 dark:group-hover:text-purple-300 transition-colors duration-300">
                      {category.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-5 text-center">
                    <p className="text-sm text-gray-500 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-200 transition-colors duration-300">
                      Esplora annunci di {category.name.toLowerCase()} a {city.name}
                    </p>
                    {/* TODO: Maybe add an icon or a count of articles/listings in the future */}
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
} 