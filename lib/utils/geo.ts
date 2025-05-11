import fs from 'fs';
import path from 'path';
import type { GeoData } from '@/types/geo';

const filePath = path.join(process.cwd(), 'lib', 'data', 'geo.json');

let cachedGeoData: GeoData | null = null;

export async function getGeoData(): Promise<GeoData> {
  // In a real app, consider more robust caching or on-demand reading if the file is huge or changes.
  // For now, simple in-memory cache after first read.
  if (cachedGeoData) {
    return cachedGeoData;
  }
  try {
    const jsonData = fs.readFileSync(filePath, 'utf-8');
    cachedGeoData = JSON.parse(jsonData) as GeoData;
    return cachedGeoData;
  } catch (error) {
    console.error("Failed to read or parse geo.json:", error);
    // Return empty arrays as a fallback to prevent crashes, or re-throw
    return { cities: [], categories: [] }; 
  }
}

export async function getCityBySlug(citySlug: string) {
  const { cities } = await getGeoData();
  return cities.find(city => city.slug === citySlug) || null;
}

export async function getAllCategories() {
  const { categories } = await getGeoData();
  return categories;
}

export async function getAllCities() {
  const { cities } = await getGeoData();
  return cities;
} 