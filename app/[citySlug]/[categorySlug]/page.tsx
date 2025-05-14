import fs from 'fs/promises';
import path from 'path';
import Link from 'next/link';
import matter from 'gray-matter'; // For parsing frontmatter
import { CtaSection } from '@/components/common/cta-section';
import { Footer } from '@/components/common/footer'; // Changed to named import
import { getRegionalCities } from '@/lib/utils/geo'; // Import getRegionalCities
import { WebcamCtaButton } from '@/components/common/webcam-cta-button'; // Import the new component
import { categoryAffiliateLinks, type AffiliateCategory } from '@/lib/constants'; // <<< IMPORT THE CENTRALIZED MAP
import { homePageStrings, cityCategoryPageStrings } from '@/app/translations'; // Import translations
import { FaqSection } from '@/components/common/faq-section'; // Added import
import { SeoTextSection } from '@/components/common/seo-text-section'; // Added import

// --- REMOVE Configuration for Affiliate Link --- 
// const AFFILIATE_LINK_TEMPLATE = 'https://affiliate.example.com/register?campaign={categorySlug}&location={citySlug}&tracking_id=your_id';

// --- Helper Functions & Data ---
function capitalizeCityName(slug: string): string { // Restored
  if (!slug) return '';
  return slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
}

// CATEGORY_DISPLAY_NAMES is now taken from homePageStrings.categoryDisplayNames

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
              const citySlugValue = cityDir.name;
              // Ensure we don't add duplicates if somehow a city/category combo is processed twice
              if (!paramsList.some(p => p.citySlug === citySlugValue && p.categorySlug === categorySlug)) {
                paramsList.push({ citySlug: citySlugValue, categorySlug });
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
  const { cities: regionalCities, regionName } = await getRegionalCities(citySlug); // Fetch regional cities
  
  // Updated directory path to scan for articles for this specific city/category combination
  const articlesParentDirectory = path.join(process.cwd(), 'content', 'articles', categorySlug, citySlug);
  const articles: ArticleEntry[] = [];
  const CATEGORY_DISPLAY_NAMES = homePageStrings.categoryDisplayNames; // Use from translations

  try {
    const filenames = await fs.readdir(articlesParentDirectory);
    for (const filename of filenames) {
      // Expecting filenames like [articleSlug].md, e.g., "index.md", "overview.md"
      if (filename.endsWith('.md')) {
        const articleSlugFromFile = filename.replace('.md', '');
        const filePath = path.join(articlesParentDirectory, filename);
        const fileContent = await fs.readFile(filePath, 'utf8');
        const { data } = matter(fileContent);
        
        articles.push({
          title: data.title || cityCategoryPageStrings.untitledArticle,
          description: data.description,
          url: `/${citySlug}/${categorySlug}/${articleSlugFromFile}`,
          city: data.cityName || capitalizeCityName(citySlug),
          category: data.categoryName || CATEGORY_DISPLAY_NAMES[categorySlug] || capitalizeCityName(categorySlug),
          articleSlug: articleSlugFromFile
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

  const displayNameForCity = capitalizeCityName(citySlug);
  const displayNameForCategory = CATEGORY_DISPLAY_NAMES[categorySlug] || capitalizeCityName(categorySlug);

  const pageTitleText = cityCategoryPageStrings.pageTitle(displayNameForCity, displayNameForCategory);

  // Construct dynamic affiliate link from the centralized map
  const dynamicAffiliateLink = categoryAffiliateLinks[categorySlug as AffiliateCategory] || cityCategoryPageStrings.defaultFallbackLink; // Fallback if slug not in map

  const ctaTitleText = cityCategoryPageStrings.ctaTitle(displayNameForCategory, displayNameForCity);
  const ctaSubtitleText = cityCategoryPageStrings.ctaSubtitle;

    return (
    <div className="container mx-auto p-4 flex flex-col min-h-screen">
      <main className="flex-grow">
        <h1 className="text-3xl font-bold mb-6">
          {pageTitleText}
        </h1>

        {/* Webcam CTA Button added at the top */}
        <div className="my-8 flex justify-center">
          <WebcamCtaButton 
            cityDisplayName={displayNameForCity}
            categoryDisplayName={displayNameForCategory}
            categorySlug={categorySlug}
          />
        </div>

        {/* Link to the new Annunci CHOOSER page */}
        <div className="my-8 text-center"> 
          <Link 
            href={`/${citySlug}/${categorySlug}/annunci`}
            className="inline-block bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-semibold py-3 px-8 rounded-lg shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 text-lg sm:text-xl"
          >
            {cityCategoryPageStrings.viewAllAdsLink(displayNameForCategory, displayNameForCity)}
          </Link>
      </div>

        {articles.length === 0 ? (
          <p className="text-center text-gray-600 py-8">{cityCategoryPageStrings.noArticlesFound}</p>
        ) : (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((article) => (
              <div key={article.url} className="border p-4 rounded-lg shadow hover:shadow-md flex flex-col justify-between">
                <div>
            <h2 className="text-xl font-semibold mb-2">
              <Link href={article.url} className="hover:text-blue-600">
                {article.title}
              </Link>
            </h2>
            {article.description && (
              <p className="text-gray-700 text-sm mb-3">{article.description}</p>
            )}
                </div>
                <Link href={article.url} className="text-blue-500 hover:underline text-sm mt-auto self-start">
                  {cityCategoryPageStrings.readMoreButtonText}
            </Link>
          </div>
        ))}
      </div>
        )}
        {/* CtaSection Restored with user-specified props */}
        <CtaSection 
          title={ctaTitleText}
          subtitle={ctaSubtitleText}
          description={cityCategoryPageStrings.ctaSectionDescription}
          buttonText={cityCategoryPageStrings.ctaSectionButtonText}
          buttonLink={dynamicAffiliateLink}
          isExternalLink={true}
          linkTarget="_blank"
        />

        {/* Added FAQ and SEO Text Sections for City-Category Page */}
        <div className="mt-12 sm:mt-16">
          <FaqSection 
            cityDisplayName={displayNameForCity} 
            categoryDisplayName={displayNameForCategory} 
            subCategoryType="incontri" // Use 'incontri' for general category pages
          />
        </div>

        <div className="mt-12 sm:mt-16">
          <SeoTextSection 
            cityDisplayName={displayNameForCity} 
            categoryDisplayName={displayNameForCategory} 
            subCategoryType="incontri" // Use 'incontri' for general category pages
          />
        </div>

      </main>
      <Footer 
        currentCitySlug={citySlug} 
        currentCategorySlug={categorySlug} 
        regionalCities={regionalCities}
        regionName={regionName}
      />
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