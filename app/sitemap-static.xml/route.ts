const URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.example.com'; // Fallback, ensure NEXT_PUBLIC_BASE_URL is set in .env

function generateStaticSiteMap(): string {
  const today = new Date().toISOString().split('T')[0];

  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

  // Add homepage
  xml += '  <url>\n';
  xml += `    <loc>${URL}</loc>\n`;
  xml += `    <lastmod>${today}</lastmod>\n`;
  xml += '    <changefreq>daily</changefreq>\n';
  xml += '    <priority>1.0</priority>\n';
  xml += '  </url>\n';

  // Add other static pages here if you have them
  // For example:
  // xml += '  <url>\n';
  // xml += `    <loc>${URL}/about</loc>\n`;
  // xml += `    <lastmod>${today}</lastmod>\n`;
  // xml += '    <changefreq>monthly</changefreq>\n';
  // xml += '    <priority>0.7</priority>\n';
  // xml += '  </url>\n';

  xml += '</urlset>';
  return xml;
}

export async function GET() {
  const sitemap = generateStaticSiteMap();

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
} 