import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

// --- Configuration ---
const BASE_URL = 'https://www.incontri-italia.it';
const ARTICLES_DIR = path.join(process.cwd(), 'content', 'articles');
const ID_SEPARATOR = '___'; // Must match separator in app/sitemap.ts

// ArticleInfo interface (duplicate or import if shared)
interface ArticleInfo {
  categorySlug: string;
  citySlug: string;
  articleSlug: string;
  fullPath: string;
  lastModified?: Date;
}

// findArticleFiles function (duplicate or import if shared)
async function findArticleFiles(dir: string): Promise<ArticleInfo[]> {
  let results: ArticleInfo[] = [];
  try {
    const entries = await fs.readdir(dir, { withFileTypes: true });
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
              results.push({ categorySlug, citySlug, articleSlug, fullPath, lastModified: stats.mtime });
            } catch (statError) {
              // Ignore stat errors, just don't include lastModified
              results.push({ categorySlug, citySlug, articleSlug, fullPath });
            }
          }
        }
      }
    }
  } catch (error) {
     // Only log errors if the directory should exist but is unreadable, ignore ENOENT
     if (error instanceof Error && 'code' in error && error.code !== 'ENOENT') {
      console.error(`[CityIndexSitemap] Error reading articles directory ${dir}:`, error);
    }
  }
  return results;
}

// This route generates the sitemap index for a specific city
export async function GET(
  request: Request, // Use Request type from Next Server
  { params }: { params: { citySlug: string } }
) {
  const citySlugFromParams = params.citySlug;
  if (!citySlugFromParams) {
    return new NextResponse('City slug is required', { status: 400 });
  }
  
  console.log(`[CityIndexSitemap] Generating index for city: ${citySlugFromParams}`);

  const allArticles = await findArticleFiles(ARTICLES_DIR);
  const cityArticles = allArticles.filter(article => article.citySlug === citySlugFromParams);
  const categoriesInThisCity = new Set<string>();
  cityArticles.forEach(article => categoriesInThisCity.add(article.categorySlug));

  const sortedCategories = Array.from(categoriesInThisCity).sort();
  const currentDate = new Date().toISOString();

  let xml = '<?xml version="1.0" encoding="UTF-8"?>';
  xml += '<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">';

  if (sortedCategories.length === 0) {
    console.warn(`[CityIndexSitemap] No categories found with articles for city: ${citySlugFromParams}`);
  } else {
    sortedCategories.forEach(categorySlug => {
      const sitemapFileId = `articles${ID_SEPARATOR}${citySlugFromParams}${ID_SEPARATOR}${categorySlug}`;
      // The actual path Next.js generates for files from app/sitemap.ts is /sitemap/[id].xml
      const sitemapUrl = `${BASE_URL}/sitemap/${sitemapFileId}.xml`; 
      
      xml += `
      <sitemap>
        <loc>${sitemapUrl}</loc>
        <lastmod>${currentDate}</lastmod>
      </sitemap>`;
    });
  }

  xml += '\n</sitemapindex>';

  return new NextResponse(xml, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 's-maxage=86400, stale-while-revalidate', // Cache for 1 day
    },
  });
} 