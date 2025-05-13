const URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.example.com'; // Fallback, ensure NEXT_PUBLIC_BASE_URL is set in .env

function generateSitemapIndex(): string {
  const today = new Date().toISOString().split('T')[0];

  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

  // List of your sitemap files
  const sitemaps = [
    'sitemap-static.xml',
    'sitemap-cities.xml',
    'sitemap-city-categories.xml',
    'sitemap-city-category-features.xml',
    // Add more sitemap files here if needed in the future
  ];

  sitemaps.forEach(sitemapFile => {
    xml += '  <sitemap>\n';
    xml += `    <loc>${URL}/${sitemapFile}</loc>\n`;
    xml += `    <lastmod>${today}</lastmod>\n`;
    xml += '  </sitemap>\n';
  });

  xml += '</sitemapindex>';
  return xml;
}

export async function GET() {
  const sitemapIndex = generateSitemapIndex();

  return new Response(sitemapIndex, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
} 