import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

// --- Configuration ---
const BASE_URL = 'https://www.incontri-italia.it';
const GEO_JSON_PATH = path.join(process.cwd(), 'lib', 'data', 'geo.json');

interface CityInfo {
  slug: string;
  name: string;
}

// Helper function to get all city slugs (can be shared or duplicated)
async function getAllCitySlugs(): Promise<string[]> {
  try {
    const fileContent = await fs.readFile(GEO_JSON_PATH, 'utf8');
    const jsonData: Record<string, CityInfo[]> = JSON.parse(fileContent);
    const citySlugs = new Set<string>();
    Object.values(jsonData).forEach(regionCities => {
      regionCities.forEach(city => citySlugs.add(city.slug));
    });
    return Array.from(citySlugs).sort();
  } catch (error) {
    console.error('[Sitemap Index Route] Error reading or parsing geo.json:', error);
    return [];
  }
}

export async function GET() {
  const citySlugs = await getAllCitySlugs();
  const currentDate = new Date().toISOString();

  // Start the sitemap index XML
  let xml = '<?xml version="1.0" encoding="UTF-8"?>';
  xml += '<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">';

  // Add the global sitemap
  xml += `
    <sitemap>
      <loc>${BASE_URL}/sitemap/global.xml</loc>
      <lastmod>${currentDate}</lastmod>
    </sitemap>`;

  // Add sitemaps for each city
  citySlugs.forEach(slug => {
    xml += `
    <sitemap>
      <loc>${BASE_URL}/sitemap/${slug}.xml</loc>
      <lastmod>${currentDate}</lastmod>
    </sitemap>`;
  });

  // Close the sitemap index XML
  xml += '\n</sitemapindex>';

  // Return the XML response
  return new NextResponse(xml, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 's-maxage=86400, stale-while-revalidate', // Cache for 1 day
    },
  });
} 