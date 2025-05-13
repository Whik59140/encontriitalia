import { getAllCitySlugs } from '@/lib/utils/geo';
import { getAllCategorySlugs } from '@/lib/utils/category-utils';

const URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.example.com';

function generateCityCategoriesSiteMap(citySlugs: string[], categorySlugs: string[]): string {
  const today = new Date().toISOString().split('T')[0];
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

  citySlugs.forEach(citySlug => {
    categorySlugs.forEach(categorySlug => {
      xml += '  <url>\n';
      xml += `    <loc>${URL}/${citySlug}/${categorySlug}</loc>\n`;
      xml += `    <lastmod>${today}</lastmod>\n`;
      xml += '    <changefreq>weekly</changefreq>\n';
      xml += '    <priority>0.7</priority>\n';
      xml += '  </url>\n';
    });
  });

  xml += '</urlset>';
  return xml;
}

export async function GET() {
  const citySlugs = await getAllCitySlugs();
  const categorySlugs = getAllCategorySlugs();
  const sitemap = generateCityCategoriesSiteMap(citySlugs, categorySlugs);

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
} 