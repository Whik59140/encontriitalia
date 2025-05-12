import 'dotenv/config'; // Load variables from .env file, ensure dotenv is installed
import { GoogleGenerativeAI } from "@google/generative-ai";
import { VertexAI } from '@google-cloud/vertexai'; // Add Vertex AI import
import fs from 'fs/promises'; // Use promises API of fs
import path from 'path';
import { fileURLToPath } from 'url';

// --- Configuration ---
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GOOGLE_CLOUD_PROJECT_ID = process.env.GOOGLE_CLOUD_PROJECT_ID; // Add project ID for Vertex AI
const modelName = "gemini-2.5-flash-preview-04-17"; // Or your preferred model
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const outputBaseDir = path.join(__dirname, 'content', 'articles');
const geoJsonPath = path.join(__dirname, 'lib', 'data', 'geo.json');
const maxOutputTokens = 8192;
const CONCURRENCY_LIMIT = 15; // Number of cities to process in parallel

// --- Location for Vertex AI ---
const vertexAILocation = 'us-central1'; // Required for image generation

// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// !! IMPORTANT: SET THIS TO THE CATEGORY SLUG YOU WANT TO GENERATE FOR ALL CITIES !!
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
const TARGET_CATEGORY_SLUG_FOR_ALL_CITIES = 'trans'; // IMPORTANT: Set this to the desired category slug.
const TARGET_CITY_SLUG = ''; // Optional: Set to a specific city slug to generate only for that city, or empty for all.

