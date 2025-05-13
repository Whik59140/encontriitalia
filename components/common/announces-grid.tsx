import fs from 'fs/promises';
import path from 'path';
import { AnnounceCard } from './announce-card'; // Assuming AnnounceCard is in the same directory or adjust path

interface AnnouncesGridProps {
  categorySlug: string;
  citySlug: string; // citySlug might be used in future text generation or linking
  categoryDisplayName: string;
  cityDisplayName: string;
  affiliateLink: string;
  maxAnnounces?: number;
  subCategoryType?: 'gratis' | 'sesso' | 'seri' | 'incontri'; // Added 'incontri'
}

// Helper function to get random images
async function getRandomImageUrls(categorySlug: string, count: number): Promise<string[]> {
  const imageDir = path.join(process.cwd(), 'public', 'blog', categorySlug);
  const urls: string[] = [];
  try {
    const files = await fs.readdir(imageDir);
    const imageFiles = files.filter(file => /\.(webp|jpg|jpeg|png)$/i.test(file));

    if (imageFiles.length === 0) {
      console.warn(`[AnnouncesGrid] No images found in ${imageDir}`);
      return [];
    }

    // Shuffle and pick
    const shuffled = [...imageFiles].sort(() => 0.5 - Math.random());
    const selectedFiles = shuffled.slice(0, Math.min(count, shuffled.length));
    
    for (const imgFile of selectedFiles) {
      urls.push(`/blog/${categorySlug}/${imgFile}`);
    }
  } catch (error) {
    console.warn(`[AnnouncesGrid] Could not read image directory ${imageDir}:`, error);
  }
  return urls;
}

// Update text generation templates to be an object keyed by subCategoryType
const subCategoryTitleTemplates: { [key: string]: string[] } = {
  default: [
    "Incontri {category} a {city}: Nuovi Annunci!",
    "Passione e Divertimento a {city} - Annunci {category}",
    "{category} a {city}: Scopri i Profili Più Caldi!",
  ],
  gratis: [
    "Annunci {category} Gratis a {city}: Inizia Subito!",
    "{city}: {category} Gratuiti da Non Perdere!",
    "Accesso Gratuito: Annunci {category} a {city}",
  ],
  sesso: [
    "Annunci Sesso {category} a {city}: Passione Garantita!",
    "{city} Hot: Incontri Sesso {category} Esplosivi!",
    "Desideri {category} Sesso a {city}? Ecco gli Annunci!",
  ],
  seri: [
    "Incontri Seri {category} a {city}: Trova l'Anima Gemella!",
    "{city}: Relazioni Serie con {category} Speciali.",
    "Cerchi Amore Vero? Annunci {category} Seri a {city}",
  ],
  incontri: [ // Added for 'incontri'
    "Annunci Incontri {category} a {city}: Connessioni Autentiche!",
    "{city}: Scopri Nuovi Incontri {category} Oggi Stesso!",
    "Incontri {category} a {city}: Profili Verificati Ti Aspettano!",
  ],
};

const subCategoryDescriptionTemplates: { [key: string]: string[] } = {
  default: [
    "Profili verificati e pronti a connettersi. La tua prossima avventura {category} a {city} inizia qui.",
    "Discrezione e divertimento assicurati. Esplora i migliori annunci {category} di {city}.",
  ],
  gratis: [
    "Registrazione 100% gratuita per annunci {category} a {city}. Inizia a chattare senza costi!",
    "Scopri profili {category} a {city} con accesso totalmente gratuito. Facile e veloce!",
  ],
  sesso: [
    "Vivi momenti di pura passione con gli annunci sesso {category} a {city}. Massima discrezione.",
    "Incontri piccanti e senza impegno. Esplora gli annunci sesso {category} più hot di {city}.",
  ],
  seri: [
    "Trova una relazione stabile e significativa. Annunci per incontri seri {category} a {city}. Profili autentici.",
    "Se cerchi l'amore vero e incontri {category} seri a {city}, sei nel posto giusto. Iscriviti ora.",
  ],
};

