export interface TelegramSubcategory {
  name: string;
  slug: string;
  description?: string; // Optional, can be added later
}

export interface TelegramMainCategory {
  name: string; // Full name with emoji for display
  slug: string; // Slug for the main category (e.g., "categorie-generali-adulti-sessuali")
  emoji: string;
  subcategories: TelegramSubcategory[];
}

const generateSlug = (text: string): string => {
  return text
    .toLowerCase()
    .replace(/\s*\(.*?\)\s*/g, '') // Remove content in parentheses
    .trim()
    .replace(/\s+\/\s+|\s+/g, '-') // Replace slashes and spaces with hyphens
    .replace(/[^a-z0-9-]/g, '') // Remove non-alphanumeric characters except hyphens
    .replace(/--+/g, '-') // Replace multiple hyphens with a single one
    .replace(/^-+|-+$/g, ''); // Trim leading/trailing hyphens
};

export const telegramCategoriesData: TelegramMainCategory[] = [
  {
    name: "�� Categorie Generali",
    slug: "categorie-generali",
    emoji: "🔥",
    subcategories: [
      { name: "porno", slug: generateSlug("porno") },
      { name: "sesso", slug: generateSlug("sesso") },
      { name: "nudo", slug: generateSlug("nudo") },
      { name: "video xxx", slug: generateSlug("video xxx") },
      { name: "film porno", slug: generateSlug("film porno") },
      { name: "amatoriale", slug: generateSlug("amatoriale") },
      { name: "cam", slug: generateSlug("cam") },
      { name: "leaks", slug: generateSlug("leaks") },
      { name: "scopata", slug: generateSlug("scopata") },
     
      
      { name: "masturbazione", slug: generateSlug("masturbazione") },
    ],
  },
  {
    name: "🍑 Aspetto / Corpo",
    slug: "aspetto-corpo",
    emoji: "🍑",
    subcategories: [
      { name: "cazzo grosso", slug: generateSlug("cazzo grosso") },
      { name: "tette grandi", slug: generateSlug("tette grandi") },
      { name: "culo grosso", slug: generateSlug("culo grosso") },
      { name: "milf", slug: generateSlug("milf") },
      { name: "cougar", slug: generateSlug("cougar") },
      { name: "matura", slug: generateSlug("matura") },
      
    ],
  },
  {
    name: "🌈 Orientamento / Identità",
    slug: "orientamento-identita",
    emoji: "🌈",
    subcategories: [
      { name: "gay", slug: generateSlug("gay") },
      
      { name: "trans", slug: generateSlug("trans") },
      
    ],
  },
  {
    name: "🧬 Generi / Feticismi",
    slug: "generi-feticismi",
    emoji: "🧬",
    subcategories: [
      { name: "bdsm", slug: generateSlug("bdsm") },
     
      { name: "hentai", slug: generateSlug("hentai") },
     
      { name: "gangbang", slug: generateSlug("gangbang") },
    ],
  },
  {
    name: "📲 Tipo di Contenuto / Telegram",
    slug: "tipo-contenuto-telegram",
    emoji: "📲",
    subcategories: [
      { name: "onlyfans", slug: generateSlug("onlyfans") },
      { name: "leaks onlyfans", slug: generateSlug("leaks onlyfans") },
    ],
  },
];

// Helper function to get all unique subcategory slugs for generateStaticParams
export function getAllTelegramSubcategorySlugs(): Array<{ type: 'canali' | 'gruppi'; slug: string }> {
  const uniqueSlugs = new Set<string>();
  telegramCategoriesData.forEach(mainCat => {
    mainCat.subcategories.forEach(subCat => {
      uniqueSlugs.add(subCat.slug);
    });
  });

  const params: Array<{ type: 'canali' | 'gruppi'; slug: string }> = [];
  uniqueSlugs.forEach(slug => {
    params.push({ type: 'canali', slug });
    params.push({ type: 'gruppi', slug });
  });

  return params;
}

// Helper function to get subcategory details by slug (optional, but can be useful)
export function getTelegramSubcategoryBySlug(slug: string): TelegramSubcategory | undefined {
  for (const mainCat of telegramCategoriesData) {
    const foundSubCat = mainCat.subcategories.find(subCat => subCat.slug === slug);
    if (foundSubCat) {
      return foundSubCat;
    }
  }
  return undefined;
} 