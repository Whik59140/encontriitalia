import { MetadataRoute } from 'next';
import fs from 'fs/promises';
import path from 'path';

// --- Configuration ---
const BASE_URL = 'https://www.incontri-italia.it';
const ARTICLES_DIR = path.join(process.cwd(), 'content', 'articles');
const GEO_JSON_PATH = path.join(process.cwd(), 'lib', 'data', 'geo.json');
const ID_SEPARATOR = '___'; // Separator for complex IDs, must match other sitemap files

// Define all available categories (copied from generate-articles.mjs)
// Removed as it's not used in the current logic
// const ALL_CATEGORIES = [
//   { slug: 'gay', name: 'Gay' },
//   { slug: 'milf', name: 'Milf' },
//   { slug: 'donne', name: 'Donne' },
//   { slug: 'ragazze', name: 'Ragazze' },
//   { slug: 'trans', name: 'Trans' },
//   { slug: 'trav', name: 'Trav' },
//   { slug: 'escort', name: 'Escort' },
//   { slug: 'studentessa', name: 'Studentessa' },
//   { slug: 'adulti', name: 'Adulti' },
// ];

interface CityInfo {
  slug: string;
  name: string;
}

interface ArticleInfo {
  categorySlug: string;
  citySlug: string;
  articleSlug: string; // e.g., incontri-trans-in-roma
  fullPath: string;
  lastModified?: Date;
}

// Helper function to get all city slugs from geo.json
async function getAllCitySlugs(): Promise<string[]> {
  // console.log('[Sitemap] Attempting to read geo.json...'); // Log start (Optional: uncomment for debugging)
  try {
    const fileContent = await fs.readFile(GEO_JSON_PATH, 'utf8');
    // console.log('[Sitemap] Successfully read geo.json.'); // Log success (Optional: uncomment for debugging)
    const jsonData: Record<string, CityInfo[]> = JSON.parse(fileContent);
    const citySlugs = new Set<string>();
    Object.values(jsonData).forEach(regionCities => {
      regionCities.forEach(city => citySlugs.add(city.slug));
    });
    const slugsArray = Array.from(citySlugs).sort(); // Sort for consistent sitemap generation
    // console.log(`[Sitemap] Found ${slugsArray.length} city slugs.`); // Log count (Optional: uncomment for debugging)
    return slugsArray;
  } catch (error) {
    console.error('[Sitemap] Error reading or parsing geo.json:', error);
    return [];
  }
}

// Helper function to recursively find all article markdown files
async function findArticleFiles(dir: string): Promise<ArticleInfo[]> {
  // console.log(`[Sitemap] Attempting to find articles in: ${dir}`); // Log start (Optional: uncomment for debugging)
  let results: ArticleInfo[] = [];
  try {
    const entries = await fs.readdir(dir, { withFileTypes: true });
    // console.log(`[Sitemap] Found ${entries.length} entries in ${dir}`); // Log entries found (Optional: uncomment for debugging)
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        results = results.concat(await findArticleFiles(fullPath));
      } else if (entry.isFile() && entry.name.endsWith('.md')) {
        const relativePath = path.relative(ARTICLES_DIR, fullPath);
        const parts = relativePath.split(path.sep);
        if (parts.length === 3) {
          const [categorySlug, citySlug, fileName] = parts;
          const articleSlug = fileName.replace(/\.md$/, '');
          if (articleSlug === `incontri-${categorySlug}-in-${citySlug}`) {
            try {
              const stats = await fs.stat(fullPath);
              results.push({
                categorySlug,
                citySlug,
                articleSlug,
                fullPath,
                lastModified: stats.mtime,
              });
            } catch (statError) {
              console.warn(`[Sitemap] Could not get stats for ${fullPath}:`, statError);
              results.push({ categorySlug, citySlug, articleSlug, fullPath });
            }
          }
        }
      }
    }
  } catch (error) {
    if (error instanceof Error && 'code' in error && error.code !== 'ENOENT') {
      console.error(`[Sitemap] Error reading articles directory ${dir}:`, error);
    } else if (!(error instanceof Error && 'code' in error && error.code === 'ENOENT')) {
       console.error(`[Sitemap] Unexpected error reading directory ${dir}:`, error);
    }
  }
  // console.log(`[Sitemap] Finished finding articles in ${dir}. Total found so far: ${results.length}`); // Log end (Optional: uncomment for debugging)
  return results;
}

export async function generateSitemaps() {
  console.log('[AppSitemap/Leaf] Generating sitemap IDs for leaf sitemaps (global & city-category-articles)...');
  const articles = await findArticleFiles(ARTICLES_DIR);
  const cityCategoryPairs = new Set<string>();
  articles.forEach(article => {
    cityCategoryPairs.add(`${article.citySlug}${ID_SEPARATOR}${article.categorySlug}`);
  });

  const sitemapIds = [{ id: 'global' }]; // For /sitemap/global.xml

  Array.from(cityCategoryPairs).sort().forEach(pair => {
    const [citySlug, categorySlug] = pair.split(ID_SEPARATOR);
    // This ID will be used by Next.js to generate file like /sitemap/articles___city___category.xml
    sitemapIds.push({ id: `articles${ID_SEPARATOR}${citySlug}${ID_SEPARATOR}${categorySlug}` });
  });

  console.log(`[AppSitemap/Leaf] Generated ${sitemapIds.length} IDs for leaf sitemaps.`);
  return sitemapIds;
}

export default async function sitemap({ id }: { id: string }): Promise<MetadataRoute.Sitemap> {
  console.log(`[AppSitemap/Leaf] Generating sitemap content for leaf ID: ${id}`);
  const currentDate = new Date();
  const sitemapEntries: MetadataRoute.Sitemap = [];

  if (id === 'global') {
    sitemapEntries.push({
      url: BASE_URL,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 1.0,
    });
    const citySlugs = await getAllCitySlugs();
    citySlugs.forEach(citySlug => {
      sitemapEntries.push({
        url: `${BASE_URL}/${citySlug}`,
        lastModified: currentDate,
        changeFrequency: 'weekly',
        priority: 0.8,
      });
    });
  } else if (id.startsWith(`articles${ID_SEPARATOR}`)) {
    const parts = id.split(ID_SEPARATOR);
    // articles___citySlug___categorySlug
    if (parts.length !== 3) { // Check for correct number of parts
        console.error(`[AppSitemap/Leaf] Invalid articles ID format: ${id}. Expected 3 parts, got ${parts.length}.`);
        return [];
    }
    const citySlug = parts[1];
    const categorySlug = parts[2];

    if (!citySlug || !categorySlug) {
      console.error(`[AppSitemap/Leaf] Invalid city or category slug from ID: ${id}`);
      return [];
    }

    // Add the city-category page itself
    sitemapEntries.push({
      url: `${BASE_URL}/${citySlug}/${categorySlug}`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.7,
    });

    const allArticles = await findArticleFiles(ARTICLES_DIR);
    const relevantArticles = allArticles.filter(
      article => article.citySlug === citySlug && article.categorySlug === categorySlug
    );

    relevantArticles.forEach(article => {
      sitemapEntries.push({
        url: `${BASE_URL}/${article.categorySlug}/${article.citySlug}/${article.articleSlug}`,
        lastModified: article.lastModified ?? currentDate,
        changeFrequency: 'monthly',
        priority: 0.6,
      });
    });
  }

  console.log(`[AppSitemap/Leaf] Finished sitemap for leaf ID: ${id}. Entries: ${sitemapEntries.length}`);
  return sitemapEntries;
} 