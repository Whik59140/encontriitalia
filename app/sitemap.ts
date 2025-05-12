import { MetadataRoute } from 'next';
import fs from 'fs/promises';
import path from 'path';

// --- Configuration ---
const BASE_URL = 'https://www.incontri-italia.it';
const ARTICLES_DIR = path.join(process.cwd(), 'content', 'articles');
const GEO_JSON_PATH = path.join(process.cwd(), 'lib', 'data', 'geo.json');

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

// Removed generateSitemaps function

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  console.log('[Sitemap] Generating single sitemap...'); // Log start
  const allCitySlugs = await getAllCitySlugs();
  const allArticles = await findArticleFiles(ARTICLES_DIR);
  console.log(`[Sitemap] Total articles found: ${allArticles.length}`); // Log total articles
  const currentDate = new Date();
  const sitemapEntries: MetadataRoute.Sitemap = [];

  // 1. Homepage
  sitemapEntries.push({
    url: BASE_URL,
    lastModified: currentDate,
    changeFrequency: 'daily',
    priority: 1.0,
  });

  // 2. Top-level City Pages
  allCitySlugs.forEach(citySlug => {
    sitemapEntries.push({
      url: `${BASE_URL}/${citySlug}`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    });
  });

  // 3. City-Category Pages (only if articles exist)
  const cityCategoryPairs = new Set<string>();
  allArticles.forEach(article => {
    cityCategoryPairs.add(`${article.citySlug}:${article.categorySlug}`);
  });

  Array.from(cityCategoryPairs).sort().forEach(pair => {
    const [citySlug, categorySlug] = pair.split(':');
    sitemapEntries.push({
      url: `${BASE_URL}/${citySlug}/${categorySlug}`,
      lastModified: currentDate, // Could be refined based on newest article in this city-category
      changeFrequency: 'weekly',
      priority: 0.7,
    });
  });

  // 4. Article Pages
  allArticles.forEach(article => {
    sitemapEntries.push({
      url: `${BASE_URL}/${article.categorySlug}/${article.citySlug}/${article.articleSlug}`,
      lastModified: article.lastModified ?? currentDate,
      changeFrequency: 'monthly',
      priority: 0.6,
    });
  });

  console.log(`[Sitemap] Finished generating single sitemap. Entries: ${sitemapEntries.length}`); // Log end
  return sitemapEntries;
} 