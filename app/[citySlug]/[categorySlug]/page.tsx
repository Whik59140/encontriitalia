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

interface PageProps {
  params: {
    citySlug: string;
    categorySlug: string;
  };
}

// This function tells Next.js about the possible city/category paths for these listing pages.
export async function generateStaticParams() {
  // You'll need to list all unique citySlug/categorySlug combinations
  // for which you expect to have listing pages.
  // This could be derived from geo.json or by scanning generated article directories.
  // Example: if content/articles/gay/atri/ exists, return { citySlug: 'atri', categorySlug: 'gay' }
  return []; 
}


export default async function CategoryListingPage({ params }: PageProps) {
  const { citySlug, categorySlug } = params;
  
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
      console.log(`No articles found for ${categorySlug}/${citySlug} or directory does not exist: ${error.message}`);
    } else {
      console.log(`No articles found for ${categorySlug}/${citySlug} or directory does not exist: An unknown error occurred`);
    }
  }

  if (articles.length === 0) {
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">
          Articles for {params.citySlug} / {params.categorySlug}
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