function generateAnnounceText(
  category: string, 
  city: string, 
  index: number, 
  subType?: 'gratis' | 'sesso' | 'seri' | 'incontri'
): { title: string; description: string } {
  const typeKey = subType || 'default';
  const currentTitleTemplates = subCategoryTitleTemplates[typeKey] || subCategoryTitleTemplates.default;
  const currentDescriptionTemplates = subCategoryDescriptionTemplates[typeKey] || subCategoryDescriptionTemplates.default;

  const title = currentTitleTemplates[index % currentTitleTemplates.length]
    .replace('{category}', category)
    .replace('{city}', city);
  const description = currentDescriptionTemplates[index % currentDescriptionTemplates.length]
    .replace('{category}', category)
    .replace('{city}', city);
  return { title, description };
}

function generateRandomUserStatus(): { isOnline: boolean; registrationTime: string } {
  const isOnline = Math.random() < 0.65; // 65% chance of being online

  let registrationTime: string;
  const minutesAgo = Math.floor(Math.random() * 59) + 1;
  const hoursAgo = Math.floor(Math.random() * 10) + 1; // Up to 10 hours for more "recent" feel

  if (Math.random() < 0.7) { // 70% chance for minutes
    registrationTime = `${minutesAgo} minut${minutesAgo === 1 ? 'o' : 'i'} fa`;
  } else {
    registrationTime = `${hoursAgo} or${hoursAgo === 1 ? 'a' : 'e'} fa`;
  }

  return { isOnline, registrationTime };
}

export async function AnnouncesGrid({
  categorySlug,
  // citySlug, // Keep for future use if needed
  categoryDisplayName,
  cityDisplayName,
  affiliateLink,
  maxAnnounces = 9, // Default to 9 announces
  subCategoryType, // Destructure prop
}: AnnouncesGridProps) {
  const imageUrls = await getRandomImageUrls(categorySlug, maxAnnounces);

  if (!imageUrls || imageUrls.length === 0) {
    return null; // Or a fallback message
  }

  // Construct dynamic grid title
  let gridTitle = `Annunci ${categoryDisplayName} a ${cityDisplayName}`;
  if (subCategoryType === 'gratis') gridTitle = `Annunci Gratis ${categoryDisplayName} a ${cityDisplayName}`;
  if (subCategoryType === 'sesso') gridTitle = `Annunci Sesso ${categoryDisplayName} a ${cityDisplayName}`;
  if (subCategoryType === 'seri') gridTitle = `Annunci Incontri Seri ${categoryDisplayName} a ${cityDisplayName}`;
  if (subCategoryType === 'incontri') gridTitle = `Annunci Incontri ${categoryDisplayName} a ${cityDisplayName}`; // Added for 'incontri'

  return (
    <div className="py-8 sm:py-12 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-800 dark:text-gray-100 mb-6 sm:mb-10">
          {gridTitle} {/* Use dynamic title */}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {imageUrls.map((url, index) => {
            const { title, description } = generateAnnounceText(categoryDisplayName, cityDisplayName, index, subCategoryType);
            const { isOnline, registrationTime } = generateRandomUserStatus(); // Generate random status
            const altText = `${title} - Annuncio ${index + 1}`;
            return (
              <AnnounceCard
                key={url} // Using URL as key, assuming they are unique enough for this context
                imageUrl={url}
                title={title}
                description={description}
                ctaText="Scopri Profilo e Chatta" // Updated CTA text
                ctaLink={affiliateLink}
                altText={altText}
                categoryDisplayName={categoryDisplayName}
                cityDisplayName={cityDisplayName}
                isOnline={isOnline} // Pass new prop
                registrationTime={registrationTime} // Pass new prop
              />
            );
          })}
        </div>
      </div>
    </div>
  );
} 