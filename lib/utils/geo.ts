import fs from 'fs/promises';
import path from 'path';
import type { City, Category } from '@/types/geo'; // Import types

// Define interfaces for better type safety - REMOVED
// interface City { ... }
// interface Category { ... }

interface GeoJsonData {
  [region: string]: Omit<City, 'region'>[]; // Keys are regions, values are arrays of cities without region prop
}

const geoJsonPath = path.join(process.cwd(), 'lib', 'data', 'geo.json');

// Define categories statically (matching generate-articles.mjs) - Use Category type
const ALL_CATEGORIES: Category[] = [
  { slug: 'gay', name: 'Gay' },
  { slug: 'milf', name: 'Milf' },
  { slug: 'donne', name: 'Donne' },
  { slug: 'ragazze', name: 'Ragazze' },
  { slug: 'trans', name: 'Trans' },
  { slug: 'trav', name: 'Trav' },
  { slug: 'escort', name: 'Escort' },
 
];

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

// Function to get all categories (returns the static list) - Use imported Category type
export async function getAllCategories(): Promise<Category[]> {
  // No need for async, but keep it consistent with others
  return ALL_CATEGORIES;
}

// Function to get a specific category by its slug - Use imported Category type
export async function getCategoryBySlug(slug: string): Promise<Category | undefined> {
  // No need for async
  return ALL_CATEGORIES.find(category => category.slug === slug);
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

export async function getAllCategorySlugs(): Promise<string[]> {
  const categories = await getAllCategories(); // This existing function returns Category[]
  return categories.map(category => category.slug);
} 