import fs from 'fs/promises';
import path from 'path';
import type { City } from '@/types/geo'; // Import City type only, Category is not used here directly anymore

// Define interfaces for better type safety - REMOVED
// interface City { ... }
// interface Category { ... }

interface GeoJsonData {
  [region: string]: Omit<City, 'region'>[]; // Keys are regions, values are arrays of cities without region prop
}

const geoJsonPath = path.join(process.cwd(), 'lib', 'data', 'geo.json');

// Cached data to avoid re-reading the file multiple times per request
let cachedCities: City[] | null = null;

async function loadGeoData(): Promise<City[]> {
  if (cachedCities) {
    return cachedCities;
  }
  try {
    const fileContent = await fs.readFile(geoJsonPath, 'utf8');
    const jsonData: GeoJsonData = JSON.parse(fileContent);
    const cities: City[] = [];

    for (const region in jsonData) {
      if (Object.prototype.hasOwnProperty.call(jsonData, region)) {
        jsonData[region].forEach(cityData => {
          cities.push({ ...cityData, region }); // Add region property to each city
        });
      }
    }
    cachedCities = cities;
    return cities;
  } catch (error) {
    console.error('Error reading or processing geo.json:', error);
    return []; // Return empty array on error
  }
}

// Function to get all cities (now reads the new structure) - Use imported City type
export async function getAllCities(): Promise<City[]> {
  return await loadGeoData();
}

// Function to get a specific city by its slug - Use imported City type
export async function getCityBySlug(slug: string): Promise<City | undefined> {
  const cities = await loadGeoData();
  return cities.find(city => city.slug === slug);
}

// Function to get other cities from the same region - Use imported City type
export async function getRegionalCities(currentCitySlug: string): Promise<{ cities: City[], regionName: string | null }> {
  const cities = await loadGeoData();
  const currentCity = cities.find(city => city.slug === currentCitySlug);

  if (!currentCity) {
    return { cities: [], regionName: null };
  }

  const regionName = currentCity.region;
  const regionalCities = cities.filter(city => city.region === regionName && city.slug !== currentCitySlug);
  
  return { cities: regionalCities, regionName };
}

export async function getAllCitySlugs(): Promise<string[]> {
  const cities = await loadGeoData();
  return cities.map(city => city.slug);
} 