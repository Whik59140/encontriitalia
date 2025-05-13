import { getAllCitySlugs, getAllCategorySlugs } from '@/lib/utils/geo';

const URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.example.com';

function generateCityCategoryFeaturesSiteMap(citySlugs: string[], categorySlugs: string[]): string {
  const today = new Date().toISOString().split('T')[0];
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

  const features = ['chat', 'annunci'];

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
    });
  });

  xml += '</urlset>';
  return xml;
}

export async function GET() {
  const citySlugs = await getAllCitySlugs();
  const categorySlugs = await getAllCategorySlugs();
  const sitemap = generateCityCategoryFeaturesSiteMap(citySlugs, categorySlugs);

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
} 