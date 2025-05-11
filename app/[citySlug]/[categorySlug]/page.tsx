import fs from 'fs/promises';
import path from 'path';
import Link from 'next/link';
import matter from 'gray-matter'; // For parsing frontmatter

interface ArticleEntry {
  title: string;
  description?: string;
  url: string;
  city?: string;
  category?: string;
  articleSlug: string;
}

// Interface for the resolved params object for the listing page
interface ResolvedListingPageParams {
  citySlug: string;
  categorySlug: string;
}

// This function tells Next.js about the possible city/category paths for these listing pages.
export async function generateStaticParams(): Promise<{ citySlug: string; categorySlug: string; }[]> {
  const rootArticlesDir = path.join(process.cwd(), 'content', 'articles');
  const paramsList: { citySlug: string; categorySlug: string; }[] = [];

  try {
    const categoryDirs = await fs.readdir(rootArticlesDir, { withFileTypes: true });

    for (const categoryDir of categoryDirs) {
      if (categoryDir.isDirectory()) {
        const categorySlug = categoryDir.name;
        const cityDirsPath = path.join(rootArticlesDir, categorySlug);
        
        try {
          const cityDirs = await fs.readdir(cityDirsPath, { withFileTypes: true });
          for (const cityDir of cityDirs) {
            if (cityDir.isDirectory()) {
              const citySlug = cityDir.name;
              // Ensure we don't add duplicates if somehow a city/category combo is processed twice
              if (!paramsList.some(p => p.citySlug === citySlug && p.categorySlug === categorySlug)) {
                paramsList.push({ citySlug, categorySlug });
              }
            }
          }
        } catch (cityError) {
          // Log error if reading city subdirectories fails, but continue
          console.warn(`Could not read city directories in ${cityDirsPath}:`, cityError instanceof Error ? cityError.message : cityError);
        }
      }
    }
  } catch (rootError) {
    // Log error if reading root articles directory fails
    console.error(`Could not read root articles directory ${rootArticlesDir}:`, rootError instanceof Error ? rootError.message : rootError);
    // Depending on your needs, you might want to throw here or return empty if essential
  }
  
  if (paramsList.length === 0) {
    console.warn("[generateStaticParams for Listing Page] No city/category paths found. Listing pages might not be pre-rendered correctly.");
  }
  // console.log("[generateStaticParams for Listing Page] Generated params:", paramsList);
  return paramsList; 
}


export default async function CategoryListingPage({ params }: { params: Promise<ResolvedListingPageParams> }) {
  const { citySlug, categorySlug }: ResolvedListingPageParams = await params;
  
  // Updated directory path to scan for articles for this specific city/category combination
  const articlesParentDirectory = path.join(process.cwd(), 'content', 'articles', categorySlug, citySlug);
  const articles: ArticleEntry[] = [];

  try {
    const filenames = await fs.readdir(articlesParentDirectory);
    for (const filename of filenames) {
      // Expecting filenames like [articleSlug].md, e.g., "index.md", "overview.md"
      if (filename.endsWith('.md')) {
        const articleSlug = filename.replace('.md', '');
        const filePath = path.join(articlesParentDirectory, filename);
        const fileContent = await fs.readFile(filePath, 'utf8');
        const { data } = matter(fileContent);
        
        articles.push({
          title: data.title || 'Untitled Article',
          description: data.description,
          url: `/${citySlug}/${categorySlug}/${articleSlug}`,
          city: data.cityName || citySlug, // Using cityName from frontmatter if available
          category: data.categoryName || categorySlug, // Using categoryName from frontmatter
          articleSlug: articleSlug
        });
      }
    }
  } catch (error) {
    // If the directory doesn't exist (e.g., no articles for this city/cat), readdir will fail.
    // It's not necessarily an error for the page, could just mean no articles.
    if (error instanceof Error) {
      console.log(`Directory or file access error for ${categorySlug}/${citySlug}:`, error.message);
    } else {
      console.log(`An unknown error occurred while accessing articles for ${categorySlug}/${citySlug}:`, error);
    }
  }

  if (articles.length === 0) {
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">
          Articles for {citySlug} / {categorySlug}
        </h1>
        <p>No specific articles found for this category yet. Check back soon!</p>
        {/* You could link back to the main city page or homepage */}
      </div>
    );
  }

  // You'll want to use your site's layout, proper card components, styling etc.
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">
        Articles for: {articles[0]?.city || citySlug} / {articles[0]?.category || categorySlug}
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((article) => (
          <div key={article.url} className="border p-4 rounded-lg shadow hover:shadow-md">
            <h2 className="text-xl font-semibold mb-2">
              <Link href={article.url} className="hover:text-blue-600">
                {article.title}
              </Link>
            </h2>
            {article.description && (
              <p className="text-gray-700 text-sm mb-3">{article.description}</p>
            )}
            <Link href={article.url} className="text-blue-500 hover:underline text-sm">
              Read more &rarr;
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

// Optional: Metadata for the listing page
// export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
//   // You might want to fetch the display name for city/category from geo.json
//   return {
//     title: `Articles for ${params.citySlug} in ${params.categorySlug}`,
//     description: `Browse all articles related to ${params.categorySlug} in ${params.citySlug}.`
//   };
// } 