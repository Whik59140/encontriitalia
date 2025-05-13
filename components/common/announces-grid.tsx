import fs from 'fs/promises';
import path from 'path';
import { AnnounceCard } from './announce-card'; // Assuming AnnounceCard is in the same directory or adjust path
import { announcesGridStrings } from '@/app/translations';

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

// Text generation templates are now in announcesGridStrings

function generateAnnounceText(
  category: string, 
  city: string, 
  index: number, 
  subType?: 'gratis' | 'sesso' | 'seri' | 'incontri'
): { title: string; description: string } {
  const typeKey = subType || 'default';
  const currentTitleTemplates = announcesGridStrings.subCategoryTitleTemplates[typeKey] || announcesGridStrings.subCategoryTitleTemplates.default;
  const currentDescriptionTemplates = announcesGridStrings.subCategoryDescriptionTemplates[typeKey] || announcesGridStrings.subCategoryDescriptionTemplates.default;

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
    registrationTime = announcesGridStrings.registrationTimeMinutesAgo(minutesAgo);
  } else {
    registrationTime = announcesGridStrings.registrationTimeHoursAgo(hoursAgo);
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

  let gridTitle: string;
  switch (subCategoryType) {
    case 'gratis':
      gridTitle = announcesGridStrings.gridTitleGratis(categoryDisplayName, cityDisplayName);
      break;
    case 'sesso':
      gridTitle = announcesGridStrings.gridTitleSesso(categoryDisplayName, cityDisplayName);
      break;
    case 'seri':
      gridTitle = announcesGridStrings.gridTitleSeri(categoryDisplayName, cityDisplayName);
      break;
    case 'incontri':
      gridTitle = announcesGridStrings.gridTitleIncontri(categoryDisplayName, cityDisplayName);
      break;
    default:
      gridTitle = announcesGridStrings.gridTitleDefault(categoryDisplayName, cityDisplayName);
  }

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
            const altText = announcesGridStrings.announceCardAltText(title, index);
            return (
              <AnnounceCard
                key={url} // Using URL as key, assuming they are unique enough for this context
                imageUrl={url}
                title={title}
                description={description}
                ctaText={announcesGridStrings.announceCardCtaText}
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