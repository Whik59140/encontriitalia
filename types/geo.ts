export interface City {
  slug: string;
  name: string;
  region: string;
}

export interface Category {
  slug: string;
  name: string;
}

export interface GeoData {
  cities: City[];
  categories: Category[];
} 