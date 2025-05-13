import type { Category } from '@/types/geo';

// Define categories statically (matching generate-articles.mjs) - Use Category type
export const ALL_CATEGORIES: Category[] = [
  { slug: 'gay', name: 'Gay' },
  { slug: 'milf', name: 'Milf' },
  { slug: 'donne', name: 'Donne' },
  { slug: 'ragazze', name: 'Ragazze' },
  { slug: 'trans', name: 'Trans' },
  { slug: 'trav', name: 'Trav' },
  { slug: 'escort', name: 'Escort' },
  // Add other categories that might be used in slugs
  
];

// Function to get a specific category by its slug - Use imported Category type
export function getCategoryBySlug(slug: string): Category | undefined {
  // No need for async as it operates on a static array
  return ALL_CATEGORIES.find(category => category.slug === slug);
}

// Function to get all categories (returns the static list) - Use imported Category type
export function getAllCategories(): Category[] {
  return ALL_CATEGORIES;
}

export function getAllCategorySlugs(): string[] {
  return ALL_CATEGORIES.map(category => category.slug);
} 