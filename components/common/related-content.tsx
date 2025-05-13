import Link from 'next/link';

interface ArticleLink {
  title: string;
  url: string;
}

interface PageLink {
  name: string;
  url: string;
}

interface RelatedContentProps {
  relatedArticles: ArticleLink[];
  categoryPage: PageLink;
  cityPage: PageLink;
}

export function RelatedContent({ 
  relatedArticles, 
  categoryPage, 
  cityPage 
}: RelatedContentProps) {
  if (relatedArticles.length === 0 && !categoryPage.url && !cityPage.url) {
    return null; // Don't render anything if there's no content to show
  }

  return (
    <aside className="mt-12 py-8 border-t border-gray-200 dark:border-gray-700">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6 text-center sm:text-left">
          Potrebbe interessarti anche:
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Related Articles Column (Optional) */}
          {relatedArticles.length > 0 && (
            <div className="md:col-span-2">
              <h3 className="text-xl font-medium text-gray-700 dark:text-gray-300 mb-3">
                Altri articoli in questa categoria:
              </h3>
              <ul className="space-y-2">
                {relatedArticles.map((article) => (
                  <li key={article.url}>
                    <Link 
                      href={article.url}
                      className="text-purple-600 dark:text-purple-400 hover:underline hover:text-purple-800 dark:hover:text-purple-300 transition-colors duration-150"
                    >
                      {article.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Navigation Links Column */}
          {(categoryPage.url || cityPage.url) && (
            <div className={`${relatedArticles.length > 0 ? '' : 'md:col-start-2'}`}> {/* Adjust grid position if no related articles */}
              <h3 className="text-xl font-medium text-gray-700 dark:text-gray-300 mb-3">
                Naviga:
              </h3>
              <ul className="space-y-2">
                {categoryPage.url && (
                  <li>
                    <Link 
                      href={categoryPage.url}
                      className="text-purple-600 dark:text-purple-400 hover:underline hover:text-purple-800 dark:hover:text-purple-300 transition-colors duration-150"
                    >
                      Altri annunci e articoli per {categoryPage.name} in {cityPage.name}
                    </Link>
                  </li>
                )}
                {cityPage.url && (
                  <li>
                    <Link 
                      href={cityPage.url}
                      className="text-purple-600 dark:text-purple-400 hover:underline hover:text-purple-800 dark:hover:text-purple-300 transition-colors duration-150"
                    >
                      Tutte le categorie per {cityPage.name}
                    </Link>
                  </li>
                )}
              </ul>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
} 