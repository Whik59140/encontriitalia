import { getAllCitySlugs } from '@/lib/utils/geo';
import { getAllCategorySlugs } from '@/lib/utils/category-utils';

const URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.example.com';

function generateCityCategoryFeaturesSiteMap(citySlugs: string[], categorySlugs: string[]): string {
  const today = new Date().toISOString().split('T')[0];
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

  const features = ['chat', 'annunci', 'annunci-gratis', 'annunci-sesso', 'annunci-incontri'];

  citySlugs.forEach(citySlug => {
    categorySlugs.forEach(categorySlug => {
      features.forEach(feature => {
        xml += '  <url>\n';
        xml += `    <loc>${URL}/${citySlug}/${categorySlug}/${feature}</loc>\n`;
        xml += `    <lastmod>${today}</lastmod>\n`;
        xml += '    <changefreq>weekly</changefreq>\n'; // Adjust frequency as needed
        xml += '    <priority>0.6</priority>\n'; // Adjust priority as needed
        xml += '  </url>\n';
      });

      xml += '  <url>\n';
      xml += `    <loc>${URL}/${citySlug}/${categorySlug}/incontri-${categorySlug}-in-${citySlug}</loc>\n`;
      xml += `    <lastmod>${today}</lastmod>\n`;
      xml += '    <changefreq>weekly</changefreq>\n';
      xml += '    <priority>0.8</priority>\n'; // Higher priority for article pages
      xml += '  </url>\n';
    });
  });

  xml += '</urlset>';
  return xml;
}

export async function GET() {
  const citySlugs = await getAllCitySlugs();
  // Corrected: getAllCategorySlugs is not async and imported from category-utils
  const categorySlugs = getAllCategorySlugs();
  const sitemap = generateCityCategoryFeaturesSiteMap(citySlugs, categorySlugs);

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
} 