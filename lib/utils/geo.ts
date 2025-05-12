import fs from 'fs/promises';
import path from 'path';

// Define interfaces for better type safety
interface City {
  slug: string;
  name: string;
  region: string; // Added region
}

interface Category {
  slug: string;
  name: string;
}

interface GeoJsonData {
  [region: string]: Omit<City, 'region'>[]; // Keys are regions, values are arrays of cities without region prop
}

const geoJsonPath = path.join(process.cwd(), 'lib', 'data', 'geo.json');

// Define categories statically (matching generate-articles.mjs)
const ALL_CATEGORIES: Category[] = [
  { slug: 'gay', name: 'Gay' },
  { slug: 'milf', name: 'Milf' },
  { slug: 'donne', name: 'Donne' },
  { slug: 'ragazze', name: 'Ragazze' },
  { slug: 'trans', name: 'Trans' },
  { slug: 'trav', name: 'Trav' },
  { slug: 'escort', name: 'Escort' },
  { slug: 'studentessa', name: 'Studentessa' },
  { slug: 'adulti', name: 'Adulti' },
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

// Function to get all cities (now reads the new structure)
export async function getAllCities(): Promise<City[]> {
  return await loadGeoData();
}

// Function to get a specific city by its slug
export async function getCityBySlug(slug: string): Promise<City | undefined> {
  const cities = await loadGeoData();
  return cities.find(city => city.slug === slug);
}

// Function to get all categories (returns the static list)
export async function getAllCategories(): Promise<Category[]> {
  // No need for async, but keep it consistent with others
  return ALL_CATEGORIES;
}

// Function to get a specific category by its slug
export async function getCategoryBySlug(slug: string): Promise<Category | undefined> {
  // No need for async
  return ALL_CATEGORIES.find(category => category.slug === slug);
} 