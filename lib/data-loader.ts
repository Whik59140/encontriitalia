import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';

export interface Influencer {
  name: string;
  slug: string;
  variations: string[];
}

export interface ArticleData {
  title: string;
  description: string;
  influencerSlug: string;
  influencerName: string;
  date: string;
  content: string;
}

// Cache the data so we don't read the file on every request in dev mode
// In production, this will be loaded once at build time or server start.
let cachedInfluencers: Influencer[] | null = null;

export async function getInfluencers(): Promise<Influencer[]> {
  if (cachedInfluencers) {
    return cachedInfluencers;
  }

  try {
    // Assuming influencers.json is in the project root
    // Adjust the path if it's located elsewhere, e.g., inside a 'data' folder
    const filePath = path.join(process.cwd(), 'influencers.json');
    const fileContent = await fs.readFile(filePath, 'utf-8');
    const influencers = JSON.parse(fileContent) as Influencer[];
    
    // Validate basic structure (optional, but good practice)
    if (!Array.isArray(influencers) || influencers.some(inf => typeof inf.name !== 'string' || typeof inf.slug !== 'string')) {
      console.error('Invalid influencers.json format.');
      cachedInfluencers = []; // Cache empty array on error to prevent re-reading bad file
      return [];
    }

    cachedInfluencers = influencers;
    return influencers;
  } catch (error) {
    console.error('Error reading or parsing influencers.json:', error);
    cachedInfluencers = []; // Cache empty array on error
    return []; // Return empty array on error
  }
}

export async function getInfluencerBySlug(slug: string): Promise<Influencer | undefined> {
  const influencers = await getInfluencers();
  return influencers.find(influencer => influencer.slug === slug);
}

export async function getArticleDataBySlug(slug: string): Promise<ArticleData | null> {
  const articlePath = path.join(process.cwd(), 'content', 'articles', 'influencer', slug, `${slug}.md`);
  try {
    const fileContents = await fs.readFile(articlePath, 'utf8');
    const { data, content } = matter(fileContents);

    if (!data.title || !data.influencerName || !data.influencerSlug || data.influencerSlug !== slug) {
      console.warn(`Frontmatter might be missing or slug mismatch for: ${slug}.md`);
    }

    return {
      title: data.title || `Article about ${data.influencerName || slug}`,
      description: data.description || `Read more about ${data.influencerName || slug}`,
      influencerSlug: data.influencerSlug || slug,
      influencerName: data.influencerName || slug,
      date: data.date || new Date().toISOString().split('T')[0],
      content: content,
    };
  } catch {
    return null;
  }
}

export async function getArticleDataForSubcategory(slug: string, subcategory: string): Promise<ArticleData | null> {
  const articlePath = path.join(process.cwd(), 'content', 'articles', 'influencer', slug, `${subcategory}.md`);
  try {
    const fileContents = await fs.readFile(articlePath, 'utf8');
    const { data, content } = matter(fileContents);
    
    // Basic validation for subcategory frontmatter (can be expanded)
    // Title is highly recommended for subcategory pages
    if (!data.title) {
      console.warn(`Frontmatter title is missing for subcategory: ${slug}/${subcategory}.md`);
    }

    const influencer = await getInfluencerBySlug(slug);
    const influencerName = influencer?.name || slug;

    return {
      title: data.title || `${influencerName} - ${subcategory.charAt(0).toUpperCase() + subcategory.slice(1)}`,
      description: data.description || `Content related to ${subcategory} for ${influencerName}`,
      influencerSlug: slug,
      influencerName: influencerName,
      date: data.date || new Date().toISOString().split('T')[0],
      content: content,
    };
  } catch {
    // It's common for subcategory files not to exist, so don't log an error, just return null.
    return null;
  }
} 