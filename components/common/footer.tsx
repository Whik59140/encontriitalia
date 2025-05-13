import Link from 'next/link';
import type { City } from '@/types/geo'; // Assuming City type is in @/types/geo

interface FooterProps {
  currentCitySlug?: string;
  currentCategorySlug?: string;
  currentArticleSlug?: string;
  regionalCities?: City[];
  regionName?: string | null;
}

export function Footer({ 
  currentCitySlug, 
  currentCategorySlug, 
  currentArticleSlug,
  regionalCities, 
  regionName 
}: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-gray-100 dark:bg-gray-800 py-8 mt-auto">
      <div className="container mx-auto px-4 text-gray-600 dark:text-gray-400">
        {regionalCities && regionalCities.length > 0 && regionName && (
          <div className="mb-6 text-center">
            <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-3">
              {currentArticleSlug ? `Leggi questo articolo in altre città del ${regionName}:` : `Altre città in ${regionName}:`}
            </h3>
            <ul className="flex flex-wrap justify-center gap-x-4 gap-y-2">
              {regionalCities.map((city) => {
                let linkHref = `/${city.slug}`;
                const linkText = city.name;

                if (currentArticleSlug && currentCategorySlug && currentCitySlug) {
                  // Replace the current city's slug within the article slug
                  // with the new regional city's slug.
                  const newArticleSlug = currentArticleSlug.replace(currentCitySlug, city.slug);
                  linkHref += `/${currentCategorySlug}/${newArticleSlug}`;
                } else if (currentCategorySlug) {
                  // Fallback for non-article links or if currentCitySlug/currentArticleSlug is missing
                  linkHref += `/${currentCategorySlug}`;
                }
                // Note: If only currentArticleSlug is present without category/citySlug, it defaults to city link `/${city.slug}`.
                // This case should ideally not happen for article-specific linking.

                return (
                  <li key={city.slug}>
                    <Link 
                      href={linkHref}
                      className="text-purple-600 dark:text-purple-400 hover:underline"
                    >
                      {linkText} {/* Display city name, context is in the heading */}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
        <div className="text-center"> {/* Ensure copyright and other links remain centered */}
          <p className="mb-2">
            &copy; {currentYear} Incontri Italia. Tutti i diritti riservati.
          </p>
          <p className="mb-2">
            Per contatti commerciali:{' '}
            <a 
              href="mailto:whiknat@gmail.com"
              className="text-purple-600 dark:text-purple-400 hover:underline"
            >
              whiknat@gmail.com
            </a>
          </p>
          <p>
            Realizzato da{' '}
            <Link 
              href="https://dolcedigital.xyz"
              target="_blank" 
              rel="noopener noreferrer follow"
              className="text-purple-600 dark:text-purple-400 hover:underline"
            >
              Dolce Digital
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
} 