// Define all available categories statically
const ALL_CATEGORIES = [
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

// --- Helper Functions ---

/**
 * Reads and parses the geo.json file.
 * @returns {Promise<object>} The parsed geo data with cities and categories.
 */
async function getGeoData() {
  try {
    const filePath = path.join(process.cwd(), 'lib', 'data', 'geo.json');
    const fileContent = await fs.readFile(filePath, 'utf8');
    const jsonData = JSON.parse(fileContent);

    const cities = [];
    for (const region in jsonData) {
      if (Object.prototype.hasOwnProperty.call(jsonData, region)) {
        jsonData[region].forEach(city => {
          cities.push({ ...city, region });
        });
      }
    }
    // Categories are now static, so we only return cities.
    return { cities };
  } catch (error) {
    console.error('Error reading or parsing geo.json:', error);
    throw error; // Rethrow to stop execution if geo data is critical
  }
}

/**
 * Capitalizes each word in a city slug.
 * @param {string} slug The city slug (e.g., "roma" or "reggio-emilia").
 * @returns {string} The capitalized city name (e.g., "Roma" or "Reggio Emilia").
 */
function capitalizeCityName(slug) {
    if (!slug) return '';
    return slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
}

/**
 * Capitalizes the first letter of a category name.
 * @param {string} name The category name (e.g., "gay" or "studentessa").
 * @returns {string} The capitalized category name (e.g., "Gay" or "Studentessa").
 */
function capitalizeCategoryName(name) {
    if (!name) return '';
    return name.charAt(0).toUpperCase() + name.slice(1);
}


// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// !! IMPORTANT: YOU MUST IMPLEMENT THIS FUNCTION WITH YOUR DETAILED PROMPT LOGIC  !!
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
/**
 * Returns the appropriate detailed prompt string for a given category and city.
 * @param {string} categorySlug - The slug of the category (e.g., "gay", "milf").
 * @param {string} cityName - The capitalized name of the city (e.g., "Roma").
 * @param {string} categoryDisplayName - The capitalized display name of the category (e.g., "Gay", "Milf").
 * @param {array} relatedCitiesData - An array of related cities data for internal linking.
 * @returns {string|null} The detailed prompt string, or null if no prompt is defined for the category.
 */
function getPromptForCategory(categorySlug, cityName, categoryDisplayName, relatedCitiesData) {
  console.log(`   Generating prompt for category '${categoryDisplayName}' in '${cityName}'`);

  // Construct the internal links markdown part if data exists
  const internalLinksSection = relatedCitiesData && relatedCitiesData.length > 0 
    ? `\n\n## Esplora Altre Città nella Regione\nScrivi un breve paragrafo che incoraggi i lettori a esplorare altre città vicine nella stessa regione per incontri ${categoryDisplayName}, menzionando e linkando le seguenti guide: ${relatedCitiesData.map(c => `[${c.name}](/${c.slug}/${categorySlug}/incontri-${categorySlug}-in-${c.slug})`).join(', ')}.`
    : ''; // Empty string if no related cities

  if (categorySlug === 'trans') {
    return `
 

    Write a 10,000-character SEO-optimized italian article about dating trans individuals in ${cityName}. The article must:





    Start with a captivating introduction that highlights the unique appeal of the trans dating scene in ${cityName}. Use a strong hook to draw readers in and showcase what makes this city special for trans dating.
    
    
    
    Include a detailed section on the best places to meet trans singles in ${cityName}. List specific local bars, clubs, LGBTQ+ events, or popular online dating platforms. Where possible, include names of venues or events to make the advice actionable and locally relevant.
    
    
    
    Provide practical, actionable tips for successful trans dating, emphasizing respect, communication, and understanding trans experiences. Include relatable examples or scenarios to illustrate these tips.
    
    
    
    Explore common challenges in trans dating (e.g., societal stigma, pronoun navigation) and offer specific, practical solutions to address them.
    
    
    
    Feature at least two success stories or testimonials reflecting positive trans dating experiences in ${cityName}. These should feel authentic and inspiring, highlighting the city’s welcoming vibe.
    
    
    
    Conclude with a tailored list of resources for ${cityName}, such as local LGBTQ+ organizations, support groups, or online communities, to add value and encourage engagement.
    
    Throughout the article:
    
    
    
    
    
    Seamlessly integrate long-tail keywords, such as:
    
    
    
    
    
    "best trans dating spots in ${cityName}"
    
    
    
    "how to date trans singles in ${cityName}"
    
    
    
    "trans dating tips ${cityName}"
    
    
    
    Use both singular and plural forms (e.g., "trans date" and "trans dates").
    
    
    
    Incorporate respectful variations of 'trans' (e.g., "transgender," "trans woman," "trans man," "trans person") naturally to broaden search query coverage and ensure inclusivity. Avoid forced repetition or unnatural phrasing.
    
    
    
    Use emojis sparingly (e.g., ❤️, 🌈, 😊) to enhance relatability and fun without overwhelming the text.
    
    
    
    Adopt a natural, conversational tone—like advice from a trusted friend—to keep the article warm, approachable, and humanized.
    
    
    
    Engage readers with rhetorical questions (e.g., "Ready to explore love in ${cityName}?") and teasers (e.g., "Curious about ${cityName}’s top trans dating spot? Keep reading!") to maintain interest.
    
    
    
    Incorporate specific ${cityName} details, such as:
    
    
    
    
    
    Notable LGBTQ+ venues
    
    
    
    Annual events (e.g., Pride celebrations, trans-focused gatherings)
    
    
    
    Cultural or social factors shaping the trans dating scene
    
    
    
    Cite credible, Google-sourced information (e.g., statistics, expert quotes, or studies) to boost trust and authority.
    
    
    
    Add a section on ${cityName}’s cultural or social climate regarding trans acceptance and its impact on dating, providing valuable context.
    
    
    
    Address dual perspectives: trans individuals seeking partners and those interested in dating trans individuals, ensuring inclusivity and broad appeal.
    
    
    
    Optionally, include a FAQ section at the end to tackle common questions or concerns about trans dating in ${cityName}, enhancing reader value.
    
    The article should be entertaining, insightful, and leave readers excited to dive into trans dating in ${cityName}.
    
    
    
    10 SEO-Optimized Titles for ${cityName}
    
    
    
    
    
    "Dating Trans in ${cityName}: Your Ultimate Guide to Love and Connection"
    
    
    
    "Best Places to Meet Trans Singles in ${cityName} – Discover Now!"
    
    
    
    "Trans Dating Tips for ${cityName} Locals: Expert Secrets Unveiled"
    
    
    
    "What’s the Trans Dating Scene Like in ${cityName}? Find Out Here"
    
    
    
    "Top Apps for Finding Trans Dates in ${cityName} – Start Swiping!"
    
    
    
    "Trans Dating Etiquette in ${cityName}: How to Shine on Every Date"
    
    
    
    "Real Trans Dating Stories from ${cityName} That Inspire"
    
    
    
    "Beginner’s Guide to Dating Trans Individuals in ${cityName}"
    
    
    
    "Trans Dating Events in ${cityName} You Can’t Miss"
    
    
    
    "Why ${cityName} is Perfect for Trans Dating Adventures"
    
    **Lenght** 10.000 characters approximately.
    **FORMATO MARKDOWN:** Output direct in Markdown.
    **NO CODE FENCES:** do not initiate output with \`\`\`markdown.
    **CRUCIAL STRUCTURE:** Follow EXACTLY the specified H2/H3 structure. Do not omit sections.
    **KEYWORDS:** Integrate keywords of course. Do NOT include “Keywords” lists. 
`;
  } else if (categorySlug === 'milf') {
    console.warn(`      --> Placeholder prompt for 'milf' category. IMPLEMENT THIS! Include internal links.`);
    return `**Titolo SEO:** Incontri MILF a ${cityName}: Scopri Dove Trovarle\\n\\n**Meta Description:** Guida agli incontri MILF a ${cityName}.\\n\\n## Introduzione alle MILF di ${cityName}\\n(Scrivi qui...)${internalLinksSection}\\n## Conclusione`;
  } else if (categorySlug === 'donne') {
    console.warn(`      --> Placeholder prompt for 'donne' category. IMPLEMENT THIS! Include internal links.`);
    return `**Titolo SEO:** Incontri Donne a ${cityName}: Guida Completa\\n\\n**Meta Description:** Trova incontri con donne a ${cityName}.\\n\\n## Donne a ${cityName}\\n(Scrivi qui...)${internalLinksSection}\\n## Conclusione`;
  }
  // ... Add else if blocks for: 'ragazze', 'trans', 'trav', 'escort', 'studentessa', 'adulti'
  // Make sure to add ${internalLinksSection} to their prompts before the conclusion.

  else {
    console.warn(`      --> No specific prompt defined for category slug '${categorySlug}'. Skipping.`);
    return null; // Or return a very generic fallback prompt if you prefer
  }
}

/**
 * Delays execution for a specified number of milliseconds.
 * @param {number} ms The number of milliseconds to delay.
 * @returns {Promise<void>}
 */
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Processes the generation for a single city.
 * @param {object} city - The city object from geo.json (including region).
 * @param {object} targetCategoryObject - The category object { slug, name }.
 * @param {Array<object>} allCities - The complete list of cities for finding related ones.
 * @param {object} model - The initialized Gemini generative model.
 * @returns {Promise<{status: string, value?: string, reason?: any}>} Promise resolving with success or failure info.
 */
async function processSingleCity(city, targetCategoryObject, allCities, model) {
  const cityName = capitalizeCityName(city.name);
  const categorySlug = targetCategoryObject.slug;
  const categoryName = targetCategoryObject.name;
  const currentCityRegion = city.region;

  console.log(`[START] Processing: ${cityName} (${categoryName})`);

  // Find related cities
  let relatedCitiesData = [];
  if (currentCityRegion) {
    relatedCitiesData = allCities
      .filter(relatedCity => relatedCity.region === currentCityRegion && relatedCity.slug !== city.slug)
      .slice(0, 3)
      .map(rc => ({ name: capitalizeCityName(rc.name), slug: rc.slug })); // Capitalize related city names here
  }

  // Define paths
        const categorySpecificDir = path.join(outputBaseDir, categorySlug);
        const cityInCategoryDir = path.join(categorySpecificDir, city.slug);
        const articleSlug = `incontri-${categorySlug}-in-${city.slug}`;
        const targetFileName = `${articleSlug}.md`;
        const targetFilePath = path.join(cityInCategoryDir, targetFileName);

  try {
    // Ensure city-specific directory exists within the category directory
    await fs.mkdir(cityInCategoryDir, { recursive: true });

        // Check if file already exists
        try {
            await fs.access(targetFilePath);
      console.log(`  [SKIP] ${cityName} (${categoryName}) - File already exists.`);
      return { status: 'skipped', value: `${cityName} (${categoryName}) - Skipped: File exists` };
        } catch (error) {
            // File doesn't exist, proceed
        }

    // Get Prompt
    const articlePrompt = getPromptForCategory(categorySlug, cityName, categoryName, relatedCitiesData);
    if (!articlePrompt) {
      console.log(`  [WARN] ${cityName} (${categoryName}) - No prompt generated. Skipping.`);
      return { status: 'skipped', reason: `${cityName} (${categoryName}) - Skipped: No prompt` };
    }

    console.log(`    Generating article content for ${cityName} (${categoryName})...`);
    
    // Generate Article Content
            const generationConfig = { temperature: 0.7, topK: 1, topP: 1, maxOutputTokens: maxOutputTokens };
            const request = {
      contents: [{ role: "user", parts: [{ text: articlePrompt }] }],
                generationConfig: generationConfig,
            };
    const resultStream = await model.generateContentStream(request);
            
            let articleText = '';
    // process.stdout.write(`      Receiving stream for ${cityName}: `); // Less noisy logging
    for await (const chunk of resultStream.stream) {
                try {
                    const chunkText = chunk.text();
            // process.stdout.write('.'); // Indicate progress per city might be too noisy
                    articleText += chunkText;
                } catch (streamError) {
            console.error(`\n      Error processing stream chunk for ${cityName}:`, streamError);
        }
    }
    // console.log(' Done.'); // Less noisy logging

    articleText = articleText.trim().replace(/^```(?:markdown\\s*\n)?/, '').replace(/```$/, '').trim();

    // Extract Title/Description
    let finalTitle = `${categoryName} a ${cityName}: Guida Essenziale`;
    let finalDescription = `Scopri tutto su ${categoryName.toLowerCase()} a ${cityName}.`;
    // (Keep the title/desc extraction logic as before)
    const titleMatch = articleText.match(/^\*\*Titolo(?: SEO)?:\*\*\s*(.+)/im);
            if (titleMatch && titleMatch[1]) {
                finalTitle = titleMatch[1].trim();
                articleText = articleText.replace(titleMatch[0], '').trim();
            }
      const metaDescMatch = articleText.match(/^\*\*Meta Description(?: \(\d+-\d+ caratteri\))?:\*\*\s*(.+)/im);
            if (metaDescMatch && metaDescMatch[1]) {
                finalDescription = metaDescMatch[1].trim();
                articleText = articleText.replace(metaDescMatch[0], '').trim();
            }
      articleText = articleText.replace(/^\*Keywords:.*$/gim, '');
      articleText = articleText.replace(/\n{3,}/g, '\\n\\n').trim();
           
    // Image generation is removed.
    const imagePathForFrontmatter = ''; // Set to empty for frontmatter

    // Construct Markdown
            const markdownContent = `---
title: "${finalTitle.replace(/"/g, '\\"')}"
description: "${finalDescription.replace(/"/g, '\\"')}"
articleSlug: "${articleSlug}" 
categorySlug: "${categorySlug}"
citySlug: "${city.slug}"
date: "${new Date().toISOString().split('T')[0]}"
cityName: "${cityName}"
categoryName: "${categoryName}"
image: "${imagePathForFrontmatter}"
---

${articleText}
`;

    // Save File
            await fs.writeFile(targetFilePath, markdownContent);
    console.log(`  [SUCCESS] ${cityName} (${categoryName}) - Saved: ${targetFileName}`);
    return { status: 'fulfilled', value: `${cityName} (${categoryName}) - Completed` };

        } catch (error) {
    console.error(`  [FAIL] ${cityName} (${categoryName}) - Error:`, error.message || error);
    // Optionally log the full error stack: console.error(error);
    return { status: 'rejected', reason: `${cityName} (${categoryName}) - Failed: ${error.message}` };
  }
}

// --- Main Generation Logic ---
/**
 * Generates articles for all cities and specified categories.
 */
async function generateArticles() {
  if (!TARGET_CATEGORY_SLUG_FOR_ALL_CITIES) {
    console.error("Error: TARGET_CATEGORY_SLUG_FOR_ALL_CITIES is not set in generate-articles.mjs. Please set it to the desired category slug (e.g., 'gay', 'milf').");
    process.exit(1);
  }

  const geoData = await getGeoData();
  if (!geoData || !geoData.cities) {
    console.error('Failed to load cities from geoData.');
    return;
  }

  const allCities = geoData.cities;
  // Use the static ALL_CATEGORIES defined at the top of the file
  const targetCategoryObject = ALL_CATEGORIES.find(cat => cat.slug === TARGET_CATEGORY_SLUG_FOR_ALL_CITIES);

  if (!targetCategoryObject) {
    console.error(`Error: Category with slug "${TARGET_CATEGORY_SLUG_FOR_ALL_CITIES}" not found in ALL_CATEGORIES.`);
    console.log('Available category slugs are:', ALL_CATEGORIES.map(c => c.slug).join(', '));
    process.exit(1);
  }

  const categorySlug = targetCategoryObject.slug;
  const categoryName = targetCategoryObject.name;

    if (!GEMINI_API_KEY) {
        console.error("ERROR: GEMINI_API_KEY not found in environment variables. Ensure it's set in your .env file.");
        return;
    }

  // Check for Vertex AI configuration for image generation
  if (!GOOGLE_CLOUD_PROJECT_ID) {
    console.warn("WARNING: GOOGLE_CLOUD_PROJECT_ID not found in environment variables. Image generation with Vertex AI will not work.");
    console.warn("Set this in your .env file to enable article image generation.");
  }

    const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: modelName });

    // Ensure the main articles directory exists (base for category folders)
    try {
        await fs.mkdir(outputBaseDir, { recursive: true });
    } catch (error) {
        console.error(`Error creating base output directory '${outputBaseDir}':`, error);
        return; 
    }

  // Filter cities if TARGET_CITY_SLUG is set
  const citiesToProcess = TARGET_CITY_SLUG 
      ? allCities.filter(city => city.slug === TARGET_CITY_SLUG) 
      : allCities;

  if (citiesToProcess.length === 0) {
      console.error(`Error: No cities found to process.` + (TARGET_CITY_SLUG ? ` Did you mean to unset TARGET_CITY_SLUG?` : ''));
      return;
  }

  console.log(`\n🚀 Starting article generation for ${citiesToProcess.length} cities, Category: '${targetCategoryObject.name}', Concurrency: ${CONCURRENCY_LIMIT}\n`);

  let processedCount = 0;
  let successCount = 0;
  let skippedCount = 0;
  let failedCount = 0;
  const totalCities = citiesToProcess.length;

  for (let i = 0; i < totalCities; i += CONCURRENCY_LIMIT) {
    const batch = citiesToProcess.slice(i, i + CONCURRENCY_LIMIT);
    console.log(`--- Processing Batch ${Math.floor(i / CONCURRENCY_LIMIT) + 1} (Cities ${i + 1}-${Math.min(i + CONCURRENCY_LIMIT, totalCities)} of ${totalCities}) ---`);

    const promises = batch.map(city => 
      processSingleCity(city, targetCategoryObject, allCities, model)
    );

    // Wait for the current batch to complete
    const results = await Promise.allSettled(promises);
    
    // Log results for the batch
    results.forEach(result => {
        processedCount++;
        if (result.status === 'fulfilled') {
            successCount++;
            // console.log(`  ✅ ${result.value}`); // Already logged in processSingleCity
        } else if (result.status === 'skipped') { // Our custom status
            skippedCount++;
            // console.log(`  ⚪️ ${result.value || result.reason}`); // Already logged
        } else { // status === 'rejected'
            failedCount++;
            // console.error(`  ❌ ${result.reason}`); // Already logged
        }
    });

    console.log(`--- Batch ${Math.floor(i / CONCURRENCY_LIMIT) + 1} Complete ---`);
     // Optional: Add a small delay between batches if hitting rate limits persists
     // if (i + CONCURRENCY_LIMIT < totalCities) {
     //    await delay(2000); // e.g., 2-second delay between batches
     // }
  }

  console.log("\n--- Generation Summary ---");
  console.log(`Total Cities: ${totalCities}`);
  console.log(`Successfully Generated: ${successCount}`);
  console.log(`Skipped (Already Exist or No Prompt): ${skippedCount}`);
  console.log(`Failed: ${failedCount}`);
  console.log("--- Generation process complete! ---");
}

// --- Start Generation ---

// Temporarily call listAvailableModels before starting generation
/*
async function main() {
  if (!GEMINI_API_KEY) {
    console.error("ERROR: GEMINI_API_KEY not found. Please set it in .env");
    return;
  }
  const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
  // await listAvailableModels(genAI); // Call the function here

  // Proceed with article generation if needed, or comment this out during model listing
  await generateArticles().catch(error => {
    console.error("An unexpected error occurred during the article generation process:", error);
  });
}

main().catch(console.error);
*/

// Original generateArticles().catch call commented out for controlled execution
generateArticles().catch(error => {
    console.error("An unexpected error occurred outside the main generation loop:", error);
}); 