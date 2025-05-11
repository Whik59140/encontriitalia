import { getAllCities, getAllCategories } from '@/lib/utils/geo';
import type { MetadataRoute } from 'next';

const baseUrl = 'https://incontri-italia.it';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const currentDate = new Date().toISOString();

  const cities = await getAllCities();
  const categories = await getAllCategories();

  const sitemapEntries: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
  ];

  cities.forEach((city) => {
    sitemapEntries.push({
      url: `${baseUrl}/${city.slug}`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    });

    categories.forEach((category) => {
      sitemapEntries.push({
        url: `${baseUrl}/${city.slug}/${category.slug}`,
        lastModified: currentDate,
        changeFrequency: 'daily', // More specific pages might change more often if content is added
        priority: 0.6,
      });
    });
  });

  return sitemapEntries;
} 