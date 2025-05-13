import { getAllCitySlugs } from '@/lib/utils/geo';

const URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.example.com';

function generateCitiesSiteMap(citySlugs: string[]): string {
  const today = new Date().toISOString().split('T')[0];
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

  citySlugs.forEach(slug => {
    xml += '  <url>\n';
    xml += `    <loc>${URL}/${slug}</loc>\n`;
    xml += `    <lastmod>${today}</lastmod>\n`;
    xml += '    <changefreq>weekly</changefreq>\n';
    xml += '    <priority>0.8</priority>\n';
    xml += '  </url>\n';
  });

  xml += '</urlset>';
  return xml;
}

export async function GET() {
  const citySlugs = await getAllCitySlugs();
  const sitemap = generateCitiesSiteMap(citySlugs);

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
} 