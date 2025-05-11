import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { getCityBySlug, getAllCategories, getAllCities } from '@/lib/utils/geo';
// import type { City, Category } from '@/types/geo'; // Removed as types are inferred
import { Card, CardTitle } from '@/components/ui/card';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import { DirectEncounterCTA } from '@/components/common/direct-encounter-cta';

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

export default async function CityPage(props: CityPageProps) {
  const resolvedParams = await props.params;
  const citySlug = resolvedParams.citySlug;
  const city = await getCityBySlug(citySlug);
  const categories = await getAllCategories();

  const categoryImageMap: { [key: string]: string } = {
    gay: '/buttons/gays.webp',
    milf: '/buttons/milf.webp',
    donne: '/buttons/donne.webp',
    ragazze: '/buttons/ragazze.webp',
    trans: '/buttons/trans.webp',
    trav: '/buttons/trans.webp', // Assuming trav uses the same image as trans
    escort: '/buttons/escort.webp',
    studentessa: '/buttons/studentessa.webp',
    adulti: '/buttons/adulti.webp',
  };

  if (!city) {
    notFound(); // Triggers the 404 page
  }

  return (
    <div className="bg-gradient-to-br from-slate-50 via-gray-100 to-stone-200 dark:from-gray-800 dark:via-gray-900 dark:to-black min-h-screen">
      <main className="container mx-auto px-4 py-8 sm:py-12">
        <DirectEncounterCTA cityName={city.name} />
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
            {categories.map((category) => {
              const imagePath = categoryImageMap[category.slug];
              return (
                <Link 
                  href={`/${city.slug}/${category.slug}`} 
                  key={category.slug} 
                  className="block hover:no-underline focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 rounded-lg group"
                >
                  <Card className="relative aspect-square overflow-hidden transition-all duration-300 ease-in-out group-hover:shadow-xl group-hover:border-purple-500 dark:group-hover:border-purple-400 bg-gray-800 border-transparent hover:border-gray-300 dark:hover:border-gray-700 rounded-lg">
                    {imagePath && (
                      <Image 
                        src={imagePath} 
                        alt={`${category.name} background`} 
                        layout="fill" 
                        objectFit="cover"
                        className="transition-transform duration-300 ease-in-out group-hover:scale-105"
                      />
                    )}
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-black/5 transition-opacity duration-300 ease-in-out flex flex-col justify-end">
                      <div className="p-4 bg-gradient-to-t from-black/60 via-black/30 to-transparent">
                        <CardTitle className="text-xl text-center font-bold text-white group-hover:text-purple-300 transition-colors duration-300">
                          Incontri {category.name}
                        </CardTitle>
                        <p className="text-xs text-center text-purple-200 group-hover:text-purple-100 transition-colors duration-300 mt-1">
                          Scopri di più
                        </p>
                      </div>
                    </div>
                  </Card>
                </Link>
              );
            })}
          </div>
        </section>
      </main>
    </div>
  );
} 